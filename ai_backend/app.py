from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_groq import ChatGroq
import uuid
import json
import os
from googletrans import Translator, LANGUAGES
from bs4 import BeautifulSoup
import logging
from typing import Dict, List
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

conversation_history: Dict[str, List] = {}
translator = Translator()

# # Securely load GROQ API key from environment
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")
# if not GROQ_API_KEY:
#     logger.warning("GROQ_API_KEY not found in environment. Set it in .env or environment variables.")
llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.environ.get("GROQ_API_KEY"))

def load_prompt() -> str:
    """Load the system prompt from file."""
    current_path = os.path.dirname(os.path.abspath(__file__))
    prompt_path = os.path.join(current_path, "web3_prompt.txt")
    try:
        with open(prompt_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        logger.error(f"Error loading prompt file: {str(e)}")
        return "You are a helpful assistant."

def translate_response(response: dict, target_lang: str) -> dict:
    """Translate the response to the target language."""
    if target_lang == 'en':
        return response
    
    try:
        # Translate HTML response
        if 'html_response' in response:
            soup = BeautifulSoup(response['html_response'], 'html.parser')
            text_to_translate = soup.get_text()
            translated_text = translator.translate(text_to_translate, src='en', dest=target_lang).text
            response['html_response'] = f'<div class="bg-purple-600/70 text-white p-4 rounded-lg max-w-md mx-auto">{translated_text}</div>'

        # Translate messages
        for msg in response.get('messages', []):
            msg['text'] = translator.translate(msg['text'], src='en', dest=target_lang).text
            
        return response
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        return response  # Return untranslated response if error occurs

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat requests with multilingual support."""
    try:
        data = request.get_json()
        query = data.get('message')
        conversation_id = data.get('conversation_id')
        language = data.get('language', 'en').lower()

        if not query:
            return jsonify({"error": "Message parameter is required"}), 400
        
        if not conversation_id:
            conversation_id = str(uuid.uuid4())

        # Translate query to English for processing if needed
        if language != 'en':
            try:
                query = translator.translate(query, src=language, dest='en').text
            except Exception as e:
                logger.error(f"Query translation error: {str(e)}")
                # Continue with original query if translation fails

        # Initialize conversation if new
        if conversation_id not in conversation_history:
            conversation_history[conversation_id] = [
                SystemMessage(content=load_prompt())
            ]

        conversation_history[conversation_id].append(HumanMessage(content=query))

        # Get the response
        result = llm.invoke(conversation_history[conversation_id])
        output_str = result.content
        conversation_history[conversation_id].append(AIMessage(content=output_str))

        try:
            parsed_response = json.loads(output_str)
            
            # Land price enhancement removed for this project
            
            # Ensure a brief speech-friendly message exists even if content is JSON-only
            try:
                if isinstance(parsed_response, dict):
                    msgs = parsed_response.get('messages', []) or []
                    def looks_like_json_text(t: str) -> bool:
                        if not isinstance(t, str):
                            return False
                        s = t.strip()
                        return s.startswith('{') or s.startswith('[')
                    needs_summary = True
                    for m in msgs:
                        if m and isinstance(m, dict):
                            txt = m.get('text', '')
                            if txt and not looks_like_json_text(txt):
                                needs_summary = False
                                break
                    if needs_summary:
                        summary = "I've prepared an updated structured response. Please review the left panel."
                        if language != 'en':
                            try:
                                summary = translator.translate(summary, src='en', dest=language).text
                            except Exception:
                                pass
                        msgs.append({"text": summary, "facialExpression": "smile", "animation": "Talking_1"})
                        parsed_response['messages'] = msgs
            except Exception:
                pass

            # Translate response if needed
            if language != 'en':
                parsed_response = translate_response(parsed_response, language)
                
            return jsonify({
                "response": parsed_response,
                "conversation_id": conversation_id
            })
            
        except json.JSONDecodeError:
            logger.error("Failed to parse LLM response as JSON")
            # Create a fallback response
            fallback_response = create_fallback_response(output_str, language)
            return jsonify({
                "response": fallback_response,
                "conversation_id": conversation_id
            })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def extract_region(query: str) -> str:
    """Extract region from query for land price lookup."""
    query = query.lower()
    if "hyderabad" in query:
        return "hyderabad"
    elif "chennai" in query:
        return "chennai"
    elif "telangana" in query:
        return "telangana"
    elif "karnataka" in query:
        return "karnataka"
    return "telangana"  # Default

def create_fallback_response(text: str, language: str) -> dict:
    """Create a fallback response when JSON parsing fails."""
    if language != 'en':
        try:
            text = translator.translate(text, src='en', dest=language).text
        except:
            pass
    
    return {
        "html_response": f'<div class="bg-purple-600/70 text-white p-4 rounded-lg max-w-md mx-auto">{text}</div>',
        "messages": [
            {
                "text": text,
                "facialExpression": "default",
                "animation": "Idle"
            },
            {
                "text": "Is there anything else I can help with?",
                "facialExpression": "smile",
                "animation": "Talking_1"
            },
            {
                "text": "Please let me know if you have more questions.",
                "facialExpression": "default",
                "animation": "Idle"
            }
        ]
    }

# ==========================
# Event Management Endpoints
# ==========================

EVENT_TYPES = {
    "hackathon": {"name": "Hackathon AI", "icon": "💻", "color": "from-blue-500 to-indigo-600"},
    "wedding": {"name": "Wedding AI", "icon": "💒", "color": "from-pink-500 to-rose-600"},
    "birthday": {"name": "Birthday AI", "icon": "🎂", "color": "from-yellow-400 to-orange-500"},
    "corporate": {"name": "Corporate AI", "icon": "🏢", "color": "from-gray-500 to-blue-700"},
    "concert": {"name": "Concert AI", "icon": "🎵", "color": "from-purple-500 to-fuchsia-600"},
    "festival": {"name": "Fest AI", "icon": "🎪", "color": "from-green-500 to-teal-600"},
    "sports": {"name": "Sports AI", "icon": "⚽", "color": "from-red-500 to-orange-600"}
}

EVENT_QUESTIONS = {
    "default": [
        {"step": 1, "key": "date", "label": "Date", "question": "When is the event?", "placeholder": "20 Oct 2025"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Where will it take place?", "placeholder": "Convention Center"},
        {"step": 3, "key": "people", "label": "People", "question": "How many attendees?", "placeholder": "300 attendees"},
        {"step": 4, "key": "time", "label": "Time", "question": "What's the duration or start time?", "placeholder": "2 days"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "What's your budget?", "placeholder": "₹5,00,000"},
    ],
    "hackathon": [
        {"step": 1, "key": "date", "label": "Hackathon Dates", "question": "When will the hackathon run?", "placeholder": "12-14 Dec 2025"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Where is the venue (campus/tech park)?", "placeholder": "NIT Auditorium"},
        {"step": 3, "key": "people", "label": "Participants", "question": "Expected number of hackers/teams?", "placeholder": "200 hackers"},
        {"step": 4, "key": "time", "label": "Duration", "question": "Event duration and daily schedule?", "placeholder": "48 hours with opening/closing"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Overall budget?", "placeholder": "₹8,00,000"},
    ],
    "wedding": [
        {"step": 1, "key": "date", "label": "Wedding Date", "question": "What is the wedding date?", "placeholder": "21 Jan 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Which venue or city?", "placeholder": "Sri Mahal, Coimbatore"},
        {"step": 3, "key": "people", "label": "Guests", "question": "Approximate guest count?", "placeholder": "500 guests"},
        {"step": 4, "key": "time", "label": "Ceremony Timing", "question": "Muhurtham / ceremony start time?", "placeholder": "6:30 AM"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Overall budget?", "placeholder": "₹15,00,000"},
    ],
    "birthday": [
        {"step": 1, "key": "date", "label": "Date", "question": "When is the birthday?", "placeholder": "10 Feb 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Where is the party venue?", "placeholder": "Home / Party Hall"},
        {"step": 3, "key": "people", "label": "Guests", "question": "Guest count (kids/adults)?", "placeholder": "30 kids, 20 adults"},
        {"step": 4, "key": "time", "label": "Time", "question": "Start time and duration?", "placeholder": "5 PM, 3 hours"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Budget range?", "placeholder": "₹50,000"},
    ],
    "corporate": [
        {"step": 1, "key": "date", "label": "Event Date", "question": "When is the corporate event?", "placeholder": "5 Mar 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Where will it be hosted?", "placeholder": "Hotel Ballroom"},
        {"step": 3, "key": "people", "label": "Attendees", "question": "Expected attendee count?", "placeholder": "250"},
        {"step": 4, "key": "time", "label": "Agenda", "question": "Agenda duration and key sessions?", "placeholder": "9 AM–6 PM"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Budget?", "placeholder": "₹10,00,000"},
    ],
    "concert": [
        {"step": 1, "key": "date", "label": "Concert Date", "question": "When is the concert?", "placeholder": "18 Apr 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Which venue?", "placeholder": "Open Grounds"},
        {"step": 3, "key": "people", "label": "Audience", "question": "Expected audience size?", "placeholder": "5,000"},
        {"step": 4, "key": "time", "label": "Show Time", "question": "Start time and run time?", "placeholder": "7 PM, 3 hours"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Budget?", "placeholder": "₹50,00,000"},
    ],
    "festival": [
        {"step": 1, "key": "date", "label": "Festival Dates", "question": "Festival dates?", "placeholder": "1–3 May 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Location and grounds?", "placeholder": "City Fairgrounds"},
        {"step": 3, "key": "people", "label": "Crowd", "question": "Expected daily footfall?", "placeholder": "10,000/day"},
        {"step": 4, "key": "time", "label": "Hours", "question": "Daily operating hours?", "placeholder": "10 AM–10 PM"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Budget?", "placeholder": "₹1,00,00,000"},
    ],
    "sports": [
        {"step": 1, "key": "date", "label": "Match Dates", "question": "Event dates?", "placeholder": "8–10 Jun 2026"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Stadium/ground?", "placeholder": "City Stadium"},
        {"step": 3, "key": "people", "label": "Teams/Players", "question": "How many teams/players?", "placeholder": "8 teams"},
        {"step": 4, "key": "time", "label": "Schedule", "question": "Match schedule pattern?", "placeholder": "League + Finals"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "Budget?", "placeholder": "₹12,00,000"},
    ],
}

@app.route('/api/event-types', methods=['GET'])
def get_event_types():
    return jsonify({"event_types": EVENT_TYPES})


@app.route('/api/event-questions/<event_type>', methods=['GET'])
def get_event_questions(event_type: str):
    return jsonify({"questions": EVENT_QUESTIONS.get(event_type, EVENT_QUESTIONS["default"])})


@app.route('/api/event-plan', methods=['POST'])
def generate_event_plan():
    try:
        data = request.get_json(force=True)
        event_type = data.get('event_type', 'event')
        answers = data.get('answers', {})
        lang = data.get('language', 'en')

        # Event-specific prompt enrichment
        EVENT_PROMPTS = {
            "hackathon": "Focus on tracks, judging criteria, mentor slots, API partners, and submission process.",
            "wedding": "Include rituals timeline, vendor coordination (decor, catering, photography), guest flow, and contingency for weather.",
            "birthday": "Suggest theme, games/activities, decor, cake timing, return gifts, and kid-friendly logistics.",
            "corporate": "Emphasize agenda, AV needs, registration flow, speaker management, and breakout sessions.",
            "concert": "Cover stage plot, sound/lighting, artist rider, security, ticketing, and entry/exit flow.",
            "festival": "Include multi-stage scheduling, stall/vendor zoning, crowd control, permissions, and sanitation.",
            "sports": "Detail fixtures/schedule, officials, equipment, medical/safety, scorekeeping, and audience seating."
        }

        prompt = (
            f"You are an expert {event_type} event planner. Using the inputs below, generate a detailed, structured event management plan strictly as a SINGLE VALID JSON object with keys: "
            f"overview, timeline, venue_layout, logistics, staffing_roles, budget_breakdown, vendors, risk_contingency, next_steps. "
            f"Do not add any explanations or markdown. Return ONLY JSON. Use INR symbols where applicable. "
            f"Additional guidance: {EVENT_PROMPTS.get(event_type, '')}\n\n"
            f"Inputs:\n"
            f"- Date: {answers.get('date','')}\n"
            f"- Venue: {answers.get('venue','')}\n"
            f"- People: {answers.get('people','')}\n"
            f"- Time/Duration: {answers.get('time','')}\n"
            f"- Budget: {answers.get('budget','')}\n"
        )

        result = llm.invoke([
            SystemMessage(content=load_prompt()),
            HumanMessage(content=prompt)
        ])
        content = result.content if isinstance(result.content, str) else str(result.content)

        plan_json = None
        try:
            plan_json = json.loads(content)
        except json.JSONDecodeError:
            # If not JSON, wrap as simple text plan
            plan_json = {"overview": content}

        # Translate plan_json values if non-English requested
        if lang and lang != 'en':
            try:
                def tr(val):
                    if isinstance(val, str):
                        return translator.translate(val, src='en', dest=lang).text
                    if isinstance(val, list):
                        return [tr(v) for v in val]
                    if isinstance(val, dict):
                        return {k: tr(v) for k, v in val.items()}
                    return val
                plan_json = tr(plan_json)
            except Exception:
                pass

        # Create a short spoken summary (in target language)
        summary_text = (
            f"I've prepared a detailed {event_type} plan based on your inputs. You can review the full plan on the left panel."
        )
        if lang and lang != 'en':
            try:
                summary_text = translator.translate(summary_text, src='en', dest=lang).text
            except Exception:
                pass

        plan_text_for_message = None  # avoid speaking JSON
        response_payload = {
            "html_response": (
                f"<div class='bg-purple-600/70 text-white p-4 rounded-lg max-w-md mx-auto'>{summary_text}</div>"
            ),
            "messages": [
                {"text": summary_text, "facialExpression": "smile", "animation": "Talking_1"}
            ],
            "plan_json": plan_json
        }
        return jsonify({"response": response_payload})
    except Exception as e:
        logger.error(f"/api/event-plan error: {e}")
        return jsonify({"error": "Failed to generate plan"}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)