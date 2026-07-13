from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from schemas import MarketCreateRequest, MarketResolveRequest
from models import Market, User, Bet
from database import get_db
from auth import get_current_user

router = APIRouter(prefix="/markets", tags=["markets"])

@router.post("/")
async def create_market(market: MarketCreateRequest, db: Session = Depends(get_db), 
    user: User = Depends(get_current_user)):

    new_market = Market(
        question=market.question,
        desc=market.description,
        end_time=market.close_date,
        creator_id=user.id
    )
    
    db.add(new_market)
    db.commit()
    db.refresh(new_market)

    return new_market

@router.get("/mine")
async def get_my_markets(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    markets = db.query(Market).filter(Market.creator_id == user.id).all()

    return markets


@router.get("/{market_id}")
async def get_market(market_id: int, db: Session = Depends(get_db)):
    market = db.query(Market).filter(Market.id == market_id).first()

    if market is None:
        raise HTTPException(
            status_code=404,
            detail="Market Not Found"
        )
    
    return market


@router.get("/")
async def get_markets(db: Session = Depends(get_db)):
    markets = db.query(Market).filter(Market.status == "open").all()

    return markets


@router.post("/{market_id}/resolve")
async def resolve_market(market_id: int, data: MarketResolveRequest, db: Session = Depends(get_db),
    user: User = Depends(get_current_user)):

    market = db.query(Market).filter(Market.id == market_id).first()

    if market is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Market Not Found"
        )

    # only the market's creator may resolve it
    if market.creator_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the market creator can resolve this market"
        )

    if market.status != "open":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Market is already resolved"
        )

    if data.outcome not in ["yes", "no"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Outcome must be yes or no"
        )

    market.outcome = data.outcome
    market.status = "closed"

    # pays out winning bets and marks every bet won/lost
    bets = db.query(Bet).filter(Bet.market_id == market_id).all()

    for bet in bets:
        if bet.position == data.outcome:
            bet.status = "won"
            owner = db.query(User).filter(User.id == bet.owner_id).first()
            owner.balance += bet.shares
        else:
            bet.status = "lost"

    db.commit()
    db.refresh(market)

    return market