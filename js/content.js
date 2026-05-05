/* =============================================
   js/content.js — Universal Smart Content
   Works for ALL fields: IT, Commerce, Arts,
   Science, Management, 12th pass, etc.
   ============================================= */

/* ---- Field Definitions ---- */
const FIELDS = {
  it: {
    label: '💻 IT / Software',
    roles: ['Software Developer', 'Web Developer', 'QA Engineer', 'Data Analyst', 'UI/UX Designer', 'Network Engineer'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'React', 'SQL', 'Git', 'Manual Testing', 'JIRA'],
    summaryKey: 'it'
  },
  commerce: {
    label: '📊 Commerce / Accounts',
    roles: ['Accountant', 'Finance Executive', 'Tally Operator', 'Tax Consultant', 'Audit Assistant', 'Banking Executive'],
    skills: ['Tally ERP', 'MS Excel', 'GST Filing', 'Accounting', 'Taxation', 'Financial Reporting', 'Busy Software', 'Payroll'],
    summaryKey: 'commerce'
  },
  management: {
    label: '📈 BBA / MBA / Management',
    roles: ['Marketing Executive', 'Sales Manager', 'HR Executive', 'Business Analyst', 'Operations Manager', 'Brand Manager'],
    skills: ['MS Office', 'CRM Tools', 'Digital Marketing', 'Team Management', 'Communication', 'Leadership', 'Data Analysis'],
    summaryKey: 'management'
  },
  arts: {
    label: '🎨 Arts / Humanities / BA',
    roles: ['Content Writer', 'Graphic Designer', 'Teacher', 'Social Worker', 'Journalist', 'Copywriter', 'PR Executive'],
    skills: ['Content Writing', 'MS Word', 'Communication', 'Research', 'Adobe Photoshop', 'Social Media', 'Canva'],
    summaryKey: 'arts'
  },
  science: {
    label: '🔬 Science / BSc',
    roles: ['Lab Technician', 'Research Assistant', 'Quality Analyst', 'Science Teacher', 'Data Scientist', 'Pharmacist'],
    skills: ['Data Analysis', 'MS Excel', 'Research', 'Lab Techniques', 'SPSS', 'Python', 'Report Writing'],
    summaryKey: 'science'
  },
  medical: {
    label: '🏥 Medical / Nursing / Pharma',
    roles: ['Staff Nurse', 'Medical Representative', 'Pharmacist', 'Lab Technician', 'Healthcare Assistant', 'Dental Assistant'],
    skills: ['Patient Care', 'Medical Terminology', 'First Aid', 'EMR Software', 'Drug Administration', 'Vital Signs Monitoring'],
    summaryKey: 'medical'
  },
  law: {
    label: '⚖️ Law / LLB',
    roles: ['Junior Advocate', 'Legal Assistant', 'Paralegal', 'Legal Researcher', 'Compliance Officer', 'Legal Advisor'],
    skills: ['Legal Research', 'Case Filing', 'Contract Drafting', 'MS Word', 'Communication', 'Legal Documentation'],
    summaryKey: 'law'
  },
  teaching: {
    label: '📚 Teaching / Education / BEd',
    roles: ['School Teacher', 'Tutor', 'Online Educator', 'Training Coordinator', 'Education Counsellor', 'Academic Coordinator'],
    skills: ['Curriculum Planning', 'MS PowerPoint', 'Classroom Management', 'Communication', 'E-learning Tools', 'Content Development'],
    summaryKey: 'teaching'
  },
  fresher12: {
    label: '🎓 12th Pass / Any Graduate',
    roles: ['Data Entry Operator', 'Customer Support Executive', 'Sales Executive', 'Office Assistant', 'Receptionist', 'Telecaller'],
    skills: ['MS Office', 'Data Entry', 'Communication', 'Typing', 'MS Excel', 'Internet Browsing', 'Customer Service'],
    summaryKey: 'fresher12'
  },
  other: {
    label: '🌟 Other / Custom',
    roles: [],
    skills: [],
    summaryKey: 'other'
  }
};

/* ---- Summary Templates per Field ---- */
const SUMMARIES = {
  it: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Enthusiastic and detail-oriented ${role} fresher with a strong foundation in computer science and programming concepts. ${s?'Proficient in '+s+', eager to apply these skills in a professional environment.':''} Quick learner with strong analytical thinking, problem-solving abilities, and a passion for building innovative solutions. Committed to delivering quality results and growing within a dynamic tech team.`;
    return `Results-driven ${role} professional with ${yr === '1' ? '1 year' : yr + ' years'} of hands-on experience developing and delivering high-quality software solutions. ${s?'Skilled in '+s+' with a track record of successful project delivery.':''} Strong problem-solver known for clean code, collaborative teamwork, and continuous learning. Committed to driving technical excellence and contributing meaningfully to organisational goals.`;
  },
  commerce: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Detail-oriented and motivated ${role} fresher with a strong academic background in commerce and finance. ${s?'Knowledgeable in '+s+' with a keen interest in applying financial concepts professionally.':''} Strong analytical mindset with excellent numerical ability and attention to detail. Eager to contribute to a reputed organisation and build a successful career in finance and accounting.`;
    return `Experienced ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of professional experience in accounting, finance, and compliance. ${s?'Proficient in '+s+', consistently ensuring accuracy and regulatory compliance.':''} Known for meticulous record-keeping, strong analytical skills, and ability to meet financial deadlines. Committed to maintaining the highest standards of financial integrity.`;
  },
  management: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Ambitious and proactive ${role} fresher with strong business acumen and leadership potential. ${s?'Familiar with '+s+' and eager to apply management principles in a real-world setting.':''} Excellent communicator with strong interpersonal skills and the ability to work effectively in team environments. Ready to contribute fresh ideas and drive business growth from day one.`;
    return `Dynamic ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of experience driving business growth and managing cross-functional teams. ${s?'Skilled in '+s+', with a proven track record of achieving targets and improving processes.':''} Strategic thinker with excellent leadership, communication, and analytical capabilities. Passionate about creating value and delivering sustainable results for the organisation.`;
  },
  arts: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Creative and passionate ${role} fresher with strong communication and analytical skills developed through humanities education. ${s?'Proficient in '+s+' with a genuine interest in creative and content-driven work.':''} Detail-oriented with strong research abilities and a flair for storytelling. Enthusiastic about contributing creative perspectives and growing within a collaborative environment.`;
    return `Creative and driven ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of experience producing compelling content and impactful communication. ${s?'Expert in '+s+', consistently delivering work that engages audiences and meets objectives.':''} Known for original thinking, meticulous research, and ability to meet tight deadlines. Committed to excellence in every creative endeavour.`;
  },
  science: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Analytical and methodical ${role} fresher with a solid science background and strong research aptitude. ${s?'Familiar with '+s+' and keen to apply scientific knowledge in a professional setting.':''} Detail-oriented with excellent problem-solving capabilities and a systematic approach to challenges. Eager to contribute to meaningful research and scientific projects.`;
    return `Experienced ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of hands-on research and analytical experience. ${s?'Proficient in '+s+', with a strong record of accurate data collection and analysis.':''} Methodical, precise, and committed to scientific rigour. Proven ability to work independently and as part of interdisciplinary research teams.`;
  },
  medical: (name, role, yr, skills) => {
    if (yr === 'fresher') return `Compassionate and dedicated ${role} fresher with strong clinical knowledge and a genuine passion for patient care. Trained in essential healthcare procedures and committed to upholding the highest standards of medical ethics and patient safety. A quick learner who thrives in fast-paced clinical environments and is ready to contribute meaningfully to a healthcare team from day one.`;
    return `Dedicated ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of clinical experience providing high-quality patient care. Known for strong diagnostic support skills, excellent patient communication, and adherence to medical protocols. Committed to continuous professional development and delivering compassionate, evidence-based healthcare outcomes.`;
  },
  law: (name, role, yr, skills) => {
    if (yr === 'fresher') return `Diligent and analytical ${role} fresher with comprehensive knowledge of Indian legal system and procedures. Strong research capabilities with excellent drafting and communication skills developed through rigorous academic training. Committed to upholding justice, maintaining ethical standards, and building a strong legal career through dedication and continuous learning.`;
    return `Competent ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of legal experience handling diverse cases and legal documentation. Skilled in legal research, case preparation, and client communication. Known for thorough legal analysis, attention to procedural detail, and commitment to achieving favourable outcomes for clients.`;
  },
  teaching: (name, role, yr, skills) => {
    if (yr === 'fresher') return `Enthusiastic and student-focused ${role} fresher with a passion for education and knowledge-sharing. Strong communication skills with the ability to explain complex concepts in simple, engaging ways. Committed to creating inclusive learning environments that inspire curiosity and foster academic growth in every student.`;
    return `Dedicated ${role} with ${yr === '1' ? '1 year' : yr + ' years'} of teaching experience delivering engaging and effective instruction. Known for creating dynamic lesson plans, fostering student participation, and achieving strong academic results. Committed to continuous professional development and making a positive lasting impact on every student.`;
  },
  fresher12: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    return `Enthusiastic and hardworking ${role} candidate with a positive attitude and a strong willingness to learn. ${s?'Familiar with '+s+' and ready to apply these skills in a professional role.':''} Excellent communication skills with a reliable, punctual, and team-oriented work ethic. Eager to gain hands-on experience, grow professionally, and contribute to a supportive and dynamic workplace.`;
  },
  other: (name, role, yr, skills) => {
    const s = skills.slice(0,3).join(', ');
    if (yr === 'fresher') return `Motivated and enthusiastic ${role} fresher with a strong academic foundation and a passion for professional growth. ${s?'Equipped with skills in '+s+' and ready to make a meaningful contribution from day one.':''} Quick learner with excellent communication, teamwork, and problem-solving abilities. Fully committed to delivering quality work and building a successful career.`;
    return `Dedicated ${role} professional with ${yr === '1' ? '1 year' : yr + ' years'} of relevant experience. ${s?'Skilled in '+s+' with a consistent track record of quality delivery.':''} Known for strong work ethic, adaptability, and collaborative approach. Committed to continuous learning and contributing positively to every team and project.`;
  }
};

const ACTION_VERBS = [
  'Developed','Led','Managed','Designed','Implemented','Improved',
  'Delivered','Built','Coordinated','Analyzed','Executed','Maintained',
  'Supported','Collaborated','Increased','Reduced','Handled','Created',
  'Prepared','Streamlined','Assisted','Monitored','Reviewed','Resolved'
];

function titleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function generateSummary(d) {
  const field = d.field || 'other';
  const yr    = d.expYears || 'fresher';
  const fn    = FIELDS[field] || FIELDS.other;
  const gen   = SUMMARIES[fn.summaryKey] || SUMMARIES.other;
  return gen(d.name.split(' ')[0], titleCase(d.role), yr, d.skills || []);
}

function generateBullets(desc, jobTitle, field) {
  const role = titleCase(jobTitle || 'professional');

  /* Field-specific fallback bullets */
  const fallbacks = {
    it:         [`Executed ${role} tasks with precision and adherence to best practices`, 'Collaborated with team members to deliver features on schedule', 'Identified and resolved technical issues, improving system reliability', 'Maintained documentation to support knowledge sharing and code quality'],
    commerce:   [`Maintained accurate financial records and ensured timely reporting`, 'Assisted in preparation of balance sheets, profit & loss statements', 'Ensured GST and tax compliance, reducing discrepancies by thorough reconciliation', 'Collaborated with auditors and senior accountants to meet deadlines'],
    management: [`Contributed to achieving monthly sales and revenue targets`, 'Coordinated with cross-functional teams to ensure smooth operations', 'Analysed market trends and prepared detailed reports for management', 'Maintained strong client relationships, improving customer satisfaction'],
    arts:       [`Created engaging content for multiple platforms and target audiences`, 'Conducted in-depth research to produce accurate and compelling material', 'Collaborated with design and editorial teams to meet publication deadlines', 'Maintained consistent brand voice and communication standards'],
    science:    [`Conducted laboratory experiments following standard protocols`, 'Collected, analysed, and interpreted data with precision and accuracy', 'Prepared detailed research reports and presented findings to supervisors', 'Maintained lab equipment and ensured compliance with safety standards'],
    medical:    [`Provided compassionate patient care and monitored vital signs regularly`, 'Administered medications and treatments as directed by senior medical staff', 'Maintained accurate patient records and updated medical charts', 'Collaborated with the healthcare team to ensure optimal patient outcomes'],
    law:        [`Conducted thorough legal research and prepared case summaries`, 'Drafted legal documents including petitions, agreements, and notices', 'Assisted senior advocates in court proceedings and client consultations', 'Maintained organized case files and ensured timely submission of documents'],
    teaching:   [`Delivered engaging and well-structured lessons tailored to student needs`, 'Assessed student progress through regular tests and provided constructive feedback', 'Prepared comprehensive lesson plans aligned with curriculum objectives', 'Maintained a positive and inclusive classroom environment'],
    fresher12:  [`Performed assigned responsibilities accurately and with high attention to detail`, 'Assisted team members to ensure smooth day-to-day operations', 'Maintained organised records and files for easy retrieval', 'Demonstrated punctuality, reliability, and a proactive work attitude'],
    other:      [`Executed assigned responsibilities with high accuracy and consistency`, 'Collaborated with team members to achieve project milestones on time', 'Identified process gaps and contributed to operational improvements', 'Maintained comprehensive documentation to support quality standards']
  };

  const fb = fallbacks[field] || fallbacks.other;
  if (!desc || desc.trim().length < 5) return fb;

  let parts = desc.split(/[,\n।|;]+/).map(s => s.trim()).filter(s => s.length > 3);

  /* Hinglish → English */
  parts = parts.map(line =>
    line
      .replace(/\bkiya\b|\bkiya tha\b|\bkarte the\b/gi, '')
      .replace(/\bbanaya\b|\bbanayi\b/gi, 'built')
      .replace(/\bkaam kiya\b/gi, 'worked on')
      .replace(/\bmanage kiya\b/gi, 'managed')
      .replace(/\bhandle kiya\b/gi, 'handled')
      .replace(/\bpadaya\b/gi, 'taught')
      .replace(/\blikhaa\b|\blikhi\b/gi, 'wrote')
      .replace(/\bcheck kiya\b/gi, 'reviewed')
      .replace(/\bsikha\b|\bsikhi\b/gi, 'learned and applied')
      .replace(/\bhelp kiya\b/gi, 'assisted')
      .replace(/\bentry kiya\b/gi, 'entered data for')
      .trim()
  );

  const bullets = parts.slice(0, 4).map((line, i) => {
    if (/^[A-Z][a-z]+(ed|ing|ized|ised|ped|red)\s/.test(line)) return line;
    const verb  = ACTION_VERBS[i % ACTION_VERBS.length];
    const clean = line.charAt(0).toLowerCase() + line.slice(1);
    return `${verb} ${clean}`;
  });

  while (bullets.length < 4) bullets.push(fb[bullets.length] || fb[fb.length-1]);
  return bullets;
}

function generateProjectBullets(desc, field) {
  const fallbacks = [
    'Designed and developed core modules with structured and maintainable approach',
    'Performed thorough testing and resolved all identified issues before delivery',
    'Created comprehensive documentation and reports for the project',
    'Successfully delivered the project within the planned timeline'
  ];
  if (!desc || desc.trim().length < 5) return fallbacks.slice(0,3);

  let parts = desc.split(/[,\n।|;]+/).map(s => s.trim()).filter(s => s.length > 3);
  const verbs = ['Designed','Built','Developed','Tested','Implemented','Created','Delivered','Prepared'];

  const bullets = parts.slice(0, 4).map((line, i) => {
    if (/^[A-Z][a-z]+(ed|ing)\s/.test(line)) return line;
    const clean = line.charAt(0).toLowerCase() + line.slice(1);
    return `${verbs[i % verbs.length]} ${clean}`;
  });

  while (bullets.length < 3) bullets.push(fallbacks[bullets.length]);
  return bullets;
}