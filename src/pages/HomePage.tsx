import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Award, BookOpen, MapPin, Phone, Mail, Globe, ChevronDown, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import iistLogos from '@/assets/iist-logos.png';
import iistBanner from '@/assets/iist-campus-banner.png';
import iistCampus1 from '@/assets/iist-campus-1.png';
import iistCampus2 from '@/assets/iist-campus-2.png';
import iistAdvisor from '@/assets/iist-advisor.png';
import iistCampus3 from '@/assets/iist-campus-3.png';

const stats = [
  { value: '2,847+', label: 'Volunteer Hours', icon: Users },
  { value: '12,400+', label: 'Beneficiaries Reached', icon: Award },
  { value: '68', label: 'Activities This Year', icon: BookOpen },
  { value: '34%', label: 'Student Participation', icon: MapPin },
];

const faculty = [
  { name: 'Dr. Keshav Patidar', role: 'Principal' },
  { name: 'Dr. Brijendra Kumar Joshi', role: 'Dean Academics' },
  { name: 'Dr. Niraj Soni', role: 'HOD, Civil Engineering' },
  { name: 'Dr. Sathish Kumar Penchala', role: 'HOD, Computer Science & Engineering' },
  { name: 'Dr. Richa Gupta', role: 'HOD, AI & ML, IoT & Cyber Security' },
  { name: 'Dr. D.V. Singh', role: 'HOD, Mechanical Engineering' },
  { name: 'Dr. Samatha Singh', role: 'HOD, Chemical Engineering' },
  { name: 'Mr. Ankit Jain', role: 'HOD, Electronics & Communication' },
  { name: 'Dr. Namrata Kaushal', role: 'HOD, ESH' },
  { name: 'Ms. Margi Patel', role: 'HOD, Information Technology' },
  { name: 'Shweta Gupta', role: 'AIML Faculty' },
  { name: 'Ratnesh Chaturvedi', role: 'AIML Faculty' },
  { name: 'Mr. Leonard Jude Brown', role: 'Director & Head of CDC' },
  { name: 'Mr. Rohit Inani', role: 'Director, Corporate Relations' },
  { name: 'Mr. Sukhdev Bamboriya', role: 'Dean PE & Sports, NSS Coordinator' },
];

const departments = [
  'Computer Science & Engineering',
  'Civil Engineering with Computer Application',
  'Electronics & Computer Science',
  'Robotics & Artificial Intelligence',
  'AI & Machine Learning',
  'Information Technology',
  'Mechanical Engineering',
  'Chemical Engineering',
];

const suggestedQuestions = [
  'What CSR activities were conducted this year?',
  'How many volunteer hours have been logged?',
  'Explain NAAC Criterion III requirements',
  'Show beneficiary statistics by department',
];

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'assistant',
      content: 'Hi! 👋 I am the **IIST CSR Activity Tracker Assistant**. Ask me anything about our community service activities, NAAC criteria, volunteer hours, or accreditation reports.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'What CSR activities were conducted this year?':
          'This year, IIST conducted **68 CSR activities** including blood donation drives, tree plantation campaigns, digital literacy workshops in rural areas, health camps, and women empowerment programmes across Indore district.',
        'How many volunteer hours have been logged?':
          'A total of **2,847+ volunteer hours** have been logged this academic year, contributed by **340+ students** and **45 faculty members** across all departments.',
        'Explain NAAC Criterion III requirements':
          'NAAC **Criterion III — Research, Innovations & Extension** evaluates:\n\n• Number of extension/outreach activities conducted\n• Student & faculty participation in community services\n• Collaborations with NGOs and government bodies\n• Beneficiary count and geographic reach\n• Evidence of institutional social responsibility\n\nOur tracker auto-generates SSR-ready reports for this criterion.',
        'Show beneficiary statistics by department':
          '**Beneficiary Statistics by Department:**\n\n• Computer Science: 3,200 beneficiaries\n• Civil Engineering: 2,800 beneficiaries\n• AI & ML: 2,100 beneficiaries\n• Mechanical: 1,900 beneficiaries\n• Chemical: 1,400 beneficiaries\n• Electronics: 1,000 beneficiaries\n\n**Total: 12,400+ beneficiaries reached**',
      };
      const reply =
        responses[msg] ||
        `Great question! Based on IIST's CSR records, I can help you with detailed analytics, NAAC-aligned reports, and activity documentation. For specific data, please log into the dashboard or refine your query.`;
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'assistant', content: reply },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <img src={iistLogos} alt="IIST IIP IIMR Logos" className="h-10 md:h-14 object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#chat" className="hover:text-foreground transition-colors">AI Assistant</a>
            <a href="#faculty" className="hover:text-foreground transition-colors">Faculty</a>
            <a href="#departments" className="hover:text-foreground transition-colors">Departments</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <Link to="/login">
            <Button className="gradient-primary text-primary-foreground hover:opacity-90 text-sm">
              Login <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={iistBanner} alt="IIST Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
              Indore Institute of Science & Technology
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-2">
              CSR Activity Tracker — Document & Report Community Service Activities
            </p>
            <p className="text-primary-foreground/60 text-sm md:text-base max-w-xl mx-auto mb-8">
              For NAAC / NBA Accreditation Evidence • NAAC A+ Accredited
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/login">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Go to Dashboard <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <a href="#chat">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm">
                Ask AI Assistant <ChevronDown size={18} className="ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-card rounded-xl p-5 border border-border shadow-md text-center"
            >
              <stat.icon className="mx-auto text-primary mb-2" size={28} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">About IIST</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Indore Institute of Science & Technology (IIST) is a premier institution affiliated to RGPV Bhopal, 
              approved by AICTE New Delhi, and accredited with <strong className="text-primary">NAAC A+ Grade</strong>. 
              Part of the Sparsh Group & SEWS under the guidance of <strong>Shri Arun S Bhatnagar IRS</strong> (Group Advisor).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The CSR Activity Tracker digitises our entire community service lifecycle — from planning and volunteer 
              registration to real-time impact tracking and automated NAAC/NBA report generation.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">NAAC A+ Accredited</span>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium">RGPV Affiliated</span>
              <span className="px-3 py-1 rounded-full bg-info/10 text-info text-xs font-medium">AICTE Approved</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={iistCampus1} alt="IIST Campus Aerial View" className="rounded-xl object-cover w-full h-40 border border-border" />
            <img src={iistCampus2} alt="IIST Campus Ground" className="rounded-xl object-cover w-full h-40 border border-border" />
            <img src={iistAdvisor} alt="Shri Arun S Bhatnagar IRS, Group Advisor" className="rounded-xl object-cover w-full h-40 border border-border col-span-1" />
            <img src={iistCampus3} alt="IIST Campus Road" className="rounded-xl object-cover w-full h-40 border border-border col-span-1" />
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
                <Sparkles size={14} /> Powered by AI
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">AI Assistant</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Ask questions about CSR activities, NAAC criteria, or get instant analytics
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-lg opacity-50" />
            <div className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col" style={{ height: '520px' }}>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-muted/30">
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                  <Bot size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">IIST CSR Assistant</p>
                  <p className="text-muted-foreground text-xs">Ask about activities, reports & NAAC criteria</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Bot size={14} className="text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        }`}
                      >
                        {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**') ? (
                            <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center mt-0.5">
                          <User size={14} className="text-secondary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center">
                      <Bot size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="px-5 pb-2 flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 py-3 border-t border-border bg-background/80">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isTyping}
                    className="gradient-primary text-primary-foreground rounded-xl h-10 w-10 hover:opacity-90 disabled:opacity-40"
                  >
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Faculty & Leadership</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {faculty.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl p-4 border border-border text-center"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-sm">
                  {f.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <p className="font-semibold text-foreground text-sm truncate">{f.name}</p>
                <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{f.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-8">Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
            >
              <BookOpen size={24} className="text-primary mx-auto mb-3" />
              <p className="font-medium text-foreground text-sm">{dept}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-sidebar text-sidebar-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={iistLogos} alt="IIST Logos" className="h-12 mb-4 object-contain brightness-110" />
              <p className="text-sidebar-foreground/60 text-sm">
                Indore Institute of Science & Technology, Indore (M.P.), India
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sidebar-primary-foreground mb-3">Contact</h3>
              <div className="space-y-2 text-sm text-sidebar-foreground/70">
                <p className="flex items-center gap-2"><Phone size={14} /> Toll Free: 1800 103 3069</p>
                <p className="flex items-center gap-2"><Phone size={14} /> IIST: 8224071000 / 8225071000</p>
                <p className="flex items-center gap-2"><Mail size={14} /> admissions@indoreinstitute.com</p>
                <p className="flex items-center gap-2"><Globe size={14} /> <a href="https://indoreinstitute.com" target="_blank" rel="noopener noreferrer" className="hover:text-sidebar-primary transition-colors">indoreinstitute.com</a></p>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sidebar-primary-foreground mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm text-sidebar-foreground/70">
                <Link to="/login" className="block hover:text-sidebar-primary transition-colors">Login to Tracker</Link>
                <a href="#about" className="block hover:text-sidebar-primary transition-colors">About IIST</a>
                <a href="#chat" className="block hover:text-sidebar-primary transition-colors">AI Assistant</a>
              </div>
            </div>
          </div>
          <div className="border-t border-sidebar-border pt-6 text-center text-xs text-sidebar-foreground/40">
            © 2026 Indore Institute of Science & Technology. CSR Activity Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
