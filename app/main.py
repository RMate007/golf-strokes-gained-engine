from fastapi import FastAPI
from app.engine.strokes_gained import calculate_sg

app = FastAPI()

@app.get("/calculate")
def calculate(
    start_lie: str,
    start_distance: float,
    end_lie: str,
    end_distance: float,
    strokes: int = 1,
    penalty: int = 0,
):
    sg = calculate_sg(start_lie, start_distance, end_lie, end_distance, strokes, penalty)
    return {"strokes_gained": sg}
