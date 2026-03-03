def calculate_sg(e_start: float, e_end: float, penalty: int = 0) -> float:
    return e_start - (1 + e_end + penalty)
