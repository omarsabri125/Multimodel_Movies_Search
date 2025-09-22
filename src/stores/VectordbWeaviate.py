import weaviate
from weaviate.classes.init import Auth
from weaviate.classes.config import Configure, DataType, Multi2VecField, Property
from weaviate.util import generate_uuid5
from src.utils.encode_utils import toBase64


class VectordbWeaviate:

    def __init__(self, config):

        self.config = config
        self.client = None
        self.list = list()

    def connect_weaviate(self):

        headers = {
            "X-Cohere-Api-Key": self.config.COHERE_API_KEY
        }

        self.client = weaviate.connect_to_weaviate_cloud(
            # `weaviate_url`: your Weaviate URL
            cluster_url=self.config.WEAVIATE_URL,
            # `weaviate_key`: your Weaviate API key
            auth_credentials=Auth.api_key(self.config.WEAVIATE_API_KEY),
            headers=headers
        )

        return self.client.is_ready()

    def close_weaviate(self):

        if self.client:
            self.client.close()

    def create_collection(self):

        if not self.client.collections.exists(self.config.COLLECTION_NAME):

            self.client.collections.create(

                self.config.COLLECTION_NAME,
                properties=[
                    Property(name="title", data_type=DataType.TEXT),
                    Property(name="overview", data_type=DataType.TEXT),
                    Property(name="poster", data_type=DataType.BLOB),
                    Property(name="poster_path", data_type=DataType.TEXT)
                ],
                vector_config=[
                    Configure.Vectors.multi2vec_cohere(
                        name=self.config.VECTOR_NAME,
                        # Define the fields to be used for the vectorization - using image_fields, text_fields
                        image_fields=[
                            Multi2VecField(
                                name="poster", weight=self.config.MOVIE_POSTER_IMAGE_WEIGHT)
                        ],
                        text_fields=[
                            Multi2VecField(
                                name="title", weight=self.config.MOVIE_TITLE_WEIGHT),
                            Multi2VecField(
                                name="overview", weight=self.config.MOVIE_OVERVIEW_WEIGHT)

                        ],
                    )
                ]
            )

    def get_collection(self):
        return self.client.collections.use(self.config.COLLECTION_NAME)

    def delete_collection(self):
        return self.client.collections.delete(self.config.COLLECTION_NAME)

    def insert_data_into_vectordb(self, df):

        movies = self.get_collection()
        with movies.batch.rate_limit(self.config.MOVIE_BATCH_SIZE) as batch:
            # for index, movie in df.sample(20).iterrows():
            for index, movie in df.iterrows():

                # In case you run it again - Don't import movies that are already in.
                if (movies.data.exists(generate_uuid5(movie.id))):
                    print(
                        f'{index}: Skipping insert. The movie "{movie.title}" is already in the database.')
                    continue

                print(f'{index}: Adding "{movie.title}"')

                # generate base64 representation of the poster
                posterb64 = toBase64(movie.poster_path)

                # Build the object payload
                movie_obj = {
                    "title": movie.title,
                    "overview": movie.overview,
                    "poster_path": movie.poster_path,
                    "poster": posterb64
                }

                # Add object to batch queue
                batch.add_object(
                    properties=movie_obj,
                    uuid=generate_uuid5(movie.id),
                )

    def check_failed_objects(self):
        movies = self.get_collection()
        if len(movies.batch.failed_objects) > 0:
            print(
                f"Failed to import {len(movies.batch.failed_objects)} objects")
            for failed in movies.batch.failed_objects:
                print(f"Error: {failed.message}")
        else:
            print("No errors")

    def search_by_text(self, text):
        self.result = []
        movies = self.get_collection()
        response = movies.query.near_text(
            query=text,  # The model provider integration will automatically vectorize the query "Epic super hero"
            distance=self.config.TEXT_RESPONSE_DISTANCE,
            limit=self.config.RESPONSE_LIMIT
        )

        if not response.objects or len(response.objects) == 0:
            return {
                "message": "The results not found"
            }

        for obj in response.objects:
            self.result.append(
                {
                    "title": obj.properties["title"],
                    "overview": obj.properties["overview"],
                    "poster_path": toBase64(obj.properties["poster_path"])
                }
            )

        return self.result

    def search_by_image(self, image_path):
        self.result = []
        movies = self.get_collection()
        response = movies.query.near_image(
            # The model provider integration will automatically vectorize the query
            near_image=toBase64(image_path),
            distance=self.config.IMAGE_REPONSE_DISTANCE,
            limit=self.config.RESPONSE_LIMIT
        )

        if not response.objects or len(response.objects) == 0:
            return {
                "message": "The results not found"
            }

        for obj in response.objects:
            self.result.append(
                {
                    "title": obj.properties["title"],
                    "overview": obj.properties["overview"],
                    "poster_path": toBase64(obj.properties["poster_path"])
                }
            )

        return self.result
