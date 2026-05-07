export interface FPOProfile {
  id: string;
  name: string;
  type: string;
  cin: string;
  incorporation_date: string;
  fy_close: string;
  member_count: number;
  director_count: number;
  deducts_tds: boolean;
  last_agm_date?: string;
  turnover: number;
  employee_count: number;
  gstin: string;
  pan: string;
  tan: string;
  handles_food: boolean;
  sells_seeds: boolean;
  sells_fertilisers: boolean;
  sells_pesticides: boolean;
  does_export_import: boolean;
  promoter: string;
  state?: string;
  paid_up_capital?: number;
  estimated_tax?: number;
  sector?: string;
  has_open_resolutions?: boolean;
  has_commercial_premises?: boolean;
  exports_scheduled_products?: boolean;
  markets_organic?: boolean;
  operates_warehouse?: boolean;
  trades_in_apmc?: boolean;
  has_processing_unit?: boolean;
  has_premises?: boolean;
  equity_grant_received?: boolean;
  has_cgs_loan?: boolean;
  midh_grant_received?: boolean;
  declares_patronage?: boolean;
  has_assets_to_insure?: boolean;
  facilitates_crop_insurance?: boolean;
  uses_accounting_software?: boolean;
}

export const DEMO_FPO_PROFILE: FPOProfile = {
  id: "FPO-001",
  name: "Krishi Kutumb Producer Company Ltd.",
  type: "Producer Company",
  cin: "U01100MH2019PTC123456",
  incorporation_date: "2019-08-12",
  fy_close: "03-31",
  member_count: 1247,
  director_count: 5,
  deducts_tds: true,
  last_agm_date: "2025-09-28",
  turnover: 20000000, // ₹2 Cr
  employee_count: 25,
  gstin: "27AADCK1234F1Z5",
  pan: "AADCK1234F",
  tan: "MUMA12345B",
  handles_food: true,
  sells_seeds: false,
  sells_fertilisers: false,
  sells_pesticides: false,
  does_export_import: false,
  promoter: "NABARD",
  state: "MH",
  paid_up_capital: 1500000,
  estimated_tax: 25000,
  sector: "Agriculture",
  has_open_resolutions: true,
  has_commercial_premises: true,
  exports_scheduled_products: false,
  markets_organic: false,
  operates_warehouse: false,
  trades_in_apmc: true,
  has_processing_unit: true,
  has_premises: true,
  equity_grant_received: true,
  has_cgs_loan: true,
  midh_grant_received: false,
  declares_patronage: true,
  has_assets_to_insure: true,
  facilitates_crop_insurance: true,
  uses_accounting_software: true
};
