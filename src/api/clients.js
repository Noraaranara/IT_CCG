const baseuRL = localStorage.getItem('apiBase') || ''

export async function request(path, options = {}) {
    const res = await fetch(`${baseuRL}${path}`, options)

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
    }
    return res.json()
} 