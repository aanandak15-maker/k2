import React, { useState, useMemo } from 'react';
import { mockDocuments } from '../../data/mock/documents';
import { Folder, FileText, Search, Upload, Filter, MoreVertical, Lock, Unlock, Eye, Download, Shield } from 'lucide-react';

export function DocumentVault() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories from mockDocuments
  const categories = useMemo(() => Array.from(new Set(mockDocuments.map(d => d.category))), []);

  const folders = categories.map(cat => ({
    id: cat,
    name: cat,
    icon: Folder,
    color: 'text-brand'
  }));

  const filteredDocs = useMemo(() => {
    let docs = mockDocuments;
    if (activeFolder) {
      docs = docs.filter(d => d.category === activeFolder);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(d => d.name.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)));
    }
    return docs;
  }, [activeFolder, searchQuery]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Search & Actions */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search documents, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand/50"
          />
        </div>
        <button className="bg-brand hover:bg-brand-light text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-sm shadow-brand/20">
          <Upload className="w-5 h-5" />
        </button>
      </div>

      {/* Folders (only show if no search query) */}
      {!searchQuery && (
        <>
            <div className="flex items-center justify-between mt-2 mb-1">
                <h3 className="text-gray-700 font-medium text-sm">Vault Folders</h3>
                {activeFolder && (
                    <button 
                        onClick={() => setActiveFolder(null)}
                        className="text-xs text-brand hover:text-brand-light font-medium"
                    >
                        View All
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
            {folders.map(folder => {
                const docCount = mockDocuments.filter(d => d.category === folder.id).length;
                const isActive = activeFolder === folder.id;
                
                return (
                <button
                    key={folder.id}
                    onClick={() => setActiveFolder(isActive ? null : folder.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                    isActive 
                        ? 'bg-brand/5 border-brand/30 shadow-sm' 
                        : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <folder.icon className={`w-6 h-6 ${isActive ? 'text-brand' : 'text-gray-400'}`} fill="currentColor" fillOpacity={0.1} />
                        <span className="text-[10px] bg-white text-gray-500 px-2 py-0.5 rounded border border-gray-100">
                            {docCount}
                        </span>
                    </div>
                    <div className={`text-sm font-semibold line-clamp-1 ${isActive ? 'text-brand-dark' : 'text-gray-800'}`}>
                      {folder.name}
                    </div>
                </button>
                );
            })}
            </div>
        </>
      )}

      {/* Document List */}
      <div className="mt-6">
        <h3 className="text-gray-700 font-medium text-sm mb-3">
          {searchQuery ? 'Search Results' : activeFolder ? `${activeFolder} Documents` : 'Recent Documents'}
        </h3>
        
        <div className="space-y-3">
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => (
              <div key={doc.id} className="comp-card p-4 flex items-start gap-3 hover:border-brand/30 hover:shadow-sm transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-brand/5 group-hover:border-brand/20 transition-colors">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-brand transition-colors" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 truncate pr-2">{doc.name}</h4>
                    <button className="text-gray-400 hover:text-gray-900 p-1 -mt-1 -mr-1 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 font-medium">
                    <span className="uppercase">{doc.type}</span>
                    <span className="text-gray-300">•</span>
                    <span>{formatSize(doc.sizeBytes)}</span>
                    <span className="text-gray-300">•</span>
                    <span>v{doc.version}</span>
                    {doc.isConfidential && (
                        <>
                            <span className="text-gray-300">•</span>
                            <Lock className="w-3 h-3 text-red-400" />
                        </>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        doc.status === 'Verified' ? 'text-green-700 bg-green-50' :
                        doc.status === 'Draft' ? 'text-gray-600 bg-gray-100' :
                        'text-brand bg-brand/10'
                    }`}>
                        {doc.status}
                    </span>
                    {doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-600 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                    {doc.tags.length > 2 && (
                        <span className="text-[10px] text-gray-400">+{doc.tags.length - 2}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                     <span className="text-[10px] text-gray-400">
                        Added {formatDate(doc.uploadDate)} · Retain {doc.retentionYears}y
                     </span>
                     <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1.5 bg-white border border-gray-100 rounded hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
                             <Eye className="w-3.5 h-3.5" />
                         </button>
                         <button className="p-1.5 bg-white border border-gray-100 rounded hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
                             <Download className="w-3.5 h-3.5" />
                         </button>
                     </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white/50 rounded-xl border border-gray-200 border-dashed">
                <Filter className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No documents found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
