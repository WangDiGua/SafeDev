import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TabBar } from './components/TabBar';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Search, Command } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore, type ToolId } from './store/useAppStore';
import { CommandPalette } from './components/CommandPalette';
import { IOS_TRANSITION_PAGE, IOS_SPRING } from './constants';

import { Toaster, toast } from 'sonner';

// Lazy load tools
const JsonWorkbench = lazy(() => import('./components/JsonWorkbench').then(m => ({ default: m.JsonWorkbench })));
const JwtLab = lazy(() => import('./components/JwtLab').then(m => ({ default: m.JwtLab })));
const CryptoEngine = lazy(() => import('./components/CryptoEngine').then(m => ({ default: m.CryptoEngine })));
const RegexVisualizer = lazy(() => import('./components/RegexVisualizer').then(m => ({ default: m.RegexVisualizer })));
const JsonConverter = lazy(() => import('./components/JsonConverter').then(m => ({ default: m.JsonConverter })));
const MarkdownWorkbench = lazy(() => import('./components/MarkdownWorkbench').then(m => ({ default: m.MarkdownWorkbench })));
const PasswordGenerator = lazy(() => import('./components/PasswordGenerator').then(m => ({ default: m.PasswordGenerator })));
const TimeConverter = lazy(() => import('./components/TimeConverter').then(m => ({ default: m.TimeConverter })));
const ColorConverter = lazy(() => import('./components/ColorConverter').then(m => ({ default: m.ColorConverter })));
const UuidGenerator = lazy(() => import('./components/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const BaseConverter = lazy(() => import('./components/BaseConverter').then(m => ({ default: m.BaseConverter })));
const CronExplainer = lazy(() => import('./components/CronExplainer').then(m => ({ default: m.CronExplainer })));
const QrCodeLab = lazy(() => import('./components/QrCodeLab').then(m => ({ default: m.QrCodeLab })));
const TextDiff = lazy(() => import('./components/TextDiff').then(m => ({ default: m.TextDiff })));
const BcryptLab = lazy(() => import('./components/BcryptLab').then(m => ({ default: m.BcryptLab })));
const UrlParser = lazy(() => import('./components/UrlParser').then(m => ({ default: m.UrlParser })));
const Base64Smart = lazy(() => import('./components/Base64Smart').then(m => ({ default: m.Base64Smart })));
const JsonToCode = lazy(() => import('./components/JsonToCode').then(m => ({ default: m.JsonToCode })));
const IpCalculator = lazy(() => import('./components/IpCalculator').then(m => ({ default: m.IpCalculator })));
const TextAnalyze = lazy(() => import('./components/TextAnalyze').then(m => ({ default: m.TextAnalyze })));
const UnitConverter = lazy(() => import('./components/UnitConverter').then(m => ({ default: m.UnitConverter })));
const BinaryLab = lazy(() => import('./components/BinaryLab').then(m => ({ default: m.BinaryLab })));
const Privacy = lazy(() => import('./components/Legal').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./components/Legal').then(m => ({ default: m.Terms })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Home = lazy(() => import('./components/Home').then(m => ({ default: m.Home })));

function AnimatedRoutes() {
  const location = useLocation();
  const { setActiveTool } = useAppStore();

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, 0);
    window.scrollTo(0, 0);

    const path = location.pathname.slice(1) as ToolId;
    const validTools = [
      'json', 'jwt', 'crypto', 'regex', 'converter', 'markdown', 'password', 'time', 'color', 'about', 'home',
      'uuid', 'base-convert', 'cron', 'qrcode', 'diff', 'bcrypt', 'url-parser', 'base64', 'json-to-code', 'ip-calc', 'text-analyze',
      'unit-convert', 'binary'
    ];
    if (validTools.includes(path)) {
      setActiveTool(path || 'home');
    }
  }, [location, setActiveTool]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        {...IOS_TRANSITION_PAGE}
        className="w-full min-h-full"
      >
        <Suspense fallback={
          <div className="p-6 sm:p-8 w-full max-w-7xl mx-auto mt-6 animate-pulse">
             <div className="bg-white dark:bg-[#1C1C1E] rounded-xl border border-transparent shadow-sm min-h-[500px]">
               <div className="p-6 sm:p-8">
                 <div className="mb-8 flex items-center justify-between border-b border-ios-border-light dark:border-ios-border-dark pb-6">
                   <div className="space-y-3 w-full">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-[#2C2C2E]" />
                       <div className="w-48 h-8 rounded-lg bg-gray-200 dark:bg-[#2C2C2E]" />
                     </div>
                     <div className="w-72 h-4 rounded ml-11 bg-gray-100 dark:bg-[#2C2C2E]/60" />
                   </div>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="h-[400px] rounded-xl bg-gray-100 dark:bg-[#2C2C2E]/40" />
                   <div className="h-[400px] rounded-xl bg-gray-100 dark:bg-[#2C2C2E]/40" />
                 </div>
               </div>
             </div>
          </div>
        }>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/json" element={<JsonWorkbench />} />
            <Route path="/jwt" element={<JwtLab />} />
            <Route path="/crypto" element={<CryptoEngine />} />
            <Route path="/regex" element={<RegexVisualizer />} />
            <Route path="/converter" element={<JsonConverter />} />
            <Route path="/markdown" element={<MarkdownWorkbench />} />
            <Route path="/password" element={<PasswordGenerator />} />
            <Route path="/time" element={<TimeConverter />} />
            <Route path="/color" element={<ColorConverter />} />
            <Route path="/uuid" element={<UuidGenerator />} />
            <Route path="/base-convert" element={<BaseConverter />} />
            <Route path="/cron" element={<CronExplainer />} />
            <Route path="/qrcode" element={<QrCodeLab />} />
            <Route path="/diff" element={<TextDiff />} />
            <Route path="/bcrypt" element={<BcryptLab />} />
            <Route path="/url-parser" element={<UrlParser />} />
            <Route path="/base64" element={<Base64Smart />} />
            <Route path="/json-to-code" element={<JsonToCode />} />
            <Route path="/ip-calc" element={<IpCalculator />} />
            <Route path="/text-analyze" element={<TextAnalyze />} />
            <Route path="/unit-convert" element={<UnitConverter />} />
            <Route path="/binary" element={<BinaryLab />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme, activeTool, setActiveTool } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-ios-bg-light dark:bg-ios-bg-dark text-ios-text-light dark:text-ios-text-dark transition-colors duration-500 flex flex-col font-sans selection:bg-ios-blue/20 relative z-0">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none w-full h-full bg-[#f8fafc] dark:bg-[#09090b]">
        {/* Abstract Blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[10%] right-[-15%] w-[50vw] h-[70vh] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[15%] w-[70vw] h-[60vh] rounded-full bg-emerald-400/10 dark:bg-emerald-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <Toaster position="bottom-right" richColors theme={theme === 'dark' ? 'dark' : 'light'} />
      <CommandPalette />
      
      <header className="fixed top-0 left-0 right-0 h-14 z-[60] flex items-center justify-between px-6 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-3xl saturate-[1.8] border-b border-white/40 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]" style={{ WebkitBackdropFilter: 'blur(30px) saturate(1.8)' }}>
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { navigate('/'); }}
              className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center cursor-pointer shadow-sm"
            >
              <span className="text-white dark:text-black font-bold text-lg italic leading-none">S</span>
            </motion.div>
            <div className="hidden lg:block relative top-[1px]">
               <h1 className="font-bold text-sm tracking-tight leading-none cursor-pointer" onClick={() => navigate('/')}>SafeDev<span className="text-ios-gray ml-1 opacity-70 font-medium">Tools</span></h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-8">
             <NavigationWrapper activeTool={activeTool} setActiveTool={setActiveTool} />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
                document.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-[#1C1C1E] border border-transparent text-xs font-medium text-ios-gray transition-colors hover:bg-gray-200 dark:hover:bg-[#2C2C2E]"
            >
              <Search size={14} className="opacity-70" />
              <span className="opacity-80">Search</span>
              <kbd className="font-sans ml-2 bg-white dark:bg-black px-1.5 py-0.5 rounded border border-ios-border-light dark:border-ios-border-dark text-[10px]">⌘K</kbd>
            </button>

            <div className="w-[1px] h-4 bg-ios-border-light dark:bg-ios-border-dark mx-1" />

            <button 
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#1C1C1E] transition-colors"
            >
               <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  </motion.div>
                </AnimatePresence>
            </button>
          </div>
      </header>
      
      <main className="flex-1 mt-14 relative flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const { theme } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const storeLang = useAppStore(s => s.language);
  useEffect(() => {
    i18n.changeLanguage(storeLang);
  }, [storeLang, i18n]);

  return (
    <HelmetProvider>
      <Router>
        <AppLayout />
      </Router>
    </HelmetProvider>
  );
}

function NavigationWrapper({ activeTool, setActiveTool }: { activeTool: ToolId, setActiveTool: (id: ToolId) => void }) {
  const navigate = useNavigate();
  return (
    <TabBar 
      activeTool={activeTool} 
      setActiveTool={(id) => {
        setActiveTool(id);
        navigate(`/${id}`);
      }} 
    />
  );
}
