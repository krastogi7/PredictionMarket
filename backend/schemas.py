from pydantic import BaseModel
from datetime import datetime


# frontend -> backend, user making a new account
class RegisterRequest(BaseModel):
    name: str 
    email: str 
    password: str 

# frontend -> backend, user logging into an account
class LoginRequest(BaseModel):
    email: str
    password: str


# backend -> frontend, gives all the information on a user
class UserResponse(BaseModel):
    name: str
    email: str
    id: str
    balance: float

class MarketCreateRequest(BaseModel):
    question: str
    description: str
    close_date: datetime

class BetCreateRequest(BaseModel):
    market_id: int
    position: str
    amount: float

class MarketResolveRequest(BaseModel):
    outcome: str
