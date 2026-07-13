import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyMarketPage.css";
import MyMarketCard from "../components/MyMarketCard";
import { apiGetMyMarkets } from "../api/api"

function MyMarketPage() {
  const navigate = useNavigate()
  const [markets, setMarkets] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    async function loadMarkets() {
      try {
        const res = await apiGetMyMarkets()
        setMarkets(res)
      }

      catch (err) {
        localStorage.removeItem("token")
        navigate("/login")
      }

      finally {
        setLoading(false)
      }
    }

    loadMarkets()
  }, [])


  return (
    <div className="my-market-page">
      <div className="my-market-header">
        <div>
          <p className="page-label">My Markets</p>
          <h1>Markets You Created</h1>
          <p className="page-description">
            Track the markets you've created, their odds, and their status.
          </p>
        </div>

        <button className="create-market-btn" onClick={() => navigate("/create")}>Create Market</button>
      </div>

      <div className="markets-grid">
        {loading ? "Loading..." :
          markets != null && markets.length > 0 ?
          markets.map((market) =>
          <MyMarketCard
            key={market.id}
            description={market.desc}
            question={market.question}
            yesPercent={market.odds_yes}
            volume={market.yes_pool + market.no_pool}
            marketId={market.id}
            endTime={market.end_time}
            status={market.status}
          />)

          : "You haven't created any markets yet."
        }
      </div>
    </div>
  );
}

export default MyMarketPage;
