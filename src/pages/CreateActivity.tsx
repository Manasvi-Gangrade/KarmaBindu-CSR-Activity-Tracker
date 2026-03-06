import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CalendarDays, Save } from 'lucide-react';

const categories = ['Community Health', 'Education Outreach', 'Environmental', 'Disaster Relief', 'Rural Development', 'Digital Literacy', 'Women Empowerment'];
const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'IT', 'Commerce', 'Medical Sciences', 'Environmental Science', 'NSS Unit', 'All Departments'];
const criterionOptions = ['Criterion III — Extension', 'Criterion VII', 'Criterion III + PEO 6', 'Criterion VII + PEO 7', 'Criterion III + VII', 'PEO 6 + PEO 8'];

const CreateActivity: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', category: '', date: '', venue: '', department: '', description: '', targetGoal: '', naacCriterion: '', targetBeneficiaries: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Activity created successfully!', { description: 'Students can now register for this activity.' });
    navigate('/activities');
  };

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Create New Activity</h1>
        <p className="text-muted-foreground text-sm mt-1">Fill in the details to create a new CSR activity</p>
      </div>

      <motion.form initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2 space-y-2">
            <Label>Activity Title *</Label>
            <Input placeholder="e.g., Blood Donation Camp 2026" value={form.title} onChange={e => update('title', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={v => update('category', v)} required>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Department *</Label>
            <Select value={form.department} onValueChange={v => update('department', v)} required>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date *</Label>
            <Input type="date" value={form.date} onChange={e => update('date', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Venue *</Label>
            <Input placeholder="e.g., College Auditorium" value={form.venue} onChange={e => update('venue', e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>NAAC/NBA Criterion *</Label>
            <Select value={form.naacCriterion} onValueChange={v => update('naacCriterion', v)} required>
              <SelectTrigger><SelectValue placeholder="Select criterion" /></SelectTrigger>
              <SelectContent>{criterionOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Target Beneficiaries</Label>
            <Input type="number" placeholder="e.g., 200" value={form.targetBeneficiaries} onChange={e => update('targetBeneficiaries', e.target.value)} />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <Label>Measurable Goal *</Label>
            <Input placeholder="e.g., Train 200 women in digital literacy" value={form.targetGoal} onChange={e => update('targetGoal', e.target.value)} required />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the activity, its objectives, and expected outcomes..." rows={4} value={form.description} onChange={e => update('description', e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button type="submit" className="gradient-primary text-primary-foreground hover:opacity-90">
            <Save size={16} className="mr-2" /> Create Activity
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/activities')}>Cancel</Button>
        </div>
      </motion.form>
    </div>
  );
};

export default CreateActivity;
