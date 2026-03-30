import { useState } from 'react';
import { scrollToSection } from '../hooks/useToast';

// ─── Dummy dataset ────────────────────────────────────────────────────────────
const COLLEGE_DATA = {
  'JEE Main': {
    safe:   [
      { college: 'NIT Patna',          branch: 'Computer Science',      conf: 'High'   },
      { college: 'NIT Raipur',         branch: 'Computer Science',      conf: 'High'   },
      { college: 'NIT Meghalaya',      branch: 'Computer Science',      conf: 'High'   },
      { college: 'NIT Sikkim',         branch: 'Electronics & Comm.',   conf: 'Medium' },
      { college: 'GEC Gandhinagar',    branch: 'Information Technology',conf: 'High'   },
    ],
    target: [
      { college: 'NIT Trichy',         branch: 'Computer Science',      conf: 'Medium' },
      { college: 'NIT Warangal',       branch: 'Electronics & Comm.',   conf: 'Medium' },
      { college: 'NIT Surathkal',      branch: 'Computer Science',      conf: 'Medium' },
      { college: 'IIIT Hyderabad',     branch: 'Computer Science',      conf: 'Low'    },
      { college: 'IIIT Delhi',         branch: 'Computer Science',      conf: 'Medium' },
    ],
    dream:  [
      { college: 'IIT Bombay',         branch: 'Computer Science',      conf: 'Low'    },
      { college: 'IIT Delhi',          branch: 'Computer Science',      conf: 'Low'    },
      { college: 'IIT Madras',         branch: 'Computer Science',      conf: 'Low'    },
      { college: 'IIT Kharagpur',      branch: 'Computer Science',      conf: 'Low'    },
      { college: 'IIT Roorkee',        branch: 'Computer Science',      conf: 'Low'    },
    ],
  },
  'NEET UG': {
    safe:   [
      { college: 'KGMC Lucknow (Govt)',branch: 'MBBS',                  conf: 'High'   },
      { college: 'BJ Medical Ahmedabad',branch: 'MBBS',                 conf: 'High'   },
      { college: 'GMCH Chandigarh',    branch: 'MBBS',                  conf: 'Medium' },
      { college: 'Mysore Medical Coll.',branch: 'MBBS',                 conf: 'High'   },
    ],
    target: [
      { college: 'AIIMS Bhopal',       branch: 'MBBS',                  conf: 'Medium' },
      { college: 'AIIMS Jodhpur',      branch: 'MBBS',                  conf: 'Medium' },
      { college: 'JIPMER Puducherry',  branch: 'MBBS',                  conf: 'Low'    },
      { college: 'AIIMS Rishikesh',    branch: 'MBBS',                  conf: 'Medium' },
    ],
    dream:  [
      { college: 'AIIMS New Delhi',    branch: 'MBBS',                  conf: 'Low'    },
      { college: 'AIIMS Delhi (Dental)',branch:'BDS',                   conf: 'Low'    },
      { college: 'JIPMER (Top-5)',     branch: 'MBBS',                  conf: 'Low'    },
    ],
  },
  BITSAT: {
    safe:   [
      { college: 'BITS Hyderabad',     branch: 'Mechanical Engg.',      conf: 'High'   },
      { college: 'BITS Hyderabad',     branch: 'Chemical Engg.',        conf: 'High'   },
    ],
    target: [
      { college: 'BITS Goa',           branch: 'Computer Science',      conf: 'Medium' },
      { college: 'BITS Goa',           branch: 'Electronics & Inst.',   conf: 'Medium' },
    ],
    dream:  [
      { college: 'BITS Pilani',        branch: 'Computer Science',      conf: 'Low'    },
      { college: 'BITS Pilani',        branch: 'Electronics & Elect.',  conf: 'Low'    },
    ],
  },
  CLAT: {
    safe:   [
      { college: 'NLU Tripura',        branch: 'BA LLB (Hons.)',        conf: 'High'   },
      { college: 'NLU Sikkim',         branch: 'BA LLB (Hons.)',        conf: 'High'   },
      { college: 'NLU Raipur',         branch: 'BA LLB (Hons.)',        conf: 'High'   },
    ],
    target: [
      { college: 'NLU Delhi (AILET)',  branch: 'BA LLB (Hons.)',        conf: 'Low'    },
      { college: 'NLU Bangalore',      branch: 'BA LLB (Hons.)',        conf: 'Medium' },
      { college: 'NALSAR Hyderabad',   branch: 'BA LLB (Hons.)',        conf: 'Medium' },
    ],
    dream:  [
      { college: 'NLSIU Bangalore',    branch: 'BA LLB (Hons.)',        conf: 'Low'    },
      { college: 'NLU Delhi (AILET)',  branch: 'BA LLB (Hons.)',        conf: 'Low'    },
    ],
  },
  CUET: {
    safe:   [
      { college: 'BHU Varanasi',       branch: 'B.Com (Hons.)',         conf: 'High'   },
      { college: 'Jamia Millia Islamia',branch: 'B.Sc. Chemistry',      conf: 'High'   },
    ],
    target: [
      { college: 'DU — Miranda House', branch: 'B.A. (Hons.) English',  conf: 'Medium' },
      { college: 'DU — Kirori Mal',    branch: 'B.Sc. (Hons.) Physics', conf: 'Medium' },
      { college: 'JNU',                branch: 'B.A. History',          conf: 'Medium' },
    ],
    dream:  [
      { college: 'DU — SRCC',          branch: 'B.Com (Hons.)',         conf: 'Low'    },
      { college: 'DU — Hindu College', branch: 'B.Sc. (Hons.) Physics', conf: 'Low'    },
    ],
  },
  IPMAT: {
    safe:   [
      { college: 'IIM Rohtak',         branch: 'IPM (5-Year MBA)',      conf: 'High'   },
    ],
    target: [
      { college: 'IIM Indore',         branch: 'IPM (5-Year MBA)',      conf: 'Medium' },
      { college: 'IIM Ranchi',         branch: 'BBA + MBA (Dual)',      conf: 'Medium' },
    ],
    dream:  [
      { college: 'IIM Indore (Merit List)', branch: 'IPM — Top 100',   conf: 'Low'    },
    ],
  },
};

// Rank/marks thresholds to pick bucket weighting
function getBucketWeights(exam, value) {
  const n = Number(value);
  if (isNaN(n)) return { safe: 3, target: 2, dream: 2 };

  if (exam === 'JEE Main') {
    if (n <= 5000)   return { safe: 2, target: 3, dream: 3 };
    if (n <= 25000)  return { safe: 3, target: 3, dream: 2 };
    if (n <= 75000)  return { safe: 3, target: 2, dream: 1 };
    return             { safe: 3, target: 2, dream: 1 };
  }
  if (exam === 'NEET UG') {
    if (n >= 680)    return { safe: 2, target: 3, dream: 3 };
    if (n >= 620)    return { safe: 3, target: 3, dream: 2 };
    if (n >= 550)    return { safe: 3, target: 2, dream: 1 };
    return             { safe: 3, target: 1, dream: 1 };
  }
  return { safe: 3, target: 2, dream: 2 };
}

function pickResults(exam, value, branch) {
  const base = COLLEGE_DATA[exam] || COLLEGE_DATA['JEE Main'];
  const weights = getBucketWeights(exam, value);

  const filter = (arr) =>
    branch
      ? arr.filter(c => c.branch.toLowerCase().includes(branch.toLowerCase())).concat(
          arr.filter(c => !c.branch.toLowerCase().includes(branch.toLowerCase()))
        )
      : arr;

  return {
    safe:   filter(base.safe).slice(0, weights.safe),
    target: filter(base.target).slice(0, weights.target),
    dream:  filter(base.dream).slice(0, weights.dream),
  };
}

// ─── Roadmap generator ───────────────────────────────────────────────────────
function buildRoadmap(exam, value, results) {
  const topCollege = results.target[0]?.college || results.safe[0]?.college || 'your target college';
  const topDream   = results.dream[0]?.college  || 'your dream college';
  const branch     = results.target[0]?.branch  || results.safe[0]?.branch || 'your chosen branch';

  const roadmaps = {
    'JEE Main': {
      goal: `Secure admission to ${topCollege} in ${branch} through JoSAA counselling.`,
      exams: ['JEE Main (next attempt if needed)', 'JoSAA Counselling', 'JAC Delhi (if applicable)', 'IPU CET (backup)', 'BITSAT (parallel)'],
      weekly: [
        'Week 1–2: Focus on weak topics in Maths (Integration, Vectors)',
        'Week 3–4: Full mock test every 2 days + error analysis',
        'Week 5–6: Revise Chemistry NCERT + Inorganic facts',
        'Week 7: Choice filling research — shortlist 40+ colleges on JoSAA',
        'Week 8: Submit final choice order + document preparation',
      ],
      backup: `If JoSAA doesn't yield ${topCollege}, lock in a seat via IPU / JAC Delhi / BITSAT while upgrading. Also register CUET for DU/BHU as a parallel path.`,
    },
    'NEET UG': {
      goal: `Secure MBBS seat at ${topCollege} through MCC AIQ or State counselling.`,
      exams: ['MCC AIQ Counselling (Rounds 1–3)', 'State Counselling (85% quota)', 'Deemed University Counselling', 'AYUSH NEET Counselling (backup)'],
      weekly: [
        'Week 1–2: Deep-dive Biology — Genetics + Evolution (highest weightage)',
        'Week 3–4: Chemistry NCERT cover-to-cover + mock tests',
        'Week 5: Physics numericals — daily 20 problems',
        'Week 6: Mock tests daily. Track AIR movement via NTA updates',
        'Week 7–8: Prepare documents. Register BOTH MCC + State portals now',
      ],
      backup: `If AIQ doesn't yield ${topCollege}, use State quota (85% seats). Also explore BAMS/BDS at AIIMS via NEET. Deemed Universities as last resort.`,
    },
    BITSAT: {
      goal: `Secure admission to ${topCollege} in ${branch} via BITS own portal.`,
      exams: ['BITSAT (current/next session)', 'JEE Main (parallel)', 'VITEEE', 'SRMJEEE'],
      weekly: [
        'Week 1–2: NCERT + BITS past papers in English + Logical Reasoning',
        'Week 3: Speed drills — BITSAT is time-critical (150 Qs / 180 min)',
        'Week 4: Attempt 3 full mocks per week',
        'Week 5–6: Focus on boosting weak subjects',
        'Week 7–8: Interview prep + document collection for BITS portal',
      ],
      backup: `If BITS score doesn't match, JEE Main rank opens NITs / IIITs. VIT Vellore / SRM are strong fallbacks with good placements.`,
    },
    CLAT: {
      goal: `Secure admission to ${topCollege} via CLAT Consortium counselling.`,
      exams: ['CLAT (current/next cycle)', 'AILET (NLU Delhi separate)', 'IPU LLB (Delhi backup)', 'LSAT India'],
      weekly: [
        'Week 1–2: Legal Reasoning — 30 passages + analyse editorial logic',
        'Week 3: Comprehension speed — aim for 120+ wpm reading',
        'Week 4: Quant + Logical Reasoning mock tests',
        'Week 5–6: Current Affairs compilation — last 6 months',
        'Week 7–8: Full CLAT mocks daily. Time yourself strictly',
      ],
      backup: `AILET is separate from CLAT — register independently for NLU Delhi. IPU offers LLB in Delhi as a parallel path.`,
    },
    CUET: {
      goal: `Secure admission to ${topCollege} through university-specific portals.`,
      exams: ['CUET UG (NTA)', 'DU CSAS Portal', 'BHU Online Portal', 'JNU Admission Portal'],
      weekly: [
        'Week 1–2: Domain subject mastery — NCERT Class 12 cover-to-cover',
        'Week 3: General Test practice — 40 Qs in 45 minutes',
        'Week 4: Language section + Reading Comprehension',
        'Week 5: University-specific research — identify preferred courses',
        'Week 6–8: Register on ALL portals (DU CSAS, BHU, JNU) separately',
      ],
      backup: `No single portal for CUET — register on each university independently. Keep private liberal arts universities (Ashoka, Krea) as parallel applications.`,
    },
    IPMAT: {
      goal: `Crack IPMAT and secure the 5-year MBA at ${topDream}.`,
      exams: ['IPMAT IIM Indore', 'IPMAT IIM Rohtak', 'JIPMAT (NIT-based)', 'CUET for BBA programs'],
      weekly: [
        'Week 1–2: Quantitative Ability — Number Theory, Algebra (daily 2h)',
        'Week 3: Verbal Ability — Vocab + Grammar + RC passages',
        'Week 4–5: Full mocks + sectional analysis',
        'Week 6: PI/WAT preparation — develop sharp opinions on current events',
        'Week 7–8: College research + essay writing for IIM portals',
      ],
      backup: `JIPMAT is a parallel entrance for NIT-run IPM programs. Also register CUET for BBA at DU / BHU as parallel insurance.`,
    },
  };

  return roadmaps[exam] || roadmaps['JEE Main'];
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const CONF_COLORS = {
  High:   { color: 'var(--green)',  bg: 'rgba(58,210,159,0.1)',  border: 'rgba(58,210,159,0.3)'  },
  Medium: { color: 'var(--gold)',   bg: 'rgba(247,201,72,0.1)',  border: 'rgba(247,201,72,0.3)'  },
  Low:    { color: 'var(--pink)',   bg: 'rgba(255,92,147,0.1)',  border: 'rgba(255,92,147,0.3)'  },
};

const BUCKET_META = {
  safe:   { label: '✅ Safe',   accent: 'var(--green)',  desc: 'Very high probability of admission'  },
  target: { label: '🎯 Target', accent: 'var(--violet)', desc: 'Strong chance with good counselling' },
  dream:  { label: '🌟 Dream',  accent: 'var(--gold)',   desc: 'Stretch goals — aim high'            },
};

function CollegeCard({ college, branch, conf }) {
  const c = CONF_COLORS[conf] || CONF_COLORS.Medium;
  return (
    <div className="pred-college-card">
      <div className="pred-college-name">{college}</div>
      <div className="pred-college-branch">{branch}</div>
      <span className="pred-conf-tag" style={{ color: c.color, background: c.bg, borderColor: c.border }}>
        {conf} Confidence
      </span>
    </div>
  );
}

function BucketSection({ type, colleges }) {
  const m = BUCKET_META[type];
  if (!colleges?.length) return null;
  return (
    <div className="pred-bucket">
      <div className="pred-bucket-header" style={{ borderColor: m.accent }}>
        <span className="pred-bucket-label" style={{ color: m.accent }}>{m.label}</span>
        <span className="pred-bucket-desc">{m.desc}</span>
      </div>
      <div className="pred-college-grid">
        {colleges.map((c, i) => <CollegeCard key={i} {...c} />)}
      </div>
    </div>
  );
}

function Roadmap({ exam, value, results }) {
  const rm = buildRoadmap(exam, value, results);
  return (
    <div className="roadmap-wrap reveal">
      <div className="roadmap-header">
        <div className="s-label" style={{ marginBottom: '0.5rem' }}>Personalised Roadmap</div>
        <h3 className="roadmap-title">What Should You Do Next? 🗺️</h3>
      </div>

      <div className="roadmap-grid">

        {/* Goal */}
        <div className="rm-card rm-goal">
          <div className="rm-card-icon">🏁</div>
          <div className="rm-card-label">Your Goal</div>
          <p className="rm-card-text">{rm.goal}</p>
        </div>

        {/* Suggested Exams */}
        <div className="rm-card">
          <div className="rm-card-icon">📋</div>
          <div className="rm-card-label">Apply To These</div>
          <ul className="rm-list">
            {rm.exams.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>

        {/* Weekly Plan */}
        <div className="rm-card rm-weekly">
          <div className="rm-card-icon">📅</div>
          <div className="rm-card-label">8-Week Action Plan</div>
          <ol className="rm-list rm-ordered">
            {rm.weekly.map((w, i) => <li key={i}>{w}</li>)}
          </ol>
        </div>

        {/* Backup */}
        <div className="rm-card rm-backup">
          <div className="rm-card-icon">🛡️</div>
          <div className="rm-card-label">Backup Strategy</div>
          <p className="rm-card-text">{rm.backup}</p>
        </div>

      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const EXAMS = ['JEE Main', 'NEET UG', 'BITSAT', 'CLAT', 'CUET', 'IPMAT'];
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];

export default function PredictorSection() {
  const [exam,     setExam]     = useState('JEE Main');
  const [value,    setValue]    = useState('');
  const [category, setCategory] = useState('General');
  const [branch,   setBranch]   = useState('');
  const [results,  setResults]  = useState(null);
  const [roadmap,  showRoadmap] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const valueLabel  = exam === 'NEET UG' ? 'NEET Score (out of 720)' : 'Rank / Percentile';
  const valuePH     = exam === 'NEET UG' ? 'e.g. 650'                : 'e.g. 12000';

  function handlePredict() {
    setError('');
    if (!value.trim()) { setError('Please enter your rank / score.'); return; }
    setLoading(true);
    setResults(null);
    showRoadmap(false);
    setTimeout(() => {
      const res = pickResults(exam, value, branch);
      setResults(res);
      showRoadmap(true);
      setLoading(false);
    }, 900);
  }

  function handleReset() {
    setResults(null);
    showRoadmap(false);
    setValue('');
    setBranch('');
    setError('');
  }

  return (
    <section id="predictor" style={{ background: 'var(--bg2)' }}>
      <div className="section-content">

        {/* Header */}
        <div className="s-label">AI-Powered Tool</div>
        <h2 className="s-h2 reveal">College &amp; Exam Predictor 🎯</h2>
        <p className="s-desc reveal reveal-d1">
          Enter your exam and rank — get Safe, Target &amp; Dream college predictions with a personalised 8-week roadmap.
        </p>

        {/* Input Card */}
        <div className="pred-input-card reveal reveal-d2">
          <div className="pred-input-grid">

            {/* Exam */}
            <div className="pred-field">
              <label className="pred-label">Exam</label>
              <select
                className="pred-select"
                value={exam}
                onChange={e => { setExam(e.target.value); handleReset(); }}
              >
                {EXAMS.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>

            {/* Rank / Score */}
            <div className="pred-field">
              <label className="pred-label">{valueLabel}</label>
              <input
                className="pred-input"
                type="number"
                placeholder={valuePH}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePredict()}
              />
            </div>

            {/* Category */}
            <div className="pred-field">
              <label className="pred-label">Category (optional)</label>
              <select className="pred-select" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Branch */}
            <div className="pred-field">
              <label className="pred-label">Preferred Branch (optional)</label>
              <input
                className="pred-input"
                type="text"
                placeholder="e.g. Computer Science"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePredict()}
              />
            </div>
          </div>

          {error && <div className="pred-error">{error}</div>}

          <div className="pred-actions">
            <button
              className={`btn-main btn-filled${loading ? ' loading' : ''}`}
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? '⚙️ Predicting…' : '🔮 Predict Colleges'}
            </button>
            {results && (
              <button className="btn-main btn-ghost" onClick={handleReset}>
                Reset ↺
              </button>
            )}
          </div>
        </div>

        {/* Loading shimmer */}
        {loading && (
          <div className="pred-shimmer-wrap">
            {[1, 2, 3].map(i => (
              <div key={i} className="pred-shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="pred-results-wrap">
            <div className="pred-results-header reveal">
              <span className="pred-results-pill">
                📊 Results for {exam} · {category}
                {value && ` · ${exam === 'NEET UG' ? 'Score' : 'Rank'}: ${value}`}
              </span>
            </div>
            {['safe', 'target', 'dream'].map(type => (
              <BucketSection key={type} type={type} colleges={results[type]} />
            ))}

            {roadmap && <Roadmap exam={exam} value={value} results={results} />}
          </div>
        )}

      </div>
    </section>
  );
}
