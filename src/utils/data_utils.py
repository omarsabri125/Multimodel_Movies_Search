import re
from src.logger import logger
from src.helper.config import Settings, get_settings
import pandas as pd
import requests
import sys
import os
sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '..')))


class DataIngestion:

    def __init__(self):
        self.config = get_settings()
        self.API_KEY = self.config.MOVIE_DB_API_KEY  # put your TMDB API key here
        self.base_url = self.config.BASE_URL

    def get_project_path(self):
        return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    def safe_filename(self, name: str, ext: str = ".jpg") -> str:

        safe_name = re.sub(r'[\\/*?:"<>|]', "_", name)
        return safe_name + ext

    def save_poster_path(self):

        save_dir = os.path.join(self.get_project_path(),
                                "assets", "movie_posters")

        if not os.path.exists(save_dir):
            os.makedirs(save_dir, exist_ok=True)
            print(f"Created folder: {save_dir}")

        return save_dir

    def fetch_data(self, genres="28,878", keywords="9715", pages=2):
        """
        Fetch movies with mix of genres and keywords (default: Action + Sci-Fi + Superhero).
        """
        movies_data = []
        for page in range(1, pages + 1):
            url = (
                f"https://api.themoviedb.org/3/discover/movie"
                f"?api_key={self.API_KEY}&language=en-US&page={page}"
                f"&with_genres={genres}&with_keywords={keywords}"
            )
            data = requests.get(url).json()

            for movie in data.get("results", []):
                movie_id = movie["id"]
                title = movie["title"]
                overview = movie["overview"]
                poster_path = movie.get("poster_path")

                if poster_path:
                    poster_url = self.base_url + poster_path
                    filename = self.safe_filename(title)
                    local_path = os.path.join(
                        self.save_poster_path(), filename)

                    img_data = requests.get(poster_url).content
                    with open(local_path, "wb") as f:
                        f.write(img_data)

                    movies_data.append({
                        "id": movie_id,
                        "title": title,
                        "overview": overview,
                        "poster_path": local_path
                    })

        df = pd.DataFrame(movies_data)
        csv_path = os.path.join(self.get_project_path(
        ), "assets", "movies_with_local_posters.csv")
        df.to_csv(csv_path, index=False)

        logger.info(
            f"Downloaded {len(df)} movies (Action + Sci-Fi + Superhero) and saved to {csv_path}")

        return df


# data_ingestion = DataIngestion()

# # df = data_ingestion.fetch_data()

# df = data_ingestion.fetch_data(genres="28,12", keywords="9715,180547")
