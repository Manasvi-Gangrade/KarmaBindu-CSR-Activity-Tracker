import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { volunteers } from '@/data/mockData';
import { Award, Download, Eye, Palette, Search, X, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

type TemplateStyle = 'classic' | 'modern' | 'elegant';

const templateConfig: Record<TemplateStyle, { name: string; border: string; accent: string; bg: string; font: string }> = {
  classic: { name: 'Classic Gold', border: 'border-[hsl(38,70%,55%)]', accent: 'hsl(38,70%,55%)', bg: 'hsl(45,50%,97%)', font: 'serif' },
  modern: { name: 'Modern Teal', border: 'border-primary', accent: 'hsl(162,63%,35%)', bg: 'hsl(150,20%,98%)', font: 'sans-serif' },
  elegant: { name: 'Elegant Navy', border: 'border-[hsl(220,40%,30%)]', accent: 'hsl(220,40%,30%)', bg: 'hsl(220,20%,97%)', font: 'serif' },
};

const CertificatePreview: React.FC<{ 
  volunteer: typeof volunteers[0]; 
  template: TemplateStyle; 
  onClose: () => void;
  onDownload: () => void;
}> = ({ volunteer, template, onClose, onDownload }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const t = templateConfig[template];

  const handleWhatsAppShare = () => {
    const text = `Hi! Check out my CSR Certificate of Appreciation from IIST KarmaBindu! I've completed ${volunteer.totalHours} volunteer hours in ${volunteer.activitiesCount} activities. 🏆`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h3 className="font-display font-semibold text-sm">Certificate Preview — {t.name}</h3>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none" onClick={handleWhatsAppShare}>
              <Share2 size={14} className="mr-1.5" />Share
            </Button>
            <Button size="sm" onClick={onDownload}><Download size={14} className="mr-1.5" />Download PDF</Button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X size={18} /></button>
          </div>
        </div>

        {/* Certificate */}
        <div className="p-6 overflow-auto max-h-[75vh]">
          <div
            ref={certRef}
            className={`relative mx-auto border-4 ${t.border} rounded-lg p-8 sm:p-12`}
            style={{ background: t.bg, fontFamily: t.font, maxWidth: 640, aspectRatio: '1.414/1' }}
          >
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: t.accent }} />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: t.accent }} />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: t.accent }} />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: t.accent }} />

            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              {/* Institution */}
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">Institution of Higher Education</p>

              {/* Award icon */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: t.accent + '22' }}>
                <Award size={24} style={{ color: t.accent }} />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-wide" style={{ color: t.accent }}>
                Certificate of Appreciation
              </h2>

              <p className="text-xs text-muted-foreground">This is proudly presented to</p>

              <h3 className="text-2xl sm:text-3xl font-bold mt-1" style={{ color: t.accent, borderBottom: `2px solid ${t.accent}40`, paddingBottom: 4 }}>
                {volunteer.name}
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed mt-1">
                In recognition of outstanding community service contribution of{' '}
                <strong style={{ color: t.accent }}>{volunteer.totalHours} volunteer hours</strong>{' '}
                across <strong>{volunteer.activitiesCount} CSR activities</strong>,{' '}
                demonstrating dedication to social responsibility and community welfare.
              </p>

              <div className="flex items-center gap-8 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: t.accent }}>{volunteer.totalHours}h</div>
                  <div className="text-[10px] text-muted-foreground">Total Hours</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: t.accent }}>{volunteer.activitiesCount}</div>
                  <div className="text-[10px] text-muted-foreground">Activities</div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full mt-6 px-4">
                <div className="text-center">
                  <div className="w-24 border-t border-muted-foreground/30 mb-1" />
                  <p className="text-[10px] text-muted-foreground">Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-center">
                  <div className="w-24 border-t border-muted-foreground/30 mb-1" />
                  <p className="text-[10px] text-muted-foreground">Principal / Director</p>
                </div>
              </div>

              {/* QR placeholder */}
              <div className="mt-2 w-12 h-12 border border-border rounded flex items-center justify-center">
                <span className="text-[6px] text-muted-foreground leading-tight text-center">QR<br/>Code</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>('classic');
  const [previewVolunteer, setPreviewVolunteer] = useState<typeof volunteers[0] | null>(null);

  const filtered = volunteers.filter(v => {
    // Role-based filtering: Students only see themselves
    if (user?.role === 'student' && v.name !== 'Manasvi Gangrade') return false;
    
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                       v.department.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleDownload = (volunteer: typeof volunteers[0]) => {
    const certText = `
---------------------------------------------------------
           CERTIFICATE OF APPRECIATION
---------------------------------------------------------

This is proudly presented to:
      ${volunteer.name.toUpperCase()}

In recognition of outstanding community service contribution 
of ${volunteer.totalHours} volunteer hours across ${volunteer.activitiesCount} CSR activities,
demonstrating dedication to social responsibility and 
community welfare at IIST KarmaBindu.

Dated: ${new Date().toLocaleDateString('en-IN')}
Verify: IIST-CSR-${volunteer.id}-${volunteer.enrollmentNo}

---------------------------------------------------------
          Indore Institute of Science & Technology
---------------------------------------------------------
    `;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificate_${volunteer.name.replace(' ', '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Certificate downloaded for ${volunteer.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Certificate Generator</h1>
          <p className="text-muted-foreground text-sm">Preview and download customizable certificates for volunteers</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => {
          const content = `IIST KarmaBindu CSR Certificate Registry\nGenerated: ${new Date().toLocaleString()}\n\n` + 
            volunteers.map(v => `${v.name} (${v.enrollmentNo}) - ${v.totalHours} hrs / ${v.activitiesCount} activities`).join('\n');
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `IIST_CSR_Bulk_Certificates_Registry.pdf`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success('Bulk certificates registry downloaded!');
        }}>
          <Download size={14} className="mr-2" />Bulk Download
        </Button>
      </div>

      {/* Template selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Palette size={16} /> Template:
        </div>
        <div className="flex gap-2">
          {(Object.keys(templateConfig) as TemplateStyle[]).map(key => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                selectedTemplate === key
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {templateConfig[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search volunteers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Volunteer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {v.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.department} · {v.year}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-muted-foreground">{v.totalHours} hours · {v.activitiesCount} activities</span>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs px-2" onClick={() => setPreviewVolunteer(v)}>
                <Eye size={12} className="mr-1 hidden sm:block" />Preview
              </Button>
              <Button size="sm" className="flex-1 text-[10px] sm:text-xs px-2" onClick={() => handleDownload(v)}>
                <Download size={12} className="mr-1 hidden sm:block" />DL
              </Button>
              <Button size="sm" onClick={() => {
                const text = `Hi ${v.name}, congratulations on completing ${v.totalHours} volunteer hours! Download your certificate from the dashboard. 🏆`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }} className="bg-[#25D366] hover:bg-[#128C7E] text-white px-3 shrink-0">
                <Share2 size={14} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {previewVolunteer && (
          <CertificatePreview
            volunteer={previewVolunteer}
            template={selectedTemplate}
            onClose={() => setPreviewVolunteer(null)}
            onDownload={() => handleDownload(previewVolunteer)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
