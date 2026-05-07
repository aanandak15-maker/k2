// src/data/applicabilityRules.ts
var APPLICABILITY_RULES = [
  {
    "ruleId": "R-001",
    "complianceId": "ROC-AOC4",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs file AOC-4."
  },
  {
    "ruleId": "R-002",
    "complianceId": "ROC-MGT7",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs file MGT-7."
  },
  {
    "ruleId": "R-003",
    "complianceId": "ROC-DIR3KYC",
    "conditionField": "director.din_status",
    "operator": "=",
    "value": "Active",
    "logicNote": "Per active director."
  },
  {
    "ruleId": "R-004",
    "complianceId": "ROC-ADT1",
    "conditionField": "event",
    "operator": "=",
    "value": "Auditor Appointed/Reappointed",
    "logicNote": "Event-driven."
  },
  {
    "ruleId": "R-005",
    "complianceId": "ROC-DIR12",
    "conditionField": "event",
    "operator": "=",
    "value": "Director Change",
    "logicNote": "Event-driven."
  },
  {
    "ruleId": "R-006",
    "complianceId": "ROC-MGT14",
    "conditionField": "event",
    "operator": "=",
    "value": "Resolution Passed (specified)",
    "logicNote": "Event-driven."
  },
  {
    "ruleId": "R-010",
    "complianceId": "ID-GST-REG",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "40,00,000",
    "logicNote": "Mandatory above threshold."
  },
  {
    "ruleId": "R-011",
    "complianceId": "GST-3B",
    "conditionField": "fpo.gstin",
    "operator": "exists",
    "value": "true",
    "logicNote": "Required if GST-registered."
  },
  {
    "ruleId": "R-012",
    "complianceId": "GST-1",
    "conditionField": "fpo.gstin",
    "operator": "exists",
    "value": "true",
    "logicNote": "Monthly if turnover > \u20B95Cr; else QRMP quarterly."
  },
  {
    "ruleId": "R-013",
    "complianceId": "GST-9",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "2,00,00,000",
    "logicNote": "Required above \u20B92 Cr turnover."
  },
  {
    "ruleId": "R-014",
    "complianceId": "GST-9C",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "5,00,00,000",
    "logicNote": "Required above \u20B95 Cr turnover."
  },
  {
    "ruleId": "R-020",
    "complianceId": "ID-TAN",
    "conditionField": "fpo.deducts_tds",
    "operator": "=",
    "value": "true",
    "logicNote": "Required if FPO deducts TDS."
  },
  {
    "ruleId": "R-021",
    "complianceId": "TDS-Q",
    "conditionField": "fpo.tan",
    "operator": "exists",
    "value": "true",
    "logicNote": "Quarterly per TAN holder."
  },
  {
    "ruleId": "R-022",
    "complianceId": "TAX-ITR",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs file ITR-6."
  },
  {
    "ruleId": "R-023",
    "complianceId": "TAX-AUDIT",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "1,00,00,000",
    "logicNote": "Threshold \u20B91 Cr (\u20B910 Cr digital)."
  },
  {
    "ruleId": "R-024",
    "complianceId": "TAX-ADV",
    "conditionField": "fpo.estimated_tax",
    "operator": ">",
    "value": "10,000",
    "logicNote": "Quarterly advance tax."
  },
  {
    "ruleId": "R-030",
    "complianceId": "AUD-STAT",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "Mandatory for all PCs."
  },
  {
    "ruleId": "R-031",
    "complianceId": "AUD-INT",
    "conditionField": "fpo.paid_up_capital",
    "operator": ">",
    "value": "50,00,00,000",
    "logicNote": "Or turnover > \u20B9200 Cr."
  },
  {
    "ruleId": "R-032",
    "complianceId": "AUD-COSTAUD",
    "conditionField": "fpo.sector",
    "operator": "in",
    "value": "Regulated List",
    "logicNote": "Sector + turnover > \u20B935 Cr."
  },
  {
    "ruleId": "R-040",
    "complianceId": "GOV-AGM",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs."
  },
  {
    "ruleId": "R-041",
    "complianceId": "GOV-BOD",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "Min 4 / year, gap \u2264 120 days."
  },
  {
    "ruleId": "R-042",
    "complianceId": "GOV-MIN",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs."
  },
  {
    "ruleId": "R-043",
    "complianceId": "GOV-DECISION",
    "conditionField": "fpo.has_open_resolutions",
    "operator": "=",
    "value": "true",
    "logicNote": "Track per resolution."
  },
  {
    "ruleId": "R-050",
    "complianceId": "LAB-EPF",
    "conditionField": "fpo.employee_count",
    "operator": ">=",
    "value": "20",
    "logicNote": "EPF threshold."
  },
  {
    "ruleId": "R-051",
    "complianceId": "LAB-ESI",
    "conditionField": "fpo.employee_count",
    "operator": ">=",
    "value": "10",
    "logicNote": "ESI threshold + wage check."
  },
  {
    "ruleId": "R-052",
    "complianceId": "LAB-PT",
    "conditionField": "fpo.state",
    "operator": "in",
    "value": "MH,KA,WB,GJ,TN,AP,TS,KL,AS,MN,ML,MZ,NL,TR,SK,OR,JH,BR",
    "logicNote": "PT-levying states only."
  },
  {
    "ruleId": "R-053",
    "complianceId": "LAB-GRAT",
    "conditionField": "fpo.employee_count",
    "operator": ">=",
    "value": "10",
    "logicNote": "Gratuity Act applicability."
  },
  {
    "ruleId": "R-054",
    "complianceId": "LAB-SHOPS",
    "conditionField": "fpo.has_commercial_premises",
    "operator": "=",
    "value": "true",
    "logicNote": "All commercial establishments."
  },
  {
    "ruleId": "R-060",
    "complianceId": "LIC-FSSAI",
    "conditionField": "fpo.handles_food",
    "operator": "=",
    "value": "true",
    "logicNote": "Food handling FPOs."
  },
  {
    "ruleId": "R-061",
    "complianceId": "LIC-SEED",
    "conditionField": "fpo.sells_seeds",
    "operator": "=",
    "value": "true",
    "logicNote": "Input-business FPOs."
  },
  {
    "ruleId": "R-062",
    "complianceId": "LIC-FERT",
    "conditionField": "fpo.sells_fertilisers",
    "operator": "=",
    "value": "true",
    "logicNote": "Input-business FPOs."
  },
  {
    "ruleId": "R-063",
    "complianceId": "LIC-PEST",
    "conditionField": "fpo.sells_pesticides",
    "operator": "=",
    "value": "true",
    "logicNote": "Input-business FPOs."
  },
  {
    "ruleId": "R-064",
    "complianceId": "LIC-IEC",
    "conditionField": "fpo.does_export_import",
    "operator": "=",
    "value": "true",
    "logicNote": "Trade FPOs."
  },
  {
    "ruleId": "R-065",
    "complianceId": "LIC-APEDA",
    "conditionField": "fpo.exports_scheduled_products",
    "operator": "=",
    "value": "true",
    "logicNote": "Export-FPOs."
  },
  {
    "ruleId": "R-066",
    "complianceId": "LIC-ORGANIC",
    "conditionField": "fpo.markets_organic",
    "operator": "=",
    "value": "true",
    "logicNote": "Organic-FPOs."
  },
  {
    "ruleId": "R-067",
    "complianceId": "LIC-WAREHOUSE",
    "conditionField": "fpo.operates_warehouse",
    "operator": "=",
    "value": "true",
    "logicNote": "Optional WDRA."
  },
  {
    "ruleId": "R-068",
    "complianceId": "LIC-MANDI",
    "conditionField": "fpo.trades_in_apmc",
    "operator": "=",
    "value": "true",
    "logicNote": "State-dependent."
  },
  {
    "ruleId": "R-069",
    "complianceId": "LIC-POLLUTION",
    "conditionField": "fpo.has_processing_unit",
    "operator": "=",
    "value": "true",
    "logicNote": "Processing FPOs only."
  },
  {
    "ruleId": "R-070",
    "complianceId": "LIC-PANCHAYAT",
    "conditionField": "fpo.has_premises",
    "operator": "=",
    "value": "true",
    "logicNote": "All FPOs with premises."
  },
  {
    "ruleId": "R-080",
    "complianceId": "ID-PAN",
    "conditionField": "fpo.type",
    "operator": "exists",
    "value": "true",
    "logicNote": "All FPOs."
  },
  {
    "ruleId": "R-081",
    "complianceId": "ID-BANK",
    "conditionField": "fpo.type",
    "operator": "exists",
    "value": "true",
    "logicNote": "All FPOs."
  },
  {
    "ruleId": "R-090",
    "complianceId": "SCH-EQUITY",
    "conditionField": "fpo.equity_grant_received",
    "operator": "=",
    "value": "true",
    "logicNote": "SFAC equity grant FPOs."
  },
  {
    "ruleId": "R-091",
    "complianceId": "SCH-CGS",
    "conditionField": "fpo.has_cgs_loan",
    "operator": "=",
    "value": "true",
    "logicNote": "CGS-backed loans."
  },
  {
    "ruleId": "R-092",
    "complianceId": "SCH-NABARD",
    "conditionField": "fpo.promoter",
    "operator": "=",
    "value": "NABARD",
    "logicNote": "NABARD-promoted FPOs."
  },
  {
    "ruleId": "R-093",
    "complianceId": "SCH-SFAC",
    "conditionField": "fpo.promoter",
    "operator": "=",
    "value": "SFAC",
    "logicNote": "SFAC-promoted FPOs."
  },
  {
    "ruleId": "R-094",
    "complianceId": "SCH-MIDH",
    "conditionField": "fpo.midh_grant_received",
    "operator": "=",
    "value": "true",
    "logicNote": "MIDH grant FPOs."
  },
  {
    "ruleId": "R-100",
    "complianceId": "MEM-KYC",
    "conditionField": "fpo.type",
    "operator": "=",
    "value": "Producer Company",
    "logicNote": "All PCs; per member."
  },
  {
    "ruleId": "R-101",
    "complianceId": "MEM-SHARE",
    "conditionField": "event",
    "operator": "=",
    "value": "New Member / Share Allotment",
    "logicNote": "Event-driven."
  },
  {
    "ruleId": "R-102",
    "complianceId": "MEM-PATRON",
    "conditionField": "fpo.declares_patronage",
    "operator": "=",
    "value": "true",
    "logicNote": "Annual."
  },
  {
    "ruleId": "R-110",
    "complianceId": "INS-PROP",
    "conditionField": "fpo.has_assets_to_insure",
    "operator": "=",
    "value": "true",
    "logicNote": "Soft compliance."
  },
  {
    "ruleId": "R-111",
    "complianceId": "INS-CROP",
    "conditionField": "fpo.facilitates_crop_insurance",
    "operator": "=",
    "value": "true",
    "logicNote": "Service to members."
  },
  {
    "ruleId": "R-120",
    "complianceId": "REC-BOOKS",
    "conditionField": "fpo.type",
    "operator": "exists",
    "value": "true",
    "logicNote": "All FPOs."
  },
  {
    "ruleId": "R-121",
    "complianceId": "REC-AUDIT-TRAIL",
    "conditionField": "fpo.uses_accounting_software",
    "operator": "=",
    "value": "true",
    "logicNote": "Mandatory since 1 Apr 2023."
  }
];

// src/data/complianceCatalog.ts
var COMPLIANCE_CATALOG = [
  {
    "complianceId": "ROC-AOC4",
    "name": "AOC-4 \u2014 Annual Financial Statement Filing",
    "category": "CAT-ROC",
    "authority": "MCA / ROC",
    "frequency": "Annual",
    "dueRule": "Within 30 days of AGM",
    "appliesTo": "All Producer Companies (registered under Companies Act)",
    "requiredDocuments": [
      "Audited Balance Sheet",
      "P&L",
      "Auditor's Report",
      "Board's Report"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late fee \u20B9100/day; possible director disqualification",
    "notes": "Must be filed via MCA portal."
  },
  {
    "complianceId": "ROC-MGT7",
    "name": "MGT-7 \u2014 Annual Return Filing",
    "category": "CAT-ROC",
    "authority": "MCA / ROC",
    "frequency": "Annual",
    "dueRule": "Within 60 days of AGM",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "List of members",
      "directors",
      "shareholding pattern",
      "AGM minutes"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late fee \u20B9100/day; non-compliance affects loan/grant eligibility",
    "notes": "Must be digitally signed by Director + CS/CA."
  },
  {
    "complianceId": "ROC-DIR3KYC",
    "name": "DIR-3 KYC \u2014 Director KYC",
    "category": "CAT-ROC",
    "authority": "MCA",
    "frequency": "Annual",
    "dueRule": "By 30 September every year",
    "appliesTo": "Every director with active DIN",
    "requiredDocuments": [
      "PAN",
      "Aadhaar",
      "address proof",
      "mobile/email verification",
      "DSC"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "DIN deactivation; \u20B95,000 fee for reactivation",
    "notes": "Director cannot sign filings if DIN is deactivated."
  },
  {
    "complianceId": "ROC-ADT1",
    "name": "ADT-1 \u2014 Auditor Appointment Filing",
    "category": "CAT-ROC",
    "authority": "MCA",
    "frequency": "Event-Based",
    "dueRule": "Within 15 days of AGM appointing auditor",
    "appliesTo": "All Producer Companies on auditor appointment/reappointment",
    "requiredDocuments": [
      "Board resolution",
      "AGM resolution",
      "auditor consent letter"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Penalty up to \u20B95 lakh; auditor appointment invalid",
    "notes": "Required even on reappointment."
  },
  {
    "complianceId": "ROC-DIR12",
    "name": "DIR-12 \u2014 Director Appointment / Cessation",
    "category": "CAT-ROC",
    "authority": "MCA",
    "frequency": "Event-Based",
    "dueRule": "Within 30 days of change",
    "appliesTo": "All Producer Companies on any director change",
    "requiredDocuments": [
      "Board resolution",
      "consent letter",
      "DIR-2",
      "ID proof"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "\u20B9100/day late fee",
    "notes": "Auto-trigger from Members & Directors module (Slide 9)."
  },
  {
    "complianceId": "ROC-MGT14",
    "name": "MGT-14 \u2014 Filing of Resolutions",
    "category": "CAT-ROC",
    "authority": "MCA",
    "frequency": "Event-Based",
    "dueRule": "Within 30 days of passing resolution",
    "appliesTo": "Producer Companies passing special / Board resolutions requiring filing",
    "requiredDocuments": [
      "Certified true copy of resolution",
      "explanatory statement"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "\u20B9100/day late fee",
    "notes": "Applies to specified resolutions only \u2014 check rule list."
  },
  {
    "complianceId": "GST-3B",
    "name": "GSTR-3B \u2014 Monthly Summary Return",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Monthly",
    "dueRule": "20th of next month",
    "appliesTo": "FPOs with GST registration",
    "requiredDocuments": [
      "Sales summary",
      "ITC computation",
      "tax challan"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late fee \u20B950/day + 18% interest on tax due",
    "notes": "Most frequent compliance \u2014 drives monthly task generation."
  },
  {
    "complianceId": "GST-1",
    "name": "GSTR-1 \u2014 Outward Supplies Return",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Monthly",
    "dueRule": "11th of next month",
    "appliesTo": "GST-registered FPOs (turnover > \u20B95 Cr); Quarterly if QRMP scheme",
    "requiredDocuments": [
      "Sales invoice details",
      "B2B/B2C breakup"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late fee \u20B950/day; blocks buyer's ITC",
    "notes": "Quarterly under QRMP \u2014 check FPO profile."
  },
  {
    "complianceId": "GST-9",
    "name": "GSTR-9 \u2014 Annual Return",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Annual",
    "dueRule": "31st December of next FY",
    "appliesTo": "GST-registered FPOs (turnover > \u20B92 Cr)",
    "requiredDocuments": [
      "Reconciliation of GSTR-1",
      "GSTR-3B",
      "books of accounts"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Late fee \u20B9200/day (capped)",
    "notes": "Auto-populated from monthly returns."
  },
  {
    "complianceId": "GST-9C",
    "name": "GSTR-9C \u2014 Reconciliation Statement",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Annual",
    "dueRule": "31st December of next FY",
    "appliesTo": "GST-registered FPOs with turnover > \u20B95 Cr",
    "requiredDocuments": [
      "Reconciliation between audited financials and GSTR-9"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "General penalty up to \u20B925,000",
    "notes": "Self-certified; no CA audit required post-2021."
  },
  {
    "complianceId": "TDS-Q",
    "name": "TDS Quarterly Return (24Q / 26Q)",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Quarterly",
    "dueRule": "31st of month following quarter end",
    "appliesTo": "FPOs deducting TDS on salaries / contractor payments",
    "requiredDocuments": [
      "TDS challans",
      "deductee details",
      "Form 16/16A"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "\u20B9200/day late fee; disallowance of expense",
    "notes": "Triggered if FPO has employees or vendor payments > threshold."
  },
  {
    "complianceId": "TAX-ITR",
    "name": "Income Tax Return (ITR-7 / ITR-6)",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Annual",
    "dueRule": "31st October (audit cases) / 31st July (non-audit)",
    "appliesTo": "All registered FPOs",
    "requiredDocuments": [
      "Audited financials",
      "tax audit report (if applicable)",
      "donation receipts"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late filing fee \u20B95,000\u2013\u20B910,000; loss carry-forward denied",
    "notes": "Producer Companies file ITR-6."
  },
  {
    "complianceId": "TAX-AUDIT",
    "name": "Tax Audit Report (Form 3CA/3CB + 3CD)",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Annual",
    "dueRule": "30th September",
    "appliesTo": "FPOs with turnover > \u20B91 Cr (or \u20B910 Cr digital)",
    "requiredDocuments": [
      "Tax audit report by CA",
      "books of accounts"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Penalty 0.5% of turnover (max \u20B91.5 lakh)",
    "notes": "Threshold check from FPO turnover field."
  },
  {
    "complianceId": "TAX-ADV",
    "name": "Advance Tax Payment",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Quarterly",
    "dueRule": "15 Jun, 15 Sep, 15 Dec, 15 Mar",
    "appliesTo": "FPOs with tax liability > \u20B910,000 in a year",
    "requiredDocuments": [
      "Advance tax challan"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Interest u/s 234B and 234C",
    "notes": "Auto-reminder 7 days before each due date."
  },
  {
    "complianceId": "AUD-STAT",
    "name": "Statutory Audit",
    "category": "CAT-AUD",
    "authority": "ICAI / Auditor",
    "frequency": "Annual",
    "dueRule": "Before AGM (within 6 months of FY end)",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Audited financial statements",
      "audit report",
      "management letter"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Cannot file ROC returns without audit; grant/loan ineligibility",
    "notes": "Auditor appointed via ADT-1."
  },
  {
    "complianceId": "AUD-INT",
    "name": "Internal Audit",
    "category": "CAT-AUD",
    "authority": "ICAI / Internal Auditor",
    "frequency": "Annual",
    "dueRule": "As prescribed in Articles / Board policy",
    "appliesTo": "Producer Companies with paid-up capital > \u20B950 Cr or turnover > \u20B9200 Cr",
    "requiredDocuments": [
      "Internal audit report",
      "action taken report"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "General non-compliance penalty",
    "notes": "Most small FPOs are exempt; check thresholds."
  },
  {
    "complianceId": "AUD-COSTAUD",
    "name": "Cost Audit",
    "category": "CAT-AUD",
    "authority": "ICAI / Cost Auditor",
    "frequency": "Annual",
    "dueRule": "Within 30 days of receipt of cost audit report",
    "appliesTo": "FPOs in regulated sectors with turnover > \u20B935 Cr",
    "requiredDocuments": [
      "Cost audit report",
      "CRA-3",
      "CRA-4 filing"
    ],
    "severity": "Low",
    "penaltyForNonCompliance": "Penalty up to \u20B95 lakh",
    "notes": "Rare for FPOs \u2014 flag only if applicable sector."
  },
  {
    "complianceId": "GOV-AGM",
    "name": "Annual General Meeting (AGM)",
    "category": "CAT-GOV",
    "authority": "Companies Act",
    "frequency": "Annual",
    "dueRule": "Within 6 months of FY end (by 30 September)",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "AGM notice (21 days prior)",
      "attendance register",
      "minutes",
      "resolutions"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Penalty up to \u20B91 lakh + \u20B95,000/day",
    "notes": "Notice generation should be one-click in app."
  },
  {
    "complianceId": "GOV-BOD",
    "name": "Board Meetings",
    "category": "CAT-GOV",
    "authority": "Companies Act",
    "frequency": "Quarterly",
    "dueRule": "Min. 4 meetings per year, gap \u2264 120 days",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Notice",
      "agenda",
      "attendance register",
      "signed minutes"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Penalty \u20B925,000 per officer in default",
    "notes": "Track gap between meetings (\u2264120 days rule)."
  },
  {
    "complianceId": "GOV-MIN",
    "name": "Maintenance of Statutory Registers",
    "category": "CAT-GOV",
    "authority": "Companies Act",
    "frequency": "Annual",
    "dueRule": "Continuous; verified at AGM",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Register of Members",
      "Directors",
      "Charges",
      "Contracts",
      "Loans"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "\u20B93\u2013\u20B95 lakh penalty",
    "notes": "Often missed by FPOs \u2014 flag in audit checks."
  },
  {
    "complianceId": "GOV-DECISION",
    "name": "Board / AGM Decision Compliance",
    "category": "CAT-GOV",
    "authority": "Internal",
    "frequency": "Event-Based",
    "dueRule": "As per resolution timeline",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Resolution copy",
      "action taken report",
      "supporting evidence"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Governance gap; affects audit observations",
    "notes": "K2 differentiator \u2014 track decision \u2192 execution."
  },
  {
    "complianceId": "LAB-EPF",
    "name": "EPF Monthly Contribution & Return",
    "category": "CAT-LAB",
    "authority": "EPFO",
    "frequency": "Monthly",
    "dueRule": "15th of next month",
    "appliesTo": "FPOs with \u2265 20 employees",
    "requiredDocuments": [
      "EPF challan",
      "ECR (Electronic Challan-cum-Return)"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Damages 5\u201325% + 12% interest",
    "notes": "Threshold check from employee count."
  },
  {
    "complianceId": "LAB-ESI",
    "name": "ESI Monthly Contribution & Return",
    "category": "CAT-LAB",
    "authority": "ESIC",
    "frequency": "Monthly",
    "dueRule": "15th of next month",
    "appliesTo": "FPOs with \u2265 10 employees and wage threshold",
    "requiredDocuments": [
      "ESI challan",
      "return"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "12% interest + damages up to 25%",
    "notes": "Applicable wage threshold \u2014 check state notification."
  },
  {
    "complianceId": "LAB-PT",
    "name": "Professional Tax Filing",
    "category": "CAT-LAB",
    "authority": "State Govt",
    "frequency": "Monthly / Annual",
    "dueRule": "Varies by state",
    "appliesTo": "FPOs in states levying PT (MH, KA, WB, etc.)",
    "requiredDocuments": [
      "PT challan",
      "return"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Late fee + interest as per state law",
    "notes": "MP currently exempt; flag based on FPO state."
  },
  {
    "complianceId": "LAB-GRAT",
    "name": "Gratuity Compliance",
    "category": "CAT-LAB",
    "authority": "Payment of Gratuity Act",
    "frequency": "Event-Based",
    "dueRule": "On employee separation",
    "appliesTo": "FPOs with \u2265 10 employees",
    "requiredDocuments": [
      "Gratuity calculation",
      "payment proof",
      "Form L"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Interest + penalty under Act",
    "notes": "Provision tracking in books required."
  },
  {
    "complianceId": "LAB-SHOPS",
    "name": "Shops & Establishment Registration",
    "category": "CAT-LAB",
    "authority": "State Labour Dept",
    "frequency": "One-Time + Renewal",
    "dueRule": "Within 30 days of starting; renewal as per state",
    "appliesTo": "All FPOs operating from a commercial premises",
    "requiredDocuments": [
      "Registration certificate",
      "employee list",
      "premises proof"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "\u20B95,000\u2013\u20B950,000 penalty",
    "notes": "One-time then periodic renewal."
  },
  {
    "complianceId": "LIC-FSSAI",
    "name": "FSSAI License / Registration",
    "category": "CAT-LIC",
    "authority": "FSSAI",
    "frequency": "Renewal (1\u20135 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs handling food products (processing, packaging, sale)",
    "requiredDocuments": [
      "FSSAI certificate",
      "premises proof",
      "food safety plan"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "\u20B92 lakh penalty + business shutdown",
    "notes": "Renewal alert 90 days before expiry."
  },
  {
    "complianceId": "LIC-SEED",
    "name": "Seed License",
    "category": "CAT-LIC",
    "authority": "State Agri Dept",
    "frequency": "Renewal (3 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs selling seeds to members",
    "requiredDocuments": [
      "Seed license",
      "source certificates",
      "sales register"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "License cancellation; criminal action",
    "notes": "Common for input-business FPOs."
  },
  {
    "complianceId": "LIC-FERT",
    "name": "Fertiliser License",
    "category": "CAT-LIC",
    "authority": "State Agri Dept",
    "frequency": "Renewal (3 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs selling fertilisers",
    "requiredDocuments": [
      "Fertiliser license",
      "stock register",
      "source proof"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "License cancellation; \u20B950,000 penalty",
    "notes": "Common for input-business FPOs."
  },
  {
    "complianceId": "LIC-PEST",
    "name": "Pesticide License",
    "category": "CAT-LIC",
    "authority": "State Agri Dept",
    "frequency": "Renewal (2 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs selling pesticides",
    "requiredDocuments": [
      "Pesticide license",
      "qualified person certificate",
      "stock register"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "License cancellation; criminal action",
    "notes": "Requires qualified personnel \u2014 flag separately."
  },
  {
    "complianceId": "LIC-IEC",
    "name": "IEC \u2014 Import Export Code",
    "category": "CAT-LIC",
    "authority": "DGFT",
    "frequency": "One-Time + Annual Update",
    "dueRule": "Annual update by 30 June",
    "appliesTo": "FPOs engaged in import/export",
    "requiredDocuments": [
      "IEC certificate",
      "PAN",
      "bank certificate",
      "address proof"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "IEC deactivation if not updated",
    "notes": "Annual update mandatory post-2021."
  },
  {
    "complianceId": "LIC-APEDA",
    "name": "APEDA Registration (RCMC)",
    "category": "CAT-LIC",
    "authority": "APEDA",
    "frequency": "Renewal (5 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs exporting scheduled agricultural products",
    "requiredDocuments": [
      "RCMC certificate",
      "IEC",
      "bank details"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Loss of export incentives",
    "notes": "Required for export benefits / subsidies."
  },
  {
    "complianceId": "LIC-ORGANIC",
    "name": "Organic Certification (NPOP / PGS)",
    "category": "CAT-LIC",
    "authority": "APEDA / PGS-India",
    "frequency": "Renewal (1\u20133 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs marketing produce as organic",
    "requiredDocuments": [
      "Certification",
      "inspection report",
      "traceability records"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Loss of organic premium pricing; legal action",
    "notes": "Big differentiator for organic-focused FPOs."
  },
  {
    "complianceId": "LIC-WAREHOUSE",
    "name": "Warehouse License (WDRA)",
    "category": "CAT-LIC",
    "authority": "WDRA",
    "frequency": "Renewal (varies)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs operating registered warehouses",
    "requiredDocuments": [
      "WDRA registration",
      "infrastructure proof"
    ],
    "severity": "Low",
    "penaltyForNonCompliance": "Loss of WDRA benefits / NWR access",
    "notes": "Optional but enables negotiable warehouse receipts."
  },
  {
    "complianceId": "LIC-MANDI",
    "name": "Mandi / APMC License",
    "category": "CAT-LIC",
    "authority": "State APMC",
    "frequency": "Annual",
    "dueRule": "Before expiry / annual renewal",
    "appliesTo": "FPOs trading in notified mandi area",
    "requiredDocuments": [
      "APMC license",
      "premises proof"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Trading not permitted without license",
    "notes": "State-specific; some states have abolished APMC monopoly."
  },
  {
    "complianceId": "LIC-POLLUTION",
    "name": "Pollution Control NOC (CTE/CTO)",
    "category": "CAT-LIC",
    "authority": "State PCB",
    "frequency": "Renewal (5 yrs)",
    "dueRule": "Before expiry",
    "appliesTo": "FPOs with processing units / effluent generation",
    "requiredDocuments": [
      "Consent to Establish/Operate",
      "ETP design"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Closure notice; penalty",
    "notes": "Applies only to processing FPOs."
  },
  {
    "complianceId": "LIC-PANCHAYAT",
    "name": "Panchayat / Municipal NOC",
    "category": "CAT-LIC",
    "authority": "Local Body",
    "frequency": "Renewal (1 yr)",
    "dueRule": "Annual",
    "appliesTo": "FPOs operating from village / urban premises",
    "requiredDocuments": [
      "NOC certificate",
      "premises proof"
    ],
    "severity": "Low",
    "penaltyForNonCompliance": "Notice from local body",
    "notes": "Often overlooked; low cost to obtain."
  },
  {
    "complianceId": "ID-PAN",
    "name": "PAN Registration",
    "category": "CAT-STA",
    "authority": "Income Tax Dept",
    "frequency": "One-Time",
    "dueRule": "At incorporation",
    "appliesTo": "All FPOs",
    "requiredDocuments": [
      "PAN card"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Cannot operate bank account / file returns",
    "notes": "Foundational \u2014 verified at FPO onboarding."
  },
  {
    "complianceId": "ID-TAN",
    "name": "TAN Registration",
    "category": "CAT-STA",
    "authority": "Income Tax Dept",
    "frequency": "One-Time",
    "dueRule": "Before deducting TDS",
    "appliesTo": "FPOs deducting TDS",
    "requiredDocuments": [
      "TAN certificate"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Cannot deposit TDS; \u20B910,000 penalty",
    "notes": "Required for TDS compliance chain."
  },
  {
    "complianceId": "ID-GST-REG",
    "name": "GST Registration",
    "category": "CAT-STA",
    "authority": "GSTN",
    "frequency": "One-Time",
    "dueRule": "Within 30 days of crossing turnover threshold",
    "appliesTo": "FPOs with turnover > \u20B940 lakh (goods) / \u20B920 lakh (services)",
    "requiredDocuments": [
      "GSTIN certificate",
      "principal place of business"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "\u20B910,000 or tax due (whichever higher)",
    "notes": "Voluntary registration also tracked."
  },
  {
    "complianceId": "ID-BANK",
    "name": "Current Account & Banking Compliance",
    "category": "CAT-STA",
    "authority": "Bank / RBI",
    "frequency": "One-Time + Periodic KYC",
    "dueRule": "KYC update as per bank cycle",
    "appliesTo": "All FPOs",
    "requiredDocuments": [
      "Account opening",
      "KYC docs",
      "board resolution"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Account freeze on KYC lapse",
    "notes": "Re-KYC every 2\u20138 years depending on risk."
  },
  {
    "complianceId": "SCH-EQUITY",
    "name": "Equity Grant Utilisation Report (SFAC)",
    "category": "CAT-SCH",
    "authority": "SFAC",
    "frequency": "Annual",
    "dueRule": "As per sanction terms",
    "appliesTo": "FPOs availing SFAC Equity Grant Scheme",
    "requiredDocuments": [
      "Utilisation certificate",
      "audited financials",
      "member matching contribution proof"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Grant recall; blacklisting",
    "notes": "Equity grant treated as liability, not income."
  },
  {
    "complianceId": "SCH-CGS",
    "name": "Credit Guarantee Scheme Compliance",
    "category": "CAT-SCH",
    "authority": "SFAC / NABARD",
    "frequency": "Annual",
    "dueRule": "As per scheme guidelines",
    "appliesTo": "FPOs availing CGS-backed loans",
    "requiredDocuments": [
      "Loan utilisation report",
      "repayment status"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Guarantee invocation",
    "notes": "Linked to loan ledger entries."
  },
  {
    "complianceId": "SCH-NABARD",
    "name": "NABARD FPO Scheme Reporting",
    "category": "CAT-SCH",
    "authority": "NABARD",
    "frequency": "Quarterly",
    "dueRule": "Within 30 days of quarter end",
    "appliesTo": "FPOs under NABARD-promoted scheme (10K FPO scheme)",
    "requiredDocuments": [
      "Progress report",
      "financial report",
      "member data"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Funding tranches withheld",
    "notes": "Major reporting line for NABARD-FPOs."
  },
  {
    "complianceId": "SCH-SFAC",
    "name": "SFAC FPO Scheme Reporting",
    "category": "CAT-SCH",
    "authority": "SFAC",
    "frequency": "Quarterly",
    "dueRule": "Within 30 days of quarter end",
    "appliesTo": "FPOs under SFAC-promoted scheme",
    "requiredDocuments": [
      "Progress report",
      "financial report",
      "member data"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Funding tranches withheld",
    "notes": "Similar to NABARD reporting."
  },
  {
    "complianceId": "SCH-MIDH",
    "name": "MIDH / Sub-Mission Reporting",
    "category": "CAT-SCH",
    "authority": "MoA&FW",
    "frequency": "Annual",
    "dueRule": "As per scheme guidelines",
    "appliesTo": "FPOs receiving MIDH / horticulture grants",
    "requiredDocuments": [
      "Utilisation certificate",
      "asset register",
      "photographs"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Future grants blocked",
    "notes": "Track only for grant-receiving FPOs."
  },
  {
    "complianceId": "MEM-KYC",
    "name": "Member KYC Maintenance",
    "category": "CAT-GOV",
    "authority": "RBI / Companies Act",
    "frequency": "Annual / On-Update",
    "dueRule": "Within 30 days of any change",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Aadhaar",
      "PAN",
      "bank details",
      "photo"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Affects audit observations; member rights restricted",
    "notes": "Slide 9 already tracks 23 KYC pending \u2014 feed this rule."
  },
  {
    "complianceId": "MEM-SHARE",
    "name": "Share Allotment & Certificate Issuance",
    "category": "CAT-GOV",
    "authority": "Companies Act",
    "frequency": "Event-Based",
    "dueRule": "Within 60 days of allotment",
    "appliesTo": "All Producer Companies on new member admission / share allotment",
    "requiredDocuments": [
      "Share certificate",
      "allotment register",
      "board resolution"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Penalty under Companies Act",
    "notes": "Auto-trigger from Members module."
  },
  {
    "complianceId": "MEM-PATRON",
    "name": "Patronage Bonus / Limited Return Distribution",
    "category": "CAT-GOV",
    "authority": "Companies Act",
    "frequency": "Annual",
    "dueRule": "Post-AGM approval",
    "appliesTo": "Producer Companies declaring patronage / LR",
    "requiredDocuments": [
      "Board / AGM resolution",
      "distribution register",
      "payment proof"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Member trust loss; governance gap",
    "notes": "Distinct from dividend \u2014 Producer Co. specific."
  },
  {
    "complianceId": "INS-PROP",
    "name": "Property / Asset Insurance",
    "category": "CAT-LIC",
    "authority": "Insurer",
    "frequency": "Annual",
    "dueRule": "Before policy expiry",
    "appliesTo": "FPOs owning warehouses, processing units, vehicles",
    "requiredDocuments": [
      "Policy document",
      "premium receipt"
    ],
    "severity": "Low",
    "penaltyForNonCompliance": "Uninsured loss exposure",
    "notes": "Soft compliance \u2014 best practice."
  },
  {
    "complianceId": "INS-CROP",
    "name": "Crop Insurance Linkage (PMFBY)",
    "category": "CAT-SCH",
    "authority": "Insurer / Govt",
    "frequency": "Seasonal",
    "dueRule": "Before notified cut-off date (Kharif / Rabi)",
    "appliesTo": "FPOs facilitating member crop insurance",
    "requiredDocuments": [
      "Member enrolment list",
      "premium remittance"
    ],
    "severity": "Medium",
    "penaltyForNonCompliance": "Loss of crop insurance benefit for members",
    "notes": "Service to members; not strictly FPO compliance."
  },
  {
    "complianceId": "REC-BOOKS",
    "name": "Books of Accounts Maintenance",
    "category": "CAT-STA",
    "authority": "Companies Act / IT Act",
    "frequency": "Continuous",
    "dueRule": "Maintained for 8 years",
    "appliesTo": "All Producer Companies",
    "requiredDocuments": [
      "Cash book",
      "ledger",
      "journal",
      "registers"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Disallowance of expenses; audit failure",
    "notes": "Tier-1 (already done by other team) feeds this."
  },
  {
    "complianceId": "REC-AUDIT-TRAIL",
    "name": "Audit Trail Edit Log (Companies Act)",
    "category": "CAT-AUD",
    "authority": "MCA",
    "frequency": "Continuous",
    "dueRule": "Mandatory since 1 Apr 2023",
    "appliesTo": "All Producer Companies using accounting software",
    "requiredDocuments": [
      "Software with edit-log feature",
      "log retention"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Disqualification of audit; penalty up to \u20B95 lakh",
    "notes": "K2 must support immutable audit log per Slide 12."
  }
];

// src/lib/complianceEngine.ts
function runApplicabilityEngine(fpoProfile) {
  let applicableList = [];
  for (const rule of APPLICABILITY_RULES) {
    if (rule.operator === "event" || rule.conditionField === "event") {
      continue;
    }
    if (evaluateRule(rule, fpoProfile)) {
      const catalogItem = COMPLIANCE_CATALOG.find((c) => c.complianceId === rule.complianceId);
      if (catalogItem) {
        applicableList.push({
          ...catalogItem,
          dueDate: computeDueDate(catalogItem, fpoProfile),
          assigneeRole: resolveAssignee(catalogItem.category),
          triggeredBy: rule.ruleId,
          status: "pending"
        });
      }
    }
  }
  return dedupe(applicableList);
}
function evaluateRule(rule, profile) {
  const { conditionField, operator, value } = rule;
  if (operator === "event" || conditionField === "event") return false;
  const parts = conditionField.replace("fpo.", "").split(".");
  let actualValue = profile;
  for (const p of parts) {
    if (actualValue !== void 0 && actualValue !== null) {
      actualValue = actualValue[p];
    } else {
      actualValue = void 0;
      break;
    }
  }
  if (actualValue === void 0 && operator !== "exists") {
    return false;
  }
  let expectedValue = value;
  if (value === "true") expectedValue = true;
  if (value === "false") expectedValue = false;
  if (typeof value === "string" && !isNaN(Number(value.replace(/,/g, ""))) && value.trim() !== "") {
    expectedValue = Number(value.replace(/,/g, ""));
  }
  switch (operator) {
    case "=":
    case "==":
      return String(actualValue) === String(expectedValue);
    case "!=":
      return String(actualValue) !== String(expectedValue);
    case ">":
      return Number(actualValue) > Number(expectedValue);
    case ">=":
      return Number(actualValue) >= Number(expectedValue);
    case "<":
      return Number(actualValue) < Number(expectedValue);
    case "<=":
      return Number(actualValue) <= Number(expectedValue);
    case "in":
      if (typeof expectedValue === "string") {
        return expectedValue.split(",").map((v) => v.trim()).includes(String(actualValue));
      }
      return false;
    case "exists":
      if (expectedValue === true) return actualValue !== void 0 && actualValue !== null && actualValue !== "";
      if (expectedValue === false) return actualValue === void 0 || actualValue === null || actualValue === "";
      return false;
    default:
      return false;
  }
}
function computeFYEnd(today, fyClose) {
  const [monthStr, dayStr] = fyClose.split("-");
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  let year = today.getFullYear();
  const fyEndDate = new Date(year, month, day);
  if (today.getTime() > fyEndDate.getTime()) {
    fyEndDate.setFullYear(year + 1);
  }
  return fyEndDate;
}
function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function extractDays(ruleStr) {
  const match = ruleStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 30;
}
function parseMonthlyRule(rule, today) {
  const d = new Date(today);
  d.setMonth(d.getMonth() + 1);
  if (rule.includes("20th")) {
    d.setDate(20);
  } else if (rule.includes("15th")) {
    d.setDate(15);
  } else if (rule.includes("11th")) {
    d.setDate(11);
  } else {
    d.setDate(30);
  }
  return d.toISOString().split("T")[0];
}
function parseQuarterlyRule(rule, today) {
  const month = today.getMonth();
  const year = today.getFullYear();
  let nextQuarterMonth = 0;
  if (month <= 2) nextQuarterMonth = 3;
  else if (month <= 5) nextQuarterMonth = 6;
  else if (month <= 8) nextQuarterMonth = 9;
  else nextQuarterMonth = 12;
  const d = new Date(year, nextQuarterMonth, 1);
  if (rule.includes("15")) {
    const dates = [
      new Date(year, 2, 15),
      // Mar 15
      new Date(year, 5, 15),
      // Jun 15
      new Date(year, 8, 15),
      // Sep 15
      new Date(year, 11, 15),
      // Dec 15
      new Date(year + 1, 2, 15)
      // Mar 15 next year
    ];
    for (const target of dates) {
      if (target.getTime() >= today.getTime()) {
        return target.toISOString().split("T")[0];
      }
    }
  }
  if (rule.includes("31st")) {
    d.setMonth(nextQuarterMonth + 1, 0);
    return d.toISOString().split("T")[0];
  }
  d.setDate(30);
  return d.toISOString().split("T")[0];
}
function parseFixedAnnualDate(rule, fyEnd) {
  const year = fyEnd.getFullYear();
  if (rule.includes("30 September") || rule.includes("30th September") || rule.includes("By 30 September")) {
    return new Date(year, 8, 30).toISOString().split("T")[0];
  }
  if (rule.includes("31st December") || rule.includes("31 December")) {
    return new Date(year, 11, 31).toISOString().split("T")[0];
  }
  if (rule.includes("31st October") || rule.includes("31 October")) {
    return new Date(year, 9, 31).toISOString().split("T")[0];
  }
  if (rule.includes("31st July") || rule.includes("31 July")) {
    return new Date(year, 6, 31).toISOString().split("T")[0];
  }
  return addDays(fyEnd, 180);
}
function normalizeFrequency(freq) {
  const f = freq.toLowerCase();
  if (f.includes("monthly")) return "monthly";
  if (f.includes("quarterly")) return "quarterly";
  if (f.includes("annual")) return "annual";
  if (f.includes("event")) return "event_based";
  if (f.includes("one-time")) return "one_time";
  if (f.includes("renewal")) return "annual";
  return "annual";
}
function computeDueDate(item, fpo) {
  const today = /* @__PURE__ */ new Date();
  const fyEnd = computeFYEnd(today, fpo.fy_close || "03-31");
  switch (normalizeFrequency(item.frequency)) {
    case "monthly":
      return parseMonthlyRule(item.dueRule, today);
    case "quarterly":
      return parseQuarterlyRule(item.dueRule, today);
    case "annual":
      if (item.dueRule.includes("AGM")) {
        return addDays(fpo.last_agm_date || fyEnd.toISOString(), extractDays(item.dueRule));
      }
      return parseFixedAnnualDate(item.dueRule, fyEnd);
    case "event_based":
    case "one_time":
      return null;
    // Event-based dates are handled when the event occurs
    default:
      return addDays(today, 30);
  }
}
function resolveAssignee(category) {
  const map = {
    "CAT-STA": "Admin",
    "CAT-ROC": "Accountant",
    "CAT-TAX": "Accountant",
    "CAT-AUD": "Auditor",
    "CAT-GOV": "CEO",
    "CAT-LAB": "Accountant",
    "CAT-LIC": "Admin",
    "CAT-SCH": "CEO"
  };
  return map[category] || "Admin";
}
function dedupe(list) {
  const map = /* @__PURE__ */ new Map();
  for (const item of list) {
    const existing = map.get(item.complianceId);
    if (!existing) {
      map.set(item.complianceId, item);
      continue;
    }
    if (item.dueDate && existing.dueDate) {
      if (new Date(item.dueDate) < new Date(existing.dueDate)) {
        console.warn(`[Engine] Dedupe conflict for ${item.complianceId}: keeping earlier due date ${item.dueDate} from rule ${item.triggeredBy}`);
        map.set(item.complianceId, item);
      }
    } else if (item.dueDate && !existing.dueDate) {
      map.set(item.complianceId, item);
    }
  }
  return [...map.values()];
}

// src/data/mock/fpoFixtures.ts
var FIXTURE_KRISHI = {
  id: "FPO-KRISHI",
  name: "Krishi Kutumb Producer Company Ltd.",
  type: "Producer Company",
  cin: "U01100MH2019PTC123456",
  incorporation_date: "2019-08-12",
  fy_close: "03-31",
  member_count: 1247,
  director_count: 5,
  deducts_tds: true,
  last_agm_date: "2025-09-28",
  turnover: 15e6,
  employee_count: 25,
  gstin: "27AADCK1234F1Z5",
  pan: "AADCK1234F",
  tan: "MUMA12345B",
  handles_food: true,
  sells_seeds: true,
  sells_fertilisers: true,
  sells_pesticides: false,
  does_export_import: false,
  promoter: "NABARD",
  state: "MH",
  equity_grant_received: true
};
var FIXTURE_HARIYALI = {
  id: "FPO-HARIYALI",
  name: "Hariyali Producer Company",
  type: "Producer Company",
  cin: "U01100MP2021PTC654321",
  incorporation_date: "2021-04-10",
  fy_close: "03-31",
  member_count: 350,
  director_count: 5,
  deducts_tds: false,
  last_agm_date: "2025-09-10",
  turnover: 35e5,
  employee_count: 4,
  gstin: "",
  pan: "BBDCK1234G",
  tan: "",
  handles_food: false,
  sells_seeds: false,
  sells_fertilisers: false,
  sells_pesticides: false,
  does_export_import: false,
  promoter: "SFAC",
  state: "MP"
};
var FIXTURE_ANNADATA = {
  id: "FPO-ANNADATA",
  name: "AnnaData Organic FPO",
  type: "Producer Company",
  cin: "U01100KA2018PTC112233",
  incorporation_date: "2018-02-15",
  fy_close: "03-31",
  member_count: 2100,
  director_count: 7,
  deducts_tds: true,
  last_agm_date: "2025-09-25",
  turnover: 6e7,
  employee_count: 18,
  gstin: "29AABCA1234X1Z9",
  pan: "AABCA1234X",
  tan: "BLRA12345C",
  handles_food: true,
  sells_seeds: false,
  sells_fertilisers: false,
  sells_pesticides: false,
  does_export_import: true,
  markets_organic: true,
  promoter: "Independent",
  state: "KA"
};
var TEST_FIXTURES = {
  "T-01": {
    id: "T-01",
    name: "Minimum PC",
    type: "Producer Company",
    turnover: 1e6,
    employee_count: 2,
    gstin: "",
    pan: "AAAAA1111A",
    tan: "",
    handles_food: false,
    sells_seeds: false,
    sells_fertilisers: false,
    sells_pesticides: false,
    does_export_import: false,
    promoter: "",
    cin: "U1",
    incorporation_date: "2020-01-01",
    fy_close: "03-31",
    member_count: 100,
    director_count: 5,
    deducts_tds: false,
    state: "MP"
  },
  "T-02": {
    id: "T-02",
    name: "GST PC",
    type: "Producer Company",
    turnover: 5e6,
    employee_count: 2,
    gstin: "27AA",
    pan: "AAAAA1111A",
    tan: "",
    handles_food: false,
    sells_seeds: false,
    sells_fertilisers: false,
    sells_pesticides: false,
    does_export_import: false,
    promoter: "",
    cin: "U2",
    incorporation_date: "2020-01-01",
    fy_close: "03-31",
    member_count: 100,
    director_count: 5,
    deducts_tds: false,
    state: "MP"
  },
  "T-05": {
    id: "T-05",
    name: "ESI PC",
    type: "Producer Company",
    turnover: 1e6,
    employee_count: 15,
    gstin: "",
    pan: "AAAAA1111A",
    tan: "",
    handles_food: false,
    sells_seeds: false,
    sells_fertilisers: false,
    sells_pesticides: false,
    does_export_import: false,
    promoter: "",
    cin: "U5",
    incorporation_date: "2020-01-01",
    fy_close: "03-31",
    member_count: 100,
    director_count: 5,
    deducts_tds: false,
    state: "MP"
  },
  "T-06": {
    id: "T-06",
    name: "EPF ESI PC",
    type: "Producer Company",
    turnover: 1e6,
    employee_count: 25,
    gstin: "",
    pan: "AAAAA1111A",
    tan: "",
    handles_food: false,
    sells_seeds: false,
    sells_fertilisers: false,
    sells_pesticides: false,
    does_export_import: false,
    promoter: "",
    cin: "U6",
    incorporation_date: "2020-01-01",
    fy_close: "03-31",
    member_count: 100,
    director_count: 5,
    deducts_tds: false,
    state: "MP"
  }
};

// src/lib/complianceEngine.test.ts
var passCount = 0;
var failCount = 0;
function assert(condition, message) {
  if (condition) {
    console.log(`\u2705 PASS: ${message}`);
    passCount++;
  } else {
    console.error(`\u274C FAIL: ${message}`);
    failCount++;
  }
}
console.log("=== Running K2 Compliance Engine Tests ===\n");
var t01 = runApplicabilityEngine(TEST_FIXTURES["T-01"]);
var t01ids = t01.map((c) => c.complianceId);
assert(t01ids.includes("ROC-AOC4"), "T-01: must include ROC-AOC4");
assert(t01ids.includes("GOV-AGM"), "T-01: must include GOV-AGM");
assert(!t01ids.some((id) => id.startsWith("GST-")), "T-01: must NOT include GST-*");
assert(!t01ids.some((id) => id.startsWith("LAB-")), "T-01: must NOT include LAB-*");
var t02 = runApplicabilityEngine(TEST_FIXTURES["T-02"]);
var t02ids = t02.map((c) => c.complianceId);
assert(t02ids.includes("GST-3B"), "T-02: must include GST-3B");
assert(!t02ids.includes("GST-9C"), "T-02: must NOT include GST-9C (needs > 5Cr)");
var t05 = runApplicabilityEngine(TEST_FIXTURES["T-05"]);
var t05ids = t05.map((c) => c.complianceId);
assert(t05ids.includes("LAB-ESI"), "T-05: must include LAB-ESI (10+ emp)");
assert(!t05ids.includes("LAB-EPF"), "T-05: must NOT include LAB-EPF (needs 20+ emp)");
var t06 = runApplicabilityEngine(TEST_FIXTURES["T-06"]);
var t06ids = t06.map((c) => c.complianceId);
assert(t06ids.includes("LAB-EPF"), "T-06: must include LAB-EPF (20+ emp)");
var krishi = runApplicabilityEngine(FIXTURE_KRISHI);
var krishiIds = krishi.map((c) => c.complianceId);
assert(krishiIds.includes("LAB-EPF"), "Krishi: must include LAB-EPF (25 emp)");
assert(krishiIds.includes("SCH-EQUITY"), "Krishi: must include SCH-EQUITY (grant received)");
var hariyali = runApplicabilityEngine(FIXTURE_HARIYALI);
var hariyaliIds = hariyali.map((c) => c.complianceId);
assert(!hariyaliIds.includes("LAB-EPF"), "Hariyali: must NOT include LAB-EPF");
assert(!hariyaliIds.some((id) => id.startsWith("GST-")), "Hariyali: must NOT include GST-*");
var annaData = runApplicabilityEngine(FIXTURE_ANNADATA);
var annaIds = annaData.map((c) => c.complianceId);
assert(annaIds.includes("LIC-IEC"), "AnnaData: must include LIC-IEC (exports)");
assert(annaIds.includes("LIC-ORGANIC"), "AnnaData: must include LIC-ORGANIC (organic)");
console.log(`
=== Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
if (failCount > 0) process.exit(1);
