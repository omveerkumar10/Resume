/* =============================================
   js/content.js
   Smart content generator — bina API ke
   professional sentences banata hai
   ============================================= */

const ACTION_VERBS = [
  'Developed','Led','Managed','Designed','Implemented',
  'Improved','Delivered','Built','Coordinated','Analyzed',
  'Optimized','Streamlined','Created','Executed','Maintained',
  'Supported','Collaborated','Increased','Reduced','Handled'
];

/* Summary generator */
function generateSummary(d) {
  const yr       = d.expYears;
  const isFresh  = (yr === 'fresher' || yr === '0');
  const firstName = d.name.split(' ')[0];
  const role     = d.role;
  const topSkills = (d.skills || []).slice(0, 3).join(', ');
  const skillLine = topSkills ? `Proficient in ${topSkills}, with a passion for delivering quality work.` : '';

  if (isFresh) {
    return `${firstName} is a motivated and enthusiastic fresher seeking a ${role} position. `
         + `With a strong academic background and eagerness to learn, ${firstName} is ready to contribute effectively to a dynamic team. `
         + `${skillLine} `
         + `A quick learner with excellent communication skills and a strong work ethic, committed to delivering results from day one.`;
  }

  const yrLabel = yr === '1'  ? '1 year'
                : yr === '10' ? 'over 10 years'
                :               yr + ' years';

  return `Results-driven ${role} with ${yrLabel} of professional experience delivering high-quality solutions. `
       + `${skillLine} `
       + `Proven ability to work effectively in cross-functional teams, manage multiple priorities, and meet deadlines consistently. `
       + `Committed to continuous improvement and driving business value through innovation and technical excellence.`;
}

/* Bullet point generator from raw description */
function generateBullets(desc, jobTitle) {
  if (!desc || desc.trim().length < 5) {
    return [
      `Performed key ${jobTitle} responsibilities to a high standard`,
      `Collaborated with team members to achieve project objectives`,
      `Maintained quality standards and contributed to process improvements`
    ];
  }

  /* Split on commas, new lines, semicolons, danda (।), pipe */
  const parts = desc
    .split(/[,\n।|;]+/)
    .map(s => s.trim())
    .filter(s => s.length > 3)
    .slice(0, 4);

  return parts.map((line, i) => {
    /* Already starts with capital + past-tense verb → keep */
    if (/^[A-Z][a-z]+(ed|ing|ized|ised)\s/.test(line)) return capitalise(line);

    /* Hinglish → English replacements */
    let clean = line
      .replace(/\bkiya\b|\bkiya tha\b|\bkarte the\b|\bkarna tha\b/gi, '')
      .replace(/\bbanaya\b|\bbanayi\b/gi, 'built')
      .replace(/\bkaam kiya\b/gi, 'worked on')
      .replace(/\bmanage kiya\b/gi, 'managed')
      .replace(/\bhandle kiya\b/gi, 'handled')
      .replace(/\bteam lead\b/gi, 'led the team for')
      .replace(/\bsikha\b|\bsikhi\b/gi, 'learned')
      .replace(/\breport kiya\b/gi, 'reported')
      .replace(/\bcheck kiya\b/gi, 'reviewed')
      .replace(/\bsupport kiya\b/gi, 'supported')
      .replace(/\bdesign kiya\b/gi, 'designed')
      .replace(/\btest kiya\b/gi, 'tested')
      .replace(/\bdeploy kiya\b/gi, 'deployed')
      .trim();

    /* Add action verb prefix */
    const verb = ACTION_VERBS[i % ACTION_VERBS.length];
    clean = clean.charAt(0).toLowerCase() + clean.slice(1);
    return `${verb} ${clean}`;
  });
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
