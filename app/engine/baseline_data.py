"""
Strokes Gained baseline lookup tables.
Source: "Every Shot Counts" by Mark Broadie (with adjustments for amateur play).
Extracted from Golf_Stats_RM.xlsx – REFERENCED CHARTS sheet.

Usage:
    from baseline_data import get_expected_strokes
    e = get_expected_strokes(lie="fairway", distance=150)  # → 2.95
"""

# ─────────────────────────────────────────────────────────────────────────────
# OFF-GREEN baselines: expected strokes by distance (yards) and lie
# Columns: tee, fairway, rough, sand, recovery
# Note: 'tee' only populated from 100y+ (par-3 tee shots)
# ─────────────────────────────────────────────────────────────────────────────

OFF_GREEN = {
    #  dist : (tee,   fairway, rough,  sand,   recovery)
    10:   (None,  2.20,  2.40,  2.41,  3.35),
    15:   (None,  2.30,  2.50,  2.47,  3.38),
    20:   (None,  2.40,  2.57,  2.53,  3.40),
    25:   (None,  2.45,  2.64,  2.59,  3.43),
    30:   (None,  2.50,  2.69,  2.67,  3.45),
    35:   (None,  2.55,  2.74,  2.76,  3.48),
    40:   (None,  2.60,  2.78,  2.82,  3.50),
    45:   (None,  2.62,  2.82,  2.90,  3.53),
    50:   (None,  2.65,  2.85,  2.98,  3.55),
    55:   (None,  2.67,  2.88,  3.07,  3.58),
    60:   (None,  2.70,  2.91,  3.15,  3.60),
    65:   (None,  2.72,  2.92,  3.17,  3.63),
    70:   (None,  2.73,  2.93,  3.19,  3.65),
    75:   (None,  2.74,  2.95,  3.22,  3.68),
    80:   (None,  2.75,  2.96,  3.24,  3.70),
    85:   (None,  2.77,  2.97,  3.24,  3.73),
    90:   (None,  2.78,  2.99,  3.23,  3.75),
    95:   (None,  2.79,  3.01,  3.23,  3.78),
    100:  (2.92,  2.80,  3.02,  3.23,  3.80),
    105:  (2.93,  2.81,  3.03,  3.23,  3.80),
    110:  (2.95,  2.83,  3.04,  3.22,  3.80),
    115:  (2.97,  2.84,  3.06,  3.21,  3.80),
    120:  (2.99,  2.85,  3.08,  3.21,  3.78),
    125:  (2.99,  2.86,  3.09,  3.21,  3.78),
    130:  (2.97,  2.88,  3.11,  3.21,  3.78),
    135:  (2.97,  2.90,  3.13,  3.22,  3.78),
    140:  (2.97,  2.91,  3.15,  3.22,  3.80),
    145:  (2.97,  2.93,  3.17,  3.23,  3.80),
    150:  (2.99,  2.95,  3.19,  3.25,  3.80),
    155:  (2.99,  2.97,  3.21,  3.26,  3.80),
    160:  (2.99,  2.98,  3.23,  3.28,  3.81),
    165:  (3.01,  3.00,  3.25,  3.30,  3.81),
    170:  (3.02,  3.03,  3.27,  3.33,  3.81),
    175:  (3.04,  3.06,  3.29,  3.36,  3.81),
    180:  (3.05,  3.08,  3.31,  3.40,  3.82),
    185:  (3.07,  3.11,  3.34,  3.43,  3.83),
    190:  (3.09,  3.13,  3.37,  3.47,  3.84),
    195:  (3.11,  3.16,  3.40,  3.51,  3.86),
    200:  (3.12,  3.19,  3.42,  3.55,  3.87),
    210:  (3.14,  3.26,  3.48,  3.62,  3.89),
    220:  (3.17,  3.32,  3.53,  3.70,  3.92),
    230:  (3.21,  3.39,  3.60,  3.77,  3.95),
    240:  (3.25,  3.45,  3.64,  3.84,  3.97),
    250:  (3.35,  3.52,  3.69,  3.88,  4.00),
    260:  (3.45,  3.58,  3.74,  3.93,  4.03),
    270:  (3.55,  3.63,  3.78,  3.96,  4.07),
    280:  (3.65,  3.69,  3.83,  4.00,  4.10),
    290:  (3.68,  3.74,  3.87,  4.02,  4.15),
    300:  (3.71,  3.78,  3.90,  4.04,  4.20),
    320:  (3.79,  3.84,  3.95,  4.12,  4.31),
    340:  (3.86,  3.88,  4.02,  4.26,  4.44),
    360:  (3.92,  3.95,  4.11,  4.41,  4.56),
    380:  (3.96,  4.03,  4.21,  4.55,  4.66),
    400:  (3.99,  4.11,  4.30,  4.69,  4.75),
    420:  (4.02,  4.15,  4.34,  4.73,  4.79),
    440:  (4.08,  4.20,  4.39,  4.78,  4.84),
    460:  (4.17,  4.29,  4.48,  4.87,  4.93),
    480:  (4.28,  4.40,  4.59,  4.98,  5.04),
    500:  (4.41,  4.53,  4.72,  5.11,  5.17),
    520:  (4.54,  4.85,  4.85,  5.24,  5.30),
    540:  (4.65,  4.97,  4.97,  5.36,  5.42),
    560:  (4.74,  5.05,  5.05,  5.44,  5.50),
    580:  (4.79,  5.10,  5.10,  5.49,  5.55),
    600:  (4.82,  5.13,  5.13,  5.52,  5.58),
    620:  (4.91,  None,  None,  None,  None),
    640:  (5.00,  None,  None,  None,  None),
    660:  (5.08,  None,  None,  None,  None),
}

# ─────────────────────────────────────────────────────────────────────────────
# ON-GREEN baselines: expected strokes by distance (feet)
# ─────────────────────────────────────────────────────────────────────────────

ON_GREEN = {
    1:   1.00,
    2:   1.00,
    3:   1.04,
    4:   1.13,
    5:   1.23,
    6:   1.34,
    7:   1.42,
    8:   1.50,
    9:   1.56,
    10:  1.61,
    11:  1.65,
    12:  1.69,
    13:  1.72,
    14:  1.75,
    15:  1.78,
    16:  1.81,
    17:  1.83,
    18:  1.85,
    20:  1.87,
    22:  1.89,
    25:  1.93,
    27:  1.95,
    30:  1.98,
    32:  2.00,
    35:  2.02,
    37:  2.04,
    40:  2.06,
    45:  2.10,
    47:  2.12,
    50:  2.14,
    55:  2.18,
    60:  2.21,
    65:  2.25,
    70:  2.28,
    75:  2.31,
    80:  2.34,
    85:  2.37,
    90:  2.40,
    100: 2.44,
    110: 2.48,
}

# ─────────────────────────────────────────────────────────────────────────────
# Column indices for OFF_GREEN tuple: (tee, fairway, rough, sand, recovery)
# ─────────────────────────────────────────────────────────────────────────────

LIE_INDEX = {
    "tee":      0,
    "fairway":  1,
    "rough":    2,
    "sand":     3,
    "bunker":   3,  # alias
    "recovery": 4,
}


def _interpolate(table: dict, key: float) -> float:
    """Linear interpolation between two nearest keys in a sorted dict."""
    keys = sorted(table.keys())
    if key <= keys[0]:
        return table[keys[0]]
    if key >= keys[-1]:
        return table[keys[-1]]
    for i in range(len(keys) - 1):
        lo, hi = keys[i], keys[i + 1]
        if lo <= key <= hi:
            v_lo, v_hi = table[lo], table[hi]
            if v_lo is None or v_hi is None:
                return table[lo] if v_lo is not None else table[hi]
            return v_lo + (v_hi - v_lo) * (key - lo) / (hi - lo)


def get_expected_strokes(lie: str, distance: float) -> float:
    """
    Returns expected strokes from a given position.

    Args:
        lie:      One of 'tee', 'fairway', 'rough', 'sand'/'bunker',
                  'recovery', or 'green'.
        distance: Yards from hole (off green) or feet from hole (on green).

    Returns:
        Expected strokes (float).

    Example:
        >>> get_expected_strokes("fairway", 150)
        2.95
        >>> get_expected_strokes("green", 10)
        1.61
    """
    lie = lie.lower().strip()

    if lie == "green":
        return _interpolate(ON_GREEN, distance)

    if lie not in LIE_INDEX:
        raise ValueError(
            f"Unknown lie '{lie}'. "
            f"Valid options: {list(LIE_INDEX.keys()) + ['green']}"
        )

    idx = LIE_INDEX[lie]

    # Build sub-table for this lie, skipping None values
    sub = {
        dist: vals[idx]
        for dist, vals in OFF_GREEN.items()
        if vals[idx] is not None
    }

    return _interpolate(sub, distance)


def calculate_sg(
    start_lie: str,
    start_distance: float,
    end_lie: str,
    end_distance: float,
    strokes: int = 1,
    penalty: int = 0,
) -> float:
    """
    Calculate Strokes Gained for a single shot.

    SG = E(start) - (strokes + penalty + E(end))

    Args:
        start_lie:      Lie before the shot.
        start_distance: Distance to hole before the shot.
        end_lie:        Lie after the shot.
        end_distance:   Distance to hole after the shot.
        strokes:        Number of strokes taken (default 1).
        penalty:        Penalty strokes incurred (default 0).

    Returns:
        Strokes gained (positive = better than baseline).

    Example:
        >>> calculate_sg("fairway", 150, "green", 20)
        0.08  # approx
    """
    e_start = get_expected_strokes(start_lie, start_distance)
    e_end   = get_expected_strokes(end_lie, end_distance)
    return round(e_start - (strokes + penalty + e_end), 4)


# ─────────────────────────────────────────────────────────────────────────────
# Quick sanity check
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    tests = [
        ("fairway", 150,  2.95),
        ("green",   10,   1.61),
        ("rough",   100,  3.02),
        ("sand",    30,   2.67),
        ("tee",     250,  3.35),
    ]
    print("Baseline lookup tests:")
    for lie, dist, expected in tests:
        result = get_expected_strokes(lie, dist)
        status = "✓" if abs(result - expected) < 0.01 else "✗"
        print(f"  {status} get_expected_strokes('{lie}', {dist}) = {result} (expected {expected})")

    print("\nSG calculation example:")
    sg = calculate_sg("fairway", 150, "green", 20)
    print(f"  150y fairway → 20ft putt: SG = {sg}")
    sg2 = calculate_sg("tee", 400, "fairway", 150)
    print(f"  400y tee shot → 150y fairway: SG = {sg2}")
