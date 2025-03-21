from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.services.auth import register_user,authenticate_user, create_access_token,get_current_user
import os
from app.database.database import get_db
from app.models.user import User
from datetime import timedelta

from dotenv import load_dotenv
load_dotenv()
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


router = APIRouter()
@router.post("/register")
async def register(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  
    response = register_user(db, form_data.username, form_data.password)
    if response["status_code"] == 400:
        return response
    user = response['user']
    return {"msg": f"User {user.username} registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me")
async def get_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username   
    }