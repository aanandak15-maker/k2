import { generateNabardMIS } from './nabardMISGenerator';
import { generateMCAFiling } from './mcaFilingGenerator';
import { generateTraceabilityReport } from './traceabilityReportBuilder';
import { FPOProfile } from '../../data/mock/fpoProfile';

export type ReportType = 'NABARD_MIS' | 'MCA_AOC4' | 'MCA_MGT7' | 'TRACEABILITY' | 'AUDIT_PACK';

export interface ReportGenerationRequest {
  type: ReportType;
  fpoId: string;
  periodStart?: string;
  periodEnd?: string;
  options?: Record<string, any>;
}

export interface GeneratedReport {
  id: string;
  title: string;
  type: ReportType;
  generatedAt: string;
  data: any; // Raw JSON data for preview
  status: 'ready' | 'failed' | 'generating';
  downloadUrl?: string; // Stub for PDF/CSV download link
}

export class ReportFactory {
  async generate(request: ReportGenerationRequest, fpoProfile: FPOProfile): Promise<GeneratedReport> {
    console.log(`[ReportFactory] Generating ${request.type} report for ${fpoProfile.name}`);
    
    // Simulate generation delay for UI
    await new Promise(resolve => setTimeout(resolve, 800));

    let data;
    switch (request.type) {
      case 'NABARD_MIS':
        data = generateNabardMIS(fpoProfile, request.periodStart, request.periodEnd);
        break;
      case 'MCA_AOC4':
        data = generateMCAFiling(fpoProfile, 'AOC-4');
        break;
      case 'MCA_MGT7':
        data = generateMCAFiling(fpoProfile, 'MGT-7');
        break;
      case 'TRACEABILITY':
        data = generateTraceabilityReport(fpoProfile, request.options?.buyerId);
        break;
      default:
        throw new Error(`Report type ${request.type} not supported yet.`);
    }

    return {
      id: `REP-${Date.now()}`,
      title: `${request.type.replace('_', ' ')} - ${new Date().toLocaleDateString()}`,
      type: request.type,
      generatedAt: new Date().toISOString(),
      status: 'ready',
      data,
    };
  }
}

export const reportFactory = new ReportFactory();
