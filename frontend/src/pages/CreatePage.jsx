import { useNavigate } from "react-router-dom";
import "./CreatePage.css";
import { useState } from "react";
import { apiCreateMarket } from "../api/api";

function CreatePage() {
    const navigate = useNavigate()

    const [question, setQuestion] = useState("")
    const [description, setDescription] = useState("")
    const [closeDate, setCloseDate] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        // makes sure that none of the fields are empty
        if (!question.trim() || !description.trim() || !closeDate.trim()) {
            return
        }

        try {
            await apiCreateMarket(question, description, closeDate)
        }

        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="create-market-page">
            <main className="create-market-container">
                <section className="create-market-header">
                    <h1>Create a New Market</h1>
                    <p className="subtitle">
                        Add a question, description, and closing date for users to bet on.
                    </p>
                </section>

                <section className="create-market-card">
                    <form className="market-form">
                        <div className="form-group">
                            <label>Market Question</label>
                            <input
                                type="text"
                                placeholder="Example: Will Bitcoin reach $100,000 by the end of 2024?"
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                rows="6"
                                placeholder="Explain the market rules, what counts as yes/no, and any important details..."
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-group closing-date-group">
                            <label>Closing Date</label>
                            <input 
                                type="date"
                                value={closeDate} 
                                onChange={(event) => setCloseDate(event.target.value)} 
                            />
                        </div>

                        <div className="preview-box">
                            <p className="preview-label">Market Preview</p>

                            <div className="preview-card">
                                <div className="preview-top">
                                    <span className="status-text">Open</span>
                                </div>

                                <h2>{question ? question: "Will your prediction happen?"}</h2>
                                <p>
                                    {description ? description: "Your market description will appear here so users understand what they are betting on."}
                                </p>

                                <div className="odds-preview">
                                    <div>
                                        <span>Yes</span>
                                        <strong>50%</strong>
                                    </div>

                                    <div>
                                        <span>No</span>
                                        <strong>50%</strong>
                                    </div>
                                </div>

                                <div className="preview-progress">
                                    <div className="preview-progress-fill"></div>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => navigate("/browse")}>
                                Cancel
                            </button>

                            <button type="button" className="create-btn" onClick={handleSubmit}>
                                Create Market
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default CreatePage;