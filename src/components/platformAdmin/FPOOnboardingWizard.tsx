import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
    Building2, User, CreditCard, Settings, FileText,
    CheckCircle2, ChevronRight, ChevronLeft, Save, UploadCloud
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const STEPS = [
    { id: 1, label: 'FPO Identity', icon: Building2 },
    { id: 2, label: 'CEO Setup', icon: User },
    { id: 3, label: 'Subscription', icon: CreditCard },
    { id: 4, label: 'Configuration', icon: Settings },
    { id: 5, label: 'Documents', icon: FileText }
];

export default function FPOOnboardingWizard({ setActiveSection }: { setActiveSection?: (s: string) => void }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('Growth');
    const { toast } = useToast();

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(s => s + 1);
        else {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                toast({ message: 'FPO Onboarded Successfully', variant: 'success' });
            }, 1500);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(s => s - 1);
    };

    const handleSaveDraft = () => {
        toast({ message: 'Draft saved successfully', variant: 'success' });
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-emerald-100 shadow-sm animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">FPO Onboarded Successfully!</h2>
                <p className="text-slate-600 mb-8 max-w-md text-center">
                    The FPO instance has been provisioned. The CEO will receive an email shortly with their login credentials and next steps.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => { setIsSuccess(false); setCurrentStep(1); }}
                        className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Onboard Another FPO
                    </button>
                    <button
                        onClick={() => setActiveSection?.('directory')}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-all"
                    >
                        Go to FPO Directory
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Wizard Header / Progress */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    ></div>

                    {STEPS.map((step) => {
                        const isPast = step.id < currentStep;
                        const isCurrent = step.id === currentStep;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isPast ? 'bg-emerald-500 border-emerald-500 text-white' :
                                    isCurrent ? 'bg-white border-emerald-600 text-emerald-600' :
                                        'bg-slate-50 border-slate-200 text-slate-400'
                                    }`}>
                                    {isPast ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                                </div>
                                <span className={`text-xs font-semibold ${isCurrent ? 'text-emerald-700' : isPast ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Wizard Body */}
            <Card className="min-h-[400px] border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 rounded-t-xl">
                    <CardTitle className="text-xl">
                        {STEPS.find(s => s.id === currentStep)?.label}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {currentStep === 1 && (
                        <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Legal FPO Name *</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., Kissan Agro Producer Company Ltd" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Registration/CIN Number</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="U01100XX202XPTCXXXXXX" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Incorporation</label>
                                <input type="date" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Registered Address</label>
                                <textarea rows={3} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Full address..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                                <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                    <option>Select State</option>
                                    <option>Maharashtra</option>
                                    <option>Madhya Pradesh</option>
                                    <option>Uttar Pradesh</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="District name" />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="col-span-2">
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-blue-800">
                                        The CEO will be the initial primary administrator for this FPO instance. They will receive an email to set up their password.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Official Email Address *</label>
                                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="ceo@fpo.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                                <input type="tel" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="+91 XXXXX XXXXX" />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { name: 'Starter', price: '₹2,500', limit: 'Up to 500 Farmers', features: ['Basic CRM', 'Inventory', 'Billing'] },
                                    { name: 'Growth', price: '₹5,000', limit: 'Up to 2,000 Farmers', features: ['All Starter+', 'Mobile App', 'Analytics'] },
                                    { name: 'Enterprise', price: 'Custom', limit: 'Unlimited Farmers', features: ['All Growth+', 'Custom Integration', 'Dedicated AM'] }
                                ].map((plan, idx) => {
                                    const isSelected = selectedPlan === plan.name;
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedPlan(plan.name)}
                                            className={`border rounded-xl p-5 cursor-pointer transition-all ${isSelected ? 'border-emerald-500 bg-emerald-50/30 shadow-md transform scale-105' : 'border-slate-200 hover:border-emerald-300'}`}
                                        >
                                            {isSelected && <Badge variant="success" className="mb-2 text-[10px]">Selected</Badge>}
                                            {!isSelected && plan.name === 'Growth' && <Badge variant="warning" className="mb-2 text-[10px]">Most Popular</Badge>}
                                            <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
                                            <div className="text-2xl font-bold text-emerald-600 mt-2 mb-1">{plan.price}<span className="text-xs text-slate-500 font-normal">/mo</span></div>
                                            <p className="text-sm font-medium text-slate-700 border-b border-slate-100 pb-3 mb-3">{plan.limit}</p>
                                            <ul className="space-y-2">
                                                {plan.features.map((f, i) => (
                                                    <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                                                        <CheckCircle2 size={12} className={isSelected ? "text-emerald-500" : "text-slate-400"} /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">Billing Cycle</h4>
                                    <p className="text-xs text-slate-500">Choose preferred billing frequency</p>
                                </div>
                                <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                    {selectedPlan === 'Starter' && <option>Monthly (₹2,500/mo)</option>}
                                    {selectedPlan === 'Starter' && <option>Annual (₹25,000/yr - 2 months free)</option>}
                                    {selectedPlan === 'Growth' && <option>Monthly (₹5,000/mo)</option>}
                                    {selectedPlan === 'Growth' && <option>Annual (₹50,000/yr - 2 months free)</option>}
                                    {selectedPlan === 'Enterprise' && <option>Custom Annual Commitment</option>}
                                </select>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-3">Enabled Modules</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Farmer App (Mobile)', 'Procurement & Grain Bank', 'Input Sales (Shop)', 'Loan & Credit Management', 'Yield Prediction AI', 'Machine Custom Hiring'].map((mod, i) => (
                                        <label key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                            <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-600" defaultChecked={i < 3} />
                                            <span className="text-sm font-medium text-slate-700">{mod}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 mb-3">Database Instance Region</h3>
                                <select className="w-full max-w-md border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                    <option>ap-south-1 (Mumbai, India)</option>
                                    <option>ap-south-2 (Hyderabad, India)</option>
                                </select>
                                <p className="text-xs text-slate-500 mt-2">Data residency must comply with local agricultural data laws.</p>
                            </div>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4 text-sm text-amber-800 flex items-start gap-3">
                                <FileText className="shrink-0 mt-0.5" size={18} />
                                <p>Please upload mandatory KYC and incorporation documents. FPO functionality may be limited until documents are verified by Platform Admins.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Certificate of Incorporation', 'PAN Card (FPO)', 'GST Registration (Optional)', 'Bank Cancelled Cheque'].map((doc, i) => (
                                    <div key={i} className="border border-slate-200 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-3">
                                            <UploadCloud size={24} />
                                        </div>
                                        <h4 className="font-semibold text-sm text-slate-800 mb-1">{doc}</h4>
                                        <p className="text-xs text-slate-500">Click to browse or drag & drop</p>
                                        <p className="text-[10px] text-slate-400 mt-2">PDF, JPG up to 5MB</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Navigation Footer */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 1 || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={18} /> Back
                </button>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSaveDraft}
                        className="px-6 py-2.5 text-slate-600 font-semibold hover:text-slate-900 transition-colors"
                        disabled={isSubmitting}
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-70 transition-all"
                    >
                        {isSubmitting ? (
                            'Processing...'
                        ) : currentStep === 5 ? (
                            <>Complete Setup <Save size={18} /></>
                        ) : (
                            <>Continue <ChevronRight size={18} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
