import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from database import get_db
from models import User


load_dotenv()

# Gathers each environmental variable from .env file
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Hashes the password given
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Returns true if the password matches the hashed password

def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def create_access_token(user_id: int) -> str:
    # calculates the time that the JWT should expire
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    token = jwt.encode(
        {"sub": str(user_id), "exp": expire},
        SECRET_KEY,
        ALGORITHM
    )

    return token


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could Not Validate Token",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # decodes the JWT
        
        user_id = payload["sub"] # gets the users id from the decoded JWT

        if user_id is None:
            raise credential_exception

    except JWTError:
        raise credential_exception
    
    user = db.query(User).filter(User.id == int(user_id)).first()

    if user is None:
        raise credential_exception
    
    return user