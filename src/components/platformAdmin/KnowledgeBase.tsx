import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BookOpen, Search, Filter, Plus, FileText, Settings, Shield, HelpCircle, Edit2, Trash2, ArrowRight, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal } from '../ui/Modal';

// Mock KB Articles
const mockArticles = [
    { id: 'KB-101', title: 'How to onboard a new farmer?', category: 'Getting Started', views: 1245, helpful: 95, status: 'Published', lastUpdated: '2 days ago', content: 'Detailed steps on how to onboard a new farmer into the system, including account creation, profile setup, and initial data entry.' },
    { id: 'KB-102', title: 'Setting up Payment Gateway integration', category: 'Configuration', views: 856, helpful: 82, status: 'Published', lastUpdated: '1 week ago', content: 'A guide to integrating various payment gateways with our platform, covering API keys, webhook setup, and testing procedures.' },
    { id: 'KB-103', title: 'Understanding the MRR calculation', category: 'Billing & Subscriptions', views: 432, helpful: 65, status: 'Draft', lastUpdated: '3 hrs ago', content: 'Explanation of how Monthly Recurring Revenue (MRR) is calculated, including different subscription tiers and prorated amounts.' },
    { id: 'KB-104', title: 'Managing user roles and permissions', category: 'Security & Roles', views: 2150, helpful: 98, status: 'Published', lastUpdated: '1 month ago', content: 'Instructions on how to create, modify, and assign user roles and permissions to ensure proper access control within the application.' },
    { id: 'KB-105', title: 'Exporting farmer data to Excel/CSV', category: 'Data Management', views: 1840, helpful: 91, status: 'Published', lastUpdated: '2 weeks ago', content: 'Steps to export farmer data in various formats like Excel or CSV for reporting and external analysis.' },
    { id: 'KB-106', title: 'Troubleshooting login issues', category: 'Troubleshooting', views: 789, helpful: 88, status: 'Published', lastUpdated: '4 days ago', content: 'Common solutions for login problems, including password resets, account lockout, and browser compatibility issues.' },
    { id: 'KB-107', title: 'Configuring email notifications', category: 'Configuration', views: 520, helpful: 75, status: 'Draft', lastUpdated: '1 day ago', content: 'Guide to setting up and customizing email notifications for various events, such as new orders, status updates, and alerts.' },
    { id: 'KB-108', title: 'Best practices for data backup', category: 'Data Management', views: 1100, helpful: 93, status: 'Published', lastUpdated: '3 weeks ago', content: 'Recommendations and procedures for regularly backing up critical data to prevent loss and ensure business continuity.' },
];

const categories = ['All Articles', 'Getting Started', 'Configuration', 'Billing & Subscriptions', 'Data Management', 'Security & Roles', 'Troubleshooting'];

export default function KnowledgeBase() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Articles');
    const [articles, setArticles] = useState(mockArticles);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<any>(null);
    const [showCount, setShowCount] = useState(6);

    const filteredArticles = articles.filter(article =>
        (activeCategory === 'All Articles' || article.category === activeCategory) &&
        (article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSaveArticle = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newArticle = {
            id: editingArticle?.id || `KB-${Math.floor(Math.random() * 1000)}`,
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            status: formData.get('status') as string,
            content: formData.get('content') as string,
            views: editingArticle?.views || 0,
            helpful: editingArticle?.helpful || 0,
            lastUpdated: 'just now',
        };

        if (editingArticle) {
            setArticles(articles.map(art => art.id === newArticle.id ? newArticle : art));
        } else {
            setArticles([newArticle, ...articles]);
        }

        toast({ message: `Article ${editingArticle ? 'updated' : 'created'} successfully`, variant: 'success' });
        setIsEditorOpen(false);
        setEditingArticle(null);
    };

    const handleDeleteArticle = (articleId: string) => {
        setArticles(articles.filter(article => article.id !== articleId));
        toast({ message: 'Article deleted', variant: 'info' });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar Navigation */}
                <Card className="lg:col-span-1 shadow-sm border-slate-200 h-fit sticky top-6">
                    <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-lg">Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                        <div className="space-y-1">
                            {categories.map((cat, idx) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <BookOpen size={14} className={isActive ? 'text-emerald-600' : 'text-slate-400'} />
                                            {cat}
                                        </span>
                                        <span className={`text-[10px] py-0.5 px-2 rounded-full ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                            {idx === 0 ? articles.length : articles.filter(a => a.category === cat).length}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Card className="shadow-sm border-slate-200">
                        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                            <div className="flex gap-4 w-full sm:w-auto flex-1">
                                <div className="relative flex-1 sm:max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search articles, guides, and FAQs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => { setEditingArticle(null); setIsEditorOpen(true); }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold shadow-sm"
                            >
                                <Plus size={16} /> New Article
                            </button>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredArticles.slice(0, showCount).map((article) => (
                            <div key={article.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors cursor-pointer">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setEditingArticle(article); setIsEditorOpen(true); }}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteArticle(article.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant={article.status === 'Published' ? 'success' : 'outline'} className="text-[10px] py-0">{article.status}</Badge>
                                    <span className="text-xs text-slate-500">•</span>
                                    <span className="text-xs text-slate-500">{article.category}</span>
                                    <span className="text-xs text-slate-500">•</span>
                                    <span className="text-xs text-slate-400">Updated {article.lastUpdated}</span>
                                </div>

                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5" title="Total Views">
                                        <Eye size={14} className="text-slate-400" />
                                        <span>{article.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-emerald-600" title="Helpful Votes">
                                        <ThumbsUp size={14} />
                                        <span>{article.helpful}%</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400" title="Not Helpful Votes">
                                        <ThumbsDown size={14} />
                                        <span>{100 - article.helpful}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredArticles.length > showCount && (
                        <div className="text-center pt-4">
                            <button
                                onClick={() => setShowCount(c => c + 3)}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 px-4 py-2 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                                Load More Articles
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                title={editingArticle ? 'Edit Article' : 'Create New Article'}
                size="lg"
            >
                <form onSubmit={handleSaveArticle} className="space-y-4">
                    <div>
                        <label htmlFor="article-title" className="block text-sm font-medium text-slate-700 mb-1">Article Title</label>
                        <input
                            type="text"
                            id="article-title"
                            name="title"
                            required
                            defaultValue={editingArticle?.title}
                            className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="e.g. Setting up Farmer Profiles"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="article-category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                id="article-category"
                                name="category"
                                className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                defaultValue={editingArticle?.category}
                            >
                                {categories.filter(c => c !== 'All Articles').map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="article-status" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select
                                id="article-status"
                                name="status"
                                className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                defaultValue={editingArticle?.status}
                            >
                                <option>Published</option>
                                <option>Draft</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="article-content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                        <textarea
                            id="article-content"
                            name="content"
                            rows={10}
                            required
                            defaultValue={editingArticle?.content}
                            className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none font-mono"
                            placeholder="Write article content in Markdown format..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                        <button type="button" onClick={() => setIsEditorOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm">Save Article</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
