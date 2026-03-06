import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { volunteers } from '@/data/mockData';
import { Search, Download, Clock, Award, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Volunteers: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = volunteers.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) || v.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalHours = volunteers.reduce((s, v) => s + v.totalHours, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Volunteers</h1>
          <p className="text-muted-foreground text-sm">{volunteers.length} registered volunteers · {totalHours.toLocaleString()} total hours</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.success('Volunteer report downloaded!')}>
          <Download size={14} className="mr-2" /> Export CSV
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search by name or department..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Year</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">NSS Unit</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Hours</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Activities</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <motion.tr key={v.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                        {v.name.charAt(0)}
                      </div>
                      <span className="font-medium">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{v.department}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.year}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.nssUnit || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-primary font-semibold">
                      <Clock size={12} />{v.totalHours}h
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{v.activitiesCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${v.email}`} className="text-muted-foreground hover:text-foreground"><Mail size={14} /></a>
                      <a href={`tel:${v.phone}`} className="text-muted-foreground hover:text-foreground"><Phone size={14} /></a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toast.success(`Certificate generated for ${v.name}`)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                    >
                      Generate
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Volunteers;
