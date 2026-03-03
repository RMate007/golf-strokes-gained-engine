from app.engine.baseline_data import get_expected_strokes

def calculate_sg(
    start_lie: str,
    start_distance: float,
    end_lie: str,
    end_distance: float,
    strokes: int = 1,
    penalty: int = 0,
) -> float:
    e_start = get_expected_strokes(start_lie, start_distance)
    e_end = get_expected_strokes(end_lie, end_distance)
    return round(e_start - (strokes + penalty + e_end), 4)
