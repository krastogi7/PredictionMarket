import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div className="logo-circle">PM</div>
                <span>PredictMarket</span>
            </div>

            <div className="navbar-links">
                <button onClick={() => navigate("/browse")}>Browse Markets</button>
                <button onClick={() => navigate("/markets")}>View My Markets</button>
                <button onClick={() => navigate("/profile")}className="profile-button">My Profile</button>
            </div>
        </nav>
    );
}

export default Navbar;