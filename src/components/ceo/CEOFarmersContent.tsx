import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, Download, MessageSquare, ArrowLeft, Phone, MapPin, Calendar, Sprout, ChevronRight, Filter, ArrowUpDown, Plus, X, Check, Package, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface Transaction {
  id: string;
  date: string;
  type: 'Input Purchase' | 'Credit' | 'Crop Sale';
  description: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Completed';
}

interface CropHistory {
  season: string;
  crop: string;
  area: number;
  yield: string;
  status: string;
  icon: string;
}

interface Plot {
  id: string;
  location: string;
  area: number;
  soilType: string;
  currentCrop: string;
  status: 'Active' | 'Fallow';
}

interface Farmer {
  id: string;
  name: string;
  mobile: string;
  village: string;
  cluster: string;
  moderator: string;
  landArea: number;
  primaryCrop: string;
  shareCapital: string;
  outstanding: string;
  status: 'Active' | 'Dormant' | 'Inactive';
  avatarColor: string;
  joinedDate: string;
  notes?: { id: string; text: string; date: string }[];
  transactions?: Transaction[];
  cropHistory?: CropHistory[];
  plots?: Plot[];
}

import { useAdminStore } from '../../store/AdminStore';

export default function CEOFarmersContent() {
  const { toast } = useToast();
  const { state, addFarmer } = useAdminStore();

  const mapAdminFarmerToCEO = (f: any): Farmer => ({
    id: f.id,
    name: f.name,
    mobile: f.phone,
    village: f.village,
    cluster: f.cluster,
    moderator: 'Agri Saathi',
    landArea: f.landSizeDb,
    primaryCrop: f.crops[0] || 'Mixed',
    shareCapital: `₹${f.shareCapital.toLocaleString()}`,
    outstanding: `₹${f.outstandingDues.toLocaleString()}`,
    status: f.status as any,
    avatarColor: 'bg-[var(--brand-pale)] text-[var(--brand)]',
    joinedDate: f.membershipDate,
    notes: [],
    transactions: [],
    cropHistory: [],
    plots: []
  });

  const [farmers, setFarmers] = useState<Farmer[]>([]);

  React.useEffect(() => {
    setFarmers(state.farmers.map(mapAdminFarmerToCEO));
  }, [state.farmers]);

  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [nameQuery, setNameQuery] = useState('');
  const [mobileQuery, setMobileQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Dormant' | 'Inactive'>('All');
  const [cropFilter, setCropFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'mobile' | 'joinedDate'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [noteInput, setNoteInput] = useState('');
  const [noteSearchQuery, setNoteSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'land' | 'finance' | 'orders' | 'advisory' | 'schemes'>('overview');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);
  const [newFarmer, setNewFarmer] = useState<Partial<Farmer>>({
    name: '',
    mobile: '',
    village: '',
    cluster: '',
    moderator: '',
    landArea: 0,
    primaryCrop: '',
    shareCapital: '',
    outstanding: '',
    status: 'Active',
    avatarColor: 'bg-[var(--brand-pale)] text-[var(--brand)]'
  });

  const handleAddFarmer = () => {
    if (!newFarmer.name || !newFarmer.mobile) return;

    const id = `F-${String(state.farmers.length + 1001).padStart(4, '0')}`;
    addFarmer({
      id,
      name: newFarmer.name,
      phone: newFarmer.mobile,
      village: newFarmer.village || 'Unknown',
      cluster: newFarmer.cluster || 'Unassigned',
      landSizeDb: newFarmer.landArea || 0,
      status: newFarmer.status === 'Dormant' ? 'Dormant' : 'Active',
      membershipDate: new Date().toISOString().split('T')[0],
      outstandingDues: parseInt(newFarmer.outstanding?.replace(/[^0-9]/g, '') || '0'),
      shareCapital: parseInt(newFarmer.shareCapital?.replace(/[^0-9]/g, '') || '0'),
      crops: newFarmer.primaryCrop ? [newFarmer.primaryCrop] : [],
      lastVisit: '',
      riskScore: 'Low'
    });

    setIsAddFarmerOpen(false);
    setIsConfirmSaveOpen(false);
    setNewFarmer({
      name: '',
      mobile: '',
      village: '',
      cluster: '',
      moderator: '',
      landArea: 0,
      primaryCrop: '',
      shareCapital: '',
      outstanding: '',
      status: 'Active',
      avatarColor: 'bg-[var(--brand-pale)] text-[var(--brand)]'
    });
    toast({ message: 'Farmer recorded successfully', variant: 'success' });
  };

  const handleAddNote = () => {
    if (!selectedFarmer || !noteInput.trim()) return;
    toast({ message: 'Note added (CEO view only)', variant: 'success' });
    const newNote = {
      id: Date.now().toString(),
      text: noteInput,
      date: new Date().toISOString()
    };

    const updatedFarmer = {
      ...selectedFarmer,
      notes: [newNote, ...(selectedFarmer.notes || [])]
    };

    setSelectedFarmer(updatedFarmer);
    setFarmers(farmers.map(f => f.id === selectedFarmer.id ? updatedFarmer : f));
    setNoteInput('');
  };

  const uniqueCrops = Array.from(new Set(farmers.map(f => f.primaryCrop))).filter(Boolean).sort();

  const filteredFarmers = farmers.filter(farmer => {
    const matchesName = farmer.name.toLowerCase().includes(nameQuery.toLowerCase());
    const matchesMobile = farmer.mobile.includes(mobileQuery);
    const matchesStatus = statusFilter === 'All' || farmer.status === statusFilter;
    const matchesCrop = cropFilter === 'All' || farmer.primaryCrop === cropFilter;
    return matchesName && matchesMobile && matchesStatus && matchesCrop;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFarmers = filteredFarmers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);

  const handleExportCSV = () => {
    // Export only filtered and sorted data
    const headers = ['ID', 'Name', 'Mobile', 'Village', 'Cluster', 'Moderator', 'Land Area', 'Primary Crop', 'Share Capital', 'Outstanding', 'Status', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...filteredFarmers.map(farmer => [
        farmer.id,
        `"${farmer.name}"`,
        farmer.mobile,
        `"${farmer.village}"`,
        `"${farmer.cluster}"`,
        `"${farmer.moderator}"`,
        farmer.landArea,
        `"${farmer.primaryCrop}"`,
        `"${farmer.shareCapital}"`,
        `"${farmer.outstanding}"`,
        farmer.status,
        farmer.joinedDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().split('T')[0];
      link.setAttribute('href', url);
      link.setAttribute('download', `farmers_data_${date}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ message: 'Farmers data exported to CSV', variant: 'success' });
    }
  };

  const handleExportJSON = () => {
    // Export only filtered and sorted data
    const jsonContent = JSON.stringify(filteredFarmers, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().split('T')[0];
      link.setAttribute('href', url);
      link.setAttribute('download', `farmers_data_${date}.json`);
      link.style.visibility = 'hidden';
      link.click();
      document.body.removeChild(link);
      toast({ message: 'Farmers data exported to JSON', variant: 'success' });
    }
  };

  if (selectedFarmer) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setSelectedFarmer(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${selectedFarmer.avatarColor}`}>
            {selectedFarmer.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{selectedFarmer.name}</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>FPO-SKD-{selectedFarmer.id.padStart(4, '0')}</span>
              <span>•</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${selectedFarmer.status === 'Active' ? 'bg-[var(--brand-wash)] text-[var(--brand)]' :
                selectedFarmer.status === 'Dormant' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                }`}>
                {selectedFarmer.status}
              </span>
              <span>•</span>
              <span>Joined {new Date(selectedFarmer.joinedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => toast({ message: `Calling ${selectedFarmer.mobile} via Cloud Telephony...`, variant: 'info' })} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[var(--brand-wash)] hover:text-[var(--brand)] hover:border-[var(--brand-muted)] transition-colors">
              <Phone className="h-4 w-4" />
              Call
            </button>
            <button onClick={() => toast({ message: `Opening message to ${selectedFarmer.name}...`, variant: 'info' })} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[var(--brand-wash)] hover:text-[var(--brand)] hover:border-[var(--brand-muted)] transition-colors">
              <MessageSquare className="h-4 w-4" />
              Message
            </button>
          </div>
        </div>

        {/* 6-Tab Navigation */}
        <div className="flex space-x-1 border-b border-slate-200 scrollbar-hide overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'land', label: 'Land & Crop' },
            { id: 'finance', label: 'Financial Summary' },
            { id: 'orders', label: 'Input Orders' },
            { id: 'advisory', label: 'Advisory History' },
            { id: 'schemes', label: 'Govt. Schemes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                ? 'border-[var(--brand)] text-[var(--brand-light)] bg-[var(--brand-wash)]/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Key Stats & Location */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-500 uppercase tracking-wider">Contact & Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg"><Phone className="h-4 w-4 text-slate-500" /></div>
                      <div>
                        <div className="text-xs text-slate-500">Mobile Number</div>
                        <div className="text-sm font-medium text-slate-900">{selectedFarmer.mobile}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg"><MapPin className="h-4 w-4 text-slate-500" /></div>
                      <div>
                        <div className="text-xs text-slate-500">Location</div>
                        <div className="text-sm font-medium text-slate-900">{selectedFarmer.village}, {selectedFarmer.cluster}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg"><Check className="h-4 w-4 text-slate-500" /></div>
                      <div>
                        <div className="text-xs text-slate-500">Moderator</div>
                        <div className="text-sm font-medium text-slate-900">{selectedFarmer.moderator}</div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg overflow-hidden border border-slate-200 h-48 bg-slate-50 relative group">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedFarmer.village + ', ' + selectedFarmer.cluster + ', India')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: History & Quick Glance */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[var(--brand-wash)] rounded-xl p-4 border border-[var(--brand-pale)]">
                    <div className="text-xs text-[var(--brand-light)] font-medium mb-1">Total Land Size</div>
                    <div className="text-2xl font-bold text-[var(--brand)]">{selectedFarmer.landArea} Ha</div>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <div className="text-xs text-indigo-800 font-medium mb-1">Lifetime Value</div>
                    <div className="text-2xl font-bold text-indigo-700">₹{((selectedFarmer.landArea || 1) * 45000).toLocaleString()}</div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                    <div className="text-xs text-rose-800 font-medium mb-1">Outstanding Dues</div>
                    <div className="text-2xl font-bold text-rose-700">{selectedFarmer.outstanding}</div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Internal Notes & History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={noteInput}
                          onChange={(e) => setNoteInput(e.target.value)}
                          placeholder="Add a log entry or note..."
                          className="flex-1 h-9 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                        />
                        <button
                          onClick={handleAddNote}
                          className="h-9 px-4 rounded-md bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition-colors"
                        >
                          Log Note
                        </button>
                      </div>

                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {selectedFarmer.notes && selectedFarmer.notes.length > 0 ? (
                          selectedFarmer.notes.map((note) => (
                            <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                              <p className="text-sm text-slate-700">{note.text}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3 text-slate-400" />
                                <p className="text-xs text-slate-400">
                                  {new Date(note.date).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 border border-dashed border-slate-200 rounded-lg">
                            <p className="text-sm text-slate-500">No history logged yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'land' && (
            <Card>
              <CardHeader>
                <CardTitle>Land Holdings & Current Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedFarmer.plots && selectedFarmer.plots.length > 0 ? (
                    selectedFarmer.plots.map((plot) => (
                      <div key={plot.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex gap-4">
                          <div className="p-3 bg-[var(--brand-pale)] rounded-lg text-[var(--brand)]">
                            <Sprout className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">Plot #{plot.id} — {plot.location}</div>
                            <div className="text-sm text-slate-500 mt-1 flex gap-4">
                              <span><strong className="text-slate-700">Area:</strong> {plot.area} Ha</span>
                              <span><strong className="text-slate-700">Soil:</strong> {plot.soilType}</span>
                              <span><strong className="text-slate-700">Irrigation:</strong> Tubewell</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Current Crop</div>
                          <Badge variant={plot.status === 'Active' ? 'success' : 'warning'} className="text-sm px-3 py-1 text-[var(--brand-light)] bg-[var(--brand-pale)] border-[var(--brand-muted)]">
                            {plot.currentCrop}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      No detailed land records found for this farmer.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'finance' && (
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary & Ledger</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Total Purchases</div>
                    <div className="font-bold text-slate-900">₹{((selectedFarmer.landArea || 1) * 12000).toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Total Payments via Crop</div>
                    <div className="font-bold text-[var(--brand)]">₹{((selectedFarmer.landArea || 1) * 8000).toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-lg border border-rose-100">
                    <div className="text-xs text-rose-800 mb-1 font-medium">Net Outstanding</div>
                    <div className="font-bold text-rose-700">{selectedFarmer.outstanding}</div>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="text-xs text-indigo-800 mb-1 font-medium">Share Capital Held</div>
                    <div className="font-bold text-indigo-700">{selectedFarmer.shareCapital}</div>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-800 mb-3">Recent Ledger Activity</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-medium text-slate-500">Date</th>
                        <th className="px-4 py-3 font-medium text-slate-500">Particulars</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-right">Debit (Dr)</th>
                        <th className="px-4 py-3 font-medium text-slate-500 text-right">Credit (Cr)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 text-slate-600">12 Oct 2024</td>
                        <td className="px-4 py-3 font-medium">Purchase: DAP & Urea</td>
                        <td className="px-4 py-3 text-right text-rose-600">₹4,500</td>
                        <td className="px-4 py-3 text-right text-slate-400">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-600">05 Nov 2024</td>
                        <td className="px-4 py-3 font-medium">Harvest Sale: Wheat (20 Qtl)</td>
                        <td className="px-4 py-3 text-right text-slate-400">-</td>
                        <td className="px-4 py-3 text-right text-[var(--brand)]">₹44,000</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-600">05 Nov 2024</td>
                        <td className="px-4 py-3 font-medium text-slate-500">↳ Auto-Deduction for Dues</td>
                        <td className="px-4 py-3 text-right text-slate-400">-</td>
                        <td className="px-4 py-3 text-right font-bold text-[var(--brand)]">₹4,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>Input Orders & Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                  <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-900 mb-1">No Orders Found</p>
                  <p className="text-sm">Farmer has not placed any formal input orders this season.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'advisory' && (
            <Card>
              <CardHeader>
                <CardTitle>Advisory & Interventions Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[35px] top-1 h-4 w-4 rounded-full border-2 border-[var(--brand)] bg-white"></div>
                    <div className="text-xs text-slate-500 mb-1">10 Feb 2024 • Sent via SMS & WhatsApp</div>
                    <div className="font-medium text-slate-800">Weather Alert: Unseasonal Rain Expected</div>
                    <p className="text-sm text-slate-600 mt-1">Please protect harvested crops and delay irrigation for next 48 hours.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[35px] top-1 h-4 w-4 rounded-full border-2 border-slate-300 bg-white"></div>
                    <div className="text-xs text-slate-500 mb-1">15 Jan 2024 • Field Visit by Rajesh</div>
                    <div className="font-medium text-slate-800">Disease Identified: Yellow Rust</div>
                    <p className="text-sm text-slate-600 mt-1">Recommended immediate spray of Propiconazole 25% EC at 1ml/liter.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'schemes' && (
            <Card>
              <CardHeader>
                <CardTitle>Govt. Scheme Saturation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border shadow-sm border-[var(--brand-muted)] bg-[var(--brand-wash)]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-emerald-900">PM-KISAN</div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="text-sm text-[var(--brand-light)]">Installments received regularly. Last check confirmed on Jan 2024.</div>
                  </div>
                  <div className="p-4 rounded-xl border shadow-sm border-amber-200 bg-amber-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-amber-900">Soil Health Card</div>
                      <Badge variant="warning">Expired</Badge>
                    </div>
                    <div className="text-sm text-amber-800">Last test done in 2021. Due for renewal.</div>
                    <button onClick={() => toast({ message: 'Initiated renewal protocol', variant: 'success' })} className="mt-3 text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors">Initiate Renewal</button>
                  </div>
                  <div className="p-4 rounded-xl border shadow-sm border-rose-200 bg-rose-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-rose-900">PMFBY (Crop Insurance)</div>
                      <Badge variant="error" className="bg-red-100 text-red-700 border-red-200">Not Enrolled</Badge>
                    </div>
                    <div className="text-sm text-rose-800">High risk due to non-enrollment for current Rabi season.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Farmer Database</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={nameQuery}
              onChange={(e) => { setNameQuery(e.target.value); setCurrentPage(1); }}
              className="h-9 w-48 rounded-md border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by mobile..."
              value={mobileQuery}
              onChange={(e) => { setMobileQuery(e.target.value); setCurrentPage(1); }}
              className="h-9 w-48 rounded-md border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
            />
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button onClick={() => toast({ message: 'Bulk SMS sent to all farmers', variant: 'success' })} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <MessageSquare className="h-4 w-4" />
            Send SMS
          </button>
          <button
            onClick={() => setIsAddFarmerOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add Farmer
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2 text-sm text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Filter by:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as 'All' | 'Active' | 'Dormant' | 'Inactive'); setCurrentPage(1); }}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active ({farmers.filter(f => f.status === 'Active').length})</option>
            <option value="Dormant">Dormant ({farmers.filter(f => f.status === 'Dormant').length})</option>
            <option value="Inactive">Inactive ({farmers.filter(f => f.status === 'Inactive').length})</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2 text-sm text-slate-500">
            <Sprout className="h-4 w-4" />
            <span>Crop:</span>
          </div>
          <select
            value={cropFilter}
            onChange={(e) => { setCropFilter(e.target.value); setCurrentPage(1); }}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
          >
            <option value="All">All Crops</option>
            {uniqueCrops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2 mr-2 text-sm text-slate-500">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'mobile' | 'joinedDate')}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
          >
            <option value="name">Name</option>
            <option value="mobile">Mobile</option>
            <option value="joinedDate">Registration Date</option>
          </select>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-500">Farmer Name</th>
                <th className="px-6 py-3 font-medium text-slate-500">Village / Cluster</th>
                <th className="px-6 py-3 font-medium text-slate-500">Moderator</th>
                <th className="px-6 py-3 font-medium text-slate-500">Registration Date</th>
                <th className="px-6 py-3 font-medium text-slate-500">Land (Ha)</th>
                <th className="px-6 py-3 font-medium text-slate-500">Primary Crop</th>
                <th className="px-6 py-3 font-medium text-slate-500">Share Capital</th>
                <th className="px-6 py-3 font-medium text-slate-500">Outstanding (₹)</th>
                <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                <th className="px-6 py-3 font-medium text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentFarmers.length > 0 ? (
                currentFarmers.map((farmer) => (
                  <tr
                    key={farmer.id}
                    onClick={() => setSelectedFarmer(farmer)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${farmer.avatarColor}`}>
                          {farmer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 group-hover:text-[var(--brand)] transition-colors">{farmer.name}</div>
                          <div className="text-xs text-slate-500">FPO-SKD-{farmer.id.padStart(4, '0')} · {farmer.mobile}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{farmer.village} / {farmer.cluster}</td>
                    <td className="px-6 py-4 text-slate-600">{farmer.moderator}</td>
                    <td className="px-6 py-4 text-slate-600">{new Date(farmer.joinedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4 text-slate-600">{farmer.landArea}</td>
                    <td className="px-6 py-4 text-slate-600">{farmer.primaryCrop}</td>
                    <td className={`px-6 py-4 font-medium ${farmer.shareCapital.includes('partial') ? 'text-amber-600' : 'text-[var(--brand)]'}`}>{farmer.shareCapital}</td>
                    <td className={`px-6 py-4 font-medium ${farmer.outstanding === '₹0' ? 'text-[var(--brand)]' : 'text-red-600'}`}>{farmer.outstanding}</td>
                    <td className="px-6 py-4">
                      <Badge variant={farmer.status === 'Active' ? 'success' : farmer.status === 'Dormant' ? 'warning' : 'danger'}>
                        {farmer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFarmer(farmer);
                        }}
                        className="inline-flex items-center gap-1 rounded-md bg-[var(--brand-wash)] px-3 py-1.5 text-xs font-medium text-[var(--brand)] hover:bg-[var(--brand-pale)] transition-colors"
                      >
                        View Profile <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-slate-300 mb-2" />
                      <p className="text-base font-medium text-slate-900">No farmers found</p>
                      <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          Showing {filteredFarmers.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredFarmers.length)} of {filteredFarmers.length} farmers
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-slate-200 px-3 py-1 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Logic to show a window of pages around current page could be added here
            // For simplicity, just showing first 5 or all if less than 5
            // A better approach for many pages:
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (currentPage > 3) {
                pageNum = currentPage - 2 + i;
              }
              if (pageNum > totalPages) {
                pageNum = totalPages - (4 - i);
              }
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`rounded-md border px-3 py-1 font-medium ${currentPage === pageNum
                  ? 'bg-[var(--brand-wash)] text-[var(--brand)] border-[var(--brand-muted)]'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded-md border border-slate-200 px-3 py-1 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Farmer Modal */}
      {isAddFarmerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-900">Add New Farmer</h3>
              <button
                onClick={() => setIsAddFarmerOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name *</label>
                <input
                  type="text"
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Mobile Number *</label>
                <input
                  type="text"
                  value={newFarmer.mobile}
                  onChange={(e) => setNewFarmer({ ...newFarmer, mobile: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Village</label>
                <input
                  type="text"
                  value={newFarmer.village}
                  onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. Rampur"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cluster</label>
                <input
                  type="text"
                  value={newFarmer.cluster}
                  onChange={(e) => setNewFarmer({ ...newFarmer, cluster: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. Sikandrabad"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Moderator</label>
                <input
                  type="text"
                  value={newFarmer.moderator}
                  onChange={(e) => setNewFarmer({ ...newFarmer, moderator: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. Suresh Kumar"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Land Area (Ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newFarmer.landArea}
                  onChange={(e) => setNewFarmer({ ...newFarmer, landArea: parseFloat(e.target.value) || 0 })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="0.0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Primary Crop</label>
                <input
                  type="text"
                  value={newFarmer.primaryCrop}
                  onChange={(e) => setNewFarmer({ ...newFarmer, primaryCrop: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. Wheat"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Share Capital</label>
                <input
                  type="text"
                  value={newFarmer.shareCapital}
                  onChange={(e) => setNewFarmer({ ...newFarmer, shareCapital: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. ₹1,000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Outstanding</label>
                <input
                  type="text"
                  value={newFarmer.outstanding}
                  onChange={(e) => setNewFarmer({ ...newFarmer, outstanding: e.target.value })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                  placeholder="e.g. ₹0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                  value={newFarmer.status}
                  onChange={(e) => setNewFarmer({ ...newFarmer, status: e.target.value as any })}
                  className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                >
                  <option value="Active">Active</option>
                  <option value="Dormant">Dormant</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Avatar Color</label>
                <div className="flex gap-3">
                  {[
                    'bg-[var(--brand-pale)] text-[var(--brand)]',
                    'bg-blue-100 text-blue-700',
                    'bg-purple-100 text-purple-700',
                    'bg-amber-100 text-amber-700',
                    'bg-red-100 text-red-700',
                    'bg-indigo-100 text-indigo-700',
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewFarmer({ ...newFarmer, avatarColor: color })}
                      className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${color} ${newFarmer.avatarColor === color ? 'border-slate-900 ring-2 ring-slate-200 ring-offset-2' : 'border-transparent hover:scale-110'
                        }`}
                    >
                      <span className="text-xs font-bold">A</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsAddFarmerOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200 rounded-md transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsConfirmSaveOpen(true)}
                disabled={!newFarmer.name || !newFarmer.mobile}
                className="px-6 py-2 text-sm font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-light)] rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Save Farmer
              </button>
            </div>

            {/* Confirmation Overlay */}
            {isConfirmSaveOpen && (
              <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 max-w-sm w-full text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="h-12 w-12 bg-[var(--brand-pale)] text-[var(--brand)] rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Confirm Save</h3>
                    <p className="text-sm text-slate-500 mt-1">Are you sure you want to add this farmer to the database?</p>
                  </div>
                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={() => setIsConfirmSaveOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddFarmer}
                      className="px-4 py-2 text-sm font-medium text-white bg-[var(--brand)] hover:bg-[var(--brand-light)] rounded-md shadow-sm transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
