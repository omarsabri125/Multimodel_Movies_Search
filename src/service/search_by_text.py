from src.logger import logger
from src.helper.config import Settings, get_settings
from src.stores import VectordbWeaviate
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))


def run_search_by_text(weaviate_object: VectordbWeaviate, text):

    weaviate_object.connect_weaviate()
    logger.info("Connection successfully")

    result = weaviate_object.search_by_text(text)
    logger.info("Search successfully")

    weaviate_object.close_weaviate()
    logger.info("Closing successfully")

    return result
