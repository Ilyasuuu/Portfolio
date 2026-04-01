'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon, ChevronLeft, ChevronRight, Mail, Linkedin, Copy, Check } from 'lucide-react';
import GlassIdentityCard from './GlassIdentityCard';
import DustParticles from './DustParticles';
import Planet from './Planet';
import { getImagePath } from '@/lib/utils';

const ITEMS = [
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

const PROJECTS_DATA = [
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
    widget: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
:root {
  --font-sans: system-ui, -apple-system, sans-serif;
  --color-border-tertiary: rgba(255,255,255,0.1);
  --color-border-secondary: rgba(255,255,255,0.2);
  --color-border-danger: rgba(239,68,68,0.3);
  --color-border-success: rgba(16,185,129,0.3);
  --color-background-primary: #0a0a0c;
  --color-background-secondary: #16161a;
  --color-background-danger: rgba(239,68,68,0.1);
  --color-background-warning: rgba(245,158,11,0.1);
  --color-background-success: rgba(16,185,129,0.1);
  --color-background-info: rgba(59,130,246,0.1);
  --color-text-primary: #ffffff;
  --color-text-secondary: rgba(255,255,255,0.6);
  --color-text-danger: #ef4444;
  --color-text-warning: #f59e0b;
  --color-text-success: #10b981;
  --color-text-info: #3b82f6;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
*{box-sizing:border-box;margin:0;padding:0}
html, body { height: 100%; overflow: hidden; background: transparent; }
.app{display:flex;flex-direction:column;gap:0;height:100%; width: 100%; position: absolute; inset: 0; background: var(--color-background-primary); border: 1px solid var(--color-border-tertiary); border-radius: 16px; overflow: hidden;}

/* --- PREMIUM SCROLLBAR --- */
.k-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
.k-scroll::-webkit-scrollbar-track { background: transparent; }
.k-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 10px; border: 1px solid transparent; background-clip: content-box; }
.k-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.15); border: 1px solid transparent; background-clip: content-box; }
.k-scroll { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.08) transparent; scroll-behavior: smooth; }
.topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:0.5px solid var(--color-border-tertiary);background:var(--color-background-primary); flex-shrink: 0; }
.topbar-title{font-size:15px;font-weight:500;color:var(--color-text-primary)}
.topbar-sub{font-size:12px;color:var(--color-text-secondary);margin-top:2px}
.badge{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:500;padding:3px 8px;border-radius:var(--border-radius-md)}
.badge-red{background:var(--color-background-danger);color:var(--color-text-danger)}
.badge-amber{background:var(--color-background-warning);color:var(--color-text-warning)}
.badge-green{background:var(--color-background-success);color:var(--color-text-success)}
.badge-blue{background:var(--color-background-info);color:var(--color-text-info)}
.badge-gray{background:var(--color-background-secondary);color:var(--color-text-secondary)}
.tabs{display:flex;border-bottom:0.5px solid var(--color-border-tertiary);background:var(--color-background-primary); flex-shrink: 0; }
.tab{padding:10px 20px;font-size:13px;cursor:pointer;color:var(--color-text-secondary);border-bottom:2px solid transparent;transition:all .15s}
.tab.active{color:var(--color-text-primary);border-bottom-color:var(--color-text-primary);font-weight:500}
.tab:hover:not(.active){color:var(--color-text-primary);background:var(--color-background-secondary)}
.pane{display:none;padding:16px 20px; flex: 1; overflow-y: auto;}
.pane.active{display:block}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.filters select,.filters input{font-size:13px;padding:5px 10px;border-radius:var(--border-radius-md);border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);color:var(--color-text-primary);height:32px}
.filters label{font-size:12px;color:var(--color-text-secondary)}
.table-wrap{border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:12.5px;table-layout:fixed}
thead tr{background:var(--color-background-secondary)}
th{padding:9px 10px;text-align:left;font-weight:500;color:var(--color-text-secondary);font-size:11px;text-transform:uppercase;letter-spacing:.04em;border-bottom:0.5px solid var(--color-border-tertiary)}
td{padding:9px 10px;border-bottom:0.5px solid var(--color-border-tertiary);color:var(--color-text-primary);vertical-align:middle;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
tr:last-child td{border-bottom:none}
tr.row-clickable:hover td{background:var(--color-background-secondary);cursor:pointer}
.risk-bar-wrap{display:flex;align-items:center;gap:6px}
.risk-bar{height:6px;border-radius:3px;flex:1;background:var(--color-background-secondary);overflow:hidden}
.risk-fill{height:100%;border-radius:3px;transition:width .3s}
.risk-high .risk-fill{background:var(--color-background-danger)}
.risk-med .risk-fill{background:var(--color-background-warning)}
.risk-low .risk-fill{background:var(--color-background-success)}
.btn{font-size:12px;padding:5px 12px;border-radius:var(--border-radius-md);border:0.5px solid var(--color-border-secondary);background:transparent;color:var(--color-text-primary);cursor:pointer;transition:all .15s}
.btn:hover{background:var(--color-background-secondary)}
.btn-primary{background:var(--color-text-primary);color:var(--color-background-primary);border-color:transparent}
.btn-primary:hover{opacity:.85}
.btn-danger{border-color:var(--color-border-danger);color:var(--color-text-danger)}
.btn-danger:hover{background:var(--color-background-danger)}
.btn-success{border-color:var(--color-border-success);color:var(--color-text-success)}
.btn-success:hover{background:var(--color-background-success)}
.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100;align-items:center;justify-content:center; backdrop-filter: blur(4px);}
.modal-bg.open{display:flex}
.modal{background:#111;border-radius:var(--border-radius-lg);border:0.5px solid var(--color-border-secondary);width:min(600px,96vw);max-height:90vh;display:flex; flex-direction: column; padding:0; overflow: hidden;}
.modal-head{padding:16px 20px;border-bottom:0.5px solid var(--color-border-tertiary);display:flex;justify-content:space-between;align-items:center}
.modal-body{padding:16px 20px; overflow-y: auto; flex: 1; }
.modal-foot{padding:12px 20px;border-top:0.5px solid var(--color-border-tertiary);display:flex;gap:8px;justify-content:flex-end}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.detail-item label{font-size:11px;color:var(--color-text-secondary);display:block;margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em}
.detail-item p{font-size:13px;color:var(--color-text-primary);font-weight:500}
.flags-list{display:flex;flex-direction:column;gap:6px;margin:10px 0}
.flag-row{display:flex;align-items:flex-start;gap:8px;padding:8px 10px;border-radius:var(--border-radius-md);border-left:3px solid}
.flag-high{background:var(--color-background-danger);border-color:var(--color-text-danger)}
.flag-med{background:var(--color-background-warning);border-color:var(--color-text-warning)}
.flag-low{background:var(--color-background-info);border-color:var(--color-text-info)}
.flag-row .flag-title{font-size:12px;font-weight:500;color:var(--color-text-primary)}
.flag-row .flag-desc{font-size:11.5px;color:var(--color-text-secondary);margin-top:1px}
.section-head{font-size:12px;font-weight:500;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:.05em;margin:14px 0 6px}
.case-card{border:1px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:12px 14px;margin-bottom:10px;background:#1a1a20}
.case-card:hover{border-color:var(--color-border-secondary)}
.case-meta{display:flex;gap:8px;align-items:center;margin-bottom:4px}
.case-title{font-size:13px;font-weight:500;color:var(--color-text-primary)}
.case-body{font-size:12px;color:var(--color-text-secondary);margin-top:4px;line-height:1.5}
.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px}
@media (min-width: 480px) { .stat-row { grid-template-columns: repeat(4, 1fr); } }
.stat{background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:10px 12px}
.stat-label{font-size:11px;color:var(--color-text-secondary);margin-bottom:3px}
.stat-val{font-size:20px;font-weight:500;color:var(--color-text-primary)}
.stat-sub{font-size:11px;color:var(--color-text-secondary);margin-top:1px}
.notes-area{width:100%;border:0.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md);padding:8px 10px;font-size:12.5px;background:#000;color:white;resize:vertical;min-height:70px;font-family:var(--font-sans)}
.escalation-box{background:var(--color-background-danger);border:0.5px solid var(--color-border-danger);border-radius:var(--border-radius-md);padding:10px 12px;font-size:12px;color:var(--color-text-danger);margin-top:8px}
.cleared-box{background:var(--color-background-success);border:0.5px solid var(--color-border-success);border-radius:var(--border-radius-md);padding:10px 12px;font-size:12px;color:var(--color-text-success);margin-top:8px}
.chip{display:inline-block;font-size:11px;padding:2px 7px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);color:var(--color-text-secondary);border:0.5px solid var(--color-border-tertiary)}
.empty{text-align:center;padding:32px;color:var(--color-text-secondary);font-size:13px}
</style></head><body>

<div class="app">
<div class="topbar">
  <div>
    <div class="topbar-title">Trade Finance AML Monitoring</div>
    <div class="topbar-sub">Financial Risk Control & Prevention — Live Transaction Queue</div>
  </div>
  <div style="display:flex;gap:6px;align-items:center">
    <span class="badge badge-red" id="high-count-badge">● 0 High Risk</span>
    <span class="badge badge-gray" id="total-badge">0 total</span>
  </div>
</div>

<div class="tabs">
  <div class="tab active" onclick="switchTab('monitor')">Transaction Monitor</div>
  <div class="tab" onclick="switchTab('cases')">Case Log <span id="case-badge" style="margin-left:4px;background:var(--color-background-danger);color:var(--color-text-danger);font-size:10px;padding:1px 5px;border-radius:var(--border-radius-md);font-weight:500"></span></div>
  <div class="tab" onclick="switchTab('stats')">Analytics</div>
  <div class="tab" onclick="switchTab('guide')">AML Reference</div>
</div>

<div class="pane active k-scroll" id="pane-monitor">
  <div class="filters">
    <select id="filter-risk" onchange="renderTable()">
      <option value="">All risk levels</option>
      <option value="High">High risk</option>
      <option value="Medium">Medium risk</option>
      <option value="Low">Low risk</option>
    </select>
    <select id="filter-type" onchange="renderTable()">
      <option value="">All types</option>
      <option value="LC">Letter of Credit</option>
      <option value="BG">Bank Guarantee</option>
      <option value="UCP">Documentary Collection</option>
    </select>
    <select id="filter-status" onchange="renderTable()">
      <option value="">All statuses</option>
      <option value="Pending">Pending</option>
      <option value="Under Review">Under Review</option>
      <option value="Escalated">Escalated</option>
      <option value="Cleared">Cleared</option>
    </select>
    <input id="filter-search" type="text" placeholder="Search counterparty or ref..." style="width:200px" oninput="renderTable()">
  </div>
  <div class="table-wrap">
    <table>
      <thead><tr>
        <th style="width:100px">Ref</th>
        <th style="width:80px">Type</th>
        <th style="width:140px">Counterparty</th>
        <th style="width:80px">Country</th>
        <th style="width:90px">Amount</th>
        <th style="width:120px">Risk Score</th>
        <th style="width:90px">Status</th>
        <th style="width:70px">Action</th>
      </tr></thead>
      <tbody id="tx-tbody"></tbody>
    </table>
  </div>
</div>

<div class="pane k-scroll" id="pane-cases">
  <div id="cases-list"></div>
</div>

<div class="pane k-scroll" id="pane-stats">
  <div class="stat-row">
    <div class="stat"><div class="stat-label">Total Screened</div><div class="stat-val" id="s-total">0</div><div class="stat-sub">transactions today</div></div>
    <div class="stat"><div class="stat-label">High Risk</div><div class="stat-val" id="s-high" style="color:var(--color-text-danger)">0</div><div class="stat-sub">require escalation</div></div>
    <div class="stat"><div class="stat-label">Escalated</div><div class="stat-val" id="s-esc" style="color:var(--color-text-warning)">0</div><div class="stat-sub">open cases</div></div>
    <div class="stat"><div class="stat-label">Cleared</div><div class="stat-val" id="s-clr" style="color:var(--color-text-success)">0</div><div class="stat-sub">resolved today</div></div>
  </div>
  <p class="section-head">Risk flag breakdown</p>
  <div id="flag-breakdown" style="display:flex;flex-direction:column;gap:5px"></div>
  <p class="section-head" style="margin-top:16px">Top high-risk jurisdictions</p>
  <div id="juri-list" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px"></div>
</div>

<div class="pane k-scroll" id="pane-guide">
  <p class="section-head">Key AML Red Flags — Trade Finance</p>
  <div class="flags-list">
    <div class="flag-row flag-high"><div><div class="flag-title">Sanctions exposure</div><div class="flag-desc">Counterparty, country, or vessel appears on OFAC, EU, or UN sanctions lists.</div></div></div>
    <div class="flag-row flag-high"><div><div class="flag-title">Over/under-invoicing</div><div class="flag-desc">Invoice value significantly diverges from market price — classic trade-based money laundering (TBML) technique.</div></div></div>
    <div class="flag-row flag-high"><div><div class="flag-title">Dual-use goods concern</div><div class="flag-desc">Goods could have military/weapons application; requires enhanced due diligence under EU Dual-Use Regulation.</div></div></div>
    <div class="flag-row flag-med"><div><div class="flag-title">High-risk jurisdiction</div><div class="flag-desc">FATF grey/black listed country, or jurisdiction with weak AML controls (e.g. Myanmar, Iran, North Korea).</div></div></div>
    <div class="flag-row flag-med"><div><div class="flag-title">Round-number amounts</div><div class="flag-desc">Structured amounts (e.g. exactly $500,000) may indicate structuring to avoid reporting thresholds.</div></div></div>
    <div class="flag-row flag-med"><div><div class="flag-title">Shell company indicators</div><div class="flag-desc">Newly incorporated entity, minimal web presence, registered agent address, mismatched business activity.</div></div></div>
    <div class="flag-row flag-low"><div><div class="flag-title">Third-party payment</div><div class="flag-desc">Payment routed through a party not named in the LC or contract — potential layering indicator.</div></div></div>
    <div class="flag-row flag-low"><div><div class="flag-title">Multiple amendments</div><div class="flag-desc">Unusual number of LC amendments may indicate fraudulent documentary adjustment.</div></div></div>
  </div>
  <p class="section-head" style="margin-top:16px">Regulatory framework</p>
  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
    <span class="chip">FATF Recommendations</span>
    <span class="chip">EU 6th AML Directive (6AMLD)</span>
    <span class="chip">OFAC SDN List</span>
    <span class="chip">UN Security Council Resolutions</span>
    <span class="chip">Wolfsberg Trade Finance Principles</span>
    <span class="chip">Basel AML Index</span>
    <span class="chip">ICC UCP 600</span>
    <span class="chip">EU Dual-Use Regulation 2021/821</span>
  </div>
</div>
</div>

<div class="modal-bg" id="modal-bg" onclick="closeModal(event)">
<div class="modal" id="modal">
  <div class="modal-head">
    <div>
      <div style="font-size:14px;font-weight:500;color:var(--color-text-primary)" id="m-title">Transaction detail</div>
      <div style="font-size:12px;color:var(--color-text-secondary);margin-top:2px" id="m-sub"></div>
    </div>
    <button class="btn" style="border:none; color:white; font-size:18px;" onclick="document.getElementById('modal-bg').classList.remove('open')">✕</button>
  </div>
  <div class="modal-body k-scroll">
    <div class="detail-grid" id="m-grid"></div>
    <p class="section-head">Risk indicators detected</p>
    <div class="flags-list" id="m-flags"></div>
    <p class="section-head">Investigation notes</p>
    <textarea class="notes-area" id="m-notes" placeholder="Document your findings, observations, and rationale here..."></textarea>
    <div id="m-outcome"></div>
  </div>
  <div class="modal-foot" id="m-foot"></div>
</div>
</div>

<script>
const JURISDICTIONS = {
  high:['Iran','Myanmar','North Korea','Syria','Russia','Belarus'],
  med:['UAE','Turkey','Malta','Cyprus','Panama','Cayman Islands','Seychelles'],
  low:['Germany','Netherlands','UK','Singapore','Japan','South Korea','USA']
};
const ALL_COUNTRIES = [...JURISDICTIONS.high,...JURISDICTIONS.med,...JURISDICTIONS.low];

const FLAG_DEFS = [
  {id:'sanctions',label:'Sanctions exposure',tier:'high',desc:'Entity or country appears on OFAC/EU/UN lists'},
  {id:'overinvoice',label:'Over/under-invoicing',tier:'high',desc:'Invoice value deviates >40% from market benchmark'},
  {id:'dualuse',label:'Dual-use goods',tier:'high',desc:'Commodity may have military application'},
  {id:'highjuri',label:'High-risk jurisdiction',tier:'med',desc:'FATF grey/black listed country involved'},
  {id:'roundnum',label:'Round-number amount',tier:'med',desc:'Structured amount suggests threshold avoidance'},
  {id:'shell',label:'Shell company indicators',tier:'med',desc:'Counterparty shows characteristics of a shell entity'},
  {id:'thirdparty',label:'Third-party payment',tier:'low',desc:'Payment routed via unrelated third party'},
  {id:'amendments',label:'Multiple LC amendments',tier:'low',desc:'Unusual amendment pattern on letter of credit'},
];

const CP_NAMES = ['Horizon Trading LLC','Baltic Grain Export','Eurasian Resources Co.','Nile Commodities Ltd','Pacific Rim Imports','Apex Logistics GmbH','Starlux Maritime','Delta Chemical Solutions','Frontier Metals Corp','Iberian Agri Exports','East Baltic Trade','Caspian Energy Ltd','Meridian Steel PLC','Coastal Freight SA','Nordic Timber AS'];
const GOODS = ['Crude oil','Steel coils','Wheat grain','Electronic components','Industrial machinery','Chemical precursors','Timber','Agricultural equipment','Rare earth minerals','Textiles','Fertilizers','Copper scrap','Medical devices','Auto parts','Coal'];

function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}
function randBetween(a,b){return Math.round(a+Math.random()*(b-a))}

function generateTx(i){
  const country = rand(ALL_COUNTRIES);
  const highJuri = JURISDICTIONS.high.includes(country);
  const medJuri = JURISDICTIONS.med.includes(country);
  const types = ['LC','LC','LC','BG','UCP'];
  const type = rand(types);
  const amount = randBetween(50,5000)*1000;
  const cp = rand(CP_NAMES);
  const good = rand(GOODS);
  const dualUseGoods = ['Electronic components','Chemical precursors','Rare earth minerals','Industrial machinery'];
  
  let flags = [];
  if(highJuri) flags.push('sanctions','highjuri');
  if(medJuri && Math.random()>.4) flags.push('highjuri');
  if(dualUseGoods.includes(good) && Math.random()>.3) flags.push('dualuse');
  if(amount%100000===0) flags.push('roundnum');
  if(Math.random()>.7) flags.push('shell');
  if(Math.random()>.8) flags.push('thirdparty');
  if(type==='LC'&&Math.random()>.8) flags.push('amendments');
  if(Math.random()>.85) flags.push('overinvoice');
  flags=[...new Set(flags)];

  let score=0;
  flags.forEach(f=>{
    const d=FLAG_DEFS.find(x=>x.id===f);
    if(d){score+= d.tier==='high'?30:d.tier==='med'?15:7}
  });
  score=Math.min(score+randBetween(0,10),100);

  const risk = score>=60?'High':score>=30?'Medium':'Low';
  const dates=['9:02','9:14','9:31','9:47','10:03','10:18','10:33','10:51','11:04','11:22','11:39','11:55','12:10'];
  return{id:'TF-2024-'+String(1200+i).padStart(4,'0'),type,cp,country,good,amount,flags,score,risk,status:'Pending',notes:'',time:dates[i%dates.length]};
}

let transactions = Array.from({length:13},(_,i)=>generateTx(i));
let cases = [];
let currentTx = null;

function riskClass(r){return r==='High'?'badge-red':r==='Medium'?'badge-amber':'badge-green'}
function statusClass(s){return s==='Escalated'?'badge-red':s==='Under Review'?'badge-amber':s==='Cleared'?'badge-green':'badge-gray'}
function fmtAmount(a){return '$'+(a/1000).toFixed(0)+'K'}

function renderTable(){
  const fRisk=document.getElementById('filter-risk').value;
  const fType=document.getElementById('filter-type').value;
  const fStatus=document.getElementById('filter-status').value;
  const fSearch=document.getElementById('filter-search').value.toLowerCase();
  const rows=transactions.filter(t=>{
    if(fRisk&&t.risk!==fRisk) return false;
    if(fType&&t.type!==fType) return false;
    if(fStatus&&t.status!==fStatus) return false;
    if(fSearch&&!t.cp.toLowerCase().includes(fSearch)&&!t.id.toLowerCase().includes(fSearch)) return false;
    return true;
  });
  const tbody=document.getElementById('tx-tbody');
  if(!rows.length){tbody.innerHTML='<tr><td colspan="8" class="empty">No transactions match filters</td></tr>';updateBadges();return;}
  tbody.innerHTML=rows.map(t=>\`
    <tr class="row-clickable" onclick="openTx('\${t.id}')">
      <td style="font-family:var(--font-mono);font-size:11px">\${t.id}</td>
      <td><span class="chip">\${t.type}</span></td>
      <td style="font-weight:500">\${t.cp}</td>
      <td>\${t.country}</td>
      <td style="font-variant-numeric:tabular-nums">\${fmtAmount(t.amount)}</td>
      <td>
        <div class="risk-bar-wrap risk-\${t.risk.toLowerCase()}">
          <div class="risk-bar"><div class="risk-fill" style="width:\${t.score}%"></div></div>
          <span style="font-size:11px;color:var(--color-text-secondary);width:24px;text-align:right">\${t.score}</span>
        </div>
      </td>
      <td><span class="badge \${statusClass(t.status)}">\${t.status}</span></td>
      <td><button class="btn" style="font-size:11px;padding:3px 8px" onclick="event.stopPropagation();openTx('\${t.id}')">Review</button></td>
    </tr>\`).join('');
  updateBadges();
}

function updateBadges(){
  const high=transactions.filter(t=>t.risk==='High').length;
  document.getElementById('high-count-badge').textContent='● '+high+' High Risk';
  document.getElementById('total-badge').textContent=transactions.length+' total';
  const esc=cases.filter(c=>c.type==='escalated').length;
  const cb=document.getElementById('case-badge');
  cb.textContent=cases.length||'';
  cb.style.display=cases.length?'inline':'none';
  document.getElementById('s-total').textContent=transactions.length;
  document.getElementById('s-high').textContent=high;
  document.getElementById('s-esc').textContent=esc;
  document.getElementById('s-clr').textContent=transactions.filter(t=>t.status==='Cleared').length;
  renderFlagBreakdown();
  renderJuriList();
}

function renderFlagBreakdown(){
  const counts={};
  transactions.forEach(t=>t.flags.forEach(f=>{counts[f]=(counts[f]||0)+1}));
  const div=document.getElementById('flag-breakdown');
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const max=Math.max(...sorted.map(x=>x[1]),1);
  div.innerHTML=sorted.map(([id,c])=>{
    const d=FLAG_DEFS.find(x=>x.id===id);
    const pct=Math.round(c/max*100);
    return\`<div style="display:flex;align-items:center;gap:10px;font-size:12px">
      <span style="width:160px;color:var(--color-text-primary)">\${d?d.label:id}</span>
      <div style="flex:1;height:6px;background:var(--color-background-secondary);border-radius:3px;overflow:hidden"><div style="height:100%;width:\${pct}%;background:var(--color-text-danger);border-radius:3px;opacity:.7"></div></div>
      <span style="width:20px;text-align:right;color:var(--color-text-secondary)">\${c}</span>
    </div>\`;
  }).join('');
}

function renderJuriList(){
  const counts={};
  transactions.filter(t=>t.risk==='High'||t.risk==='Medium').forEach(t=>{counts[t.country]=(counts[t.country]||0)+1});
  const div=document.getElementById('juri-list');
  div.innerHTML=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([c,n])=>\`<span class="badge \${JURISDICTIONS.high.includes(c)?'badge-red':'badge-amber'}">\${c} (\${n})</span>\`).join('');
}

function openTx(id){
  const t=transactions.find(x=>x.id===id);
  if(!t) return;
  currentTx=t;
  document.getElementById('m-title').textContent=t.id+' — '+t.type;
  document.getElementById('m-sub').textContent=t.cp+' · '+t.country+' · '+t.time;
  document.getElementById('m-grid').innerHTML=[
    {l:'Counterparty',v:t.cp},{l:'Instrument',v:t.type==='LC'?'Letter of Credit':t.type==='BG'?'Bank Guarantee':'Documentary Collection'},
    {l:'Country',v:t.country},{l:'Goods / Commodity',v:t.good},
    {l:'Transaction Amount',v:'$'+t.amount.toLocaleString()},{l:'Risk Score',v:t.score+' / 100 ('+t.risk+' Risk)'},
    {l:'Current Status',v:t.status},{l:'Received',v:'Today '+t.time},
  ].map(x=>\`<div class="detail-item"><label>\${x.l}</label><p>\${x.v}</p></div>\`).join('');
  
  const fdef=t.flags.map(f=>FLAG_DEFS.find(d=>d.id===f)).filter(Boolean);
  if(!fdef.length){
    document.getElementById('m-flags').innerHTML='<div style="font-size:12px;color:var(--color-text-secondary);padding:6px 0">No red flags detected — transaction appears low risk.</div>';
  } else {
    document.getElementById('m-flags').innerHTML=fdef.map(f=>\`
      <div class="flag-row flag-\${f.tier}">
        <div><div class="flag-title">\${f.label}</div><div class="flag-desc">\${f.desc}</div></div>
      </div>\`).join('');
  }
  document.getElementById('m-notes').value=t.notes||'';
  document.getElementById('m-outcome').innerHTML='';
  if(t.status==='Escalated') document.getElementById('m-outcome').innerHTML='<div class="escalation-box">This transaction has been escalated to Compliance & Risk teams for further investigation.</div>';
  if(t.status==='Cleared') document.getElementById('m-outcome').innerHTML='<div class="cleared-box">Transaction cleared — no further action required. Finding documented.</div>';
  
  const foot=document.getElementById('m-foot');
  if(t.status==='Cleared'||t.status==='Escalated'){
    foot.innerHTML=\`<button class="btn" onclick="saveTx()">Save notes</button><button class="btn" onclick="document.getElementById('modal-bg').classList.remove('open')">Close</button>\`;
  } else {
    foot.innerHTML=\`
      <button class="btn" onclick="saveTx()">Save notes</button>
      <button class="btn" onclick="markReview()">Mark under review</button>
      <button class="btn btn-danger" onclick="escalate()">Escalate to compliance</button>
      <button class="btn btn-success" onclick="clear()">Clear transaction</button>\`;
  }
  document.getElementById('modal-bg').classList.add('open');
}

function saveTx(){
  if(!currentTx) return;
  currentTx.notes=document.getElementById('m-notes').value;
}
function markReview(){
  if(!currentTx) return;
  saveTx();
  currentTx.status='Under Review';
  closeModalFull();
}
function escalate(){
  if(!currentTx) return;
  saveTx();
  currentTx.status='Escalated';
  cases.push({id:'CASE-'+String(cases.length+1).padStart(3,'0'),tx:currentTx.id,cp:currentTx.cp,risk:currentTx.risk,flags:currentTx.flags,notes:currentTx.notes,time:currentTx.time,type:'escalated'});
  closeModalFull();
}
function clear(){
  if(!currentTx) return;
  saveTx();
  currentTx.status='Cleared';
  cases.push({id:'CASE-'+String(cases.length+1).padStart(3,'0'),tx:currentTx.id,cp:currentTx.cp,risk:currentTx.risk,flags:currentTx.flags,notes:currentTx.notes,time:currentTx.time,type:'cleared'});
  closeModalFull();
}
function closeModalFull(){
  document.getElementById('modal-bg').classList.remove('open');
  renderTable();
  renderCases();
  updateBadges();
}
function closeModal(e){if(e.target===document.getElementById('modal-bg')) document.getElementById('modal-bg').classList.remove('open');}

function renderCases(){
  const div=document.getElementById('cases-list');
  if(!cases.length){div.innerHTML='<div class="empty">No cases logged yet. Review transactions and escalate or clear to create case records.</div>';return;}
  div.innerHTML=cases.map(c=>\`
    <div class="case-card">
      <div class="case-meta">
        <span style="font-size:11px;font-family:var(--font-mono);color:var(--color-text-secondary)">\${c.id}</span>
        <span class="badge \${c.type==='escalated'?'badge-red':'badge-green'}">\${c.type==='escalated'?'Escalated':'Cleared'}</span>
        <span class="badge \${riskClass(c.risk)}">\${c.risk} Risk</span>
        <span style="font-size:11px;color:var(--color-text-secondary);margin-left:auto">\${c.time}</span>
      </div>
      <div class="case-title">\${c.tx} — \${c.cp}</div>
      <div class="case-body">\${c.flags.map(f=>{const d=FLAG_DEFS.find(x=>x.id===f);return d?d.label:f}).join(' · ')||'No flags detected'}</div>
      \${c.notes?\`<div class="case-body" style="margin-top:6px;padding-top:6px;border-top:0.5px solid var(--color-border-tertiary);font-style:italic">"\${c.notes}"</div>\`:''}
    </div>\`).join('');
}

function switchTab(name){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',['monitor','cases','stats','guide'][i]===name));
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('pane-'+name).classList.add('active');
  if(name==='cases') renderCases();
  if(name==='stats') updateBadges();
}

renderTable();
updateBadges();
</script></body></html>`,
  },
  {
    id: 'corporate-kyc-edd-onboarding',
    marker: '— PROJECT 3',
    title: 'E-Commerce Corporate KYC & EDD Onboarding Engine',
    tagline: 'A Corporate KYC and Enhanced Due Diligence (EDD) onboarding pipeline tailored for high-risk e-commerce merchants.',
    tags: ['Corporate KYC & CDD'],
    color: 'from-orange-500 to-red-500',
    media: null,
    media2: null,
    body1: {
      summary: '📌 Executive Summary\n\nA Corporate KYC and Enhanced Due Diligence (EDD) onboarding pipeline tailored for high-risk e-commerce merchants. Using AI-assisted development, I built a risk-scoring matrix that automatically evaluates jurisdictional risk, Ultimate Beneficial Owner (UBO) complexity, and PEP/Sanctions screening hits to streamline analyst workflow.',
      objective: '🎯 The Business Objective\n\nElectronic Money Institutions (EMIs) servicing the e-commerce sector face significant regulatory pressure. Onboarding a corporate entity requires balancing a frictionless client experience with strict adherence to EU AMLDs, the Bank of Lithuania, and FNTT regulations.\n\nThe objective of this project was to:\n1. Replicate a high-volume B2B onboarding queue for e-commerce merchants.\n2. Automate initial Customer Risk Assessments (Low, Medium, High) based on sector (e.g., Dropshipping vs. SaaS) and company structure.\n3. Centralize PEP, Sanctions, and Adverse Media screening results into a single EDD review modal for rapid decision-making.',
      phase1: '🛠️ Phase 1: AI-Architected Risk & Screening Matrix\n\nI utilized prompt engineering to design a functional UI that processes a high-volume queue of corporate applications. I instructed the AI to build a dynamic scoring engine that flags applications requiring Enhanced Due Diligence (EDD).\n\nFor example, an application from a "Dropshipping" merchant registered in Cyprus with a UBO from a high-risk jurisdiction is automatically flagged for EDD, prompting the analyst to request additional Source of Wealth (SoW) documentation.'
    },
    body2: {
      phase2: '📈 Phase 2: Ongoing Due Diligence (ODD) & Escalation\n\nA robust KYC program doesn\'t stop at onboarding. I structured the application to allow analysts to perform detailed reviews of complex corporate trees.\n\nWithin the interactive modal, an investigator can review the corporate registry data, analyze the merchant\'s live website for compliance (e.g., clear refund policies, no prohibited goods), and officially log an auditable decision: Approve, Request RFI (Request for Information), or Escalate to Head of AML.',
      impact: '💡 Business Impact & Application\n\nThis interactive proof-of-concept demonstrates the exact competencies required to manage a high-risk EMI portfolio:\n• Regulatory Alignment: Incorporating Lithuanian and EU regulatory frameworks directly into the onboarding risk matrix.\n• Analytical Efficiency: Reducing manual screening fatigue by clearly visualizing UBO structures and consolidating adverse media hits.\n• Complex Problem Solving: Demonstrating the ability to untangle high-risk corporate structures and make decisive, well-documented compliance decisions.'
    },
    widget: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
/* --- DARK THEME COLOR VARIABLES --- */
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --color-bg-base: #0f0f13;
  --color-bg-surface: #1a1a24;
  --color-bg-elevated: #242430;
  --color-border-subtle: #2d2d3d;
  --color-border-strong: #3f3f5a;
  --color-text-main: #f0f0f5;
  --color-text-muted: #8b8b9e;
  
  --color-danger-bg: rgba(255, 60, 60, 0.15);
  --color-danger-txt: #ff5555;
  --color-warning-bg: rgba(255, 170, 0, 0.15);
  --color-warning-txt: #ffaa00;
  --color-success-bg: rgba(0, 200, 100, 0.15);
  --color-success-txt: #00dd66;
  --color-info-bg: rgba(0, 150, 255, 0.15);
  --color-info-txt: #33aaff;
  
  --radius: 8px;
}

.kyc-app * { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; background: transparent; }
.kyc-app { font-family: var(--font-sans); background: var(--color-bg-base); color: var(--color-text-main); border: 1px solid var(--color-border-subtle); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; height: 100%; width: 100%; position: absolute; inset: 0; }

/* --- PREMIUM SCROLLBAR --- */
.k-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
.k-scroll::-webkit-scrollbar-track { background: transparent; }
.k-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 10px; border: 1px solid transparent; background-clip: content-box; }
.k-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.15); border: 1px solid transparent; background-clip: content-box; }
.k-scroll { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.08) transparent; scroll-behavior: smooth; }

/* Header & Stats */
.kyc-header { padding: 16px 20px; border-bottom: 1px solid var(--color-border-subtle); background: var(--color-bg-surface); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
.kyc-title { font-size: 16px; font-weight: 600; }
.kyc-subtitle { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
.kyc-stats { display: flex; gap: 12px; }
.k-stat { background: var(--color-bg-elevated); border: 1px solid var(--color-border-subtle); padding: 8px 16px; border-radius: var(--radius); text-align: center; }
.k-stat-val { font-size: 18px; font-weight: 600; }
.k-stat-lbl { font-size: 10px; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.5px; }

/* Table Controls */
.kyc-controls { padding: 12px 20px; background: var(--color-bg-base); display: flex; gap: 10px; border-bottom: 1px solid var(--color-border-subtle); flex-shrink: 0; }
.kyc-select, .kyc-input { background: var(--color-bg-surface); border: 1px solid var(--color-border-strong); color: var(--color-text-main); padding: 6px 12px; border-radius: 4px; font-size: 13px; outline: none; }
.kyc-input { width: 250px; }

/* Table */
.kyc-table-wrap { flex: 1; overflow-y: auto; background: var(--color-bg-surface); }
.kyc-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.kyc-table th { position: sticky; top: 0; background: var(--color-bg-elevated); padding: 10px 20px; font-size: 11px; text-transform: uppercase; color: var(--color-text-muted); border-bottom: 1px solid var(--color-border-strong); z-index: 10; }
.kyc-table td { padding: 12px 20px; border-bottom: 1px solid var(--color-border-subtle); }
.kyc-table tr:hover td { background: var(--color-bg-elevated); cursor: pointer; }

/* Badges */
.k-badge { display: inline-flex; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.kb-high { background: var(--color-danger-bg); color: var(--color-danger-txt); }
.kb-med { background: var(--color-warning-bg); color: var(--color-warning-txt); }
.kb-low { background: var(--color-success-bg); color: var(--color-success-txt); }
.kb-gray { background: var(--color-bg-elevated); border: 1px solid var(--color-border-strong); color: var(--color-text-muted); }
.kb-blue { background: var(--color-info-bg); color: var(--color-info-txt); }

.k-btn { background: var(--color-bg-elevated); border: 1px solid var(--color-border-strong); color: var(--color-text-main); padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; transition: 0.2s; }
.k-btn:hover { background: var(--color-border-strong); }

/* Modal */
.k-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
.k-modal-overlay.open { display: flex; }
.k-modal { background: var(--color-bg-surface); border: 1px solid var(--color-border-strong); border-radius: var(--radius); width: 800px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 24px 48px rgba(0,0,0,0.5); }
.k-m-head { padding: 20px; border-bottom: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-elevated); }
.k-m-body { padding: 20px; overflow-y: auto; flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.k-m-foot { padding: 16px 20px; border-top: 1px solid var(--color-border-subtle); background: var(--color-bg-elevated); display: flex; justify-content: flex-end; gap: 10px; }

/* Modal Content */
.k-card { background: var(--color-bg-base); border: 1px solid var(--color-border-subtle); border-radius: var(--radius); padding: 16px; }
.k-card h4 { font-size: 12px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 12px; border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 8px; }
.k-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; margin-bottom: 12px;}
.k-grid label { color: var(--color-text-muted); font-size: 11px; display: block; margin-bottom: 2px;}
.k-grid span { font-weight: 500; }

.k-ubo-list { display: flex; flex-direction: column; gap: 8px; }
.k-ubo { background: var(--color-bg-surface); border: 1px solid var(--color-border-strong); padding: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
.k-ubo-name { font-size: 13px; font-weight: 500; }
.k-ubo-details { font-size: 11px; color: var(--color-text-muted); margin-top: 2px; }

.k-hit { padding: 8px 12px; border-left: 3px solid; background: var(--color-bg-surface); margin-bottom: 8px; border-radius: 0 4px 4px 0; }
.k-hit-pep { border-color: var(--color-danger-txt); }
.k-hit-am { border-color: var(--color-warning-txt); }

.k-action-btn { padding: 8px 16px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; border: none; }
.k-btn-approve { background: var(--color-success-bg); color: var(--color-success-txt); border: 1px solid var(--color-success-txt); }
.k-btn-rfi { background: var(--color-warning-bg); color: var(--color-warning-txt); border: 1px solid var(--color-warning-txt); }
.k-btn-escalate { background: var(--color-danger-bg); color: var(--color-danger-txt); border: 1px solid var(--color-danger-txt); }
</style>

<div class="kyc-app">
  <div class="kyc-header">
    <div>
      <div class="kyc-title">B2B Corporate Onboarding Pipeline</div>
      <div class="kyc-subtitle">KYC & EDD Engine — Blue EMI Operations</div>
    </div>
    <div class="kyc-stats">
      <div class="k-stat"><div class="k-stat-val" id="st-total" style="color:var(--color-info-txt)">0</div><div class="k-stat-lbl">In Queue</div></div>
      <div class="k-stat"><div class="k-stat-val" id="st-edd" style="color:var(--color-warning-txt)">0</div><div class="k-stat-lbl">EDD Required</div></div>
      <div class="k-stat"><div class="k-stat-val" id="st-esc" style="color:var(--color-danger-txt)">0</div><div class="k-stat-lbl">Escalated</div></div>
    </div>
  </div>

  <div class="kyc-controls">
    <select class="kyc-select" id="f-risk" onchange="renderKYC()">
      <option value="">All Risk Levels</option>
      <option value="High">High Risk</option>
      <option value="Medium">Medium Risk</option>
      <option value="Low">Low Risk</option>
    </select>
    <select class="kyc-select" id="f-status" onchange="renderKYC()">
      <option value="">All Statuses</option>
      <option value="Pending CDD">Pending CDD</option>
      <option value="Pending EDD">Pending EDD</option>
      <option value="RFI Sent">Awaiting RFI</option>
    </select>
    <input type="text" class="kyc-input" id="f-search" placeholder="Search company name..." onkeyup="renderKYC()">
  </div>

  <div class="kyc-table-wrap k-scroll">
    <table class="kyc-table">
      <thead>
        <tr>
          <th>App ID</th>
          <th>Company Name</th>
          <th>E-Commerce Sector</th>
          <th>Jurisdiction</th>
          <th>Risk Score</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="kyc-tbody"></tbody>
    </table>
  </div>
</div>

<div class="k-modal-overlay" id="k-modal-bg" onclick="if(event.target===this) closeKYCModal()">
  <div class="k-modal">
    <div class="k-m-head">
      <div>
        <div style="font-size:18px; font-weight:600;" id="m-cname">Company Name</div>
        <div style="font-size:12px; color:var(--color-text-muted); margin-top:4px;" id="m-cid">APP-0000</div>
      </div>
      <div id="m-risk-badge"></div>
    </div>
    
    <div class="k-m-body k-scroll">
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="k-card">
          <h4>Corporate Details</h4>
          <div class="k-grid">
            <div><label>Registration Number</label><span id="m-reg"></span></div>
            <div><label>Jurisdiction</label><span id="m-jur"></span></div>
            <div><label>Date of Incorporation</label><span id="m-doi"></span></div>
            <div><label>Expected Monthly Vol.</label><span id="m-vol"></span></div>
          </div>
          <div style="font-size:13px; margin-top:12px; border-top:1px solid var(--color-border-subtle); padding-top:12px;">
            <label style="color:var(--color-text-muted); font-size:11px;">E-Commerce Platform / URL</label>
            <div style="color:var(--color-info-txt); margin-top:2px;" id="m-url"></div>
          </div>
        </div>

        <div class="k-card">
          <h4>Ownership Structure (UBOs)</h4>
          <div class="k-ubo-list" id="m-ubos"></div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="k-card" style="border-color: var(--color-warning-txt);">
          <h4 style="color: var(--color-warning-txt);">Screening & Alerts</h4>
          <div id="m-alerts"></div>
        </div>

        <div class="k-card">
          <h4>Analyst Notes</h4>
          <textarea style="width:100%; height:100px; background:var(--color-bg-surface); border:1px solid var(--color-border-strong); color:white; padding:10px; font-family:var(--font-sans); resize:none; border-radius:4px;" placeholder="Document your EDD rationale, source of wealth verification, or RFI requirements here..."></textarea>
        </div>
      </div>
    </div>

    <div class="k-m-foot">
      <button class="k-btn" onclick="closeKYCModal()">Cancel</button>
      <div style="flex:1"></div>
      <button class="k-action-btn k-btn-rfi" onclick="actionKYC('RFI Sent')">Request RFI</button>
      <button class="k-action-btn k-btn-escalate" onclick="actionKYC('Escalated to MLRO')">Escalate to MLRO</button>
      <button class="k-action-btn k-btn-approve" onclick="actionKYC('Approved')">Approve KYC</button>
    </div>
  </div>
</div>

<script>
// Mock Data Generation
const sectors = [
  {n:'Dropshipping', r:30}, {n:'SaaS Subscriptions', r:5}, {n:'Crypto Gateway', r:50}, 
  {n:'Adult Entertainment', r:40}, {n:'Digital Goods/Gaming', r:25}, {n:'Physical Retail (Apparel)', r:10},
  {n:'Supplements/Nutra', r:35}
];
const countries = [
  {n:'Lithuania', r:0}, {n:'United Kingdom', r:10}, {n:'Cyprus', r:25}, {n:'Malta', r:20}, 
  {n:'United Arab Emirates', r:35}, {n:'British Virgin Islands', r:50}, {n:'Panama', r:45}
];
const names = ['Apex','Nova','Vertex','Quantum','Nexus','Global','Meridian','Zenith','Aero','Pulse'];
const suffixes = ['Commerce Ltd','Digital UAB','Solutions LLC','Ventures UAB','Trading Group','Enterprises','Pay UAB'];
const firstNames = ['Marius','Jonas','Elena','David','Alex','Dmitry','Sarah','Michael','Artem','Fatima'];
const lastNames = ['Kazlauskas','Petrauskas','Smith','Ivanov','Müller','Cohen','Al-Fayed','Wong','Silva','Popov'];

function rand(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function randNum(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

let apps = [];
for(let i=1; i<=38; i++) {
  let sec = rand(sectors);
  let ctry = rand(countries);
  let cname = rand(names) + ' ' + rand(suffixes);
  
  // Risk Math
  let baseRisk = sec.r + ctry.r + randNum(0, 15);
  let riskLvl = baseRisk >= 65 ? 'High' : baseRisk >= 35 ? 'Medium' : 'Low';
  
  // UBO Generation
  let uboCount = randNum(1, 3);
  let ubos = [];
  let alerts = [];
  
  for(let j=0; j<uboCount; j++) {
    let un = rand(firstNames) + ' ' + rand(lastNames);
    let pct = j === 0 ? randNum(51, 100) : randNum(10, 49);
    let uboCtry = randNum(1,10) > 8 ? 'Russia (High Risk)' : ctry.n;
    
    let isPep = randNum(1,100) > 92;
    let isAdv = randNum(1,100) > 85;
    
    if(isPep) { alerts.push({t:'PEP Hit', d:\`\${un} matched against Global PEP Database (Tier 2)\`}); riskLvl='High'; }
    if(isAdv) { alerts.push({t:'Adverse Media', d:\`News article linked to \${un} regarding tax evasion allegations.\`}); riskLvl='High'; }
    if(uboCtry.includes('Russia')) { alerts.push({t:'Sanctions Risk', d:\`UBO resides in restricted jurisdiction.\`}); riskLvl='High'; }
    
    ubos.push({ name: un, pct: pct, ctry: uboCtry });
  }

  if(sec.n === 'Dropshipping' || sec.n === 'Crypto Gateway') {
    alerts.push({t:'Sector Risk', d:\`Business model (\${sec.n}) requires Enhanced Due Diligence (EDD) per internal policy.\`});
  }

  if(alerts.length === 0) {
    alerts.push({t:'Clear', d:'No screening alerts generated. Standard CDD applies.'});
  }

  apps.push({
    id: 'APP-' + (4000 + i),
    company: cname,
    sector: sec.n,
    country: ctry.n,
    risk: riskLvl,
    status: riskLvl === 'High' ? 'Pending EDD' : 'Pending CDD',
    reg: randNum(100000000, 999999999),
    doi: \`202\${randNum(0,4)}-0\${randNum(1,9)}-1\${randNum(0,9)}\`,
    vol: '€' + randNum(10, 500) + ',000',
    url: 'https://www.' + cname.split(' ')[0].toLowerCase() + 'shop.com',
    ubos: ubos,
    alerts: alerts
  });
}

// Sort so High risk/Pending EDD is at top
apps.sort((a,b) => (b.risk === 'High' ? 1 : 0) - (a.risk === 'High' ? 1 : 0));

let kycCurrentAppId = null;

function renderKYC() {
  const fRisk = document.getElementById('f-risk').value;
  const fStat = document.getElementById('f-status').value;
  const fSearch = document.getElementById('f-search').value.toLowerCase();
  
  const tbody = document.getElementById('kyc-tbody');
  let html = '';
  
  let eddCount = 0; let escCount = 0; let activeCount = 0;

  apps.forEach(a => {
    if(a.status !== 'Approved' && a.status !== 'Escalated to MLRO') activeCount++;
    if(a.status === 'Pending EDD') eddCount++;
    if(a.status === 'Escalated to MLRO') escCount++;

    if(fRisk && a.risk !== fRisk) return;
    if(fStat && a.status !== fStat) return;
    if(fSearch && !a.company.toLowerCase().includes(fSearch)) return;

    let rBadge = a.risk === 'High' ? 'kb-high' : a.risk === 'Medium' ? 'kb-med' : 'kb-low';
    let sBadge = a.status.includes('EDD') ? 'kb-high' : a.status.includes('Escalated') ? 'kb-high' : a.status.includes('Approved') ? 'kb-low' : 'kb-gray';

    html += \`
      <tr onclick="openKYCModal('\${a.id}')">
        <td style="font-family:var(--font-mono); color:var(--color-text-muted);">\${a.id}</td>
        <td style="font-weight:600;">\${a.company}</td>
        <td><span class="k-badge kb-gray" style="font-weight:400">\${a.sector}</span></td>
        <td>\${a.country}</td>
        <td><span class="k-badge \${rBadge}">\${a.risk}</span></td>
        <td><span class="k-badge \${sBadge}">\${a.status}</span></td>
        <td><button class="k-btn">Review</button></td>
      </tr>
    \`;
  });

  tbody.innerHTML = html || '<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--color-text-muted);">No applications found.</td></tr>';
  
  document.getElementById('st-total').innerText = activeCount;
  document.getElementById('st-edd').innerText = eddCount;
  document.getElementById('st-esc').innerText = escCount;
}

function openKYCModal(id) {
  const a = apps.find(x => x.id === id);
  if(!a) return;
  kycCurrentAppId = id;

  document.getElementById('m-cname').innerText = a.company;
  document.getElementById('m-cid').innerText = a.id + ' | Application Date: Today';
  
  let rBadge = a.risk === 'High' ? 'kb-high' : a.risk === 'Medium' ? 'kb-med' : 'kb-low';
  document.getElementById('m-risk-badge').innerHTML = \`<span class="k-badge \${rBadge}" style="font-size:14px; padding:6px 12px;">\${a.risk} Risk Profile</span>\`;

  document.getElementById('m-reg').innerText = a.reg;
  document.getElementById('m-jur').innerText = a.country;
  document.getElementById('m-doi').innerText = a.doi;
  document.getElementById('m-vol').innerText = a.vol;
  document.getElementById('m-url').innerText = a.url;

  // UBOs
  document.getElementById('m-ubos').innerHTML = a.ubos.map(u => \`
    <div class="k-ubo">
      <div>
        <div class="k-ubo-name">\${u.name} <span style="color:var(--color-info-txt);">(\${u.pct}%)</span></div>
        <div class="k-ubo-details">Residency: \${u.ctry}</div>
      </div>
      <span class="k-badge kb-gray">Verify ID</span>
    </div>
  \`).join('');

  // Alerts
  if(a.alerts[0].t === 'Clear') {
    document.getElementById('m-alerts').innerHTML = \`<div class="k-hit" style="border-color:var(--color-success-txt);"><div style="font-weight:600;font-size:12px;color:var(--color-success-txt)">Clear</div><div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">\${a.alerts[0].d}</div></div>\`;
  } else {
    document.getElementById('m-alerts').innerHTML = a.alerts.map(al => {
      let cls = al.t.includes('PEP') ? 'k-hit-pep' : al.t.includes('Sanctions') ? 'k-hit-pep' : 'k-hit-am';
      let clr = al.t.includes('PEP') || al.t.includes('Sanctions') ? 'var(--color-danger-txt)' : 'var(--color-warning-txt)';
      return \`<div class="k-hit \${cls}"><div style="font-weight:600;font-size:12px;color:\${clr}">\${al.t}</div><div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">\${al.d}</div></div>\`;
    }).join('');
  }

  document.getElementById('k-modal-bg').classList.add('open');
}

function closeKYCModal() {
  document.getElementById('k-modal-bg').classList.remove('open');
}

function actionKYC(newStatus) {
  const a = apps.find(x => x.id === kycCurrentAppId);
  if(a) a.status = newStatus;
  closeKYCModal();
  renderKYC();
}

// Init
renderKYC();
</script></body></html>`,
  },
  {
    id: 'kyc-investigation-playbook',
    marker: '— PROJECT 4',
    title: 'Interactive KYC Investigation Playbook & Case Simulator',
    tagline: 'A comprehensive interactive simulator demonstrating the complete KYC lifecycle, from corporate structure mapping to MLRO escalation.',
    tags: ['Applied AML Theory', 'KYC/CDD', 'Enhanced Due Diligence'],
    color: 'from-indigo-500 to-purple-500',
    media: null,
    media2: null,
    body1: {
      summary: "📌 Executive Summary\n\nI built an interactive KYC case simulator that shows the exact steps to onboard a high-risk corporate client. I created this project to prove my knowledge of Customer Due Diligence (CDD), UK/EU AML rules, and how to assess complex business models.\n\n*(Note: I used AI to help write the code for this tool. It runs safely in your browser using fake, made-up data, ensuring zero GDPR or privacy risks.)*",
      objective: "🎯 The Rules & Frameworks I Applied\n\nEven though I don't have years of experience, I spend a lot of time reading the actual regulations that guide this job. I built this simulator based on the following real-world rules:\n• The Risk-Based Approach (RBA): Recommended by the FCA (Financial Conduct Authority), this means we don't treat every client the same. A local shop gets standard checks, but a cross-border e-commerce business needs deeper monitoring.\n• Finding the UBO: Following the EU Anti-Money Laundering Directives (AMLDs), I know we must identify the Ultimate Beneficial Owner (UBO)—which is anyone who owns more than 25% of the company shares or voting rights.\n• Enhanced Due Diligence (EDD): According to JMLSG (Joint Money Laundering Steering Group) guidance, if a client is from a high-risk country, or if they are a PEP (Politically Exposed Person), we cannot just do standard checks. We must do EDD, which includes proving their Source of Wealth (SoW) and Source of Funds (SoF).",
      phase1: "🛠️ Phase 1: How I Investigate (CDD & EDD)\n\nI set up this tool to work like a real fintech company. The simulator walks through the exact steps to check a complex business.\n\nIt shows how I look at a client's business model and find the UBOs. You can click through the tool to see exactly how I spot red flags and decide if a client needs Standard CDD or Enhanced Due Diligence (EDD) based on their country and industry."
    },
    body2: {
      phase2: "📈 Phase 2: Clearing Alerts & MLRO Escalation\n\nScreening tools create a lot of noise and alerts. I built the simulator to show how I look at the data to filter out \"false positives\" and spot the real risks that need attention.\n\nKnowing *when* and *how* to ask for help is also very important. I added a final \"Case Summary\" step that creates a clear report. This shows I can write factual, clear notes for the Money Laundering Reporting Officer (MLRO). It also shows I know how to ask Relationship Managers for more information (RFIs) without upsetting the client.",
      impact: "💡 What This Shows About Me\n\nThis project proves I am ready to work in a fast-paced KYC team. It shows:\n• I am a fast learner: I understand advanced AML concepts, how screening tools work, and when to trigger ongoing due diligence (ODD).\n• I can solve problems: I can look at a confusing company structure, find the hidden risks, and decide what to do next based on the law.\n• I know the rules: I know how UK and EU frameworks guide daily onboarding tasks."
    },
    widget: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>KYC Analyst Framework Simulator</title>
  <style>
    :root {
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --color-bg-base: #0f0f13;
      --color-bg-surface: #1a1a24;
      --color-bg-elevated: #242430;
      --color-border-subtle: #2d2d3d;
      --color-border-strong: #3f3f5a;
      --color-text-main: #f0f0f5;
      --color-text-muted: #8b8b9e;
      --color-danger-bg: rgba(255, 60, 60, 0.15);
      --color-danger-txt: #ff5555;
      --color-warning-bg: rgba(255, 170, 0, 0.15);
      --color-warning-txt: #ffaa00;
      --color-success-bg: rgba(0, 200, 100, 0.15);
      --color-success-txt: #00dd66;
      --color-info-bg: rgba(0, 150, 255, 0.15);
      --color-info-txt: #33aaff;
      --radius: 8px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--color-bg-base);
      color: var(--color-text-main);
      font-family: var(--font-sans);
      font-size: 14px;
      line-height: 1.5;
      padding: 20px;
    }

    .pb-container {
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border-subtle);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    .pb-header {
      padding: 20px 24px;
      background: var(--color-bg-elevated);
      border-bottom: 1px solid var(--color-border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pb-title { font-size: 18px; font-weight: 600; color: #fff; }
    .pb-subtitle { font-size: 13px; color: var(--color-text-muted); margin-top: 4px; }
    .pb-badge { font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; background: var(--color-info-bg); color: var(--color-info-txt); }

    .pb-tabs { display: flex; background: var(--color-bg-elevated); border-bottom: 1px solid var(--color-border-subtle); }
    .pb-tab { flex: 1; padding: 14px; text-align: center; font-size: 12px; font-weight: 600; color: var(--color-text-muted); cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; }
    .pb-tab:hover { color: #fff; background: rgba(255,255,255,0.02); }
    .pb-tab.active { color: var(--color-info-txt); border-bottom: 2px solid var(--color-info-txt); background: var(--color-bg-base); }
    .pb-tab.locked { opacity: 0.5; cursor: not-allowed; }

    .pb-content { display: none; padding: 24px; min-height: 400px; }
    .pb-content.active { display: block; animation: fadeIn 0.3s ease-out; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .pb-section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .pb-section-title::after { content: ''; flex: 1; height: 1px; background: var(--color-border-subtle); }

    .pb-card { background: var(--color-bg-elevated); border: 1px solid var(--color-border-subtle); border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    .pb-label { font-size: 11px; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 4px; }
    .pb-value { font-size: 14px; font-weight: 500; color: #fff; }

    .pb-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

    .pb-btn { font-family: inherit; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s; background: var(--color-info-txt); color: #000; }
    .pb-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(0,0,0,0.3); opacity: 0.9; }
    .pb-btn:active { transform: translateY(0); }

    .pb-alert-box { padding: 12px 16px; border-radius: 6px; margin-bottom: 12px; display: flex; gap: 12px; align-items: center; }
    .pb-alert-high { background: var(--color-danger-bg); border: 1px solid var(--color-danger-txt); color: var(--color-danger-txt); }
    .pb-alert-med { background: var(--color-warning-bg); border: 1px solid var(--color-warning-txt); color: var(--color-warning-txt); }

    .pb-info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border-subtle); }
    .pb-info-row:last-child { border-bottom: none; }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--color-bg-base); }
    ::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: 10px; }
  </style>
</head>
<body>

<div class="pb-container">
  <div class="pb-header">
    <div>
      <div class="pb-title">Interactive Case Simulation: Global Tech Solutions Ltd</div>
      <div class="pb-subtitle">B2B Corporate Onboarding Pipeline • Jurisdiction: UK</div>
    </div>
    <div class="pb-badge" id="status-badge">Status: CDD Review</div>
  </div>

  <div class="pb-tabs">
    <div class="pb-tab active" id="tab-btn-1" onclick="switchTab(1)">1. Client Profile</div>
    <div class="pb-tab locked" id="tab-btn-2" onclick="switchTab(2)">2. Screening</div>
    <div class="pb-tab locked" id="tab-btn-3" onclick="switchTab(3)">3. Risk Assessment</div>
    <div class="pb-tab locked" id="tab-btn-4" onclick="switchTab(4)">4. Case Summary</div>
  </div>

  <div class="pb-content active" id="tab-1">
    <div class="pb-section-title">Corporate Structure Analysis</div>
    <div class="pb-card" style="border-left: 4px solid var(--color-info-txt);">
      <p style="margin-bottom: 12px;"><strong>Business Model:</strong> Software Hub / SaaS Provider</p>
      <div class="pb-grid">
        <div>
          <div class="pb-label">Reg Number</div>
          <div class="pb-value">UK-98231022</div>
        </div>
        <div>
          <div class="pb-label">Expected Volume</div>
          <div class="pb-value">£2,500,000 / month</div>
        </div>
      </div>
    </div>

    <div class="pb-section-title">Ultimate Beneficial Owners (UBO)</div>
    <div class="pb-grid">
      <div class="pb-card">
        <div class="pb-label">UBO 1 (60% Ownership)</div>
        <div class="pb-value">David Henderson</div>
        <div class="pb-subtitle">Country: United Kingdom</div>
      </div>
      <div class="pb-card">
        <div class="pb-label">UBO 2 (40% Ownership)</div>
        <div class="pb-value">Elena Volkova</div>
        <div class="pb-subtitle">Country: Cyprus / Russia</div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: rgba(51, 170, 255, 0.05); border-radius: 6px; font-size: 13px; color: var(--color-info-txt);">
      <strong>Analyst Note:</strong> Under EU AML directives, both individuals own >25% of the entity and must undergo full identity verification and screening.
    </div>

    <div style="margin-top: 32px; display: flex; justify-content: flex-end;">
      <button class="pb-btn" onclick="unlockStep(2)">Complete CDD & Run Screening →</button>
    </div>
  </div>

  <div class="pb-content" id="tab-2">
    <div class="pb-section-title">Sanctions & PEP Screening Results</div>
    
    <div class="pb-alert-box pb-alert-med">
      <div style="font-size: 20px;">⚠️</div>
      <div>
        <div style="font-weight: 700; margin-bottom: 2px;">Multiple Adverse Media Hits</div>
        <div style="font-size: 12px; opacity: 0.9;">Elena Volkova matched news reports regarding offshore wealth management.</div>
      </div>
    </div>

    <div class="pb-alert-box pb-alert-high">
      <div style="font-size: 20px;">🚨</div>
      <div>
        <div style="font-weight: 700; margin-bottom: 2px;">Sanctions Nexus Flag</div>
        <div style="font-size: 12px; opacity: 0.9;">UBO 2 residence in Cyprus with secondary Russian link triggers Enhanced Due Diligence (EDD).</div>
      </div>
    </div>

    <div class="pb-card" id="hit-analysis" style="display:none; border-left: 4px solid var(--color-danger-txt);">
      <div class="pb-label">Analyst Rationale</div>
      <p style="font-size: 13px; font-style: italic;">"Match confirmed for UBO 2. Residence in high-risk jurisdiction and adverse media related to wealth management require escalation to MLRO for secondary review."</p>
    </div>

    <div style="margin-top: 32px; display: flex; justify-content: space-between; align-items: center;">
      <button class="pb-btn" id="analyze-btn" style="background: var(--color-danger-txt); color: #fff;" onclick="analyzeHit()">Analyze Hit</button>
      <button class="pb-btn" onclick="unlockStep(3)">Move to Risk Assessment →</button>
    </div>
  </div>

  <div class="pb-content" id="tab-3">
    <div class="pb-section-title">Risk Scoring Matrix</div>
    <div class="pb-card">
      <div class="pb-info-row">
        <div class="pb-label">Jurisdictional Risk</div>
        <div style="color: var(--color-danger-txt); font-weight: 700;">HIGH</div>
      </div>
      <div class="pb-info-row">
        <div class="pb-label">Industry Sentiment</div>
        <div style="color: var(--color-success-txt); font-weight: 700;">LOW</div>
      </div>
      <div class="pb-info-row">
        <div class="pb-label">UBO Complexity</div>
        <div style="color: var(--color-warning-txt); font-weight: 700;">MEDIUM</div>
      </div>
      <div class="pb-info-row" style="margin-top: 8px; border-top: 2px solid var(--color-border-strong); padding-top: 12px;">
        <div style="font-weight: 700;">FINAL RISK SCORE</div>
        <div style="color: var(--color-danger-txt); font-weight: 900; font-size: 18px;">88 / 100</div>
      </div>
    </div>

    <div class="pb-section-title">Decision Required</div>
    <p style="color: var(--color-text-muted); margin-bottom: 16px;">This application cannot be cleared at Level 1 (L1) due to jurisdictional overlays and adverse media proximity. Select action:</p>
    <div class="pb-grid">
      <button class="pb-btn" style="background: transparent; border: 1px solid var(--color-border-strong); color: #fff;">Request RFI</button>
      <button class="pb-btn" style="background: var(--color-danger-txt); color: #fff;" onclick="unlockStep(4)">Escalate to MLRO</button>
    </div>
  </div>

  <div class="pb-content" id="tab-4">
    <div class="pb-section-title">Final Case Escalation Report</div>
    <div class="pb-card" style="background: #000; border: 1px solid var(--color-info-txt); font-family: monospace; font-size: 12px; line-height: 1.6; color: #33aaff;">
      <div style="border-bottom: 1px solid #33aaff33; padding-bottom: 8px; margin-bottom: 8px; font-weight: 700;">MLRO CASE SUMMARY #UK-982-ESCAL</div>
      SUBJECT: Global Tech Solutions Ltd<br>
      PRIMARY FLAG: Sanctions Proximity / Adverse Media<br>
      ANALYST SUMMARY: <br>
      I have performed an Enhanced Due Diligence (EDD) review on the subject entity. While the UK entity is clear, UBO 2 (Elena Volkova) presents a high-risk profile due to jurisdictional residence and confirmed adverse media hits. <br><br>
      I have instructed the Relationship Manager to issue an RFI (Request for Information) to the client, specifically requesting:<br>
      1. Source of Wealth (SoW) declaration for UBO 2.<br>
      2. Last 3 months of corporate bank statements to verify transaction flows.<br><br>
      CASE STATUS: ESCALATED TO COMPLIANCE
    </div>

    <div style="margin-top: 32px; text-align: center;">
      <button class="pb-btn" onclick="showComplete()">Submit Case to MLRO</button>
    </div>

    <div id="complete-msg" style="display:none;margin-top:16px;padding:16px;background:var(--color-success-bg);border:1px solid var(--color-success-txt);border-radius:4px;color:var(--color-success-txt);font-weight:600;text-align:center;">
      ✓ Simulation Complete! This proves your practical knowledge of the KYC lifecycle.
    </div>
  </div>
</div>

<script>
  let unlockedSteps = 1;

  function switchTab(step) {
    if (step > unlockedSteps) return;
    document.querySelectorAll('.pb-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-btn-' + step).classList.add('active');
    document.querySelectorAll('.pb-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + step).classList.add('active');
  }

  function unlockStep(step) {
    unlockedSteps = step;
    document.getElementById('tab-btn-' + step).classList.remove('locked');
    switchTab(step);
    const statuses = ["","Status: CDD Review","Status: Screening & Alerts","Status: Risk Assessment","Status: MLRO Escalation"];
    document.getElementById('status-badge').innerText = statuses[step];
  }

  function analyzeHit() {
    const btn = document.getElementById('analyze-btn');
    btn.innerText = "Match Confirmed";
    btn.style.background = "var(--color-bg-base)";
    document.getElementById('hit-analysis').style.display = "block";
  }

  function showComplete() {
    document.getElementById('complete-msg').style.display = "block";
  }
</script>

</body>
</html>`
  },
];

const ModernX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function AuraPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isEmailExpanded, setIsEmailExpanded] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isCareerPanelOpen, setIsCareerPanelOpen] = useState(false);
  const [expandedCareerSkill, setExpandedCareerSkill] = useState<string | null>(null);
  const [expandedAiSkill, setExpandedAiSkill] = useState<string | null>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const identityCardRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [tetherPoints, setTetherPoints] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Measure tether line endpoints
  useEffect(() => {
    const measure = () => {
      const cardEl = identityCardRef.current;
      const carouselEl = carouselRef.current;
      const parentEl = containerRef.current;
      if (!cardEl || !carouselEl || !parentEl) return;

      const parentRect = parentEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const carouselRect = carouselEl.getBoundingClientRect();

      // Stable endpoints based on layout containers, not moving elements
      const startX = cardRect.right - parentRect.left + 30; // 30px space after card
      const startY = cardRect.top + cardRect.height / 2 - parentRect.top;

      // Target the fixed center of the carousel area
      const centerX = carouselRect.left + carouselRect.width / 2 - parentRect.left;
      const centerY = carouselRect.top + carouselRect.height / 2 - parentRect.top;

      // Stop 250px before the carousel center (radius 170px + 80px gap)
      const endX = centerX - 250;
      const endY = centerY;

      setTetherPoints({ x1: startX, y1: startY, x2: endX, y2: endY });
    };

    measure();
    // Re-measure after spring animations settle
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 400);
    const t3 = setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('resize', measure);
    };
  }, [selectedId]); // Removed activeIndex to prevent "stretching" during transitions

  const activeColor = useMemo(() => ITEMS[activeIndex].planetColor, [activeIndex]);

  useEffect(() => {
    if (selectedId) {
      setExpandedId(selectedId);
    } else {
      setIsAiPanelOpen(false);
      setIsCareerPanelOpen(false);
      const timer = setTimeout(() => setExpandedId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedId]);

  const handleNext = useCallback(() => {
    if (selectedId) return;
    setActiveIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
  }, [selectedId]);

  const handlePrev = useCallback(() => {
    if (selectedId) return;
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
      if (e.key === 'Enter' && !selectedId) setSelectedId(ITEMS[activeIndex].id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, selectedId, handleNext, handlePrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedId) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelDebounce.current) return;

      if (e.deltaY > 20 || e.deltaX > 20) {
        handleNext();
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        handlePrev();
      }
      wheelDebounce.current = setTimeout(() => {
        wheelDebounce.current = null;
      }, 450);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [selectedId, handleNext, handlePrev]);

  const selectedItem = ITEMS.find((item) => item.id === selectedId);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#050508] text-white flex items-center justify-center selection:bg-white/20"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient colour blobs — no mix-blend-screen to avoid expensive compositing passes */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f140, #d946ef20, transparent)' }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ background: '#7c3aed20', animationDuration: '12s' }}
        />

        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

        {/* Dust star particles */}
        <DustParticles />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        {/* Neon Tether Line */}
        <AnimatePresence>
          {tetherPoints && !selectedId && (
            <motion.svg
              key="tether"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-[5] pointer-events-none hidden md:block"
              width="100%"
              height="100%"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="aurora-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="aurora-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
                </filter>
                <linearGradient id="aurora-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={activeColor} stopOpacity="0" />
                  <stop offset="10%" stopColor={activeColor} stopOpacity="0.4" />
                  <stop offset="30%" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor={activeColor} stopOpacity="1" />
                  <stop offset="70%" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="90%" stopColor={activeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Generate aurora wave paths */}
              {(() => {
                const x1 = tetherPoints.x1;
                const y1 = tetherPoints.y1;
                const x2 = tetherPoints.x2;
                const y2 = tetherPoints.y2;
                const dx = x2 - x1;
                const dy = y2 - y1;

                // Build a wavy cubic bezier path with N segments
                const buildWavePath = (amplitude: number, freq: number, phaseOffset: number, segments: number = 10) => {
                  const points: string[] = [`M ${x1} ${y1}`];
                  for (let i = 0; i < segments; i++) {
                    const t2 = (i + 1) / segments;
                    const tMid = (i + 0.5) / segments;

                    // Wave calculation
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const nx = -dy / len;
                    const ny = dx / len;

                    const waveMid = Math.sin((tMid * freq + phaseOffset) * Math.PI * 2) * amplitude;
                    const wave2 = Math.sin((t2 * freq + phaseOffset) * Math.PI * 2) * amplitude;

                    const cx = x1 + dx * tMid + nx * waveMid;
                    const cy = y1 + dy * tMid + ny * waveMid;
                    const ex = x1 + dx * t2 + nx * wave2;
                    const ey = y1 + dy * t2 + ny * wave2;

                    points.push(`Q ${cx} ${cy} ${ex} ${ey}`);
                  }
                  return points.join(' ');
                };

                // Configuration for the "bundle" of lines — perfectly looped for zero-jump flow
                const lineConfigs = [
                  { amp: 18, freq: 0.8, phase: 0.0, opacity: 0.35, width: 2.8, dash: 160, gap: 40, speed: 6 },
                  { amp: 28, freq: 0.7, phase: 0.2, opacity: 0.65, width: 1.4, dash: 120, gap: 30, speed: 4 },
                  { amp: 12, freq: 0.9, phase: 0.4, opacity: 0.85, width: 0.8, dash: 100, gap: 50, speed: 3.2 },
                  { amp: 35, freq: 0.6, phase: 0.6, opacity: 0.40, width: 2.2, dash: 200, gap: 60, speed: 5.5 },
                  { amp: 22, freq: 1.0, phase: 0.8, opacity: 0.75, width: 1.0, dash: 80, gap: 40, speed: 3.8 },
                  { amp: 25, freq: 0.7, phase: 0.1, opacity: 0.55, width: 1.8, dash: 220, gap: 30, speed: 5 },
                  { amp: 32, freq: 0.8, phase: 0.3, opacity: 0.90, width: 0.6, dash: 140, gap: 60, speed: 2.8 },
                  { amp: 8, freq: 1.2, phase: 0.5, opacity: 0.80, width: 0.4, dash: 90, gap: 30, speed: 2.5 },
                ];

                return (
                  <motion.g
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 0.5, -0.5, 0] // Subtle global tilt oscillation
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {lineConfigs.map((cfg, idx) => {
                      const period = cfg.dash + cfg.gap;
                      const rollDuration = cfg.speed * 1.5; // Staggered rolling speed
                      return (
                        <motion.path
                          key={idx}
                          d={buildWavePath(cfg.amp, cfg.freq, cfg.phase)}
                          fill="none"
                          stroke="url(#aurora-grad)"
                          strokeWidth={cfg.width}
                          strokeLinecap="round"
                          opacity={cfg.opacity}
                          filter="url(#aurora-glow)"
                          initial={{ pathLength: 0, strokeDashoffset: 0, y: 0 }}
                          animate={{
                            pathLength: 1,
                            strokeDashoffset: [-period, 0],
                            y: [-(idx * 1.5), idx * 1.5, -(idx * 1.5)] // Independent rolling motion
                          }}
                          transition={{
                            pathLength: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 },
                            strokeDashoffset: { duration: cfg.speed, repeat: Infinity, ease: 'linear' },
                            y: { duration: rollDuration, repeat: Infinity, ease: 'easeInOut' }
                          }}
                          style={{
                            strokeDasharray: `${cfg.dash} ${cfg.gap}`,
                          } as React.CSSProperties}
                        />
                      );
                    })}
                  </motion.g>
                );
              })()}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Left — Identity Card */}
        <div className="w-full md:w-[30%] h-full flex items-center justify-center p-8 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
            <div ref={identityCardRef} className="pointer-events-auto w-full">
              <GlassIdentityCard items={ITEMS} activeIndex={activeIndex} />
            </div>

            {/* "Do Not Click" — Holographic Warning Label below the card */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.04, 1],
                y: [0, -3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 pointer-events-none select-none"
            >
              {/* Pixel-art upward arrow */}
              <svg width="20" height="20" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.9))' }}>
                <path d="M2 4H3V3H4V2H5V1H4V2H3V1H2V2H1V1H0V2H1V3H2V4Z" fill="#ef4444" />
              </svg>
              <span
                className="font-mono text-xs font-black uppercase tracking-[0.35em] text-red-500 text-center"
                style={{ textShadow: '0 0 14px rgba(239,68,68,1), 0 0 30px rgba(239,68,68,0.5), 0 0 4px rgba(255,255,255,0.4)' }}
              >
                Do&nbsp;Not&nbsp;Click
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right — Carousel — contain prevents carousel reflows leaking to the rest of the DOM */}
        <div
          ref={carouselRef}
          className="w-full md:w-[70%] h-full flex items-center justify-center relative"
          style={{ contain: 'layout paint' } as React.CSSProperties}
        >
          {ITEMS.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isSelected = selectedId === item.id;
            const isExpanded = expandedId === item.id;
            const isHidden = expandedId !== null && !isExpanded;

            // Pure 2D — only transform+opacity (both compositor-only, zero repaints)
            const x = isExpanded ? 0 : offset * 250;
            const scale = isExpanded ? 1 : 1 - absOffset * 0.18;
            // Steeper opacity falloff replaces the old animated blur (blur = repaint every frame)
            const opacity = isHidden ? 0 : Math.max(1 - absOffset * 0.65, 0);

            return (
              <motion.div
                key={item.id}
                id={`orb-${item.id}`}
                onClick={() => {
                  if (isCenter && !selectedId) {
                    setSelectedId(item.id);
                  } else if (!selectedId) {
                    setActiveIndex(index);
                  }
                }}
                initial={false}
                animate={
                  isExpanded
                    ? { x: 0, scale: 1, opacity: 1 }
                    : { x, scale, opacity }
                }
                style={{
                  zIndex: isExpanded ? 100 : ITEMS.length - absOffset,
                  // Pre-promote to GPU layer so there's no promotion jank at animation start
                  willChange: 'transform, opacity',
                } as React.CSSProperties}
                transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
                className={`absolute flex items-center justify-center cursor-pointer ${isExpanded
                  ? 'fixed inset-0 z-[100] pointer-events-none'
                  : 'w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]'
                  }`}
              >
                {/* Glow + orb container (fixed size so the orb never distorts) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{
                    filter: isCenter ? 'blur(0px)' : `blur(${Math.min(absOffset * 2.5, 5)}px)`,
                    opacity: isCenter ? 1 : 0.6 + (1 - Math.min(absOffset, 1)) * 0.4
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]">

                    {/* Pulsing ambient glow under the orb */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} pointer-events-none`}
                      style={{ filter: 'blur(55px)' } as React.CSSProperties}
                      initial={false}
                      animate={
                        isCenter && !isSelected
                          ? { scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }
                          : { scale: 0.7, opacity: 0 }
                      }
                      transition={
                        isCenter && !isSelected
                          ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.4 }
                      }
                    />

                    {/* Label text */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                      animate={{ opacity: isSelected ? 0 : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-white/75 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] mb-1 drop-shadow-lg">
                        {item.subtitle}
                      </p>
                      <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white drop-shadow-xl">
                        {item.title}
                      </h2>
                    </motion.div>

                    {/* The CSS Glass Orb — flies to modal corner via layoutId */}
                    <motion.div
                      layoutId={`orb-${item.id}`}
                      className="absolute inset-0 z-20"
                      animate={{ opacity: isSelected ? 0 : 1 }}
                      transition={{
                        layout: { type: 'tween', duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.15, delay: isSelected ? 0.06 : 0.32 },
                      }}
                    >
                      <Planet color={item.planetColor} isSelected={false} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="expanded-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal card — Skills gets a cinematic 16:10 grow; Projects gets a cinematic 16:9 grow; others keep scale */}
            {(() => {
              const isSkills = selectedItem.id === 'skills';
              const isProjects = selectedItem.id === 'projects';
              const isCinematic = isSkills || isProjects;

              return (
                <motion.div
                  initial={
                    isCinematic
                      ? { opacity: 0, scale: 0.85, y: 80, rotateX: 12, transformPerspective: 2000, filter: 'blur(20px)' }
                      : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  animate={
                    isCinematic
                      ? { opacity: 1, scale: 1, y: 0, rotateX: 0, transformPerspective: 2000, filter: 'blur(0px)' }
                      : { opacity: 1, scale: 1, y: 0 }
                  }
                  exit={
                    isCinematic
                      ? { opacity: 0, scale: 0.85, y: 80, rotateX: 12, transformPerspective: 2000, filter: 'blur(20px)' }
                      : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  transition={
                    isCinematic
                      ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] } // Buttery tween, no jumping
                      : { delay: 0.05, duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }
                  }
                  className={
                    isCinematic
                      ? `relative rounded-[2.5rem] overflow-hidden border border-white/15 ${selectedItem.id === 'projects' ? 'bg-white/[0.04]' : 'bg-white/[0.06]'} backdrop-blur-3xl flex flex-col shadow-2xl shrink-0`
                      : 'relative w-full h-full max-w-6xl max-h-[820px] rounded-[2.5rem] overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-3xl flex flex-col shadow-2xl'
                  }
                  style={{
                    ...(isSkills
                      ? {
                        width: 'min(85vw, 1440px)',
                        height: 'min(53.125vw, 85vh)',
                        maxWidth: '85vw',
                        maxHeight: '85vh',
                        aspectRatio: '16 / 10',
                        willChange: 'opacity, transform, filter',
                        transform: 'translateZ(0)',
                        transformStyle: 'preserve-3d',
                      }
                      : isProjects
                        ? {
                          width: 'min(92vw, 1600px)',
                          height: 'min(51.75vw, 88vh)',
                          maxWidth: '92vw',
                          maxHeight: '88vh',
                          aspectRatio: '16 / 9',
                          willChange: 'opacity, transform, filter',
                          transform: 'translateZ(0)',
                          transformStyle: 'preserve-3d',
                        }
                        : {}),
                    boxShadow: `inset 0 0 100px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.6)`,
                    backfaceVisibility: 'hidden',
                  } as React.CSSProperties}
                >
                  {/* Tint overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedItem.color} opacity-[0.18] mix-blend-screen pointer-events-none`} />

                  {/* Mini Orb — layout-animated in from the carousel */}
                  <motion.div
                    layoutId={`orb-${selectedItem.id}`}
                    className="absolute z-50 pointer-events-none"
                    style={{ top: '28px', right: '82px', width: '50px', height: '50px' } as React.CSSProperties}
                    transition={{
                      layout: {
                        type: 'tween',
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1]  // Matches modal exactly
                      }
                    }}
                  >
                    <Planet color={selectedItem.planetColor} />
                  </motion.div>

                  {/* Close */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedId(null)}
                    className="absolute top-7 right-7 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center backdrop-blur-md transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Content */}
                  <div className={`relative z-10 flex flex-col h-full ${selectedItem.id === 'projects' ? 'p-0' : 'p-8 sm:p-16 md:p-20'} w-full hide-scrollbar ${selectedItem.id === 'about' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                    <div className={
                      selectedItem.id === 'skills'
                        ? 'w-full flex flex-col items-center text-center'
                        : selectedItem.id === 'projects'
                          ? 'w-full h-full flex flex-row'
                          : selectedItem.id === 'about'
                            ? 'w-full h-full'
                            : 'max-w-3xl'
                    }>
                      {selectedItem.id !== 'projects' && (
                        <>
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                            className="text-white/50 text-sm font-mono uppercase tracking-[0.25em] mb-4"
                          >
                            {selectedItem.subtitle}
                          </motion.p>
                          <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.26 }}
                            className="text-5xl sm:text-7xl md:text-8xl font-display font-light tracking-tighter text-white mb-10"
                          >
                            {selectedItem.title}
                          </motion.h2>
                        </>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`${selectedItem.id === 'projects' ? 'w-full h-full' : 'prose prose-invert prose-lg sm:prose-xl max-w-none'} ${selectedItem.id === 'contact' ? 'flex-1 flex flex-col items-center justify-center overflow-visible' : ''}`}
                      >
                        {selectedItem.id === 'contact' ? (
                          <div className="relative w-full max-w-sm sm:max-w-xl h-[360px] sm:h-[420px] mx-auto mt-6 sm:mt-10 pointer-events-none">

                            {/* Modern X (Twitter) Orb */}
                            <div className="absolute top-0 left-0 sm:left-4 pointer-events-auto">
                              <a
                                href="https://x.com/ilyas8_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110"
                              >
                                <ModernX className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
                              </a>
                            </div>

                            {/* LinkedIn Orb */}
                            <div className="absolute top-0 right-0 sm:right-4 pointer-events-auto">
                              <a
                                href="https://www.linkedin.com/in/ilyas-el-bourari-3615a524a"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110"
                              >
                                <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" strokeWidth={1.5} />
                              </a>
                            </div>

                            {/* Mail Orb (Interactive Email Bar) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto">
                              <div className="relative flex items-center">
                                {/* The Orb itself */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsEmailExpanded(!isEmailExpanded);
                                  }}
                                  className={`relative z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${isEmailExpanded ? 'bg-white/[0.15]' : 'bg-white/[0.05]'} hover:bg-white/[0.15] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110 focus:outline-none`}
                                >
                                  <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" strokeWidth={1.5} />
                                </button>

                                {/* Sliding Email Bar */}
                                <motion.div
                                  initial={{ maxWidth: 0, opacity: 0 }}
                                  animate={{
                                    maxWidth: isEmailExpanded ? 300 : 0,
                                    opacity: isEmailExpanded ? 1 : 0
                                  }}
                                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                                  className="absolute left-[100%] sm:left-[100%] w-[190px] sm:w-[250px] overflow-hidden h-[60px] sm:h-[70px] bg-white/[0.08] backdrop-blur-2xl border-y border-r border-white/20 rounded-r-full flex items-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                                  style={{ zIndex: 10, willChange: 'max-width, transform, opacity' }}
                                >
                                  <div className="pl-4 sm:pl-5 pr-4 w-full flex items-center justify-between whitespace-nowrap overflow-hidden">
                                    <span className="text-white/90 font-mono text-sm sm:text-base mr-3 truncate select-all">
                                      elbourari11@gmail.com
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText("elbourari11@gmail.com");
                                        setHasCopied(true);
                                        setTimeout(() => setHasCopied(false), 2000);
                                      }}
                                      className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                                      title="Copy to clipboard"
                                    >
                                      {hasCopied ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-white/70" />
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        ) : selectedItem.id === 'skills' ? (
                          <div className="flex-1 flex flex-col items-center justify-center gap-5 mt-32 sm:mt-31 pb-12 sm:pb-20">
                            {/* AI Skill Card — toggles left panel */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => setIsAiPanelOpen(v => !v)}
                              className={`w-[144px] sm:w-[195px] h-[60px] sm:h-[70px] rounded-[18px] border backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none ${isAiPanelOpen ? 'bg-emerald-500/15 border-emerald-400/30' : 'bg-white/[0.04] border-white/10 hover:bg-emerald-500/10'}`}
                            >
                              <div className={`absolute inset-0 transition-opacity duration-500 ${isAiPanelOpen ? 'bg-emerald-400/10 opacity-100' : 'bg-emerald-400/5 opacity-40'}`} />
                              <div className="relative h-full flex items-center justify-center">
                                <h3 className="text-emerald-400 text-xl sm:text-2xl font-display font-bold tracking-tight drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] px-4 transform -translate-y-2">
                                  AI
                                </h3>
                              </div>
                            </motion.button>

                            {/* Career Skill Card — toggles right panel */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => setIsCareerPanelOpen(v => !v)}
                              className={`w-[144px] sm:w-[195px] h-[60px] sm:h-[70px] rounded-[18px] border backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none ${isCareerPanelOpen ? 'bg-cyan-500/15 border-cyan-400/30' : 'bg-white/[0.04] border-white/10 hover:bg-cyan-500/10'}`}
                            >
                              <div className={`absolute inset-0 transition-opacity duration-500 ${isCareerPanelOpen ? 'bg-cyan-400/10 opacity-100' : 'bg-cyan-400/5 opacity-40'}`} />
                              <div className="relative h-full flex items-center justify-center">
                                <h3 className="text-cyan-400 text-xl sm:text-2xl font-display font-bold tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] px-4 transform -translate-y-2.5">
                                  Career
                                </h3>
                              </div>
                            </motion.button>
                          </div>
                        ) : selectedItem.id === 'projects' ? (
                          <div className="flex w-full h-full relative overflow-hidden">
                            {/* Main Left Content Area (70%) */}
                            <div className="w-[70%] flex flex-col h-full overflow-hidden relative" style={{ contain: 'layout', transform: 'translateZ(0)' } as React.CSSProperties}>
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeProjectIdx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="w-full h-full flex flex-col p-12 sm:p-20 overflow-y-auto project-scroll gpu-scroll-layer"
                                >
                                  <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-1 px-3 bg-gradient-to-r ${PROJECTS_DATA[activeProjectIdx].color} rounded-full`} />
                                    <span className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                                      {PROJECTS_DATA[activeProjectIdx].marker || `Project ${activeProjectIdx + 1}`}
                                    </span>
                                  </div>

                                  <h2 className="text-6xl sm:text-7xl font-display font-light text-white mb-4 tracking-tighter">
                                    {PROJECTS_DATA[activeProjectIdx].title}
                                  </h2>
                                  <p className="text-xl sm:text-2xl text-white/60 font-medium mb-8 leading-relaxed">
                                    {PROJECTS_DATA[activeProjectIdx].tagline}
                                  </p>

                                  <div className="flex flex-wrap gap-2 mb-12">
                                    {PROJECTS_DATA[activeProjectIdx].tags.map(tag => (
                                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="prose prose-invert prose-lg max-w-none">
                                    <div className="mb-12 whitespace-pre-wrap text-white/70 leading-relaxed text-lg">
                                      {/* Summary Section (If exists) */}
                                      {PROJECTS_DATA[activeProjectIdx].body1?.summary && (
                                        <>
                                          <h3 className="text-white text-3xl font-display mb-6">
                                            {PROJECTS_DATA[activeProjectIdx].body1?.summary?.split('\n\n')[0]}
                                          </h3>
                                          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
                                            <p className="mb-0">{PROJECTS_DATA[activeProjectIdx].body1?.summary?.split('\n\n').slice(1).join('\n\n')}</p>
                                          </div>
                                        </>
                                      )}

                                      {/* Objective Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body1?.objective?.split('\n\n')[0]}
                                      </h3>
                                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
                                        <p className="mb-0">{PROJECTS_DATA[activeProjectIdx].body1?.objective?.split('\n\n').slice(1).join('\n\n')}</p>
                                      </div>

                                      {/* Phase 1 Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body1?.phase1?.split('\n\n')[0]}
                                      </h3>
                                      <p className="mb-8">{PROJECTS_DATA[activeProjectIdx].body1?.phase1?.split('\n\n').slice(1).join('\n\n')}</p>

                                      {/* Interactive Widget or Image 1 */}
                                      <div className="flex justify-center mb-16">
                                        {PROJECTS_DATA[activeProjectIdx].widget ? (
                                          <div className="w-full h-[750px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl relative">
                                            <iframe
                                              srcDoc={PROJECTS_DATA[activeProjectIdx].widget}
                                              className="w-full h-full border-none overflow-hidden"
                                              scrolling="no"
                                              title={PROJECTS_DATA[activeProjectIdx].title}
                                            />
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() => setExpandedImage(PROJECTS_DATA[activeProjectIdx].media)}
                                            className="relative w-[70%] aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl flex items-center justify-center group cursor-zoom-in"
                                          >
                                            {PROJECTS_DATA[activeProjectIdx].media ? (
                                              <Image
                                                src={PROJECTS_DATA[activeProjectIdx].media}
                                                alt="Project Image"
                                                width={1600}
                                                height={900}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                unoptimized
                                              />
                                            ) : (
                                              <p className="text-white/20 font-mono text-sm uppercase tracking-widest px-8 text-center" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {PROJECTS_DATA[activeProjectIdx].mediaPlaceholder}
                                              </p>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                          </div>
                                        )}
                                      </div>

                                      {/* Phase 2 Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body2?.phase2?.split('\n\n')[0]}
                                      </h3>
                                      <p className="mb-8">{PROJECTS_DATA[activeProjectIdx].body2?.phase2?.split('\n\n').slice(1).join('\n\n')}</p>

                                      {/* Image 2 (If exists and no widget) */}
                                      {(!PROJECTS_DATA[activeProjectIdx].widget && (PROJECTS_DATA[activeProjectIdx].media2 || PROJECTS_DATA[activeProjectIdx].mediaPlaceholder2)) && (
                                        <div className="flex justify-center mb-16">
                                          <div
                                            onClick={() => setExpandedImage(PROJECTS_DATA[activeProjectIdx].media2)}
                                            className="relative w-[70%] aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl flex items-center justify-center group cursor-zoom-in"
                                          >
                                            {PROJECTS_DATA[activeProjectIdx].media2 ? (
                                              <Image
                                                src={PROJECTS_DATA[activeProjectIdx].media2}
                                                alt="Project Image 2"
                                                width={1600}
                                                height={1200}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                unoptimized
                                              />
                                            ) : (
                                              <p className="text-white/20 font-mono text-sm uppercase tracking-widest px-8 text-center" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {PROJECTS_DATA[activeProjectIdx].mediaPlaceholder2}
                                              </p>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                          </div>
                                        </div>
                                      )}

                                      {/* Impact Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body2?.impact?.split('\n\n')[0]}
                                      </h3>
                                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-8 mb-20">
                                        <p className="mb-0">{PROJECTS_DATA[activeProjectIdx].body2?.impact?.split('\n\n').slice(1).join('\n\n')}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>

                            {/* Bright, Glassy Vertical Divider - Acting as Right Sidebar Edge */}
                            <div className="relative w-px h-full hidden md:block shrink-0 z-20">
                              {/* Glowing Glassy Line */}
                              <div className="absolute inset-y-8 w-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                              <div className="absolute inset-y-16 -left-[1px] w-[3px] bg-gradient-to-b from-transparent via-white/80 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 blur-[2px] animate-pulse" />
                            </div>

                            {/* Sidebar Right Area (30%) - Positioned near the X button */}
                            <div
                              className="hidden md:flex w-[30%] flex-col p-8 pt-24 h-full overflow-y-auto gpu-scroll-layer shrink-0 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.2)] gap-4"
                            >
                              <div className="px-4 mb-2">
                                <h3 className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">Explore Works</h3>
                              </div>
                              {PROJECTS_DATA.map((project, idx) => (
                                <button
                                  key={project.id}
                                  onClick={() => setActiveProjectIdx(idx)}
                                  className={`group relative w-full p-5 rounded-2xl border text-left transition-all duration-300 ${activeProjectIdx === idx
                                    ? 'bg-white/10 border-white/20 shadow-lg translate-x-1'
                                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/15'
                                    }`}
                                >
                                  {activeProjectIdx === idx && (
                                    <motion.div
                                      layoutId="active-pill"
                                      className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b ${project.color}`}
                                    />
                                  )}
                                  <h4 className={`text-lg font-display font-medium mb-1 transition-colors ${activeProjectIdx === idx ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                                    }`}>
                                    {project.title}
                                  </h4>
                                  <p className="text-xs text-white/40 font-mono line-clamp-1 italic">
                                    {project.tagline}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : selectedItem.id === 'about' ? (
                          <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 w-full h-full overflow-hidden">

                            {/* ── Left: Bio ── */}
                            <div className="relative flex-1 min-w-[300px] flex flex-col justify-center">
                              <div className="relative flex flex-col gap-8">
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I am a Business Management student at{' '}
                                  <span className="text-white font-medium">Vilnius University</span>{' '}
                                  and currently a{' '}
                                  <span
                                    className="font-bold text-white"
                                    style={{ textShadow: '0 0 18px rgba(255,255,255,0.55), 0 0 6px rgba(255,255,255,0.3)' }}
                                  >
                                    Sourcing Operations Intern at Mediq
                                  </span>
                                  .
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.58, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I am a{' '}
                                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    builder at heart
                                  </span>
                                  . While I work in business operations by day, I spend my time diving deep into{' '}
                                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    AI
                                  </span>
                                  .
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.78, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I love the process of taking an idea from zero to a finished project. My goal is to stay ahead of the curve, constantly improving my skills.
                                </motion.p>
                              </div>
                            </div>

                            {/* ── Right: Card Cluster ── */}
                            <div className="flex flex-row items-stretch gap-4 shrink-0">
                              {/* ── Middle: Identity Card ── */}
                              <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="shrink-0 flex flex-col items-center justify-center w-[200px]"
                              >
                                <div className="relative w-full h-[400px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(255,255,255,0.02)]">
                                  {/* Top glow accent */}
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                                  {/* Name block */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Name
                                    </span>
                                    <h3
                                      className="text-2xl font-display font-semibold text-white leading-tight"
                                      style={{ textShadow: '0 0 24px rgba(148,163,255,0.45)' }}
                                    >
                                      Ilyas<br />El Bourari
                                    </h3>
                                  </div>

                                  {/* Divider */}
                                  <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                                  {/* Location block */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Based in
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shrink-0"
                                        style={{ boxShadow: '0 0 8px rgba(96,165,250,0.9)' }}
                                      />
                                      <span className="text-slate-300 font-medium text-base tracking-wide">
                                        Vilnius
                                      </span>
                                    </div>
                                  </div>

                                  {/* Bottom glow accent */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                </div>
                              </motion.div>

                              {/* ── Right: Socials Card ── */}
                              <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="shrink-0 flex flex-col items-center justify-center w-[200px]"
                              >
                                <div className="relative w-full h-[400px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(255,255,255,0.02)]">
                                  {/* Top glow accent */}
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                                  {/* Socials Headline */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Socials
                                    </span>
                                  </div>

                                  {/* Vertical Socials List — Centered */}
                                  <div className="flex-1 flex flex-col items-center justify-center gap-10 w-full relative">
                                    <a href="https://x.com/ilyas8_" target="_blank" rel="noopener noreferrer" className="group">
                                      <ModernX className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/ilyas-el-bourari-3615a524a" target="_blank" rel="noopener noreferrer" className="group">
                                      <Linkedin className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                                    </a>

                                    <div className="relative">
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText('elbourari11@gmail.com');
                                          setHasCopied(true);
                                          setTimeout(() => setHasCopied(false), 2000);
                                        }}
                                        className="group relative"
                                      >
                                        <Mail className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                                      </button>

                                      <AnimatePresence>
                                        {hasCopied && (
                                          <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md whitespace-nowrap"
                                          >
                                            <span className="text-[10px] text-white font-mono uppercase tracking-widest">
                                              Copied!
                                            </span>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>

                                  {/* Bottom glow accent */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                </div>
                              </motion.div>
                            </div>

                          </div>
                        ) : (
                          <div className="prose prose-invert prose-lg sm:prose-xl max-w-none">
                            <p className="text-slate-200 leading-relaxed text-xl sm:text-2xl font-light tracking-wide">
                              {selectedItem.content}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  {/* AI Skills Panel — floats on the left inside the Skills modal */}
                  <AnimatePresence>
                    {selectedItem.id === 'skills' && isAiPanelOpen && (
                      <motion.div
                        key="ai-panel"
                        initial={{ opacity: 0, x: -32, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -32, scale: 0.97 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 28,
                          mass: 0.9,
                          opacity: { duration: 0.25 },
                        }}
                        className="absolute left-6 top-6 bottom-6 w-[38%] z-20 rounded-[1.75rem] overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(32px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.25)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.25)',
                          willChange: 'transform, opacity',
                        } as React.CSSProperties}
                      >
                        {/* Top glare — the defining trait of real glass */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none rounded-t-[1.75rem]"
                          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)' }}
                        />
                        {/* Bottom soft reflection */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none rounded-b-[1.75rem]"
                          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
                        />
                        {/* Content */}
                        <div className="relative h-full flex flex-col p-6 sm:p-8 hide-scrollbar overflow-y-auto gpu-scroll-layer pt-10">
                          <div className="flex flex-col gap-4">
                            {[
                              {
                                id: 'prompt_engineering',
                                title: 'Prompt Engineering & LLM Mastery',
                                skills: [
                                  'Advanced prompt engineering',
                                  'System prompt design & AI persona configuration',
                                  'Prompt chaining & multi-step reasoning workflows',
                                  'Context window management & memory optimization',
                                  'AI output evaluation & iterative refinement',
                                  'Jailbreak awareness & prompt injection understanding',
                                  'Model comparison & selection (Chatgpt, Claude, Gemini, Llama, Mistral)',
                                  'Fine-tuning concepts & RAG (Retrieval-Augmented Generation) basics',
                                  'Embeddings & vector database awareness',
                                  'AI agent design & autonomous workflow building'
                                ]
                              },
                              {
                                id: 'ai_automation',
                                title: 'AI Automation & No-Code Tools',
                                skills: [
                                  'Workflow automation with Make (Integromat) & Zapier',
                                  'Airtable + AI integration for data management',
                                  'Chatbot development & deployment (custom GPTs, Voiceflow, Botpress)',
                                  'API integration with AI services (OpenAI, Anthropic, Replicate)',
                                  'Automated report & document generation',
                                  'AI-powered web scraping & data extraction',
                                  'CRM automation with AI (HubSpot, Notion AI)',
                                  'Automated email & communication workflows'
                                ]
                              },
                              {
                                id: 'ai_visual_creation',
                                title: 'AI Content Creation — Visual',
                                skills: [
                                  'AI image generation (Midjourney, Leonardo, Grok Imagine, Kling, Nano Banana pro, etc.)',
                                  'AI design & brand asset creation (Freepik AI, Adobe Firefly, Canva AI)',
                                  'AI video generation (Sora, Runway ML, Kling, Higgsfield)',
                                  'AI avatar & presenter creation (HeyGen, Synthesia, D-ID)',
                                  'AI photo editing & enhancement (Luminar AI, Topaz, Adobe AI tools)',
                                  'AI background & environment generation',
                                  'Consistent character & brand visual creation across AI tools',
                                  'LoRA training basics for custom style generation',
                                  'ComfyUI & Automatic1111 workflow basics'
                                ]
                              },
                              {
                                id: 'ai_strategy_literacy',
                                title: 'AI Strategy & Literacy',
                                skills: [
                                  'AI tool evaluation & stack selection',
                                  'Staying current with AI research',
                                  'Understanding AI regulation & compliance (EU AI Act)',
                                  'AI ethics & responsible deployment',
                                  'AI product management basics',
                                  'Communicating AI capabilities to non-technical stakeholders'
                                ]
                              }
                            ].map((section, idx) => {
                              const isOpen = expandedAiSkill === section.id;
                              return (
                                <motion.div
                                  key={section.id}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 * (idx + 1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                  className={`flex flex-col border rounded-[1.25rem] transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/[0.04] border-emerald-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}
                                >
                                  <button
                                    onClick={() => setExpandedAiSkill(isOpen ? null : section.id)}
                                    className="w-full flex items-center justify-between p-5 transition-colors focus:outline-none"
                                  >
                                    <div className="flex items-center gap-3 text-left">
                                      <div className={`h-px transition-all duration-500 ease-out shrink-0 ${isOpen ? 'w-8 bg-gradient-to-r from-emerald-400 to-transparent' : 'w-4 bg-white/20'}`} />
                                      <h4 className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${isOpen ? 'text-emerald-400 font-bold drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]' : 'text-white/70 font-medium group-hover:text-white/90'}`}>
                                        {section.title}
                                      </h4>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: isOpen ? 90 : -90, scale: isOpen ? 1 : 0.8 }}
                                      transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                                      className={`shrink-0 transition-colors ${isOpen ? 'text-emerald-400' : 'text-white/30'}`}
                                    >
                                      <ChevronLeft className="w-5 h-5" />
                                    </motion.div>
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, type: 'spring', stiffness: 250, damping: 25 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-5 pb-6 pt-1">
                                          <div className="w-full h-px bg-white/5 mb-5" />
                                          <ul className="space-y-3">
                                            {section.skills.map((skill, i) => (
                                              <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.04 * i, duration: 0.4 }}
                                                className="text-white/70 text-sm font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90"
                                              >
                                                <span className="text-emerald-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">♦</span>
                                                <span>{skill}</span>
                                              </motion.li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              );
                            })}

                            {/* Bottom padding for scrolling within the glass panel */}
                            <div className="h-4 w-full shrink-0" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Career Skills Panel — floats on the right inside the Skills modal */}
                  <AnimatePresence>
                    {selectedItem.id === 'skills' && isCareerPanelOpen && (
                      <motion.div
                        key="career-panel"
                        initial={{ opacity: 0, x: 32, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 32, scale: 0.97 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 28,
                          mass: 0.9,
                          opacity: { duration: 0.25 },
                        }}
                        className="absolute right-6 top-6 bottom-6 w-[38%] z-20 rounded-[1.75rem] overflow-hidden"
                        style={{
                          background: 'rgba(34,211,238,0.06)',
                          backdropFilter: 'blur(32px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                          border: '1px solid rgba(34,211,238,0.3)',
                          boxShadow: 'inset 0 1px 0 rgba(34,211,238,0.35), inset 0 -1px 0 rgba(34,211,238,0.08), 0 0 0 1px rgba(34,211,238,0.06), 0 24px 48px rgba(0,0,0,0.25)',
                          willChange: 'transform, opacity',
                        } as React.CSSProperties}
                      >
                        {/* Top glare — cyan tinted */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none rounded-t-[1.75rem]"
                          style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.04) 60%, transparent 100%)' }}
                        />
                        {/* Bottom soft reflection */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none rounded-b-[1.75rem]"
                          style={{ background: 'linear-gradient(to top, rgba(34,211,238,0.08) 0%, transparent 100%)' }}
                        />
                        {/* Content */}
                        <div className="relative h-full flex flex-col p-6 sm:p-8 hide-scrollbar overflow-y-auto gpu-scroll-layer pt-10">
                          <div className="flex flex-col gap-4">
                            {[
                              {
                                id: 'tech',
                                title: 'Technical Skills',
                                skills: [
                                  'Advanced Microsoft Excel (VLOOKUP, Pivot Tables, Pivot Charts, Macros, Dashboards)',
                                  'Python (scripting, data analysis, automation)',
                                  'SQL (database querying & management)',
                                  'No-code Tools: Make, Airtable',
                                  'ERP Systems (data entry, price management, system accuracy)',
                                  'Financial Data Analysis & Visualization',
                                  'Automated Dashboard Development',
                                  'Financial Modeling & Reporting',
                                  'Data Accuracy & Reconciliation'
                                ]
                              },
                              {
                                id: 'aml',
                                title: 'AML / KYC / Compliance',
                                skills: [
                                  'Customer Due Diligence (CDD) & Enhanced Due Diligence (EDD)',
                                  'Know Your Customer (KYC) onboarding processes',
                                  'Anti-Money Laundering (AML) typologies & red flag identification',
                                  'Sanctions screening awareness (OFAC, EU, UN lists)',
                                  'Transaction monitoring basics',
                                  'Regulatory frameworks: FATF guidelines, EU AML Directives',
                                  'Risk-based approach to client assessment',
                                  'Suspicious Activity Report (SAR) awareness',
                                  'PEP (Politically Exposed Persons) screening',
                                  'Document verification & identity checks'
                                ]
                              },
                              {
                                id: 'finance',
                                title: 'Finance & Banking Ops',
                                skills: [
                                  'Supplier pricing management & procurement data',
                                  'Cross-functional coordination (Data Management, Product Teams)',
                                  'Client documentation processing & compliance',
                                  'Financial reporting support',
                                  'Market research & competitive analysis',
                                  'Operational efficiency & process improvement',
                                  'Data integrity & audit trail maintenance'
                                ]
                              },
                              {
                                id: 'soft',
                                title: 'Soft Skills',
                                skills: [
                                  'Analytical problem-solving & critical thinking',
                                  'Attention to detail & documentation review',
                                  'Professional report drafting & presentation',
                                  'Cross-cultural communication (English, French, Arabic)',
                                  'Adaptability in fast-paced environments',
                                  'Client relationship management'
                                ]
                              }
                            ].map((section, idx) => {
                              const isOpen = expandedCareerSkill === section.id;
                              return (
                                <motion.div
                                  key={section.id}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 * (idx + 1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                  className={`flex flex-col border rounded-[1.25rem] transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white/[0.04] border-cyan-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}
                                >
                                  <button
                                    onClick={() => setExpandedCareerSkill(isOpen ? null : section.id)}
                                    className="w-full flex items-center justify-between p-5 transition-colors focus:outline-none"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`h-px transition-all duration-500 ease-out ${isOpen ? 'w-8 bg-gradient-to-r from-cyan-400 to-transparent' : 'w-4 bg-white/20'}`} />
                                      <h4 className={`font-mono text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${isOpen ? 'text-cyan-400 font-bold drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]' : 'text-white/70 font-medium group-hover:text-white/90'}`}>
                                        {section.title}
                                      </h4>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: isOpen ? 90 : -90, scale: isOpen ? 1 : 0.8 }}
                                      transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                                      className={`transition-colors ${isOpen ? 'text-cyan-400' : 'text-white/30'}`}
                                    >
                                      <ChevronLeft className="w-5 h-5" />
                                    </motion.div>
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {isOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, type: 'spring', stiffness: 250, damping: 25 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-5 pb-6 pt-1">
                                          <div className="w-full h-px bg-white/5 mb-5" />
                                          <ul className="space-y-3">
                                            {section.skills.map((skill, i) => (
                                              <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.04 * i, duration: 0.4 }}
                                                className="text-white/70 text-sm font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90"
                                              >
                                                <span className="text-cyan-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">♦</span>
                                                <span>{skill}</span>
                                              </motion.li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              );
                            })}

                            {/* Bottom padding for scrolling within the glass panel */}
                            <div className="h-4 w-full shrink-0" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav indicators */}
      <AnimatePresence>
        {!selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20"
          >
            <button
              id="nav-prev"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-3 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 backdrop-blur-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2.5">
              {ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  id={`nav-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>

            <button
              id="nav-next"
              onClick={handleNext}
              disabled={activeIndex === ITEMS.length - 1}
              className="p-3 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 backdrop-blur-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Image Modal — High-end lightbox */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-20 backdrop-blur-[32px] bg-black/80"
            onClick={() => setExpandedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 sm:top-12 sm:right-12 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] z-[110]"
              onClick={() => setExpandedImage(null)}
            >
              <CloseIcon className="w-7 h-7 text-white" />
            </motion.button>

            {/* Expanded Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-[95vw] h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt="Expanded View"
                width={2048}
                height={1152}
                className="w-full h-full object-contain rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,1)] border border-white/10"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
