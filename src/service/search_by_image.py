import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from src.stores import VectordbWeaviate
from src.logger import logger

def run_search_by_image(weaviate_object: VectordbWeaviate,image):

    weaviate_object.connect_weaviate()
    logger.info("Connection successfully")

    result = weaviate_object.search_by_image(image)
    logger.info("Search successfully")

    weaviate_object.close_weaviate()
    logger.info("Closing successfully")

    return result


