import { DOCUMENT_TYPES } from '../documentTypes';

export interface FpoDocument {
    id: string;
    docTypeId: string;
    name: string;
    category: string;
    uploadDate: string;
    uploadedBy: string;
    sizeBytes: number;
    type: string;
    version: number;
    status: 'Draft' | 'Pending Review' | 'Verified' | 'Archived';
    tags: string[];
    isConfidential: boolean;
    linkedComplianceId?: string;
    retentionYears: number;
}

export const mockDocuments: FpoDocument[] = [];

// Generate mock documents based on doc types
DOCUMENT_TYPES.forEach((dt, i) => {
    // Generate a couple of mock docs per type if it's high priority, else 1
    const count = dt.category === 'Statutory' || dt.category === 'ROC' ? 2 : 1;
    
    for (let c = 0; c < count; c++) {
        mockDocuments.push({
            id: `DOC-${dt.docTypeId}-${c}`,
            docTypeId: dt.docTypeId,
            name: `${dt.docType} ${c === 1 ? '(Update)' : ''}`.trim(),
            category: dt.category,
            uploadDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            uploadedBy: 'Admin User',
            sizeBytes: Math.floor(Math.random() * 5000000) + 100000,
            type: 'pdf',
            version: c + 1,
            status: c === 0 ? 'Verified' : 'Pending Review',
            tags: dt.linkedComplianceExamples,
            isConfidential: ['ROC', 'Statutory', 'Audit', 'Governance', 'Tax'].includes(dt.category),
            retentionYears: dt.retentionYears
        });
    }
});
