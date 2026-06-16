import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "./BrowsePage.css";

function BrowsePage() {
  const navigate = useNavigate()

  useEffect(() => {
          if (!localStorage.getItem("token")) {
              navigate("/browse")
          }
      }, [])


  return (
    <div className="browse-page">
      <div className="browse-header">
        <div>
          <p className="page-label">Markets</p>
          <h1>Browse Prediction Markets</h1>
          <p className="page-description">
            Explore open markets, view probabilities, and find predictions to follow.
          </p>
        </div>

        <button className="create-market-btn" onClick={() => navigate("/create")}>Create Market</button>
      </div>

      <div className="browse-controls">
        <div className="search-box">
          <span>🔍</span>
          <input placeholder="Search markets..." />
        </div>

        <div className="filter-buttons">
          <button className="active-filter">All</button>
          <button>Politics</button>
          <button>Sports</button>
          <button>Tech</button>
          <button>Finance</button>
        </div>
      </div>

      <div className="markets-grid">
        <div className="market-card">
          <div className="market-card-top">
            <span className="market-category politics">Politics</span>
            <span className="market-status">Open</span>
          </div>

          <h2>Will the next election polling average shift by 5%?</h2>

          <p className="market-description">
            Predict whether the polling average will move significantly before the deadline.
          </p>

          <div className="market-outcomes">
            <div>
              <span>Yes</span>
              <strong>62%</strong>
            </div>

            <div>
              <span>No</span>
              <strong>38%</strong>
            </div>
          </div>

          <div className="probability-bar">
            <div className="probability-fill fill-62"></div>
          </div>

          <div className="market-footer">
            <span>$1,240 volume</span>
            <span>Ends Jun 30</span>
          </div>
        </div>

        <div className="market-card">
          <div className="market-card-top">
            <span className="market-category sports">Sports</span>
            <span className="market-status">Open</span>
          </div>

          <h2>Will New York win its next home game?</h2>

          <p className="market-description">
            Forecast whether New York will win based on current team performance.
          </p>

          <div className="market-outcomes">
            <div>
              <span>Yes</span>
              <strong>48%</strong>
            </div>

            <div>
              <span>No</span>
              <strong>52%</strong>
            </div>
          </div>

          <div className="probability-bar">
            <div className="probability-fill fill-48"></div>
          </div>

          <div className="market-footer">
            <span>$830 volume</span>
            <span>Ends Jul 4</span>
          </div>
        </div>

        <div className="market-card">
          <div className="market-card-top">
            <span className="market-category tech">Tech</span>
            <span className="market-status">Open</span>
          </div>

          <h2>Will a major AI company release a new model this month?</h2>

          <p className="market-description">
            Predict whether a large AI lab announces a new public model release.
          </p>

          <div className="market-outcomes">
            <div>
              <span>Yes</span>
              <strong>71%</strong>
            </div>

            <div>
              <span>No</span>
              <strong>29%</strong>
            </div>
          </div>

          <div className="probability-bar">
            <div className="probability-fill fill-71"></div>
          </div>

          <div className="market-footer">
            <span>$2,410 volume</span>
            <span>Ends Jun 20</span>
          </div>
        </div>

        <div className="market-card">
          <div className="market-card-top">
            <span className="market-category finance">Finance</span>
            <span className="market-status">Open</span>
          </div>

          <h2>Will interest rates decrease before the end of the year?</h2>

          <p className="market-description">
            Predict whether the target rate changes before the market closes.
          </p>

          <div className="market-outcomes">
            <div>
              <span>Yes</span>
              <strong>57%</strong>
            </div>

            <div>
              <span>No</span>
              <strong>43%</strong>
            </div>
          </div>

          <div className="probability-bar">
            <div className="probability-fill fill-57"></div>
          </div>

          <div className="market-footer">
            <span>$3,120 volume</span>
            <span>Ends Dec 31</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;