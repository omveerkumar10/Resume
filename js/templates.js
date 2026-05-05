/* js/templates.js — Resume Templates v5 */

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function renderTemplate(d, tpl) {
  if (tpl === 'exec')    return renderExec(d);
  if (tpl === 'minimal') return renderMinimal(d);
  return renderModern(d);
}

/* ============ MODERN BLUE ============ */
function renderModern(d) {
  const contacts = [
    d.email  ? `<span>✉ ${esc(d.email)}</span>`  : '',
    d.phone  ? `<span>📞 ${esc(d.phone)}</span>`  : '',
    d.city   ? `<span>📍 ${esc(d.city)}</span>`   : '',
    d.link   ? `<span>🔗 ${esc(d.link)}</span>`   : '',
    d.github ? `<span>💻 ${esc(d.github)}</span>` : '',
  ].filter(Boolean).join('');

  const certList  = d.certs ? d.certs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];
  const achList   = d.extra ? d.extra.split(/[,;\n]+/).map(s=>s.trim()).filter(Boolean) : [];
  const langList  = d.langs ? d.langs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];

  return `<div class="tpl-modern">
    <div class="r-header">
      <div class="r-name">${esc(d.name)}</div>
      <div class="r-role">${esc(d.role)}</div>
      <div class="r-contacts">${contacts}</div>
    </div>
    <div class="r-body">
      <div class="r-sidebar">
        ${(d.skills||[]).length ? `<div class="r-section-title">Skills</div><ul class="r-bullet-list">${d.skills.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>` : ''}
        ${langList.length ? `<div class="r-section-title">Languages</div><ul class="r-bullet-list">${langList.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>` : ''}
        ${certList.length ? `<div class="r-section-title">Certifications</div><ul class="r-bullet-list">${certList.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        ${(d.educations||[]).length ? `<div class="r-section-title">Education</div>${d.educations.map(e=>`<div class="r-edu"><div class="r-edu-deg">${esc(e.degree)}</div><div class="r-edu-inst">${esc(e.institution)}</div><div class="r-edu-yr">${esc(e.year)}${e.grade?' · '+esc(e.grade):''}</div></div>`).join('')}` : ''}
        ${achList.length ? `<div class="r-section-title">Achievements</div><ul class="r-bullet-list">${achList.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="r-main">
        <div class="r-section-title">Professional Summary</div>
        <div class="r-summary">${esc(d.summary)}</div>

        ${(d.experiences||[]).length ? `<div class="r-section-title">Experience</div>${d.experiences.map(e=>`
          <div class="r-exp">
            <div class="r-exp-header"><div class="r-exp-title">${esc(e.title)}</div><div class="r-exp-date">${esc(e.start)} – ${esc(e.end)}</div></div>
            <div class="r-exp-co">${esc(e.company)}</div>
            <ul class="r-exp-bullets">${(e.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
          </div>`).join('')}` : ''}

        ${(d.projects||[]).length ? `<div class="r-section-title">Projects</div>${d.projects.map(p=>`
          <div class="r-exp">
            <div class="r-exp-header"><div class="r-exp-title">${esc(p.name)}</div>${p.tech?`<div class="r-exp-date">${esc(p.tech)}</div>`:''}</div>
            <ul class="r-exp-bullets">${(p.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
          </div>`).join('')}` : ''}
      </div>
    </div>
  </div>`;
}

/* ============ EXECUTIVE ============ */
function renderExec(d) {
  const contacts = [d.email,d.phone,d.city,d.link,d.github].filter(Boolean);
  const certList  = d.certs ? d.certs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];
  const achList   = d.extra ? d.extra.split(/[,;\n]+/).map(s=>s.trim()).filter(Boolean) : [];
  const langList  = d.langs ? d.langs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];

  return `<div class="tpl-exec">
    <div class="r-header">
      <div class="r-name">${esc(d.name)}</div>
      <div class="r-role">${esc(d.role)}</div>
      <div class="r-contacts">${contacts.map(c=>`<span>${esc(c)}</span>`).join('')}</div>
    </div>
    <div class="r-body">
      <div class="r-section-title">Professional Summary</div><hr class="r-divider"/>
      <div class="r-summary">${esc(d.summary)}</div>

      ${(d.experiences||[]).length ? `<div class="r-section-title">Experience</div><hr class="r-divider"/>
        ${d.experiences.map(e=>`<div class="r-exp">
          <div class="r-exp-left">${esc(e.start)}<br/>– ${esc(e.end)}</div>
          <div class="r-exp-right"><div class="r-exp-title">${esc(e.title)}</div><div class="r-exp-co">${esc(e.company)}</div>
          <ul class="r-exp-bullets">${(e.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
        </div>`).join('')}` : ''}

      ${(d.projects||[]).length ? `<div class="r-section-title">Projects</div><hr class="r-divider"/>
        ${d.projects.map(p=>`<div class="r-exp">
          <div class="r-exp-left">${p.tech?esc(p.tech):''}</div>
          <div class="r-exp-right"><div class="r-exp-title">${esc(p.name)}</div>
          <ul class="r-exp-bullets">${(p.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
        </div>`).join('')}` : ''}

      ${(d.educations||[]).length ? `<div class="r-section-title">Education</div><hr class="r-divider"/>
        ${d.educations.map(e=>`<div class="r-edu-row"><div class="r-edu-left">${esc(e.year)}</div>
          <div><strong>${esc(e.degree)}</strong><br/>${esc(e.institution)}${e.grade?' · '+esc(e.grade):''}</div></div>`).join('')}` : ''}

      ${(d.skills||[]).length ? `<div class="r-section-title">Skills</div><hr class="r-divider"/><div class="r-skills-row">${d.skills.join(' · ')}</div>` : ''}

      ${langList.length||certList.length ? `<div class="r-extra" style="margin-top:.5rem">
        ${langList.length?'Languages: '+langList.join(', ')+'&nbsp;&nbsp;':''}
        ${certList.length?'Certifications: '+certList.join(', '):''}
      </div>` : ''}

      ${achList.length ? `<div class="r-section-title">Achievements</div><hr class="r-divider"/>
        <ul class="r-exp-bullets">${achList.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
  </div>`;
}

/* ============ MINIMAL ============ */
function renderMinimal(d) {
  const contacts = [d.email,d.phone,d.city,d.link,d.github].filter(Boolean);
  const certList  = d.certs ? d.certs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];
  const achList   = d.extra ? d.extra.split(/[,;\n]+/).map(s=>s.trim()).filter(Boolean) : [];
  const langList  = d.langs ? d.langs.split(/[,;]+/).map(s=>s.trim()).filter(Boolean) : [];

  return `<div class="tpl-minimal">
    <div class="r-header">
      <div class="r-header-left"><div class="r-name">${esc(d.name)}</div><div class="r-role">${esc(d.role)}</div></div>
      <div class="r-contacts">${contacts.map(c=>`<div>${esc(c)}</div>`).join('')}</div>
    </div>
    <div class="r-body">
      <div class="r-section-title">Summary</div>
      <div class="r-summary">${esc(d.summary)}</div>

      ${(d.experiences||[]).length ? `<div class="r-section-title">Experience</div>
        ${d.experiences.map(e=>`<div class="r-exp">
          <div class="r-exp-date">${esc(e.start)}<br/>– ${esc(e.end)}</div>
          <div class="r-exp-right"><div class="r-exp-title">${esc(e.title)}</div><div class="r-exp-co">${esc(e.company)}</div>
          <ul class="r-exp-bullets">${(e.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
        </div>`).join('')}` : ''}

      ${(d.projects||[]).length ? `<div class="r-section-title">Projects</div>
        ${d.projects.map(p=>`<div class="r-exp">
          <div class="r-exp-date">${p.tech?esc(p.tech):''}</div>
          <div class="r-exp-right"><div class="r-exp-title">${esc(p.name)}</div>
          <ul class="r-exp-bullets">${(p.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
        </div>`).join('')}` : ''}

      ${(d.educations||[]).length ? `<div class="r-section-title">Education</div>
        ${d.educations.map(e=>`<div class="r-edu-row"><div class="r-edu-date">${esc(e.year)}</div>
          <div><strong>${esc(e.degree)}</strong>, ${esc(e.institution)}${e.grade?' · '+esc(e.grade):''}</div></div>`).join('')}` : ''}

      ${(d.skills||[]).length ? `<div class="r-section-title">Skills</div><div class="r-skills-row">${d.skills.join(' · ')}</div>` : ''}

      ${langList.length||certList.length ? `<div class="r-extra" style="margin-top:.4rem">
        ${langList.length?'Languages: '+langList.join(', ')+'&nbsp;&nbsp;':''}
        ${certList.length?'Certifications: '+certList.join(', '):''}
      </div>` : ''}

      ${achList.length ? `<div class="r-section-title">Achievements</div>
        <ul class="r-exp-bullets" style="padding-left:1rem">${achList.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
  </div>`;
}