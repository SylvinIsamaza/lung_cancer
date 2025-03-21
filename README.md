# Lung Cancer Prediction Application

A full-stack application for lung cancer prediction using machine learning, built with FastAPI and a modern frontend framework.

## Project Structure

```
├── backend/           # Python FastAPI backend
│   ├── app/          # Main application code
│   ├── models/       # Machine learning models
│   └── requirements.txt
└── frontend/         # Frontend application
    ├── src/          # Source code
    └── public/       # Static assets
```

## Backend Setup

1. Create a Python virtual environment:
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```sh
pip install -r requirements.txt
```

3. Set up environment variables and activate it:

4. Run the backend server:
```sh
uvicorn app.main:app --reload
```

## Frontend Setup

1. Install dependencies:
```sh
cd frontend
npm install
```

2. Run the development server:
```sh
npm run dev
```

## Technologies Used

### Backend
- FastAPI - Modern Python web framework
- SQLAlchemy - SQL toolkit and ORM
- scikit-learn - Machine learning library
- Python-Jose - JWT token handling
- uvicorn - ASGI server

### Frontend
- Modern JavaScript/TypeScript framework
- Tailwind CSS - Utility-first CSS framework
- Vite - Build tool and development server

## Features

- User authentication and authorization
- Lung cancer prediction using machine learning
- Secure API endpoints
- Modern responsive UI

## API Documentation

When running the backend server, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## License

[Add your license here]