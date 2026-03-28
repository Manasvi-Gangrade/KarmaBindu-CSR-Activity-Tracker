import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import img1 from '@/assets/img1.jpg';
import img2 from '@/assets/img2.jpg';
import img3 from '@/assets/img3.jpg';
import img4 from '@/assets/img4.jpg';
import iistBanner from '@/assets/iist-campus-banner.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  const getDynamicImage = () => {
    if (email.includes('admin')) return img1;
    if (email.includes('faculty')) return img2;
    if (email.includes('student')) return img3;
    if (email.includes('naac')) return img4;
    return iistBanner;
  };

  const getRoleTitle = () => {
    if (email.includes('admin')) return 'Administrator Portal';
    if (email.includes('faculty')) return 'Faculty Portal';
    if (email.includes('student')) return 'Student Portal';
    if (email.includes('naac')) return 'NAAC Coordinator Portal';
    return 'Command Center';
  };

  return (
    <div className="min-h-screen flex selection:bg-primary/20">
      {/* Left panel — dynamic branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-black items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={getDynamicImage()}
            src={getDynamicImage()} 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Dynamic Role Avatar" 
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-md p-8"
        >
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-3xl font-[900] tracking-[0.2em] text-primary uppercase mb-6 block drop-shadow-md"
          >
            Indore Institute of Science and Technology
          </motion.p>
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 shadow-glow border border-white/20">
            <Leaf size={40} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2">{getRoleTitle()}</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Secure access to **IIST KarmaBindu (कर्मबिंदु)**. The focal point for autonomous social responsibility & impact tracking.
          </p>
        </motion.div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Leaf size={22} className="text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Karma</span>
              <span className="text-foreground">Bindu</span>
            </h1>
          </div>
          <p className="text-[14px] font-[1000] text-foreground uppercase tracking-[0.1em] mb-8 text-center border-b-2 border-primary/20 pb-3">Indore Institute of Science and Technology</p>

          <h2 className="font-display text-3xl font-extrabold mb-2 text-foreground">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-8 font-medium">Continue logging in to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Role identifier</Label>
              <Input 
                id="email" type="text" 
                placeholder="e.g., student@demo.com" 
                value={email} onChange={e => setEmail(e.target.value)} 
                required 
                className="h-12 bg-muted/30 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} 
                  required 
                  className="h-12 bg-muted/30 focus-visible:ring-primary/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm font-medium p-3 bg-destructive/10 rounded-lg">
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all" size="lg" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In Securely'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
