import React, { useState } from 'react';
import { mockBoardMembers, mockMeetings, mockDecisions, BoardMember } from '../../data/mock/governance';
import { Users, Calendar, UserCheck, AlertTriangle, ChevronRight, Target, Clock, CheckCircle } from 'lucide-react';

export function GovernanceModule() {
  const [activeTab, setActiveTab] = useState<'board' | 'meetings' | 'decisions'>('board');

  const farmerDirectorsCount = mockBoardMembers.filter(m => m.isFarmer).length;
  const farmerRatio = Math.round((farmerDirectorsCount / mockBoardMembers.length) * 100);

  const getStatusBadge = (status: BoardMember['status']) => {
    switch (status) {
      case 'Active': return <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded uppercase font-bold">Active</span>;
      case 'Resigned': return <span className="text-[10px] bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded uppercase font-bold">Resigned</span>;
      case 'Disqualified': return <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded uppercase font-bold">Disqualified</span>;
    }
  };

  const getDecisionStatusColor = (status: string) => {
      switch (status) {
          case 'Implemented': return 'text-green-600 bg-green-50 border-green-200';
          case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
          default: return 'text-amber-600 bg-amber-50 border-amber-200';
      }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Sub Navigation */}
      <div className="flex p-1 bg-white/50 rounded-lg">
        <button 
          onClick={() => setActiveTab('board')}
          className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${activeTab === 'board' ? 'bg-white text-brand shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Board
        </button>
        <button 
          onClick={() => setActiveTab('meetings')}
          className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${activeTab === 'meetings' ? 'bg-white text-brand shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Meetings
        </button>
        <button 
          onClick={() => setActiveTab('decisions')}
          className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${activeTab === 'decisions' ? 'bg-white text-brand shadow border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Decisions
        </button>
      </div>

      {activeTab === 'board' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Composition Alert */}
            <div className="comp-card p-4 border-brand/30 bg-brand/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-gray-800 font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-light" />
                            Board Composition
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Minimum 50% Farmer Directors required by law.</p>
                    </div>
                    <div className="text-2xl font-bold text-brand-light">{farmerRatio}%</div>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-brand-light" style={{ width: `${farmerRatio}%` }}></div>
                </div>
            </div>

            {/* Board List */}
            <div className="space-y-3">
                {mockBoardMembers.map(member => {
                    const isExpiringSoon = new Date(member.termEnds).getTime() - new Date().getTime() < 90 * 24 * 60 * 60 * 1000;
                    
                    return (
                    <div key={member.id} className={`comp-card p-4 ${isExpiringSoon ? 'border-amber-500/30' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="text-gray-800 font-medium">{member.name}</h4>
                                <div className="text-xs text-gray-500 mt-0.5">{member.role}</div>
                            </div>
                            {getStatusBadge(member.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                            {member.isFarmer && (
                                <span className="flex items-center gap-1 text-[10px] bg-brand/10 text-brand-light px-2 py-0.5 rounded border border-brand/20">
                                    <UserCheck className="w-3 h-3" /> Farmer
                                </span>
                            )}
                            <span className="text-[10px] bg-white text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                {member.sharesHeld} Shares
                            </span>
                            <span className="text-[10px] bg-white text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                {member.attendanceRate}% Attendance
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-3 border-t border-gray-200/50">
                            <span className="text-gray-600">Appointed: {formatDate(member.appointedDate)}</span>
                            <span className={`font-medium ${isExpiringSoon ? 'text-amber-400 flex items-center gap-1' : 'text-gray-500'}`}>
                                {isExpiringSoon && <AlertTriangle className="w-3 h-3" />}
                                Ends: {formatDate(member.termEnds)}
                            </span>
                        </div>
                    </div>
                )})}
            </div>
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            {mockMeetings.map(meeting => (
                <div key={meeting.id} className="comp-card overflow-hidden">
                    <div className="p-4 border-b border-gray-200/50 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                    meeting.type === 'AGM' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                                    meeting.type === 'Emergency' ? 'bg-red-50 text-red-700 border-red-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                    {meeting.type}
                                </span>
                                <span className={`text-[10px] font-semibold uppercase ${
                                    meeting.status === 'Completed' ? 'text-green-600' :
                                    meeting.status === 'Scheduled' ? 'text-amber-600' :
                                    'text-gray-500'
                                }`}>
                                    {meeting.status}
                                </span>
                            </div>
                            <h3 className="text-gray-800 font-semibold">{meeting.title}</h3>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 flex items-center justify-end gap-1 mb-1">
                                <Calendar className="w-3 h-3" />
                                {formatDateTime(meeting.date).split('at')[0]}
                            </div>
                            <div className="text-xs text-gray-600">{formatDateTime(meeting.date).split('at')[1]}</div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-white/30">
                        <div className="text-xs text-gray-600 font-medium uppercase mb-2">Agenda Items</div>
                        <ul className="space-y-2">
                            {meeting.agendaItems.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-gray-700 mt-0.5">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-3 bg-white/50 flex justify-between items-center border-t border-gray-200/50">
                        <div className="text-xs text-gray-600">
                            {meeting.status === 'Completed' ? (
                                `Attendance: ${meeting.attendanceCount}/${meeting.totalMembers} Members`
                            ) : (
                                `Invitees: ${meeting.totalMembers} Members`
                            )}
                        </div>
                        <button className="text-xs font-medium text-brand flex items-center gap-1 hover:text-brand-light transition-colors">
                            {meeting.status === 'Completed' ? 'View Minutes' : 'Generate Notice'}
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}

      {activeTab === 'decisions' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             {mockDecisions.map(decision => (
                <div key={decision.id} className="comp-card overflow-hidden">
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200/50">
                                    {decision.resolutionNumber}
                                </span>
                            </div>
                            <div className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${getDecisionStatusColor(decision.status)}`}>
                                {decision.status}
                            </div>
                        </div>
                        <h3 className="text-gray-900 font-semibold mb-3">{decision.description}</h3>
                        
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Target className="w-3.5 h-3.5" />
                                {decision.assignedTo}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600">
                                <Clock className="w-3.5 h-3.5" />
                                Due: {formatDate(decision.dueDate)}
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-white/50 border-t border-gray-200/50 flex justify-end">
                        <button className="text-xs font-medium text-brand flex items-center gap-1 hover:text-brand-light transition-colors">
                            Update Status <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
             ))}
        </div>
      )}
    </div>
  );
}
