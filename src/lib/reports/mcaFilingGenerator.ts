import { FPOProfile } from '../../data/mock/fpoProfile';

export function generateMCAFiling(fpo: FPOProfile, formType: 'AOC-4' | 'MGT-7') {
  if (formType === 'AOC-4') {
    return {
      formIdentifier: 'AOC-4_Financial_Statement',
      cin: fpo.cin,
      companyName: fpo.name,
      financialYearEnd: fpo.fy_close,
      financialData: {
        turnover: fpo.turnover,
        paidUpCapital: fpo.paid_up_capital || 0,
        reservesAndSurplus: 450000, // simulated
        longTermBorrowings: fpo.has_cgs_loan ? 1500000 : 0,
        shortTermBorrowings: 200000,
        tradePayables: 350000,
        tangibleAssets: 800000,
        cashAndEquivalents: 1200000
      },
      auditorDetails: {
        firmName: 'Sharma & Associates',
        firmRegistrationNumber: '123456W'
      }
    };
  }

  if (formType === 'MGT-7') {
    return {
      formIdentifier: 'MGT-7_Annual_Return',
      cin: fpo.cin,
      companyName: fpo.name,
      registeredOffice: '123, Krishi Bhavan, Main Road, City',
      principalBusinessActivity: fpo.sector || 'Agriculture',
      memberDetails: {
        totalMembers: fpo.member_count,
        promoterHoldingPercentage: 0,
        publicHoldingPercentage: 100
      },
      directorDetails: {
        totalDirectors: fpo.director_count,
        changesDuringYear: 0
      },
      meetings: {
        boardMeetingsHeld: 4,
        agmDate: fpo.last_agm_date || 'N/A'
      }
    };
  }

  throw new Error(`Unsupported MCA form type: ${formType}`);
}
