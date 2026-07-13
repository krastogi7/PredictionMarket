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
    odds_yes = Column(Float, default=50)
    yes_pool = Column(Float, default=50)
    no_pool = Column(Float, default=50)
    status = Column(String, default="open") # open/closed
    outcome = Column(String, nullable=True) # yes/no, set once resolved
    end_time = Column(Date, nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)


class Bet(Base):
    __tablename__ = "bets"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    market_id = Column(Integer, ForeignKey("markets.id"), nullable=False)
    amount = Column(Float, nullable=False)
    price = Column(Float, nullable=False) # price (0-100) locked in at bet time
    shares = Column(Float, nullable=False, default=0) # amount / (price/100); pays $1 each if this position wins
    position = Column(String, nullable=False) # yes/no
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, nullable=False, default="open") # open/won/lost