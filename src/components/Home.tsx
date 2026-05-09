import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Star, Clock, Grid, Braces, Shield, Link, Palette, Sparkles, ArrowUpRight } from 'lucide-react';
import { TOOL_METADATA, IOS_SPRING } from '../constants';
import { useAppStore, type ToolId } from '../store/useAppStore';
import { cn } from '../lib/utils';

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pinnedTools, togglePin, setActiveTool, activeCategory, setActiveCategory, setCommandPaletteOpen } = useAppStore();

  const categories = [
    { id: 'all', icon: Grid, label: t('common.categories.explore') },
    { id: 'formatter', icon: Braces, label: t('common.categories.dev') },
    { id: 'crypto', icon: Shield, label: t('common.categories.security') },
    { id: 'network', icon: Link, label: t('common.categories.network') },
    { id: 'time', icon: Clock, label: t('common.categories.temporal') },
    { id: 'design', icon: Palette, label: t('common.categories.visual') },
  ];

  const filteredTools = useMemo(() => {
    return TOOL_METADATA.filter(tool => {
      const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchCategory && tool.id !== 'about';
    });
  }, [activeCategory]);

  const handleToolClick = (id: ToolId) => {
    setActiveTool(id);
    navigate(`/${id}`);
  };

  return (
    <div className="flex-1 p-8 md:p-12 lg:p-20 h-full max-w-[1600px] mx-auto flex flex-col gap-16 overflow-y-auto no-scrollbar pb-40">
      {/* Hero Header */}
      <section className="flex flex-col lg:items-center lg:text-center justify-center gap-8 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="space-y-6 relative z-10 w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={IOS_SPRING}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 shadow-sm"
          >
            <Sparkles size={14} className="text-blue-500" />
            {t('common.badge')}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...IOS_SPRING, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-gray-100"
          >
            Developer<span className="text-blue-600 dark:text-blue-500">Tools</span>.
          </motion.h1>
           <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto leading-relaxed mt-4">
             {t('common.heroDesc')}
           </p>
        </div>
      </section>

      {/* Pinned / Priority Tools */}
      {activeCategory === 'all' && pinnedTools.length > 0 && (
        <section className="space-y-6 -mt-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-2"
          >
             <Star className="text-yellow-500 fill-yellow-500" size={18} />
             <h2 className="text-xl font-semibold tracking-tight">{t('common.essentials')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TOOL_METADATA.filter(t => pinnedTools.includes(t.id)).map((tool, idx) => (
              <FeaturedToolCard key={tool.id} tool={tool} onClick={() => handleToolClick(tool.id)} delay={idx * 0.1} />
            ))}
          </div>
        </section>
      )}

      {/* Discovery Cluster */}
      <div className="space-y-12">
        {/* Category Shelf */}
        {activeCategory === 'all' && (
          <section className="space-y-6 mt-8">
             <div className="flex items-center gap-2 px-2">
                <Grid className="text-blue-500" size={18} />
                <h2 className="text-xl font-semibold tracking-tight">{t('common.tools')}</h2>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.filter(c => c.id !== 'all').map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...IOS_SPRING, delay: idx * 0.05 }}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={cn(
                        "p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer group transition-colors duration-300",
                        activeCategory === cat.id 
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                          : "bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-[#1C1C1E] hover:text-gray-900 dark:hover:text-gray-100 shadow-sm border border-white/40 dark:border-white/5 hover:border-blue-500/20"
                      )}
                   >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                        activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-800 text-current group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500"
                      )}>
                         <cat.icon size={22} strokeWidth={2} />
                      </div>
                      <div className="text-center space-y-1">
                         <h3 className="font-bold text-sm tracking-tight">{cat.label}</h3>
                         <p className={cn("text-[10px] uppercase tracking-widest font-bold opacity-60", activeCategory === cat.id ? "text-white" : "text-gray-400")}>
                           {TOOL_METADATA.filter(t => t.category === cat.id).length} {t('common.tools')}
                         </p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </section>
        )}

        <motion.section 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div className="col-span-full flex items-center justify-between px-2 mb-2">
             <h2 className="text-xl font-semibold tracking-tight">
                {activeCategory === 'all' ? t('common.allAvailable') : categories.find(c => c.id === activeCategory)?.label}
             </h2>
             {activeCategory !== 'all' && (
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="text-xs font-semibold text-blue-500 flex items-center gap-1 hover:underline"
                >
                  <Grid size={12} />
                  {t('common.clear')}
                </button>
             )}
          </div>
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, idx) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => handleToolClick(tool.id)} 
                delay={idx * 0.02} 
                isPinned={pinnedTools.includes(tool.id)}
                onPin={(e) => {
                  e.stopPropagation();
                  togglePin(tool.id);
                  if (pinnedTools.includes(tool.id)) {
                    toast(t('common.unpinned', 'Unpinned from Essentials'));
                  } else {
                    toast.success(t('common.pinned', 'Pinned to Essentials'));
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
}

function FeaturedToolCard({ tool, onClick, delay }: { tool: any, onClick: () => void, delay: number }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...IOS_SPRING, delay }}
      onClick={onClick}
      className="group bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between cursor-pointer border border-white/40 dark:border-white/5 hover:bg-white dark:hover:bg-[#1C1C1E] transition-colors duration-300 relative overflow-hidden"
    >
      <div className={cn("absolute top-0 right-0 p-4 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.05] text-current")}>
         <tool.icon size={100} strokeWidth={1} className="-translate-y-2 translate-x-2" />
      </div>
      
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-sm", tool.color || 'bg-blue-500')}>
         <tool.icon size={24} strokeWidth={2} />
      </div>

      <div className="space-y-1 relative z-10">
         <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">{t(tool.i18nKey)}</h3>
         <p className="text-xs font-semibold uppercase tracking-widest opacity-60 text-gray-600 dark:text-gray-400">{t(`common.categories.${tool.category === 'formatter' ? 'dev' : tool.category === 'time' ? 'temporal' : tool.category === 'color' ? 'visual' : tool.category === 'crypto' ? 'security' : tool.category}`)}</p>
      </div>
    </motion.div>
  );
}

function ToolCard({ tool, onClick, delay, isPinned, onPin }: { tool: any, onClick: () => void, delay: number, isPinned?: boolean, onPin?: (e: any) => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ...IOS_SPRING, delay: delay }}
      onClick={onClick}
      className="group relative bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md rounded-2xl p-5 flex items-start gap-5 cursor-pointer border border-white/40 dark:border-white/5 hover:bg-white dark:hover:bg-[#1C1C1E] transition-colors duration-300 overflow-hidden"
    >
      <ArrowUpRight className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={18} />

      {onPin && (
        <button 
          onClick={onPin}
          className={cn(
            "absolute bottom-4 right-4 p-1.5 rounded-md transition-all z-20",
            isPinned ? "text-yellow-500 opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Star size={16} fill={isPinned ? "currentColor" : "none"} strokeWidth={isPinned ? 0 : 2} />
        </button>
      )}

      <div className={cn("w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-white shadow-sm", tool.color || 'bg-blue-500')}>
        <tool.icon size={22} strokeWidth={2} />
      </div>
        
      <div className="flex-1 mt-0.5 pr-6">
        <h3 className="font-bold text-sm tracking-tight text-gray-900 dark:text-gray-100 mb-1">{t(tool.i18nKey)}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{tool.shortDesc || t('timeParams.sysTimeDesc')}</p>
      </div>
    </motion.div>
  );
}
