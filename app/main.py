from fastapi import FastAPI
from app.engine.strokes_gained import calculate_sg

app = FastAPI()

@app.get("/calculate")
def calculate(e_start: float, e_end: float, penalty: int = 0):
    return {"strokes_gained": calculate_sg(e_start, e_end, penalty)}
