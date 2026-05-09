import React from 'react';
import { Github, Globe, Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export function Footer() {
 const { t } = useTranslation();
 const year = new Date().getFullYear();

 return (
 <footer className="w-full py-8 px-6 border-t border-ios-border-light dark:border-ios-border-dark bg-white/40 dark:bg-black/40 backdrop-blur-3xl relative z-10 mt-auto">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <span className="text-white font-black text-sm italic leading-none">S</span>
          </motion.div>
          <span className="font-black text-lg tracking-tight dark:text-white">SafeDev <span className="text-blue-500 text-[10px] align-top font-black">PRO</span></span>
        </div>
        
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          <a href="/about" className="hover:text-blue-500 transition-colors">{t('common.about', 'About')}</a>
          <a href="/terms" className="hover:text-blue-500 transition-colors">{t('common.terms', 'Terms')}</a>
          <a href="/privacy" className="hover:text-blue-500 transition-colors">{t('common.privacy', 'Privacy')}</a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
           <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Github size={16} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Globe size={16} /></a>
           </div>
           <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
              © {year} SAFEDEV. <span className="hidden sm:inline">{t('common.designed', 'DESIGNED WITH')} <Heart size={8} className="inline text-red-500 fill-ios-red" /> {t('common.fortheweb', 'FOR THE WEB')}</span>
           </p>
        </div>
      </div>
 </footer>
 );
}
