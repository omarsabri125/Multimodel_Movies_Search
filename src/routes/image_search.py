from src.stores import VectordbWeaviate
from src.service import LlmMultimodel
from src.routes import ImageRequest
from src.logger import logger
from src.service import run_search_by_image
from src.helper import get_settings, Settings
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))

image_search_router = APIRouter(
    prefix="/api/v1",
    tags=["multimodel-rag-movies-recommendation"]
)


@image_search_router.post("/search_by_image")
async def search_by_image(upload: ImageRequest = Depends(ImageRequest.as_upload), app_config: Settings = Depends(get_settings)):

    logger.info(
        f"Received file upload request for filename: {upload.image_file.filename}")

    llm_multimodel = LlmMultimodel()

    # Validate Image

    if not llm_multimodel.validate_image(upload.image_file):

        logger.error(
            f"File validation failed: File type {upload.image_file.content_type} is not allowed.")
        return JSONResponse(
            status_code=400,
            content={
                "message": f"File type {upload.image_file.content_type} is not allowed."}
        )

    try:
        image_bytes = await upload.image_file.read()
        logger.info(f"Received image")

        weaviate_obj = VectordbWeaviate(app_config)

        reponse = run_search_by_image(weaviate_obj, image_bytes)
        logger.info("Image search processed successfully.")

        return JSONResponse(
            status_code=200,
            content={
                "respone": reponse
            }
        )
    except ValueError as e:
        logger.error(
            "Invalid input: must be bytes, a valid URL, or existing local file.")
        return JSONResponse(status_code=400, content={"error": str(e)})
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})
