from fastapi import APIRouter, Depends, HTTPException
from app.models.patient import PatientData
from app.services.prediction import predictor
from app.database.database import get_db
from app.models.user import User
from sqlalchemy.orm import Session
from datetime import datetime
from app.services.auth import get_current_user

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Lung Cancer Prediction API v1"}


@router.post("/predict")
async def predict(
    data: PatientData,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    data.RECORDED_BY = current_user.username

    data.CREATED_AT = datetime.now()

    result = predictor.predict(data)

    db.add(data)
    db.commit()
    db.refresh(data)

    return {
        "prediction_result": result,
        "patient_id": data.id  
    }


@router.get("/dashboard")
async def dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    last_prediction_result = (
        db.query(PatientData)
        .filter(PatientData.RECORDED_BY == current_user.username)
        .order_by(PatientData.CREATED_AT.desc())
        .first()
    )

    if not last_prediction_result:
        raise HTTPException(status_code=404, detail="No predictions found for this user")

    last_prediction_date = last_prediction_result.CREATED_AT

    assessments = (
        db.query(PatientData)
        .filter(PatientData.RECORDED_BY == current_user.username)
    )
    total_assessment = assessments.count()

    return {
        "last_prediction_date": last_prediction_date,
        "total_assessment": total_assessment
    }