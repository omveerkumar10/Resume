/* =============================================
   js/app.js
   Main app logic — steps, form, PDF, copy
   ============================================= */

/* ---- State ---- */
let step    = 0;
let tpl     = 'modern';
let skills  = [];
let expIdx  = 0;
let eduIdx  = 0;
let resume  = null; // built resume data

/* ============================================
   PAGE SWITCHING
   ============================================ */
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

/* ============================================
   STEP NAVIGATION
   ============================================ */
function go(n) {
  if (n > 0 && step === 0) {
    if (!val('f-name') || !val('f-role') || !val('f-email')) {
      alert('Please fill in Full Name, Job Title and Email to continue.');
      return;
    }
  }

  document.getElementById('s' + step).style.display = 'none';
  document.getElementById('s' + n).style.display = 'block';

  for (let i = 0; i < 6; i++) {
    const el  = document.getElementById('pb-' + i);
    const dot = el.querySelector('.prog-dot');
    el.className = 'prog-step' + (i < n ? ' done' : i === n ? ' active' : '');
    dot.textContent = i < n ? '✓' : (i + 1);
  }

  step = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function val(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

/* ============================================
   EXPERIENCE BLOCKS
   ============================================ */
function addExp() {
  const id  = expIdx++;
  const div = document.createElement('div');
  div.className = 'exp-block';
  div.id = 'exp' + id;
  div.innerHTML = `
    <button class="del-btn" onclick="delBlock('exp${id}')" title="Remove">×</button>
    <div class="row">
      <div class="field"><label>Company Name</label>
        <input id="eco${id}" placeholder="Google, TCS, Infosys..."/></div>
      <div class="field"><label>Your Job Title</label>
        <input id="ejt${id}" placeholder="Software Developer"/></div>
    </div>
    <div class="row">
      <div class="field"><label>Start Date</label>
        <input id="esd${id}" placeholder="Jan 2022"/></div>
      <div class="field"><label>End Date</label>
        <input id="eed${id}" placeholder="Present"/></div>
    </div>
    <div class="row full">
      <div class="field">
        <label>Main Work / Responsibilities <em class="hint">(simple words mein likho)</em></label>
        <textarea id="edesc${id}" placeholder="Team lead kiya, website banaya, client se baat ki, data entry, reporting kiya..."></textarea>
      </div>
    </div>`;
  document.getElementById('exp-list').appendChild(div);
}

/* ============================================
   EDUCATION BLOCKS
   ============================================ */
function addEdu() {
  const id  = eduIdx++;
  const div = document.createElement('div');
  div.className = 'exp-block';
  div.id = 'edu' + id;
  div.innerHTML = `
    <button class="del-btn" onclick="delBlock('edu${id}')" title="Remove">×</button>
    <div class="row">
      <div class="field"><label>Institution Name</label>
        <input id="einst${id}" placeholder="Delhi University, IIT..."/></div>
      <div class="field"><label>Degree / Course</label>
        <input id="edeg${id}" placeholder="B.Tech Computer Science"/></div>
    </div>
    <div class="row">
      <div class="field"><label>Year</label>
        <input id="eyr${id}" placeholder="2018 – 2022"/></div>
      <div class="field"><label>Grade / CGPA</label>
        <input id="egrd${id}" placeholder="8.5 CGPA"/></div>
    </div>`;
  document.getElementById('edu-list').appendChild(div);
}

function delBlock(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/* ============================================
   SKILL TAGS
   ============================================ */
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
    .map((s, i) => `<div class="tag">${s}<button onclick="removeSkill(${i})">×</button></div>`)
    .join('');
}

function removeSkill(i) { skills.splice(i, 1); renderTags(); }

/* ============================================
   TEMPLATE SELECT
   ============================================ */
function selectTpl(t) {
  tpl = t;
  ['modern', 'exec', 'minimal'].forEach(x => {
    document.getElementById('tc-' + x).className = 'tmpl-card' + (x === t ? ' selected' : '');
  });
}

/* ============================================
   COLLECT FORM DATA
   ============================================ */
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
    name:     val('f-name'),
    role:     val('f-role'),
    email:    val('f-email'),
    phone:    val('f-phone'),
    city:     val('f-city'),
    link:     val('f-link'),
    expYears: val('f-exp-years'),
    exps, edus, skills,
    langs:  val('f-langs'),
    certs:  val('f-certs'),
    extra:  val('f-extra')
  };
}

/* ============================================
   BUILD RESUME
   ============================================ */
function buildResume() {
  const d = collectData();

  resume = {
    name:    d.name,
    role:    d.role,
    email:   d.email,
    phone:   d.phone,
    city:    d.city,
    link:    d.link,
    summary: generateSummary(d),
    experiences: d.exps.map(e => ({
      ...e,
      bullets: generateBullets(e.desc, e.title || d.role)
    })),
    educations: d.edus,
    skills:  d.skills,
    langs:   d.langs,
    certs:   d.certs,
    extra:   d.extra
  };

  document.getElementById('resume-render').innerHTML = renderTemplate(resume, tpl);
  go(5);
}

/* ============================================
   PDF DOWNLOAD
   — Browser print dialog → "Save as PDF"
   — Works on ALL browsers after deploy
   — Chrome, Firefox, Edge, Safari, Mobile
   ============================================ */
function downloadPDF() {
  if (!resume) return;

  /* Collect all page CSS */
  let css = '';
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) { css += rule.cssText + '\n'; }
    } catch (e) { /* cross-origin fonts skipped */ }
  }

  const content  = document.getElementById('resume-render').innerHTML;
  const pa       = document.getElementById('print-area');

  pa.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=DM+Serif+Display&display=swap');
      body { margin: 0; padding: 0; background: #fff; }
      ${css}
    </style>
    ${content}`;

  pa.style.display = 'block';

  /* Small delay so fonts load before print dialog */
  setTimeout(() => {
    window.print();
    setTimeout(() => { pa.style.display = 'none'; }, 800);
  }, 500);
}

/* ============================================
   COPY PLAIN TEXT
   ============================================ */
function copyText() {
  if (!resume) return;
  const d = resume;
  let t = '';

  t += `${d.name}\n${d.role}\n`;
  t += [d.email, d.phone, d.city, d.link].filter(Boolean).join(' | ') + '\n\n';
  t += `PROFESSIONAL SUMMARY\n${d.summary}\n\n`;

  if ((d.experiences || []).length) {
    t += `EXPERIENCE\n`;
    d.experiences.forEach(e => {
      t += `${e.title} — ${e.company} (${e.start} – ${e.end})\n`;
      (e.bullets || []).forEach(b => { t += `• ${b}\n`; });
      t += '\n';
    });
  }

  if ((d.educations || []).length) {
    t += `EDUCATION\n`;
    d.educations.forEach(e => {
      t += `${e.degree} — ${e.institution} (${e.year})${e.grade ? ' | ' + e.grade : ''}\n`;
    });
    t += '\n';
  }

  if ((d.skills || []).length) t += `SKILLS\n${d.skills.join(', ')}\n`;
  if (d.langs)  t += `\nLanguages: ${d.langs}`;
  if (d.certs)  t += `\nCertifications: ${d.certs}`;
  if (d.extra)  t += `\n\nAchievements: ${d.extra}`;

  navigator.clipboard.writeText(t.trim())
    .then(()  => showToast('✓ Copied to clipboard!'))
    .catch(()  => showToast('Please copy manually'));
}

/* ============================================
   TOAST
   ============================================ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show';
  setTimeout(() => { t.className = 'toast'; }, 2400);
}
