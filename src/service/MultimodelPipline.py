import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
import pandas as pd
from src.stores import VectordbWeaviate
from src.helper.config import Settings, get_settings
from src.logger import logger

def multimodel_pipline(weaviate_object: VectordbWeaviate, df: pd.DataFrame):

    weaviate_object.connect_weaviate()
    logger.info("Connection successfully")
    print("\n")
    
    weaviate_object.create_collection()
    logger.info("Collection created")
    print("\n")

    weaviate_object.insert_data_into_vectordb(df)
    logger.info("Data inserted successfully")
    print("\n")

    weaviate_object.check_failed_objects()
    logger.info("Checked failed objects")

    weaviate_object.close_weaviate()
    logger.info("Closing successfully")



config = get_settings()
weaviate_object = VectordbWeaviate(config)

df = pd.read_csv(config.MOVIE_DATAFRAME_PATH)

logger.info("Loading successfully")

multimodel_pipline(weaviate_object,df)








