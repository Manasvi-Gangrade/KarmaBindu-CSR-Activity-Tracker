import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { activities, categoryColors, statusColors } from '@/data/mockData';
import { Search, Filter, MapPin, Users, Clock, ChevronRight, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Activities: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = activities.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchCategory = categoryFilter === 'all' || a.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const statuses = ['all', 'upcoming', 'ongoing', 'completed', 'pending_review'];
  const categories = ['all', ...Array.from(new Set(activities.map(a => a.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Activities</h1>
          <p className="text-muted-foreground text-sm">{filtered.length} activities found</p>
        </div>
        <Link to="/activities/create" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <CalendarDays size={16} /> Create Activity
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === s ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >{s === 'all' ? 'All Status' : s.replace('_', ' ')}</button>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/activities/${activity.id}`} className="block bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[activity.category] || 'bg-muted text-muted-foreground'}`}>
                  {activity.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[activity.status]}`}>
                  {activity.status.replace('_', ' ')}
                </span>
              </div>
              <h3 className="font-display font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{activity.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{activity.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarDays size={12} />{activity.date}</span>
                <span className="flex items-center gap-1"><MapPin size={12} />{activity.venue.split(',')[0]}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs">
                <span className="flex items-center gap-1 text-primary font-medium"><Users size={12} />{activity.volunteers} volunteers</span>
                <span className="flex items-center gap-1"><Clock size={12} />{activity.hours}h</span>
                {activity.beneficiaries > 0 && <span className="flex items-center gap-1 ml-auto font-medium">{activity.beneficiaries.toLocaleString()} beneficiaries</span>}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No activities found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default Activities;
