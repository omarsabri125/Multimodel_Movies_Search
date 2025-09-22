from openai import OpenAI
from src.utils import toBase64
from src.helper import get_settings
from fastapi import UploadFile
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))
sys.stdout.reconfigure(encoding='utf-8')


class LlmMultimodel:

    def __init__(self):

        self.config = get_settings()

        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=self.config.OPENROUTER_API_KEY,
        )

    def validate_image(self, image_file: UploadFile):

        if image_file.content_type not in self.config.IMAGE_ALLOWED_EXTENSIONS:
            return False

        return True

    def get_prompt(self):

        # prompt_parts = [
        #     "Look at this image and describe it clearly.",
        #     "Summarize the main elements (characters, objects, setting).",
        #     "Keep the description concise and under 80 words.",
        #     "Use short sentences or bullet-style if needed."
        # ]

        prompt_parts = [
            "You are an expert in image analysis.",
            "Examine the image carefully and provide a detailed, coherent description.",
            "Cover people, objects, setting, background, colors, lighting, emotions, and interactions.",
            "Include symbolic or contextual insights when relevant.",
            "Write in a natural, continuous narrative style — clear, professional, and without bullet points."
        ]
        # prompt_parts = [
        #     "You are an expert in image analysis.",
        #     "Give a concise summary of the image in 1–2 short sentences, focusing on the main subject, setting, and mood.",
        #     "Do not add extra observations or lengthy details; write in natural continuous sentences."
        # ]

        prompt_text = "\n".join(prompt_parts)

        return prompt_text

    def generate_caption_for_image(self, image_bytes: bytes) -> str:

        base64_image = toBase64(image_bytes)

        # Send request with base64 image
        completion = self.client.chat.completions.create(
            model=self.config.LLM_MULTIMODEL,
            max_tokens=self.config.MAX_TOKENS,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": self.get_prompt()
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ]
        )

        return completion.choices[0].message.content
