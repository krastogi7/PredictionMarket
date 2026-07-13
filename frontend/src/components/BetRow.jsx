import { useEffect, useState } from "react"
import "./BetRow.css"
import { apiGetMarket } from "../api/api"

export default function BetRow({marketId, status, position, amount, price}) {
    const [market, setMarket] = useState({})
    useEffect(() => {
        async function loadMarket() {
            try {
                const data = await apiGetMarket(marketId)
                setMarket(data)
            }

            catch (err) {
                console.log(err)
            }
        }

        loadMarket()
    }, [])

    const statusBadgeClass = status === "won" ? "won-badge" : status === "lost" ? "lost-badge" : "open-badge"

    return (
        <div className="table-row">
            <span>{market.question}</span>
            <span className={position === "yes" ? "yes-badge" : "no-badge"}>{position}</span>
            <span>${amount}</span>
            <span>{(price / 100).toFixed(2)}</span>
            <span className={statusBadgeClass}>{status}</span>
        </div>
    )
}