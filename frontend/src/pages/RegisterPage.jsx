import {useState, useEffect} from "react"
import "./RegisterPage.css"
import {useNavigate} from "react-router-dom"
import {apiLogin, apiRegister} from "../api/api"

export default function registerPage() {
    const naviagte = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        name: "", email: "", password: ""
    })

    // routes the user to the browse page if they are already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/browse")
        }
    }, [])

    // handles making the form correct and updates the form variable
    function handleChange(event) {
        setForm((currentForm) => ({
            ...currentForm,
            [event.target.name]: event.target.value
        }))
    }

    // called when the register button is pressed
    async function handleSubmit(event) {
        event.preventDefault()

        setError("")

        // checks that username and password are not empty
        if (!form.name.trim() | !form.email.trim()) {
            setError("Please fill out all the fields")
            return
        }

        // ensures password is at least 6 characters
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters")
        }

        setLoading(true)

        try {
            const res = await apiRegister(form.name, form.email, form.password)
            const token = await apiLogin(form.email, form.password)
            naviagte("/profile")
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
                <h1>Prediction Market</h1>
                <p className="subtitle">Create an account to start trading with fake money</p>

                <form className="login-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}

                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="login-button" onClick={handleSubmit}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <button type="button" className="switch-button" onClick={() => naviagte("/login")}>
                    Already have an account? Log in
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