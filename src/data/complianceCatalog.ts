import { ComplianceCategoryId } from './categories';
import { ComplianceFrequency, ComplianceSeverity } from './mock/compliance';

export interface ComplianceCatalogItem {
  complianceId: string;
  name: string;
  category: ComplianceCategoryId;
  authority: string;
  frequency: ComplianceFrequency | string;
  dueRule: string;
  appliesTo: string;
  requiredDocuments: string[];
  severity: ComplianceSeverity | string;
  penaltyForNonCompliance: string;
  notes: string;
}

export const COMPLIANCE_CATALOG: ComplianceCatalogItem[] = [
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
    "penaltyForNonCompliance": "Late fee \u20b9100/day; possible director disqualification",
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
    "penaltyForNonCompliance": "Late fee \u20b9100/day; non-compliance affects loan/grant eligibility",
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
    "penaltyForNonCompliance": "DIN deactivation; \u20b95,000 fee for reactivation",
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
    "penaltyForNonCompliance": "Penalty up to \u20b95 lakh; auditor appointment invalid",
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
    "penaltyForNonCompliance": "\u20b9100/day late fee",
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
    "penaltyForNonCompliance": "\u20b9100/day late fee",
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
    "penaltyForNonCompliance": "Late fee \u20b950/day + 18% interest on tax due",
    "notes": "Most frequent compliance \u2014 drives monthly task generation."
  },
  {
    "complianceId": "GST-1",
    "name": "GSTR-1 \u2014 Outward Supplies Return",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Monthly",
    "dueRule": "11th of next month",
    "appliesTo": "GST-registered FPOs (turnover > \u20b95 Cr); Quarterly if QRMP scheme",
    "requiredDocuments": [
      "Sales invoice details",
      "B2B/B2C breakup"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "Late fee \u20b950/day; blocks buyer's ITC",
    "notes": "Quarterly under QRMP \u2014 check FPO profile."
  },
  {
    "complianceId": "GST-9",
    "name": "GSTR-9 \u2014 Annual Return",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Annual",
    "dueRule": "31st December of next FY",
    "appliesTo": "GST-registered FPOs (turnover > \u20b92 Cr)",
    "requiredDocuments": [
      "Reconciliation of GSTR-1",
      "GSTR-3B",
      "books of accounts"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Late fee \u20b9200/day (capped)",
    "notes": "Auto-populated from monthly returns."
  },
  {
    "complianceId": "GST-9C",
    "name": "GSTR-9C \u2014 Reconciliation Statement",
    "category": "CAT-TAX",
    "authority": "GSTN",
    "frequency": "Annual",
    "dueRule": "31st December of next FY",
    "appliesTo": "GST-registered FPOs with turnover > \u20b95 Cr",
    "requiredDocuments": [
      "Reconciliation between audited financials and GSTR-9"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "General penalty up to \u20b925,000",
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
    "penaltyForNonCompliance": "\u20b9200/day late fee; disallowance of expense",
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
    "penaltyForNonCompliance": "Late filing fee \u20b95,000\u2013\u20b910,000; loss carry-forward denied",
    "notes": "Producer Companies file ITR-6."
  },
  {
    "complianceId": "TAX-AUDIT",
    "name": "Tax Audit Report (Form 3CA/3CB + 3CD)",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Annual",
    "dueRule": "30th September",
    "appliesTo": "FPOs with turnover > \u20b91 Cr (or \u20b910 Cr digital)",
    "requiredDocuments": [
      "Tax audit report by CA",
      "books of accounts"
    ],
    "severity": "High",
    "penaltyForNonCompliance": "Penalty 0.5% of turnover (max \u20b91.5 lakh)",
    "notes": "Threshold check from FPO turnover field."
  },
  {
    "complianceId": "TAX-ADV",
    "name": "Advance Tax Payment",
    "category": "CAT-TAX",
    "authority": "Income Tax Dept",
    "frequency": "Quarterly",
    "dueRule": "15 Jun, 15 Sep, 15 Dec, 15 Mar",
    "appliesTo": "FPOs with tax liability > \u20b910,000 in a year",
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
    "appliesTo": "Producer Companies with paid-up capital > \u20b950 Cr or turnover > \u20b9200 Cr",
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
    "appliesTo": "FPOs in regulated sectors with turnover > \u20b935 Cr",
    "requiredDocuments": [
      "Cost audit report",
      "CRA-3",
      "CRA-4 filing"
    ],
    "severity": "Low",
    "penaltyForNonCompliance": "Penalty up to \u20b95 lakh",
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
    "penaltyForNonCompliance": "Penalty up to \u20b91 lakh + \u20b95,000/day",
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
    "penaltyForNonCompliance": "Penalty \u20b925,000 per officer in default",
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
    "penaltyForNonCompliance": "\u20b93\u2013\u20b95 lakh penalty",
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
    "penaltyForNonCompliance": "\u20b95,000\u2013\u20b950,000 penalty",
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
    "penaltyForNonCompliance": "\u20b92 lakh penalty + business shutdown",
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
    "penaltyForNonCompliance": "License cancellation; \u20b950,000 penalty",
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
    "penaltyForNonCompliance": "Cannot deposit TDS; \u20b910,000 penalty",
    "notes": "Required for TDS compliance chain."
  },
  {
    "complianceId": "ID-GST-REG",
    "name": "GST Registration",
    "category": "CAT-STA",
    "authority": "GSTN",
    "frequency": "One-Time",
    "dueRule": "Within 30 days of crossing turnover threshold",
    "appliesTo": "FPOs with turnover > \u20b940 lakh (goods) / \u20b920 lakh (services)",
    "requiredDocuments": [
      "GSTIN certificate",
      "principal place of business"
    ],
    "severity": "Critical",
    "penaltyForNonCompliance": "\u20b910,000 or tax due (whichever higher)",
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
    "penaltyForNonCompliance": "Disqualification of audit; penalty up to \u20b95 lakh",
    "notes": "K2 must support immutable audit log per Slide 12."
  }
];
