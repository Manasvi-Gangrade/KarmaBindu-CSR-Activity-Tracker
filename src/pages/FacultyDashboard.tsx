import React from 'react';
import { motion } from 'framer-motion';
import { activities } from '@/data/mockData';
import { useCountUp } from '@/hooks/useCountUp';
import { Clock, CalendarDays, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FacultyDashboard: React.FC = () => {
  const pendingApprovals = 12;
  const deptActivities = activities.slice(0, 5);
  
  const stats = [
    { label: 'Pending Volunteer Approvals', value: pendingApprovals.toString(), icon: <CheckCircle size={22} />, color: 'bg-warning/10 text-warning' },
    { label: 'Department Activities', value: deptActivities.length.toString(), icon: <CalendarDays size={22} />, color: 'bg-info/10 text-info' },
  ];

  return (
    <div className="space-y-6">
      {/* Live Impact Ticker */}
      <div className="bg-primary/5 border-y border-primary/10 py-2 -mx-4 lg:-mx-6 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-[11px] font-bold uppercase tracking-widest text-primary/70"
        >
          {[
            "RECENT: Digital Literacy workshop in Dhar district completed successfully (500+ beneficiaries)",
            "UPCOMING: Blood donation drive scheduled for next Monday @ IIST Campus",
            "ALERT: AI & ML Department leads the weekly leaderboard with 1540 XP",
            "NOTIFY: New NAAC Criterion III reporting standards successfully integrated across units",
          ].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> {text}
            </span>
          ))}
        </motion.div>
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold">Faculty Portal</h1>
        <p className="text-muted-foreground text-sm">Review volunteer hours and manage your department's upcoming CSR events.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>{stat.icon}</div>
            <div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">My Department Activities</h3>
          <Link to="/activities" className="text-xs text-primary font-medium flex items-center gap-1">Manage <ArrowRight size={12} /></Link>
        </div>
        <div className="space-y-3">
          {deptActivities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-all">
              <div>
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{activity.date} · {activity.venue}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">View Pulse</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FacultyDashboard;
