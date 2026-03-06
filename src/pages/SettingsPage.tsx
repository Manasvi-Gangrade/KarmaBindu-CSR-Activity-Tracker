import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, Bell, Shield, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6 space-y-5"
      >
        <h3 className="font-display font-semibold flex items-center gap-2"><Shield size={18} /> Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input defaultValue={user?.department} />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input defaultValue={user?.role?.replace('_', ' ')} disabled className="capitalize" />
          </div>
        </div>
        <Button onClick={() => toast.success('Profile updated')} className="gradient-primary text-primary-foreground hover:opacity-90">
          <Save size={14} className="mr-2" /> Save Changes
        </Button>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6 space-y-4"
      >
        <h3 className="font-display font-semibold flex items-center gap-2"><Bell size={18} /> Notifications</h3>
        {[
          { label: 'Email notifications for new activities', defaultChecked: true },
          { label: 'SMS alerts for upcoming activities', defaultChecked: false },
          { label: 'Weekly impact summary', defaultChecked: true },
          { label: 'Report generation alerts', defaultChecked: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <span className="text-sm">{item.label}</span>
            <Switch defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </motion.div>

      {/* Institution */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 space-y-4"
      >
        <h3 className="font-display font-semibold flex items-center gap-2"><Globe size={18} /> Institution</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Institution Name</Label>
            <Input defaultValue="ABC College of Engineering" />
          </div>
          <div className="space-y-2">
            <Label>NAAC Accreditation ID</Label>
            <Input defaultValue="NAAC-2024-MH-12345" />
          </div>
        </div>
        <Button onClick={() => toast.success('Institution settings saved')} variant="outline">
          <Save size={14} className="mr-2" /> Save
        </Button>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
