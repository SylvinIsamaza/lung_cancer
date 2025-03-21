from fastapi import FastAPI
from app.api.v1.prediction import router as api_router
from app.api.v1.auth import router as auth_router
from app.database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter

router = APIRouter()

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Lung Cancer Prediction API")
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allow_headers=["*"],
)

@router.options("*")
async def options():
    return {"message": "Lung Cancer Prediction API v1"}

app.include_router(api_router, prefix="/v1")
app.include_router(auth_router, prefix="/v1")
