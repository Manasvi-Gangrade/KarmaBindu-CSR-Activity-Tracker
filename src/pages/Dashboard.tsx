import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { activities, volunteers } from '@/data/mockData';
import { useCountUp } from '@/hooks/useCountUp';
import { Clock, Users, Heart, CalendarDays, TrendingUp, Award, MapPin, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const monthlyData = [
  { month: 'Sep', activities: 5, hours: 200, beneficiaries: 800 },
  { month: 'Oct', activities: 7, hours: 350, beneficiaries: 1200 },
  { month: 'Nov', activities: 4, hours: 180, beneficiaries: 600 },
  { month: 'Dec', activities: 8, hours: 420, beneficiaries: 1800 },
  { month: 'Jan', activities: 6, hours: 280, beneficiaries: 950 },
  { month: 'Feb', activities: 10, hours: 520, beneficiaries: 2100 },
  { month: 'Mar', activities: 3, hours: 150, beneficiaries: 400 },
];

const categoryData = [
  { name: 'Health', value: 25, color: 'hsl(0, 72%, 51%)' },
  { name: 'Education', value: 20, color: 'hsl(210, 100%, 52%)' },
  { name: 'Environment', value: 18, color: 'hsl(142, 71%, 45%)' },
  { name: 'Digital Literacy', value: 15, color: 'hsl(162, 63%, 35%)' },
  { name: 'Women Emp.', value: 12, color: 'hsl(38, 92%, 55%)' },
  { name: 'Disaster Relief', value: 10, color: 'hsl(280, 60%, 50%)' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const totalHours = activities.filter(a => a.status === 'completed').reduce((s, a) => s + a.hours, 0);
  const totalBeneficiaries = activities.filter(a => a.status === 'completed').reduce((s, a) => s + a.beneficiaries, 0);
  const completedCount = activities.filter(a => a.status === 'completed').length;

  const animatedHours = useCountUp(totalHours);
  const animatedBeneficiaries = useCountUp(totalBeneficiaries);
  const animatedActivities = useCountUp(activities.length);
  const animatedParticipation = useCountUp(34);

  const stats = [
    { label: 'Volunteer Hours (YTD)', value: animatedHours.toLocaleString(), icon: <Clock size={22} />, color: 'bg-primary/10 text-primary' },
    { label: 'Beneficiaries Reached', value: animatedBeneficiaries.toLocaleString() + '+', icon: <Heart size={22} />, color: 'bg-destructive/10 text-destructive' },
    { label: 'Activities This Year', value: animatedActivities.toString(), icon: <CalendarDays size={22} />, color: 'bg-info/10 text-info' },
    { label: 'Student Participation', value: animatedParticipation + '%', icon: <Users size={22} />, color: 'bg-success/10 text-success' },
  ];

  const recentActivities = [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Live Impact Ticker */}
      <div className="bg-primary/5 border-y border-primary/10 py-2 -mx-4 lg:-mx-6 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-[11px] font-bold uppercase tracking-widest text-primary/70"
        >
          {Array(5).fill([
            "RECENT: Digital Literacy workshop in Dhar district completed successfully (500+ beneficiaries)",
            "UPCOMING: Blood donation drive scheduled for next Monday @ IIST Campus",
            "ALERT: AI & ML Department leads the weekly leaderboard with 1540 XP",
            "NOTIFY: New NAAC Criterion III reporting standards successfully integrated across units",
            "IMPACT: 2,847+ volunteer hours logged this academic year"
          ]).flat().map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Greeting */}
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your CSR impact overview for the current academic year.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <TrendingUp size={14} className="text-success" />
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Trend */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-display font-semibold mb-4">Activity Trend — Monthly</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(162, 63%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(162, 63%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 90%)" />
              <XAxis dataKey="month" fontSize={12} stroke="hsl(200, 10%, 45%)" />
              <YAxis fontSize={12} stroke="hsl(200, 10%, 45%)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(150, 15%, 90%)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="hours" stroke="hsl(162, 63%, 35%)" fill="url(#colorHours)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-display font-semibold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={75} innerRadius={45} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(150, 15%, 90%)', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activities + Top Volunteers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-display font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  activity.status === 'completed' ? 'bg-success' : activity.status === 'upcoming' ? 'bg-info' : 'bg-warning'
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date} · {activity.venue}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize shrink-0 ${
                  activity.status === 'completed' ? 'bg-success/10 text-success' : activity.status === 'upcoming' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                }`}>
                  {activity.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Volunteers */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-display font-semibold mb-4">Top Volunteers</h3>
          <div className="space-y-3">
            {volunteers.sort((a, b) => b.totalHours - a.totalHours).slice(0, 5).map((v, i) => (
              <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'gradient-accent text-primary-foreground' : i === 1 ? 'bg-muted text-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.department} · {v.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{v.totalHours}h</p>
                  <p className="text-[10px] text-muted-foreground">{v.activitiesCount} activities</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NAAC Alignment Quick View */}
      {(user?.role === 'naac_coordinator' || user?.role === 'admin') && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="bg-card rounded-xl border border-border p-5"
        >
          <h3 className="font-display font-semibold mb-4">NAAC Criterion Alignment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { criterion: 'Criterion III', label: 'Research, Innovation & Extension', count: 5, score: 82 },
              { criterion: 'Criterion VII', label: 'Institutional Values', count: 3, score: 75 },
              { criterion: 'NBA PEO 6-8', label: 'Societal Impact Outcomes', count: 4, score: 70 },
            ].map((c, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs font-semibold text-primary">{c.criterion}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-border">
                    <div className="h-2 rounded-full gradient-primary" style={{ width: `${c.score}%` }} />
                  </div>
                  <span className="text-xs font-bold">{c.score}%</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{c.count} activities mapped</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
