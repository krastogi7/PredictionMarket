# PredictMarket

A fake-money prediction market web app. Users get a starting play-money balance, browse and create Yes/No markets, bet on outcomes, and market creators resolve their markets to pay out winners.

## Features

- **Accounts** — register/login with JWT auth, each user starts with $1,000 fake balance
- **Markets** — any logged-in user can create a Yes/No market with a question, description, and closing date
- **Betting** — odds move dynamically as a pool-based AMM (each bet shifts the Yes/No pool); the price at the moment you bet is locked in as fixed-odds shares, so later bets don't change your payout
- **Resolution & payouts** — only a market's creator can resolve it (Yes/No); resolving pays out `$1 per share` to every winning bet and marks losing bets accordingly
- **Profile** — view your balance, bet history (with win/loss status), and the markets you've created

## Tech stack

- **Backend**: FastAPI, SQLAlchemy, PostgreSQL (hosted on Supabase), JWT auth (`python-jose`), `passlib`/`bcrypt` for password hashing
- **Frontend**: React (Vite), React Router

## Project structure

```
backend/
  main.py            # FastAPI app setup, CORS, router registration
  models.py           # SQLAlchemy models: User, Market, Bet
  schemas.py           # Pydantic request schemas
  auth.py             # password hashing, JWT issuing/verification
  database.py          # SQLAlchemy engine/session
  routes/
    auth_route.py       # register, login, /me
    markets_route.py     # create/list/get markets, my markets, resolve market
    bets_route.py        # place bets, list my bets

frontend/
  src/
    pages/             # route-level pages (Browse, Market, Create, Profile, My Markets, Login, Register, Home)
    components/          # reusable UI pieces (MarketCard, MyMarketCard, BetRow, Navbar)
    api/api.jsx           # fetch wrappers for the backend API
```

## Running locally

### Backend

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:

```
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Then start the API:

```
uvicorn main:app --reload
```

### Frontend

```
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8000` (see `frontend/src/api/api.jsx`).
