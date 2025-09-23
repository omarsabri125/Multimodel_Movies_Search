# 🎬 Multimodal Marvel Movie Recommendation System (RAG + Weaviate)

An **AI-powered multimodal recommendation system** for Marvel movies using **Weaviate Vector Database**.  
The system supports **multimodal search** (text, image, audio, video) and retrieves the most relevant movies from the database.  

This project shows how **Retrieval-Augmented Generation (RAG)** can be extended with **multimodal embeddings** to build a smart movie search and recommendation engine.

---

## ✨ Features

- 🔍 **Text Search**: Search for Marvel movies using natural language queries.  
- 🖼️ **Image Search**: Upload a movie poster to discover similar movies.  
- 🎧 **Audio Search**: Query with audio descriptions (speech-to-text pipeline).  
- 🎥 **Video Search**: Extract frames from videos and perform similarity search.  
- ⚡ **Weaviate Integration**: Store and query embeddings efficiently.  
- 📊 Dataset of Marvel movies with posters and metadata.  

---

## 🛠️ Tech Stack

- **Python 3.11+**
- [Weaviate](https://weaviate.io/) – vector database  
- **Cohere / OpenAI / CLIP** – multimodal embeddings  
- **FastAPI** – backend APIs  
- **Streamlit / Gradio** – (optional) frontend interface  
- **Pandas & NumPy** – data preprocessing  
- **PyTorch & Transformers** – for model inference  

---

## 📂 Project Structure

```
Multimodel_Movies_Search/
│── assets/
│   ├── movie_posters/              # Posters dataset
│   ├── test/                       # Test data
│   └── movies_with_local_posters.csv
│
│── src/
│   ├── routes/                     # API routes
│   │   ├── image_search.py         # Image search endpoint
│   │   ├── text_search.py          # Text search endpoint
│   │   └── analysis_image.py       # Image analysis
│   ├── stores/                     # Weaviate DB connectors
│   │   └── VectordbWeaviate.py
│   ├── service/                    # Business logic layer
│   ├── utils/                      # Utilities (logging, encoders, etc.)
│   │   └── logger.py
│   └── config.py                   # Project configuration
│
│── main.py                         # Entry point
│── requirements.txt                # Dependencies
│── README.md                       # Documentation
│── .env.example                    # Example environment variables
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/multimodal-movies-search.git
   cd multimodal-movies-search
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

5. **Run the application**:
   ```bash
   python main.py
   ```

---

## 🚀 Usage Examples

### 🔎 Text Search
```http
POST /search/text
Content-Type: application/json

{
  "query": "superhero with iron suit"
}
```

### 🖼️ Image Search
```bash
curl -X POST "http://localhost:8000/search/image" \
  -F "file=@assets/test/ironman_poster.jpg"
```

### 🎧 Audio Search
1. Record a voice query → convert to text via Speech-to-Text.  
2. Send query to `/search/text`.

### 🎥 Video Search
- Upload a video clip → system extracts frames → runs similarity search.  

---

## 📸 Screenshot

Here’s a development screenshot:  

![Screenshot](./assets/test/screenshot.png)


