/*
  Beyond the Bar — site content.
  Every statement here comes from BTB's own files:
  the BTB Profile (PDF/Word), the Mission & Vision document (profile version chosen),
  the brand guide and the Webinar Two session report.
  Edit this file to change wording anywhere on the site.
*/

export const site = {
  name: 'Beyond the Bar',
  short: 'BTB',
  tagline: 'Re-thinking Legal Practice',
  email: 'beyondthebar.a@gmail.com',
  linkedinLabel: 'Beyond the Bar (BTB)',
  linkedinUrl: 'https://www.linkedin.com/search/results/all/?keywords=Beyond%20the%20Bar%20(BTB)',
  regions: 'Uganda · Rwanda · East Africa',
  offices: [
    {
      country: 'Uganda',
      code: 'ug' as const,
      phones: [
        { display: '+256 393 102 634', tel: '+256393102634' },
        { display: '+256 779 343 269', tel: '+256779343269' },
      ],
    },
    {
      country: 'Rwanda',
      code: 'rw' as const,
      phones: [{ display: '+250 795 425 872', tel: '+250795425872' }],
    },
  ],
  founders: [
    { name: 'Cavenbridge Advocates', country: 'Uganda', code: 'ug' as const, logo: 'img/partners/cavenbridge-advocates.png' },
    { name: 'Trust Law Chambers', country: 'Rwanda', code: 'rw' as const, logo: 'img/partners/trust-law-chambers.png' },
  ],
  sessionPartners: [
    { name: 'East Africa Law Society', logo: 'img/partners/east-africa-law-society.webp' },
    { name: 'EALS Institute', logo: 'img/partners/eals-institute.webp' },
  ],
}

export const about = {
  whoWeAre: [
    'Beyond the Bar (BTB) is a regional legal, business, and professional development platform established to bridge the gap between legal practice, business innovation, leadership, and regional integration.',
    'Founded through a strategic partnership between Cavenbridge Advocates (Uganda) and Trust Law Chambers (Rwanda), BTB serves as an independent platform dedicated to fostering cross-border collaboration, knowledge exchange, professional growth, and business development within the East African region and beyond.',
    'BTB brings together legal practitioners, corporate executives, entrepreneurs, policymakers, academics, development partners, and emerging professionals to engage in meaningful conversations, capacity-building initiatives, networking opportunities, and collaborative projects that contribute to regional growth and transformation.',
  ],
  mission:
    'To empower professionals and institutions with the knowledge, networks, and opportunities needed to thrive in an increasingly interconnected and dynamic global environment.',
  vision: 'To become the leading regional platform for legal innovation, professional excellence, and cross-border collaboration in Africa.',
  audiences: [
    'Legal practitioners',
    'Corporate executives',
    'Entrepreneurs',
    'Policymakers',
    'Academics',
    'Development partners',
    'Emerging professionals',
  ],
  background: [
    'Beyond the Bar was conceived from a shared vision between Cavenbridge Advocates and Trust Law Chambers to strengthen regional cooperation and create a platform that extends beyond traditional legal practice.',
    'The founders recognized the growing need for seamless cross-border legal support, enhanced professional development opportunities, and stronger connections between legal professionals and the business community. As businesses increasingly expand across borders and regulatory environments become more complex, there is a growing demand for trusted advisors who understand both the legal and commercial realities of regional markets.',
  ],
  establishedTo: [
    { text: 'Expand regional visibility and market reach.', icon: 'Radar' },
    { text: 'Facilitate seamless cross-border legal and business support.', icon: 'ArrowLeftRight' },
    { text: 'Promote knowledge-sharing and professional development.', icon: 'BookOpen' },
    { text: 'Increase networking, referral, and business opportunities.', icon: 'Network' },
    { text: 'Foster legal innovation, research, and thought leadership.', icon: 'Lightbulb' },
    { text: 'Position its members and partners as trusted advisors within regional and international markets.', icon: 'ShieldCheck' },
  ],
  today:
    'Today, BTB serves as a platform where ideas are exchanged, partnerships are formed, and professionals are equipped to navigate emerging opportunities and challenges across the region.',
}

export type Visual =
  | { kind: 'cutout'; src: string; className: string; alt: string }
  | { kind: 'pair'; srcs: [string, string]; alt: string }
  | { kind: 'photo'; src: string; alt: string }
  | { kind: 'svg'; src: string; alt: string }

export type Programme = {
  slug: string
  number: string
  title: string
  short: string
  lede: string
  intro: string[]
  listLabel: string
  unit: string
  items: { text: string; icon: string }[]
  closing: string
  facts: { value: string; label: string }[]
  visual: Visual
  note?: string
}

export const programmes: Programme[] = [
  {
    slug: 'webinar-series',
    unit: 'key themes',
    number: '01',
    title: 'BTB Webinar and Talk Show Series',
    short: 'Webinar & Talk Show Series',
    lede: 'Monthly conversations with leading experts on where law, business and technology are heading.',
    intro: [
      'BTB hosts monthly webinars, panel discussions, podcasts, and thought-leadership conversations featuring leading experts from law, business, technology, governance, finance, and development sectors.',
      'These engagements provide participants with practical insights on emerging trends, regulatory developments, and regional opportunities while promoting continuous learning and professional networking.',
    ],
    listLabel: 'Key themes include',
    items: [
      { text: 'Emerging legal and regulatory developments', icon: 'Scale' },
      { text: 'Regional trade and investment', icon: 'Globe' },
      { text: 'Technology and innovation', icon: 'Cpu' },
      { text: 'Corporate governance', icon: 'Building2' },
      { text: 'Environmental, Social and Governance (ESG) compliance', icon: 'Leaf' },
      { text: 'Dispute resolution', icon: 'Gavel' },
      { text: 'Digital transformation and artificial intelligence', icon: 'BrainCircuit' },
      { text: 'Entrepreneurship and business growth', icon: 'TrendingUp' },
    ],
    closing:
      'The series provides a platform for meaningful conversations on emerging legal trends, evolving practice areas, technology driven disruption, regional integration, and the future of legal service delivery in Africa and beyond. Through this initiative, both firms aim to educate, engage, and build visibility while fostering stronger professional networks across the region.',
    facts: [
      { value: 'Monthly', label: 'Webinars, panels and podcasts' },
      { value: '8', label: 'Key themes' },
      { value: '109', label: 'Attendees at Webinar Two' },
      { value: '3', label: 'Countries on the Webinar Two panel' },
    ],
    visual: {
      kind: 'cutout',
      src: 'img/programmes/webinar-studio.webp',
      className: 'w-full mb-[7%]',
      alt: 'Two armchairs with studio microphones set for a talk show',
    },
  },
  {
    slug: 'executive-training',
    unit: 'training areas',
    number: '02',
    title: 'Executive Training & Professional Development',
    short: 'Executive Training',
    lede: 'Specialised programmes that give professionals practical skills for changing industries and legal landscapes.',
    intro: [
      'BTB delivers executive education and specialized training programmes designed to equip professionals with practical skills relevant to evolving industries and legal landscapes.',
    ],
    listLabel: 'Training areas include',
    items: [
      { text: 'Artificial Intelligence and the Law', icon: 'BrainCircuit' },
      { text: 'Data Protection and Privacy', icon: 'ShieldCheck' },
      { text: 'Intellectual Property', icon: 'Lightbulb' },
      { text: 'Corporate Governance', icon: 'Building2' },
      { text: 'Compliance and Risk Management', icon: 'ClipboardCheck' },
      { text: 'Environmental and Climate Law', icon: 'Leaf' },
      { text: 'International Trade and Investment', icon: 'Globe' },
      { text: 'Alternative Dispute Resolution', icon: 'Handshake' },
      { text: 'Leadership and Strategic Management', icon: 'Compass' },
    ],
    closing: 'Participants receive practical exposure from industry experts, practitioners, regulators, and academics.',
    facts: [
      { value: '9', label: 'Training areas' },
      { value: '4', label: 'Kinds of faculty: experts, practitioners, regulators, academics' },
    ],
    visual: { kind: 'svg', src: 'img/exec-silhouette.svg', alt: 'A speaker addressing an audience' },
  },
  {
    slug: 'conferences',
    unit: 'opportunities',
    number: '03',
    title: 'Conferences, Summits and Business Forums',
    short: 'Conferences & Business Forums',
    lede: 'High-level forums that bring decision-makers together across sectors and jurisdictions.',
    intro: ['BTB convenes high-level conferences and business forums that bring together decision-makers from across sectors and jurisdictions.'],
    listLabel: 'These forums create opportunities for',
    items: [
      { text: 'Regional networking', icon: 'Network' },
      { text: 'Business-to-business engagement', icon: 'Briefcase' },
      { text: 'Investment promotion', icon: 'Landmark' },
      { text: 'Policy dialogue', icon: 'MessagesSquare' },
      { text: 'Professional collaboration', icon: 'Users' },
      { text: 'Market expansion opportunities', icon: 'Map' },
    ],
    closing: 'Periodical flagship events will focus on legal innovation, regional integration, business growth, and emerging economic trends.',
    facts: [
      { value: '6', label: 'Kinds of opportunity' },
      { value: '4', label: 'Flagship focus areas' },
    ],
    visual: {
      kind: 'cutout',
      src: 'img/programmes/conference-stage.webp',
      className: 'h-[64%] w-auto max-w-none',
      alt: 'A conference hall with the Beyond the Bar logo on the stage screen',
    },
  },
  {
    slug: 'community-impact',
    unit: 'focus areas',
    number: '04',
    title: 'Corporate Social Responsibility (CSR) and Community Impact',
    short: 'CSR & Community Impact',
    lede: 'Community-driven initiatives for legal awareness, access to justice and responsible leadership.',
    intro: ['BTB is committed to creating positive social impact through community-driven initiatives.'],
    listLabel: 'The CSR programme focuses on',
    items: [
      { text: 'Legal awareness and public education', icon: 'Megaphone' },
      { text: 'Youth mentorship and empowerment', icon: 'Sprout' },
      { text: 'Access to justice initiatives', icon: 'Scale' },
      { text: 'Community legal clinics', icon: 'MapPin' },
      { text: 'Support for vulnerable groups', icon: 'HeartHandshake' },
      { text: 'Environmental sustainability campaigns', icon: 'Leaf' },
      { text: 'Entrepreneurship support programmes', icon: 'Rocket' },
      { text: 'Leadership trainings', icon: 'Award' },
    ],
    closing: 'Through these initiatives, BTB seeks to promote responsible leadership and sustainable development across the region.',
    facts: [
      { value: '8', label: 'Focus areas' },
      { value: 'Region-wide', label: 'Responsible leadership and sustainable development' },
    ],
    visual: {
      kind: 'cutout',
      src: 'img/programmes/csr-handshake.webp',
      className: 'w-[94%] mb-[12%]',
      alt: 'Two professionals shaking hands, seen from above',
    },
  },
  {
    slug: 'research-hub',
    unit: 'functions',
    number: '05',
    title: 'Legal Innovation and Research Hub',
    short: 'Innovation & Research Hub',
    lede: 'Research, publications and policy analysis on the legal and business questions that matter now.',
    intro: ['BTB promotes legal innovation through research, publications, policy analysis, and collaborative projects.'],
    listLabel: 'Functions of the Hub',
    items: [
      { text: 'Conducts research on emerging legal and business issues', icon: 'Search' },
      { text: 'Publishes policy briefs and industry reports', icon: 'FileText' },
      { text: 'Develops practical toolkits and guides', icon: 'Wrench' },
      { text: 'Facilitates collaboration between practitioners and academia', icon: 'GraduationCap' },
      { text: 'Supports innovation in legal service delivery', icon: 'Sparkles' },
    ],
    closing: 'This programme positions BTB as a thought leader and trusted source of knowledge in the region.',
    facts: [
      { value: '5', label: 'Functions of the Hub' },
      { value: '4', label: 'Publication types: briefs, reports, toolkits, guides' },
      { value: '16', label: 'Practical checks in the Webinar Two report' },
    ],
    visual: {
      kind: 'cutout',
      src: 'img/programmes/research-column.webp',
      className: 'h-full w-auto max-w-none -mb-[1%]',
      alt: 'A classical marble column',
    },
  },
  {
    slug: 'cross-border-desk',
    unit: 'services',
    number: '06',
    title: 'Cross-Border Advisory and Business Facilitation Desk',
    short: 'Cross-Border Desk',
    lede: 'A collaborative route for professionals and institutions exploring opportunities across borders.',
    intro: ['As a regional platform, BTB provides a collaborative framework for professionals and institutions seeking guidance on cross-border opportunities.'],
    listLabel: 'The desk facilitates',
    items: [
      { text: 'Market-entry support', icon: 'DoorOpen' },
      { text: 'Regional investment insights', icon: 'ChartLine' },
      { text: 'Regulatory navigation', icon: 'Route' },
      { text: 'Strategic partnerships', icon: 'Handshake' },
      { text: 'Business referrals', icon: 'Share2' },
      { text: 'Professional connections across jurisdictions', icon: 'Network' },
    ],
    closing: 'This initiative strengthens regional integration and creates value for members and partners alike.',
    note: 'Where a matter needs legal advice, the desk refers it to the founding firms or partner firms, who advise under their own engagement terms.',
    facts: [
      { value: '6', label: 'Ways the desk helps' },
      { value: '2', label: 'Founding firms, in Uganda and Rwanda' },
      { value: 'Referral', label: 'Legal advice comes from the founding or partner firms' },
    ],
    visual: { kind: 'photo', src: 'img/programmes/crossborder-globe.webp', alt: 'A globe with connection points across Africa and Europe' },
  },
  {
    slug: 'alumni-network',
    unit: 'aims',
    number: '07',
    title: 'BTB Alumni Network',
    short: 'Alumni Network',
    lede: 'A lifelong professional community for everyone who takes part in BTB programmes.',
    intro: [
      'The BTB Alumni Network serves as a lifelong professional community for individuals who have participated in BTB programmes, trainings, fellowships, mentorship initiatives, and leadership development activities.',
    ],
    listLabel: 'The Alumni Network seeks to',
    items: [
      { text: 'Maintain professional relationships among members', icon: 'Link2' },
      { text: 'Facilitate collaboration and business opportunities', icon: 'Briefcase' },
      { text: 'Promote mentorship and peer learning', icon: 'Users' },
      { text: 'Support career advancement', icon: 'TrendingUp' },
      { text: 'Recognize outstanding professional achievements', icon: 'Award' },
      { text: 'Create a community of ambassadors for BTB across the region and internationally', icon: 'Flag' },
    ],
    closing:
      'Alumni members will have access to exclusive networking events, leadership opportunities, collaborative projects, and professional development resources.',
    facts: [
      { value: 'Lifelong', label: 'Membership' },
      { value: '6', label: 'Network aims' },
      { value: '4', label: 'Member benefits' },
    ],
    visual: {
      kind: 'pair',
      srcs: ['img/programmes/alumni-1.webp', 'img/programmes/alumni-2.webp'],
      alt: 'Two young professionals in business suits',
    },
  },
]

export type Country = 'ug' | 'rw' | 'ke'
export const countryName: Record<Country, string> = { ug: 'Uganda', rw: 'Rwanda', ke: 'Kenya' }

export const secretariat: { name: string; role: string; country: Country; photo: string }[] = [
  { name: 'Lawrence Magumba', role: 'Team Lead, Uganda', country: 'ug', photo: 'img/team/lawrence-magumba.webp' },
  { name: 'Bahige David', role: 'Team Lead, Rwanda', country: 'rw', photo: 'img/team/bahige-david.webp' },
  { name: 'Ganyanna Sheba Percy', role: 'Coordinator, Projects, Events & Conventions', country: 'ug', photo: 'img/team/ganyanna-sheba-percy.webp' },
  { name: 'Ndahiro Arnold', role: 'Coordinator, Innovation & Technology', country: 'rw', photo: 'img/team/ndahiro-arnold.webp' },
  { name: 'Bakesi Jasper', role: 'Head, Legal & Corporate Affairs', country: 'ug', photo: 'img/team/bakesi-jasper.webp' },
  { name: 'Kabatesi Deborah', role: 'Coordinator, Communication & Public Affairs', country: 'rw', photo: 'img/team/kabatesi-deborah.webp' },
  { name: 'Nansubuga Dallen', role: 'Legal Officer', country: 'ug', photo: 'img/team/nansubuga-dallen.webp' },
  { name: 'Lois Mugeni', role: 'Sustainability & Governance Coordinator', country: 'rw', photo: 'img/team/lois-mugeni.webp' },
  { name: 'Arinda Gloria', role: 'Head, Practice & Administration', country: 'ug', photo: 'img/team/arinda-gloria.webp' },
  { name: 'Ineza Melissa Julie', role: 'Manager, CSR', country: 'rw', photo: 'img/team/ineza-melissa-julie.webp' },
]
