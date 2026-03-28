import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { activities } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const myHours = 120;
  const myActivities = 8;
  const upcomingActivities = activities.filter(a => a.status === 'upcoming');
  const pastActivities = activities.filter(a => a.status === 'completed').slice(0, 4);

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
        <h1 className="font-display text-2xl font-bold">Hi, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground text-sm">Track your volunteer hours and explore upcoming CSR activities.</p>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Clock size={22} />, value: `${myHours}h`, label: 'My Volunteer Hours', color: 'bg-primary/10 text-primary' },
          { icon: <CalendarDays size={22} />, value: myActivities.toString(), label: 'Activities Participated', color: 'bg-info/10 text-info' },
          { icon: <Award size={22} />, value: '3', label: 'Certificates Earned', color: 'bg-accent/10 text-accent-foreground' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>{stat.icon}</div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Activities */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Upcoming Activities</h3>
          <Link to="/activities" className="text-xs text-primary font-medium flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
        {upcomingActivities.length > 0 ? (
          <div className="space-y-3">
            {upcomingActivities.map(activity => (
              <Link key={activity.id} to={`/activities/${activity.id}`}
                className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date} · {activity.venue}</p>
                  </div>
                  <Button size="sm" className="gradient-primary text-primary-foreground text-xs hover:opacity-90">Register</Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">No upcoming activities at the moment</p>
        )}
      </motion.div>

      {/* Past Activities */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-5"
      >
        <h3 className="font-display font-semibold mb-4">My Past Activities</h3>
        <div className="space-y-3">
          {pastActivities.map(a => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.date} · {a.hours}h logged</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">Completed</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
