from src.service import run_search_by_text
from src.stores import VectordbWeaviate
from src.helper import get_settings, Settings
from src.routes import TextSearch
from src.logger import logger
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))
text_search_router = APIRouter(
    prefix="/api/v1",
    tags=["multimodel-rag-movies-recommendation"]
)


@text_search_router.post("/search_by_text")
async def search_by_text(query: TextSearch, app_config: Settings = Depends(get_settings)):

    try:

        logger.info(f"Received query: {query.text}")

        weaviate_obj = VectordbWeaviate(app_config)

        result = run_search_by_text(weaviate_obj, query.text)

        return JSONResponse(status_code=200, content=result)

    except Exception as e:
        logger.error(f"Error in search_by_text: {str(e)}")
        return JSONResponse(status_code=400, content={"error": str(e)})
