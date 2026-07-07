import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BrowsePage.css";
import MarketCard from "../components/MarketCard";
import { apiGetMarkets } from "../api/api"

function BrowsePage() {
  const navigate = useNavigate()
  const [markets, setMarkets] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/browse")
    }


    async function loadMarkets() {
      try {
        const res = await apiGetMarkets()
        setMarkets(res)
      }

      catch (err) {
        
      }
    }

    loadMarkets()
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


      </div>

      <div className="markets-grid">

        {markets != null ?
          markets.map((market) => 
          <MarketCard 
            key={market.id}
            description={market.desc} 
            question={market.question} 
            yesPercent={market.odds_yes}
            volume={market.yes_pool + market.no_pool}
            marketId={market.id}
            endTime={market.end_time}
          
          />)

          : "No Markets"

        }


      </div>
    </div>
  );
}

export default BrowsePage;