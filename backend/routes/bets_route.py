from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from schemas import BetCreateRequest
from auth import get_current_user
from models import Bet, User, Market

router = APIRouter(prefix="/bets", tags=["bets"])


@router.get("/")
def get_bets(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    bets = db.query(Bet).filter(Bet.owner_id == user.id).all()

    return bets


@router.post("/")
def create_bet(data: BetCreateRequest, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # finds the market with correct id
    market = db.query(Market).filter(Market.id == data.market_id).first()

    # market does not exist
    if not market:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Market not found"
        )
    # confirms that the market is stil open
    if market.status != "open":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Market is closed"
        )
    # a bet was made with negative or 0 amount
    if data.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bet amount must be greater than 0"
        )
    # position must be yes or no
    if data.position not in ["yes", "no"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Position must be yes or no"
        )
    if data.amount > user.balance:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient balance"
        )

    # locks in the price from the market's current odds (never trust a client-supplied price)
    price = market.odds_yes if data.position == "yes" else 100 - market.odds_yes
    shares = data.amount / (price / 100)

    # creates new row to be added to database
    new_bet = Bet (
        owner_id = user.id,
        market_id = data.market_id,
        amount=data.amount,
        price = price,
        shares = shares,
        position = data.position
    )

    # updates the users balance the remove the bet amount
    user.balance -= data.amount

    yes_pool = market.yes_pool
    no_pool = market.no_pool

    # updates the yes/no pool to add the new bet to the pool
    if data.position == "yes":
        yes_pool += data.amount
        market.yes_pool = yes_pool

    else: # no
        no_pool += data.amount
        market.no_pool = no_pool

    # recalculates odds for future bets
    market.odds_yes = yes_pool / (yes_pool + no_pool) * 100

    # creates a new row for the bets database table and commits all the other changes to the user and market
    db.add(new_bet)
    db.commit()
    db.refresh(new_bet)

    return new_bet