import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { apiGetMe, apiGetMyBets } from "../api/api";
import { useNavigate } from "react-router-dom";
import BetRow from "../components/BetRow";

function ProfilePage() {
    const navigate = useNavigate()
    const [me, setMe] = useState({})
    const [bets, setBets] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function initializeMe() {
            try {
                const data = await apiGetMe()
                setMe(data)

                const betData = await apiGetMyBets()
                setBets(betData)

            }

            catch (err) {
                localStorage.removeItem("token")
                navigate("/login")
            }

            finally {
                setLoading(false)
            }
        }

        initializeMe()
    }, [])


    function logout() {
        localStorage.removeItem("token")
        navigate("/login")
    }


    if (loading) {
        return (<p>loading...</p>)
    }

    return (
        <div className="profile-page">
            <main className="profile-container">
                <section className="profile-top">
                    <div>
                        <p className="section-label">PROFILE</p>
                        <h1>My Profile</h1>
                        <p className="subtitle">
                            View your account details, balance, bets, and created markets.
                        </p>
                    </div>

                    <div className="profile-actions">
                        <button className="edit-profile-btn">Edit Profile</button>
                        <button className="logout-btn" onClick={logout}>Logout</button>
                    </div>
                </section>

                <section className="profile-card compact">
                    <div className="profile-user">
                        <div>
                            <h2>{me.name}</h2>
                            <p>{me.email}</p>
                        </div>
                    </div>

                    <div className="profile-balance">
                        <p>Available Balance</p>
                        <h2>${me.balance}</h2>
                    </div>
                </section>

                <section className="data-card">
                    <div className="card-header">
                        <div>
                            <p className="section-label">BETTING ACTIVITY</p>
                            <h2>My Bets</h2>
                        </div>

                        <button className="small-link-btn">View All Bets</button>
                    </div>

                    <div className="data-table">
                        <div className="table-row table-head">
                            <span>Market</span>
                            <span>Position</span>
                            <span>Amount</span>
                            <span>Odds</span>
                            <span>Status</span>
                        </div>

                        {/* Populates the bets table with the rows */}
                        {bets.map((bet) => (
                            <BetRow status={bet.status} amount={bet.amount} price={bet.price}
                                    position={bet.position} marketId={bet.market_id}/>))}
                    </div>
                </section>

                <section className="data-card">
                    <div className="card-header">
                        <div>
                            <p className="section-label">CREATED MARKETS</p>
                            <h2>My Markets</h2>
                        </div>

                        <button className="small-link-btn">View All Markets</button>
                    </div>

                    <div className="data-table">
                        <div className="table-row market-head">
                            <span>Market</span>
                            <span>Category</span>
                            <span>Volume</span>
                            <span>Yes Odds</span>
                            <span>Status</span>
                        </div>

                        <div className="table-row">
                            <span>Will the next election polling average shift by 5%?</span>
                            <span className="category-badge">Politics</span>
                            <span>$1,240</span>
                            <span>62%</span>
                            <span className="open-badge">Open</span>
                        </div>

                        <div className="table-row">
                            <span>Will New York win its next home game?</span>
                            <span className="category-badge green">Sports</span>
                            <span>$830</span>
                            <span>48%</span>
                            <span className="open-badge">Open</span>
                        </div>

                        <div className="table-row">
                            <span>Will a major AI company release a new model this month?</span>
                            <span className="category-badge purple">Tech</span>
                            <span>$2,150</span>
                            <span>71%</span>
                            <span className="closed-badge">Closed</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ProfilePage;