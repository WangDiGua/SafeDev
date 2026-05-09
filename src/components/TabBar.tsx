import React from 'react';
import { 
 Braces, Shield, Link, Clock, Palette, Grid, Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { useAppStore, type ToolId } from '../store/useAppStore';
import { IOS_SPRING } from '../constants';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TabBarProps {
 activeTool: ToolId;
 setActiveTool: (id: ToolId) => void;
}

export function TabBar({ activeTool, setActiveTool }: TabBarProps) {
 const { t } = useTranslation();
 const navigate = useNavigate();
 const location = useLocation();
 const { activeCategory, setActiveCategory } = useAppStore();

 const mainTabs = [
 { id: 'home', icon: Grid, label: t('common.categories.explore'), path: '/home' },
 { id: 'security', icon: Shield, label: t('common.categories.security'), path: '/home?cat=crypto' },
 { id: 'dev', icon: Braces, label: t('common.categories.dev'), path: '/home?cat=formatter' },
 { id: 'about', icon: Info, label: t('common.about'), path: '/about' },
 ];

 const handleTabClick = (id: string, path: string) => {
 if (id === 'security') setActiveCategory('crypto');
 else if (id === 'dev') setActiveCategory('formatter');
 else if (id === 'home') setActiveCategory('all');
 
 document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate(path);
 };

 return (
 <nav className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-[#2C2C2E] rounded-lg overflow-x-auto no-scrollbar max-w-full">
 {mainTabs.map((tab) => {
 const Icon = tab.icon;
 const isActive = (tab.id === 'home' && location.pathname === '/home' && activeCategory === 'all') ||
 (tab.id === 'security' && activeCategory === 'crypto' && location.pathname === '/home') ||
 (tab.id === 'dev' && activeCategory === 'formatter' && location.pathname === '/home') ||
 (tab.id === 'about' && location.pathname === '/about');
 
 return (
 <motion.button
 key={tab.id}
 whileTap={{ scale: 0.95 }}
 onClick={() => handleTabClick(tab.id, tab.path)}
 className={cn(
 "relative flex items-center gap-2 px-4 py-1.5 rounded-md transition-all duration-300 whitespace-nowrap group font-medium text-sm",
 isActive 
 ? "bg-white dark:bg-[#636366] text-ios-text-light dark:text-ios-text-dark shadow-sm" 
 : "text-ios-muted-light dark:text-ios-muted-dark hover:text-black dark:hover:text-white"
 )}
 >
 <Icon size={14} strokeWidth={isActive ? 2.5 : 2} className={cn("transition-transform group-hover:scale-[1.02]", isActive && "text-ios-text-light dark:text-ios-text-dark")} />
 <span className="text-[11px] font-semibold tracking-wide">
 {tab.label}
 </span>
 </motion.button>
 );
 })}
 
 {!['/home', '/', '/about'].includes(location.pathname) && (
 <div className="flex items-center gap-1 ml-2 pl-2 border-l border-ios-border-light dark:border-ios-border-dark">
 <motion.button
 whileTap={{ scale: 0.95 }}
 onClick={() => navigate(location.pathname)}
 className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-ios-blue text-white shadow-sm transition-all"
 >
 <span className="text-[11px] font-semibold tracking-wide">{t('common.tools')}</span>
 </motion.button>
 </div>
 )}
 </nav>
 );
}
