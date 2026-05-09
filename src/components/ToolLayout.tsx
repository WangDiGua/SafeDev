import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { IOS_SPRING } from '../constants';
import { useAppStore } from '../store/useAppStore';

interface ToolLayoutProps {
 toolId: string;
 title: string;
 shortDesc: string;
 wikiContent: string | { en: string, zh: string };
 children: React.ReactNode;
}

export function ToolLayout({ toolId, title, shortDesc, wikiContent, children }: ToolLayoutProps) {
 const { t } = useTranslation();
 const navigate = useNavigate();
 const lang = useAppStore(s => s.language);

 const actualWiki = typeof wikiContent === 'string' ? wikiContent : (lang === 'zh' ? wikiContent.zh : wikiContent.en);

 // AdSense Initialization
 useEffect(() => {
 try {
 // @ts-ignore
 (window.adsbygoogle = window.adsbygoogle || []).push({});
 } catch (e) {
 console.warn("AdSense placeholder ready but not yet configured or blocked.");
 }
 }, [toolId]);

 return (
 <div className="w-full">
 <Helmet>
 <title>{`${title} - SafeDev Pro Tools`}</title>
 <meta name="description" content={shortDesc} />
 <meta name="keywords" content={`${toolId}, developer tools, privacy, local-first, ${title.toLowerCase()}`} />
 
 {/* JSON-LD Structured Data */}
 <script type="application/ld+json">
 {JSON.stringify({
 "@context": "https://schema.org",
 "@type": "WebApplication",
 "name": title,
 "description": shortDesc,
 "applicationCategory": "DeveloperTool",
 "operatingSystem": "Web",
 "offers": {
 "@type": "Offer",
 "price": "0",
 "priceCurrency": "USD"
 }
 })}
 </script>
 </Helmet>

 <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
 {/* Region 1: Clean Core Workspace (Above the fold) */}
 <motion.section 
 initial={{ opacity: 0, scale: 0.98, y: 10 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 transition={IOS_SPRING}
 className="bg-white dark:bg-[#1C1C1E] rounded-xl border border-transparent shadow-sm min-h-[500px] mt-6"
 >
 <div className="p-6 sm:p-8">
 <div className="mb-8 flex items-center justify-between border-b border-ios-border-light dark:border-ios-border-dark pb-6">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <button 
 onClick={() => navigate('/home')}
 className="w-8 h-8 flex items-center justify-center rounded-lg bg-ios-bg-light dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] transition-colors text-ios-text-light dark:text-ios-text-dark"
 >
 <ChevronLeft size={16} />
 </button>
 <h2 className="text-2xl font-bold tracking-tight text-ios-text-light dark:text-ios-text-dark">
 {title}
 </h2>
 </div>
 <p className="text-sm font-medium text-ios-muted-light dark:text-ios-muted-dark pl-11">
 {shortDesc}
 </p>
 </div>
 </div>
 
 <div className="space-y-6">
 {children}
 </div>
 </div>
 </motion.section>

 {/* Region 2: SEO Wiki / Content Area */}
 <article className="max-w-4xl mx-auto space-y-8 pb-12">
 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 py-6 border-y border-ios-border-light dark:border-ios-border-dark">
 <div className="flex items-center gap-2 px-4 py-2 bg-ios-bg-light dark:bg-[#2C2C2E] rounded-lg text-ios-green border border-ios-border-light dark:border-ios-border-dark">
 <ShieldCheck size={16} />
 <span className="text-xs font-semibold">{t('common.localProcessing', '100% Local Processing')}</span>
 </div>
 <div className="flex items-center gap-2 px-4 py-2 bg-ios-bg-light dark:bg-[#2C2C2E] rounded-lg text-ios-blue border border-ios-border-light dark:border-ios-border-dark">
 <Info size={16} />
 <span className="text-xs font-semibold">{t('common.safe', 'Safe & Reliable')}</span>
 </div>
 </div>

 <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-500 prose-pre:bg-gray-50 dark:prose-pre:bg-[#111] prose-pre:border prose-pre:border-ios-border-light dark:prose-pre:border-gray-800">
 <div className="markdown-body">
 <ReactMarkdown>{actualWiki}</ReactMarkdown>
 </div>
 </div>
 </article>
 </main>
 </div>
 );
}
