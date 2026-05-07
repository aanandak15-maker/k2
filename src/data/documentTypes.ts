export interface DocumentTypeInfo {
  docTypeId: string;
  docType: string;
  category: string;
  linkedComplianceExamples: string[];
  retentionYears: number;
}

export const DOCUMENT_TYPES: DocumentTypeInfo[] = [
  {
    "docTypeId": "DOC-001",
    "docType": "PAN Card",
    "category": "Statutory",
    "linkedComplianceExamples": [
      "ID-PAN"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-002",
    "docType": "GSTIN Certificate",
    "category": "Statutory",
    "linkedComplianceExamples": [
      "ID-GST-REG"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-003",
    "docType": "Incorporation Certificate",
    "category": "Statutory",
    "linkedComplianceExamples": [
      "ID-PAN",
      "ROC-AOC4"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-004",
    "docType": "GST Return (3B/1/9)",
    "category": "Tax",
    "linkedComplianceExamples": [
      "GST-3B",
      "GST-1",
      "GST-9"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-005",
    "docType": "GST Challan",
    "category": "Tax",
    "linkedComplianceExamples": [
      "GST-3B"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-006",
    "docType": "TDS Challan",
    "category": "Tax",
    "linkedComplianceExamples": [
      "TDS-Q"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-007",
    "docType": "Form 16 / 16A",
    "category": "Tax",
    "linkedComplianceExamples": [
      "TDS-Q"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-008",
    "docType": "ITR Acknowledgement",
    "category": "Tax",
    "linkedComplianceExamples": [
      "TAX-ITR"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-009",
    "docType": "Tax Audit Report",
    "category": "Tax",
    "linkedComplianceExamples": [
      "TAX-AUDIT"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-010",
    "docType": "Audited Financial Statements",
    "category": "Audit",
    "linkedComplianceExamples": [
      "AUD-STAT",
      "ROC-AOC4"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-011",
    "docType": "Auditor Report",
    "category": "Audit",
    "linkedComplianceExamples": [
      "AUD-STAT"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-012",
    "docType": "Board Meeting Minutes",
    "category": "Governance",
    "linkedComplianceExamples": [
      "GOV-BOD"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-013",
    "docType": "AGM Minutes",
    "category": "Governance",
    "linkedComplianceExamples": [
      "GOV-AGM"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-014",
    "docType": "AGM Notice",
    "category": "Governance",
    "linkedComplianceExamples": [
      "GOV-AGM"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-015",
    "docType": "Register of Members",
    "category": "Governance",
    "linkedComplianceExamples": [
      "GOV-MIN"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-016",
    "docType": "Register of Directors",
    "category": "Governance",
    "linkedComplianceExamples": [
      "GOV-MIN"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-017",
    "docType": "Share Certificate",
    "category": "Governance",
    "linkedComplianceExamples": [
      "MEM-SHARE"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-018",
    "docType": "Board Resolution",
    "category": "Governance",
    "linkedComplianceExamples": [
      "ROC-ADT1",
      "ROC-DIR12",
      "MGT-14"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-019",
    "docType": "DIR-3 KYC Form",
    "category": "ROC",
    "linkedComplianceExamples": [
      "ROC-DIR3KYC"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-020",
    "docType": "AOC-4 Filing",
    "category": "ROC",
    "linkedComplianceExamples": [
      "ROC-AOC4"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-021",
    "docType": "MGT-7 Filing",
    "category": "ROC",
    "linkedComplianceExamples": [
      "ROC-MGT7"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-022",
    "docType": "Auditor Consent (ADT-1)",
    "category": "ROC",
    "linkedComplianceExamples": [
      "ROC-ADT1"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-023",
    "docType": "EPF ECR / Challan",
    "category": "Labour",
    "linkedComplianceExamples": [
      "LAB-EPF"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-024",
    "docType": "ESI Challan / Return",
    "category": "Labour",
    "linkedComplianceExamples": [
      "LAB-ESI"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-025",
    "docType": "Shops & Est. Certificate",
    "category": "Labour",
    "linkedComplianceExamples": [
      "LAB-SHOPS"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-026",
    "docType": "FSSAI License",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-FSSAI"
    ],
    "retentionYears": 5
  },
  {
    "docTypeId": "DOC-027",
    "docType": "Seed License",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-SEED"
    ],
    "retentionYears": 3
  },
  {
    "docTypeId": "DOC-028",
    "docType": "Fertiliser License",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-FERT"
    ],
    "retentionYears": 3
  },
  {
    "docTypeId": "DOC-029",
    "docType": "Pesticide License",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-PEST"
    ],
    "retentionYears": 2
  },
  {
    "docTypeId": "DOC-030",
    "docType": "IEC Certificate",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-IEC"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-031",
    "docType": "APEDA RCMC",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-APEDA"
    ],
    "retentionYears": 5
  },
  {
    "docTypeId": "DOC-032",
    "docType": "Organic Certification",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-ORGANIC"
    ],
    "retentionYears": 3
  },
  {
    "docTypeId": "DOC-033",
    "docType": "Pollution NOC (CTE/CTO)",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-POLLUTION"
    ],
    "retentionYears": 5
  },
  {
    "docTypeId": "DOC-034",
    "docType": "Panchayat NOC",
    "category": "License",
    "linkedComplianceExamples": [
      "LIC-PANCHAYAT"
    ],
    "retentionYears": 1
  },
  {
    "docTypeId": "DOC-035",
    "docType": "Equity Grant Sanction Letter",
    "category": "Scheme",
    "linkedComplianceExamples": [
      "SCH-EQUITY"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-036",
    "docType": "Utilisation Certificate",
    "category": "Scheme",
    "linkedComplianceExamples": [
      "SCH-EQUITY",
      "SCH-MIDH"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-037",
    "docType": "NABARD/SFAC Progress Report",
    "category": "Scheme",
    "linkedComplianceExamples": [
      "SCH-NABARD",
      "SCH-SFAC"
    ],
    "retentionYears": 99
  },
  {
    "docTypeId": "DOC-038",
    "docType": "Procurement Receipt",
    "category": "Operational",
    "linkedComplianceExamples": [
      "REC-BOOKS"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-039",
    "docType": "GRN (Goods Receipt Note)",
    "category": "Operational",
    "linkedComplianceExamples": [
      "REC-BOOKS"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-040",
    "docType": "Sales Invoice",
    "category": "Operational",
    "linkedComplianceExamples": [
      "REC-BOOKS"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-041",
    "docType": "Cash / Bank Voucher",
    "category": "Operational",
    "linkedComplianceExamples": [
      "REC-BOOKS"
    ],
    "retentionYears": 8
  },
  {
    "docTypeId": "DOC-042",
    "docType": "Member KYC (Aadhaar/PAN/Bank)",
    "category": "Governance",
    "linkedComplianceExamples": [
      "MEM-KYC"
    ],
    "retentionYears": 8
  }
];
