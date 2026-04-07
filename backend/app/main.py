from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

# Repository root for "IT_CCG-backend".
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
DIST_DIR = PROJECT_ROOT / "dist"

app = FastAPI(title="IT_CCG Backend Server")


@app.get("/health")
async def health() -> JSONResponse:
    return JSONResponse({"status": "ok"})


@app.get("/api/push/config")
async def push_config() -> JSONResponse:
    return JSONResponse(
        {"enabled": False, "vapid_public_key": ""}
    )


@app.post("/api/push/subscribe")
async def push_subscribe(uid: str) -> JSONResponse:
    return JSONResponse(
        {"ok": True, "uid": uid, "message": "push disabled"}
    )


@app.post("/api/push/unsubscribe")
async def push_unsubscribe(uid: str) -> JSONResponse:
    return JSONResponse(
        {"ok": True, "uid": uid, "message": "push disabled"}
    )


@app.get("/", response_model=None)
async def read_index():
    if not DIST_DIR.exists():
        return HTMLResponse(
            """
            <h2>Frontend build not found</h2>
            <p>Run:</p>
            <pre>npm install
npm run build</pre>
            <p>Then restart backend server.</p>
            """,
            status_code=503,
        )
    return FileResponse(DIST_DIR / "index.html")


if DIST_DIR.exists():
    # Serve built frontend files.
    app.mount(
        "/",
        StaticFiles(directory=str(DIST_DIR), html=True),
        name="frontend",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8080)
