import { FPOProfile } from '../../data/mock/fpoProfile';

export function generateNabardMIS(fpo: FPOProfile, periodStart?: string, periodEnd?: string) {
  // In a real app, we would query the ERP databases (finance, procurement, farmers)
  // For demo, we simulate the aggregation based on the FPO profile.
  
  return {
    reportId: `NABARD-MIS-${fpo.id}-${Date.now()}`,
    fpoDetails: {
      name: fpo.name,
      registrationNumber: fpo.cin,
      dateOfIncorporation: fpo.incorporation_date,
      promoter: fpo.promoter,
    },
    period: {
      start: periodStart || '2025-04-01',
      end: periodEnd || '2025-06-30'
    },
    memberMetrics: {
      totalMembers: fpo.member_count,
      activeMembers: Math.floor(fpo.member_count * 0.85), // simulated
      newMembersThisQuarter: 42,
      shareCapitalRaised: fpo.paid_up_capital || 0,
    },
    businessMetrics: {
      turnover: fpo.turnover,
      inputSalesVolume: 1250000,
      outputProcurementVolume: 3400000,
      profitability: 'Positive',
    },
    governance: {
      boardMeetingsHeld: 1,
      agmConducted: true,
      lastAgmDate: fpo.last_agm_date || 'N/A'
    },
    grantUtilization: {
      equityGrantReceived: fpo.equity_grant_received,
      utilizationPercentage: 85 // simulated
    }
  };
}
