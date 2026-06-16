import {useState, useEffect} from "react"
import "./LoginPage.css"
import {useNavigate} from "react-router-dom"
import {apiGetMe, apiLogin} from "../api/api"

export default function LoginPage() {
    const [error, setError] = useState("")
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    // routes the user to the browse page if they are already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/browse")
        }
    }, [])

    function handleChange(event) {
        setForm((currentForm) => ({
            ...currentForm,
            [event.target.name]: event.target.value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)
        setError("")

        try {
            const res = await apiLogin(form.email, form.password)
            const token = res.access_token
            localStorage.setItem("token", token)

            navigate("/profile")
        }
        catch (err) {
            setError(err.message)
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="subtitle">Log in to view your markets and portfolio</p>

                <form className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="eamil"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="text"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="login-button" onClick={handleSubmit}>
                        {loading ? "Loggin In..." : "Log In"}
                    </button>
                </form>

                <button type="button" className="switch-button" onClick={() => navigate("/register")}>
                    Don't have an accout? Register
                </button>

                {error ?
                    <div className="error-box">
                        {error}
                    </div>
                    : ""}
            </div>
        </div>
    )
}