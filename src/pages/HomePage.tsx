import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Award, BookOpen, MapPin, Phone, Mail, Globe, ChevronDown, Send, Bot, User, Sparkles, MessageSquare, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import iistLogos from '@/assets/iist-logos.png';
import iistBanner from '@/assets/iist-campus-banner.png';
import iistAdvisor from '@/assets/iist-advisor.png';
import iistCampus1 from '@/assets/iist-campus-1.png';
import iistCampus2 from '@/assets/iist-campus-2.png';
import iistCampus3 from '@/assets/iist-campus-3.png';
import { useTTS, GoogleTranslateWidget } from '@/components/AIAccessibility';

import img1 from '@/assets/img1.jpg';
import img2 from '@/assets/img2.jpg';
import img3 from '@/assets/img3.jpg';
import img4 from '@/assets/img4.jpg';
import img5 from '@/assets/img5.jpg';
import img6 from '@/assets/img6.jpg';
import img7 from '@/assets/img7.jpg';
import AIAgents from './AIAgents';

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
  const [showChatbot, setShowChatbot] = useState(false);
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

  const { ttsEnabled, setTtsEnabled } = useTTS();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap lg:grid lg:grid-cols-3 items-center justify-between px-4 py-3 gap-y-3 min-h-[60px]">
          {/* Logo - Left */}
          <div className="flex justify-start z-10 w-full lg:w-auto">
            <img src={iistLogos} alt="IIST IIP IIMR Logos" className="h-10 md:h-12 object-contain" />
          </div>
          
          {/* Live Time & Weather - Center */}
          <div className="hidden lg:flex justify-center flex-row flex-wrap items-center gap-2 md:gap-3 text-sm font-semibold">
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/20 text-accent-foreground rounded-full shadow-sm whitespace-nowrap">
              <span className="text-sm leading-none">☀️</span> <span>28°C Indore</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full shadow-sm font-mono tracking-wide whitespace-nowrap">
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Accessibility & Translation - Right */}
          <div className="flex justify-end items-center w-full lg:w-auto gap-3 z-10">
            <button 
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm border transition-colors ${ttsEnabled ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border text-muted-foreground'}`}
              title="Toggle Hover-to-Speak"
            >
              {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">{ttsEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>
            <div className="bg-muted/50 rounded-full px-2 py-1 shadow-sm border border-border">
              <GoogleTranslateWidget />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>


            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4 tracking-tight">
              Indore Institute of Science & Technology
            </h1>
            <p className="text-foreground/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-3">
              AI-Powered CSR Activity Tracker
            </p>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8">
              Smart Documentation, Analytics & Reporting Agent for NAAC/NBA Compliance
            </p>
          </motion.div>
          {/* Moving Image Gallery (NSS Activities Placeholder) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative w-full max-w-7xl mx-auto mt-12 overflow-hidden h-36 md:h-48">
            <div className="flex animate-marquee gap-3 md:gap-4 absolute left-0 pr-4" style={{ width: 'max-content' }}>
               {[img1, img2, img3, img4, img5, img6, img7, img1, img2, img3, img4, img5].map((imgSrc, i) => (
                 <div key={i} className="w-56 md:w-72 h-36 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-border/50 shadow-sm relative group">
                   <img src={imgSrc} alt="Activity Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                 </div>
               ))}
            </div>
            {/* Smooth Edge Masks */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-16 relative z-10">
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
            <img src={iistCampus1} alt="IIST Campus Aerial View" className="rounded-xl object-cover w-full h-40 border border-border shadow-sm" />
            <img src={iistCampus2} alt="IIST Campus Ground" className="rounded-xl object-cover w-full h-40 border border-border shadow-sm" />
            <img src={iistAdvisor} alt="Shri Arun S Bhatnagar IRS, Group Advisor" className="rounded-xl object-cover w-full h-40 border border-border shadow-sm col-span-1" />
            <img src={iistCampus3} alt="IIST Campus Road" className="rounded-xl object-cover w-full h-40 border border-border shadow-sm col-span-1" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 pb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-card rounded-xl p-5 border border-border shadow-md text-center"
            >
              <stat.icon className="mx-auto text-primary mb-2" size={28} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Quick Login Portals */}
      <section className="max-w-7xl mx-auto px-4 pb-16 relative z-10 cursor-pointer">
        <motion.div 
           initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
           className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { role: 'Admin', desc: 'Manage CSR System', icon: Users, theme: 'bg-primary text-primary-foreground border-primary shadow-primary/20' },
            { role: 'NAAC Coordinator', desc: 'Automated Reports', icon: Award, theme: 'bg-[#FFB800] text-[#4A3400] border-[#FFB800] shadow-[#FFB800]/20' },
            { role: 'Faculty', desc: 'Approve Volunteer Hours', icon: BookOpen, theme: 'bg-primary text-primary-foreground border-primary shadow-primary/20' },
            { role: 'Student', desc: 'Log CSR Activities', icon: User, theme: 'bg-[#FFB800] text-[#4A3400] border-[#FFB800] shadow-[#FFB800]/20' },
          ].map((tab, i) => (
            <div key={i} className="group block text-left" onClick={() => window.location.href = '/login'}>
              <div className={`${tab.theme} rounded-2xl p-6 border-2 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 h-full w-full`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/20 text-inherit backdrop-blur-sm shadow-sm">
                    <tab.icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display font-bold text-[17px] tracking-tight">
                    {tab.role}
                  </h3>
                </div>
                <p className="text-[14px] font-semibold opacity-90 leading-snug group-hover:opacity-100 transition-opacity">
                  {tab.desc} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold ml-1">&rarr;</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>


      {/* Embedded AI Control Center (Moved from Hero) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="text-center mb-10 md:px-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold uppercase tracking-wider mb-4 border border-accent/30 shadow-sm">
              Our Core Architecture
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Meet the Autonomous AI Ensemble
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              These 7 specialized AI Agents work continuously in the background to ensure 100% NAAC/NBA compliance without any manual faculty overhead.
            </p>
          </div>
          <div className="bg-transparent md:p-2 border-transparent">
            <AIAgents />
          </div>
        </motion.div>
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

      {/* Floating Help Chatbot */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {showChatbot && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-80 sm:w-[380px] h-[500px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background pointer-events-none" />
              
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/80 backdrop-blur-sm relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-inner">
                    <Bot size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm leading-tight text-foreground">IIST System Support</h3>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowChatbot(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10 scrollbar-hide">
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
                        <div className="w-6 h-6 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Bot size={12} className="text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md shadow-sm'
                            : 'bg-muted text-foreground rounded-bl-md shadow-sm border border-border/50'
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
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-full gradient-primary flex-shrink-0 flex items-center justify-center">
                      <Bot size={12} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                      <span className="w-1h h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2 relative z-10">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-3 py-3 border-t border-border bg-background/80 relative z-10">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted rounded-xl px-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isTyping}
                    className="gradient-primary text-primary-foreground rounded-xl h-9 w-9 hover:opacity-90 disabled:opacity-40"
                  >
                    <Send size={14} />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setShowChatbot(!showChatbot)} className="w-[52px] h-[52px] rounded-full gradient-primary text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all outline-none">
          {showChatbot ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

    </div>
  );
};

export default HomePage;
