import { APPLICABILITY_RULES } from '../data/applicabilityRules';
import { COMPLIANCE_CATALOG, ComplianceCatalogItem } from '../data/complianceCatalog';
import { FPOProfile } from '../data/mock/fpoProfile';

export interface ApplicableCompliance extends ComplianceCatalogItem {
  dueDate: string | null;
  assigneeRole: string;
  triggeredBy: string;
  status: 'pending';
}

export function runApplicabilityEngine(fpoProfile: FPOProfile): ApplicableCompliance[] {
  let applicableList: ApplicableCompliance[] = [];

  for (const rule of APPLICABILITY_RULES) {
    if (rule.operator === 'event' || rule.conditionField === 'event') {
      continue; // Event rules are handled by the event bus
    }

    if (evaluateRule(rule, fpoProfile)) {
      const catalogItem = COMPLIANCE_CATALOG.find(c => c.complianceId === rule.complianceId);
      if (catalogItem) {
        applicableList.push({
          ...catalogItem,
          dueDate: computeDueDate(catalogItem, fpoProfile),
          assigneeRole: resolveAssignee(catalogItem.category),
          triggeredBy: rule.ruleId,
          status: 'pending'
        });
      }
    }
  }

  return dedupe(applicableList);
}

export function evaluateRule(rule: any, profile: FPOProfile): boolean {
  const { conditionField, operator, value } = rule;
  
  if (operator === 'event' || conditionField === 'event') return false;

  const parts = conditionField.replace('fpo.', '').split('.');
  let actualValue: any = profile;
  for (const p of parts) {
    if (actualValue !== undefined && actualValue !== null) {
      actualValue = actualValue[p as keyof typeof actualValue];
    } else {
      actualValue = undefined;
      break;
    }
  }

  // If actualValue is undefined after path traversal, and operator is not 'exists', the rule fails
  if (actualValue === undefined && operator !== 'exists') {
    return false;
  }

  let expectedValue: any = value;
  if (value === 'true') expectedValue = true;
  if (value === 'false') expectedValue = false;
  if (typeof value === 'string' && !isNaN(Number(value.replace(/,/g, ''))) && value.trim() !== '') {
      expectedValue = Number(value.replace(/,/g, ''));
  }

  switch (operator) {
    case '=':
    case '==':
      return String(actualValue) === String(expectedValue);
    case '!=':
      return String(actualValue) !== String(expectedValue);
    case '>':
      return Number(actualValue) > Number(expectedValue);
    case '>=':
      return Number(actualValue) >= Number(expectedValue);
    case '<':
      return Number(actualValue) < Number(expectedValue);
    case '<=':
      return Number(actualValue) <= Number(expectedValue);
    case 'in':
      if (typeof expectedValue === 'string') {
        return expectedValue.split(',').map((v:string)=>v.trim()).includes(String(actualValue));
      }
      return false;
    case 'exists':
      if (expectedValue === true) return actualValue !== undefined && actualValue !== null && actualValue !== '';
      if (expectedValue === false) return actualValue === undefined || actualValue === null || actualValue === '';
      return false;
    default:
      return false;
  }
}

export function computeFYEnd(today: Date, fyClose: string): Date {
  // fyClose format "MM-DD" e.g. "03-31"
  const [monthStr, dayStr] = fyClose.split('-');
  const month = parseInt(monthStr, 10) - 1; // 0-indexed
  const day = parseInt(dayStr, 10);
  
  let year = today.getFullYear();
  const fyEndDate = new Date(year, month, day);
  
  // If today is after this year's FY end, the next FY end is next year
  if (today.getTime() > fyEndDate.getTime()) {
    fyEndDate.setFullYear(year + 1);
  }
  return fyEndDate;
}

export function addDays(dateStr: string | Date, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function extractDays(ruleStr: string): number {
  const match = ruleStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 30;
}

export function parseMonthlyRule(rule: string, today: Date): string {
  const d = new Date(today);
  d.setMonth(d.getMonth() + 1); // next month
  
  if (rule.includes('20th')) {
    d.setDate(20);
  } else if (rule.includes('15th')) {
    d.setDate(15);
  } else if (rule.includes('11th')) {
    d.setDate(11);
  } else {
    d.setDate(30); // fallback
  }
  return d.toISOString().split('T')[0];
}

export function parseQuarterlyRule(rule: string, today: Date): string {
  const month = today.getMonth();
  const year = today.getFullYear();
  let nextQuarterMonth = 0;
  
  if (month <= 2) nextQuarterMonth = 3; // Jan-Mar -> Apr
  else if (month <= 5) nextQuarterMonth = 6; // Apr-Jun -> Jul
  else if (month <= 8) nextQuarterMonth = 9; // Jul-Sep -> Oct
  else nextQuarterMonth = 12; // Oct-Dec -> Jan next year
  
  const d = new Date(year, nextQuarterMonth, 1);
  
  if (rule.includes('15')) {
    // Advance tax quarterly is 15 Jun, 15 Sep, 15 Dec, 15 Mar
    const dates = [
      new Date(year, 2, 15), // Mar 15
      new Date(year, 5, 15), // Jun 15
      new Date(year, 8, 15), // Sep 15
      new Date(year, 11, 15), // Dec 15
      new Date(year + 1, 2, 15) // Mar 15 next year
    ];
    for (const target of dates) {
      if (target.getTime() >= today.getTime()) {
        return target.toISOString().split('T')[0];
      }
    }
  }

  if (rule.includes('31st')) {
    // End of next month following quarter
    d.setMonth(nextQuarterMonth + 1, 0); // 0th day of next month is last day of current month
    return d.toISOString().split('T')[0];
  }
  
  // Within 30 days of quarter end
  d.setDate(30);
  return d.toISOString().split('T')[0];
}

export function parseFixedAnnualDate(rule: string, fyEnd: Date): string {
  const year = fyEnd.getFullYear();
  
  if (rule.includes('30 September') || rule.includes('30th September') || rule.includes('By 30 September')) {
    return new Date(year, 8, 30).toISOString().split('T')[0];
  }
  if (rule.includes('31st December') || rule.includes('31 December')) {
    return new Date(year, 11, 31).toISOString().split('T')[0];
  }
  if (rule.includes('31st October') || rule.includes('31 October')) {
    return new Date(year, 9, 31).toISOString().split('T')[0];
  }
  if (rule.includes('31st July') || rule.includes('31 July')) {
    return new Date(year, 6, 31).toISOString().split('T')[0];
  }
  
  return addDays(fyEnd, 180); // default 6 months after FY end
}

export function normalizeFrequency(freq: string): string {
  const f = freq.toLowerCase();
  if (f.includes('monthly')) return 'monthly';
  if (f.includes('quarterly')) return 'quarterly';
  if (f.includes('annual')) return 'annual';
  if (f.includes('event')) return 'event_based';
  if (f.includes('one-time')) return 'one_time';
  if (f.includes('renewal')) return 'annual'; // treat renewals like annual for due date logic
  return 'annual';
}

export function computeDueDate(item: ComplianceCatalogItem, fpo: FPOProfile): string | null {
  const today = new Date();
  const fyEnd = computeFYEnd(today, fpo.fy_close || '03-31');

  switch (normalizeFrequency(item.frequency)) {
    case 'monthly':
      return parseMonthlyRule(item.dueRule, today);
    case 'quarterly':
      return parseQuarterlyRule(item.dueRule, today);
    case 'annual':
      if (item.dueRule.includes('AGM')) {
        return addDays(fpo.last_agm_date || fyEnd.toISOString(), extractDays(item.dueRule));
      }
      return parseFixedAnnualDate(item.dueRule, fyEnd);
    case 'event_based':
    case 'one_time':
      return null; // Event-based dates are handled when the event occurs
    default:
      return addDays(today, 30);
  }
}

export function resolveAssignee(category: string): string {
  const map: Record<string, string> = {
    'CAT-STA': 'Admin',
    'CAT-ROC': 'Accountant',
    'CAT-TAX': 'Accountant',
    'CAT-AUD': 'Auditor',
    'CAT-GOV': 'CEO',
    'CAT-LAB': 'Accountant',
    'CAT-LIC': 'Admin',
    'CAT-SCH': 'CEO',
  };
  return map[category] || 'Admin';
}

export function dedupe(list: ApplicableCompliance[]): ApplicableCompliance[] {
  const map = new Map<string, ApplicableCompliance>();
  for (const item of list) {
    const existing = map.get(item.complianceId);
    if (!existing) { 
      map.set(item.complianceId, item); 
      continue; 
    }
    
    // If conflict, keep the one with earlier due date
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

// For backward compatibility while refactoring consumers:
export function getApplicableCompliances(fpoProfile: FPOProfile): ComplianceCatalogItem[] {
  return runApplicabilityEngine(fpoProfile);
}
