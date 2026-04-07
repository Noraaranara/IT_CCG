import { request } from "./clients";

export function checkHealth() {
    return request('/health')
}

export function subscribe(uid) {
    return request(`/api/push/subscribe?uid=${uid}`, {
        method: 'POST'
    })
}

export function unsubscribe(uid) {
    return request(`/api/push/unsubscribe?uid=${uid}`, {
        method: 'POST'
    })
} 

export function getPushConfig() {
    return request('/api/push/config')
}