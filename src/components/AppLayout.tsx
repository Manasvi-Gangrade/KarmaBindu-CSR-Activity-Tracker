import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CalendarPlus, Users, FileText, Settings, LogOut,
  ChevronLeft, ChevronRight, Leaf, Menu, X, Award, ClipboardList, ScrollText, MapPin
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['admin', 'naac_coordinator', 'faculty', 'student'] },
  { label: 'Activities', path: '/activities', icon: <ClipboardList size={20} />, roles: ['admin', 'naac_coordinator', 'faculty', 'student'] },
  { label: 'Create Activity', path: '/activities/create', icon: <CalendarPlus size={20} />, roles: ['admin', 'naac_coordinator', 'faculty'] },
  { label: 'Volunteers', path: '/volunteers', icon: <Users size={20} />, roles: ['admin', 'naac_coordinator', 'faculty'] },
  { label: 'Reports', path: '/reports', icon: <FileText size={20} />, roles: ['admin', 'naac_coordinator'] },
  { label: 'Approvals', path: '/approvals', icon: <Award size={20} />, roles: ['admin', 'naac_coordinator'] },
  { label: 'Certificates', path: '/certificates', icon: <ScrollText size={20} />, roles: ['admin', 'naac_coordinator', 'faculty'] },
  { label: 'Impact Map', path: '/heat-map', icon: <MapPin size={20} />, roles: ['admin', 'naac_coordinator', 'faculty', 'student'] },
  { label: 'Settings', path: '/settings', icon: <Settings size={20} />, roles: ['admin', 'naac_coordinator', 'faculty', 'student'] },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-50 h-full flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300
        ${collapsed ? 'w-[72px]' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Leaf size={20} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <h1 className="font-display font-bold text-sm text-sidebar-primary-foreground leading-tight">IIST CSR</h1>
              <p className="text-[10px] text-sidebar-foreground/60">Activity Tracker</p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {filteredNav.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path} to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${active ? 'bg-sidebar-accent text-sidebar-primary' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}
                `}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-3 space-y-2 shrink-0">
          {!collapsed && user && (
            <div className="px-2 mb-2">
              <p className="text-sm font-semibold text-sidebar-primary-foreground truncate">{user.name}</p>
              <p className="text-[11px] text-sidebar-foreground/50">{roleBadge[user.role]}</p>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <h2 className="font-display font-semibold text-lg capitalize">
              {location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
