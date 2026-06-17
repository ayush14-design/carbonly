import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function NavigationBar({ onStartOnboarding }: { onStartOnboarding: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '#' },
    { name: 'Log Activity', href: '#' },
    { name: 'Leaderboard', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Help', href: '#' },
  ];

  return (
    <>
      <nav className="max-w-[1280px] mx-auto relative z-10 flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 font-heading font-bold text-xl text-text">
          <svg viewBox="0 0 256 256" width="32" height="32" fill="var(--color-text)">
            <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" />
          </svg>
          Carbonly
        </div>

        {/* Desktop Core Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="transition-opacity hover:opacity-70 text-text">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Action Segment */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => alert("Sign In functionality is coming soon!")}
            className="bg-surface text-text text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={onStartOnboarding}
            className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md active:scale-95 transition-transform"
          >
            Start For Free
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="md:hidden text-text" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Slide-In Overlay Engine */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0f172a66] backdrop-blur-[6px] z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 w-[min(88vw,360px)] h-[100dvh] bg-white shadow-[-12px_0_48px_rgba(15,23,42,0.08)] flex flex-col"
            >
              {/* Header Wrapper */}
              <div className="flex justify-between items-center px-6 py-5">
                <div className="flex items-center gap-2 font-heading font-bold text-xl text-text">
                  <svg viewBox="0 0 256 256" width="28" height="28" fill="var(--color-text)">
                    <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" />
                  </svg>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0f172a0d]"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} className="text-text" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-[1px] bg-border" />

              {/* Link Array Stack */}
              <div className="flex flex-col gap-2 px-4 py-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4 }}
                    className="text-[1.1rem] font-medium text-text px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* CTA Block */}
              <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
                <button 
                  onClick={() => { setIsOpen(false); onStartOnboarding(); }}
                  className="w-full bg-accent text-white py-3.5 rounded-full text-[0.95rem] font-semibold active:scale-95 transition-transform"
                >
                  Start For Free
                </button>
                <button 
                  onClick={() => alert("Sign In functionality is coming soon!")}
                  className="w-full bg-surface text-text py-3.5 rounded-full text-[0.95rem] font-semibold hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
