import { getImagePath } from '@/lib/utils';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  color: string;
  planetColor: string;
  glow: string;
  cardGradient: string;
  cardShadow: string;
  overlayGradient: string;
}

export interface ProjectBody {
  [key: string]: string;
}

export interface Project {
  id: string;
  marker: string;
  title: string;
  tagline: string;
  tags: string[];
  color: string;
  media: string | null;
  media2: string | null;
  mediaPlaceholder?: string;
  mediaPlaceholder2?: string;
  body1: ProjectBody;
  body2: ProjectBody;
  widget?: string;
}

export const ITEMS: PortfolioItem[] = [
  {
    id: 'about',
    title: 'About',
    subtitle: 'The Builder',
    content: 'I am a Business Management student at Vilnius University and currently a Sourcing Operations Intern at Mediq. I am a builder at heart. While I work in business operations by day, I spend my time diving deep into AI. I love the process of taking an idea from zero to a finished project. My goal is to stay ahead of the curve, constantly improving my skills.',
    color: 'from-blue-400/50 to-indigo-600/50',
    planetColor: '#6366f1',
    glow: 'shadow-[0_0_80px_rgba(99,102,241,0.6)]',
    cardGradient: 'from-blue-400/50 via-white/10 to-indigo-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.3)]',
    overlayGradient: 'from-blue-500/20 via-transparent to-indigo-500/20',
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Selected Works',
    content: 'A curated collection of digital experiences, pushing the boundaries of what is possible on the modern web with cutting-edge animations and thoughtful design systems.',
    color: 'from-purple-400/50 to-pink-600/50',
    planetColor: '#d946ef',
    glow: 'shadow-[0_0_80px_rgba(217,70,239,0.6)]',
    cardGradient: 'from-purple-400/50 via-white/10 to-pink-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(217,70,239,0.3)]',
    overlayGradient: 'from-purple-500/20 via-transparent to-pink-500/20',
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'The Arsenal',
    content: 'Next.js, React, Tailwind CSS, Framer Motion, GSAP, TypeScript, Node.js, and an unrelenting obsession with 60fps performance and pixel-perfect design.',
    color: 'from-emerald-400/50 to-cyan-600/50',
    planetColor: '#10b981',
    glow: 'shadow-[0_0_80px_rgba(16,185,129,0.6)]',
    cardGradient: 'from-emerald-400/50 via-white/10 to-cyan-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.3)]',
    overlayGradient: 'from-emerald-500/20 via-transparent to-cyan-500/20',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'fintech-ops-dashboard',
    marker: '— PROJECT 1',
    title: 'Fintech Operations & SLA Dashboard',
    tagline: 'Designed and deployed an automated Excel-based tracking system to manage cross-border payment queries, AML Requests for Information (RFIs), and client account updates.',
    tags: ['Microsoft Excel', 'Fintech Ops'],
    color: 'from-blue-500 to-emerald-500',
    media: getImagePath('/tracking_system_sheet1.png'),
    media2: getImagePath('/tracking_system_sheet2.png'),
    mediaPlaceholder: '[INSERT EXCEL DATA TABLE SCREENSHOT HERE]',
    mediaPlaceholder2: '[INSERT PIVOT CHART SCREENSHOT HERE]',
    body1: {
      objective: '🎯 The Business Objective\n\nIn fast-paced fintech and banking environments, Junior Relationship Managers handle a high volume of unstructured, time-sensitive client requests across multiple departments (Compliance, Payments, FX).\n\nThe objective of this project was to build a robust system to:\n• Track the exact lifecycle and status of client operational requests.\n• Ensure critical compliance tasks (like AML RFIs and KYC Refreshes) do not breach deadlines.\n• Provide a clear, visual daily task pipeline to prioritize client outreach.',
      phase1: '📊 Phase 1: The SLA Tracking Matrix\n\nTo begin, I engineered a mock dataset reflecting a typical week of global EMI (Electronic Money Institution) operations, including multi-currency transactions (EUR, USD, GBP, CNY) and multi-lingual client profiles.\n\nI ingested the raw comma-separated data, structured it using Excel\'s Text-to-Columns functionality, and converted it into a dynamic data table. I then applied traffic-light Conditional Formatting to the SLA deadlines to instantly alert the Relationship Manager of tasks requiring immediate attention.'
    },
    body2: {
      phase2: '📈 Phase 2: The Daily Triage Dashboard\n\nManaging raw data is only half the battle; the team needs actionable insights. I built a dynamic PivotTable to aggregate the open tickets by their current Status.\n\nI then layered a clean, optimized PivotChart over this data, sorted from largest to smallest. This creates an instant "Daily Triage" view. A Relationship Manager can open this dashboard at 9:00 AM and immediately see that their biggest bottleneck is tasks "Awaiting Client" responses, prompting them to prioritize follow-up calls or emails right away.',
      impact: '💡 Business Impact & Application\n\nThis Proof of Concept demonstrates the exact skills required for high-performing operational roles in banking and financial services:\n\n• Attention to Detail: Structuring messy, raw data into a clean, trackable format.\n• Task Management: Visually prioritizing multiple time-sensitive requests.\n• IT/Tool Proficiency: Pushing beyond basic data entry to utilize MS Office as a true business intelligence tool.'
    }
  },
  {
    id: 'trade-finance-aml-monitoring',
    marker: '— PROJECT 2',
    title: 'Trade Finance AML Monitoring Dashboard',
    tagline: 'Developed an interactive, live-queue Trade Finance AML Monitoring Dashboard designed to detect Trade-Based Money Laundering (TBML) and sanctions circumvention.',
    tags: ['FinCrime & AML Ops', 'Regulatory Compliance'],
    color: 'from-emerald-500 to-cyan-500',
    media: null,
    media2: null,
    body1: {
      summary: '📌 Executive Summary\n\nDeveloped an interactive, live-queue Trade Finance AML Monitoring Dashboard designed to detect Trade-Based Money Laundering (TBML) and sanctions circumvention. This tool simulates the triage of complex financial instruments (Letters of Credit, Bank Guarantees) against global regulatory frameworks (FATF, OFAC, EU Dual-Use Regulation).',
      objective: '🎯 The Business Objective\n\nTrade Finance operations carry unique, high-severity risks. Unlike standard retail banking, an AML investigator in Trade Finance must analyze not just the flow of money, but the physical movement of goods, vessel routes, and pricing anomalies.\n\nThe objective of this project was to:\n• Replicate a live Level 1 (L1) Trade Finance transaction queue.\n• Automate the detection of specialized red flags (e.g., Dual-Use Goods, Sanctions Exposure, Shell Company Indicators).\n• Provide an interactive triage environment to investigate, document, and escalate high-risk cases seamlessly.',
      phase1: '🛠️ Phase 1: AI-Architected Monitoring & Typology Detection\n\nI utilized advanced prompt engineering and AI web-builders to translate complex AML rules into a functional software application. I designed the core logic engine, instructing the AI to automatically score transaction risk based on multi-variable inputs:\n\n• Instrument Risk: Evaluating Letters of Credit (LCs) for unusual amendment patterns.\n\n• Geographic Risk: Cross-referencing counterparties against FATF grey/blacklists.\n\n• Commodity Risk: Flagging shipments of "Chemical Precursors" or "Electronic Components" that trigger EU Dual-Use Regulation enhanced due diligence.'
    },
    body2: {
      phase2: '📈 Phase 2: Investigation & Case Management Logic\n\nA successful AML program relies heavily on airtight documentation. Within the tool, I built an interactive investigation modal.\n\nWhen a transaction is flagged (e.g., an $8.5M Letter of Credit for Steel Coils routed through a high-risk jurisdiction), the investigator can open the case, review the specific triggered rules, input their analytical rationale into the notes framework, and officially decision the alert as either Escalated to Compliance or Cleared.',
      impact: '💡 Business Impact & Application\n\nThis interactive proof-of-concept demonstrates immediate readiness for a specialized FRCP (Financial Risk Control & Prevention) department:\n\n• Regulatory Fluency: Embedding OFAC and EU 6AMLD logic directly into the triage workflow.\n• Operational Efficiency: Reducing the cognitive load on investigators by visually separating false positives from genuine sanctions risks.\n• Audit Readiness: Ensuring every decision, whether cleared or escalated, is permanently logged with the investigator\'s structured rationale.'
    },
    widgetSrc: '/widgets/aml-monitoring-widget.html'
  },
  {
    id: 'kyc-onboarding-simulator',
    marker: '— PROJECT 3',
    title: 'KYC Onboarding & Merchant Risk Simulator',
    tagline: 'Built an interactive KYC onboarding simulator for high-risk EMI merchants, featuring corporate tree visualization, adverse media screening, and risk-based decision workflows.',
    tags: ['AML & KYC Compliance', 'Risk Operations'],
    color: 'from-cyan-500 to-blue-500',
    media: null,
    media2: null,
    body1: {
      summary: '📌 Executive Summary\n\nBuilt an interactive KYC Onboarding Simulator designed to replicate the end-to-end merchant onboarding journey within a high-risk Electronic Money Institution (EMI). The tool demonstrates proficiency in navigating complex corporate structures, identifying Ultimate Beneficial Owners (UBOs), and applying risk-based due diligence in line with Lithuanian and EU regulatory frameworks.',
      objective: '🎯 The Business Objective\n\nOnboarding high-risk merchants (such as Crypto Exchanges, Forex Brokers, and Payment Intermediaries) requires a meticulous, risk-first approach. A Level 1 KYC analyst must be able to:\n\n• Untangle complex corporate ownership trees to identify the true UBOs.\n• Screen entities and individuals against sanctions lists (OFAC, UN, EU) and adverse media databases.\n• Assess inherent risk factors (geography, business model, transaction velocity) to assign a risk rating.\n• Make a defensible decision: Approve, Decline, or Request Further Information (RFI).\n\nThis simulator provides a hands-on environment to practice these critical skills.',
      phase1: '🛠️ Phase 1: Merchant Profile Generation & Risk Scoring\n\nI architected a dynamic profile generator that creates realistic, high-risk merchant profiles on the fly. Each profile includes:\n\n• Corporate Registry Data: Simulated extracts from official registries (e.g., UK Companies House, Delaware Division of Corporations) detailing the legal entity name, registration number, and registered address.\n\n• Ownership Tree Visualization: A clear, hierarchical display of the corporate structure, breaking down direct and indirect ownership percentages to pinpoint all UBOs holding ≥10% stake.\n\n• Automated Risk Scoring: An algorithm assigns an initial Inherent Risk Score (Low/Medium/High/Critical) based on key variables:\n  – Sector Risk (e.g., Crypto = High, Retail = Low)\n  – Jurisdiction Risk (e.g., Offshore = High, EU = Low)\n  – Product Complexity (e.g., Cross-border payouts = Medium)'
    },
    body2: {
      phase2: '📈 Phase 2: Ongoing Due Diligence (ODD) & Escalation\n\nA robust KYC program doesn\'t stop at onboarding. I structured the application to allow analysts to perform detailed reviews of complex corporate trees.\n\nWithin the interactive modal, an investigator can review the corporate registry data, analyze the merchant\'s live website for compliance (e.g., clear refund policies, no prohibited goods), and officially log an auditable decision: Approve, Request RFI (Request for Information), or Escalate to Head of AML.',
      impact: '💡 Business Impact & Application\n\nThis interactive proof-of-concept demonstrates the exact competencies required to manage a high-risk EMI portfolio:\n• Regulatory Alignment: Incorporating Lithuanian and EU regulatory frameworks directly into the onboarding risk matrix.\n• Analytical Efficiency: Reducing manual screening fatigue by clearly visualizing UBO structures and consolidating adverse media hits.\n• Complex Problem Solving: Demonstrating the ability to untangle high-risk corporate structures and make decisive, well-documented compliance decisions.'
    },
    widgetSrc: '/widgets/kyc-onboarding-widget.html'
  },
  {
    id: 'sanctions-screening-workflow',
    marker: '— PROJECT 4',
    title: 'Sanctions Screening & Alert Resolution Workflow',
    tagline: 'Designed a simulated sanctions screening alert queue, training users to differentiate between true matches and false positives using real-world typologies.',
    tags: ['Financial Crime Prevention', 'Compliance Technology'],
    color: 'from-pink-500 to-rose-500',
    media: null,
    media2: null,
    body1: {
      summary: '📌 Executive Summary\n\nDeveloped a Sanctions Screening Simulator that replicates the daily workflow of a Financial Crime Analyst handling alerts generated by transaction monitoring systems (e.g., World-Check, Dow Jones). The focus is on accurate alert adjudication — distinguishing between false positives and genuine sanctions matches.',
      objective: '🎯 The Business Objective\n\nFalse positive rates in sanctions screening can exceed 95%, creating massive operational inefficiencies. A skilled analyst must quickly and accurately:\n\n• Review alert details (name, DOB, nationality, transaction context).\n• Compare against sanctioned entity profiles (aliases, known associates, passport numbers).\n• Leverage open-source intelligence (OSINT) to verify identity.\n• Document a clear rationale for clearing or escalating the alert.\n\nThis tool trains analysts to reduce false positive clearance time while maintaining zero tolerance for missed true matches.',
      phase1: '🛠️ Phase 1: Alert Queue Simulation & Triage\n\nI built a dynamic alert generation engine that creates realistic screening alerts based on common false positive scenarios and true match typologies:\n\n• Name-Only Matches: Alerts triggered solely by a name similarity (e.g., "Mohammed Al-Fayed" vs. SDN list entry).\n\n• DOB/Nationality Disambiguation: Alerts where the name matches, but date of birth or nationality rules out the sanctioned entity.\n\n• True Match Scenarios: Realistic simulations of sanctioned entities attempting to move funds through obfuscation techniques (e.g., using a close relative\'s account, shell companies).\n\nEach alert includes a "Risk Indicator" score and a set of data points for the analyst to review.'
    },
    body2: {
      phase2: '📈 Phase 2: Clearing Alerts & MLRO Escalation\n\nScreening tools create a lot of noise and alerts. I built the simulator to show how I look at the data to filter out "false positives" and spot the real risks that need attention.\n\nKnowing *when* and *how* to ask for help is also very important. I added a final "Case Summary" step that creates a clear report. This shows I can write factual, clear notes for the Money Laundering Reporting Officer (MLRO). It also shows I know how to ask Relationship Managers for more information (RFIs) without upsetting the client.',
      impact: '💡 What This Shows About Me\n\nThis project proves I am ready to work in a fast-paced KYC team. It shows:\n• I am a fast learner: I understand advanced AML concepts, how screening tools work, and when to trigger ongoing due diligence (ODD).\n• I can solve problems: I can look at a confusing company structure, find the hidden risks, and decide what to do next based on the law.\n• I know the rules: I know how UK and EU frameworks guide daily onboarding tasks.'
    },
    widgetSrc: '/widgets/sanctions-screening-widget.html'
  },
];
