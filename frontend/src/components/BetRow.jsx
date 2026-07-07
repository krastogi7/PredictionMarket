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
    return (
        <div className="table-row">
            <span>{market.question}</span>
            <span className="yes-badge">{position}</span>
            <span>${amount}</span>
            <span>{price / 100}</span>
            <span className="open-badge">{status}</span>
        </div>
    )
}