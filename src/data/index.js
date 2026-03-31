export const DEMO_USERS = [
  { email: 'student@citadel.in', password: 'citadel123' },
  { email: 'demo@test.com',      password: 'demo123'    },
  { email: 'admin@citadel.in',   password: 'admin123'   },
];

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const SYSTEM_PROMPT = `You are the Citadel Counselor — a sharp, warm AI guide for Indian Class 12 students figuring out their next step.

Rules:
- Give clear, structured, India-specific advice on exams, streams, colleges, and counselling
- Always explain WHY a path fits — not just what it is
- Mention 3-5 specific exams/colleges when relevant
- Keep answers concise but insightful — no fluff, no platitudes
- Use short paragraphs, and bullet points where helpful
- End with a punchy follow-up question to keep the student engaged

India context:
STREAMS: PCM (JEE/BITSAT/IISER/NDA), PCB (NEET/IISER/CUET/ICAR), Commerce (IPMAT/CA/CUET/CLAT), Humanities (CLAT/CUET/IIMC/NID)
COUNSELLING: JoSAA (IITs/NITs/IIITs) + JAC Delhi (DTU/NSUT) + IPU + UPTAC + Private — apply simultaneously.
Medical: MCC AIQ = 15% | State = 85% — both are mandatory. CUET: no central portal — each university (DU CSAS, BHU, JNU) has own system.`;

export const streamData = {
  PCM: {
    label: 'Science Non-Medical', emoji: '⚙️',
    tagline: 'Maximum scope. Hardest path. JEE is the gateway — not the only door.',
    exams: [
      { e:'⚡', n:'JEE Main',     d:'Gateway to NITs, IIITs, GFTIs. 2 attempts/year. Highest competition.' },
      { e:'🏆', n:'JEE Advanced', d:'IITs only. Top 2.5L JEE Main scorers qualify. Most prestigious.' },
      { e:'🎯', n:'BITSAT',       d:'BITS Pilani, Goa, Hyderabad. Online exam. Predictable results.' },
      { e:'🔬', n:'IISER IAT',    d:'Research path. BSc-MS dual degree. Monthly stipend.' },
      { e:'🏫', n:'VITEEE/SRMJEEE', d:'VIT, SRM — top private colleges. Good placements.' },
      { e:'🪖', n:'NDA',          d:'National Defence Academy. After 12th PCM. UPSC exam.' },
    ],
    domains: [
      { e:'💻', n:'Engineering/Tech',       x:'JEE Main · JEE Advanced · BITSAT · VITEEE' },
      { e:'🔬', n:'Pure Science/Research',  x:'IISER IAT · NEST · ISI · CMI' },
      { e:'📊', n:'Data Science/Economics', x:'CUET UG · IPMAT · ISI' },
      { e:'🪖', n:'Defense/Govt',           x:'NDA · TES (via JEE Main)' },
      { e:'🎨', n:'Design/Architecture',    x:'NATA · UCEED · CEED' },
    ],
    counselling: [
      { e:'🌍', n:'JoSAA',         d:'IITs, NITs, IIITs, GFTIs. 6+ rounds.' },
      { e:'🏙️', n:'JAC Delhi',     d:'DTU, NSUT, IIIT Delhi. 85% seats for Delhi students.' },
      { e:'🏢', n:'IPU Counselling',d:'USICT, MAIT, MSIT. More seats than JAC.' },
      { e:'⚡', n:'BITS Pilani',   d:'BITSAT score. Pilani/Goa/Hyderabad.' },
    ],
    strategy: 'Apply to ALL simultaneously — JoSAA + JAC Delhi + IPU + Private. Hold a private seat while trying for govt upgrades. Same rank, different college: depends entirely on choice filling order.',
  },
  PCB: {
    label: 'Science Medical', emoji: '🧬',
    tagline: 'Focused path. NEET is king — but never your only bet.',
    exams: [
      { e:'🩺', n:'NEET UG',    d:'MBBS, BDS, BAMS. 720 marks. One attempt/year.' },
      { e:'🔬', n:'IISER IAT',  d:'Life sciences research. BS-MS. Stipend.' },
      { e:'📋', n:'CUET UG',    d:'DU, BHU, JNU. Psychology, Bio, Biotech.' },
      { e:'🌾', n:'ICAR AIEEA', d:'Agriculture, Forestry, Food Tech.' },
    ],
    domains: [
      { e:'🏥', n:'Medical/MBBS',       x:'NEET UG → AIIMS, Govt Medical' },
      { e:'🧬', n:'Life Sciences',      x:'IISER IAT · NEST · CUET UG' },
      { e:'🧠', n:'Psychology/Neuro',   x:'CUET UG · TISS · Christ University' },
      { e:'🌱', n:'Agriculture/Env',    x:'ICAR AIEEA · State Ag Entrances' },
    ],
    counselling: [
      { e:'🏛️', n:'MCC (AIQ)',        d:'15% all-India quota + AIIMS + Deemed.' },
      { e:'🗺️', n:'State Counselling', d:'85% state quota. Run separately from AIQ.' },
    ],
    strategy: 'Primary: NEET. Backup: CUET UG + IISER IAT. Register CUET before NEET results. MCC AIQ (15%) + State counselling (85%) run separately — apply to BOTH.',
  },
  Commerce: {
    label: 'Business & Finance', emoji: '📊',
    tagline: 'Most underrated stream. Highest ROI. Multi-application is the strategy.',
    exams: [
      { e:'🏛️', n:'IPMAT',        d:'IIM Indore/Rohtak. 5-year integrated MBA.' },
      { e:'💰', n:'CA Foundation', d:'Chartered Accountancy. Start anytime after 12th.' },
      { e:'📋', n:'CUET UG',       d:'DU (SRCC, Hindu), BHU, JNU.' },
      { e:'⚖️', n:'CLAT',          d:'24 NLUs. Integrated LLB.' },
    ],
    domains: [
      { e:'📈', n:'Management/BBA', x:'IPMAT · CUET · DU JAT' },
      { e:'💰', n:'Finance/CA',     x:'CA Foundation · CS Executive' },
      { e:'⚖️', n:'Law',           x:'CLAT · AILET' },
    ],
    counselling: [
      { e:'🎓', n:'DU CSAS Portal',    d:'BCom, Economics, Psychology.' },
      { e:'⚖️', n:'CLAT Counselling', d:'Centralized for NLUs.' },
    ],
    strategy: "Unlike PCM, there's no single portal. Apply simultaneously: CUET + CLAT + IPU + private universities. Track all portals — never miss a deadline.",
  },
  Humanities: {
    label: 'Arts & Social Sciences', emoji: '📚',
    tagline: 'Most flexible, most misunderstood. Strategy > exams here.',
    exams: [
      { e:'⚖️', n:'CLAT',    d:'24 NLUs. ₹20L+ at top firms.' },
      { e:'🎓', n:'CUET UG', d:'200+ universities. All humanities subjects.' },
      { e:'📡', n:'IIMC',    d:'Premier journalism institute.' },
      { e:'🎨', n:'NID DAT', d:'National Institute of Design.' },
    ],
    domains: [
      { e:'⚖️', n:'Law',             x:'CLAT · AILET · DU LLB' },
      { e:'🧠', n:'Psychology',      x:'CUET UG · TISS · Christ University' },
      { e:'📰', n:'Media/Journalism',x:'IIMC · XIC · CUET' },
      { e:'🎨', n:'Design/Creative', x:'NID DAT · NIFT · UCEED' },
    ],
    counselling: [
      { e:'⚖️', n:'CLAT Counselling',   d:'Centralized for all NLUs.' },
      { e:'🎓', n:'DU CSAS',            d:'History, Pol Sci, Psychology.' },
      { e:'🎨', n:'NID/NIFT Counselling',d:'Portfolio + test. Centralized.' },
    ],
    strategy: 'Multi-application strategy: CUET (DU + BHU + others) + CLAT + IPU + private. For Ashoka/Krea/FLAME: extracurriculars + writing portfolio + interviews matter MORE than marks.',
  },
};

export const stateData = [
  { id:'delhi', flag:'🏙️', name:'Delhi', portal:'JAC Delhi & IPU Counselling', exam:'jee', examLabel:'JEE Main & CUET', courses:['DTU','NSUT','IIIT-D','IGDTUW','B.Tech','Law','Management'], note:'85% seats for Delhi domicile. JAC and IPU run in parallel — apply to both simultaneously for maximum options.', aiQ:'JAC Delhi vs IPU counselling strategy' },
  { id:'up', flag:'🏔️', name:'Uttar Pradesh', portal:'UPTAC (Formerly AKTU)', exam:'jee cuet', examLabel:'JEE Main / CUET', courses:['B.Tech','Engineering','Pharmacy'], note:'Formerly known as AKTU Counselling. Covers hundreds of UP-affiliated engineering colleges. Huge seat pool — great backup for JEE students.', aiQ:'UPTAC AKTU UP counselling JEE Main' },
  { id:'maharashtra', flag:'🏖️', name:'Maharashtra', portal:'MHT CET Counselling (CAP)', exam:'state', examLabel:'MHT CET', courses:['Engineering','Pharmacy'], note:'CAP (Centralized Admission Process) Rounds. Covers COEP, VJTI, ICT Mumbai and 500+ colleges. One of India\'s largest state counsellings.', aiQ:'MHT CET Maharashtra CAP counselling strategy' },
  { id:'karnataka', flag:'🌴', name:'Karnataka', portal:'KCET Counselling (KEA)', exam:'state', examLabel:'KCET', courses:['Engineering','Medical','Agriculture'], note:'Karnataka Examinations Authority (KEA) conducts centralized counselling. Covers RV College, BMS, PES, MSRIT and 200+ institutions.', aiQ:'KCET Karnataka KEA counselling' },
  { id:'tamilnadu', flag:'🌾', name:'Tamil Nadu', portal:'TNEA — Tamil Nadu Engineering Admissions', exam:'state', examLabel:'Class 12 Marks (No Entrance!)', courses:['Engineering'], note:'🌟 Unique — TN is one of the few states with NO entrance exam. Admission purely on Class 12 aggregate. Great for board toppers.', aiQ:'TNEA Tamil Nadu engineering admissions Class 12 marks' },
  { id:'telangana', flag:'🌄', name:'Telangana', portal:'TS EAMCET Counselling', exam:'state', examLabel:'TS EAMCET', courses:['Engineering','Agriculture','Medical'], note:'Conducted by TSCHE. Covers NIT Warangal quota, JNTUH, Osmania University and 400+ affiliated colleges.', aiQ:'TS EAMCET Telangana counselling process' },
  { id:'andhra', flag:'🌊', name:'Andhra Pradesh', portal:'AP EAMCET Counselling', exam:'state', examLabel:'AP EAMCET', courses:['Engineering','Agriculture'], note:'Conducted by APSCHE. Covers AU, JNTUA, SVUCE and 500+ engineering colleges across Andhra Pradesh.', aiQ:'AP EAMCET Andhra Pradesh counselling' },
  { id:'westbengal', flag:'🌳', name:'West Bengal', portal:'WBJEE Counselling', exam:'state', examLabel:'WBJEE', courses:['Engineering','Pharmacy'], note:'West Bengal Joint Entrance Examinations Board. Covers Jadavpur University, IIEST Shibpur, MAKAUT affiliated colleges.', aiQ:'WBJEE West Bengal counselling Jadavpur' },
  { id:'mp', flag:'🌻', name:'Madhya Pradesh', portal:'MP DTE Counselling', exam:'jee state', examLabel:'JEE Main / MP State Exams', courses:['Engineering','Polytechnic'], note:'Directorate of Technical Education MP. Covers MANIT Bhopal quota, IIT Indore quota, and 200+ state colleges. Accepts JEE Main scores.', aiQ:'MP DTE counselling JEE Main Madhya Pradesh' },
  { id:'rajasthan', flag:'🌾', name:'Rajasthan', portal:'REAP — Rajasthan Engineering Admission', exam:'jee state', examLabel:'JEE Main / Class 12', courses:['Engineering'], note:'Rajasthan Engineering Admission Process covers MNIT Jaipur quota and 150+ private/government colleges.', aiQ:'REAP Rajasthan engineering admission process' },
  { id:'gujarat', flag:'🌿', name:'Gujarat', portal:'ACPC Counselling', exam:'state jee', examLabel:'GUJCET / JEE Main', courses:['Engineering','Pharmacy'], note:'Admission Committee for Professional Courses. Covers NIT Surat quota, SVNIT, DA-IICT and 200+ affiliated colleges.', aiQ:'ACPC GUJCET Gujarat counselling DA-IICT' },
  { id:'hp', flag:'🌄', name:'Himachal Pradesh', portal:'HPCET Counselling', exam:'state jee', examLabel:'HPCET / JEE Main', courses:['Engineering'], note:'HP Technical University conducts HPCET. Covers NIT Hamirpur quota and state engineering colleges. JEE Main score also accepted.', aiQ:'HPCET Himachal Pradesh counselling NIT Hamirpur' },
  { id:'haryana', flag:'🌾', name:'Haryana', portal:'HSTES Counselling', exam:'jee', examLabel:'JEE Main', courses:['Engineering'], note:'Haryana State Technical Education Society counselling. Covers NIT Kurukshetra quota and 150+ Haryana engineering colleges.', aiQ:'HSTES Haryana engineering counselling JEE Main' },
  { id:'odisha', flag:'🌊', name:'Odisha', portal:'OJEE Counselling', exam:'state jee', examLabel:'OJEE / JEE Main', courses:['Engineering','MBA','MCA'], note:'Odisha Joint Entrance Examination Board. Multi-course counselling including lateral entry. Covers NIT Rourkela quota and 100+ colleges.', aiQ:'OJEE Odisha counselling NIT Rourkela' },
  { id:'kerala', flag:'🌴', name:'Kerala', portal:'KEAM Counselling (CEE Kerala)', exam:'state', examLabel:'KEAM', courses:['Engineering','Medical'], note:'Commissioner for Entrance Examinations (CEE) Kerala. Covers NIT Calicut quota, Government Engineering Colleges and all affiliated institutions.', aiQ:'KEAM Kerala CEE counselling NIT Calicut' },
  { id:'uttarakhand', flag:'🌄', name:'Uttarakhand', portal:'UKSEE Counselling', exam:'state jee', examLabel:'UKSEE / JEE Main', courses:['Engineering'], note:'Uttarakhand Technical University conducts UKSEE. Covers Graphic Era, DIT University and state engineering colleges.', aiQ:'UKSEE Uttarakhand engineering counselling' },
  { id:'punjab', flag:'🌾', name:'Punjab', portal:'PTU Counselling (IKGPTU)', exam:'jee', examLabel:'JEE Main', courses:['Engineering'], note:'IK Gujral Punjab Technical University counselling. Covers Thapar Institute quota and 100+ affiliated engineering colleges across Punjab.', aiQ:'PTU Punjab IKGPTU counselling Thapar JEE Main' },
  { id:'bihar', flag:'🌿', name:'Bihar', portal:'BCECE Counselling', exam:'state', examLabel:'BCECE', courses:['Engineering','Agriculture'], note:'Bihar Combined Entrance Competitive Examination Board. Covers NIT Patna quota, BIT Sindri and all state engineering and agricultural colleges.', aiQ:'BCECE Bihar engineering agriculture counselling NIT Patna' },
];

export const DOODLE_SYMBOLS = ['∫','∑','∞','Δ','π','√','≈','⊕','⊗','∂','φ','Ω','★','◆','○','△','□','⬡','dx','dy','v=u+at','F=ma','E=mc²','PV=nRT'];
