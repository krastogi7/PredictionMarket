import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect } from "react";

function HomePage() {
    const navigate = useNavigate()

    // routes the user to the browse page if they are already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/browse")
        }
    }, [])


    return (
        <div className="home-page">
            <nav className="home-navbar">
                <div className="home-logo">
                    <div className="logo-circle">PM</div>
                    <span>PredictMarket</span>
                </div>

                <div className="home-nav-buttons">
                    <button className="nav-login-btn" onClick={() => navigate("/login")}>Login</button>
                    <button className="nav-register-btn" onClick={() => navigate("/register")}>Register</button>
                </div>
            </nav>

            <main className="home-hero">
                <section className="hero-content">
                    <p className="hero-badge">Prediction Market Platform</p>

                    <h1>
                        Bet on ideas.
                        <br />
                        Track real outcomes.
                    </h1>

                    <p className="hero-description">
                        Browse prediction markets, make forecasts, and see how your
                        predictions compare with others.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={() => navigate("/register")}>Create an Account</button>
                        <button className="secondary-btn" onClick={() => navigate("/login")}>Login</button>
                    </div>
                </section>

                <section className="hero-card">
                    <div className="market-preview-card">
                        <div className="market-card-header">
                            <span className="market-category">Politics</span>
                            <span className="market-status">Open</span>
                        </div>

                        <h3>Will this market resolve YES?</h3>

                        <div className="market-stats">
                            <div>
                                <p>Yes</p>
                                <strong>64%</strong>
                            </div>

                            <div>
                                <p>No</p>
                                <strong>36%</strong>
                            </div>
                        </div>

                        <div className="market-progress">
                            <div className="market-progress-fill"></div>
                        </div>

                        <p className="market-note">
                            Sign in to place predictions and track your markets.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;