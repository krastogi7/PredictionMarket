import { useNavigate } from "react-router-dom"
import "./MyMarketCard.css"

export default function MyMarketCard({description, question, yesPercent, marketId, volume, endTime, status}) {
    const navigate = useNavigate()

    return (
        <div className="my-market-card" onClick={() => navigate(`/browse/${marketId}`)}>
            <div className="my-market-card-top">
                <span className={status === "open" ? "status-pill open-pill" : "status-pill closed-pill"}>
                    {status === "open" ? "Open" : "Closed"}
                </span>
            </div>

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
                <div className="probability-fill" style={{width: `${yesPercent}%`}}></div>
            </div>

            <div className="market-footer">
                <span>${volume} volume</span>
                <span>Ends {endTime}</span>
            </div>
        </div>
    )
}
