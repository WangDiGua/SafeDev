import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ToolId = 
  | 'json' | 'jwt' | 'crypto' | 'regex' | 'converter' | 'markdown' | 'password' | 'time' | 'color' | 'about'
  | 'diff' | 'text-analyze' | 'json-to-code' | 'uuid' | 'bcrypt' | 'url-parser' | 'base64' | 'ip-calc' | 'cron' | 'base-convert' | 'qrcode' 
  | 'unit-convert' | 'binary' | 'home';

interface AppState {
  activeTool: ToolId;
  setActiveTool: (id: ToolId) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'zh' | 'en' | 'ja';
  setLanguage: (lang: 'zh' | 'en' | 'ja') => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  pinnedTools: ToolId[];
  togglePin: (id: ToolId) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeTool: 'home',
      setActiveTool: (id) => set({ activeTool: id }),
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      language: 'zh',
      setLanguage: (lang) => set({ language: lang }),
      activeCategory: 'all',
      setActiveCategory: (category) => set({ activeCategory: category }),
      pinnedTools: ['json', 'jwt', 'crypto', 'regex', 'time'],
      togglePin: (id) => set((state) => ({
        pinnedTools: state.pinnedTools.includes(id) 
          ? state.pinnedTools.filter(t => t !== id)
          : [...state.pinnedTools, id]
      })),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
    }),
    {
      name: 'safedev-storage',
    }
  )
);
