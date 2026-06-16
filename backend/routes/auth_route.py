from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models import User
from schemas import RegisterRequest, LoginRequest
from database import get_db
from auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
async def register(user: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    # checks if the email is already used in the database, if so raises error
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail=f"Account already exists with email {user.email}"
        )

    # builds the User column for the database
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login")
async def login(data: LoginRequest, db: Session = Depends(get_db)):
    info_error = HTTPException(
        status_code=401,
        detail="Invalid Email Or Password"
    )

    user = db.query(User).filter(User.email == data.email).first()

    # a user does not exist with the email given
    if not user:
        raise info_error
    
    # the users password does not match the hash
    if not verify_password(data.password, user.hashed_password):
        raise info_error

    token = create_access_token(user.id)

    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    return {
        "name": user.name,
        "email": user.email,
        "id": user.id,
        "balance": user.balance
    }