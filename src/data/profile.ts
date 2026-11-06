/**
 * Single source of truth for all site content.
 *
 * Anything we don't know yet is wrapped in `ph(...)` (placeholder). In the
 * preview build these render with a dashed "draft" style so they are easy to
 * spot. When Kagisho supplies real details, replace the `ph(...)` call with a
 * plain string.
 */

export type Text = string | { placeholder: string };
export const ph = (placeholder: string): Text => ({ placeholder });
export const isPlaceholder = (t: Text): t is { placeholder: string } =>
  typeof t === 'object' && t !== null && 'placeholder' in t;

/** Month precision dates, written as "YYYY-MM". `null` end = present. */
export type YM = `${number}-${number}`;

export interface Role {
  title: string;
  org: string;
  orgShort?: string;
  type: 'Contract' | 'Full-time' | 'Part-time';
  start: YM;
  end: YM | null;
  location: string;
  mode: 'On-site' | 'Remote' | 'Hybrid';
  summary?: Text;
  tags?: string[];
  highlights?: Text[];
  /** Earlier roles: short line on what it gave her, and skills carried into law. */
  lesson?: string;
  carried?: string[];
}

export interface PathStep {
  label: string;
  detail: string;
  when: Text;
  icon: IconName;
  milestone?: boolean;
}

export interface Exhibit {
  qualification: string;
  institution: string;
  when: string;
  note?: Text;
  icon: IconName;
}

export interface Certificate {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  url: string;
  featured?: boolean;
}

export interface Award {
  name: string;
  issuer: string;
  date: string;
  institution: 'UCT' | 'UL';
  /** Drives the medal design on each card. */
  kind: 'leadership' | 'scholarship' | 'first' | 'top3';
  tag: string;
}

export interface Service {
  org: string;
  cause: string;
  roles: { title: string; when: string }[];
  description?: string;
}

export type IconName =
  | 'scales'
  | 'gavel'
  | 'scroll'
  | 'shield'
  | 'magnifier'
  | 'columns'
  | 'quill'
  | 'megaphone'
  | 'cap'
  | 'briefcase'
  | 'ledger'
  | 'globe'
  | 'seal';

export const profile = {
  name: 'Kagisho Sophy Thobejane',
  firstName: 'Kagisho',
  monogram: 'KST',
  title: 'Admitted Attorney of the High Court of South Africa',
  credentials: ['LLB (UCT)', 'BA (UL)', 'PLT (Gawie le Roux)'],
  currentRole: 'Graduate Trainee · South African Revenue Service',
  location: 'Johannesburg, Gauteng, South Africa',
  linkedin: 'https://www.linkedin.com/in/kagisho-sophy-thobejane-346765137/',
  // Public on LinkedIn, but kept off the preview until she approves.
  email: ph('Email shared once approved'),
  phone: ph('Phone number'),
  languages: ph('Languages spoken'),
  photo: null as string | null, // e.g. '/kagisho.jpg' once supplied

  about: [
    'Admitted Attorney of the High Court of South Africa, currently a Graduate Trainee at the South African Revenue Service, gaining multidisciplinary experience across Operations, Audits, Customs & Excise, Debt Management, Litigation and Dispute Resolution.',
    'Driven by a strong interest in tax law, regulatory compliance and legal risk management, and committed to professional growth and excellence in the legal and public-sector environment.',
  ],

  /** Big scroll-revealed statement (from her About); `highlight` phrases glow scarlet. */
  statement: {
    text: 'Driven by a strong interest in tax law, regulatory compliance and legal risk management.',
    highlight: ['tax law,', 'regulatory compliance', 'legal risk management.'],
  },

  /** Rotating words in the hero: "Focused on …" */
  focusWords: ['Tax law', 'Litigation', 'Compliance', 'Dispute resolution', 'Customs & excise'],

  stats: [
    { value: 5, suffix: '', label: 'Qualifications & courses' },
    { value: 4, suffix: '+', label: 'Years mentoring learners' },
    { value: 400, suffix: '', label: 'Hours of practical legal training' },
    { value: 6, suffix: '', label: 'SARS divisions of rotation' },
  ],

  focus: [
    {
      icon: 'ledger' as IconName,
      title: 'Tax Law & Revenue Administration',
      body: 'Hands-on exposure to SARS operations, audits and debt management.',
    },
    {
      icon: 'globe' as IconName,
      title: 'Customs & Excise',
      body: 'Rotation through the customs and excise environment at SARS.',
    },
    {
      icon: 'gavel' as IconName,
      title: 'Litigation & Dispute Resolution',
      body: 'Civil litigation, Rules of Court applications and tax dispute processes.',
    },
    {
      icon: 'shield' as IconName,
      title: 'Regulatory Compliance & Risk',
      body: 'Governance, risk and compliance, data protection and business ethics.',
    },
    {
      icon: 'magnifier' as IconName,
      title: 'Commercial & Forensic',
      body: 'Commercial forensic investigation and accounting, finance, security and M&A.',
    },
  ],

  path: [
    { label: 'BA Communications & Media', detail: 'University of Limpopo', when: '2017 – 2019', icon: 'megaphone' },
    { label: 'Bachelor of Laws (LLB)', detail: 'University of Cape Town', when: '2020 – 2023', icon: 'cap' },
    { label: 'Practical Vocational Training', detail: 'Gawie le Roux Institute of Law · 400 hours', when: 'May – Aug 2024', icon: 'scroll' },
    { label: 'Candidate Legal Practitioner', detail: 'Sosibo Attorneys Inc.', when: 'Sep 2024 – Jan 2026', icon: 'briefcase' },
    { label: 'LPC Competency Examinations', detail: 'Legal Practice Council', when: ph('Date'), icon: 'quill' },
    { label: 'Admitted Attorney', detail: 'High Court of South Africa', when: ph('Date & division'), icon: 'seal', milestone: true },
    { label: 'Graduate Trainee', detail: 'South African Revenue Service', when: 'Feb 2026 – present', icon: 'columns' },
  ] satisfies PathStep[],

  experience: [
    {
      title: 'Graduate Trainee',
      org: 'South African Revenue Service',
      orgShort: 'SARS',
      type: 'Contract',
      start: '2026-02',
      end: null,
      location: 'Johannesburg, Gauteng',
      mode: 'On-site',
      summary:
        'Rotating through core divisions of the revenue authority, building a grounding in how tax law is administered, enforced and disputed.',
      tags: ['Operations', 'Audits', 'Customs & Excise', 'Debt Management', 'Litigation', 'Dispute Resolution'],
      highlights: [ph('Key achievement or matter worked on'), ph('Key achievement or matter worked on')],
    },
    {
      title: 'Candidate Legal Practitioner',
      org: 'Sosibo Attorneys Inc.',
      type: 'Contract',
      start: '2024-09',
      end: '2026-01',
      location: 'Lonehill, Gauteng',
      mode: 'On-site',
      summary: ph('Short description of articles at Sosibo Attorneys: practice areas, type of matters'),
      tags: ['Civil Litigation', 'Rules of Court', 'Legal Drafting', 'Legal Research'],
      highlights: [ph('Key achievement or matter worked on')],
    },
  ] satisfies Role[],

  earlierExperience: [
    {
      title: 'Customer Support · Company Secretarial Software',
      org: 'InfoDocs',
      type: 'Full-time',
      start: '2024-06',
      end: '2024-08',
      location: 'South Africa',
      mode: 'Remote',
      lesson: 'Helping businesses keep their company-secretarial records in order.',
      carried: ['Client care', 'Corporate compliance', 'Clear explanations'],
    },
    {
      title: 'Service Consultant',
      org: 'Capitec',
      type: 'Full-time',
      start: '2024-03',
      end: '2024-04',
      location: 'Bellville, Western Cape',
      mode: 'On-site',
      lesson: 'Front-line banking: real people, real money, real trust.',
      carried: ['Client service', 'Financial literacy', 'Composure'],
    },
  ] satisfies Role[],

  education: [
    { qualification: 'Bachelor of Laws (LLB)', institution: 'University of Cape Town', when: '2020 – 2023', icon: 'scales' },
    { qualification: 'Practical Vocational Training', institution: 'Gawie le Roux Institute of Law', when: 'May – Aug 2024', note: '400 notional hours', icon: 'scroll' },
    { qualification: 'Commercial Forensic Investigations', institution: 'North-West University', when: 'Mar – Oct 2025', note: ph('Short course / certificate?'), icon: 'magnifier' },
    { qualification: 'Commercial Forensic Accounting', institution: 'North-West University', when: 'Apr – Oct 2025', note: ph('Short course / certificate?'), icon: 'ledger' },
    { qualification: 'BA (Communications and Media)', institution: 'University of Limpopo', when: '2017 – 2019', icon: 'megaphone' },
  ] satisfies Exhibit[],

  certificates: [
    {
      name: 'Cybersecurity Foundations: Governance, Risk & Compliance',
      issuer: 'LinkedIn Learning',
      issued: 'Feb 2025',
      url: 'https://www.linkedin.com/learning/certificates/79f397940d5e3a042e0e6c24dc9d7b1cfcd3afed2c2475e2d206f7d642dfc95a',
      featured: true,
    },
    {
      name: 'Law Virtual Experience Programme',
      issuer: 'Bowmans (South Africa)',
      issued: 'Jul 2022',
      credentialId: 'L8xsPWvTEaCCTpHPm',
      url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Bowmans/SFhf3yc28Dh6pNoJx_Bowmans%20South%20Africa_uHin2yJAQPK8Qqoxr_1657912704288_completion_certificate.pdf',
      featured: true,
    },
    {
      name: 'Law Virtual Experience Programme',
      issuer: 'Baker McKenzie (Australia)',
      issued: 'Jul 2022',
      credentialId: 'biGZGheXonavSs9qb',
      url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Baker%20McKenzie/zN8WBhibnLpqivfMi_Baker%20McKenzie%20Australia_uHin2yJAQPK8Qqoxr_1657878092836_completion_certificate.pdf',
      featured: true,
    },
    { name: 'GDPR Compliance: Essential Training', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/72cdd0fecfb2867fbb973f223db424410b908eba7dfae81a0f76df94cbbc6b34' },
    { name: 'Business Ethics', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/9cfb1a64ceb189128c70a6fe03fae218f16c5b7a60f678be734571e4be8e55cf' },
    { name: 'Leadership Foundations', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/ca17bff64bbfcc5c2b241fbd01b7ce728359a7c0bebd00325ce4ea7978f56379' },
    { name: 'Interpersonal Communication', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/e487a0b82599341dae3191089a4d1f18cfbeeeb0acf65748b7a0db1fd87f850f' },
    { name: 'Time Management Tips: Teamwork', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/12586946171e69efa9f6806ca1893f179140f8038bf9380a77a79a2de13b98e2' },
    { name: 'Podcasting: Business and Law', issuer: 'LinkedIn Learning', issued: 'Jun 2022', url: 'https://www.linkedin.com/learning/certificates/7f98644a233e7c16d0183a652447bb7a06389b9524c048c01c43e0d08ceb7a62' },
  ] satisfies Certificate[],

  skills: [
    { group: 'Legal Practice', icon: 'gavel' as IconName, items: ['Legal Research', 'Legal Drafting', 'Document Drafting', 'Litigation', 'Civil Litigation', 'Rules of Court Applications'] },
    { group: 'Commercial & Finance', icon: 'ledger' as IconName, items: ['Mergers & Acquisitions', 'Competition Law', 'Lender / Banker Security', 'Loan Facilities', 'Finance', 'Market Analysis', 'Labour & Employment Law'] },
    { group: 'Compliance & Governance', icon: 'shield' as IconName, items: ['Legal Compliance', 'GDPR', 'Governance, Risk & Compliance', 'Cybersecurity', 'Business Ethics'] },
    { group: 'Professional', icon: 'quill' as IconName, items: ['Critical Thinking', 'Written Communication', 'Oral Communication', 'Interpersonal Communication', 'Leadership', 'Teamwork', 'Time Management'] },
    { group: 'Supporting', icon: 'megaphone' as IconName, items: ['Customer Service', 'Sales', 'Marketing', 'Data Management', 'Podcasting'] },
  ],

  awards: [
    { name: 'UCT Plus Community Service Leadership Award', issuer: 'UCT Careers Service', date: 'Feb 2023', institution: 'UCT', kind: 'leadership', tag: 'Leadership' },
    { name: 'Law Faculty Entrance Scholarship', issuer: 'UCT Faculty of Law', date: 'Jan 2020', institution: 'UCT', kind: 'scholarship', tag: 'Scholarship' },
    { name: 'Position 1 Merit Award: Organisational Communications', issuer: 'School of Languages & Communication Studies', date: 'Jul 2019', institution: 'UL', kind: 'first', tag: 'Top of class' },
    { name: 'Position 1 Merit Award: Persuasive Communications', issuer: 'School of Languages & Communication Studies', date: 'Jul 2019', institution: 'UL', kind: 'first', tag: 'Top of class' },
    { name: 'Position 1 Merit Award: Health Communications', issuer: 'Department of Media & Communications', date: 'Jun 2019', institution: 'UL', kind: 'first', tag: 'Top of class' },
    { name: 'Top 3 Merit Award: Communication Skills & Context', issuer: 'Department of Media & Communications', date: 'Jun 2018', institution: 'UL', kind: 'top3', tag: 'Top 3' },
  ] satisfies Award[],

  service: [
    {
      org: 'WeCan Foundation',
      cause: 'Education',
      roles: [
        { title: 'Mentor', when: 'Feb 2021 – Feb 2025' },
        { title: 'PR & Media Coordinator', when: 'Oct 2022 – Jul 2023' },
      ],
      description:
        'Equipping learners from high schools in disadvantaged areas with information about tertiary life: career guidance and support with Matric learners’ university applications.',
    },
    {
      org: 'UCT Students for Law and Social Justice',
      cause: 'Human Rights',
      roles: [
        { title: 'Transformation Sub-Committee', when: 'Feb – Nov 2022' },
        { title: 'Mentor · EMPOWER Mentorship', when: 'Mar – Dec 2022' },
      ],
    },
    { org: 'SHAWCO', cause: 'Human Rights', roles: [{ title: 'Community Service Volunteer', when: 'Mar – Dec 2022' }] },
    { org: 'Kwanele South Africa', cause: 'Human Rights', roles: [{ title: 'Events Planner', when: 'Nov – Dec 2022' }] },
    { org: 'UCT Office of Inclusivity and Change', cause: 'Civil Rights & Social Action', roles: [{ title: 'Transgriep Leadership Programme', when: 'Jun – Jul 2022' }] },
    { org: 'Enactus', cause: 'Economic Empowerment', roles: [{ title: 'Marketing Officer', when: 'Mar – Oct 2018' }] },
  ] satisfies Service[],
};

/** Human-readable duration, e.g. "1 yr 5 mos" (LinkedIn style, inclusive of both months). */
export function duration(start: YM, end: YM | null, now = new Date()): string {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatYM(ym: YM | null): string {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
