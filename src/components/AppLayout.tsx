import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CalendarPlus, Users, FileText, Settings, LogOut,
  Leaf, Award, ClipboardList, ScrollText, MapPin, Bot
} from 'lucide-react';
import { GoogleTranslateWidget } from './AIAccessibility';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} />, roles: ['admin', 'naac_coordinator', 'faculty', 'student'] },
  { label: 'Activities', path: '/activities', icon: <ClipboardList size={18} />, roles: ['admin', 'faculty', 'student'] },
  { label: 'Create Activity', path: '/activities/create', icon: <CalendarPlus size={18} />, roles: ['admin', 'faculty'] },
  { label: 'Volunteers', path: '/volunteers', icon: <Users size={18} />, roles: ['admin', 'faculty'] },
  { label: 'Reports', path: '/reports', icon: <FileText size={18} />, roles: ['admin', 'naac_coordinator'] },
  { label: 'Approvals', path: '/approvals', icon: <Award size={18} />, roles: ['admin', 'naac_coordinator'] },
  { label: 'Certificates', path: '/certificates', icon: <ScrollText size={18} />, roles: ['admin', 'faculty', 'student'] },
  { label: 'Impact Map', path: '/heat-map', icon: <MapPin size={18} />, roles: ['admin'] },
  { label: 'AI Agents', path: '/ai-agents', icon: <Bot size={18} className="text-yellow-300" />, roles: ['admin', 'naac_coordinator'] },
  { label: 'Settings', path: '/settings', icon: <Settings size={18} />, roles: ['admin'] },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNav = navItems.filter(item => user && item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadge: Record<UserRole, string> = {
    admin: 'Administrator',
    naac_coordinator: 'NAAC Coordinator',
    faculty: 'Faculty',
    student: 'Student',
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card shrink-0 z-50 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-sm">
            <Leaf size={22} className="text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-extrabold text-base text-foreground leading-tight tracking-tight">IIST CSR</h1>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Command Center</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Inject Translate inside Dashboard too for global accessibility */}
          <div className="hidden md:block bg-muted/40 rounded-full px-2 py-0.5 border border-border">
             <GoogleTranslateWidget />
          </div>

          <div className="h-8 w-px bg-border hidden sm:block"></div>

          {user && (
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
              <p className="text-[11px] font-semibold text-primary">{roleBadge[user.role]}</p>
            </div>
          )}
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-md border-2 border-background ring-2 ring-primary/20">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors" title="Logout">
             <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Horizontal Scrollable Tabs */}
      <nav className="bg-card border-b border-border shrink-0 z-40 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2.5 gap-2 items-center">
          {filteredNav.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path} to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shrink-0 border
                  ${active 
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]' 
                    : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border/50'}
                `}
              >
                <div className={`${active ? 'opacity-100' : 'opacity-70'}`}>
                   {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Fading edge indicators for mobile scrolling */}
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none md:hidden" />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-muted/10 relative">
        <div className="max-w-7xl mx-auto h-full pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
