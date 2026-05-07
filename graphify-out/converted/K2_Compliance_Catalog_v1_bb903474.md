<!-- converted from K2_Compliance_Catalog_v1.xlsx -->

## Sheet: README
| FPO Compliance Catalog — K2 Platform |  |
| --- | --- |
| Master list of every compliance an FPO may face. Seeds the ComplianceCatalog table (Slide 13). |  |
| How to use this file |  |
| 1. Catalog — master list of all 60+ compliances. This is the source of truth. |  |
| 2. Applicability_Rules — decision matrix that decides which catalog items apply to which FPO. |  |
| 3. Health_Score_Logic — formula and weighting for the 82% score shown on Home dashboard. |  |
| 4. Audit_Readiness_Checks — validation rules that flag missing/incomplete records. |  |
| 5. Categories — reference list of compliance categories used in filters. |  |
| 6. Document_Types — reference list of document types stored in the vault. |  |
| Column legend (Catalog sheet) |  |
| compliance_id | Unique short code, e.g. GST-3B, ROC-AOC4. Used as foreign key everywhere. |
| name | Display name shown in the app. |
| category | Statutory | Tax | ROC | Audit | Governance | Labour | License | Scheme. |
| authority | Issuing/regulating body — GSTN, MCA, Income Tax Dept, NABARD, FSSAI, etc. |
| frequency | Monthly | Quarterly | Half-Yearly | Annual | One-Time | Event-Based. |
| due_rule | How due date is computed, e.g. '20th of next month', '30 days from FY end'. |
| applies_to | Plain-English condition for applicability. Maps to a rule in Applicability_Rules. |
| required_documents | Documents that must be attached to close this task. |
| severity | Critical | High | Medium | Low — drives weight in Health Score. |
| penalty_for_non_compliance | Brief description of penalty / consequence. |
| notes | Any clarifying notes for product/dev team. |
| Owner: Ankit | Krishi Kutumb | K2 Platform |  |
## Sheet: Catalog
| compliance_id | name | category | authority | frequency | due_rule | applies_to | required_documents | severity | penalty_for_non_compliance | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ROC-AOC4 | AOC-4 — Annual Financial Statement Filing | ROC | MCA / ROC | Annual | Within 30 days of AGM | All Producer Companies (registered under Companies Act) | Audited Balance Sheet, P&L, Auditor's Report, Board's Report | Critical | Late fee ₹100/day; possible director disqualification | Must be filed via MCA portal. |
| ROC-MGT7 | MGT-7 — Annual Return Filing | ROC | MCA / ROC | Annual | Within 60 days of AGM | All Producer Companies | List of members, directors, shareholding pattern, AGM minutes | Critical | Late fee ₹100/day; non-compliance affects loan/grant eligibility | Must be digitally signed by Director + CS/CA. |
| ROC-DIR3KYC | DIR-3 KYC — Director KYC | ROC | MCA | Annual | By 30 September every year | Every director with active DIN | PAN, Aadhaar, address proof, mobile/email verification, DSC | High | DIN deactivation; ₹5,000 fee for reactivation | Director cannot sign filings if DIN is deactivated. |
| ROC-ADT1 | ADT-1 — Auditor Appointment Filing | ROC | MCA | Event-Based | Within 15 days of AGM appointing auditor | All Producer Companies on auditor appointment/reappointment | Board resolution, AGM resolution, auditor consent letter | High | Penalty up to ₹5 lakh; auditor appointment invalid | Required even on reappointment. |
| ROC-DIR12 | DIR-12 — Director Appointment / Cessation | ROC | MCA | Event-Based | Within 30 days of change | All Producer Companies on any director change | Board resolution, consent letter, DIR-2, ID proof | High | ₹100/day late fee | Auto-trigger from Members & Directors module (Slide 9). |
| ROC-MGT14 | MGT-14 — Filing of Resolutions | ROC | MCA | Event-Based | Within 30 days of passing resolution | Producer Companies passing special / Board resolutions requiring filing | Certified true copy of resolution, explanatory statement | Medium | ₹100/day late fee | Applies to specified resolutions only — check rule list. |
| GST-3B | GSTR-3B — Monthly Summary Return | Tax | GSTN | Monthly | 20th of next month | FPOs with GST registration | Sales summary, ITC computation, tax challan | Critical | Late fee ₹50/day + 18% interest on tax due | Most frequent compliance — drives monthly task generation. |
| GST-1 | GSTR-1 — Outward Supplies Return | Tax | GSTN | Monthly | 11th of next month | GST-registered FPOs (turnover > ₹5 Cr); Quarterly if QRMP scheme | Sales invoice details, B2B/B2C breakup | Critical | Late fee ₹50/day; blocks buyer's ITC | Quarterly under QRMP — check FPO profile. |
| GST-9 | GSTR-9 — Annual Return | Tax | GSTN | Annual | 31st December of next FY | GST-registered FPOs (turnover > ₹2 Cr) | Reconciliation of GSTR-1, GSTR-3B, books of accounts | High | Late fee ₹200/day (capped) | Auto-populated from monthly returns. |
| GST-9C | GSTR-9C — Reconciliation Statement | Tax | GSTN | Annual | 31st December of next FY | GST-registered FPOs with turnover > ₹5 Cr | Reconciliation between audited financials and GSTR-9 | High | General penalty up to ₹25,000 | Self-certified; no CA audit required post-2021. |
| TDS-Q | TDS Quarterly Return (24Q / 26Q) | Tax | Income Tax Dept | Quarterly | 31st of month following quarter end | FPOs deducting TDS on salaries / contractor payments | TDS challans, deductee details, Form 16/16A | High | ₹200/day late fee; disallowance of expense | Triggered if FPO has employees or vendor payments > threshold. |
| TAX-ITR | Income Tax Return (ITR-7 / ITR-6) | Tax | Income Tax Dept | Annual | 31st October (audit cases) / 31st July (non-audit) | All registered FPOs | Audited financials, tax audit report (if applicable), donation receipts | Critical | Late filing fee ₹5,000–₹10,000; loss carry-forward denied | Producer Companies file ITR-6. |
| TAX-AUDIT | Tax Audit Report (Form 3CA/3CB + 3CD) | Tax | Income Tax Dept | Annual | 30th September | FPOs with turnover > ₹1 Cr (or ₹10 Cr digital) | Tax audit report by CA, books of accounts | High | Penalty 0.5% of turnover (max ₹1.5 lakh) | Threshold check from FPO turnover field. |
| TAX-ADV | Advance Tax Payment | Tax | Income Tax Dept | Quarterly | 15 Jun, 15 Sep, 15 Dec, 15 Mar | FPOs with tax liability > ₹10,000 in a year | Advance tax challan | Medium | Interest u/s 234B and 234C | Auto-reminder 7 days before each due date. |
| AUD-STAT | Statutory Audit | Audit | ICAI / Auditor | Annual | Before AGM (within 6 months of FY end) | All Producer Companies | Audited financial statements, audit report, management letter | Critical | Cannot file ROC returns without audit; grant/loan ineligibility | Auditor appointed via ADT-1. |
| AUD-INT | Internal Audit | Audit | ICAI / Internal Auditor | Annual | As prescribed in Articles / Board policy | Producer Companies with paid-up capital > ₹50 Cr or turnover > ₹200 Cr | Internal audit report, action taken report | Medium | General non-compliance penalty | Most small FPOs are exempt; check thresholds. |
| AUD-COSTAUD | Cost Audit | Audit | ICAI / Cost Auditor | Annual | Within 30 days of receipt of cost audit report | FPOs in regulated sectors with turnover > ₹35 Cr | Cost audit report, CRA-3, CRA-4 filing | Low | Penalty up to ₹5 lakh | Rare for FPOs — flag only if applicable sector. |
| GOV-AGM | Annual General Meeting (AGM) | Governance | Companies Act | Annual | Within 6 months of FY end (by 30 September) | All Producer Companies | AGM notice (21 days prior), attendance register, minutes, resolutions | Critical | Penalty up to ₹1 lakh + ₹5,000/day | Notice generation should be one-click in app. |
| GOV-BOD | Board Meetings | Governance | Companies Act | Quarterly | Min. 4 meetings per year, gap ≤ 120 days | All Producer Companies | Notice, agenda, attendance register, signed minutes | High | Penalty ₹25,000 per officer in default | Track gap between meetings (≤120 days rule). |
| GOV-MIN | Maintenance of Statutory Registers | Governance | Companies Act | Annual | Continuous; verified at AGM | All Producer Companies | Register of Members, Directors, Charges, Contracts, Loans | Medium | ₹3–₹5 lakh penalty | Often missed by FPOs — flag in audit checks. |
| GOV-DECISION | Board / AGM Decision Compliance | Governance | Internal | Event-Based | As per resolution timeline | All Producer Companies | Resolution copy, action taken report, supporting evidence | Medium | Governance gap; affects audit observations | K2 differentiator — track decision → execution. |
| LAB-EPF | EPF Monthly Contribution & Return | Labour | EPFO | Monthly | 15th of next month | FPOs with ≥ 20 employees | EPF challan, ECR (Electronic Challan-cum-Return) | High | Damages 5–25% + 12% interest | Threshold check from employee count. |
| LAB-ESI | ESI Monthly Contribution & Return | Labour | ESIC | Monthly | 15th of next month | FPOs with ≥ 10 employees and wage threshold | ESI challan, return | High | 12% interest + damages up to 25% | Applicable wage threshold — check state notification. |
| LAB-PT | Professional Tax Filing | Labour | State Govt | Monthly / Annual | Varies by state | FPOs in states levying PT (MH, KA, WB, etc.) | PT challan, return | Medium | Late fee + interest as per state law | MP currently exempt; flag based on FPO state. |
| LAB-GRAT | Gratuity Compliance | Labour | Payment of Gratuity Act | Event-Based | On employee separation | FPOs with ≥ 10 employees | Gratuity calculation, payment proof, Form L | Medium | Interest + penalty under Act | Provision tracking in books required. |
| LAB-SHOPS | Shops & Establishment Registration | Labour | State Labour Dept | One-Time + Renewal | Within 30 days of starting; renewal as per state | All FPOs operating from a commercial premises | Registration certificate, employee list, premises proof | Medium | ₹5,000–₹50,000 penalty | One-time then periodic renewal. |
| LIC-FSSAI | FSSAI License / Registration | License | FSSAI | Renewal (1–5 yrs) | Before expiry | FPOs handling food products (processing, packaging, sale) | FSSAI certificate, premises proof, food safety plan | High | ₹2 lakh penalty + business shutdown | Renewal alert 90 days before expiry. |
| LIC-SEED | Seed License | License | State Agri Dept | Renewal (3 yrs) | Before expiry | FPOs selling seeds to members | Seed license, source certificates, sales register | High | License cancellation; criminal action | Common for input-business FPOs. |
| LIC-FERT | Fertiliser License | License | State Agri Dept | Renewal (3 yrs) | Before expiry | FPOs selling fertilisers | Fertiliser license, stock register, source proof | High | License cancellation; ₹50,000 penalty | Common for input-business FPOs. |
| LIC-PEST | Pesticide License | License | State Agri Dept | Renewal (2 yrs) | Before expiry | FPOs selling pesticides | Pesticide license, qualified person certificate, stock register | High | License cancellation; criminal action | Requires qualified personnel — flag separately. |
| LIC-IEC | IEC — Import Export Code | License | DGFT | One-Time + Annual Update | Annual update by 30 June | FPOs engaged in import/export | IEC certificate, PAN, bank certificate, address proof | High | IEC deactivation if not updated | Annual update mandatory post-2021. |
| LIC-APEDA | APEDA Registration (RCMC) | License | APEDA | Renewal (5 yrs) | Before expiry | FPOs exporting scheduled agricultural products | RCMC certificate, IEC, bank details | Medium | Loss of export incentives | Required for export benefits / subsidies. |
| LIC-ORGANIC | Organic Certification (NPOP / PGS) | License | APEDA / PGS-India | Renewal (1–3 yrs) | Before expiry | FPOs marketing produce as organic | Certification, inspection report, traceability records | Medium | Loss of organic premium pricing; legal action | Big differentiator for organic-focused FPOs. |
| LIC-WAREHOUSE | Warehouse License (WDRA) | License | WDRA | Renewal (varies) | Before expiry | FPOs operating registered warehouses | WDRA registration, infrastructure proof | Low | Loss of WDRA benefits / NWR access | Optional but enables negotiable warehouse receipts. |
| LIC-MANDI | Mandi / APMC License | License | State APMC | Annual | Before expiry / annual renewal | FPOs trading in notified mandi area | APMC license, premises proof | Medium | Trading not permitted without license | State-specific; some states have abolished APMC monopoly. |
| LIC-POLLUTION | Pollution Control NOC (CTE/CTO) | License | State PCB | Renewal (5 yrs) | Before expiry | FPOs with processing units / effluent generation | Consent to Establish/Operate, ETP design | Medium | Closure notice; penalty | Applies only to processing FPOs. |
| LIC-PANCHAYAT | Panchayat / Municipal NOC | License | Local Body | Renewal (1 yr) | Annual | FPOs operating from village / urban premises | NOC certificate, premises proof | Low | Notice from local body | Often overlooked; low cost to obtain. |
| ID-PAN | PAN Registration | Statutory | Income Tax Dept | One-Time | At incorporation | All FPOs | PAN card | Critical | Cannot operate bank account / file returns | Foundational — verified at FPO onboarding. |
| ID-TAN | TAN Registration | Statutory | Income Tax Dept | One-Time | Before deducting TDS | FPOs deducting TDS | TAN certificate | High | Cannot deposit TDS; ₹10,000 penalty | Required for TDS compliance chain. |
| ID-GST-REG | GST Registration | Statutory | GSTN | One-Time | Within 30 days of crossing turnover threshold | FPOs with turnover > ₹40 lakh (goods) / ₹20 lakh (services) | GSTIN certificate, principal place of business | Critical | ₹10,000 or tax due (whichever higher) | Voluntary registration also tracked. |
| ID-BANK | Current Account & Banking Compliance | Statutory | Bank / RBI | One-Time + Periodic KYC | KYC update as per bank cycle | All FPOs | Account opening, KYC docs, board resolution | High | Account freeze on KYC lapse | Re-KYC every 2–8 years depending on risk. |
| SCH-EQUITY | Equity Grant Utilisation Report (SFAC) | Scheme | SFAC | Annual | As per sanction terms | FPOs availing SFAC Equity Grant Scheme | Utilisation certificate, audited financials, member matching contribution proof | High | Grant recall; blacklisting | Equity grant treated as liability, not income. |
| SCH-CGS | Credit Guarantee Scheme Compliance | Scheme | SFAC / NABARD | Annual | As per scheme guidelines | FPOs availing CGS-backed loans | Loan utilisation report, repayment status | High | Guarantee invocation | Linked to loan ledger entries. |
| SCH-NABARD | NABARD FPO Scheme Reporting | Scheme | NABARD | Quarterly | Within 30 days of quarter end | FPOs under NABARD-promoted scheme (10K FPO scheme) | Progress report, financial report, member data | High | Funding tranches withheld | Major reporting line for NABARD-FPOs. |
| SCH-SFAC | SFAC FPO Scheme Reporting | Scheme | SFAC | Quarterly | Within 30 days of quarter end | FPOs under SFAC-promoted scheme | Progress report, financial report, member data | High | Funding tranches withheld | Similar to NABARD reporting. |
| SCH-MIDH | MIDH / Sub-Mission Reporting | Scheme | MoA&FW | Annual | As per scheme guidelines | FPOs receiving MIDH / horticulture grants | Utilisation certificate, asset register, photographs | Medium | Future grants blocked | Track only for grant-receiving FPOs. |
| MEM-KYC | Member KYC Maintenance | Governance | RBI / Companies Act | Annual / On-Update | Within 30 days of any change | All Producer Companies | Aadhaar, PAN, bank details, photo | High | Affects audit observations; member rights restricted | Slide 9 already tracks 23 KYC pending — feed this rule. |
| MEM-SHARE | Share Allotment & Certificate Issuance | Governance | Companies Act | Event-Based | Within 60 days of allotment | All Producer Companies on new member admission / share allotment | Share certificate, allotment register, board resolution | Medium | Penalty under Companies Act | Auto-trigger from Members module. |
| MEM-PATRON | Patronage Bonus / Limited Return Distribution | Governance | Companies Act | Annual | Post-AGM approval | Producer Companies declaring patronage / LR | Board / AGM resolution, distribution register, payment proof | Medium | Member trust loss; governance gap | Distinct from dividend — Producer Co. specific. |
| INS-PROP | Property / Asset Insurance | License | Insurer | Annual | Before policy expiry | FPOs owning warehouses, processing units, vehicles | Policy document, premium receipt | Low | Uninsured loss exposure | Soft compliance — best practice. |
| INS-CROP | Crop Insurance Linkage (PMFBY) | Scheme | Insurer / Govt | Seasonal | Before notified cut-off date (Kharif / Rabi) | FPOs facilitating member crop insurance | Member enrolment list, premium remittance | Medium | Loss of crop insurance benefit for members | Service to members; not strictly FPO compliance. |
| REC-BOOKS | Books of Accounts Maintenance | Statutory | Companies Act / IT Act | Continuous | Maintained for 8 years | All Producer Companies | Cash book, ledger, journal, registers | Critical | Disallowance of expenses; audit failure | Tier-1 (already done by other team) feeds this. |
| REC-AUDIT-TRAIL | Audit Trail Edit Log (Companies Act) | Audit | MCA | Continuous | Mandatory since 1 Apr 2023 | All Producer Companies using accounting software | Software with edit-log feature, log retention | High | Disqualification of audit; penalty up to ₹5 lakh | K2 must support immutable audit log per Slide 12. |
## Sheet: Applicability_Rules
| rule_id | compliance_id | condition_field | operator | value | logic_note |
| --- | --- | --- | --- | --- | --- |
| R-001 | ROC-AOC4 | fpo.type | = | Producer Company | All PCs file AOC-4. |
| R-002 | ROC-MGT7 | fpo.type | = | Producer Company | All PCs file MGT-7. |
| R-003 | ROC-DIR3KYC | director.din_status | = | Active | Per active director. |
| R-004 | ROC-ADT1 | event | = | Auditor Appointed/Reappointed | Event-driven. |
| R-005 | ROC-DIR12 | event | = | Director Change | Event-driven. |
| R-006 | ROC-MGT14 | event | = | Resolution Passed (specified) | Event-driven. |
| R-010 | ID-GST-REG | fpo.turnover | > | 40,00,000 | Mandatory above threshold. |
| R-011 | GST-3B | fpo.gstin | exists | true | Required if GST-registered. |
| R-012 | GST-1 | fpo.gstin | exists | true | Monthly if turnover > ₹5Cr; else QRMP quarterly. |
| R-013 | GST-9 | fpo.turnover | > | 2,00,00,000 | Required above ₹2 Cr turnover. |
| R-014 | GST-9C | fpo.turnover | > | 5,00,00,000 | Required above ₹5 Cr turnover. |
| R-020 | ID-TAN | fpo.deducts_tds | = | true | Required if FPO deducts TDS. |
| R-021 | TDS-Q | fpo.tan | exists | true | Quarterly per TAN holder. |
| R-022 | TAX-ITR | fpo.type | = | Producer Company | All PCs file ITR-6. |
| R-023 | TAX-AUDIT | fpo.turnover | > | 1,00,00,000 | Threshold ₹1 Cr (₹10 Cr digital). |
| R-024 | TAX-ADV | fpo.estimated_tax | > | 10,000 | Quarterly advance tax. |
| R-030 | AUD-STAT | fpo.type | = | Producer Company | Mandatory for all PCs. |
| R-031 | AUD-INT | fpo.paid_up_capital | > | 50,00,00,000 | Or turnover > ₹200 Cr. |
| R-032 | AUD-COSTAUD | fpo.sector | in | Regulated List | Sector + turnover > ₹35 Cr. |
| R-040 | GOV-AGM | fpo.type | = | Producer Company | All PCs. |
| R-041 | GOV-BOD | fpo.type | = | Producer Company | Min 4 / year, gap ≤ 120 days. |
| R-042 | GOV-MIN | fpo.type | = | Producer Company | All PCs. |
| R-043 | GOV-DECISION | fpo.has_open_resolutions | = | true | Track per resolution. |
| R-050 | LAB-EPF | fpo.employee_count | >= | 20 | EPF threshold. |
| R-051 | LAB-ESI | fpo.employee_count | >= | 10 | ESI threshold + wage check. |
| R-052 | LAB-PT | fpo.state | in | MH,KA,WB,GJ,TN,etc. | PT-levying states only. |
| R-053 | LAB-GRAT | fpo.employee_count | >= | 10 | Gratuity Act applicability. |
| R-054 | LAB-SHOPS | fpo.has_commercial_premises | = | true | All commercial establishments. |
| R-060 | LIC-FSSAI | fpo.handles_food | = | true | Food handling FPOs. |
| R-061 | LIC-SEED | fpo.sells_seeds | = | true | Input-business FPOs. |
| R-062 | LIC-FERT | fpo.sells_fertilisers | = | true | Input-business FPOs. |
| R-063 | LIC-PEST | fpo.sells_pesticides | = | true | Input-business FPOs. |
| R-064 | LIC-IEC | fpo.does_export_import | = | true | Trade FPOs. |
| R-065 | LIC-APEDA | fpo.exports_scheduled_products | = | true | Export-FPOs. |
| R-066 | LIC-ORGANIC | fpo.markets_organic | = | true | Organic-FPOs. |
| R-067 | LIC-WAREHOUSE | fpo.operates_warehouse | = | true | Optional WDRA. |
| R-068 | LIC-MANDI | fpo.trades_in_apmc | = | true | State-dependent. |
| R-069 | LIC-POLLUTION | fpo.has_processing_unit | = | true | Processing FPOs only. |
| R-070 | LIC-PANCHAYAT | fpo.has_premises | = | true | All FPOs with premises. |
| R-080 | ID-PAN | fpo.exists | = | true | All FPOs. |
| R-081 | ID-BANK | fpo.exists | = | true | All FPOs. |
| R-090 | SCH-EQUITY | fpo.equity_grant_received | = | true | SFAC equity grant FPOs. |
| R-091 | SCH-CGS | fpo.has_cgs_loan | = | true | CGS-backed loans. |
| R-092 | SCH-NABARD | fpo.promoter | = | NABARD | NABARD-promoted FPOs. |
| R-093 | SCH-SFAC | fpo.promoter | = | SFAC | SFAC-promoted FPOs. |
| R-094 | SCH-MIDH | fpo.midh_grant_received | = | true | MIDH grant FPOs. |
| R-100 | MEM-KYC | fpo.type | = | Producer Company | All PCs; per member. |
| R-101 | MEM-SHARE | event | = | New Member / Share Allotment | Event-driven. |
| R-102 | MEM-PATRON | fpo.declares_patronage | = | true | Annual. |
| R-110 | INS-PROP | fpo.has_assets_to_insure | = | true | Soft compliance. |
| R-111 | INS-CROP | fpo.facilitates_crop_insurance | = | true | Service to members. |
| R-120 | REC-BOOKS | fpo.exists | = | true | All FPOs. |
| R-121 | REC-AUDIT-TRAIL | fpo.uses_accounting_software | = | true | Mandatory since 1 Apr 2023. |
## Sheet: Health_Score_Logic
| Compliance Health Score — Calculation Logic |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Drives the 82% on Home dashboard (Slide 4) and category bars on Reports (Slide 11) |  |  |  |  |  |  |
| Severity Weights |  |  |  |  |  |  |
| severity | weight | rationale |  |  |  |  |
| Critical | 5 | Triggers grant recall, ROC penalty, audit failure, criminal action. |  |  |  |  |
| High | 3 | Significant penalty, governance lapse, license at risk. |  |  |  |  |
| Medium | 2 | Procedural lapse, recoverable with action. |  |  |  |  |
| Low | 1 | Best practice, soft compliance. |  |  |  |  |
| Status Multipliers (per task) |  |  |  |  |  |  |
| task_status | multiplier | meaning |  |  |  |  |
| Closed (on-time) | 1 | Full credit. |  |  |  |  |
| Closed (late) | 0.7 | Partial credit; closed but late. |  |  |  |  |
| Verified | 0.9 | Submitted + verified, awaiting closure. |  |  |  |  |
| Submitted | 0.6 | Maker done, pending verifier. |  |  |  |  |
| In-Progress | 0.3 | Started, not submitted. |  |  |  |  |
| Pending (within due) | 0.2 | Open and within due window. |  |  |  |  |
| Overdue | 0 | No credit; pulls score down. |  |  |  |  |
| Score Formula |  |  |  |  |  |  |
| Health Score (%) = Σ(severity_weight × status_multiplier) / Σ(severity_weight) × 100 |  |  |  |  |  |  |
| Computed across all applicable compliance tasks for the FPO in the current FY. |  |  |  |  |  |  |
| Worked Example |  |  |  |  |  |  |
| compliance | severity | weight | status | multiplier | weighted_score | max_possible |
| GSTR-3B (Apr) | Critical | 5 | Closed (on-time) | 1 | 5 | 5 |
| GSTR-3B (May) | Critical | 5 | Overdue | 0 | 0 | 5 |
| AOC-4 | Critical | 5 | Submitted | 0.6 | 3 | 5 |
| MGT-7 | Critical | 5 | Pending (within due) | 0.2 | 1 | 5 |
| AGM | Critical | 5 | Closed (on-time) | 1 | 5 | 5 |
| Board Meeting Q1 | High | 3 | Closed (on-time) | 1 | 3 | 3 |
| Board Meeting Q2 | High | 3 | Closed (late) | 0.7 | 2.1 | 3 |
| DIR-3 KYC | High | 3 | Verified | 0.9 | 2.7 | 3 |
| FSSAI Renewal | High | 3 | In-Progress | 0.3 | 0.9 | 3 |
| EPF (Apr) | High | 3 | Closed (on-time) | 1 | 3 | 3 |
| Member KYC batch | High | 3 | In-Progress | 0.3 | 0.9 | 3 |
| PT Filing | Medium | 2 | Closed (on-time) | 1 | 2 | 2 |
| Stat. Registers | Medium | 2 | Verified | 0.9 | 1.8 | 2 |
| Property Insurance | Low | 1 | Closed (on-time) | 1 | 1 | 1 |
| Panchayat NOC | Low | 1 | Pending (within due) | 0.2 | 0.2 | 1 |
| TOTALS |  |  |  |  | 31.6 | 49 |
| Health Score (%) |  |  |  |  | 64.5 | % |
| Category-wise score (Slide 11) |  |  |  |  |  |  |
| Same formula applied to subset of tasks per category (Statutory / Tax / Audit / Governance / etc.) |  |  |  |  |  |  |
| Risk Bands |  |  |  |  |  |  |
| score_range | band | color | meaning |  |  |  |
| 90 – 100 | Excellent | Green | Audit-ready, funding-ready. |  |  |  |
| 75 – 89 | Good | Light Green | Minor gaps, easily closeable. |  |  |  |
| 60 – 74 | Caution | Amber | Material gaps, address within 30 days. |  |  |  |
| 40 – 59 | Risk | Orange | High risk of penalty / grant impact. |  |  |  |
| 0 – 39 | Critical | Red | Immediate intervention required. |  |  |  |
## Sheet: Audit_Readiness_Checks
| Audit Readiness Validation Rules |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Each rule = automated check that runs on FPO data and returns ✅ / ⚠️ / ❌ |  |  |  |  |  |
| check_id | check_name | rule | trigger_data | severity_if_fail | user_message |
| CHK-001 | Procurement entry has receipt | Every procurement entry must have a linked receipt document. | transactions, documents | High | Procurement entry without receipt — auditor will flag. |
| CHK-002 | GRN exists for stock inward | Every stock inward must trace back to a GRN document. | stock, documents | High | Stock inward without GRN — fraud risk. |
| CHK-003 | Stock = Procurement − Sales | Closing stock must reconcile with procurement and sales registers. | stock, transactions | Critical | Stock mismatch detected — physical verification needed. |
| CHK-004 | Sales not exceeding stock | No sale entry should exceed available stock at time of sale. | stock, transactions | Critical | Negative stock — invalid entry. |
| CHK-005 | Payment ≤ procurement value | Total payment to a farmer should not exceed total procurement value (advance + final). | transactions | High | Overpayment to farmer — review entry. |
| CHK-006 | Ledger debit = credit | Trial balance must tie out (Σ Dr = Σ Cr). | ledger | Critical | Trial balance mismatch — books not balanced. |
| CHK-007 | GST filed has challan attached | Every GST task marked Closed must have challan PDF attached. | tasks, documents | High | GST closed without challan — proof missing. |
| CHK-008 | AGM has minutes uploaded | AGM task closure requires signed minutes upload. | tasks, documents | Critical | AGM marked done but no minutes — non-compliant. |
| CHK-009 | Board meeting gap ≤ 120 days | Gap between any two consecutive Board Meetings must be ≤ 120 days. | tasks | High | Board meeting gap > 120 days — Companies Act breach. |
| CHK-010 | Min 4 Board Meetings/year | At least 4 Board Meetings recorded per FY. | tasks | High | Less than 4 Board Meetings this FY. |
| CHK-011 | Director KYC current | All active directors have DIR-3 KYC filed for current year. | directors, tasks | High | Director KYC pending — DIN at risk of deactivation. |
| CHK-012 | ADT-1 filed post-AGM | If auditor appointed/reappointed in AGM, ADT-1 filing exists within 15 days. | tasks, events | High | ADT-1 not filed — auditor appointment invalid. |
| CHK-013 | Member KYC ≥ 95% | At least 95% of members have completed KYC. | members | Medium | Member KYC < 95% — governance observation. |
| CHK-014 | Share certificates issued ≤ 60 days | All share allotments have certificates issued within 60 days. | members, documents | Medium | Share certificate pending beyond 60 days. |
| CHK-015 | Statutory registers maintained | All required statutory registers exist and have entries for current FY. | registers | Medium | Statutory register missing entries. |
| CHK-016 | ROC filings on time | AOC-4 within 30 days of AGM, MGT-7 within 60 days. | tasks | Critical | ROC filing overdue — penalty accruing daily. |
| CHK-017 | Tax audit done if turnover > ₹1 Cr | If turnover > ₹1 Cr, tax audit report exists for current FY. | fpo, tasks | High | Tax audit pending — return cannot be filed. |
| CHK-018 | Equity grant treated as liability | Equity grant entry classified as liability, not income, in books. | ledger | High | Equity grant misclassified — accounting error. |
| CHK-019 | Loan classified correctly | Loan amount in liabilities, repayments split into principal + interest. | ledger | High | Loan accounting incorrect. |
| CHK-020 | Direct/indirect expense split | Expenses correctly classified as direct or indirect. | ledger | Medium | Expense classification needs review. |
| CHK-021 | License not expired | All applicable licenses (FSSAI, Seed, Fert, etc.) have expiry > today. | licenses | Critical | License expired — operations may be illegal. |
| CHK-022 | License renewal alert (90 days) | Flag any license expiring within 90 days. | licenses | Medium | License expiring within 90 days — start renewal. |
| CHK-023 | EPF/ESI filed if applicable | If employee count crosses threshold, EPF/ESI filings up to date. | fpo, tasks | High | EPF/ESI filing overdue. |
| CHK-024 | Audit observations closed | Open audit observations from prior year must be ≤ 30 days old or closed. | observations | Medium | Open audit observation aging > 30 days. |
| CHK-025 | Resolution → Action linked | Every Board/AGM resolution has a linked action with status. | decisions | Low | Resolution without tracked action — governance gap. |
| CHK-026 | Audit trail edit log enabled | Accounting software with edit log used (mandatory since 1 Apr 2023). | fpo | High | Audit trail not enabled — Companies Act breach. |
| CHK-027 | Bank KYC current | Bank KYC update done within prescribed cycle. | banking | High | Bank KYC overdue — account freeze risk. |
| CHK-028 | Equity grant utilisation reported | If equity grant received, annual utilisation certificate filed. | scheme, tasks | High | SFAC equity grant utilisation report pending. |
| CHK-029 | Scheme reporting on time | NABARD/SFAC quarterly reports submitted within 30 days of quarter end. | scheme, tasks | High | Scheme reporting overdue — funding tranche at risk. |
| CHK-030 | Farmer payment dues aging | No farmer payment outstanding > 30 days from procurement. | transactions | Medium | Farmer payments overdue — trust impact. |
## Sheet: Categories
| category_id | category_name | description | filter_color |
| --- | --- | --- | --- |
| CAT-STA | Statutory | Foundational identity and registration compliance (PAN, GST reg, bank). | Dark Green |
| CAT-ROC | ROC | MCA / Companies Act filings (AOC-4, MGT-7, DIR, ADT, MGT-14). | Forest |
| CAT-TAX | Tax | GST, TDS, Income Tax, Advance Tax, Tax Audit. | Earth Gold |
| CAT-AUD | Audit | Statutory audit, internal audit, audit-trail compliance. | Olive |
| CAT-GOV | Governance | AGM, Board Meetings, Registers, Decision tracking, Members. | Mid Green |
| CAT-LAB | Labour | EPF, ESI, PT, Gratuity, Shops & Establishment. | Sage |
| CAT-LIC | License | FSSAI, Seed, Fert, Pest, IEC, APEDA, Organic, WDRA, Mandi, Pollution, NOC. | Amber |
| CAT-SCH | Scheme | NABARD, SFAC, Equity Grant, CGS, MIDH, PMFBY linkage. | Cream Gold |
## Sheet: Document_Types
| doc_type_id | doc_type | category | linked_compliance_examples | retention_years |
| --- | --- | --- | --- | --- |
| DOC-001 | PAN Card | Statutory | ID-PAN | 8 |
| DOC-002 | GSTIN Certificate | Statutory | ID-GST-REG | 8 |
| DOC-003 | Incorporation Certificate | Statutory | ID-PAN, ROC-AOC4 | 99 |
| DOC-004 | GST Return (3B/1/9) | Tax | GST-3B, GST-1, GST-9 | 8 |
| DOC-005 | GST Challan | Tax | GST-3B | 8 |
| DOC-006 | TDS Challan | Tax | TDS-Q | 8 |
| DOC-007 | Form 16 / 16A | Tax | TDS-Q | 8 |
| DOC-008 | ITR Acknowledgement | Tax | TAX-ITR | 8 |
| DOC-009 | Tax Audit Report | Tax | TAX-AUDIT | 8 |
| DOC-010 | Audited Financial Statements | Audit | AUD-STAT, ROC-AOC4 | 99 |
| DOC-011 | Auditor Report | Audit | AUD-STAT | 99 |
| DOC-012 | Board Meeting Minutes | Governance | GOV-BOD | 99 |
| DOC-013 | AGM Minutes | Governance | GOV-AGM | 99 |
| DOC-014 | AGM Notice | Governance | GOV-AGM | 99 |
| DOC-015 | Register of Members | Governance | GOV-MIN | 99 |
| DOC-016 | Register of Directors | Governance | GOV-MIN | 99 |
| DOC-017 | Share Certificate | Governance | MEM-SHARE | 99 |
| DOC-018 | Board Resolution | Governance | ROC-ADT1, ROC-DIR12, MGT-14 | 99 |
| DOC-019 | DIR-3 KYC Form | ROC | ROC-DIR3KYC | 8 |
| DOC-020 | AOC-4 Filing | ROC | ROC-AOC4 | 99 |
| DOC-021 | MGT-7 Filing | ROC | ROC-MGT7 | 99 |
| DOC-022 | Auditor Consent (ADT-1) | ROC | ROC-ADT1 | 99 |
| DOC-023 | EPF ECR / Challan | Labour | LAB-EPF | 8 |
| DOC-024 | ESI Challan / Return | Labour | LAB-ESI | 8 |
| DOC-025 | Shops & Est. Certificate | Labour | LAB-SHOPS | 99 |
| DOC-026 | FSSAI License | License | LIC-FSSAI | 5 |
| DOC-027 | Seed License | License | LIC-SEED | 3 |
| DOC-028 | Fertiliser License | License | LIC-FERT | 3 |
| DOC-029 | Pesticide License | License | LIC-PEST | 2 |
| DOC-030 | IEC Certificate | License | LIC-IEC | 99 |
| DOC-031 | APEDA RCMC | License | LIC-APEDA | 5 |
| DOC-032 | Organic Certification | License | LIC-ORGANIC | 3 |
| DOC-033 | Pollution NOC (CTE/CTO) | License | LIC-POLLUTION | 5 |
| DOC-034 | Panchayat NOC | License | LIC-PANCHAYAT | 1 |
| DOC-035 | Equity Grant Sanction Letter | Scheme | SCH-EQUITY | 99 |
| DOC-036 | Utilisation Certificate | Scheme | SCH-EQUITY, SCH-MIDH | 99 |
| DOC-037 | NABARD/SFAC Progress Report | Scheme | SCH-NABARD, SCH-SFAC | 99 |
| DOC-038 | Procurement Receipt | Operational | REC-BOOKS | 8 |
| DOC-039 | GRN (Goods Receipt Note) | Operational | REC-BOOKS | 8 |
| DOC-040 | Sales Invoice | Operational | REC-BOOKS | 8 |
| DOC-041 | Cash / Bank Voucher | Operational | REC-BOOKS | 8 |
| DOC-042 | Member KYC (Aadhaar/PAN/Bank) | Governance | MEM-KYC | 8 |