import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { activities } from '@/data/mockData';
import { Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { categoryColors } from '@/data/mockData';

const Approvals: React.FC = () => {
  const [approvalStates, setApprovalStates] = useState<Record<string, 'approved' | 'rejected' | null>>(
    Object.fromEntries(activities.map(a => [a.id, null]))
  );

  const pendingActivities = activities.filter(a => a.status === 'completed' || a.status === 'pending_review');

  const handleApprove = (id: string) => {
    setApprovalStates(prev => ({ ...prev, [id]: 'approved' }));
    toast.success('Activity approved for accreditation records');
  };

  const handleReject = (id: string) => {
    setApprovalStates(prev => ({ ...prev, [id]: 'rejected' }));
    toast.info('Activity sent back for revision');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Activity Approvals</h1>
        <p className="text-muted-foreground text-sm">Review and approve activities for NAAC/NBA accreditation records</p>
      </div>

      <div className="space-y-3">
        {pendingActivities.map((activity, i) => (
          <motion.div key={activity.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-xl border p-5 transition-all ${
              approvalStates[activity.id] === 'approved' ? 'border-success/30 bg-success/5' :
              approvalStates[activity.id] === 'rejected' ? 'border-destructive/30 bg-destructive/5' : 'border-border'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[activity.category] || 'bg-muted text-muted-foreground'}`}>
                    {activity.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{activity.naacCriterion}</span>
                </div>
                <h3 className="font-display font-semibold text-sm">{activity.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{activity.date} · {activity.coordinator} · {activity.volunteers} volunteers · {activity.beneficiaries.toLocaleString()} beneficiaries</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {approvalStates[activity.id] ? (
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
                    approvalStates[activity.id] === 'approved' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {approvalStates[activity.id] === 'approved' ? '✓ Approved' : '✗ Rejected'}
                  </span>
                ) : (
                  <>
                    <Link to={`/activities/${activity.id}`}>
                      <Button size="sm" variant="outline"><Eye size={14} className="mr-1" /> View</Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleReject(activity.id)} className="text-destructive hover:bg-destructive/10">
                      <X size={14} className="mr-1" /> Reject
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(activity.id)} className="gradient-primary text-primary-foreground hover:opacity-90">
                      <Check size={14} className="mr-1" /> Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Approvals;
