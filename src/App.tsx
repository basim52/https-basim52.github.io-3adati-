/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Droplets, 
  BookOpen, 
  Dumbbell, 
  Check, 
  Plus, 
  Home, 
  CheckSquare, 
  Users, 
  User,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateMotivationalMessage } from './services/aiService';

interface Habit {
  id: string;
  name: string;
  goal: string;
  progress: string;
  completed: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function App() {
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(2400);
  const [aiMessage, setAiMessage] = useState("Loading your daily motivation...");
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: '1', 
      name: 'Drink Water', 
      goal: '3L', 
      progress: '2.5L done', 
      completed: false, 
      icon: <Droplets className="w-6 h-6" />,
      color: 'primary'
    },
    { 
      id: '2', 
      name: 'Read', 
      goal: '20m', 
      progress: 'Completed • 20m', 
      completed: true, 
      icon: <BookOpen className="w-6 h-6" />,
      color: 'secondary'
    },
    { 
      id: '3', 
      name: 'Work out', 
      goal: '45m', 
      progress: 'High Intensity • 45m', 
      completed: false, 
      icon: <Dumbbell className="w-6 h-6" />,
      color: 'tertiary'
    },
  ]);

  useEffect(() => {
    const fetchAiMessage = async () => {
      const msg = await generateMotivationalMessage(streak);
      setAiMessage(msg);
    };
    fetchAiMessage();
  }, [streak]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-surface/60 backdrop-blur-lg border-b border-white/10 shadow-[0_0_40px_0_rgba(223,142,255,0.1)]">
        <div className="max-w-lg mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/30 p-0.5 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/avatar/100/100" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-xl font-headline font-black bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent tracking-tighter">
              3adati
            </h1>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-surface-container-high px-4 py-1.5 rounded-full border border-white/5 text-primary font-headline font-bold flex items-center gap-2"
          >
            <Flame className="w-4 h-4 fill-primary" />
            {streak}
          </motion.div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-8">
        {/* Hero Section */}
        <section className="relative h-80 rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-highest to-surface opacity-60"></div>
          
          {/* 3D-like Visual Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary blur-[80px] opacity-20"></div>
              <img 
                src="https://picsum.photos/seed/growth/400/400" 
                alt="Evolution" 
                className="w-64 h-64 object-contain relative z-10 drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* AI Speech Bubble */}
          <div className="absolute bottom-6 left-4 right-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-4 flex gap-4 items-start border-l-4 border-l-secondary shadow-lg"
            >
              <Sparkles className="w-6 h-6 text-secondary shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium leading-relaxed">
                  "{aiMessage}"
                </p>
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary mt-1 block">
                  Farfasha AI • Just Now
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 flex flex-col justify-between h-40"
          >
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Current Streak</span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-headline font-bold text-primary">{streak}</span>
              <span className="text-lg font-headline text-primary/70">DAYS</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                className="h-full bg-gradient-to-r from-primary to-primary-container"
              />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 flex flex-col justify-between h-40 relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">XP Gained</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-headline font-bold text-secondary">{(xp / 1000).toFixed(1)}k</span>
            </div>
            <button className="flex items-center gap-2 text-xs font-label text-secondary hover:underline group">
              View Leaderboard 
              <TrendingUp className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Today's Protocol */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-headline font-bold tracking-tight">Today's Protocol</h2>
            <span className="text-xs font-label text-on-surface-variant">{completedCount} of {habits.length} Completed</span>
          </div>
          
          <div className="space-y-4">
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                layout
                onClick={() => toggleHabit(habit.id)}
                className={`glass-card rounded-3xl p-5 flex items-center justify-between cursor-pointer transition-all border border-transparent hover:border-primary/20 ${
                  habit.completed ? 'bg-secondary/5 border-secondary/20' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    habit.completed ? 'bg-secondary/20 text-secondary' : `bg-${habit.color}/10 text-${habit.color}`
                  }`}>
                    {habit.icon}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold">{habit.name}</h3>
                    <p className={`text-xs ${habit.completed ? 'text-secondary/80' : 'text-on-surface-variant'}`}>
                      {habit.progress}
                    </p>
                  </div>
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  habit.completed 
                    ? 'bg-secondary shadow-[0_0_15px_rgba(46,253,124,0.4)]' 
                    : 'border-2 border-white/10'
                }`}>
                  {habit.completed && <Check className="w-6 h-6 text-surface font-bold" />}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Consistency Map */}
        <section className="glass-card rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-lg">Consistency Map</h3>
            <div className="flex gap-1">
              {[0.2, 0.4, 0.7, 1].map((op) => (
                <div key={op} className="w-2 h-2 rounded-sm bg-secondary" style={{ opacity: op }}></div>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto no-scrollbar">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
              {Array.from({ length: 140 }).map((_, i) => {
                const levels = [0.05, 0.1, 0.3, 0.6, 1];
                const level = levels[Math.floor(Math.random() * levels.length)];
                return (
                  <div 
                    key={i} 
                    className="w-3 h-3 rounded-sm bg-secondary" 
                    style={{ opacity: level }}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-between mt-4 text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
            <span>September</span>
            <span>October</span>
            <span>November</span>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/80 backdrop-blur-2xl rounded-t-[2.5rem] border-t border-white/5 shadow-[0_-10px_40px_rgba(12,12,31,0.8)]">
        <NavItem icon={<Home className="w-6 h-6" />} active />
        <NavItem icon={<CheckSquare className="w-6 h-6" />} />
        
        {/* FAB */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 -mt-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(223,142,255,0.4)] text-on-primary"
        >
          <Plus className="w-8 h-8 stroke-[3px]" />
        </motion.button>

        <NavItem icon={<Users className="w-6 h-6" />} />
        <NavItem icon={<User className="w-6 h-6" />} />
      </nav>

      {/* Background Glows */}
      <div className="fixed top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      className={`p-3 rounded-full transition-all ${
        active 
          ? 'bg-primary/10 text-primary shadow-[0_0_15px_rgba(223,142,255,0.3)]' 
          : 'text-on-surface-variant hover:text-primary hover:bg-white/5'
      }`}
    >
      {icon}
    </motion.button>
  );
}
