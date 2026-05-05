/* js/app.js — Universal Resume Builder v5 */

let step = 0, tpl = 'modern', skills = [], expIdx = 0, projIdx = 0, eduIdx = 0, resume = null;
let selectedField = 'it';

const FIELD_PLACEHOLDERS = {
  it:         { role: 'Software Developer / QA Engineer', certs: 'AWS, ISTQB, Google Cloud...', extra: 'Won hackathon, open source contributor...', expHint: 'Test cases likhe, bugs report kiye, website banaya, API test kiya...' },
  commerce:   { role: 'Accountant / Finance Executive',   certs: 'CA Foundation, Tally Certified, GST Course...', extra: 'Reduced accounting errors by 30%, handled 500+ entries/day...', expHint: 'Accounts maintain kiye, GST filing ki, balance sheet banaya, tally use kiya...' },
  management: { role: 'Marketing Executive / HR Manager', certs: 'Digital Marketing, PMP, Six Sigma...', extra: 'Exceeded sales target by 20%, led team of 10 people...', expHint: 'Sales target achieve kiya, marketing campaign chalaya, team lead kiya...' },
  arts:       { role: 'Content Writer / Journalist',      certs: 'Content Writing Course, Journalism Diploma...', extra: 'Published 100+ articles, won writing competition...', expHint: 'Articles likhe, research ki, interviews kiye, social media manage kiya...' },
  science:    { role: 'Lab Technician / Research Assistant', certs: 'Lab Safety, Data Analysis Course...', extra: 'Research paper published, lab efficiency improved...', expHint: 'Experiments kiye, data collect kiya, reports banaye, lab maintain kiya...' },
  medical:    { role: 'Staff Nurse / Medical Representative', certs: 'BLS Certified, First Aid, Nursing Council...', extra: 'Handled 50+ patients daily, zero error record...', expHint: 'Patient care ki, vital signs monitor kiye, medicines diye, records maintain kiye...' },
  law:        { role: 'Junior Advocate / Legal Assistant', certs: 'Bar Council Enrolled, Notary...', extra: 'Won 10+ cases, drafted 50+ legal documents...', expHint: 'Legal research ki, documents draft kiye, court mein assist kiya, clients se baat ki...' },
  teaching:   { role: 'School Teacher / Online Tutor',    certs: 'BEd, CTET, TET, CBSE Training...', extra: 'Improved class results by 40%, developed new teaching methods...', expHint: 'Students ko padaya, lesson plans banaye, tests liye, parents se meetings ki...' },
  fresher12:  { role: 'Data Entry Operator / Sales Executive', certs: 'MS Office, Computer Course, Typing...', extra: 'Typing speed 50 WPM, completed internship...', expHint: 'Data entry ki, customers se baat ki, files maintain ki, office work kiya...' },
  other:      { role: 'Your Job Title Here',              certs: 'Your certifications...', extra: 'Your achievements...', expHint: 'Apna kaam simple words mein likho...' }
};

/* ============ FIELD SELECTION ============ */
function selectField(f) {
  selectedField = f;
  document.querySelectorAll('.field-card').forEach(el => el.classList.remove('selected'));
  document.getElementById('fc-' + f).classList.add('selected');
}

/* ============ PAGE ============ */
function showBuilder() {
  document.getElementById('page-landing').style.display = 'none';
  document.getElementById('page-builder').style.display = 'block';
  if (expIdx === 0) addExp();
  if (eduIdx === 0) addEdu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showLanding() {
  document.getElementById('page-builder').style.display = 'none';
  document.getElementById('page-landing').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============ STEPS ============ */
function go(n) {
  if (n > 1 && step === 1) {
    if (!val('f-name') || !val('f-role') || !val('f-email')) {
      alert('Please fill in Full Name, Job Title and Email.'); return;
    }
  }

  /* When moving to step 1 — update placeholders for selected field */
  if (n === 1) updateFieldPlaceholders();
  if (n === 5) updateSkillSuggestions();

  document.getElementById('s' + step).style.display = 'none';
  document.getElementById('s' + n).style.display = 'block';

  for (let i = 0; i < 8; i++) {
    const el = document.getElementById('pb-' + i);
    if (!el) continue;
    el.className = 'prog-step' + (i < n ? ' done' : i === n ? ' active' : '');
    el.querySelector('.prog-dot').textContent = i < n ? '✓' : (i + 1);
  }
  step = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function val(id) { return document.getElementById(id)?.value?.trim() || ''; }

/* ============ FIELD PLACEHOLDERS ============ */
function updateFieldPlaceholders() {
  const ph = FIELD_PLACEHOLDERS[selectedField] || FIELD_PLACEHOLDERS.other;
  const fd = window.FIELDS?.[selectedField] || {};

  /* Role input placeholder + suggestions */
  const roleEl = document.getElementById('f-role');
  if (roleEl) roleEl.placeholder = ph.role;

  const sugEl = document.getElementById('role-suggestions');
  if (sugEl && fd.roles && fd.roles.length) {
    sugEl.innerHTML = '<div class="sug-label">Quick select:</div>' +
      fd.roles.map(r => `<button class="sug-chip" onclick="document.getElementById('f-role').value='${r}';this.parentElement.querySelectorAll('.sug-chip').forEach(x=>x.classList.remove('active'));this.classList.add('active')">${r}</button>`).join('');
  }

  /* Certs & achievements placeholders */
  const certsEl = document.getElementById('f-certs');
  if (certsEl) certsEl.placeholder = ph.certs;
  const extraEl = document.getElementById('f-extra');
  if (extraEl) extraEl.placeholder = ph.extra;

  /* Experience hint */
  const expHint = document.getElementById('exp-hint');
  if (expHint) expHint.textContent = 'Tip: ' + ph.expHint;
}

/* ============ SKILL SUGGESTIONS ============ */
function updateSkillSuggestions() {
  const fd = window.FIELDS?.[selectedField] || {};
  const wrap = document.getElementById('skill-suggestions-wrap');
  const inp = document.getElementById('skill-inp');

  if (fd.skills && fd.skills.length && wrap) {
    wrap.innerHTML = '<div class="sug-label">Suggested skills — click to add:</div>' +
      fd.skills.map(s => `<button class="sug-chip" onclick="addSuggestedSkill('${s}',this)">${s}</button>`).join('');
  }

  if (inp && fd.skills && fd.skills.length) {
    inp.placeholder = fd.skills.slice(0,3).join(', ') + '...';
  }
}

function addSuggestedSkill(s, btn) {
  if (!skills.includes(s)) { skills.push(s); renderTags(); }
  btn.classList.add('active');
}

/* ============ EXP ============ */
function addExp() {
  const id = expIdx++;
  const div = document.createElement('div');
  div.className = 'exp-block'; div.id = 'exp' + id;
  div.innerHTML = `<button class="del-btn" onclick="delBlock('exp${id}')">×</button>
    <div class="row">
      <div class="field"><label>Organisation / Company Name</label><input id="eco${id}" placeholder="Company, School, Hospital, Court..."/></div>
      <div class="field"><label>Your Role / Designation</label><input id="ejt${id}" placeholder="Accountant, Teacher, Nurse, Developer..."/></div>
    </div>
    <div class="row">
      <div class="field"><label>Start Date</label><input id="esd${id}" placeholder="Jan 2022"/></div>
      <div class="field"><label>End Date</label><input id="eed${id}" placeholder="Present"/></div>
    </div>
    <div class="row full">
      <div class="field"><label>What did you do? <em class="hint">(simple words mein — Hindi ya English)</em></label>
      <textarea id="edesc${id}" placeholder="Apna kaam simple words mein likho..."></textarea></div>
    </div>`;
  document.getElementById('exp-list').appendChild(div);
}

/* ============ PROJECTS ============ */
function addProj() {
  const id = projIdx++;
  const div = document.createElement('div');
  div.className = 'exp-block'; div.id = 'proj' + id;
  div.innerHTML = `<button class="del-btn" onclick="delBlock('proj${id}')">×</button>
    <div class="row">
      <div class="field"><label>Project Name</label><input id="pname${id}" placeholder="Website Testing, Accounting System, Research Paper..."/></div>
      <div class="field"><label>Tools / Tech Used</label><input id="ptech${id}" placeholder="Tally, MS Excel, JIRA, Canva..."/></div>
    </div>
    <div class="row full">
      <div class="field"><label>What did you build / do in this project?</label>
      <textarea id="pdesc${id}" placeholder="Login test kiya, accounts maintain kiye, research paper likha, lesson plan banaya..."></textarea></div>
    </div>`;
  document.getElementById('proj-list').appendChild(div);
}

/* ============ EDUCATION ============ */
function addEdu() {
  const id = eduIdx++;
  const div = document.createElement('div');
  div.className = 'exp-block'; div.id = 'edu' + id;
  div.innerHTML = `<button class="del-btn" onclick="delBlock('edu${id}')">×</button>
    <div class="row">
      <div class="field"><label>Institution Name</label><input id="einst${id}" placeholder="Delhi University, IGNOU, St. Xavier's..."/></div>
      <div class="field"><label>Degree / Course</label><input id="edeg${id}" placeholder="BCA / BCom / BA / BSc / 12th Science..."/></div>
    </div>
    <div class="row">
      <div class="field"><label>Year</label><input id="eyr${id}" placeholder="2022 – 2025"/></div>
      <div class="field"><label>Grade / CGPA / Percentage</label><input id="egrd${id}" placeholder="8.5 CGPA / 75%"/></div>
    </div>`;
  document.getElementById('edu-list').appendChild(div);
}

function delBlock(id) { const el = document.getElementById(id); if (el) el.remove(); }

/* ============ SKILLS ============ */
function addSkill(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const v = e.target.value.replace(',', '').trim();
    if (v && !skills.includes(v)) { skills.push(v); renderTags(); }
    e.target.value = '';
  }
}
function renderTags() {
  document.getElementById('skill-tags').innerHTML = skills
    .map((s, i) => `<div class="tag">${s}<button onclick="removeSkill(${i})">×</button></div>`).join('');
}
function removeSkill(i) { skills.splice(i, 1); renderTags(); }

/* ============ TEMPLATE ============ */
function selectTpl(t) {
  tpl = t;
  ['modern','exec','minimal'].forEach(x => {
    document.getElementById('tc-' + x).className = 'tmpl-card' + (x === t ? ' selected' : '');
  });
}

/* ============ COLLECT ============ */
function collectData() {
  const exps = [];
  document.querySelectorAll('[id^="eco"]').forEach(el => {
    const id = el.id.replace('eco', '');
    if (el.value.trim()) exps.push({
      company: el.value.trim(),
      title:   document.getElementById('ejt'   + id)?.value.trim() || '',
      start:   document.getElementById('esd'   + id)?.value.trim() || '',
      end:     document.getElementById('eed'   + id)?.value.trim() || 'Present',
      desc:    document.getElementById('edesc' + id)?.value.trim() || ''
    });
  });
  const projs = [];
  document.querySelectorAll('[id^="pname"]').forEach(el => {
    const id = el.id.replace('pname', '');
    if (el.value.trim()) projs.push({
      name:  el.value.trim(),
      tech:  document.getElementById('ptech' + id)?.value.trim() || '',
      desc:  document.getElementById('pdesc' + id)?.value.trim() || ''
    });
  });
  const edus = [];
  document.querySelectorAll('[id^="einst"]').forEach(el => {
    const id = el.id.replace('einst', '');
    if (el.value.trim()) edus.push({
      institution: el.value.trim(),
      degree: document.getElementById('edeg' + id)?.value.trim() || '',
      year:   document.getElementById('eyr'  + id)?.value.trim() || '',
      grade:  document.getElementById('egrd' + id)?.value.trim() || ''
    });
  });
  return {
    field: selectedField,
    name: val('f-name'), role: val('f-role'), email: val('f-email'),
    phone: val('f-phone'), city: val('f-city'), link: val('f-link'),
    github: val('f-github'), expYears: val('f-exp-years'),
    exps, projs, edus, skills,
    langs: val('f-langs'), certs: val('f-certs'), extra: val('f-extra')
  };
}

/* ============ BUILD ============ */
function buildResume() {
  const d = collectData();
  resume = {
    ...d,
    summary: generateSummary(d),
    experiences: d.exps.map(e => ({ ...e, bullets: generateBullets(e.desc, e.title || d.role, d.field) })),
    projects:    d.projs.map(p => ({ ...p, bullets: generateProjectBullets(p.desc, d.field) })),
    educations:  d.edus
  };
  document.getElementById('resume-render').innerHTML = renderTemplate(resume, tpl);
  go(7);
}

/* ============ PDF ============ */
function downloadPDF() {
  if (!resume) return;
  let css = '';
  for (const sheet of document.styleSheets) {
    try { for (const rule of sheet.cssRules) { css += rule.cssText + '\n'; } } catch (e) {}
  }
  const pa = document.getElementById('print-area');
  pa.innerHTML = `<style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=DM+Serif+Display&display=swap');
    body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    ${css}
  </style>${document.getElementById('resume-render').innerHTML}`;
  pa.style.display = 'block';
  setTimeout(() => { window.print(); setTimeout(() => { pa.style.display = 'none'; }, 800); }, 600);
}

/* ============ COPY ============ */
function copyText() {
  if (!resume) return;
  const d = resume;
  let t = `${d.name}\n${d.role}\n`;
  t += [d.email,d.phone,d.city,d.link,d.github].filter(Boolean).join(' | ') + '\n\n';
  t += `PROFESSIONAL SUMMARY\n${d.summary}\n\n`;
  if ((d.experiences||[]).length) {
    t += 'EXPERIENCE\n';
    d.experiences.forEach(e => { t += `${e.title} — ${e.company} (${e.start}–${e.end})\n`; (e.bullets||[]).forEach(b => { t += `• ${b}\n`; }); t += '\n'; });
  }
  if ((d.projects||[]).length) {
    t += 'PROJECTS\n';
    d.projects.forEach(p => { t += `${p.name}${p.tech?' | '+p.tech:''}\n`; (p.bullets||[]).forEach(b => { t += `• ${b}\n`; }); t += '\n'; });
  }
  if ((d.educations||[]).length) {
    t += 'EDUCATION\n';
    d.educations.forEach(e => { t += `${e.degree} — ${e.institution} (${e.year})${e.grade?' | '+e.grade:''}\n`; });
    t += '\n';
  }
  if ((d.skills||[]).length) t += `SKILLS\n${d.skills.join(', ')}\n`;
  if (d.langs) t += `\nLanguages: ${d.langs}`;
  if (d.certs) t += `\nCertifications: ${d.certs}`;
  if (d.extra) t += `\nAchievements: ${d.extra}`;
  navigator.clipboard.writeText(t.trim()).then(() => showToast('✓ Copied!')).catch(() => showToast('Please copy manually'));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast show';
  setTimeout(() => { t.className = 'toast'; }, 2400);
}

/* Expose FIELDS to app.js from content.js */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof FIELDS !== 'undefined') window.FIELDS = FIELDS;
});