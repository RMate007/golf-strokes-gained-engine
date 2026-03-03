import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.engine.strokes_gained import calculate_sg

def test_calculate_sg():
    sg = calculate_sg(3.2, 2.0, 0)
    assert round(sg, 2) == 0.2