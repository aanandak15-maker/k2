import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Plus, Download, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useAdminStore } from '../../store/AdminStore';
import { exportToCsv } from '../../utils/exportUtils';
import { Farmer } from '../../data/mock/farmers';

export default function AdminMembershipContent() {
    const { toast } = useToast();
    const { state, addFarmer } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [newFarmer, setNewFarmer] = useState({
        name: '',
        phone: '',
        village: '',
        cluster: '',
        landSizeDb: 0,
        crops: ''
    });

    const filteredFarmers = state.farmers.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // KPI Computations
    const totalMembers = state.farmers.length;
    const activeShareCapital = state.farmers.reduce((sum, f) => sum + f.shareCapital, 0);
    const pendingKycCount = state.farmers.filter(f => f.status !== 'Active').length;

    const handleOnboardSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            return;
        }

        const farmer: Farmer = {
            id: `F-${1000 + state.farmers.length + 1}`,
            name: newFarmer.name,
            phone: newFarmer.phone,
            village: newFarmer.village || 'Unknown',
            cluster: newFarmer.cluster || 'Unassigned',
            landSizeDb: newFarmer.landSizeDb || 0,
            crops: newFarmer.crops ? newFarmer.crops.split(',').map(c => c.trim()).filter(Boolean) : [],
            status: 'Active',
            membershipDate: new Date().toISOString().split('T')[0],
            outstandingDues: 0,
            shareCapital: 1000, // Default minimum share capital
            lastVisit: new Date().toISOString().split('T')[0],
            riskScore: 'Low'
        };

        addFarmer(farmer);
        toast({ message: `Farmer ${farmer.name} onboarded successfully!`, variant: 'success' });
        setIsModalOpen(false);
        setCurrentStep(1);
        setNewFarmer({ name: '', phone: '', village: '', cluster: '', landSizeDb: 0, crops: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Farmer Membership CRM</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage farmer profiles, share capital, and KYC compliance.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            toast({ message: 'KYC data export started', variant: 'success' });
                            exportToCsv('fpo_farmers_kyc', state.farmers);
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={16} /> Export KYC
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-[var(--brand)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--brand-light)] transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Onboard Farmer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="text-slate-500 text-sm font-medium mb-1">Total Members</div>
                        <div className="text-2xl font-bold text-slate-900">{totalMembers}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--brand-wash)] border-[var(--brand-pale)]">
                    <CardContent className="p-5">
                        <div className="text-[var(--brand)] text-sm font-medium mb-1">Total Share Capital</div>
                        <div className="text-2xl font-bold text-[var(--brand-light)]">₹{activeShareCapital.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-5">
                        <div className="text-amber-700 text-sm font-medium mb-1">Pending KYC</div>
                        <div className="text-2xl font-bold text-amber-800">{pendingKycCount}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 gap-4">
                    <CardTitle>Member Roster</CardTitle>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search name, village, or ID..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Member ID / Name</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Village Location</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Land (Acres)</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Share Capital</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredFarmers.map(farmer => (
                                    <tr key={farmer.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{farmer.name}</div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">{farmer.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{farmer.village}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{farmer.cluster}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-slate-700">
                                            {farmer.landSizeDb}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-[var(--brand)] text-right">
                                            ₹{farmer.shareCapital.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={farmer.status === 'Active' ? 'success' : 'warning'}>
                                                {farmer.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {filteredFarmers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 bg-slate-50/50">
                                            No farmers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Multi-step Onboard Farmer Wizard */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Add New Farmer</h3>
                                <p className="text-sm text-slate-500 mt-1">Step {currentStep} of 4: {['Basic Details', 'Land & Crops', 'KYC & Bank', 'Review & Submit'][currentStep - 1]}</p>
                            </div>
                            <button onClick={() => { setIsModalOpen(false); setCurrentStep(1); }} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="px-6 pt-4">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0"></div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--brand)] rounded-full z-0 transition-all duration-300" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>

                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${currentStep > step ? 'bg-[var(--brand)] border-[var(--brand)] text-white' :
                                            currentStep === step ? 'bg-white border-[var(--brand)] text-[var(--brand)]' :
                                                'bg-white border-slate-200 text-slate-400'
                                        }`}>
                                        {currentStep > step ? '✓' : step}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleOnboardSubmit} className="p-6 space-y-6">

                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.name}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                pattern="[0-9]{10}"
                                                placeholder="10-digit mobile"
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.phone}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Village/Panchayat *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.village}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Operational Cluster *</label>
                                            <select
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.cluster}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, cluster: e.target.value })}
                                                required
                                            >
                                                <option value="">Select Cluster</option>
                                                <option value="Sikandrabad North">Sikandrabad North</option>
                                                <option value="Sikandrabad South">Sikandrabad South</option>
                                                <option value="Tundla East">Tundla East</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Father's/Husband's Name</label>
                                        <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none" />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Land & Crops */}
                            {currentStep === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Land Size (Acres) *</label>
                                            <input
                                                type="number"
                                                required
                                                min="0.1"
                                                step="0.1"
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.landSizeDb || ''}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, landSizeDb: parseFloat(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Crops *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Wheat, Mustard"
                                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none"
                                                value={newFarmer.crops}
                                                onChange={(e) => setNewFarmer({ ...newFarmer, crops: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Irrigation Source</label>
                                        <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none">
                                            <option>Tubewell / Borewell</option>
                                            <option>Canal</option>
                                            <option>Rainfed</option>
                                            <option>Pond</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: KYC & Bank */}
                            {currentStep === 3 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Aadhaar Number</label>
                                            <input type="text" placeholder="XXXX XXXX XXXX" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">PAN Number</label>
                                            <input type="text" placeholder="ABCDE1234F" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none" />
                                        </div>
                                    </div>
                                    <h4 className="font-medium text-slate-800 pt-2 border-t border-slate-100">Bank Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                                            <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
                                            <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] outline-none" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Review */}
                            {currentStep === 4 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                        <h4 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">Profile Summary</h4>
                                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                                            <div className="text-slate-500">Name:</div>
                                            <div className="font-medium text-slate-900">{newFarmer.name}</div>
                                            <div className="text-slate-500">Phone:</div>
                                            <div className="font-medium text-slate-900">{newFarmer.phone}</div>
                                            <div className="text-slate-500">Location:</div>
                                            <div className="font-medium text-slate-900">{newFarmer.village} ({newFarmer.cluster})</div>
                                            <div className="text-slate-500">Land & Crops:</div>
                                            <div className="font-medium text-slate-900">{newFarmer.landSizeDb} Acres • {newFarmer.crops}</div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                                        <div className="text-amber-800 text-sm">
                                            <strong>Next Steps:</strong> Upon submission, a baseline share capital entry of ₹1,000 will be created, and the farmer will be marked as 'Active'.
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex justify-between border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setIsModalOpen(false)}
                                    className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                                >
                                    {currentStep > 1 ? 'Back' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-[var(--brand)] hover:bg-[var(--brand-light)] rounded-lg shadow-sm w-32 flex justify-center"
                                >
                                    {currentStep < 4 ? 'Next' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
