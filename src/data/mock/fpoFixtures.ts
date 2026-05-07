import { FPOProfile } from './fpoProfile';

// Spec §5 — Worked Examples
export const FIXTURE_KRISHI: FPOProfile = {
  id: 'FPO-KRISHI',
  name: 'Krishi Kutumb Producer Company Ltd.',
  type: 'Producer Company',
  cin: 'U01100MH2019PTC123456',
  incorporation_date: '2019-08-12',
  fy_close: '03-31',
  member_count: 1247,
  director_count: 5,
  deducts_tds: true,
  last_agm_date: '2025-09-28',
  turnover: 15000000,
  employee_count: 25,
  gstin: '27AADCK1234F1Z5',
  pan: 'AADCK1234F',
  tan: 'MUMA12345B',
  handles_food: true,
  sells_seeds: true,
  sells_fertilisers: true,
  sells_pesticides: false,
  does_export_import: false,
  promoter: 'NABARD',
  state: 'MH',
  equity_grant_received: true
};

export const FIXTURE_HARIYALI: FPOProfile = {
  id: 'FPO-HARIYALI',
  name: 'Hariyali Producer Company',
  type: 'Producer Company',
  cin: 'U01100MP2021PTC654321',
  incorporation_date: '2021-04-10',
  fy_close: '03-31',
  member_count: 350,
  director_count: 5,
  deducts_tds: false,
  last_agm_date: '2025-09-10',
  turnover: 3500000,
  employee_count: 4,
  gstin: '',
  pan: 'BBDCK1234G',
  tan: '',
  handles_food: false,
  sells_seeds: false,
  sells_fertilisers: false,
  sells_pesticides: false,
  does_export_import: false,
  promoter: 'SFAC',
  state: 'MP'
};

export const FIXTURE_ANNADATA: FPOProfile = {
  id: 'FPO-ANNADATA',
  name: 'AnnaData Organic FPO',
  type: 'Producer Company',
  cin: 'U01100KA2018PTC112233',
  incorporation_date: '2018-02-15',
  fy_close: '03-31',
  member_count: 2100,
  director_count: 7,
  deducts_tds: true,
  last_agm_date: '2025-09-25',
  turnover: 60000000,
  employee_count: 18,
  gstin: '29AABCA1234X1Z9',
  pan: 'AABCA1234X',
  tan: 'BLRA12345C',
  handles_food: true,
  sells_seeds: false,
  sells_fertilisers: false,
  sells_pesticides: false,
  does_export_import: true,
  markets_organic: true,
  promoter: 'Independent',
  state: 'KA'
};

// Spec §9 — Test profiles T-01 through T-15
export const TEST_FIXTURES: Record<string, FPOProfile> = {
  'T-01': {
    id: 'T-01', name: 'Minimum PC', type: 'Producer Company',
    turnover: 1000000, employee_count: 2, gstin: '', pan: 'AAAAA1111A', tan: '',
    handles_food: false, sells_seeds: false, sells_fertilisers: false,
    sells_pesticides: false, does_export_import: false, promoter: '',
    cin: 'U1', incorporation_date: '2020-01-01', fy_close: '03-31',
    member_count: 100, director_count: 5, deducts_tds: false, state: 'MP'
  },
  'T-02': {
    id: 'T-02', name: 'GST PC', type: 'Producer Company',
    turnover: 5000000, employee_count: 2, gstin: '27AA', pan: 'AAAAA1111A', tan: '',
    handles_food: false, sells_seeds: false, sells_fertilisers: false,
    sells_pesticides: false, does_export_import: false, promoter: '',
    cin: 'U2', incorporation_date: '2020-01-01', fy_close: '03-31',
    member_count: 100, director_count: 5, deducts_tds: false, state: 'MP'
  },
  'T-05': {
    id: 'T-05', name: 'ESI PC', type: 'Producer Company',
    turnover: 1000000, employee_count: 15, gstin: '', pan: 'AAAAA1111A', tan: '',
    handles_food: false, sells_seeds: false, sells_fertilisers: false,
    sells_pesticides: false, does_export_import: false, promoter: '',
    cin: 'U5', incorporation_date: '2020-01-01', fy_close: '03-31',
    member_count: 100, director_count: 5, deducts_tds: false, state: 'MP'
  },
  'T-06': {
    id: 'T-06', name: 'EPF ESI PC', type: 'Producer Company',
    turnover: 1000000, employee_count: 25, gstin: '', pan: 'AAAAA1111A', tan: '',
    handles_food: false, sells_seeds: false, sells_fertilisers: false,
    sells_pesticides: false, does_export_import: false, promoter: '',
    cin: 'U6', incorporation_date: '2020-01-01', fy_close: '03-31',
    member_count: 100, director_count: 5, deducts_tds: false, state: 'MP'
  }
};
