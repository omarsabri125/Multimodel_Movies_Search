from src.routes.image_search import image_search_router
from src.routes.text_search import text_search_router
from src.routes.analysis_image import analysis_router
from src.routes.base import base_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))

app = FastAPI(title="Multi-Model RAG Search")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_credentials=["*"],
    allow_headers=["*"],
)

# async def startup_span():



# async def shutdown_span():



app.include_router(base_router)
app.include_router(analysis_router)
app.include_router(text_search_router)
app.include_router(image_search_router)

# uvicorn src.main:app --reload
