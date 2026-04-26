import { useState, useEffect, useRef } from "react";

const KEYS = { LOG: "pt_log5", GOALS: "pt_goals5", PROFILE: "pt_profile5" };

// ── FOOD DATABASE ──────────────────────────────────────────────────
const FOOD_DB = [
  { name: "חזה עוף", cal: 165, protein: 31, emoji: "🍗", tag: "בשר", base: 100, unit: "גרם" },
  { name: "שוק עוף ללא עור", cal: 155, protein: 26, emoji: "🍗", tag: "בשר", base: 100, unit: "גרם" },
  { name: "שניצל עוף מטוגן", cal: 230, protein: 22, emoji: "🍗", tag: "בשר", base: 100, unit: "גרם" },
  { name: "בשר טחון רזה", cal: 175, protein: 21, emoji: "🥩", tag: "בשר", base: 100, unit: "גרם" },
  { name: "סטייק בקר רזה", cal: 185, protein: 30, emoji: "🥩", tag: "בשר", base: 100, unit: "גרם" },
  { name: "בשר בקר 80/20", cal: 254, protein: 17, emoji: "🥩", tag: "בשר", base: 100, unit: "גרם" },
  { name: "כבד עוף", cal: 119, protein: 17, emoji: "🥩", tag: "בשר", base: 100, unit: "גרם" },
  { name: "סלמון", cal: 208, protein: 20, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "טונה בקופסא", cal: 116, protein: 26, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "בקלה", cal: 105, protein: 23, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "אמנון", cal: 129, protein: 26, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "שרימפס", cal: 99, protein: 24, emoji: "🦐", tag: "דגים", base: 100, unit: "גרם" },
  { name: "סרדינים בשמן", cal: 208, protein: 25, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "מקרל מעושן", cal: 230, protein: 21, emoji: "🐟", tag: "דגים", base: 100, unit: "גרם" },
  { name: "ביצה שלמה", cal: 78, protein: 6, emoji: "🥚", tag: "ביצים", base: 1, unit: "יחידה" },
  { name: "חלבון ביצה בלבד", cal: 17, protein: 3.6, emoji: "🥚", tag: "ביצים", base: 1, unit: "יחידה" },
  { name: "קוטג'", cal: 70, protein: 11, emoji: "🥛", tag: "חלב", base: 100, unit: "גרם" },
  { name: "יוגורט יווני 0%", cal: 59, protein: 10, emoji: "🫙", tag: "חלב", base: 100, unit: "גרם" },
  { name: "יוגורט יווני 2%", cal: 70, protein: 9, emoji: "🫙", tag: "חלב", base: 100, unit: "גרם" },
  { name: "גבינה לבנה 5%", cal: 76, protein: 8.5, emoji: "🧀", tag: "חלב", base: 100, unit: "גרם" },
  { name: "גבינה צהובה", cal: 393, protein: 25, emoji: "🧀", tag: "חלב", base: 100, unit: "גרם" },
  { name: "גבינת ריקוטה", cal: 174, protein: 11, emoji: "🧀", tag: "חלב", base: 100, unit: "גרם" },
  { name: "חלב פרה 3%", cal: 61, protein: 3.2, emoji: "🥛", tag: "חלב", base: 100, unit: 'מ"ל' },
  { name: "גבינת פרמז'ן", cal: 420, protein: 38, emoji: "🧀", tag: "חלב", base: 100, unit: "גרם" },
  { name: "לאבנה", cal: 95, protein: 7, emoji: "🥛", tag: "חלב", base: 100, unit: "גרם" },
  { name: "שייק וויי (1 סקופ)", cal: 130, protein: 25, emoji: "💪", tag: "תוספים", base: 1, unit: "סקופ" },
  { name: "שייק וויי (2 סקופ)", cal: 260, protein: 50, emoji: "💪", tag: "תוספים", base: 2, unit: "סקופ" },
  { name: "שייק קזאין לילה", cal: 120, protein: 24, emoji: "🌙", tag: "תוספים", base: 1, unit: "סקופ" },
  { name: "שייק חלבון צמחי", cal: 140, protein: 25, emoji: "🌱", tag: "תוספים", base: 1, unit: "סקופ" },
  { name: "חטיף חלבון 60g", cal: 200, protein: 20, emoji: "🍫", tag: "תוספים", base: 1, unit: "חטיף" },
  { name: "עדשים מבושלות", cal: 116, protein: 9, emoji: "🫘", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "חומוס מבושל", cal: 164, protein: 9, emoji: "🫘", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "שעועית שחורה", cal: 132, protein: 9, emoji: "🫘", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "טופו", cal: 76, protein: 8, emoji: "🌱", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "טמפה", cal: 195, protein: 19, emoji: "🌱", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "אדממה", cal: 122, protein: 11, emoji: "🫘", tag: "קטניות", base: 100, unit: "גרם" },
  { name: "בוטנים קלויים", cal: 567, protein: 26, emoji: "🥜", tag: "אגוזים", base: 100, unit: "גרם" },
  { name: "חמאת בוטנים", cal: 588, protein: 25, emoji: "🥜", tag: "אגוזים", base: 100, unit: "גרם" },
  { name: "שקדים", cal: 579, protein: 21, emoji: "🌰", tag: "אגוזים", base: 100, unit: "גרם" },
  { name: "זרעי המפ", cal: 553, protein: 32, emoji: "🌿", tag: "אגוזים", base: 100, unit: "גרם" },
  { name: "זרעי דלעת", cal: 559, protein: 30, emoji: "🎃", tag: "אגוזים", base: 100, unit: "גרם" },
  { name: "קינואה מבושלת", cal: 120, protein: 4, emoji: "🌾", tag: "דגנים", base: 100, unit: "גרם" },
  { name: "שיבולת שועל יבש", cal: 389, protein: 17, emoji: "🥣", tag: "דגנים", base: 100, unit: "גרם" },
  { name: "אורז לבן מבושל", cal: 130, protein: 3, emoji: "🍚", tag: "דגנים", base: 100, unit: "גרם" },
  { name: "פסטה מבושלת", cal: 158, protein: 6, emoji: "🍝", tag: "דגנים", base: 100, unit: "גרם" },
  { name: "שווארמה עוף", cal: 480, protein: 35, emoji: "🌯", tag: "ארוחות", base: 1, unit: "מנה" },
  { name: "שניצל + אורז", cal: 550, protein: 35, emoji: "🍱", tag: "ארוחות", base: 1, unit: "מנה" },
  { name: "סלט טונה עם לחם", cal: 350, protein: 30, emoji: "🥪", tag: "ארוחות", base: 1, unit: "מנה" },
  { name: "פלאפל (4 יחידות)", cal: 280, protein: 8, emoji: "🧆", tag: "ארוחות", base: 4, unit: "יחידה" },
  { name: "קציצות בשר", cal: 100, protein: 9, emoji: "🍖", tag: "ארוחות", base: 1, unit: "יחידה" },
];

const QUICK_FOODS = [
  { name: "ביצה שלמה", cal: 78, protein: 6, emoji: "🥚", base: 1, unit: "יחידה" },
  { name: "חזה עוף", cal: 165, protein: 31, emoji: "🍗", base: 100, unit: "גרם" },
  { name: "קוטג'", cal: 70, protein: 11, emoji: "🥛", base: 100, unit: "גרם" },
  { name: "טונה בקופסא", cal: 116, protein: 26, emoji: "🐟", base: 100, unit: "גרם" },
  { name: "יוגורט יווני 0%", cal: 59, protein: 10, emoji: "🫙", base: 100, unit: "גרם" },
  { name: "שייק וויי (1 סקופ)", cal: 130, protein: 25, emoji: "💪", base: 1, unit: "סקופ" },
  { name: "חמאת בוטנים", cal: 588, protein: 25, emoji: "🥜", base: 100, unit: "גרם" },
  { name: "גבינה לבנה 5%", cal: 76, protein: 8.5, emoji: "🧀", base: 100, unit: "גרם" },
];

const getTodayKey = () => new Date().toISOString().split("T")[0];

// ── PROTEIN CALCULATION (מבוסס על Mayo Clinic + ISSN 2024) ─────────
// מקורות: Mayo Clinic Health System, International Society of Sports Nutrition,
// Examine.com — לפי משקל גוף כולל (g/kg):
//   פעילות קלה (1-2x/שבוע):  1.4 g/kg
//   פעילות בינונית (3-4x/שבוע): 1.7 g/kg
//   פעילות גבוהה (5+x/שבוע / ספורטאי): 2.0 g/kg
// קלוריות: לפי משקל × מכפיל TDEE

function calcGoals(weight, activity) {
  const proteinMultiplier = activity === "light" ? 1.4 : activity === "moderate" ? 1.7 : 2.0;
  const calMultiplier = activity === "light" ? 32 : activity === "moderate" ? 37 : 42;
  return {
    protein: Math.round(weight * proteinMultiplier),
    calories: Math.round(weight * calMultiplier),
    multiplier: proteinMultiplier,
  };
}

// ── AI Image Analysis ─────────────────────────────────────────────
async function analyzeImage(base64, mimeType) {
  const prompt = `You are a nutrition expert. Analyze this food photo carefully.
Identify all visible food items and estimate their portions realistically.
Respond ONLY with a JSON object (no markdown, no backticks, no explanation):
{
  "items": [
    {
      "name": "food name in Hebrew",
      "emoji": "relevant emoji",
      "grams": estimated_grams_number,
      "protein": protein_grams_number,
      "calories": calories_number,
      "confidence": "high" or "medium" or "low"
    }
  ],
  "note": "brief note in Hebrew about the estimation, max 15 words"
}
Important: be realistic with portions. A chicken breast is ~150-200g. List each item separately. All numbers must be actual numbers not strings. If not food, return empty items array.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mimeType, data: base64 } },
          { type: "text", text: prompt }
        ]
      }]
    })
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const text = (data.content || []).map(b => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── Ring ──────────────────────────────────────────────────────────
function Ring({ value, max, color, size = 120, label, sub }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * Math.min(value / max, 1);
  const cx = size / 2, cy = size / 2;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e2433" strokeWidth={10} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition:"stroke-dasharray 0.6s cubic-bezier(.4,2,.6,1)" }}/>
        <text x={cx} y={cy-6} textAnchor="middle" fill="#f0f4ff"
          style={{ transform:`rotate(90deg)`, transformOrigin:`${cx}px ${cy}px`, fontSize:22, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>
          {Math.round(value)}
        </text>
        <text x={cx} y={cy+14} textAnchor="middle" fill="#6b7a99"
          style={{ transform:`rotate(90deg)`, transformOrigin:`${cx}px ${cy}px`, fontSize:11, fontFamily:"'Space Grotesk',sans-serif" }}>
          / {max}
        </text>
      </svg>
      <div style={{ textAlign:"center" }}>
        <div style={{ color:"#f0f4ff", fontWeight:700, fontSize:14 }}>{label}</div>
        <div style={{ color:"#6b7a99", fontSize:11 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Portion Modal ────────────────────────────────────────────────
function PortionModal({ food, onConfirm, onClose }) {
  const isUnit = food.unit !== "גרם" && food.unit !== 'מ"ל';
  const [amount, setAmount] = useState(food.base);
  const sp = Math.round((food.protein / food.base) * amount * 10) / 10;
  const sc = Math.round((food.cal / food.base) * amount);
  const presets = isUnit ? [1, 2, 3, 4] : [50, 100, 150, 200, 250, 300];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.78)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#131929", borderRadius:"20px 20px 0 0", padding:24, width:"100%", maxWidth:440, border:"1px solid #2a3a55", boxSizing:"border-box" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:28 }}>{food.emoji}</span>
            <div>
              <div style={{ fontWeight:800, fontSize:16, color:"#f0f4ff" }}>{food.name}</div>
              <div style={{ fontSize:11, color:"#6b7a99" }}>בחר כמות</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#6b7a99", fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
          {presets.map(p => (
            <button key={p} onClick={() => setAmount(p)}
              style={{ background:amount===p?"#1d4ed8":"#1a2233", color:amount===p?"#fff":"#a0b0cc",
                border:amount===p?"1px solid #3b82f6":"1px solid #2a3a55",
                borderRadius:20, padding:"6px 14px", fontSize:13, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>
              {p} {food.unit}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <button onClick={() => setAmount(a => Math.max(isUnit?1:5, a-(isUnit?1:5)))}
            style={{ background:"#1a2233", border:"1px solid #2a3a55", borderRadius:10, width:38, height:38, color:"#f0f4ff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
          <input type="number" value={amount} onChange={e => setAmount(Math.max(1, Number(e.target.value)||0))}
            style={{ background:"#1a2233", border:"1px solid #2a3a55", borderRadius:10, padding:"8px", color:"#f0f4ff", fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, width:70, textAlign:"center", outline:"none", boxSizing:"border-box" }}/>
          <button onClick={() => setAmount(a => a+(isUnit?1:5))}
            style={{ background:"#1a2233", border:"1px solid #2a3a55", borderRadius:10, width:38, height:38, color:"#f0f4ff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
          <span style={{ color:"#6b7a99", fontSize:13 }}>{food.unit}</span>
        </div>
        <div style={{ background:"#0d1117", borderRadius:14, padding:"12px 16px", marginBottom:16, display:"flex", justifyContent:"space-around" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:800, color:"#22d3ee" }}>{sp}g</div>
            <div style={{ fontSize:11, color:"#6b7a99" }}>חלבון</div>
          </div>
          <div style={{ width:1, background:"#1e2433" }}/>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:800, color:"#f59e0b" }}>{sc}</div>
            <div style={{ fontSize:11, color:"#6b7a99" }}>קלוריות</div>
          </div>
        </div>
        <button style={{ background:"#3b82f6", color:"#fff", border:"none", borderRadius:14, padding:13, fontWeight:800, fontSize:16, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif", width:"100%" }}
          onClick={() => onConfirm({ name:`${food.name} (${amount}${food.unit})`, protein:sp, cal:sc, emoji:food.emoji })}>
          ➕ הוסף לרשימה
        </button>
      </div>
    </div>
  );
}

// ── Camera Result Modal ──────────────────────────────────────────
function CameraModal({ result, imageUrl, onConfirm, onClose }) {
  const [items, setItems] = useState(result.items.map((it, i) => ({ ...it, id:i, enabled:true })));

  const update = (id, field, val) =>
    setItems(prev => prev.map(it => it.id===id ? { ...it, [field]: ["name","emoji"].includes(field) ? val : Number(val)||0 } : it));

  const enabled = items.filter(it => it.enabled);
  const totP = enabled.reduce((s,it) => s+Number(it.protein), 0);
  const totC = enabled.reduce((s,it) => s+Number(it.calories), 0);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#131929", borderRadius:"20px 20px 0 0", padding:20, width:"100%", maxWidth:440, border:"1px solid #2a3a55", boxSizing:"border-box", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontWeight:800, fontSize:17, color:"#f0f4ff" }}>📸 ניתוח AI</div>
            <div style={{ fontSize:11, color:"#6b7a99" }}>ערוך אם צריך ואז הוסף</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#6b7a99", fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <img src={imageUrl} alt="food" style={{ width:"100%", borderRadius:14, maxHeight:180, objectFit:"cover", marginBottom:12 }}/>
        {result.note && (
          <div style={{ background:"#0d1117", borderRadius:10, padding:"8px 12px", marginBottom:12, fontSize:12, color:"#6b7a99", display:"flex", gap:8 }}>
            <span>🤖</span><span>{result.note}</span>
          </div>
        )}
        {items.map(it => (
          <div key={it.id} style={{ background:it.enabled?"#1a2233":"#0f1520", border:"1px solid #2a3a55", borderRadius:14, padding:14, marginBottom:10, opacity:it.enabled?1:0.5 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:22 }}>{it.emoji}</span>
                <input value={it.name} onChange={e => update(it.id,"name",e.target.value)}
                  style={{ background:"transparent", border:"none", color:"#f0f4ff", fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, outline:"none", width:155 }}/>
              </div>
              <button onClick={() => update(it.id,"enabled",!it.enabled)}
                style={{ background:it.enabled?"#22c55e22":"transparent", border:`1px solid ${it.enabled?"#22c55e":"#2a3a55"}`,
                  borderRadius:20, padding:"4px 10px", fontSize:12, cursor:"pointer", color:it.enabled?"#22c55e":"#6b7a99", fontFamily:"'Space Grotesk',sans-serif" }}>
                {it.enabled?"✓ כלול":"+ הוסף"}
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[["grams","גרם","#a0b0cc"],["protein","חלבון g","#22d3ee"],["calories","קל'","#f59e0b"]].map(([f,l,c])=>(
                <div key={f}>
                  <div style={{ fontSize:10, color:"#6b7a99", marginBottom:3 }}>{l}</div>
                  <input type="number" value={it[f]} onChange={e => update(it.id,f,e.target.value)}
                    style={{ background:"#0d1117", border:"1px solid #2a3a55", borderRadius:8, padding:"6px 8px", color:c,
                      fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:700, width:"100%", boxSizing:"border-box", outline:"none", textAlign:"center" }}/>
                </div>
              ))}
            </div>
            {it.confidence && (
              <div style={{ marginTop:6, fontSize:10, color:it.confidence==="high"?"#22c55e":it.confidence==="medium"?"#f59e0b":"#ef4444" }}>
                דיוק: {it.confidence==="high"?"גבוה ✓":it.confidence==="medium"?"בינוני ~":"נמוך ?"}
              </div>
            )}
          </div>
        ))}
        {enabled.length > 0 && (
          <div style={{ background:"#0d1117", borderRadius:14, padding:"12px 16px", marginBottom:14, display:"flex", justifyContent:"space-around" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:800, color:"#22d3ee" }}>{Math.round(totP)}g</div>
              <div style={{ fontSize:11, color:"#6b7a99" }}>סה"כ חלבון</div>
            </div>
            <div style={{ width:1, background:"#1e2433" }}/>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:800, color:"#f59e0b" }}>{Math.round(totC)}</div>
              <div style={{ fontSize:11, color:"#6b7a99" }}>סה"כ קלוריות</div>
            </div>
          </div>
        )}
        <button
          onClick={() => { enabled.forEach(it => onConfirm({ name:it.name, protein:Number(it.protein), cal:Number(it.calories), emoji:it.emoji })); onClose(); }}
          disabled={enabled.length===0}
          style={{ background:enabled.length===0?"#1a2233":"#3b82f6", color:"#fff", border:"none", borderRadius:14, padding:13, fontWeight:800, fontSize:16, cursor:enabled.length===0?"not-allowed":"pointer", fontFamily:"'Space Grotesk',sans-serif", width:"100%", opacity:enabled.length===0?0.5:1 }}>
          ➕ {enabled.length>1?`הוסף ${enabled.length} פריטים`:"הוסף לרשימה"}
        </button>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const C = {
  app: { background:"#0d1117", minHeight:"100vh", fontFamily:"'Space Grotesk',sans-serif", color:"#f0f4ff", direction:"rtl", maxWidth:440, margin:"0 auto", paddingBottom:80 },
  hdr: { padding:"20px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"center" },
  card: { background:"#131929", borderRadius:20, padding:20, margin:"14px 16px 0", border:"1px solid #1e2a3a" },
  btn: (c="#3b82f6") => ({ background:c, color:"#fff", border:"none", borderRadius:12, padding:"10px 18px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" }),
  ghost: { background:"transparent", color:"#6b7a99", border:"1px solid #1e2a3a", borderRadius:12, padding:"8px 14px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" },
  input: { background:"#1a2233", border:"1px solid #2a3a55", borderRadius:12, padding:"10px 14px", color:"#f0f4ff", fontFamily:"'Space Grotesk',sans-serif", fontSize:14, width:"100%", boxSizing:"border-box", outline:"none" },
  lbl: { fontSize:12, color:"#6b7a99", marginBottom:4 },
};

// ── Main App ──────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("main");
  const [goals, setGoals] = useState({ protein:128, calories:2775 });
  const [profile, setProfile] = useState({ weight:75, activity:"moderate" });
  const [log, setLog] = useState({});
  const [form, setForm] = useState({ name:"", cal:"", protein:"" });
  const [searchQ, setSearchQ] = useState("");
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("quick");
  const [portionFood, setPortionFood] = useState(null);
  // camera
  const [camState, setCamState] = useState("idle"); // idle | analyzing | result | error
  const [camResult, setCamResult] = useState(null);
  const [camImgUrl, setCamImgUrl] = useState(null);
  const [camError, setCamError] = useState("");
  const fileInputRef = useRef(null);
  // setup
  const [sw, setSw] = useState(75);
  const [sa, setSa] = useState("moderate");

  useEffect(() => {
    (async () => {
      try { const g = await window.storage.get(KEYS.GOALS); if (g) setGoals(JSON.parse(g.value)); } catch {}
      try { const p = await window.storage.get(KEYS.PROFILE); if (p) { const pr=JSON.parse(p.value); setProfile(pr); setSw(pr.weight); setSa(pr.activity); } } catch {}
      try { const l = await window.storage.get(KEYS.LOG); if (l) setLog(JSON.parse(l.value)); } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (screen==="setup") { setSw(profile.weight); setSa(profile.activity); } }, [screen]);

  const persist = async (key, val, setter) => { setter(val); try { await window.storage.set(key, JSON.stringify(val)); } catch {} };

  const today = getTodayKey();
  const todayLog = log[today] || [];
  const totP = todayLog.reduce((s,e) => s+Number(e.protein), 0);
  const totC = todayLog.reduce((s,e) => s+Number(e.cal), 0);

  const addEntry = e => persist(KEYS.LOG, { ...log, [today]:[...todayLog, { ...e, time:new Date().toLocaleTimeString("he-IL",{hour:"2-digit",minute:"2-digit"}) }] }, setLog);
  const removeEntry = i => persist(KEYS.LOG, { ...log, [today]:todayLog.filter((_,j)=>j!==i) }, setLog);

  // ── Camera / image pick ──────────────────────────────────────────
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const url = URL.createObjectURL(file);
    setCamImgUrl(url);
    setCamState("analyzing");
    setCamError("");
    try {
      const b64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("read failed"));
        r.readAsDataURL(file);
      });
      const result = await analyzeImage(b64, file.type || "image/jpeg");
      if (!result.items?.length) {
        setCamError(result.note || "לא זוהה אוכל בתמונה");
        setCamState("error");
      } else {
        setCamResult(result);
        setCamState("result");
      }
    } catch {
      setCamError("שגיאה בניתוח. בדוק חיבור לאינטרנט ונסה שוב.");
      setCamState("error");
    }
  };

  const closeCam = () => {
    setCamState("idle"); setCamResult(null);
    if (camImgUrl) URL.revokeObjectURL(camImgUrl);
    setCamImgUrl(null);
  };

  const doSearch = q => {
    setSearchQ(q);
    setResults(q ? FOOD_DB.filter(f=>f.name.includes(q)||f.tag.includes(q)).slice(0,9) : []);
  };

  const doManualAdd = () => {
    if (!form.name||!form.cal||!form.protein) return;
    addEntry({ name:form.name, cal:Number(form.cal), protein:Number(form.protein), emoji:"🍽️" });
    setForm({ name:"", cal:"", protein:"" });
    setSaved(true); setTimeout(()=>setSaved(false),1500);
  };

  const suggested = calcGoals(sw, sa);

  if (!loaded) return (
    <div style={{background:"#0d1117",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <span style={{color:"#6b7a99"}}>טוען...</span>
    </div>
  );

  // ── SETUP ──────────────────────────────────────────────────────
  if (screen === "setup") return (
    <div style={C.app}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <div style={C.hdr}>
        <div><div style={{fontSize:22,fontWeight:800}}>⚙️ הגדרות</div><div style={{color:"#6b7a99",fontSize:12,marginTop:2}}>מכוון יעדים בדיוק עבורך</div></div>
        <button style={C.ghost} onClick={()=>setScreen("main")}>חזרה</button>
      </div>
      <div style={C.card}>
        <div style={{marginBottom:14}}>
          <div style={C.lbl}>משקל (ק"ג)</div>
          <input style={C.input} type="number" value={sw} onChange={e=>setSw(Number(e.target.value))}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={C.lbl}>רמת פעילות שבועית</div>
          <div style={{display:"flex",gap:8}}>
            {[["light","קלה\n1-2x 🚶"],["moderate","בינונית\n3-4x 🏃"],["high","גבוהה\n5+x 💪"]].map(([v,l])=>(
              <button key={v} onClick={()=>setSa(v)}
                style={{...C.ghost,flex:1,background:sa===v?"#1d4ed8":"transparent",color:sa===v?"#fff":"#6b7a99",borderColor:sa===v?"#3b82f6":"#1e2a3a",whiteSpace:"pre-line",lineHeight:1.3,padding:"8px 6px",fontSize:12}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Preview & explanation */}
        <div style={{background:"#0d1117",borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{fontSize:12,color:"#6b7a99",marginBottom:10}}>יעד מחושב עבורך</div>
          <div style={{display:"flex",gap:24,marginBottom:12}}>
            <div>
              <div style={{fontSize:28,fontWeight:800,color:"#22d3ee"}}>{suggested.protein}g</div>
              <div style={{fontSize:11,color:"#6b7a99"}}>חלבון ביום</div>
            </div>
            <div>
              <div style={{fontSize:28,fontWeight:800,color:"#f59e0b"}}>{suggested.calories}</div>
              <div style={{fontSize:11,color:"#6b7a99"}}>קלוריות ביום</div>
            </div>
          </div>

          {/* Formula explanation */}
          <div style={{background:"#131929",borderRadius:10,padding:12}}>
            <div style={{fontSize:11,color:"#a0b0cc",fontWeight:700,marginBottom:6}}>איך מחושב היעד?</div>
            <div style={{fontSize:11,color:"#6b7a99",lineHeight:1.7}}>
              <div>• פעילות קלה (1-2x/שבוע): <span style={{color:"#22d3ee"}}>1.4g × משקל</span></div>
              <div>• פעילות בינונית (3-4x): <span style={{color:"#22d3ee"}}>1.7g × משקל</span></div>
              <div>• פעילות גבוהה (5+x): <span style={{color:"#22d3ee"}}>2.0g × משקל</span></div>
              <div style={{marginTop:6,color:"#4a5a72"}}>מקור: Mayo Clinic + ISSN 2024</div>
              <div style={{marginTop:4,color:"#4a5a72"}}>הרופא שלך עשוי להמליץ אחרת — אפשר לערוך ידנית</div>
            </div>
          </div>
        </div>

        {/* Manual override */}
        <div style={{marginBottom:14}}>
          <div style={C.lbl}>או הגדר יעד ידני (אם הרופא המליץ אחרת)</div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:"#6b7a99",marginBottom:3}}>חלבון (g)</div>
              <input style={C.input} type="number" placeholder={String(suggested.protein)}
                value={goals.protein} onChange={e=>setGoals(g=>({...g,protein:Number(e.target.value)||g.protein}))}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:"#6b7a99",marginBottom:3}}>קלוריות</div>
              <input style={C.input} type="number" placeholder={String(suggested.calories)}
                value={goals.calories} onChange={e=>setGoals(g=>({...g,calories:Number(e.target.value)||g.calories}))}/>
            </div>
          </div>
        </div>

        <button style={{...C.btn("#22c55e"),width:"100%",fontSize:16,padding:13}} onClick={async()=>{
          const prof={weight:sw,activity:sa};
          await persist(KEYS.PROFILE,prof,setProfile);
          await persist(KEYS.GOALS,goals,setGoals);
          setScreen("main");
        }}>שמור ✓</button>

        <button style={{...C.ghost,width:"100%",marginTop:10,textAlign:"center"}} onClick={async()=>{
          const prof={weight:sw,activity:sa};
          await persist(KEYS.PROFILE,prof,setProfile);
          await persist(KEYS.GOALS,suggested,setGoals);
          setScreen("main");
        }}>השתמש בחישוב האוטומטי ({suggested.protein}g)</button>
      </div>
    </div>
  );

  // ── HISTORY ─────────────────────────────────────────────────────
  if (screen === "history") {
    const days = Object.keys(log).sort((a,b)=>b.localeCompare(a)).slice(0,30);
    return (
      <div style={C.app}>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <div style={C.hdr}>
          <div><div style={{fontSize:22,fontWeight:800}}>📅 היסטוריה</div><div style={{color:"#6b7a99",fontSize:12,marginTop:2}}>30 יום אחרונים</div></div>
          <button style={C.ghost} onClick={()=>setScreen("main")}>חזרה</button>
        </div>
        {days.length===0&&<div style={{...C.card,color:"#6b7a99",textAlign:"center",padding:30}}>אין עדיין נתונים</div>}
        {days.map(day=>{
          const entries=log[day]||[];
          const p=entries.reduce((s,e)=>s+Number(e.protein),0);
          const c=entries.reduce((s,e)=>s+Number(e.cal),0);
          const hit=p>=goals.protein;
          const isToday=day===today;
          return (
            <div key={day} style={{...C.card,borderColor:isToday?"#3b82f6":"#1e2a3a"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div>
                  <span style={{fontWeight:700,fontSize:14}}>{isToday?"היום ⬅️":day}</span>
                  <span style={{fontSize:11,color:"#6b7a99",marginRight:8}}>{entries.length} ארוחות</span>
                </div>
                <span style={{fontSize:13,color:hit?"#22c55e":"#6b7a99",fontWeight:700}}>{hit?"✅ יעד!":Math.round(p)+"/"+goals.protein+"g"}</span>
              </div>
              <div style={{display:"flex",gap:20,marginBottom:8}}>
                <div><span style={{fontSize:20,fontWeight:800,color:"#22d3ee"}}>{Math.round(p)}g</span><span style={{fontSize:11,color:"#6b7a99",marginRight:4}}>חלבון</span></div>
                <div><span style={{fontSize:20,fontWeight:800,color:"#f59e0b"}}>{Math.round(c)}</span><span style={{fontSize:11,color:"#6b7a99",marginRight:4}}>קל'</span></div>
              </div>
              <div style={{height:6,borderRadius:99,background:"#1e2433",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min((p/goals.protein)*100,100)}%`,background:hit?"#22c55e":"#22d3ee",borderRadius:99}}/>
              </div>
            </div>
          );
        })}
        <div style={{height:20}}/>
      </div>
    );
  }

  // ── MAIN ────────────────────────────────────────────────────────
  const tabBtn = (t, label) => (
    <button onClick={()=>setTab(t)}
      style={{flex:1,background:tab===t?"#1d4ed8":"transparent",color:tab===t?"#fff":"#6b7a99",
        border:tab===t?"1px solid #3b82f6":"1px solid #1e2a3a",
        borderRadius:10,padding:"8px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>
      {label}
    </button>
  );

  return (
    <div style={C.app}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      {/* Hidden file input — NO capture attr so user can choose camera OR gallery */}
      <input ref={fileInputRef} type="file" accept="image/*"
        style={{display:"none"}} onChange={handleFile}/>

      {/* Modals */}
      {portionFood && <PortionModal food={portionFood}
        onConfirm={e=>{addEntry(e);setPortionFood(null);setSearchQ("");setResults([]);}}
        onClose={()=>setPortionFood(null)}/>}
      {camState==="result" && camResult && (
        <CameraModal result={camResult} imageUrl={camImgUrl}
          onConfirm={addEntry} onClose={closeCam}/>
      )}

      {/* HEADER */}
      <div style={C.hdr}>
        <div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:-0.5}}>💪 Protein Day</div>
          <div style={{color:"#6b7a99",fontSize:12,marginTop:2}}>{new Date().toLocaleDateString("he-IL",{weekday:"long",day:"numeric",month:"long"})}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={C.ghost} onClick={()=>setScreen("history")}>📅</button>
          <button style={C.ghost} onClick={()=>setScreen("setup")}>⚙️</button>
        </div>
      </div>

      {/* RINGS */}
      <div style={{...C.card,display:"flex",justifyContent:"space-around"}}>
        <Ring value={totP} max={goals.protein} color={totP>=goals.protein?"#22c55e":"#22d3ee"} label="חלבון" sub="גרם"/>
        <Ring value={totC} max={goals.calories} color={totC>goals.calories*1.1?"#ef4444":"#f59e0b"} label="קלוריות" sub="קל'"/>
      </div>

      {/* STATUS */}
      <div style={{...C.card,textAlign:"center"}}>
        {totP>=goals.protein
          ?<div style={{color:"#22c55e",fontWeight:700,fontSize:16}}>🎉 עמדת ביעד החלבון היום!</div>
          :<div>
            <span style={{color:"#f0f4ff",fontWeight:600}}>נותרו עוד </span>
            <span style={{color:"#22d3ee",fontWeight:800,fontSize:18}}>{Math.round(goals.protein-totP)}g</span>
            <span style={{color:"#f0f4ff",fontWeight:600}}> חלבון</span>
            <div style={{fontSize:12,color:"#6b7a99",marginTop:4}}>≈ {Math.ceil((goals.protein-totP)/25)} מנות נוספות</div>
          </div>
        }
      </div>

      {/* 📸 CAMERA CARD */}
      <div style={{margin:"14px 16px 0"}}>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={camState==="analyzing"}
          style={{
            width:"100%", padding:"16px 20px",
            background:camState==="analyzing"
              ?"linear-gradient(135deg,#0f1e38,#0f1e38)"
              :"linear-gradient(135deg,#1a3060,#0e1e40)",
            border:`1px solid ${camState==="analyzing"?"#2a3a55":"#1e3a70"}`,
            cursor:camState==="analyzing"?"not-allowed":"pointer",
            display:"flex", alignItems:"center", gap:14, borderRadius:18,
            boxSizing:"border-box",
          }}>
          {camState==="analyzing" ? (
            <>
              <div style={{width:28,height:28,border:"3px solid #3b82f6",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#a0b0cc",fontWeight:700,fontSize:15,fontFamily:"'Space Grotesk',sans-serif"}}>מנתח תמונה...</div>
                <div style={{color:"#3a5a8a",fontSize:11,fontFamily:"'Space Grotesk',sans-serif"}}>AI זיהוי מזון בפעולה</div>
              </div>
            </>
          ) : (
            <>
              <div style={{fontSize:34,flexShrink:0}}>📸</div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#e0ecff",fontWeight:800,fontSize:16,fontFamily:"'Space Grotesk',sans-serif"}}>צלם ארוחה</div>
                <div style={{color:"#4a6a99",fontSize:11,fontFamily:"'Space Grotesk',sans-serif",marginTop:2}}>
                  AI ינתח ויחשב חלבון וקלוריות אוטומטית
                </div>
              </div>
            </>
          )}
        </button>
        {camState==="error" && (
          <div style={{background:"#1a0f0f",borderRadius:"0 0 14px 14px",padding:"10px 16px",display:"flex",gap:8,alignItems:"center",border:"1px solid #3a1515",borderTop:"none",marginTop:-4}}>
            <span>⚠️</span>
            <span style={{fontSize:12,color:"#ef4444"}}>{camError}</span>
            <button onClick={()=>setCamState("idle")} style={{background:"none",border:"none",color:"#6b7a99",cursor:"pointer",marginRight:"auto",fontSize:13}}>סגור</button>
          </div>
        )}
      </div>

      {/* ADD PANEL */}
      <div style={C.card}>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {tabBtn("quick","⚡ מהיר")}
          {tabBtn("search","🔍 חיפוש")}
          {tabBtn("manual","✏️ ידני")}
        </div>

        {tab==="quick"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {QUICK_FOODS.map(f=>(
              <button key={f.name} onClick={()=>setPortionFood(f)}
                style={{background:"#1a2233",border:"1px solid #2a3a55",borderRadius:12,padding:"10px 12px",cursor:"pointer",textAlign:"right"}}
                onMouseOver={e=>e.currentTarget.style.background="#1e2a40"}
                onMouseOut={e=>e.currentTarget.style.background="#1a2233"}>
                <div style={{fontSize:18}}>{f.emoji}</div>
                <div style={{fontSize:12,fontWeight:700,color:"#f0f4ff",fontFamily:"'Space Grotesk',sans-serif"}}>{f.name}</div>
                <div style={{fontSize:11,color:"#6b7a99",fontFamily:"'Space Grotesk',sans-serif"}}>{f.protein}g/{f.base}{f.unit} | {f.cal}קל'</div>
              </button>
            ))}
          </div>
        )}

        {tab==="search"&&(
          <div>
            <input style={{...C.input,marginBottom:10}}
              placeholder="חפש... (עוף, טונה, ביצה, יוגורט...)"
              value={searchQ} onChange={e=>doSearch(e.target.value)}/>
            {!searchQ&&(
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {["בשר","דגים","ביצים","חלב","תוספים","קטניות","אגוזים","ארוחות"].map(tag=>(
                  <button key={tag} onClick={()=>doSearch(tag)}
                    style={{background:"#1a2233",border:"1px solid #2a3a55",borderRadius:20,padding:"5px 12px",fontSize:12,color:"#a0b0cc",cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>
                    {tag}
                  </button>
                ))}
              </div>
            )}
            {results.length>0&&(
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {results.map(f=>(
                  <button key={f.name} onClick={()=>setPortionFood(f)}
                    style={{background:"#1a2233",border:"1px solid #2a3a55",borderRadius:12,padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}
                    onMouseOver={e=>e.currentTarget.style.background="#1e2a40"}
                    onMouseOut={e=>e.currentTarget.style.background="#1a2233"}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:20}}>{f.emoji}</span>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#f0f4ff",fontFamily:"'Space Grotesk',sans-serif"}}>{f.name}</div>
                        <div style={{fontSize:11,color:"#6b7a99",fontFamily:"'Space Grotesk',sans-serif"}}>{f.tag}</div>
                      </div>
                    </div>
                    <div style={{textAlign:"left",flexShrink:0}}>
                      <div style={{fontSize:15,fontWeight:800,color:"#22d3ee",fontFamily:"'Space Grotesk',sans-serif"}}>{f.protein}g/{f.base}{f.unit}</div>
                      <div style={{fontSize:11,color:"#6b7a99",fontFamily:"'Space Grotesk',sans-serif"}}>{f.cal}קל'</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {searchQ&&results.length===0&&<div style={{color:"#6b7a99",fontSize:13,textAlign:"center",padding:12}}>לא נמצא</div>}
          </div>
        )}

        {tab==="manual"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <input style={C.input} placeholder="שם המזון" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <div style={{display:"flex",gap:8}}>
              <input style={C.input} type="number" placeholder="גרם חלבון" value={form.protein} onChange={e=>setForm({...form,protein:e.target.value})}/>
              <input style={C.input} type="number" placeholder="קלוריות" value={form.cal} onChange={e=>setForm({...form,cal:e.target.value})}/>
            </div>
            <button style={{...C.btn(saved?"#22c55e":"#3b82f6"),width:"100%",transition:"background 0.3s"}} onClick={doManualAdd}>
              {saved?"✓ נשמר!":"+ הוסף"}
            </button>
          </div>
        )}
      </div>

      {/* TODAY LOG */}
      {todayLog.length>0&&(
        <div style={C.card}>
          <div style={{fontWeight:700,marginBottom:12}}>מה אכלת היום ({todayLog.length})</div>
          {todayLog.map((e,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<todayLog.length-1?"1px solid #1e2433":"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18}}>{e.emoji||"🍽️"}</span>
                <div>
                  <div style={{fontWeight:600,fontSize:13}}>{e.name}</div>
                  <div style={{fontSize:11,color:"#6b7a99"}}>{e.time}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{textAlign:"left"}}>
                  <span style={{color:"#22d3ee",fontWeight:700}}>{e.protein}g</span>
                  <span style={{color:"#6b7a99",fontSize:11,marginRight:4}}>| {e.cal}</span>
                </div>
                <button onClick={()=>removeEntry(i)} style={{background:"none",border:"none",color:"#3a4a66",cursor:"pointer",fontSize:16,padding:0}}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{height:20}}/>
    </div>
  );
}
