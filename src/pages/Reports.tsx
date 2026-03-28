import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Mail, Calendar, Building2, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { activities } from '@/data/mockData';

const reportTypes = [
  { id: 'naac_ssr', label: 'NAAC SSR — Criterion III', desc: 'Self Study Report for Extension Activities' },
  { id: 'naac_aqar', label: 'NAAC AQAR Report', desc: 'Annual Quality Assurance Report' },
  { id: 'nba_peo', label: 'NBA PEO Alignment Report', desc: 'Programme Educational Outcome mapping' },
  { id: 'department', label: 'Department-wise Report', desc: 'Activity summary by department' },
  { id: 'volunteer', label: 'Volunteer Hours Report', desc: 'Student participation and hours log' },
  { id: 'csr_annual', label: 'CSR Annual Report', desc: 'Companies Act 2013 compliance report' },
];

const Reports: React.FC = () => {
  const [selectedType, setSelectedType] = useState('');
  const [year, setYear] = useState('2025-26');
  const [department, setDepartment] = useState('all');
  const [generated, setGenerated] = useState(false);

  const completedActivities = activities.filter(a => a.status === 'completed');
  const totalHours = completedActivities.reduce((s, a) => s + a.hours, 0);
  const totalBeneficiaries = completedActivities.reduce((s, a) => s + a.beneficiaries, 0);

  const handleGenerate = () => {
    if (!selectedType) { toast.error('Please select a report type'); return; }
    setGenerated(true);
    toast.success('Report generated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Reports & Export</h1>
        <p className="text-muted-foreground text-sm">Generate NAAC/NBA accreditation-ready reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <div className="lg:col-span-1 space-y-4">
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-xl border border-border p-5 space-y-4"
          >
            <h3 className="font-display font-semibold text-sm flex items-center gap-2"><Filter size={16} />Report Configuration</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Report Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger><SelectValue placeholder="Select report type" /></SelectTrigger>
                <SelectContent>{reportTypes.map(r => <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Academic Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-26">2025-26</SelectItem>
                  <SelectItem value="2024-25">2024-25</SelectItem>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ec">Electronics</SelectItem>
                  <SelectItem value="me">Mechanical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} className="w-full gradient-primary text-primary-foreground hover:opacity-90">
              Generate Report
            </Button>
          </motion.div>

          {/* Quick Reports */}
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-xl border border-border p-5"
          >
            <h3 className="font-display font-semibold text-sm mb-3">Quick Reports</h3>
            <div className="space-y-2">
              {reportTypes.map(r => (
                <button key={r.id} onClick={() => { setSelectedType(r.id); }}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-colors ${
                    selectedType === r.id ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <p className="font-medium">{r.label}</p>
                  <p className="text-muted-foreground mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Preview Panel */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          {generated ? (
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold">Report Preview</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => {
                    const content = `IIST CSR REPORT: ${selectedType.toUpperCase()}\nYear: ${year}\nGenerated: ${new Date().toLocaleString()}\n\nTotal Activities: ${completedActivities.length}\nTotal Hours: ${totalHours}\nTotal Beneficiaries: ${totalBeneficiaries}\n\nGenerated by KarmaBindu IIST CSR Tracker.`;
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${selectedType}_${year}.pdf`;
                    link.click();
                    URL.revokeObjectURL(url);
                    toast.success('Report downloaded as PDF');
                  }}>
                    <Download size={14} className="mr-1" /> PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    const content = `Activity,Category,Date,Volunteers,Hours,Beneficiaries\n` + 
                      completedActivities.map(a => `${a.title},${a.category},${a.date},${a.volunteers},${a.hours},${a.beneficiaries}`).join('\n');
                    const blob = new Blob([content], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${selectedType}_${year}.csv`;
                    link.click();
                    URL.revokeObjectURL(url);
                    toast.success('Report downloaded as CSV (Excel)');
                  }}>
                    <Download size={14} className="mr-1" /> Excel
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success('Report sent to NAAC coordinator email')}>
                    <Mail size={14} className="mr-1" /> Email
                  </Button>
                </div>
              </div>

              {/* Report Content Preview */}
              <div className="border border-border rounded-lg p-6 bg-background space-y-6">
                <div className="text-center border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Self Study Report</p>
                  <h2 className="font-display text-xl font-bold mt-1">NAAC Criterion III — Research, Innovation & Extension</h2>
                  <p className="text-sm text-muted-foreground mt-1">Academic Year: {year} | Generated: {new Date().toLocaleDateString()}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">3.4.1 — Extension Activities Summary</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Total Activities', value: completedActivities.length },
                      { label: 'Volunteer Hours', value: totalHours.toLocaleString() },
                      { label: 'Beneficiaries', value: totalBeneficiaries.toLocaleString() },
                      { label: 'Departments', value: '6' },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 text-center">
                        <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">3.4.2 — Activity Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 text-muted-foreground font-medium">Activity</th>
                          <th className="text-left py-2 px-2 text-muted-foreground font-medium">Category</th>
                          <th className="text-left py-2 px-2 text-muted-foreground font-medium">Date</th>
                          <th className="text-center py-2 px-2 text-muted-foreground font-medium">Volunteers</th>
                          <th className="text-center py-2 px-2 text-muted-foreground font-medium">Beneficiaries</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedActivities.map(a => (
                          <tr key={a.id} className="border-b border-border last:border-0">
                            <td className="py-2 px-2 font-medium">{a.title}</td>
                            <td className="py-2 px-2 text-muted-foreground">{a.category}</td>
                            <td className="py-2 px-2 text-muted-foreground">{a.date}</td>
                            <td className="py-2 px-2 text-center">{a.volunteers}</td>
                            <td className="py-2 px-2 text-center">{a.beneficiaries.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-[10px] text-muted-foreground">Auto-generated by CSR Activity Tracker · {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-display font-semibold text-lg">Select a Report Type</h3>
              <p className="text-sm text-muted-foreground mt-1">Configure the report parameters and click "Generate Report" to preview</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
