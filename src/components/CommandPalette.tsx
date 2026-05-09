import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useAppStore, type ToolId } from '../store/useAppStore';
import { useTranslation } from 'react-i18next';
import { 
 Code, ShieldCheck, Hash, Search, Info, 
 Sun, Moon, Languages, Terminal, ArrowRightLeft, FileEdit, Key, Clock, Palette, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CommandPalette() {
 const { t, i18n } = useTranslation();
 const { setActiveTool, theme, toggleTheme, setLanguage, commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
 const navigate = useNavigate();

 useEffect(() => {
 const down = (e: KeyboardEvent) => {
 if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
 e.preventDefault();
 setCommandPaletteOpen(!commandPaletteOpen);
 }
 };

 document.addEventListener('keydown', down);
 return () => document.removeEventListener('keydown', down);
 }, [commandPaletteOpen, setCommandPaletteOpen]);

 const runCommand = (action: () => void) => {
 action();
 setCommandPaletteOpen(false);
 };

 const navigateTo = (toolId: ToolId) => {
 setActiveTool(toolId);
 navigate(`/${toolId}`);
 setCommandPaletteOpen(false);
 };

 return (
 <Command.Dialog 
 open={commandPaletteOpen} 
 onOpenChange={setCommandPaletteOpen} 
 label="Global Command Palette"
 className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
 >
 <Dialog.Title className="sr-only">Global Command Palette</Dialog.Title>
 <Dialog.Description className="sr-only">Search for tools...</Dialog.Description>
 <div className="glass-card rounded-xl w-full max-w-[650px] bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-[50px] border-white/20 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] dark:shadow-none p-2 transition-all">
 <div className="flex items-center px-6 gap-2 mb-2">
 <Terminal size={22} className="text-blue-500 opacity-60 mr-2" />
 <Command.Input 
 placeholder="Type a command or search tools..." 
 className="w-full h-16 bg-transparent outline-none text-lg font-black tracking-tight placeholder:text-gray-500/30 dark:text-white"
 />
 <div className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-widest">
 ESC
 </div>
 </div>

 <Command.List className="max-h-[450px] overflow-y-auto p-2 scroll-smooth no-scrollbar space-y-1">
 <Command.Empty className="px-6 py-12 text-center">
 <Search size={40} className="mx-auto mb-4 opacity-10" />
 <p className="text-xs font-black text-gray-500 uppercase tracking-widest opacity-40">Zero vectors identified.</p>
 </Command.Empty>

 <Command.Group heading="Primary Protocols" className="px-4 py-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] opacity-80 border-b border-white/5 mb-2">
 {[
 { id: 'json', icon: Code, label: t('common.json') },
 { id: 'jwt', icon: ShieldCheck, label: t('common.jwt') },
 { id: 'crypto', icon: Hash, label: t('common.crypto') },
 { id: 'regex', icon: Search, label: t('common.regex') },
 { id: 'converter', icon: ArrowRightLeft, label: t('converter.title') },
 { id: 'markdown', icon: FileEdit, label: t('markdown.title') },
 { id: 'password', icon: Key, label: t('password.title') },
 { id: 'time', icon: Clock, label: t('time.title') },
 { id: 'color', icon: Palette, label: t('color.title') }
 ].map((item) => (
 <Command.Item 
 key={item.id}
 onSelect={() => navigateTo(item.id as ToolId)} 
 className="flex items-center justify-between px-4 py-4 rounded-2xl cursor-default select-none aria-selected:bg-blue-500 aria-selected:text-white transition-all group mt-1"
 >
 <div className="flex items-center gap-4">
 <item.icon size={20} className="text-blue-500 group-aria-selected:text-white transition-colors" />
 <span className="text-base font-black tracking-tight">{item.label}</span>
 </div>
 <div className="opacity-0 group-aria-selected:opacity-60 transition-opacity">
 <ChevronRight size={18} strokeWidth={3} />
 </div>
 </Command.Item>
 ))}
 </Command.Group>

 <Command.Group heading="System Configuration" className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-50 space-y-1 mt-4">
 <Command.Item onSelect={() => runCommand(toggleTheme)} className="flex items-center gap-4 px-4 py-4 rounded-2xl cursor-default select-none aria-selected:bg-blue-500 aria-selected:text-white transition-all group">
 {theme === 'light' ? <Moon size={20} className="text-blue-500 group-aria-selected:text-white" /> : <Sun size={20} className="text-yellow-400 group-aria-selected:text-white" />}
 <span className="text-base font-black tracking-tight">{t('common.theme')}</span>
 </Command.Item>
 <Command.Item onSelect={() => runCommand(() => { i18n.changeLanguage('zh'); setLanguage('zh'); })} className="flex items-center gap-4 px-4 py-4 rounded-2xl cursor-default select-none aria-selected:bg-blue-500 aria-selected:text-white transition-all group">
 <Languages size={20} className="text-blue-500 group-aria-selected:text-white" />
 <span className="text-base font-black tracking-tight">中文 (Chinese)</span>
 </Command.Item>
 <Command.Item onSelect={() => runCommand(() => { i18n.changeLanguage('en'); setLanguage('en'); })} className="flex items-center gap-4 px-4 py-4 rounded-2xl cursor-default select-none aria-selected:bg-blue-500 aria-selected:text-white transition-all group">
 <Languages size={20} className="text-blue-500 group-aria-selected:text-white" />
 <span className="text-base font-black tracking-tight">English</span>
 </Command.Item>
 <Command.Item onSelect={() => runCommand(() => { i18n.changeLanguage('ja'); setLanguage('ja'); })} className="flex items-center gap-4 px-4 py-4 rounded-2xl cursor-default select-none aria-selected:bg-blue-500 aria-selected:text-white transition-all group">
 <Languages size={20} className="text-blue-500 group-aria-selected:text-white" />
 <span className="text-base font-black tracking-tight">日本語 (Japanese)</span>
 </Command.Item>
 </Command.Group>
 </Command.List>
 </div>
 </Command.Dialog>
 );
}
