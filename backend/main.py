from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy import text

from routes import users_route, auth_route, markets_route, bets_route
import models


app = FastAPI(title="Prediction Market")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# creates table in the database if they do not already exist
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "API online"}


app.include_router(users_route.router)
app.include_router(auth_route.router)
app.include_router(bets_route.router)
app.include_router(markets_route.router)