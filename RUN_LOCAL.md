# Local Run Guide (Frontend)

## 1) Install required tools

- Node.js: 20.19+ (or 22.12+)
- Python: 3.10+

## 2) Clone and install

```bash
git clone https://github.com/Noraaranara/IT_CCG
cd IT_CCG
npm install
pip install -r backend/requirements.txt
```

## 3) Build frontend

```bash
npm run build
```

## 4) Start backend

```bash
python backend/app/main.py
```

Open in browser:

`http://127.0.0.1:8080`

## 5) Configure app UI

- In `apiBase`, set:
  `http://127.0.0.1:8080`
- Click `Save`
- Click `Check Health`
- Expected status: `success`

## 6) If page is blank or old

1. Open DevTools -> Application
2. Unregister Service Worker
3. Clear site data
4. Reload with `Ctrl + F5`

## 7) Quick checks

- Health endpoint:
  `http://127.0.0.1:8080/health`
- Push config endpoint:
  `http://127.0.0.1:8080/api/push/config`
