import { useState } from "react";
import { checkHealth, getPushConfig } from "../api/endpoints";

const DEFAULT_API_BASE = "http://127.0.0.1:8080";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/")
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; i += 1) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

function Home() {
    const [uid, setUid] = useState('')
    const [apiBase, setApiBase] = useState(
        localStorage.getItem('apiBase') || DEFAULT_API_BASE
    )
    const [status, setStatus] = useState('')

    const save = () => {
        localStorage.setItem('uid', uid)
        localStorage.setItem('apiBase', apiBase)
        setStatus('saved')
    }

    const handleHealth = async () => {
        try {
            await checkHealth()
            setStatus('success')
        } catch {
            setStatus('server error')
        }
    }

    const handleSubscribe = async () => {
        try {
            // 1. получить config
            const config = await getPushConfig()

            if (!config.enabled) {
                setStatus('push disabled on backend')
                return
            }

            // 2. разрешение
            const permission = await Notification.requestPermission()

            if (permission !== 'granted') {
                setStatus('permission denied')
                return
            }

            // 3. service worker
            const registration = await navigator.serviceWorker.ready

            // 4. подписка
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    config.vapid_public_key
                )
            })

            // 5. отправка на сервер (ВАЖНО: правильный body)
            await fetch(`${apiBase}/api/push/subscribe?uid=${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription
                })
            })

            setStatus('subscribed')

        } catch (err) {
            console.log(err)
            setStatus('error')
        }
    }

    const handleUnsubscribe = async () => {
        try {
            const registration = await navigator.serviceWorker.ready

            const sub = await registration.pushManager.getSubscription()

            if (sub) {
            await sub.unsubscribe()
            }

            await fetch(`${apiBase}/api/push/unsubscribe?uid=${uid}`, {
                method: 'POST'
            })

            setStatus('unsubscribed')

        } catch {
            setStatus('error')
        }
    }

    return (
        <div>
            <h1>PWA App</h1>

            <input
                placeholder="apiBase"
                value={apiBase}
                onChange={(e) => setApiBase(e.target.value)}
            />

            <input
                placeholder="uid"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
            />

            <button onClick={save}>Save</button>
            <button onClick={handleHealth}>Check Health</button>
            <button onClick={handleSubscribe}>Subscribe</button>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>

            <p>Status: {status}</p>
        </div>
    )
}

export default Home
