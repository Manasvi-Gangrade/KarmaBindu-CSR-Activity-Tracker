import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, ScanSearch, MessageCircleWarning, TrendingDown, PenTool, Sparkles, Upload, FileCheck2, Send, Wand2, Trophy, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type TabType = 'nlp' | 'vision' | 'nudge' | 'predictive' | 'generative' | 'gamification' | 'grants';

const predictionData = [
  { name: 'CSE', projectedLag: 15 },
  { name: 'Mechanical', projectedLag: 45 },
  { name: 'Civil', projectedLag: 10 },
  { name: 'Electrical', projectedLag: 30 },
];

const AIAgents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('nlp');
  
  // NLP State
  const [nlpInput, setNlpInput] = useState('Organized a blood donation camp in the nearby village where 50 students participated.');
  const [nlpAnalyzing, setNlpAnalyzing] = useState(false);
  const [nlpResult, setNlpResult] = useState<{ criterion: string; confidence: number } | null>(null);

  // Vision State
  const [visionScanning, setVisionScanning] = useState(false);
  const [visionVerified, setVisionVerified] = useState(false);

  // Generative State
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState('');

  // Gamification State
  const [awardingBadge, setAwardingBadge] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);

  // Grants State
  const [draftingGrant, setDraftingGrant] = useState(false);
  const [grantResult, setGrantResult] = useState(false);

  const handleAwardBadge = () => {
    setAwardingBadge(true);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Analyzing department participation ratios...',
        success: () => {
          setAwardingBadge(false);
          setBadgeAwarded(true);
          return '🏆 Badge Awarded to Artificial Intelligence and Machine Learning!';
        },
        error: 'Engine failure'
      }
    );
  };

  const handleDraftGrant = () => {
    setDraftingGrant(true);
    setTimeout(() => {
      setDraftingGrant(false);
      setGrantResult(true);
    }, 2500);
  };

  const handleNlpAnalyze = () => {
    setNlpAnalyzing(true);
    setNlpResult(null);
    setTimeout(() => {
      setNlpAnalyzing(false);
      setNlpResult({
        criterion: 'Criterion III: Research, Innovations and Extension (3.4.3)',
        confidence: 98.4
      });
      toast.success('Activity automatically mapped to NAAC standards.');
    }, 1500);
  };

  const handleVisionScan = () => {
    setVisionScanning(true);
    setVisionVerified(false);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2500)),
      {
        loading: 'Vision AI extracting hours, date, and NGO signature...',
        success: () => {
          setVisionScanning(false);
          setVisionVerified(true);
          return 'Certificate Verified! 12 Hours logged successfully.';
        },
        error: 'Error'
      }
    );
  };

  const handleNudge = () => {
    toast.success('Nudge Agent Activated!');
    setTimeout(() => toast('WhatsApp sent to Rahul Sharma (Mech)'), 500);
    setTimeout(() => toast('WhatsApp sent to Priya Patel (CSE)'), 1200);
    setTimeout(() => toast('Email sent to 14 other students in danger zone.'), 2000);
  };

  const handleGenerateReport = () => {
    setGenerating(true);
    setReport('');
    const fullText = "## Annual CSR Impact Summary 2026\n\nThis year, Indore Institute of Science & Technology achieved unprecedented growth in community engagement. Over **2,847 volunteer hours** were logged across **68 activities**, deeply impacting **12,400+ beneficiaries**.\n\n### Key Highlights:\n- 100% compliance with AICTE mandatory 40-hour requirement for 3rd-year students.\n- Prominent outreach in rural healthcare and digital literacy.\n- Artificial Intelligence and Machine Learning department led the charge with a 145% increase in participation.\n- Seamless alignment with NAAC Criterion III extension goals.";
    
    let i = 0;
    const interval = setInterval(() => {
      setReport(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setGenerating(false);
        toast.success("NBA/NAAC Report Generated successfully.");
      }
    }, 15);
  };

  const tabs = [
    { id: 'nlp', label: 'NLP Mapping', icon: FileText, desc: 'Auto-tags event logic', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'vision', label: 'Vision Verification', icon: ScanSearch, desc: 'OCR certification check', color: 'bg-amber-500 hover:bg-amber-600' },
    { id: 'nudge', label: 'Smart Nudge', icon: MessageCircleWarning, desc: 'Automated student warnings', color: 'bg-rose-500 hover:bg-rose-600' },
    { id: 'predictive', label: 'Analytics Forecast', icon: TrendingDown, desc: 'Lagging performance stats', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'generative', label: 'Generative Reports', icon: PenTool, desc: 'LLM final reporting', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { id: 'gamification', label: 'Gamification Leaderboard', icon: Trophy, desc: 'Competitive ranking driver', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'grants', label: 'Smart Grant Configurator', icon: Landmark, desc: 'Auto-drafts state proposals', color: 'bg-indigo-500 hover:bg-indigo-600' },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Bot className="text-accent" size={28} /> AI Control Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the ensemble of AI Agents automating your institutional compliance.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-xs font-semibold">
          <Sparkles size={14} /> AI Engine Online
        </div>
      </div>

      <div className="flex flex-col items-center w-full relative">
        {/* Top Bold Colorful Grid Cards - 4 top, 3 centered bottom via flex-wrap */}
        <div className="flex flex-wrap justify-center gap-4 w-full relative z-20 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-start justify-center p-5 md:p-6 rounded-2xl cursor-pointer overflow-hidden relative group transition-all duration-300 shadow-xl ${tab.color} text-white w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] max-w-sm ${
                  isActive 
                    ? 'ring-4 ring-offset-4 ring-background scale-[1.02]' 
                    : 'opacity-90 hover:opacity-100 hover:-translate-y-1'
                }`}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                <div className="p-2.5 rounded-xl bg-white/20 text-white shadow-sm mb-3 relative z-10">
                  <tab.icon size={22} strokeWidth={2.5} />
                </div>
                <h3 className="font-display font-bold text-lg md:text-[19px] leading-tight tracking-tight relative z-10 drop-shadow-sm">{tab.label}</h3>
                <p className="text-sm font-medium text-white/80 mt-1 relative z-10">{tab.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Content Dashboard Pane */}
        <div className="w-full bg-card rounded-3xl border min-h-[500px] p-6 lg:p-8 shadow-2xl overflow-hidden relative z-10 w-full">
          <AnimatePresence mode="wait">
            {/* NLP MAPPING */}
            {activeTab === 'nlp' && (
              <motion.div key="nlp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><FileText className="text-primary"/> NLP Semantic Mapper</h2>
                  <p className="text-sm text-muted-foreground">Type a generic event description. The AI will parse the context and automatically tag the correct NAAC criteria.</p>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity Description</label>
                  <textarea 
                    className="w-full h-24 p-3 rounded-lg border bg-background text-sm resize-none focus:ring-1 focus:ring-accent"
                    value={nlpInput}
                    onChange={(e) => setNlpInput(e.target.value)}
                  />
                  <Button onClick={handleNlpAnalyze} disabled={nlpAnalyzing} className="gradient-primary text-white w-full">
                    {nlpAnalyzing ? <Sparkles className="animate-spin mr-2" size={16}/> : <Wand2 className="mr-2" size={16}/>}
                    Analyze Context
                  </Button>
                </div>
                {nlpResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-success/10 border border-success/20 rounded-xl">
                    <p className="text-xs text-success font-semibold uppercase mb-1">AI Tagging Complete</p>
                    <p className="text-sm font-medium text-foreground">{nlpResult.criterion}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 flex-1 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full w-[98.4%]" />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{nlpResult.confidence}% Match</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* VISION VERIFIER */}
            {activeTab === 'vision' && (
              <motion.div key="vision" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><ScanSearch className="text-primary"/> Vision AI OCR Verifier</h2>
                  <p className="text-sm text-muted-foreground">Simulate a student uploading an external certificate. The Vision Agent verifies it instantly.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background p-4 rounded-xl border">
                    <p className="text-2xl font-bold text-accent">2,401</p>
                    <p className="text-xs text-muted-foreground">Auto-Verified This Year</p>
                  </div>
                  <div className="bg-background p-4 rounded-xl border">
                    <p className="text-2xl font-bold text-success">120 hrs</p>
                    <p className="text-xs text-muted-foreground">Faculty Time Saved</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-background/50">
                  {!visionVerified ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Upload className="text-primary" size={24} />
                      </div>
                      <h3 className="text-sm font-semibold mb-1">Upload Certificate Sample</h3>
                      <p className="text-xs text-muted-foreground mb-4">PNG, JPG, PDF up to 5MB</p>
                      <Button onClick={handleVisionScan} disabled={visionScanning} variant="outline" className="w-full max-w-xs mx-auto">
                        {visionScanning ? 'Extracting Data...' : 'Simulate Upload'}
                      </Button>
                    </>
                  ) : (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                        <FileCheck2 className="text-success" size={32} />
                      </div>
                      <h3 className="text-success font-semibold">12 Hours Approved.</h3>
                      <p className="text-xs text-muted-foreground mt-2">Signatures, Dates, and NGO stamps matched.</p>
                      <Button onClick={() => setVisionVerified(false)} variant="link" className="mt-2 text-xs">Test Another</Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SMART NUDGE */}
            {activeTab === 'nudge' && (
              <motion.div key="nudge" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><MessageCircleWarning className="text-accent"/> Smart Nudge Agent</h2>
                  <p className="text-sm text-muted-foreground">Identifies students falling behind on hours and sends personalized WhatsApp warnings.</p>
                </div>
                <div className="bg-accent/10 border border-accent/30 p-4 rounded-xl">
                  <p className="font-semibold text-accent-foreground text-sm">Action Required: 16 Students</p>
                  <p className="text-xs text-muted-foreground mt-1">These students have logged less than 5 hours with only 3 weeks remaining in the semester.</p>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Rahul Sharma', dep: 'Mechanical (3rd Yr)', hours: 2 },
                    { name: 'Priya Patel', dep: 'CSE (3rd Yr)', hours: 4 },
                  ].map(s => (
                    <div key={s.name} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.dep}</p>
                      </div>
                      <span className="text-xs font-bold text-destructive">{s.hours}/40 hrs</span>
                    </div>
                  ))}
                </div>
                <Button onClick={handleNudge} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                  <Send size={16} className="mr-2" /> Dispatch Auto-Nudges (WhatsApp)
                </Button>
              </motion.div>
            )}

            {/* PREDICTIVE ANALYTICS */}
            {activeTab === 'predictive' && (
              <motion.div key="predictive" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><TrendingDown className="text-primary"/> Predictive Analytics</h2>
                  <p className="text-sm text-muted-foreground">Forecasts compliance failures before they happen using historical trend data.</p>
                </div>
                <div className="h-64 mt-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="projectedLag" name="% of Dept Falling Behind" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Mechanical Dept forecasted to miss targets by <span className="text-primary font-bold">45%</span>.</p>
                  <p className="text-xs text-muted-foreground mt-1">Intervention recommended by system.</p>
                </div>
              </motion.div>
            )}

            {/* GENERATIVE REPORTER */}
            {activeTab === 'generative' && (
              <motion.div key="generative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><PenTool className="text-primary"/> Generative LLM Reporter</h2>
                  <p className="text-sm text-muted-foreground">Consumes all database activities to write eloquent NAAC/NBA qualitative impact reports.</p>
                </div>
                {!generating && !report && (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-background/50 min-h-[200px]">
                    <Button onClick={handleGenerateReport} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                      <Sparkles size={16} className="mr-2" /> Start LLM Generation
                    </Button>
                  </div>
                )}
                {(generating || report) && (
                  <div className="flex-1 p-4 rounded-xl bg-muted/30 border font-mono text-sm h-64 overflow-auto whitespace-pre-wrap leading-relaxed">
                    {report}
                    {generating && <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />}
                  </div>
                )}
              </motion.div>
            )}

            {/* GAMIFICATION */}
            {activeTab === 'gamification' && (
              <motion.div key="gamification" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><Trophy className="text-primary"/> Gamification Matchmaker</h2>
                  <p className="text-sm text-muted-foreground">Creates real-time competitive leaderboards across departments to boost student participation.</p>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {[
                    { rank: 1, dept: 'Artificial Intelligence & ML', points: 1540, color: badgeAwarded ? 'bg-[#FFD700]/20 text-yellow-600 border-[#FFD700] ring-4 ring-[#FFD700]/30 transition-all duration-500 shadow-[0_0_30px_rgba(255,215,0,0.3)] scale-[1.02]' : 'bg-accent/20 text-accent-foreground border-accent/40 transition-all' },
                    { rank: 2, dept: 'Computer Science', points: 1240, color: 'bg-muted/50 text-foreground border-border' },
                    { rank: 3, dept: 'Information Technology', points: 980, color: 'bg-primary/5 text-primary border-primary/20' },
                  ].map(d => (
                    <div key={d.rank} className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${d.color}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black opacity-50">#{d.rank}</span>
                        <span className="font-bold">{d.dept}</span>
                      </div>
                      <span className="font-display font-black text-lg">{d.points} XP</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleAwardBadge} 
                  disabled={awardingBadge || badgeAwarded} 
                  variant="outline" 
                  className={`w-full mt-4 border-primary/30 transition-all ${badgeAwarded ? 'bg-success/10 text-success border-success/30' : 'text-primary hover:bg-primary/5'}`}
                >
                  {awardingBadge ? <Sparkles size={16} className="mr-2 animate-spin" /> : <Trophy size={16} className="mr-2" />}
                  {awardingBadge ? 'Computing Badges...' : badgeAwarded ? 'Badge Awarded to Top Dept' : 'Award Weekly Badge Automatically'}
                </Button>
              </motion.div>
            )}

            {/* SMART GRANT */}
            {activeTab === 'grants' && (
              <motion.div key="grants" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex flex-col h-full">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2"><Landmark className="text-primary"/> Smart Budget & Grant Agent</h2>
                  <p className="text-sm text-muted-foreground">Scans your planned events and automatically drafts funding proposals for local NGOs and Government Grants.</p>
                </div>
                <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <h3 className="font-bold text-primary mb-2 mt-4 text-lg">Opportunity Detected: Digital Literacy Drive</h3>
                  <p className="text-sm text-muted-foreground mb-4">Based on historical data, this event matches the criteria for the "MP State Skill Development Grant" (up to ₹50,000).</p>
                  
                  {!grantResult ? (
                    <Button onClick={handleDraftGrant} disabled={draftingGrant} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-lg shadow-primary/20 transition-all duration-300">
                      {draftingGrant ? <Sparkles size={16} className="mr-2 animate-spin" /> : <Sparkles size={16} className="mr-2" />} 
                      {draftingGrant ? 'Drafting Proposal...' : 'Auto-Draft 5-Page Proposal'}
                    </Button>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-success/10 text-success p-3 rounded-lg border border-success/20 flex flex-col items-center justify-center gap-2">
                       <span className="font-bold flex items-center gap-2">Draft Ready!</span>
                       <Button size="sm" variant="outline" className="text-xs bg-transparent border-success/30 hover:bg-success/20 w-fit text-success mx-auto">Download PDF</Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;
