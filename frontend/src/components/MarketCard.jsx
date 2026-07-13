import { useNavigate } from "react-router-dom"
import "./MarketCard.css"

export default function MarketCard({description, question, yesPercent, marketId, volume, endTime}) {
    const navigate = useNavigate()


    return (
        <div className="market-card" onClick={() => navigate(`/browse/${marketId}`)}>
            <h2>{question}</h2>

            <p className="market-description">
                {description}
                
            </p>

            <div className="market-outcomes">
                <div>
                    <span>Yes</span>
                    <strong>{Math.round(yesPercent)}%</strong>
                </div>

                <div>
                    <span>No</span>
                    <strong>{Math.round(100 - yesPercent)}%</strong>
                </div>
            </div>

            <div className="probability-bar">
                <div className="probability-fill fill-62"></div>
            </div>

            <div className="market-footer">
                <span>${volume} volume</span>
                <span>Ends {endTime}</span>
            </div>
        </div>
    )
}