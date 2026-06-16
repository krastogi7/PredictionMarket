from sqlalchemy import String, Column, Integer, String, Float, Boolean, ForeignKey, Date, DateTime
from sqlalchemy.sql import func
from database import Base

# file covers the database table design


# defines the users table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    balance = Column(Float, default=1000)


class Market(Base):
    __tablename__ = "markets"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    desc = Column(String, default="")
    volume = Column(Float, default=0)
    odds_yes = Column(Float, default=50)
    status = Column(String, default="open") # opened/closed
    end_time = Column(Date, nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)


class Bet(Base):
    __tablename__ = "bets"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    market_id = Column(Integer, ForeignKey("markets.id"), nullable=False)
    amount = Column(Float, nullable=False)
    position = Column(String, nullable=False) # yes/no
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    staus = Column(String, nullable=False, default="open")