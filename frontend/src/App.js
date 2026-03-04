import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   BROADIE BASELINE DATA
═══════════════════════════════════════════════════════════════ */
const OG = [
  [10,null,2.20,2.40,2.41,3.35],[15,null,2.30,2.50,2.47,3.38],
  [20,null,2.40,2.57,2.53,3.40],[25,null,2.45,2.64,2.59,3.43],
  [30,null,2.50,2.69,2.67,3.45],[35,null,2.55,2.74,2.76,3.48],
  [40,null,2.60,2.78,2.82,3.50],[45,null,2.62,2.82,2.90,3.53],
  [50,null,2.65,2.85,2.98,3.55],[55,null,2.67,2.88,3.07,3.58],
  [60,null,2.70,2.91,3.15,3.60],[65,null,2.72,2.92,3.17,3.63],
  [70,null,2.73,2.93,3.19,3.65],[75,null,2.74,2.95,3.22,3.68],
  [80,null,2.75,2.96,3.24,3.70],[85,null,2.77,2.97,3.24,3.73],
  [90,null,2.78,2.99,3.23,3.75],[95,null,2.79,3.01,3.23,3.78],
  [100,2.92,2.80,3.02,3.23,3.80],[105,2.93,2.81,3.03,3.23,3.80],
  [110,2.95,2.83,3.04,3.22,3.80],[115,2.97,2.84,3.06,3.21,3.80],
  [120,2.99,2.85,3.08,3.21,3.78],[125,2.99,2.86,3.09,3.21,3.78],
  [130,2.97,2.88,3.11,3.21,3.78],[135,2.97,2.90,3.13,3.22,3.78],
  [140,2.97,2.91,3.15,3.22,3.80],[145,2.97,2.93,3.17,3.23,3.80],
  [150,2.99,2.95,3.19,3.25,3.80],[155,2.99,2.97,3.21,3.26,3.80],
  [160,2.99,2.98,3.23,3.28,3.81],[165,3.01,3.00,3.25,3.30,3.81],
  [170,3.02,3.03,3.27,3.33,3.81],[175,3.04,3.06,3.29,3.36,3.81],
  [180,3.05,3.08,3.31,3.40,3.82],[185,3.07,3.11,3.34,3.43,3.83],
  [190,3.09,3.13,3.37,3.47,3.84],[195,3.11,3.16,3.40,3.51,3.86],
  [200,3.12,3.19,3.42,3.55,3.87],[210,3.14,3.26,3.48,3.62,3.89],
  [220,3.17,3.32,3.53,3.70,3.92],[230,3.21,3.39,3.60,3.77,3.95],
  [240,3.25,3.45,3.64,3.84,3.97],[250,3.35,3.52,3.69,3.88,4.00],
  [260,3.45,3.58,3.74,3.93,4.03],[270,3.55,3.63,3.78,3.96,4.07],
  [280,3.65,3.69,3.83,4.00,4.10],[290,3.68,3.74,3.87,4.02,4.15],
  [300,3.71,3.78,3.90,4.04,4.20],[320,3.79,3.84,3.95,4.12,4.31],
  [340,3.86,3.88,4.02,4.26,4.44],[360,3.92,3.95,4.11,4.41,4.56],
  [380,3.96,4.03,4.21,4.55,4.66],[400,3.99,4.11,4.30,4.69,4.75],
  [420,4.02,4.15,4.34,4.73,4.79],[440,4.08,4.20,4.39,4.78,4.84],
  [460,4.17,4.29,4.48,4.87,4.93],[480,4.28,4.40,4.59,4.98,5.04],
  [500,4.41,4.53,4.72,5.11,5.17],[520,4.54,4.85,4.85,5.24,5.30],
  [540,4.65,4.97,4.97,5.36,5.42],[560,4.74,5.05,5.05,5.44,5.50],
  [580,4.79,5.10,5.10,5.49,5.55],[600,4.82,5.13,5.13,5.52,5.58],
];
const GR = [
  [1,1.00],[2,1.00],[3,1.04],[4,1.13],[5,1.23],[6,1.34],[7,1.42],
  [8,1.50],[9,1.56],[10,1.61],[11,1.65],[12,1.69],[13,1.72],[14,1.75],
  [15,1.78],[16,1.81],[17,1.83],[18,1.85],[20,1.87],[22,1.89],[25,1.93],
  [27,1.95],[30,1.98],[32,2.00],[35,2.02],[37,2.04],[40,2.06],[45,2.10],
  [47,2.12],[50,2.14],[55,2.18],[60,2.21],[65,2.25],[70,2.28],[75,2.31],
  [80,2.34],[85,2.37],[90,2.40],[100,2.44],[110,2.48],
];
const LC = { tee:1, fairway:2, rough:3, sand:4, bunker:4, recovery:5 };

function lerp(t, x) {
  if (!t.length) return 2.5;
  if (x <= t[0][0]) return t[0][1];
  if (x >= t[t.length-1][0]) return t[t.length-1][1];
  for (let i = 0; i < t.length - 1; i++) {
    const [a, va] = [t[i][0], t[i][1]];
    const [b, vb] = [t[i+1][0], t[i+1][1]];
    if (x >= a && x <= b) {
      if (va === null || vb === null) return va ?? vb;
      return va + (vb - va) * (x - a) / (b - a);
    }
  }
  return t[t.length-1][1];
}

function eStrokes(lie, dist) {
  if (!dist || dist <= 0) return 0;
  if (lie === "green") return lerp(GR, dist);
  const c = LC[lie];
  if (!c) return null;
  const tbl = OG.filter(r => r[c] !== null).map(r => [r[0], r[c]]);
  return lerp(tbl, dist);
}

function sgCategory(lie, dist) {
  if (lie === "tee") return "OTT";
  if (lie === "green") return "PUTT";
  return parseFloat(dist) <= 30 ? "ATG" : "APP";
}

function calcHoleSG(hole) {
  const { yardage, shots } = hole;
  if (!shots.length || !yardage) return null;
  const positions = [{ lie: "tee", d: parseFloat(yardage) }];
  for (const s of shots) positions.push({ lie: s.lie, d: parseFloat(s.distance) || 0 });
  let sg = { OTT: 0, APP: 0, ATG: 0, PUTT: 0 };
  for (let i = 0; i < positions.length - 1; i++) {
    const { lie: sl, d: sd } = positions[i];
    const { lie: el, d: ed } = positions[i+1];
    if (!sd) return null;
    const pen = shots[i]?.penalty || 0;
    const es = eStrokes(sl, sd);
    const ee = eStrokes(el, ed);
    if (es === null || ee === null) return null;
    const cat = sgCategory(sl, sd);
    sg[cat] += es - (1 + pen + ee);
  }
  sg.total = sg.OTT + sg.APP + sg.ATG + sg.PUTT;
  return sg;
}

/* ═══════════════════════════════════════════════════════════════
   QUESTIONNAIRE CONFIG
═══════════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    id: "drive_miss",
    label: "Tee shots: where do you miss?",
    options: ["Left", "Right", "Short / low", "No pattern", "Didn't drive much"]
  },
  {
    id: "approach_distance",
    label: "Approach shots: distance tendency?",
    options: ["Consistently short", "Consistently long", "All over the place", "Solid"]
  },
  {
    id: "approach_direction",
    label: "Approach shots: direction tendency?",
    options: ["Missing left", "Missing right", "Random", "On target"]
  },
  {
    id: "short_game",
    label: "Around the green: main issue?",
    options: ["Hitting it thin / blading", "Hitting it fat", "Wrong distance", "Felt good"]
  },
  {
    id: "putting",
    label: "Putting: biggest issue today?",
    options: ["Missing short putts", "3-putts from distance", "Poor pace", "Off the face", "Felt good"]
  },
];

/* ═══════════════════════════════════════════════════════════════
   OPENAI CALL
═══════════════════════════════════════════════════════════════ */
async function fetchTrainingPlan(sg, answers, holeData) {
  const key = process.env.REACT_APP_OPENAI_KEY;

  // Analyse which holes lost most strokes and where
  const holeInsights = holeData
    .map((h, i) => {
      const hsg = calcHoleSG(h);
      if (!hsg) return null;
      return `Hole ${i+1} (Par ${h.par}, ${h.yardage}y): OTT ${hsg.OTT.toFixed(2)}, APP ${hsg.APP.toFixed(2)}, ATG ${hsg.ATG.toFixed(2)}, PUTT ${hsg.PUTT.toFixed(2)}`;
    })
    .filter(Boolean)
    .join("\n");

  const questionSummary = QUESTIONS.map(q => {
    const ans = answers[q.id];
    return ans ? `${q.label}: ${ans}` : null;
  }).filter(Boolean).join("\n");

  const prompt = `You are an expert golf coach. Analyse this player's round data and create a structured 5-day training plan.

STROKES GAINED SUMMARY:
OTT: ${sg.OTT.toFixed(2)} | APP: ${sg.APP.toFixed(2)} | ATG: ${sg.ATG.toFixed(2)} | PUTT: ${sg.PUTT.toFixed(2)} | TOTAL: ${sg.total.toFixed(2)}

HOLE-BY-HOLE BREAKDOWN:
${holeInsights || "No hole data available"}

PLAYER SELF-ASSESSMENT:
${questionSummary || "No answers provided"}

Return ONLY a valid JSON array. No text before or after. Format exactly:
[
  {
    "day": 1,
    "focus": "Short Game",
    "drills": [
      {
        "name": "Clock Drill",
        "description": "Place balls at 3, 6, 9 and 12 o'clock positions around the hole at 3 feet. Must hole all 12 consecutively to finish.",
        "sets": 3,
        "reps": "12 putts",
        "duration": "15 min",
        "category": "PUTT"
      }
    ]
  }
]

Rules:
- 5 days total
- 2-4 drills per day
- Prioritise weakest SG categories
- Each drill must be specific, actionable, measurable
- Categories must be one of: OTT, APP, ATG, PUTT
- Do not wrap in markdown or add any text outside the JSON array`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "[]";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const C = {
  green: "#3dff7a",
  red: "#ff4d4d",
  bg: "#05100a",
  surface: "#0d1f12",
  border: "#1e3a22",
  muted: "#3d6644",
  text: "#d4edd8",
  textDim: "#5a8a63",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Barlow', sans-serif; }
  input, select { font-family: 'Barlow', sans-serif; }
  input::placeholder { color: #2a4a2e; }
  input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
  select option { background: ${C.surface}; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .fadeIn { animation: fadeIn 0.3s ease forwards; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
`;

const btn = (variant = "primary") => ({
  padding: "13px 20px",
  borderRadius: 8,
  border: variant === "primary" ? "none" : `1px solid ${variant === "ghost" ? C.border : C.green}`,
  background: variant === "primary" ? C.green : variant === "outline" ? `${C.green}15` : "transparent",
  color: variant === "primary" ? "#030b05" : C.green,
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "'Barlow Condensed', sans-serif",
  transition: "all 0.15s",
  width: "100%",
});

let shotId = 0;
const newShot = () => ({ id: ++shotId, lie: "fairway", distance: "", penalty: 0 });
const initHoles = () => Array.from({ length: 18 }, (_, i) => ({
  holeNum: i + 1, par: 4, yardage: "", shots: []
}));

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView]             = useState("setup");    // setup | round | quiz | summary
  const [course, setCourse]         = useState("");
  const [numHoles, setNumHoles]     = useState(18);
  const [holes, setHoles]           = useState(initHoles);
  const [current, setCurrent]       = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [plan, setPlan]             = useState(null);       // array of day objects
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError]   = useState("");
  const [completed, setCompleted]   = useState({});         // { "day-drillIdx": true }

  const upHole = (idx, fn) =>
    setHoles(h => h.map((x, i) => i === idx ? { ...x, ...fn(x) } : x));

  const addShot = (hi) => upHole(hi, h => ({ shots: [...h.shots, newShot()] }));
  const rmShot = (hi, id) => upHole(hi, h => ({ shots: h.shots.filter(s => s.id !== id) }));
  const upShot = (hi, id, field, val) => upHole(hi, h => ({
    shots: h.shots.map(s => s.id === id ? { ...s, [field]: val } : s)
  }));

  const roundSG = () => {
    const r = { OTT: 0, APP: 0, ATG: 0, PUTT: 0, total: 0, holes: [] };
    holes.slice(0, numHoles).forEach(h => {
      const sg = calcHoleSG(h);
      r.holes.push(sg);
      if (sg) { r.OTT += sg.OTT; r.APP += sg.APP; r.ATG += sg.ATG; r.PUTT += sg.PUTT; r.total += sg.total; }
    });
    return r;
  };

  const handleFinishRound = () => setView("quiz");

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    setPlanError("");
    try {
      const sg = roundSG();
      const result = await fetchTrainingPlan(sg, quizAnswers, holes.slice(0, numHoles));
      setPlan(result);
      setView("summary");
    } catch (e) {
      setPlanError("Failed to generate plan. Check your API key and try again.");
      console.error(e);
    }
    setPlanLoading(false);
  };

  const toggleDrill = (key) =>
    setCompleted(c => ({ ...c, [key]: !c[key] }));

  /* ── SETUP ──────────────────────────────────────────────── */
  if (view === "setup") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{css}</style>
      <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }} className="fadeIn">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 64, fontWeight: 900, color: C.green, letterSpacing: -2, lineHeight: 1 }}>SG</div>
          <div style={{ fontSize: 11, letterSpacing: 5, color: C.muted, textTransform: "uppercase", marginTop: 4 }}>Strokes Gained Tracker</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Course</div>
          <input
            style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", color: C.text, fontSize: 15, outline: "none" }}
            placeholder="e.g. Arbor Trace"
            value={course}
            onChange={e => setCourse(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Holes</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[9, 18].map(n => (
              <button key={n}
                style={{ flex: 1, padding: "12px 0", borderRadius: 8, border: `1px solid ${numHoles === n ? C.green : C.border}`, background: numHoles === n ? `${C.green}20` : C.surface, color: numHoles === n ? C.green : C.textDim, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all .15s", fontFamily: "'Barlow Condensed', sans-serif" }}
                onClick={() => setNumHoles(n)}>
                {n} Holes
              </button>
            ))}
          </div>
        </div>

        <button style={btn("primary")} onClick={() => setView("round")}>
          Start Round →
        </button>
      </div>
    </div>
  );

  /* ── ROUND ──────────────────────────────────────────────── */
  if (view === "round") {
    const hole = holes[current];
    const holeSG = calcHoleSG(hole);
    const positions = [{ lie: "tee", d: parseFloat(hole.yardage) || 0 }, ...hole.shots.map(s => ({ lie: s.lie, d: parseFloat(s.distance) || 0 }))];

    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{css}</style>

        {/* Sticky header */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>{course || "Round"}</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: C.green, lineHeight: 1 }}>HOLE {hole.holeNum}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)}
              style={{ padding: "8px 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: current === 0 ? "#1e3a22" : C.textDim, cursor: current === 0 ? "default" : "pointer", fontSize: 18 }}>←</button>
            <button disabled={current === numHoles - 1} onClick={() => setCurrent(c => c + 1)}
              style={{ padding: "8px 14px", borderRadius: 6, border: `1px solid ${C.border}`, background: "transparent", color: current === numHoles - 1 ? "#1e3a22" : C.textDim, cursor: current === numHoles - 1 ? "default" : "pointer", fontSize: 18 }}>→</button>
          </div>
        </div>

        {/* Hole dots */}
        <div style={{ display: "flex", gap: 4, padding: "10px 16px", background: "#0a180d", borderBottom: `1px solid #0f2014`, flexWrap: "wrap" }}>
          {Array.from({ length: numHoles }, (_, i) => {
            const sg = calcHoleSG(holes[i]);
            const done = sg !== null;
            return (
              <div key={i} onClick={() => setCurrent(i)}
                style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", transition: "all .15s", background: i === current ? C.green : done ? (sg.total >= 0 ? "#1a3a22" : "#3a1414") : C.surface, color: i === current ? "#030b05" : done ? (sg.total >= 0 ? C.green : C.red) : "#2a4a2e", border: `1px solid ${i === current ? C.green : done ? "transparent" : C.border}` }}>
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 100px" }}>

          {/* Par + Yardage */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: "0 0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Par</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[3, 4, 5].map(p => (
                  <button key={p} onClick={() => upHole(current, () => ({ par: p }))}
                    style={{ width: 44, height: 40, borderRadius: 6, border: `1px solid ${hole.par === p ? C.green : C.border}`, background: hole.par === p ? `${C.green}20` : C.surface, color: hole.par === p ? C.green : C.textDim, fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", transition: "all .15s" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>Yardage</div>
              <input type="number" placeholder="e.g. 420"
                style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 15, outline: "none" }}
                value={hole.yardage}
                onChange={e => upHole(current, () => ({ yardage: e.target.value }))} />
            </div>
          </div>

          {/* Shots */}
          <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>Shot Results</div>
          {hole.shots.map((shot, idx) => {
            const prevPos = positions[idx];
            let sgVal = null;
            if (prevPos?.d && shot.distance) {
              const es = eStrokes(prevPos.lie, prevPos.d);
              const ee = eStrokes(shot.lie, parseFloat(shot.distance));
              if (es !== null && ee !== null) sgVal = es - (1 + (shot.penalty || 0) + ee);
            }
            const isGreen = shot.lie === "green";
            return (
              <div key={shot.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 700, width: 16, textAlign: "center", fontFamily: "'Barlow Condensed', sans-serif" }}>{idx + 1}</span>
                <select value={shot.lie} onChange={e => upShot(current, shot.id, "lie", e.target.value)}
                  style={{ flex: "0 0 100px", background: "#0a180d", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 8px", color: C.text, fontSize: 13, outline: "none" }}>
                  <option value="fairway">Fairway</option>
                  <option value="rough">Rough</option>
                  <option value="sand">Sand</option>
                  <option value="recovery">Recovery</option>
                  <option value="green">Green</option>
                </select>
                <input type="number" placeholder={isGreen ? "ft" : "yds"}
                  style={{ flex: 1, background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, padding: "4px 0", color: C.text, fontSize: 14, outline: "none", minWidth: 0 }}
                  value={shot.distance}
                  onChange={e => upShot(current, shot.id, "distance", e.target.value)} />
                <span style={{ fontSize: 10, color: C.muted }}>{isGreen ? "ft" : "yd"}</span>
                <button onClick={() => upShot(current, shot.id, "penalty", shot.penalty > 0 ? 0 : 1)}
                  style={{ padding: "3px 7px", borderRadius: 4, border: `1px solid ${shot.penalty > 0 ? C.red : C.border}`, background: shot.penalty > 0 ? `${C.red}25` : "transparent", color: shot.penalty > 0 ? C.red : C.muted, cursor: "pointer", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>
                  +1
                </button>
                {sgVal !== null && (
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: sgVal >= 0 ? `${C.green}20` : `${C.red}20`, color: sgVal >= 0 ? C.green : C.red, fontFamily: "'Barlow Condensed', sans-serif", minWidth: 44, textAlign: "center" }}>
                    {sgVal >= 0 ? "+" : ""}{sgVal.toFixed(2)}
                  </span>
                )}
                <button onClick={() => rmShot(current, shot.id)}
                  style={{ background: "none", border: "none", color: "#2a4a2e", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "0 2px" }}>×</button>
              </div>
            );
          })}

          <button onClick={() => addShot(current)}
            style={{ width: "100%", padding: "10px", background: "transparent", border: `1px dashed ${C.border}`, borderRadius: 8, color: C.muted, cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
            + Add Shot
          </button>

          {/* Hole SG */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px" }}>
            {holeSG ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Hole SG</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, color: holeSG.total >= 0 ? C.green : C.red }}>
                    {holeSG.total >= 0 ? "+" : ""}{holeSG.total.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  {["OTT", "APP", "ATG", "PUTT"].map(k => (
                    <div key={k} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 9, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 800, color: holeSG[k] >= 0 ? C.green : C.red }}>
                        {holeSG[k] >= 0 ? "+" : ""}{holeSG[k].toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", color: C.muted, fontSize: 12, letterSpacing: 2 }}>ADD SHOTS TO SEE STROKES GAINED</div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a180d", borderTop: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", gap: 10, maxWidth: 600, margin: "0 auto" }}>
          {current < numHoles - 1 && (
            <button onClick={() => setCurrent(c => c + 1)}
              style={{ ...btn("outline"), flex: 1 }}>
              Next →
            </button>
          )}
          <button onClick={handleFinishRound} style={{ ...btn("primary"), flex: 1 }}>
            Finish Round
          </button>
        </div>
      </div>
    );
  }

  /* ── QUIZ ──────────────────────────────────────────────── */
  if (view === "quiz") {
    const allAnswered = QUESTIONS.every(q => quizAnswers[q.id]);
    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{css}</style>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px 100px" }} className="fadeIn">
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Round complete</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: C.green }}>Quick Debrief</div>
            <div style={{ fontSize: 13, color: C.textDim, marginTop: 6 }}>5 questions to personalise your training plan</div>
          </div>

          {QUESTIONS.map((q, qi) => (
            <div key={q.id} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 10 }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: C.muted, marginRight: 8 }}>{qi + 1}.</span>
                {q.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {q.options.map(opt => {
                  const selected = quizAnswers[q.id] === opt;
                  return (
                    <button key={opt} onClick={() => setQuizAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{ padding: "11px 16px", borderRadius: 8, border: `1px solid ${selected ? C.green : C.border}`, background: selected ? `${C.green}15` : C.surface, color: selected ? C.green : C.textDim, textAlign: "left", cursor: "pointer", fontSize: 14, fontWeight: selected ? 600 : 400, transition: "all .15s" }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {planError && (
            <div style={{ background: `${C.red}20`, border: `1px solid ${C.red}`, borderRadius: 8, padding: "12px 16px", color: C.red, fontSize: 13, marginBottom: 16 }}>
              {planError}
            </div>
          )}

          <button
            onClick={handleGeneratePlan}
            disabled={!allAnswered || planLoading}
            style={{ ...btn("primary"), opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? "pointer" : "default" }}>
            {planLoading ? "Generating your plan..." : "Generate Training Plan →"}
          </button>

          {planLoading && (
            <div style={{ textAlign: "center", marginTop: 16, color: C.muted, fontSize: 12, letterSpacing: 2 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: C.green, marginRight: 8, animation: "pulse 1s infinite" }} />
              Analysing your round with AI...
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── SUMMARY ─────────────────────────────────────────────── */
  if (view === "summary") {
    const sg = roundSG();
    const cats = ["OTT", "APP", "ATG", "PUTT"];
    const maxAbs = Math.max(...cats.map(k => Math.abs(sg[k])), 0.01);

    const catColor = { OTT: "#3d9eff", APP: "#ff9f3d", ATG: "#c97dff", PUTT: C.green };

    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{css}</style>

        {/* Header */}
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>{course || "Round"} · Summary</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: C.green }}>ROUND REPORT</div>
          </div>
          <button onClick={() => setView("round")}
            style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 6, color: C.textDim, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>
            ← Back
          </button>
        </div>

        <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px 60px" }}>

          {/* Total */}
          <div style={{ marginBottom: 28 }} className="fadeIn">
            <div style={{ fontSize: 10, letterSpacing: 4, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Total Strokes Gained</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 80, fontWeight: 900, lineHeight: 1, color: sg.total >= 0 ? C.green : C.red }}>
              {sg.total >= 0 ? "+" : ""}{sg.total.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>vs. scratch baseline · Broadie</div>
          </div>

          {/* Category cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            {cats.map(k => (
              <div key={k} style={{ background: C.surface, border: `1px solid ${sg[k] >= 0 ? C.border : "#3a1414"}`, borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: catColor[k], textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, color: sg[k] >= 0 ? C.green : C.red }}>
                  {sg[k] >= 0 ? "+" : ""}{sg[k].toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 14 }}>Breakdown</div>
            {cats.map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 36, fontSize: 10, letterSpacing: 2, color: catColor[k], textTransform: "uppercase", textAlign: "right", fontWeight: 700 }}>{k}</span>
                <div style={{ flex: 1, height: 8, background: "#1a3020", borderRadius: 4, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "#2a4a2e" }} />
                  <div style={{ position: "absolute", top: 0, height: "100%", borderRadius: 4, background: sg[k] >= 0 ? C.green : C.red, width: `${Math.min(Math.abs(sg[k]) / maxAbs * 50, 50)}%`, left: sg[k] >= 0 ? "50%" : `${50 - Math.min(Math.abs(sg[k]) / maxAbs * 50, 50)}%`, transition: "width .4s" }} />
                </div>
                <span style={{ width: 44, fontSize: 13, fontWeight: 700, textAlign: "right", color: sg[k] >= 0 ? C.green : C.red, fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {sg[k] >= 0 ? "+" : ""}{sg[k].toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Hole by hole */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 12 }}>Hole by Hole</div>
            {sg.holes.slice(0, numHoles).map((hsg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 8px", borderRadius: 6, background: i % 2 === 0 ? "#0a180d" : "transparent", marginBottom: 2 }}>
                <span style={{ fontSize: 13, color: C.textDim, fontFamily: "'Barlow Condensed', sans-serif" }}>Hole {i + 1}</span>
                {hsg ? (
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: hsg.total >= 0 ? C.green : C.red }}>
                    {hsg.total >= 0 ? "+" : ""}{hsg.total.toFixed(2)}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "#2a4a2e" }}>—</span>
                )}
              </div>
            ))}
          </div>

          {/* ── TRAINING PLAN (Hevy-style) ── */}
          <div style={{ fontSize: 10, letterSpacing: 4, color: C.muted, textTransform: "uppercase", marginBottom: 16 }}>
            5-Day Training Plan
          </div>

          {plan && plan.map((day, di) => {
            const dayDone = day.drills.every((_, dri) => completed[`${di}-${dri}`]);
            return (
              <div key={di} style={{ background: C.surface, border: `1px solid ${dayDone ? C.green : C.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }} className="fadeIn">
                {/* Day header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Day {day.day}</div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 800, color: dayDone ? C.green : C.text, lineHeight: 1.1 }}>{day.focus}</div>
                  </div>
                  {dayDone && (
                    <div style={{ background: `${C.green}20`, border: `1px solid ${C.green}`, borderRadius: 6, padding: "4px 10px", fontSize: 10, letterSpacing: 2, color: C.green, textTransform: "uppercase", fontWeight: 700 }}>Done ✓</div>
                  )}
                </div>

                {/* Drills */}
                {day.drills.map((drill, dri) => {
                  const key = `${di}-${dri}`;
                  const done = !!completed[key];
                  return (
                    <div key={dri}
                      onClick={() => toggleDrill(key)}
                      style={{ display: "flex", gap: 14, padding: "14px", borderRadius: 10, background: done ? `${C.green}08` : "#0a180d", border: `1px solid ${done ? C.green : "#1a3020"}`, marginBottom: 8, cursor: "pointer", transition: "all .2s", opacity: done ? 0.7 : 1 }}>
                      {/* Checkbox */}
                      <div style={{ flex: "0 0 24px", width: 24, height: 24, borderRadius: 6, border: `2px solid ${done ? C.green : C.border}`, background: done ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, transition: "all .15s", flexShrink: 0 }}>
                        {done && <span style={{ color: "#030b05", fontSize: 14, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 8 }}>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 700, color: done ? C.textDim : C.text, textDecoration: done ? "line-through" : "none", lineHeight: 1.2 }}>
                            {drill.name}
                          </div>
                          <span style={{ fontSize: 9, letterSpacing: 2, padding: "3px 7px", borderRadius: 4, background: `${catColor[drill.category] || C.green}20`, color: catColor[drill.category] || C.green, fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>
                            {drill.category}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: done ? "#2a4a2e" : C.textDim, lineHeight: 1.6, marginBottom: 10 }}>
                          {drill.description}
                        </div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          {drill.sets && (
                            <div style={{ background: "#1a3020", borderRadius: 6, padding: "5px 10px" }}>
                              <span style={{ fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", display: "block" }}>Sets</span>
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: C.text }}>{drill.sets}</span>
                            </div>
                          )}
                          {drill.reps && (
                            <div style={{ background: "#1a3020", borderRadius: 6, padding: "5px 10px" }}>
                              <span style={{ fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", display: "block" }}>Reps</span>
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: C.text }}>{drill.reps}</span>
                            </div>
                          )}
                          {drill.duration && (
                            <div style={{ background: "#1a3020", borderRadius: 6, padding: "5px 10px" }}>
                              <span style={{ fontSize: 9, letterSpacing: 2, color: C.muted, textTransform: "uppercase", display: "block" }}>Time</span>
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: C.text }}>{drill.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* New round */}
          <button onClick={() => { setHoles(initHoles()); setCurrent(0); setPlan(null); setCompleted({}); setQuizAnswers({}); setView("setup"); }}
            style={{ ...btn("ghost"), marginTop: 8 }}>
            New Round
          </button>
        </div>
      </div>
    );
  }

  return null;
}
