import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket
import pandas as pd
from pathlib import Path

import logging

from starlette.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)



FREEMOCAP_TEST_DATA_CSV_PATH = r"C:\Users\jonma\freemocap_data\recording_sessions\freemocap_test_data\freemocap_test_data_by_trajectory.csv"

@asynccontextmanager
async def lifespan_manager(app: FastAPI):
    logger.info("Starting up FastAPI app - access API backend interface at http://localhost:8000/docs")
    yield
    logger.info("Shutting down FastAPI app")

app = FastAPI(lifespan=lifespan_manager)
origins = [
   "http://localhost:3000",
]

app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)


@app.get("/")
def read_root():
    logger.info("Received request for route /")
    return {"Wowwee": "Zoweeeeee"}

@app.get("/csv")
def read_csv(csvPath: str = FREEMOCAP_TEST_DATA_CSV_PATH, orientation: str = "list" ):
    logger.info(f"Received request for route /csv with csvPath: {csvPath}")

    if not Path(csvPath).exists():
        logger.error(f"File not found: {csvPath}")
        return {"error": f"File not found: {csvPath}"}
    df = pd.read_csv(csvPath)
    logger.info(f"Read csv file with shape: {df.shape}")
    # noinspection PyTypeChecker
    df_dict = df.to_dict(orient=orientation)
    return json.dumps(df_dict)


@app.websocket("/ws")
async def websocket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,
     host="localhost",
     port=8000)

















