import React, { useState, useEffect } from 'react';
import { Shield, Lock, Zap, Database, Globe, Coffee, Heart, ExternalLink, FileText, Cpu, Activity, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export function About() {
 const { t } = useTranslation();
 const navigate = useNavigate();
 const [telemetry, setTelemetry] = useState<any>(null);

 useEffect(() => {
 const updateTelemetry = () => {
 setTelemetry({
 memory: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : 'N/A',
 cores: navigator.hardwareConcurrency || 'N/A',
 ua: navigator.userAgent,
 lang: navigator.language,
 timestamp: new Date().toISOString()
 });
 };
 updateTelemetry();
 const interval = setInterval(updateTelemetry, 5000);
 return () => clearInterval(interval);
 }, []);

 const features = [
 {
 icon: Lock,
 title: t('about.feature1'),
 desc: t('about.feature1Desc')
 },
 {
 icon: Zap,
 title: t('about.feature2'),
 desc: t('about.feature2Desc')
 },
 {
 icon: Database,
 title: t('about.feature3'),
 desc: t('about.feature3Desc')
 },
 {
 icon: Globe,
 title: t('about.feature4'),
 desc: t('about.feature4Desc')
 }
 ];

 return (
 <div className="flex-1 p-12 h-screen overflow-y-auto flex flex-col items-center">
 <div className="max-w-3xl w-full space-y-16 pb-20 relative">
 <button 
 onClick={() => navigate(-1)}
 className="absolute -top-4 -left-4 sm:top-0 sm:-left-12 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
 >
 <ChevronLeft size={24} />
 </button>
 <section className="text-center space-y-6">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ios-border-light dark:bg-ios-border-dark text-[10px] font-bold tracking-widest uppercase">
 <Shield size={14} className="text-blue-500" /> {t('about.subtitle')}
 </div>
 <h1 className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white leading-tight">
 {t('about.title')}
 </h1>
 <p className="text-base text-ios-muted-light dark:text-ios-muted-dark max-w-xl mx-auto leading-relaxed">
 {t('about.feature1Desc')} {t('about.feature2Desc')}
 </p>
 </section>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
 {features.map((f, i) => (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: i * 0.1 }}
 key={i}
 className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-blue-500/30 group"
 >
 <div className="w-10 h-10 shrink-0 rounded-lg bg-ios-bg-light dark:bg-[#2C2C2E] flex items-center justify-center border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <f.icon className="w-5 h-5 text-blue-500" />
 </div>
 <div>
 <h3 className="font-semibold text-sm dark:text-white">{f.title}</h3>
 <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
 </div>
 </motion.div>
 ))}
 </div>
 
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 className="glass-card rounded-xl p-6 space-y-6 flex flex-col justify-between overflow-hidden relative"
 >
 <div className="absolute top-0 right-0 p-4 opacity-5">
 <Activity size={100} />
 </div>
 <h3 className="text-xs font-semibold uppercase text-blue-500">Engine Diagnostics</h3>
 <div className="space-y-4 relative z-10">
 <div className="space-y-1">
 <p className="text-[10px] font-semibold text-gray-500 uppercase">Memory Heap</p>
 <p className="text-xl font-mono">{telemetry?.memory} <span className="text-[10px] opacity-40">MB</span></p>
 </div>
 <div className="space-y-1">
 <p className="text-[10px] font-semibold text-gray-500 uppercase">Logical Processors</p>
 <p className="text-xl font-mono">{telemetry?.cores}</p>
 </div>
 <div className="space-y-1 pt-4 border-t border-ios-border-light dark:border-ios-border-dark">
 <p className="text-[10px] font-semibold text-gray-500 uppercase">Browser Profile</p>
 <p className="text-xs font-mono break-all opacity-60 leading-tight">{telemetry?.ua?.slice(0, 40)}...</p>
 </div>
 </div>
 </motion.div>
 </div>

 <section className="glass-card rounded-xl p-8 bg-ios-bg-light dark:bg-[#2C2C2E] space-y-6">
 <h2 className="text-xl font-semibold flex items-center gap-3 dark:text-white">
 <Coffee className="text-blue-500" size={24} /> Why Web-Native?
 </h2>
 <div className="space-y-4 text-sm leading-relaxed text-gray-500">
 <p>
 When you paste a JWT or JSON containing credentials into a random online tool, you're exposing sensitive data to third-party servers.
 </p>
 <p>
 This suite executes everything locally using Web APIs—ensuring zero data leakage and real-time performance.
 </p>
 </div>
 
 <div className="pt-6 flex items-center justify-between border-t border-ios-border-light dark:border-ios-border-dark">
 <div className="px-3 py-1 bg-white dark:bg-black border border-ios-border-light dark:border-ios-border-dark rounded-md text-[10px] font-bold text-gray-500 uppercase shadow-sm">v2.0.0 STABLE</div>
 <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
 Engineered with <Heart size={14} className="text-red-500 fill-red-500" /> {t('common.offline', 'offline')}.
 </div>
 </div>
 </section>

 <footer className="w-full flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-ios-border-light dark:border-ios-border-dark">
 <Link to="/privacy" className="text-[10px] font-black uppercase text-gray-500 hover:text-blue-500 transition-all flex items-center gap-1.5">
 <Shield size={12} /> Privacy Policy
 </Link>
 <Link to="/terms" className="text-[10px] font-black uppercase text-gray-500 hover:text-blue-500 transition-all flex items-center gap-1.5">
 <FileText size={12} /> Terms of Service
 </Link>
 <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase text-gray-500 hover:text-blue-500 transition-all flex items-center gap-1.5">
 <ExternalLink size={12} /> Open Source
 </a>
 </footer>
 </div>
 </div>
 );
}

