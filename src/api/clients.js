const DEFAULT_API_BASE = 'http://127.0.0.1:8080'

function getApiBase() {
    const saved = localStorage.getItem('apiBase')
    if (!saved || !saved.trim()) {
        return DEFAULT_API_BASE
    }
    return saved.trim()
}

export async function request(path, options = {}) {
    const apiBase = getApiBase()
    const res = await fetch(`${apiBase}${path}`, options)

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
    }
    return res.json()
} 