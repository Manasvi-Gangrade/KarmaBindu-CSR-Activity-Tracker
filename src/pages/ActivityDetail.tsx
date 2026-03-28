import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { activities } from '@/data/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CalendarDays, Users, Clock, Heart, Award, Building2, Target, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categoryColors, statusColors } from '@/data/mockData';

const ActivityDetail: React.FC = () => {
  const { id } = useParams();
  const activity = activities.find(a => a.id === id);

  if (!activity) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Activity not found</p>
        <Link to="/activities" className="text-primary text-sm mt-2 inline-block">← Back to Activities</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/activities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Back to Activities
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[activity.category] || 'bg-muted text-muted-foreground'}`}>
                  {activity.category}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[activity.status]}`}>
                  {activity.status.replace('_', ' ')}
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">{activity.title}</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">{activity.description}</p>
            </div>
            <Button 
              onClick={() => {
                const text = `Check out this CSR Activity at IIST KarmaBindu: ${activity.title} on ${activity.date}. Join us for a meaningful impact! 🌟`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 shrink-0 py-6 px-6 rounded-xl shadow-lg border-none"
            >
              <Share2 size={18} /> Share on WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { icon: <CalendarDays size={16} />, label: 'Date', value: activity.date },
              { icon: <MapPin size={16} />, label: 'Venue', value: activity.venue },
              { icon: <Building2 size={16} />, label: 'Department', value: activity.department },
              { icon: <Award size={16} />, label: 'Coordinator', value: activity.coordinator },
            ].map((info, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">{info.icon}<span className="text-[10px] uppercase tracking-wider">{info.label}</span></div>
                <p className="text-sm font-medium">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[
            { icon: <Users size={20} />, value: activity.volunteers, label: 'Volunteers', color: 'text-primary' },
            { icon: <Clock size={20} />, value: `${activity.hours}h`, label: 'Total Hours', color: 'text-info' },
            { icon: <Heart size={20} />, value: activity.beneficiaries.toLocaleString(), label: 'Beneficiaries', color: 'text-destructive' },
          ].map((metric, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 text-center"
            >
              <div className={`${metric.color} mb-2 flex justify-center`}>{metric.icon}</div>
              <p className="font-display text-2xl font-bold">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals & Accreditation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={18} className="text-primary" />
              <h3 className="font-display font-semibold text-sm">Target Goal</h3>
            </div>
            <p className="text-sm text-muted-foreground">{activity.targetGoal}</p>
            {activity.status === 'completed' && (
              <div className="mt-3 flex items-center gap-2 text-xs text-success font-medium">
                <div className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center">✓</div>
                Goal achieved
              </div>
            )}
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-accent" />
              <h3 className="font-display font-semibold text-sm">Accreditation Mapping</h3>
            </div>
            <p className="text-sm text-muted-foreground">{activity.naacCriterion}</p>
            <p className="text-[10px] text-muted-foreground mt-2">This activity contributes to NAAC/NBA scoring</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityDetail;
