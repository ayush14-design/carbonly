import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields.");
    
    // Trigger Mock Login
    login(email, isLogin ? email.split('@')[0] : name || 'User');
    
    // Redirect to Calculator/Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 relative z-10 pt-20">
      
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 md:p-10 rounded-[32px] border border-white/20">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center mb-4">
              <Globe className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/60 text-sm text-center">
              {isLogin 
                ? 'Sign in to access your dashboard and daily logs.' 
                : 'Join Carbonly to start tracking and reducing your impact.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative overflow-hidden"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass bg-white/5 py-4 pl-12 pr-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                <Mail size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass bg-white/5 py-4 pl-12 pr-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass bg-white/5 py-4 pl-12 pr-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full glass py-4 rounded-2xl font-semibold text-white mt-2 flex justify-center items-center gap-2 hover:bg-white/20 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
            </button>

          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
