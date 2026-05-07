export interface BoardMember {
  id: string;
  name: string;
  role: 'Chairman' | 'Managing Director' | 'Farmer Director' | 'Expert Director';
  appointedDate: string;
  termEnds: string;
  isFarmer: boolean;
  sharesHeld: number;
  attendanceRate: number; // percentage
  status: 'Active' | 'Resigned' | 'Disqualified';
}

export interface BoardMeeting {
  id: string;
  title: string;
  date: string;
  type: 'Regular' | 'Emergency' | 'AGM' | 'EGM';
  status: 'Scheduled' | 'Completed' | 'Drafting Minutes' | 'Cancelled';
  attendanceCount?: number;
  totalMembers: number;
  agendaItems: string[];
}

export interface BoardDecision {
  id: string;
  meetingId: string;
  resolutionNumber: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Implemented';
  assignedTo: string;
  dueDate: string;
}

export const mockBoardMembers: BoardMember[] = [
  {
      id: 'BM-001',
      name: 'Ramesh Kumar',
      role: 'Chairman',
      appointedDate: '2021-02-15',
      termEnds: '2026-02-14',
      isFarmer: true,
      sharesHeld: 500,
      attendanceRate: 100,
      status: 'Active'
  },
  {
      id: 'BM-002',
      name: 'Suresh Yadav',
      role: 'Managing Director',
      appointedDate: '2022-04-01',
      termEnds: '2027-03-31',
      isFarmer: true,
      sharesHeld: 250,
      attendanceRate: 95,
      status: 'Active'
  },
  {
      id: 'BM-003',
      name: 'Dr. Anita Desai',
      role: 'Expert Director',
      appointedDate: '2023-01-10',
      termEnds: '2026-01-09',
      isFarmer: false,
      sharesHeld: 0,
      attendanceRate: 80,
      status: 'Active'
  },
  {
      id: 'BM-004',
      name: 'Kamlesh Singh',
      role: 'Farmer Director',
      appointedDate: '2021-02-15',
      termEnds: '2024-02-14',
      isFarmer: true,
      sharesHeld: 100,
      attendanceRate: 60,
      status: 'Active' // Term ending soon
  },
  {
      id: 'BM-005',
      name: 'Meena Devi',
      role: 'Farmer Director',
      appointedDate: '2023-08-01',
      termEnds: '2028-07-31',
      isFarmer: true,
      sharesHeld: 50,
      attendanceRate: 100,
      status: 'Active'
  }
];

export const mockMeetings: BoardMeeting[] = [
  {
      id: 'MTG-001',
      title: 'Q1 Board Meeting FY24-25',
      date: '2024-06-15T10:00:00Z',
      type: 'Regular',
      status: 'Scheduled',
      totalMembers: 5,
      agendaItems: ['Approval of Q4 Financials', 'Input Procurement Plan for Kharif', 'Appointment of Internal Auditor']
  },
  {
      id: 'MTG-002',
      title: 'Annual General Meeting 2024',
      date: '2024-09-25T11:00:00Z',
      type: 'AGM',
      status: 'Scheduled',
      totalMembers: 847, // Total shareholders
      agendaItems: ['Adoption of Audited Accounts', 'Declaration of Patronage Bonus', 'Election of 2 Farmer Directors']
  },
  {
      id: 'MTG-003',
      title: 'Q4 Board Meeting FY23-24',
      date: '2024-03-20T10:00:00Z',
      type: 'Regular',
      status: 'Completed',
      attendanceCount: 4,
      totalMembers: 5,
      agendaItems: ['Review of Rabi Season Sales', 'Approval of Budget for FY24-25', 'Discussion on NABARD Scheme']
  }
];

export const mockDecisions: BoardDecision[] = [
  {
    id: 'DEC-001',
    meetingId: 'MTG-003',
    resolutionNumber: 'BM/23-24/Q4/03',
    description: 'Apply for NABARD Credit Guarantee Scheme for warehouse construction.',
    status: 'In Progress',
    assignedTo: 'Suresh Yadav (MD)',
    dueDate: '2024-05-30'
  },
  {
    id: 'DEC-002',
    meetingId: 'MTG-003',
    resolutionNumber: 'BM/23-24/Q4/04',
    description: 'Renew FSSAI License for processing unit.',
    status: 'Implemented',
    assignedTo: 'Compliance Officer',
    dueDate: '2024-04-15'
  }
];
