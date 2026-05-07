export interface ApplicabilityRule {
  ruleId: string;
  complianceId: string;
  conditionField: string;
  operator: '=' | '>' | '>=' | 'in' | 'exists' | string;
  value: string;
  logicNote: string;
}

export const APPLICABILITY_RULES: ApplicabilityRule[] = [
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
    "logicNote": "Monthly if turnover > \u20b95Cr; else QRMP quarterly."
  },
  {
    "ruleId": "R-013",
    "complianceId": "GST-9",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "2,00,00,000",
    "logicNote": "Required above \u20b92 Cr turnover."
  },
  {
    "ruleId": "R-014",
    "complianceId": "GST-9C",
    "conditionField": "fpo.turnover",
    "operator": ">",
    "value": "5,00,00,000",
    "logicNote": "Required above \u20b95 Cr turnover."
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
    "logicNote": "Threshold \u20b91 Cr (\u20b910 Cr digital)."
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
    "logicNote": "Or turnover > \u20b9200 Cr."
  },
  {
    "ruleId": "R-032",
    "complianceId": "AUD-COSTAUD",
    "conditionField": "fpo.sector",
    "operator": "in",
    "value": "Regulated List",
    "logicNote": "Sector + turnover > \u20b935 Cr."
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
