import { ComplianceSeverity } from './mock/compliance';

export interface AuditCheckRule {
  checkId: string;
  checkName: string;
  rule: string;
  triggerData: string[];
  severityIfFail: ComplianceSeverity | string;
  userMessage: string;
}

export const AUDIT_CHECK_RULES: AuditCheckRule[] = [
  {
    "checkId": "CHK-001",
    "checkName": "Procurement entry has receipt",
    "rule": "Every procurement entry must have a linked receipt document.",
    "triggerData": [
      "transactions",
      "documents"
    ],
    "severityIfFail": "High",
    "userMessage": "Procurement entry without receipt \u2014 auditor will flag."
  },
  {
    "checkId": "CHK-002",
    "checkName": "GRN exists for stock inward",
    "rule": "Every stock inward must trace back to a GRN document.",
    "triggerData": [
      "stock",
      "documents"
    ],
    "severityIfFail": "High",
    "userMessage": "Stock inward without GRN \u2014 fraud risk."
  },
  {
    "checkId": "CHK-003",
    "checkName": "Stock = Procurement \u2212 Sales",
    "rule": "Closing stock must reconcile with procurement and sales registers.",
    "triggerData": [
      "stock",
      "transactions"
    ],
    "severityIfFail": "Critical",
    "userMessage": "Stock mismatch detected \u2014 physical verification needed."
  },
  {
    "checkId": "CHK-004",
    "checkName": "Sales not exceeding stock",
    "rule": "No sale entry should exceed available stock at time of sale.",
    "triggerData": [
      "stock",
      "transactions"
    ],
    "severityIfFail": "Critical",
    "userMessage": "Negative stock \u2014 invalid entry."
  },
  {
    "checkId": "CHK-005",
    "checkName": "Payment \u2264 procurement value",
    "rule": "Total payment to a farmer should not exceed total procurement value (advance + final).",
    "triggerData": [
      "transactions"
    ],
    "severityIfFail": "High",
    "userMessage": "Overpayment to farmer \u2014 review entry."
  },
  {
    "checkId": "CHK-006",
    "checkName": "Ledger debit = credit",
    "rule": "Trial balance must tie out (\u03a3 Dr = \u03a3 Cr).",
    "triggerData": [
      "ledger"
    ],
    "severityIfFail": "Critical",
    "userMessage": "Trial balance mismatch \u2014 books not balanced."
  },
  {
    "checkId": "CHK-007",
    "checkName": "GST filed has challan attached",
    "rule": "Every GST task marked Closed must have challan PDF attached.",
    "triggerData": [
      "tasks",
      "documents"
    ],
    "severityIfFail": "High",
    "userMessage": "GST closed without challan \u2014 proof missing."
  },
  {
    "checkId": "CHK-008",
    "checkName": "AGM has minutes uploaded",
    "rule": "AGM task closure requires signed minutes upload.",
    "triggerData": [
      "tasks",
      "documents"
    ],
    "severityIfFail": "Critical",
    "userMessage": "AGM marked done but no minutes \u2014 non-compliant."
  },
  {
    "checkId": "CHK-009",
    "checkName": "Board meeting gap \u2264 120 days",
    "rule": "Gap between any two consecutive Board Meetings must be \u2264 120 days.",
    "triggerData": [
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "Board meeting gap > 120 days \u2014 Companies Act breach."
  },
  {
    "checkId": "CHK-010",
    "checkName": "Min 4 Board Meetings/year",
    "rule": "At least 4 Board Meetings recorded per FY.",
    "triggerData": [
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "Less than 4 Board Meetings this FY."
  },
  {
    "checkId": "CHK-011",
    "checkName": "Director KYC current",
    "rule": "All active directors have DIR-3 KYC filed for current year.",
    "triggerData": [
      "directors",
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "Director KYC pending \u2014 DIN at risk of deactivation."
  },
  {
    "checkId": "CHK-012",
    "checkName": "ADT-1 filed post-AGM",
    "rule": "If auditor appointed/reappointed in AGM, ADT-1 filing exists within 15 days.",
    "triggerData": [
      "tasks",
      "events"
    ],
    "severityIfFail": "High",
    "userMessage": "ADT-1 not filed \u2014 auditor appointment invalid."
  },
  {
    "checkId": "CHK-013",
    "checkName": "Member KYC \u2265 95%",
    "rule": "At least 95% of members have completed KYC.",
    "triggerData": [
      "members"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Member KYC < 95% \u2014 governance observation."
  },
  {
    "checkId": "CHK-014",
    "checkName": "Share certificates issued \u2264 60 days",
    "rule": "All share allotments have certificates issued within 60 days.",
    "triggerData": [
      "members",
      "documents"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Share certificate pending beyond 60 days."
  },
  {
    "checkId": "CHK-015",
    "checkName": "Statutory registers maintained",
    "rule": "All required statutory registers exist and have entries for current FY.",
    "triggerData": [
      "registers"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Statutory register missing entries."
  },
  {
    "checkId": "CHK-016",
    "checkName": "ROC filings on time",
    "rule": "AOC-4 within 30 days of AGM, MGT-7 within 60 days.",
    "triggerData": [
      "tasks"
    ],
    "severityIfFail": "Critical",
    "userMessage": "ROC filing overdue \u2014 penalty accruing daily."
  },
  {
    "checkId": "CHK-017",
    "checkName": "Tax audit done if turnover > \u20b91 Cr",
    "rule": "If turnover > \u20b91 Cr, tax audit report exists for current FY.",
    "triggerData": [
      "fpo",
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "Tax audit pending \u2014 return cannot be filed."
  },
  {
    "checkId": "CHK-018",
    "checkName": "Equity grant treated as liability",
    "rule": "Equity grant entry classified as liability, not income, in books.",
    "triggerData": [
      "ledger"
    ],
    "severityIfFail": "High",
    "userMessage": "Equity grant misclassified \u2014 accounting error."
  },
  {
    "checkId": "CHK-019",
    "checkName": "Loan classified correctly",
    "rule": "Loan amount in liabilities, repayments split into principal + interest.",
    "triggerData": [
      "ledger"
    ],
    "severityIfFail": "High",
    "userMessage": "Loan accounting incorrect."
  },
  {
    "checkId": "CHK-020",
    "checkName": "Direct/indirect expense split",
    "rule": "Expenses correctly classified as direct or indirect.",
    "triggerData": [
      "ledger"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Expense classification needs review."
  },
  {
    "checkId": "CHK-021",
    "checkName": "License not expired",
    "rule": "All applicable licenses (FSSAI, Seed, Fert, etc.) have expiry > today.",
    "triggerData": [
      "licenses"
    ],
    "severityIfFail": "Critical",
    "userMessage": "License expired \u2014 operations may be illegal."
  },
  {
    "checkId": "CHK-022",
    "checkName": "License renewal alert (90 days)",
    "rule": "Flag any license expiring within 90 days.",
    "triggerData": [
      "licenses"
    ],
    "severityIfFail": "Medium",
    "userMessage": "License expiring within 90 days \u2014 start renewal."
  },
  {
    "checkId": "CHK-023",
    "checkName": "EPF/ESI filed if applicable",
    "rule": "If employee count crosses threshold, EPF/ESI filings up to date.",
    "triggerData": [
      "fpo",
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "EPF/ESI filing overdue."
  },
  {
    "checkId": "CHK-024",
    "checkName": "Audit observations closed",
    "rule": "Open audit observations from prior year must be \u2264 30 days old or closed.",
    "triggerData": [
      "observations"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Open audit observation aging > 30 days."
  },
  {
    "checkId": "CHK-025",
    "checkName": "Resolution \u2192 Action linked",
    "rule": "Every Board/AGM resolution has a linked action with status.",
    "triggerData": [
      "decisions"
    ],
    "severityIfFail": "Low",
    "userMessage": "Resolution without tracked action \u2014 governance gap."
  },
  {
    "checkId": "CHK-026",
    "checkName": "Audit trail edit log enabled",
    "rule": "Accounting software with edit log used (mandatory since 1 Apr 2023).",
    "triggerData": [
      "fpo"
    ],
    "severityIfFail": "High",
    "userMessage": "Audit trail not enabled \u2014 Companies Act breach."
  },
  {
    "checkId": "CHK-027",
    "checkName": "Bank KYC current",
    "rule": "Bank KYC update done within prescribed cycle.",
    "triggerData": [
      "banking"
    ],
    "severityIfFail": "High",
    "userMessage": "Bank KYC overdue \u2014 account freeze risk."
  },
  {
    "checkId": "CHK-028",
    "checkName": "Equity grant utilisation reported",
    "rule": "If equity grant received, annual utilisation certificate filed.",
    "triggerData": [
      "scheme",
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "SFAC equity grant utilisation report pending."
  },
  {
    "checkId": "CHK-029",
    "checkName": "Scheme reporting on time",
    "rule": "NABARD/SFAC quarterly reports submitted within 30 days of quarter end.",
    "triggerData": [
      "scheme",
      "tasks"
    ],
    "severityIfFail": "High",
    "userMessage": "Scheme reporting overdue \u2014 funding tranche at risk."
  },
  {
    "checkId": "CHK-030",
    "checkName": "Farmer payment dues aging",
    "rule": "No farmer payment outstanding > 30 days from procurement.",
    "triggerData": [
      "transactions"
    ],
    "severityIfFail": "Medium",
    "userMessage": "Farmer payments overdue \u2014 trust impact."
  }
];
