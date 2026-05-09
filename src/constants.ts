import { ToolId } from './store/useAppStore';
import * as CustomIcons from './icons/CustomIcons';

export interface ToolMetadata {
  id: ToolId;
  icon: any;
  category: 'formatter' | 'crypto' | 'network' | 'time' | 'design' | 'system';
  i18nKey: string;
  color: string;
}

export const TOOL_METADATA: ToolMetadata[] = [
  // Formatter & Code
  { id: 'json', icon: CustomIcons.JsonIcon, category: 'formatter', i18nKey: 'common.json', color: 'bg-emerald-500' },
  { id: 'converter', icon: CustomIcons.ConverterIcon, category: 'formatter', i18nKey: 'converter.title', color: 'bg-blue-500' },
  { id: 'markdown', icon: CustomIcons.MarkdownIcon, category: 'formatter', i18nKey: 'markdown.title', color: 'bg-indigo-500' },
  { id: 'diff', icon: CustomIcons.DiffIcon, category: 'formatter', i18nKey: 'tools.diff', color: 'bg-rose-500' },
  { id: 'text-analyze', icon: CustomIcons.TextAnalyzeIcon, category: 'formatter', i18nKey: 'tools.textAnalyze', color: 'bg-slate-500' },
  { id: 'json-to-code', icon: CustomIcons.CodeIcon, category: 'formatter', i18nKey: 'tools.jsonToCode', color: 'bg-emerald-600' },

  // Crypto
  { id: 'crypto', icon: CustomIcons.CryptoIcon, category: 'crypto', i18nKey: 'common.crypto', color: 'bg-amber-500' },
  { id: 'password', icon: CustomIcons.PasswordIcon, category: 'crypto', i18nKey: 'password.title', color: 'bg-orange-500' },
  { id: 'jwt', icon: CustomIcons.JwtIcon, category: 'crypto', i18nKey: 'common.jwt', color: 'bg-red-500' },
  { id: 'uuid', icon: CustomIcons.UuidIcon, category: 'crypto', i18nKey: 'tools.uuid', color: 'bg-purple-500' },
  { id: 'bcrypt', icon: CustomIcons.BcryptIcon, category: 'crypto', i18nKey: 'tools.bcrypt', color: 'bg-rose-600' },

  // Network
  { id: 'url-parser', icon: CustomIcons.UrlIcon, category: 'network', i18nKey: 'tools.urlParser', color: 'bg-sky-500' },
  { id: 'base64', icon: CustomIcons.Base64Icon, category: 'network', i18nKey: 'tools.base64', color: 'bg-cyan-500' },
  { id: 'ip-calc', icon: CustomIcons.IpIcon, category: 'network', i18nKey: 'tools.ipCalc', color: 'bg-blue-600' },

  // Time & Utils
  { id: 'time', icon: CustomIcons.TimeIcon, category: 'time', i18nKey: 'time.title', color: 'bg-teal-500' },
  { id: 'regex', icon: CustomIcons.RegexIcon, category: 'time', i18nKey: 'common.regex', color: 'bg-pink-500' },
  { id: 'unit-convert', icon: CustomIcons.UnitIcon, category: 'time', i18nKey: 'tools.unitConvert', color: 'bg-lime-500' },
  { id: 'cron', icon: CustomIcons.CronIcon, category: 'time', i18nKey: 'tools.cron', color: 'bg-violet-500' },
  { id: 'base-convert', icon: CustomIcons.BinaryIcon, category: 'time', i18nKey: 'tools.baseConvert', color: 'bg-fuchsia-500' },

  // Design
  { id: 'color', icon: CustomIcons.ColorIcon, category: 'design', i18nKey: 'color.title', color: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' },
  { id: 'qrcode', icon: CustomIcons.QrcodeIcon, category: 'design', i18nKey: 'tools.qrcode', color: 'bg-zinc-800 dark:bg-zinc-200' },
  
  // Generic
  { id: 'binary', icon: CustomIcons.BinaryIcon, category: 'system', i18nKey: 'common.binary', color: 'bg-gray-500' },
  { id: 'about', icon: CustomIcons.InfoIcon, category: 'system', i18nKey: 'common.about', color: 'bg-blue-400' },
];

export const IOS_SPRING = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  mass: 0.8,
  restDelta: 0.001
} as const;

export const IOS_TRANSITION_PAGE = {
  initial: { opacity: 0, scale: 0.96, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.02, y: -10 },
  transition: { 
    type: "spring",
    stiffness: 300,
    damping: 32,
    mass: 1,
    restDelta: 0.001
  }
} as const;
