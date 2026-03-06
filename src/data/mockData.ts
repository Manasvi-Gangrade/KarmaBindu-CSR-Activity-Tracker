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
  { id: '1', name: 'Adeesh Jain', enrollmentNo: '0818CL231003', department: 'Civil Engineering', year: 'II', totalHours: 120, activitiesCount: 8, email: 'adeesh.jain@iist.edu', phone: '9876543210', nssUnit: 'Unit 1' },
  { id: '2', name: 'Aditya Chouksey', enrollmentNo: '0818CL231004', department: 'Civil Engineering', year: 'II', totalHours: 95, activitiesCount: 6, email: 'aditya.chouksey@iist.edu', phone: '9876543211', nssUnit: 'Unit 1' },
  { id: '3', name: 'Aditya Singh Rajput', enrollmentNo: '0818CL231005', department: 'Civil Engineering', year: 'II', totalHours: 78, activitiesCount: 5, email: 'aditya.rajput@iist.edu', phone: '9876543212', nssUnit: 'Unit 2' },
  { id: '4', name: 'Alkesh Patidar', enrollmentNo: '0818CL231007', department: 'Civil Engineering', year: 'II', totalHours: 110, activitiesCount: 7, email: 'alkesh.patidar@iist.edu', phone: '9876543213' },
  { id: '5', name: 'Anshika Punase', enrollmentNo: '0818CL231008', department: 'Civil Engineering', year: 'II', totalHours: 65, activitiesCount: 4, email: 'anshika.punase@iist.edu', phone: '9876543214', nssUnit: 'Unit 2' },
  { id: '6', name: 'Anuj Singh Parihar', enrollmentNo: '0818CL231009', department: 'Civil Engineering', year: 'II', totalHours: 88, activitiesCount: 6, email: 'anuj.parihar@iist.edu', phone: '9876543215', nssUnit: 'Unit 1' },
  { id: '7', name: 'Aryan Thakur', enrollmentNo: '0818CL231011', department: 'Civil Engineering', year: 'II', totalHours: 45, activitiesCount: 3, email: 'aryan.thakur@iist.edu', phone: '9876543216' },
  { id: '8', name: 'Ayushmaan Rathore', enrollmentNo: '0818CL231015', department: 'Civil Engineering', year: 'II', totalHours: 102, activitiesCount: 7, email: 'ayushmaan.rathore@iist.edu', phone: '9876543217', nssUnit: 'Unit 1' },
  { id: '9', name: 'Bhavesh Prajapat', enrollmentNo: '0818CL231016', department: 'Civil Engineering', year: 'II', totalHours: 72, activitiesCount: 5, email: 'bhavesh.prajapat@iist.edu', phone: '9876543218' },
  { id: '10', name: 'Darpan Naganpuriya', enrollmentNo: '0818CL231019', department: 'Civil Engineering', year: 'II', totalHours: 55, activitiesCount: 4, email: 'darpan.n@iist.edu', phone: '9876543219', nssUnit: 'Unit 2' },
  { id: '11', name: 'Deepanshu Gupta', enrollmentNo: '0818CL231020', department: 'Civil Engineering', year: 'II', totalHours: 90, activitiesCount: 6, email: 'deepanshu.gupta@iist.edu', phone: '9876543220' },
  { id: '12', name: 'Deepanshu Maheshwari', enrollmentNo: '0818CL231021', department: 'Civil Engineering', year: 'II', totalHours: 67, activitiesCount: 4, email: 'deepanshu.m@iist.edu', phone: '9876543221', nssUnit: 'Unit 1' },
  { id: '13', name: 'Diksha Akvean', enrollmentNo: '0818CL231023', department: 'Civil Engineering', year: 'II', totalHours: 84, activitiesCount: 5, email: 'diksha.a@iist.edu', phone: '9876543222' },
  { id: '14', name: 'Hariom Khete', enrollmentNo: '0818CL231027', department: 'Civil Engineering', year: 'II', totalHours: 48, activitiesCount: 3, email: 'hariom.k@iist.edu', phone: '9876543223', nssUnit: 'Unit 2' },
  { id: '15', name: 'Harshita Soni', enrollmentNo: '0818CL231028', department: 'Civil Engineering', year: 'II', totalHours: 115, activitiesCount: 8, email: 'harshita.s@iist.edu', phone: '9876543224' },
  { id: '16', name: 'Hitanshi Upadhyay', enrollmentNo: '0818CL231029', department: 'Civil Engineering', year: 'II', totalHours: 73, activitiesCount: 5, email: 'hitanshi.u@iist.edu', phone: '9876543225', nssUnit: 'Unit 1' },
  { id: '17', name: 'Jayesh Mathankar', enrollmentNo: '0818CL231031', department: 'Civil Engineering', year: 'II', totalHours: 60, activitiesCount: 4, email: 'jayesh.m@iist.edu', phone: '9876543226' },
  { id: '18', name: 'Kanak Rawat', enrollmentNo: '0818CL231032', department: 'Civil Engineering', year: 'II', totalHours: 92, activitiesCount: 6, email: 'kanak.r@iist.edu', phone: '9876543227', nssUnit: 'Unit 2' },
  { id: '19', name: 'Kratika Kachole', enrollmentNo: '0818CL231035', department: 'Civil Engineering', year: 'II', totalHours: 80, activitiesCount: 5, email: 'kratika.k@iist.edu', phone: '9876543228' },
  { id: '20', name: 'Krishna Kavishwar', enrollmentNo: '0818CL231036', department: 'Civil Engineering', year: 'II', totalHours: 56, activitiesCount: 4, email: 'krishna.k@iist.edu', phone: '9876543229', nssUnit: 'Unit 1' },
  { id: '21', name: 'Kunal Patidar', enrollmentNo: '0818CL231038', department: 'Civil Engineering', year: 'II', totalHours: 100, activitiesCount: 7, email: 'kunal.p@iist.edu', phone: '9876543230' },
  { id: '22', name: 'Manasvi Gangrade', enrollmentNo: '0818CL231040', department: 'Civil Engineering', year: 'II', totalHours: 42, activitiesCount: 3, email: 'manasvi.g@iist.edu', phone: '9876543231', nssUnit: 'Unit 2' },
  { id: '23', name: 'Mohit Sen', enrollmentNo: '0818CL231042', department: 'Civil Engineering', year: 'II', totalHours: 76, activitiesCount: 5, email: 'mohit.sen@iist.edu', phone: '9876543232' },
  { id: '24', name: 'Monty Kushwaha', enrollmentNo: '0818CL231043', department: 'Civil Engineering', year: 'II', totalHours: 63, activitiesCount: 4, email: 'monty.k@iist.edu', phone: '9876543233', nssUnit: 'Unit 1' },
  { id: '25', name: 'Muskan Lodhi', enrollmentNo: '0818CL231045', department: 'Civil Engineering', year: 'II', totalHours: 88, activitiesCount: 6, email: 'muskan.l@iist.edu', phone: '9876543234' },
  { id: '26', name: 'Nandini Singh', enrollmentNo: '0818CL231046', department: 'Civil Engineering', year: 'II', totalHours: 71, activitiesCount: 5, email: 'nandini.s@iist.edu', phone: '9876543235', nssUnit: 'Unit 2' },
  { id: '27', name: 'Nayan Adlak', enrollmentNo: '0818CL231047', department: 'Civil Engineering', year: 'II', totalHours: 54, activitiesCount: 4, email: 'nayan.a@iist.edu', phone: '9876543236' },
  { id: '28', name: 'Nishita Kanojiya', enrollmentNo: '0818CL231048', department: 'Civil Engineering', year: 'II', totalHours: 97, activitiesCount: 7, email: 'nishita.k@iist.edu', phone: '9876543237', nssUnit: 'Unit 1' },
  { id: '29', name: 'Palak Sharma', enrollmentNo: '0818CL231049', department: 'Civil Engineering', year: 'II', totalHours: 82, activitiesCount: 5, email: 'palak.s@iist.edu', phone: '9876543238' },
  { id: '30', name: 'Piyushi Patel', enrollmentNo: '0818CL231050', department: 'Civil Engineering', year: 'II', totalHours: 68, activitiesCount: 4, email: 'piyushi.p@iist.edu', phone: '9876543239', nssUnit: 'Unit 2' },
  { id: '31', name: 'Aaradhya Rassay', enrollmentNo: '0818CL231001', department: 'Civil Engineering', year: 'II', totalHours: 93, activitiesCount: 6, email: 'aaradhya.r@iist.edu', phone: '9876543240' },
  { id: '32', name: 'Adarsh Tiwari', enrollmentNo: '0818CL231002', department: 'Civil Engineering', year: 'II', totalHours: 50, activitiesCount: 3, email: 'adarsh.t@iist.edu', phone: '9876543241', nssUnit: 'Unit 1' },
  { id: '33', name: 'Arpit Mishra', enrollmentNo: '0818CL231010', department: 'Civil Engineering', year: 'II', totalHours: 77, activitiesCount: 5, email: 'arpit.m@iist.edu', phone: '9876543242' },
  { id: '34', name: 'Ashish Baraskar', enrollmentNo: '0818CL231012', department: 'Civil Engineering', year: 'II', totalHours: 61, activitiesCount: 4, email: 'ashish.b@iist.edu', phone: '9876543243', nssUnit: 'Unit 2' },
  { id: '35', name: 'Ashish Chouhan', enrollmentNo: '0818CL231013', department: 'Civil Engineering', year: 'II', totalHours: 105, activitiesCount: 7, email: 'ashish.c@iist.edu', phone: '9876543244' },
  { id: '36', name: 'Atharv Yadav', enrollmentNo: '0818CL221005', department: 'Civil Engineering', year: 'III', totalHours: 130, activitiesCount: 9, email: 'atharv.y@iist.edu', phone: '9876543245', nssUnit: 'Unit 1' },
  { id: '37', name: 'Atharva Barve', enrollmentNo: '0818CL231014', department: 'Civil Engineering', year: 'II', totalHours: 44, activitiesCount: 3, email: 'atharva.b@iist.edu', phone: '9876543246' },
  { id: '38', name: 'Chanchal Rathore', enrollmentNo: '0818CL231018', department: 'Civil Engineering', year: 'II', totalHours: 85, activitiesCount: 6, email: 'chanchal.r@iist.edu', phone: '9876543247', nssUnit: 'Unit 2' },
  { id: '39', name: 'Saptak Gupta', enrollmentNo: '0818CL231063', department: 'Civil Engineering', year: 'II', totalHours: 74, activitiesCount: 5, email: 'saptak.g@iist.edu', phone: '9876543248' },
  { id: '40', name: 'Shreyansh Gupta', enrollmentNo: '0818CL231068', department: 'Civil Engineering', year: 'II', totalHours: 98, activitiesCount: 7, email: 'shreyansh.g@iist.edu', phone: '9876543249', nssUnit: 'Unit 1' },
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
