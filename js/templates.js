/* =============================================
   js/templates.js
   3 resume templates ka HTML render code
   ============================================= */

function esc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

function renderTemplate(data, tpl) {
  if (tpl === 'exec')    return renderExec(data);
  if (tpl === 'minimal') return renderMinimal(data);
  return renderModern(data);
}

/* ---- Template 1: Modern Blue ---- */
function renderModern(d) {
  const contacts = [d.email, d.phone, d.city, d.link].filter(Boolean);

  const sidebar = `
    <div class="r-sidebar">
      ${(d.skills || []).length ? `
        <div class="r-section-title">Skills</div>
        ${d.skills.map(s => `<span class="r-skill-chip">${esc(s)}</span>`).join(' ')}` : ''}

      ${d.langs ? `
        <div class="r-section-title">Languages</div>
        <div class="r-lang">${esc(d.langs)}</div>` : ''}

      ${d.certs ? `
        <div class="r-section-title">Certifications</div>
        <div class="r-lang">${esc(d.certs)}</div>` : ''}

      ${(d.educations || []).length ? `
        <div class="r-section-title">Education</div>
        ${d.educations.map(e => `
          <div class="r-edu">
            <div class="r-edu-deg">${esc(e.degree)}</div>
            <div class="r-edu-inst">${esc(e.institution)}</div>
            <div class="r-edu-yr">${esc(e.year)}${e.grade ? ' · ' + esc(e.grade) : ''}</div>
          </div>`).join('')}` : ''}

      ${d.extra ? `
        <div class="r-section-title">Achievements</div>
        <div class="r-lang">${esc(d.extra)}</div>` : ''}
    </div>`;

  const main = `
    <div class="r-main">
      <div class="r-section-title">Professional Summary</div>
      <div class="r-summary">${esc(d.summary)}</div>

      ${(d.experiences || []).length ? `
        <div class="r-section-title">Experience</div>
        ${d.experiences.map(e => `
          <div class="r-exp">
            <div class="r-exp-title">${esc(e.title)}</div>
            <div class="r-exp-co">${esc(e.company)}</div>
            <div class="r-exp-date">${esc(e.start)} – ${esc(e.end)}</div>
            <ul class="r-exp-bullets">
              ${(e.bullets || []).map(b => `<li>${esc(b)}</li>`).join('')}
            </ul>
          </div>`).join('')}` : ''}
    </div>`;

  return `
    <div class="tpl-modern">
      <div class="r-header">
        <div class="r-name">${esc(d.name)}</div>
        <div class="r-role">${esc(d.role)}</div>
        <div class="r-contacts">${contacts.map(c => `<span>${esc(c)}</span>`).join('')}</div>
      </div>
      <div class="r-body">${sidebar}${main}</div>
    </div>`;
}

/* ---- Template 2: Executive Classic ---- */
function renderExec(d) {
  const contacts = [d.email, d.phone, d.city, d.link].filter(Boolean);

  return `
    <div class="tpl-exec">
      <div class="r-header">
        <div class="r-name">${esc(d.name)}</div>
        <div class="r-role">${esc(d.role)}</div>
        <div class="r-contacts">${contacts.map(c => `<span>${esc(c)}</span>`).join('')}</div>
      </div>
      <div class="r-body">
        <div class="r-section-title">Professional Summary</div>
        <hr class="r-divider"/>
        <div class="r-summary">${esc(d.summary)}</div>

        ${(d.experiences || []).length ? `
          <div class="r-section-title">Experience</div>
          <hr class="r-divider"/>
          ${d.experiences.map(e => `
            <div class="r-exp">
              <div class="r-exp-left">${esc(e.start)}<br/>– ${esc(e.end)}</div>
              <div class="r-exp-right">
                <div class="r-exp-title">${esc(e.title)}</div>
                <div class="r-exp-co">${esc(e.company)}</div>
                <ul class="r-exp-bullets">
                  ${(e.bullets || []).map(b => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </div>`).join('')}` : ''}

        ${(d.educations || []).length ? `
          <div class="r-section-title">Education</div>
          <hr class="r-divider"/>
          ${d.educations.map(e => `
            <div class="r-edu-row">
              <div class="r-edu-left">${esc(e.year)}</div>
              <div>
                <strong>${esc(e.degree)}</strong><br/>
                ${esc(e.institution)}${e.grade ? ' · ' + esc(e.grade) : ''}
              </div>
            </div>`).join('')}` : ''}

        ${(d.skills || []).length ? `
          <div class="r-section-title">Skills & Expertise</div>
          <hr class="r-divider"/>
          <div class="r-skills-row">${d.skills.join(' · ')}</div>` : ''}

        ${d.langs || d.certs ? `
          <div class="r-extra" style="margin-top:.5rem;">
            ${d.langs  ? 'Languages: '      + esc(d.langs)  + '&nbsp;&nbsp;' : ''}
            ${d.certs  ? 'Certifications: ' + esc(d.certs) : ''}
          </div>` : ''}

        ${d.extra ? `
          <div class="r-section-title">Achievements</div>
          <hr class="r-divider"/>
          <div class="r-extra">${esc(d.extra)}</div>` : ''}
      </div>
    </div>`;
}

/* ---- Template 3: Minimal Clean ---- */
function renderMinimal(d) {
  const contacts = [d.email, d.phone, d.city, d.link].filter(Boolean);

  return `
    <div class="tpl-minimal">
      <div class="r-header">
        <div>
          <div class="r-name">${esc(d.name)}</div>
          <div class="r-role">${esc(d.role)}</div>
        </div>
        <div class="r-contacts">${contacts.map(c => `<div>${esc(c)}</div>`).join('')}</div>
      </div>
      <div class="r-body">
        <div class="r-section-title">Summary</div>
        <div class="r-summary">${esc(d.summary)}</div>

        ${(d.experiences || []).length ? `
          <div class="r-section-title">Experience</div>
          ${d.experiences.map(e => `
            <div class="r-exp">
              <div class="r-exp-date">${esc(e.start)}<br/>– ${esc(e.end)}</div>
              <div class="r-exp-right">
                <div class="r-exp-title">${esc(e.title)}</div>
                <div class="r-exp-co">${esc(e.company)}</div>
                <ul class="r-exp-bullets">
                  ${(e.bullets || []).map(b => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </div>`).join('')}` : ''}

        ${(d.educations || []).length ? `
          <div class="r-section-title">Education</div>
          ${d.educations.map(e => `
            <div class="r-edu-row">
              <div class="r-edu-date">${esc(e.year)}</div>
              <div>
                <strong>${esc(e.degree)}</strong>, ${esc(e.institution)}
                ${e.grade ? ' · ' + esc(e.grade) : ''}
              </div>
            </div>`).join('')}` : ''}

        ${(d.skills || []).length ? `
          <div class="r-section-title">Skills</div>
          <div class="r-skills-row">${d.skills.join(' · ')}</div>` : ''}

        ${d.langs || d.certs ? `
          <div class="r-extra" style="margin-top:.4rem;">
            ${d.langs  ? 'Languages: '      + esc(d.langs)  + '&nbsp;&nbsp;' : ''}
            ${d.certs  ? 'Certifications: ' + esc(d.certs) : ''}
          </div>` : ''}

        ${d.extra ? `
          <div class="r-section-title">Achievements</div>
          <div class="r-extra">${esc(d.extra)}</div>` : ''}
      </div>
    </div>`;
}
