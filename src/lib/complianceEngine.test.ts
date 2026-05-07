import { runApplicabilityEngine } from './complianceEngine';
import { FIXTURE_KRISHI, FIXTURE_HARIYALI, FIXTURE_ANNADATA, TEST_FIXTURES } from '../data/mock/fpoFixtures';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

console.log("=== Running K2 Compliance Engine Tests ===\n");

// T-01: Minimum PC
const t01 = runApplicabilityEngine(TEST_FIXTURES['T-01']);
const t01ids = t01.map(c => c.complianceId);
assert(t01ids.includes('ROC-AOC4'), 'T-01: must include ROC-AOC4');
assert(t01ids.includes('GOV-AGM'), 'T-01: must include GOV-AGM');
assert(!t01ids.some(id => id.startsWith('GST-')), 'T-01: must NOT include GST-*');
assert(!t01ids.some(id => id.startsWith('LAB-')), 'T-01: must NOT include LAB-*');

// T-02: GST PC
const t02 = runApplicabilityEngine(TEST_FIXTURES['T-02']);
const t02ids = t02.map(c => c.complianceId);
assert(t02ids.includes('GST-3B'), 'T-02: must include GST-3B');
assert(!t02ids.includes('GST-9C'), 'T-02: must NOT include GST-9C (needs > 5Cr)');

// T-05: 15 Employees
const t05 = runApplicabilityEngine(TEST_FIXTURES['T-05']);
const t05ids = t05.map(c => c.complianceId);
assert(t05ids.includes('LAB-ESI'), 'T-05: must include LAB-ESI (10+ emp)');
assert(!t05ids.includes('LAB-EPF'), 'T-05: must NOT include LAB-EPF (needs 20+ emp)');

// T-06: 25 Employees
const t06 = runApplicabilityEngine(TEST_FIXTURES['T-06']);
const t06ids = t06.map(c => c.complianceId);
assert(t06ids.includes('LAB-EPF'), 'T-06: must include LAB-EPF (20+ emp)');

// Krishi FPO
const krishi = runApplicabilityEngine(FIXTURE_KRISHI);
const krishiIds = krishi.map(c => c.complianceId);
assert(krishiIds.includes('LAB-EPF'), 'Krishi: must include LAB-EPF (25 emp)');
assert(krishiIds.includes('SCH-EQUITY'), 'Krishi: must include SCH-EQUITY (grant received)');

// Hariyali FPO
const hariyali = runApplicabilityEngine(FIXTURE_HARIYALI);
const hariyaliIds = hariyali.map(c => c.complianceId);
assert(!hariyaliIds.includes('LAB-EPF'), 'Hariyali: must NOT include LAB-EPF');
assert(!hariyaliIds.some(id => id.startsWith('GST-')), 'Hariyali: must NOT include GST-*');

// AnnaData FPO
const annaData = runApplicabilityEngine(FIXTURE_ANNADATA);
const annaIds = annaData.map(c => c.complianceId);
assert(annaIds.includes('LIC-IEC'), 'AnnaData: must include LIC-IEC (exports)');
assert(annaIds.includes('LIC-ORGANIC'), 'AnnaData: must include LIC-ORGANIC (organic)');

console.log(`\n=== Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
if (failCount > 0) process.exit(1);
