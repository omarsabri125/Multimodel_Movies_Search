from pydantic_settings import BaseSettings
from pydantic import ConfigDict
from typing import Optional


class Settings(BaseSettings):

    COHERE_API_KEY: Optional[str] = None
    WEAVIATE_API_KEY: Optional[str] = None
    MOVIE_DB_API_KEY: Optional[str] = None
    OPENROUTER_API_KEY: Optional[str] = None
    BASE_URL: Optional[str] = None
    WEAVIATE_URL: Optional[str] = None
    COLLECTION_NAME: Optional[str] = None
    VECTOR_NAME: Optional[str] = None

    MOVIE_BATCH_SIZE: int
    MOVIE_POSTER_IMAGE_WEIGHT: float
    MOVIE_TITLE_WEIGHT: float
    MOVIE_OVERVIEW_WEIGHT: float

    MOVIE_DATAFRAME_PATH: Optional[str] = None

    RESPONSE_LIMIT: int
    TEXT_RESPONSE_DISTANCE: float
    IMAGE_RESPONSE_DISTANCE: float

    LLM_MULTIMODEL: str
    MAX_TOKENS: int

    APP_NAME: str

    IMAGE_ALLOWED_EXTENSIONS: list

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


def get_settings():

    return Settings()
