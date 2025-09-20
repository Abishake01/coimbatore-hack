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

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")
llm = ChatGroq(model="llama-3.3-70b-versatile", api_key="key")

# Enhanced land price data with regional support
LAND_PRICES = {
    "hyderabad": {
        "urban": 75000,
        "suburban": 45000,
        "rural": 20000
    },
    "chennai": {
        "urban": 70000,
        "suburban": 40000,
        "rural": 18000
    },
    "telangana": {
        "urban": 50000,
        "suburban": 30000,
        "rural": 10000
    },
    "karnataka": {
        "urban": 55000,
        "suburban": 35000,
        "rural": 12000
    }
}

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
            
            # Enhance response with additional data if needed
            if "land_price" in query.lower():
                region = extract_region(query)
                parsed_response = enhance_with_land_price(parsed_response, region)
            
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

def enhance_with_land_price(response: dict, region: str) -> dict:
    """Enhance response with land price information."""
    prices = LAND_PRICES.get(region, LAND_PRICES["telangana"])
    
    price_info = (
        f"Current land prices in {region.capitalize()}:\n"
        f"🏙️ Urban: ₹{prices['urban']:,}/acre\n"
        f"🏡 Suburban: ₹{prices['suburban']:,}/acre\n"
        f"🌄 Rural: ₹{prices['rural']:,}/acre"
    )
    
    if 'html_response' in response:
        response['html_response'] = response['html_response'].replace(
            "</div>", 
            f"<br><br>{price_info}</div>"
        )
    
    if len(response['messages']) > 0:
        response['messages'][0]['text'] = (
            f"Current land prices in {region.capitalize()}. "
            f"Urban: {prices['urban']} per acre. "
            f"Suburban: {prices['suburban']} per acre. "
            f"Rural: {prices['rural']} per acre."
        )
    
    return response

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
        {"step": 1, "key": "date", "label": "Date", "question": "When is the event?"},
        {"step": 2, "key": "venue", "label": "Venue", "question": "Where will it take place?"},
        {"step": 3, "key": "people", "label": "People", "question": "How many attendees?"},
        {"step": 4, "key": "time", "label": "Time", "question": "What's the duration or start time?"},
        {"step": 5, "key": "budget", "label": "Budget", "question": "What's your budget?"},
    ]
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

        prompt = (
            f"You are an expert {event_type} event planner. Using the inputs below, generate a detailed, structured event management plan with sections: "
            "Overview, Timeline/Schedule, Venue & Layout, Logistics (AV, seating, registration), Staffing & Roles, Budget Breakdown, "
            "Vendor Recommendations, Risk & Contingency, and Next Steps. Keep it practical and actionable.\n\n"
            f"Inputs:\n"
            f"- Date: {answers.get('date','')}\n"
            f"- Venue: {answers.get('venue','')}\n"
            f"- People: {answers.get('people','')}\n"
            f"- Time/Duration: {answers.get('time','')}\n"
            f"- Budget: {answers.get('budget','')}\n"
        )

        result = llm.invoke([SystemMessage(content="You create event plans."), HumanMessage(content=prompt)])
        plan_text = result.content if isinstance(result.content, str) else str(result.content)

        if lang and lang != 'en':
            try:
                plan_text = translator.translate(plan_text, src='en', dest=lang).text
            except Exception:
                pass

        response_payload = {
            "messages": [
                {"text": plan_text, "facialExpression": "smile", "animation": "Talking_1"}
            ]
        }
        return jsonify({"response": response_payload})
    except Exception as e:
        logger.error(f"/api/event-plan error: {e}")
        return jsonify({"error": "Failed to generate plan"}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)