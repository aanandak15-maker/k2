import { AUDIT_CHECK_RULES } from '../auditChecks';
import { DEMO_FPO_PROFILE } from './fpoProfile';
import { calculateHealthScore } from '../healthScoreEngine';
import { mockComplianceTasks } from './complianceCalendar';

export interface AuditChecklistItem {
    id: string;
    category: string;
    name: string;
    description: string;
    isRequired: boolean;
    isAvailable: boolean;
    status: 'pass' | 'warn' | 'fail';
    lastUpdated?: string;
    gapDescription?: string;
}

export interface AuditReadinessData {
    overallScore: number;
    lastAuditDate: string;
    nextAuditDate: string;
    auditorName: string;
    checklists: Record<string, AuditChecklistItem[]>;
}

function generateAuditChecks(): AuditReadinessData {
    // Generate checklists from AUDIT_CHECK_RULES
    const checklists: Record<string, AuditChecklistItem[]> = {};
    
    // Simple grouping logic based on checkId prefixes or trigger data
    AUDIT_CHECK_RULES.forEach((rule, idx) => {
        // Group by rough category
        let cat = 'General Compliance';
        if (rule.triggerData.includes('transactions') || rule.triggerData.includes('ledger') || rule.triggerData.includes('stock')) cat = 'Financial Records';
        else if (rule.triggerData.includes('members') || rule.triggerData.includes('directors')) cat = 'Member & Director Records';
        else if (rule.triggerData.includes('documents') || rule.triggerData.includes('registers')) cat = 'Statutory Documents';
        else if (rule.triggerData.includes('scheme') || rule.triggerData.includes('fpo')) cat = 'Scheme & FPO Level';

        if (!checklists[cat]) checklists[cat] = [];

        // Pseudo-random evaluation for demo
        const isPass = (idx % 3 !== 0); 
        const isWarn = !isPass && (idx % 2 === 0);
        const status = isPass ? 'pass' : (isWarn ? 'warn' : 'fail');

        checklists[cat].push({
            id: rule.checkId,
            category: cat,
            name: rule.checkName,
            description: rule.rule,
            isRequired: true,
            isAvailable: isPass,
            status: status,
            gapDescription: isPass ? undefined : rule.userMessage,
            lastUpdated: new Date().toISOString().split('T')[0]
        });
    });

    return {
        overallScore: calculateHealthScore(mockComplianceTasks).score,
        lastAuditDate: '2024-09-15',
        nextAuditDate: '2025-09-30',
        auditorName: 'Sharma & Associates, CAs',
        checklists
    };
}

export const mockAuditReadiness: AuditReadinessData = generateAuditChecks();
