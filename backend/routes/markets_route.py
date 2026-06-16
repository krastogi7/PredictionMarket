from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas import MarketCreateRequest 
from models import Market, User
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

@router.get("/{market_id}")
async def get_market(market_id: int, db: Session = Depends(get_db)):
    market = db.query(Market).filter(Market.id == market_id).first()

    if market is None:
        raise HTTPException(
            status_code=404,
            detail="Market Not Found"
        )
    
    return market