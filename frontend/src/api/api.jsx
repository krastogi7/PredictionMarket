const BASE = "http://localhost:8000"

function authHeaders() {
    const token = localStorage.getItem("token")
    return token ? {Authorization: `Bearer ${token}`}: {}
}

async function handleResponse(res) {
    if (!res.ok) {
        const err = await res.json().catch(() => ({detail: "Unknown error"}))
        throw new Error(err.detail || "Request Failed")
    }

    else if (res.status == 204) {
        return null
    }
    
    else {
        return res.json()
    }
}

// AUTH ENDPOINTS

export async function apiRegister(name, email, password) {
    const res = await fetch(`${BASE}/auth/register`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: name, email: email, password: password})
    })

    return handleResponse(res)
}

export async function apiLogin(email, password) {
    const res = await fetch(`${BASE}/auth/login`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password})
    })

    return handleResponse(res)
}

export async function apiGetMe() {
    const res = await fetch(`${BASE}/auth/me`, {
        method: "GET", 
        headers: authHeaders()
    })

    return handleResponse(res)
}

export async function apiCreateMarket(question, description, closeDate) {
    const res = await fetch(`${BASE}/markets`, {
        method: "POST", 
        headers: {...authHeaders(), "Content-Type": "application/json"},
        body: JSON.stringify({question: question, description: description, close_date: closeDate})
    })

    return handleResponse(res)
}

export async function getMarkets() {

}

export async function getMarket(marketID) {
    
}