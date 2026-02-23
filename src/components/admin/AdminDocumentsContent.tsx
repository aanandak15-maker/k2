import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Filter, FileText, Download, MoreVertical, FolderOpen, AlertCircle, X, UploadCloud } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const initialDocuments = [
    { id: 'DOC-001', name: 'ROC Annual Return (MGT-7) 2024', category: 'Compliance', uploadDate: '2024-11-15', size: '2.4 MB', expiry: null, status: 'Active' },
    { id: 'DOC-002', name: 'GST Certificate', category: 'Statutory', uploadDate: '2022-04-10', size: '1.1 MB', expiry: null, status: 'Active' },
    { id: 'DOC-003', name: 'Trade License Renewal', category: 'Statutory', uploadDate: '2024-03-01', size: '850 KB', expiry: '2025-03-31', status: 'Expiring Soon' },
    { id: 'DOC-004', name: 'NABARD Grant Utilization R3', category: 'Financial', uploadDate: '2024-12-10', size: '4.5 MB', expiry: null, status: 'Active' },
    { id: 'DOC-005', name: 'Board Resolution - Bank Auth', category: 'Governance', uploadDate: '2023-01-20', size: '1.2 MB', expiry: null, status: 'Active' },
    { id: 'DOC-006', name: 'Pesticide Storage License', category: 'Operational', uploadDate: '2021-02-15', size: '1.8 MB', expiry: '2024-02-15', status: 'Expired' },
];

export default function AdminDocumentsContent() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [documents, setDocuments] = useState(initialDocuments);

    // Form State
    const [newDoc, setNewDoc] = useState({
        name: '',
        category: 'Statutory',
        expiry: ''
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();

        let status = 'Active';
        if (newDoc.expiry) {
            const expiryDate = new Date(newDoc.expiry);
            const today = new Date();
            const daysLeft = (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
            if (daysLeft < 0) status = 'Expired';
            else if (daysLeft <= 30) status = 'Expiring Soon';
        }

        const doc = {
            id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
            name: newDoc.name,
            category: newDoc.category,
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
            expiry: newDoc.expiry || null,
            status: status
        };

        setDocuments([doc, ...documents]);
        toast({ message: `Document "${doc.name}" uploaded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setNewDoc({ name: '', category: 'Statutory', expiry: '' });
    };

    const statutoryCount = documents.filter(d => d.category === 'Statutory' || d.category === 'Compliance').length;
    const financialCount = documents.filter(d => d.category === 'Financial').length;
    const governanceCount = documents.filter(d => d.category === 'Governance').length;
    const attentionNeeded = documents.filter(d => d.status === 'Expired' || d.status === 'Expiring Soon').length;

    const filteredDocuments = documents.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Document Vault</h2>
                    <p className="text-sm text-slate-500 mt-1">Securely manage statutory, financial, and operational documents.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Upload Document
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-l-blue-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 text-sm font-medium mb-1">Statutory & Compliance</div>
                            <div className="text-2xl font-bold text-slate-900">{statutoryCount}</div>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <FolderOpen size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-l-purple-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 text-sm font-medium mb-1">Financial</div>
                            <div className="text-2xl font-bold text-slate-900">{financialCount}</div>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <FolderOpen size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-l-4 border-l-emerald-500">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <div className="text-slate-500 text-sm font-medium mb-1">Governance</div>
                            <div className="text-2xl font-bold text-slate-900">{governanceCount}</div>
                        </div>
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <FolderOpen size={20} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:bg-red-50 transition-colors cursor-pointer border-l-4 border-l-red-500 bg-red-50/50">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <div className="text-red-700 text-sm font-medium mb-1">Attention Needed</div>
                            <div className="text-2xl font-bold text-red-800">{attentionNeeded}</div>
                        </div>
                        <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center text-red-600">
                            <AlertCircle size={20} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>All Documents</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search documents by name or category..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Document Name</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Category</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Upload Date</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Expiry</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredDocuments.map(doc => (
                                    <tr key={doc.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800 flex items-center gap-2">
                                                <FileText size={16} className={doc.status === 'Expired' ? 'text-red-400' : 'text-slate-400'} />
                                                {doc.name}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5 ml-6">{doc.size}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="default" className="bg-slate-100 text-slate-700 border-0">{doc.category}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(doc.uploadDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {doc.expiry ? new Date(doc.expiry).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={
                                                doc.status === 'Active' ? 'success' :
                                                    doc.status === 'Expired' ? 'danger' : 'warning'
                                            }>
                                                {doc.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => toast({ message: `Downloading ${doc.name}...`, variant: 'info' })}
                                                    className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                                                >
                                                    <Download size={16} />
                                                </button>
                                                <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredDocuments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No documents found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Upload Document Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900">Upload New Document</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpload} className="p-6 space-y-4">
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                <UploadCloud className="text-emerald-500 mb-2" size={32} />
                                <div className="text-sm font-medium text-slate-700">Click to browse or drag file here</div>
                                <div className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Document Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. FY24 Audit Report"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newDoc.name}
                                    onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newDoc.category}
                                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                                >
                                    <option value="Statutory">Statutory / Legal</option>
                                    <option value="Compliance">Compliance</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Governance">Governance (Board Res, Minutes)</option>
                                    <option value="Operational">Operational (Licenses)</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date (Optional)</label>
                                <input
                                    type="date"
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    value={newDoc.expiry}
                                    onChange={(e) => setNewDoc({ ...newDoc, expiry: e.target.value })}
                                />
                                <div className="text-xs text-slate-500 mt-1">Leave blank if the document does not expire.</div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm">Save Document</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
