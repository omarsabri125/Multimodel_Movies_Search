import base64
import requests
import os
# Helper function to convert a file to base64 representation


def toBase64(data):

    if isinstance(data, (bytes, bytearray)):
        return base64.b64encode(data).decode("utf-8")

    if isinstance(data, str) and (data.startswith("http://") or data.startswith("https://")):
        response = requests.get(data)
        response.raise_for_status()
        return base64.b64encode(response.content).decode("utf-8")

    if isinstance(data, str) and os.path.exists(data):
        with open(data, "rb") as file:
            return base64.b64encode(file.read()).decode("utf-8")

    raise ValueError(
        "Invalid input: must be bytes, a valid URL, or existing local file.")
