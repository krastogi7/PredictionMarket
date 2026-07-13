import { useNavigate, useParams } from "react-router-dom";
import "./MarketPage.css";
import { useEffect, useState } from "react";
import { apiCreateBet, apiGetMarket, apiGetMe, apiResolveMarket } from "../api/api";

function MarketPage() {
    const { marketId } = useParams()
    const [market, setMarket] = useState({})
    const [loading, setLoading] = useState(false)
    const [resolving, setResolving] = useState(false)
    const [me, setMe] = useState({})
    const [betAmount, setBetAmount] = useState(50)
    const [yesSelected, setYesSelected] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        async function initializeMarket() {
            try {
                const data = await apiGetMarket(marketId)
                setMarket(data)
            }
            catch (err) {
                navigate("/browse")
            }
        }

        async function initializeMe() {
            try {
                const data = await apiGetMe()
                setMe(data)
            }
            catch (err) {
                localStorage.removeItem("token")
                navigate("/login")
            }
        }

        initializeMarket()
        initializeMe()
    }, [])

    // price (0-100) of the currently selected outcome, and what a bet at that price would pay out if it wins
    const price = yesSelected ? market.odds_yes : 100 - market.odds_yes
    const potentialPayout = price > 0 ? (betAmount / price) * 100 : 0
    const potentialProfit = potentialPayout - betAmount

    function handleChange(e) {
        e.preventDefault()
        setBetAmount(e.target.value)
    }

    async function createBet() {
        setLoading(true)

        // checks that the bet amount is a valid number before calling the api
        if (me.balance < betAmount || betAmount <= 0) {
            return
        }

        try {
            const position = yesSelected ? "yes" : "no"

            await apiCreateBet(marketId, betAmount, position)
            navigate("/profile")
        }

        catch (err) {
            console.log(err)
        }

        finally {
            setLoading(false)
        }
    }

    async function resolveMarket(outcome) {
        setResolving(true)

        try {
            const data = await apiResolveMarket(marketId, outcome)
            setMarket(data)
        }

        catch (err) {
            console.log(err)
        }

        finally {
            setResolving(false)
        }
    }


    return (
        <div className="market-details-page">
            <div className="market-details-header">
                <div>
                    <h1>{market.question}</h1>
                    <p className="market-subtitle">
                        {market.desc}
                    </p>
                </div>

                <button className="back-button" onClick={() => navigate("/browse")}>← Back to Markets</button>
            </div>

            <div className="market-details-layout">
                <div className="market-left-column">
                    <div className="market-card">
                        <div className="live-badge">● LIVE MARKET</div>

                        <div className="market-card-header">
                            <div>
                                <h2>{market.question}</h2>

                                <div className="market-meta-row">
                                    <span className="category-pill">Sports</span>
                                    <span>${market.yes_pool + market.no_pool} volume</span>
                                </div>
                            </div>

                            <div className="market-end-date">
                                <span>Ends</span>
                                <strong>{market.end_time}</strong>
                            </div>
                        </div>

                        <div className="odds-section">
                            <div className="odds-box">
                                <p>Yes</p>
                                <h3>{Math.round(market.odds_yes)}%</h3>
                            </div>

                            <div className="odds-divider"></div>

                            <div className="odds-box">
                                <p>No</p>
                                <h3>{Math.round(100 - market.odds_yes)}%</h3>
                            </div>
                        </div>

                        <div className="probability-bar">
                            <div className="probability-fill"></div>
                        </div>
                    </div>

                    <div className="market-card">
                        <h2>Market Description</h2>
                        <p className="description-text">
                            {market.desc}
                        </p>

                        <div className="market-info-list">
                            <div className="market-info-row">
                                <span>Ends On</span>
                                <p>{market.end_time}</p>
                            </div>

                            <div className="market-info-row">
                                <span>Market Type</span>
                                <p>Yes / No</p>
                            </div>
                        </div>
                    </div>
                </div>

                {market.status === "open" ?
                <div className="bet-card">
                    <h2>Place Your Bet</h2>

                    <div className="form-group">
                        <label>Choose Outcome</label>

                        <div className="outcome-buttons">
                            <button
                                className={yesSelected ? "outcome-button selected" : "outcome-button"}
                                onClick={() => setYesSelected(true)}>
                                Yes <span>{Math.round(market.odds_yes)}¢</span>
                            </button>

                            <button
                                className={yesSelected ? "outcome-button" : "outcome-button selected"}
                                onClick={() => setYesSelected(false)}>
                                No <span>{Math.round(100 - market.odds_yes)}¢</span>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Bet Amount</label>

                        <div className="amount-input-wrapper">
                            <span>$</span>
                            <input
                                type="number"
                                value={betAmount}
                                onChange={handleChange}
                            />
                        </div>

                        <p className="balance-text">
                            Available Balance: <strong>${me.balance}</strong>
                        </p>
                    </div>

                    <div className="return-box">
                        <p>If this resolves {yesSelected ? "Yes" : "No"}, you will receive</p>
                        <h3>${potentialPayout.toFixed(2)}</h3>
                        <span>+{Math.round(betAmount > 0 ? potentialProfit / betAmount * 100: 0)}% potential profit</span>
                    </div>

                    <button className="confirm-button" onClick={() => createBet()}>
                        {loading ? "Loading..." : "Confirm Bet"}
                    </button>

                    <div className="security-box">
                        <div className="security-icon">🛡️</div>
                        <div>
                            <strong>Your funds are secure</strong>
                            <p>All bets are held until the market resolves.</p>
                        </div>
                    </div>

                    {market.creator_id === me.id &&
                    <div className="resolve-box">
                        <strong>You created this market</strong>
                        <p>Once the outcome is known, resolve it to pay out winning bets.</p>

                        <div className="resolve-buttons">
                            <button className="resolve-yes-btn" disabled={resolving} onClick={() => resolveMarket("yes")}>
                                Resolve Yes
                            </button>
                            <button className="resolve-no-btn" disabled={resolving} onClick={() => resolveMarket("no")}>
                                Resolve No
                            </button>
                        </div>
                    </div>}
                </div>
                :
                <div className="bet-card">
                    <h2>Market Resolved</h2>
                    <div className="resolved-outcome">
                        This market resolved <strong>{market.outcome === "yes" ? "Yes" : "No"}</strong>. Winning bets have been paid out.
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default MarketPage;