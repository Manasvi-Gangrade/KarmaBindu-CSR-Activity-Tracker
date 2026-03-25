export interface Activity {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  department: string;
  coordinator: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'pending_review';
  beneficiaries: number;
  volunteers: number;
  hours: number;
  description: string;
  naacCriterion: string;
  images: string[];
  targetGoal: string;
}

export interface Volunteer {
  id: string;
  name: string;
  enrollmentNo: string;
  department: string;
  year: string;
  totalHours: number;
  activitiesCount: number;
  email: string;
  phone: string;
  nssUnit?: string;
}

export const activities: Activity[] = [
  {
    id: '1', title: 'Blood Donation Camp 2026', category: 'Community Health',
    date: '2026-02-15', venue: 'IIST Auditorium', department: 'NSS Unit',
    coordinator: 'Mr. Sukhdev Bamboriya', status: 'completed', beneficiaries: 320,
    volunteers: 85, hours: 340, description: 'Annual blood donation camp in collaboration with Red Cross Society. Over 320 units of blood were collected.',
    naacCriterion: 'Criterion III — Extension', images: [], targetGoal: 'Collect 300 units of blood',
  },
  {
    id: '2', title: 'Digital Literacy Workshop for Rural Women', category: 'Digital Literacy',
    date: '2026-03-01', venue: 'Nearby Village', department: 'Computer Science & Engineering',
    coordinator: 'Dr. Sathish Kumar Penchala', status: 'completed', beneficiaries: 200,
    volunteers: 45, hours: 180, description: 'Workshop on basic computer skills, UPI payments, and online government services for women in nearby villages.',
    naacCriterion: 'Criterion III + PEO 6', images: [], targetGoal: 'Train 200 women in digital literacy',
  },
  {
    id: '3', title: 'Tree Plantation Drive — Green Campus', category: 'Environmental',
    date: '2026-03-10', venue: 'IIST Campus & Nearby Hills', department: 'Civil Engineering',
    coordinator: 'Dr. Niraj Soni', status: 'upcoming', beneficiaries: 0,
    volunteers: 120, hours: 0, description: 'Plant 500 saplings across campus and nearby hill areas. Includes awareness session on biodiversity.',
    naacCriterion: 'Criterion VII + PEO 7', images: [], targetGoal: 'Plant 500 native species saplings',
  },
  {
    id: '4', title: 'Health Check-Up Camp for Elderly', category: 'Community Health',
    date: '2026-01-20', venue: 'Indore Community Hall', department: 'ESH',
    coordinator: 'Dr. Namrata Kaushal', status: 'completed', beneficiaries: 450,
    volunteers: 60, hours: 240, description: 'Free health screening including BP, sugar, eye check-up, and BMD tests for senior citizens.',
    naacCriterion: 'Criterion III — Extension', images: [], targetGoal: 'Screen 400 senior citizens',
  },
  {
    id: '5', title: 'Swachh Bharat Awareness Rally', category: 'Environmental',
    date: '2026-02-28', venue: 'Indore City Centre to IIST Road', department: 'All Departments',
    coordinator: 'Mr. Sukhdev Bamboriya', status: 'completed', beneficiaries: 1500,
    volunteers: 200, hours: 400, description: 'Awareness rally on cleanliness and waste segregation with street play and poster campaign.',
    naacCriterion: 'Criterion VII', images: [], targetGoal: 'Engage 1000+ community members',
  },
  {
    id: '6', title: 'Women Self-Help Group Financial Training', category: 'Women Empowerment',
    date: '2026-03-08', venue: 'Panchayat Office, Indore Rural', department: 'IIMR',
    coordinator: 'Mr. Rohit Inani', status: 'ongoing', beneficiaries: 75,
    volunteers: 25, hours: 50, description: 'Financial literacy and SHG management training for women. Sessions on banking, savings, micro-enterprise.',
    naacCriterion: 'Criterion III + VII', images: [], targetGoal: 'Train 100 women in financial literacy',
  },
  {
    id: '7', title: 'Coding Bootcamp for Government School Students', category: 'Education Outreach',
    date: '2026-03-15', venue: 'ZP High School, Indore', department: 'Computer Science & Engineering',
    coordinator: 'Dr. Sathish Kumar Penchala', status: 'upcoming', beneficiaries: 0,
    volunteers: 30, hours: 0, description: 'Week-long Scratch & Python bootcamp for Class 8-10 students.',
    naacCriterion: 'Criterion III + PEO 6', images: [], targetGoal: 'Teach 60 students basic programming',
  },
  {
    id: '8', title: 'Flood Relief Material Distribution', category: 'Disaster Relief',
    date: '2025-08-15', venue: 'Affected Areas, MP', department: 'NSS Unit',
    coordinator: 'Mr. Sukhdev Bamboriya', status: 'completed', beneficiaries: 2000,
    volunteers: 150, hours: 900, description: 'Emergency relief during floods. Distributed food, clothing, and medical supplies to 2000 families.',
    naacCriterion: 'Criterion VII', images: [], targetGoal: 'Provide relief to 1500 families',
  },
];

export const volunteers: Volunteer[] = [
  // AI & ML Top Students
  { id: '4', name: 'Manasvi Gangrade', enrollmentNo: '0818AL231040', department: 'Artificial Intelligence and Machine Learning', year: 'II', totalHours: 145, activitiesCount: 12, email: 'student@demo.com', phone: '9876543231', nssUnit: 'Unit 2' },
  { id: '1', name: 'Ayush Sharma', enrollmentNo: '0818AL231011', department: 'Artificial Intelligence and Machine Learning', year: 'II', totalHours: 120, activitiesCount: 8, email: 'ayush.s@iist.edu', phone: '9876543210', nssUnit: 'Unit 1' },
  { id: '2', name: 'Kabir Rathore', enrollmentNo: '0818AL231012', department: 'Artificial Intelligence and Machine Learning', year: 'II', totalHours: 95, activitiesCount: 6, email: 'kabir.r@iist.edu', phone: '9876543211' },
  { id: '3', name: 'Sneha Verma', enrollmentNo: '0818AL231013', department: 'Artificial Intelligence and Machine Learning', year: 'II', totalHours: 110, activitiesCount: 9, email: 'sneha.v@iist.edu', phone: '9876543212', nssUnit: 'Unit 1' },
  { id: '5', name: 'Rahul Joshi', enrollmentNo: '0818AL231014', department: 'Artificial Intelligence and Machine Learning', year: 'II', totalHours: 85, activitiesCount: 5, email: 'rahul.j@iist.edu', phone: '9876543213', nssUnit: 'Unit 2' },
  { id: '6', name: 'Ananya Singh', enrollmentNo: '0818AL231015', department: 'Artificial Intelligence and Machine Learning', year: 'III', totalHours: 130, activitiesCount: 10, email: 'ananya.s@iist.edu', phone: '9876543214' },
  
  // Computer Science & Engineering
  { id: '7', name: 'Aryan Thakur', enrollmentNo: '0818CS231011', department: 'Computer Science & Engineering', year: 'II', totalHours: 102, activitiesCount: 7, email: 'aryan.t@iist.edu', phone: '9876543216' },
  { id: '8', name: 'Nandini Patel', enrollmentNo: '0818CS231015', department: 'Computer Science & Engineering', year: 'II', totalHours: 88, activitiesCount: 6, email: 'nandini.p@iist.edu', phone: '9876543217', nssUnit: 'Unit 1' },
  { id: '9', name: 'Bhavesh Prajapat', enrollmentNo: '0818CS231016', department: 'Computer Science & Engineering', year: 'III', totalHours: 72, activitiesCount: 5, email: 'bhavesh.p@iist.edu', phone: '9876543218' },
  { id: '10', name: 'Kratika Kachole', enrollmentNo: '0818CS231019', department: 'Computer Science & Engineering', year: 'I', totalHours: 55, activitiesCount: 4, email: 'kratika.k@iist.edu', phone: '9876543219', nssUnit: 'Unit 2' },
  { id: '11', name: 'Deepanshu Gupta', enrollmentNo: '0818CS231020', department: 'Computer Science & Engineering', year: 'I', totalHours: 90, activitiesCount: 6, email: 'deepanshu.g@iist.edu', phone: '9876543220' },

  // Information Technology
  { id: '12', name: 'Neha Chouksey', enrollmentNo: '0818IT231021', department: 'Information Technology', year: 'IV', totalHours: 167, activitiesCount: 14, email: 'neha.c@iist.edu', phone: '9876543221', nssUnit: 'Unit 1' },
  { id: '13', name: 'Diksha Tiwari', enrollmentNo: '0818IT231023', department: 'Information Technology', year: 'II', totalHours: 84, activitiesCount: 5, email: 'diksha.t@iist.edu', phone: '9876543222' },
  { id: '14', name: 'Hariom Patidar', enrollmentNo: '0818IT231027', department: 'Information Technology', year: 'II', totalHours: 48, activitiesCount: 3, email: 'hariom.p@iist.edu', phone: '9876543223', nssUnit: 'Unit 2' },

  // Electronics & Communication
  { id: '15', name: 'Harshita Soni', enrollmentNo: '0818EC231028', department: 'Electronics & Communication', year: 'III', totalHours: 115, activitiesCount: 8, email: 'harshita.s@iist.edu', phone: '9876543224' },
  { id: '16', name: 'Hitanshi Upadhyay', enrollmentNo: '0818EC231029', department: 'Electronics & Communication', year: 'II', totalHours: 73, activitiesCount: 5, email: 'hitanshi.u@iist.edu', phone: '9876543225', nssUnit: 'Unit 1' },
  
  // Civil Engineering
  { id: '17', name: 'Jayesh Mathankar', enrollmentNo: '0818CL231031', department: 'Civil Engineering', year: 'II', totalHours: 60, activitiesCount: 4, email: 'jayesh.m@iist.edu', phone: '9876543226' },
  { id: '18', name: 'Kanak Rawat', enrollmentNo: '0818CL231032', department: 'Civil Engineering', year: 'II', totalHours: 92, activitiesCount: 6, email: 'kanak.r@iist.edu', phone: '9876543227', nssUnit: 'Unit 2' },
  
  // Mechanical Engineering
  { id: '19', name: 'Mohit Sen', enrollmentNo: '0818ME231042', department: 'Mechanical Engineering', year: 'II', totalHours: 76, activitiesCount: 5, email: 'mohit.sen@iist.edu', phone: '9876543232' },
  { id: '20', name: 'Krishna Kavishwar', enrollmentNo: '0818ME231036', department: 'Mechanical Engineering', year: 'III', totalHours: 56, activitiesCount: 4, email: 'krishna.k@iist.edu', phone: '9876543229', nssUnit: 'Unit 1' },
];

export const categoryColors: Record<string, string> = {
  'Community Health': 'bg-destructive/10 text-destructive',
  'Education Outreach': 'bg-info/10 text-info',
  'Environmental': 'bg-success/10 text-success',
  'Disaster Relief': 'bg-warning/10 text-warning-foreground',
  'Rural Development': 'bg-primary/10 text-primary',
  'Digital Literacy': 'bg-info/10 text-info',
  'Women Empowerment': 'bg-accent/10 text-accent-foreground',
};

export const statusColors: Record<string, string> = {
  'upcoming': 'bg-info/10 text-info',
  'ongoing': 'bg-warning/10 text-warning-foreground',
  'completed': 'bg-success/10 text-success',
  'pending_review': 'bg-accent/10 text-accent-foreground',
};
