# 🎬 Multimodal Marvel Movie Recommendation System  
🚀 *AI-powered RAG system for multimodal search with Weaviate*  

![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python)  
![Weaviate](https://img.shields.io/badge/Weaviate-VectorDB-orange?logo=weaviate)  
![FastAPI](https://img.shields.io/badge/API-FastAPI-teal?logo=fastapi)  
![License](https://img.shields.io/badge/License-MIT-green)  

---

## 📖 Overview  

This project is an **AI-based multimodal recommendation system** for **Marvel movies**, built with **Weaviate Vector Database** and **Retrieval-Augmented Generation (RAG)**.  

It allows searching for movies using **text, image, audio, or video queries** and returns the most relevant results with embeddings stored in **Weaviate**.  

✨ The goal is to show how **multimodal RAG** can be applied to build smart, context-aware recommendation systems.  

---

## ✨ Key Features  

- 🔍 **Text Search** → Search using natural language queries  
- 🖼️ **Image Search** → Upload posters or screenshots  
- 🎧 **Audio Search** → Query using voice (speech-to-text pipeline)  
- 🎥 **Video Search** → Frame-based video similarity search  
- ⚡ **Weaviate Integration** → Store and query embeddings efficiently  
- 📊 Dataset of Marvel movies with posters & metadata  

---

## 🛠️ Tech Stack  

- **Language**: Python 3.11+  
- **Database**: [Weaviate](https://weaviate.io/) (Vector Database)  
- **Embeddings**: Cohere / OpenAI / CLIP  
- **Frameworks**: FastAPI (backend), Streamlit/Gradio (optional UI)  
- **ML Libraries**: PyTorch, Transformers  
- **Data**: Marvel movie posters + metadata CSV  

---


## 📂 Project Structure

```
Multimodel_Movies_Search/
│── assets/
│ ├── movie_posters/ # Marvel movie posters dataset
│ ├── test/ # Test data & screenshots
│ └── movies_with_local_posters.csv # Movie metadata with posters
│
│── src/
│ ├── routes/ # API routes
│ │ ├── base.py
│ │ ├── image_search.py # Image search endpoint
│ │ ├── text_search.py # Text search endpoint
│ │ └── schemas/ # Request/response schemas
│ │ ├── ImageRequest.py
│ │ ├── TextSearch.py
│ │ └── init.py
│ │
│ ├── service/ # Business logic layer
│ │ ├── llm_multimodel.py
│ │ ├── MultimodelPipeline.py
│ │ ├── search_by_image.py
│ │ ├── search_by_text.py
│ │ └── init.py
│ │
│ ├── stores/ # Vector DB connectors
│ │ ├── VectordbWeaviate.py
│ │ └── init.py
│ │
│ ├── utils/ # Utilities
│ │ ├── data_utils.py
│ │ ├── encode_utils.py
│ │ └── init.py
│ │
│ ├── helper/
│ │ ├── init.py
│ │ └── config.py
│ │
│ ├── main.py # Entry point (FastAPI app)
│ ├── logger.py
│ 
│── requirements.txt # Project dependencies
│── README.md # Project documentation
│── .env.example # Example env variables
│── .env # (your local env variables)
│── test.py # Quick test script
│── .gitignore # Git ignore file

```
## 🖼️ Data Collection & Ingestion

Movie data and posters were collected automatically using a **custom Data Ingestion pipeline** powered by the [TMDB API](https://developer.themoviedb.org/).

### Features:
- Fetches movie metadata (ID, Title, Overview, Poster).
- Downloads and saves posters locally under `assets/movie_posters/`.
- Stores metadata in `assets/movies_with_local_posters.csv`.
- Ensures filenames are safe and consistent across OS.
- Easily configurable for different **genres** and **keywords** (default: Action + Sci-Fi + Superhero).

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/omarsabri125/Multimodel_Movies_Search.git
   cd Multimodel_Movies_Search
   ```

2. **Create and activate virtual environment**:
   ```bash
   python -m venv myenv
   source myenv/bin/activate   # Linux/Mac
   myenv\Scripts\activate      # Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables** in `.env`:
   ```env
   COHERE_API_KEY=your_key_here
   OPENAI_API_KEY=your_key_here
   WEAVIATE_URL=https://your-weaviate-instance.weaviate.network
   ```
5. **Install Frontend Dependencies (Node.js)**

   Make sure Node.js is installed: https://nodejs.org
   Then, go to the frontend folder and install the packages:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
6. **Run the application**:
   ```bash
   uvicorn src.main:app --reload
   ```

---

## 🚀 Usage Examples

### 🔎 Text Search
```http
POST /search_by_text
Content-Type: application/json

{
  "query": "superhero with iron suit"
}
```

### 🖼️ Image Search
```bash
curl -X POST "http://localhost:8000//search_by_image" \
  -F "file=@assets/test/ironman_poster.jpg"
```

### 🎧 Audio Search
1. Record a voice query → convert to text via Speech-to-Text.  
2. Send query to `/search_by_text`.

### 🎥 Video Search
- Upload a video clip → system extracts frames → runs similarity search.  

---



