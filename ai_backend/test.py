# import os
# from dotenv import load_dotenv

# from groq import Groq
# load_dotenv()

# client = Groq(
#     api_key=os.environ.get("GROQ_API_KEY"),
# )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": "Explain the importance of fast language models",
#         }
#     ],
#     model="llama-3.3-70b-versatile",
# )

# print(chat_completion.choices[0].message.content)

from dotenv import load_dotenv
import os
import logging
from groq import Groq

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Debug: Check if the API key is loaded
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    logger.error("GROQ_API_KEY is not set in the environment.")
    raise ValueError("GROQ_API_KEY is missing. Please check the .env file.")
else:
    logger.info("GROQ_API_KEY loaded successfully.")

# Initialize Groq client
client = Groq(api_key=api_key)
print(client.list_models())