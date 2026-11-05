/*
  Webinar Two session report — transcribed from
  "BTB WEB 2 REPORT: AI in Legal Practice — Are You Accidentally Breaching Data Protection Law?"
*/
import type { Country } from './site'

export const webinarTwo = {
  slug: 'ai-in-legal-practice',
  series: 'Webinar Two',
  kind: 'Session report',
  title: 'AI in Legal Practice',
  subtitle: 'Are You Accidentally Breaching Data Protection Law?',
  theme: 'The invisible breach',
  date: 'Wednesday 19 August 2026',
  dateShort: '19 Aug 2026',
  venue: 'Held on Zoom, livestreamed on the EALS YouTube channel',
  attendees: 109,
  polled: 92,
  jurisdictions: 'Kenya · Rwanda · Uganda',
  youtube: 'https://www.youtube.com/watch?v=VnhLyd6OX5g',

  conversation: [
    'Almost every lawyer in East Africa is now using AI. Very few can say whether that use is lawful. This session put that gap to a panel drawn from three jurisdictions and moderated with a regulator’s lens, and asked a deliberately uncomfortable question: at what point does an ordinary, well-intentioned working day become a breach of data protection law?',
    'The panel’s answer was that it happens earlier and more quietly than most people assume. The moment identifiable client or customer information is pasted into a chatbot, that is processing. Because the major AI tools store and process data outside the region, it is usually also a cross-border transfer to a third party. There is no hack, no ransom note and no incident to report internally, which is precisely why it goes unnoticed. The panel called this the invisible breach, and returned to it throughout the afternoon.',
    'A recurring theme was that the profession need not wait for a dedicated AI statute. Kenya’s, Rwanda’s and Uganda’s data protection laws already govern what happens when personal data is fed into an AI tool. The discussion worked through the lawful basis for the processing, why consent is often the wrong one where a file contains data about third parties who never agreed to anything, the limits of the major providers’ standard terms, why a provider being GDPR compliant does not make it compliant in Kigali, Kampala or Nairobi, and Rwanda’s default rule that personal data is stored in-country unless the regulator authorises otherwise.',
    'For lawyers the exposure runs in two directions at once. They carry the risk in their own practice, where the same upload also engages professional secrecy, while being expected to advise clients making the identical mistake at greater scale. The panel was consistent that the response is not abstinence. It is redaction before anything is pasted, vetting a tool’s terms rather than trusting its reputation, genuine human oversight rather than a rubber stamp, records of what was transferred and why, and a written AI use policy so the judgement is made once and applied by everyone.',
  ],

  polls: {
    headline: ['88% are using AI.', 'Two in three have not implemented anything.'],
    intro:
      'Two live polls were run during the session, one at the start and one after the opening discussion. Together they describe the gap the whole afternoon was about.',
    one: {
      question: 'Have you ever used AI to simplify or improve your work?',
      yes: { pct: 88, count: 81, of: 92 },
      no: { pct: 12, count: 11, of: 92 },
    },
    two: {
      question:
        'Based on our discussion so far, how many of us are actively aware of the issues discussed and have implemented the recommendations?',
      answers: [
        { pct: 33, count: 19, of: 57, label: 'Yes, I’m aware and have implemented them.' },
        { pct: 30, count: 17, of: 57, label: 'I’m aware, but I haven’t implemented them yet.' },
        { pct: 37, count: 21, of: 57, label: 'I’m not yet fully aware / haven’t implemented them.', highlight: true },
      ],
    },
    reading:
      'The largest single group, 37%, were not yet fully aware of the issues. Non-compliance in this room was not unwillingness. It was that nobody had explained it yet.',
    note: '92 of 109 attendees took part in the first poll. The two polls drew different numbers of respondents and are not directly comparable. Percentages are as reported by the polling tool.',
  },

  room: [
    { name: 'Viola Musiimire', role: 'Legal Manager and Data Protection Officer, Watu Credit Uganda Limited', country: 'ug' as Country, tag: 'Uganda', badge: 'Panellist', photo: 'img/panel/viola.webp' },
    { name: 'Philip Kisaka', role: 'Chief Privacy Officer, DPO 360 Africa Limited', country: 'ke' as Country, tag: 'Kenya', badge: 'Panellist', photo: 'img/panel/philip.webp' },
    { name: 'David Bahige Mutume', role: 'IP, Data Protection and Technology Lawyer, Trust Law Chambers', country: 'rw' as Country, tag: 'Rwanda', badge: 'Panellist', photo: 'img/panel/david.webp' },
    { name: 'Louis Muneeza Lionel', role: 'Legal Services Officer, National Information Technology Authority – Uganda', country: 'ug' as Country, tag: 'Uganda', badge: 'Moderator', photo: 'img/panel/louis.webp' },
    { name: 'Gabriel Acaya', role: 'East Africa Law Society', country: null, tag: 'EALS', badge: 'Host', photo: 'img/panel/gabriel.webp' },
    { name: 'Sheba Percy Ganyana', role: 'Programmes Coordinator, Beyond the Bar', country: null, tag: 'BTB', badge: 'Host', photo: 'img/panel/sheba.webp' },
  ],

  panel: [
    {
      id: 'viola',
      name: 'Viola Musiimire',
      first: 'Viola',
      country: 'ug' as Country,
      place: 'Uganda',
      role: 'Panellist',
      photo: 'img/panel/viola.webp',
      intro:
        'Asked whether most organisations using AI know if they are compliant, Viola said no, and located the failure precisely: the problem is not defiance but sequence. The first question anyone asks of a new tool is whether it makes the work easier. The data protection question arrives late, or never. Speaking from inside an organisation rather than about one, she traced what happens in the seconds after an employee uploads a document.',
      quote:
        'Even though the employee may see it as a harmless administrative task, the moment they upload identifiable customer information into an AI platform, that information is being processed.',
      time: '17:56',
      argued: [
        'Uploading identifiable customer information to an AI platform is processing. Uganda’s Data Protection and Privacy Act defines processing broadly enough to capture retrieval, consultation, transmission and disclosure to another party.',
        'Four questions follow every upload: what data, why, who received it, and what happens to it afterwards. Most users cannot answer the fourth. Data may sit on a provider’s systems for thirty days, six months or indefinitely.',
        'A contract sent for AI review is rarely generic. It carries directors’ names, identification numbers, bank details, addresses and signatures, and on upload that information may leave the country and the organisation at once.',
        'AI adoption should follow a defined process: identify the tool and the user department, screen the risk, establish the lawful basis, assess impact where risk is high, obtain management approval, and set a review cycle.',
        'On automated decision-making, what matters is whether AI assists a human assessor or materially determines the outcome. An algorithm scoring applicants and rejecting them is not the same as software organising applications.',
        'Where a decision is significant and solely automated, the data subject must be notified and given a route to reconsideration. Clicking approve does not make a process genuinely human.',
        'Meta AI sitting inside WhatsApp does not inherit WhatsApp’s privacy treatment. Ordinary messages and calls are end-to-end encrypted; interactions with Meta AI are sent to an AI service for processing and are not covered by that protection.',
      ],
      oneLine: 'Compliance is a way of living, not a clause. Before you paste anything into a chatbot, check yourself.',
    },
    {
      id: 'philip',
      name: 'Philip Kisaka',
      first: 'Philip',
      country: 'ke' as Country,
      place: 'Kenya',
      role: 'Panellist',
      photo: 'img/panel/philip.webp',
      intro:
        'Philip took the question of where uploaded data actually goes. His framing was a triangle: the data subject at the apex, the organisation holding their data at one corner, and the AI tool at the third. The breach happens the moment data crosses from the second corner to the third without permission or safeguards. He was equally direct about the commercial reality underneath it, and closed with a call for regional harmonisation.',
      quote: 'Anytime you interact with anything that is given for free, you are the product.',
      time: '28:32',
      argued: [
        'Prompting a chatbot with background context sends that request to a third-party processor, and because the servers behind these platforms sit outside the region, it is already a cross-border transfer.',
        'The tier determines almost everything. On a free consumer tool, inputs may be logged, retained and used to train or evaluate the model.',
        'Enterprise and API tiers should be backed by a data processing agreement stating expressly that data will not be used for training, and defining the retention commitment.',
        'Even on an individually paid subscription, users must go into the settings and switch off what is enabled by default, particularly training and extended retention.',
        'Negotiation is not realistic for an individual or a small firm. There is real information asymmetry, and these platforms run on standard terms because uniformity is what makes them profitable.',
        'Due diligence starts with where the provider’s physical servers sit, whether that jurisdiction has a data protection regime at all, and whether anyone can be reached when something goes wrong.',
        'Anonymisation is the mitigation available to everyone: remove identifiers, run the analysis with substituted ones, reintroduce the real identifiers afterwards. The obstacle is impatience, not difficulty.',
        'Privacy by design means embedding data protection at conceptualisation. Privacy by default means assuming the data subject has asked for the highest level of protection until they proactively choose otherwise.',
      ],
      oneLine: 'We are geographically far too close to have such stark differences in how we handle cross-border transfers of data.',
    },
    {
      id: 'david',
      name: 'David Bahige Mutume',
      first: 'David',
      country: 'rw' as Country,
      place: 'Rwanda',
      role: 'Panellist',
      photo: 'img/panel/david.webp',
      intro:
        'David took the legal profession’s own exposure. His opening move was to separate two things lawyers routinely merge: professional secrecy, which has governed advocates for as long as the profession has existed and is not displaced by data protection law, and personal data, which is governed by a statute that owes nothing to the retainer. Not all confidential information is personal data, and not all personal data is privileged.',
      quote: 'You, as the user or the customer, have no room to negotiate that data processing agreement.',
      time: '1:41:11',
      argued: [
        'Client permission is necessary before confidential information goes to any third party, including an AI tool. But consent discharges the professional secrecy question, not the statutory one.',
        'Law firms are data controllers, and should register as both controller and processor. Advising a client is controlling. Acting as company secretary or running a client’s human resources function is processing.',
        'The data lawyers handle is disproportionately sensitive. Under Rwandan law that category covers race, health status, criminal records, medical records, social origin, beliefs, political opinion, genetic or biometric information, sexual life and family details. One divorce file can contain most of the list.',
        'Consent is often the wrong lawful basis. Where a husband petitions for divorce, his consent cannot cover his wife’s personal data or his children’s. Contractual necessity or legitimate interest will frequently be the better ground.',
        'Five obligations follow for any firm, whatever its size: register; establish a lawful basis; hold a written contract with every third party handling personal data; understand what cross-border handling requires in your jurisdiction; and log what you share, with whom, and which tool was used for what.',
        'Rwanda’s cross-border regime is stricter than the adequacy model used elsewhere in the region. Transfer outside Rwanda requires authorisation from the supervisory authority, and storage outside Rwanda requires a separate authorisation again. A firm can find itself needing four certificates.',
        'On whether the major providers’ standard terms satisfy Rwandan law, his answer was no. The gaps are structural: the governing law is not Rwandan law, the transfer and storage authorisations are permissions the user must hold, and the retention periods are not those a Rwandan regulator requires.',
        'Every firm needs a data protection policy and, on top of it, an AI policy. The AI policy is what decides which tools may be used.',
        'Disclosure is the cheapest first step. Telling a client that the firm uses AI, in the engagement letter or the AI policy, is the beginning of consent. It is a good first step and nothing more.',
      ],
      oneLine: 'There is no law on artificial intelligence yet. There is a law on personal data protection, and it already applies to you.',
    },
    {
      id: 'louis',
      name: 'Louis Muneeza Lionel',
      first: 'Louis',
      country: 'ug' as Country,
      place: 'Uganda',
      role: 'Moderator',
      photo: 'img/panel/louis.webp',
      intro:
        'Louis moderated with a regulator’s lens without claiming to be the regulator, a distinction he drew himself during the session. Uganda’s Personal Data Protection Office sits within NITA-U in the same way Rwanda’s data protection office sits within its national cyber security authority, and he described his role as working closely with the regulator and stepping in where resources are stretched. He pressed each panellist for the practical breaking point rather than the principle.',
      quote: 'People have not yet valued that their information can be used or manipulated by different people for different purposes.',
      time: '1:58:02',
      argued: [
        'Awareness is the binding constraint. People assume that if they are not committing a crime they have nothing to protect, and they do not yet see the value in data.',
        'Most non-compliance arises from a knowledge gap rather than resistance.',
        'Uganda treats financial records as warranting particular care. Bank of Uganda regulations require financial institutions and fintechs to obtain authorisation from the Personal Data Protection Office before externalising a customer’s financial records.',
        'Beyond consent, the route for a controller externalising data is an adequacy assessment, and the obligation sits on the party doing the externalising. Where thousands of data subjects are involved, individual consent is not workable.',
        'The regulator owes a duty to citizens for how the state protects their data, balanced against not deterring adoption. AI tools are necessary and will drive productivity; the concern is the manner of use.',
        'The Personal Data Protection Office has a complaint-handling function whose decisions bind the parties, so enforcement is live. Alongside it the office is deliberately campaigning for registration rather than leading with sanction.',
      ],
      oneLine: 'People are not non-compliant because they want to be. They are non-compliant because nobody has told them yet.',
    },
  ],

  monday: {
    intro:
      'Two checklists came out of the session. The first is for the individual deciding whether a tool can be used at all. The second is for the organisation deciding how it will be adopted. Neither requires a budget.',
    questions: {
      title: 'Six questions to ask of any AI tool',
      by: 'Put to the session by David Bahige Mutume. The answers belong in your firm’s AI policy, not in your head, because the terms change.',
      items: [
        'Does this tier use my inputs to train models by default, and where exactly is the setting?',
        'What is the retention period, and can I set it or does the vendor?',
        'Is a data processing agreement available to me, and does it list sub-processors?',
        'Where is the data physically stored, and is any residency option offered?',
        'Can human reviewers read my content?',
        'What is the governing law, and the forum?',
      ],
    },
    points: {
      title: 'Ten points before an organisation adopts an AI tool',
      by: 'Put to the session by Viola Musiimire, from the data protection officer’s side of the table.',
      items: [
        { head: 'An AI policy', text: 'Written, and covering what it needs to cover.' },
        { head: 'Approved tools', text: 'Decide which the organisation has agreed to use, and say so.' },
        { head: 'Data classification', text: 'Establish what may be given to an AI tool and what may not.' },
        { head: 'Confidentiality rules', text: 'Anonymise client personal information and strip attached photographs.' },
        { head: 'Vendor due diligence', text: 'Ask for a third-party self-assessment pack and find out where client data is held.' },
        { head: 'Contractual protections', text: 'Confidentiality, deletion, breach notification, and a restriction on secondary use.' },
        { head: 'Human oversight', text: 'Mandatory, and real.' },
        { head: 'An audit trail', text: 'Records of significant AI-assisted work and its implications.' },
        { head: 'Training', text: 'For employees and lawyers alike, across the organisation rather than for selected staff.' },
        { head: 'An incident management procedure', text: 'Covering how incidents are handled and reported.' },
      ],
    },
  },

  aboutBtb:
    'Beyond the Bar, known as BTB, is a monthly webinar series re-thinking legal practice in East Africa. It is a joint initiative of Cavenbridge Advocates in Uganda and Trust Law Chambers in Rwanda. This session was convened together with the East Africa Law Society and the EALS Institute.',
  disclaimer:
    'This report summarises a panel discussion and is published for general information. It is not legal advice. The views recorded are those of the individual speakers and not of their employers or of BTB.',
}
