import React from 'react';

const BaseIcon = ({ children, colorClass }: { children: React.ReactNode, colorClass?: string }) => (
  <svg viewBox="0 0 120 120" className={`w-full h-full ${colorClass || 'text-current'} drop-shadow-sm`} fill="none" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="soft-glow" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
         <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
       </linearGradient>
       <linearGradient id="strong-glow" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
         <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
       </linearGradient>
     </defs>
     {children}
  </svg>
);

export const JsonIcon = (props: any) => (
  <BaseIcon>
    <rect x="10" y="20" width="100" height="80" rx="20" fill="url(#soft-glow)"/>
    <path d="M40 40 L25 60 L40 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M80 40 L95 60 L80 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M65 30 L55 90" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
  </BaseIcon>
);

export const MarkdownIcon = (props: any) => (
  <BaseIcon>
    <rect x="10" y="25" width="100" height="70" rx="16" fill="url(#soft-glow)"/>
    <path d="M30 75 V45 h15 l7 12 7-12 h15 v30 h-10 V55 l-12 15 l-12-15 v20 H30z" fill="currentColor"/>
    <path d="M82 55 v20 l12-12 h-8 V55 h-4z" fill="currentColor"/>
  </BaseIcon>
);

export const ConverterIcon = (props: any) => (
  <BaseIcon>
    <circle cx="60" cy="60" r="45" fill="url(#soft-glow)"/>
    <path d="M30 50 h40 M70 50 l10 -10 M70 50 l10 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M90 70 h-40 M50 70 l-10 -10 M50 70 l-10 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </BaseIcon>
);

export const DiffIcon = (props: any) => (
  <BaseIcon>
    <rect x="15" y="15" width="40" height="90" rx="12" fill="url(#soft-glow)"/>
    <rect x="65" y="15" width="40" height="90" rx="12" fill="url(#soft-glow)"/>
    <path d="M25 40 h20 M25 60 h20 M25 80 h20 M75 40 h20 M75 60 h10" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="90" cy="80" r="10" stroke="currentColor" strokeWidth="6"/>
  </BaseIcon>
);

export const TextAnalyzeIcon = (props: any) => (
  <BaseIcon>
    <rect x="15" y="25" width="90" height="70" rx="15" stroke="currentColor" strokeWidth="8"/>
    <path d="M35 45 h50 M35 60 h30 M35 75 h40" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="80" cy="65" r="15" fill="url(#strong-glow)" stroke="currentColor" strokeWidth="4"/>
  </BaseIcon>
);

export const CodeIcon = (props: any) => (
  <BaseIcon>
    <rect x="20" y="20" width="80" height="80" rx="20" fill="url(#soft-glow)"/>
    <path d="M45 45 L30 60 L45 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M75 45 L90 60 L75 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </BaseIcon>
);

export const CryptoIcon = (props: any) => (
  <BaseIcon>
    <path d="M60 15 L100 40 V80 L60 105 L20 80 V40 Z" stroke="currentColor" strokeWidth="8" fill="url(#soft-glow)" strokeLinejoin="round"/>
    <circle cx="60" cy="60" r="15" fill="currentColor"/>
  </BaseIcon>
);

export const PasswordIcon = (props: any) => (
  <BaseIcon>
    <rect x="15" y="45" width="90" height="50" rx="15" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M35 45 V30 A25 25 0 0 1 85 30 V45" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="60" cy="70" r="8" fill="currentColor"/>
  </BaseIcon>
);

export const JwtIcon = (props: any) => (
  <BaseIcon>
    <circle cx="60" cy="60" r="45" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M45 60 L55 70 L75 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 25 V40 M60 80 V95 M25 60 H40 M80 60 H95" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
  </BaseIcon>
);

export const UuidIcon = (props: any) => (
  <BaseIcon>
    <rect x="20" y="30" width="80" height="60" rx="12" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M40 50 h10 M60 50 h20 M40 70 h40" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
  </BaseIcon>
);

export const BcryptIcon = (props: any) => (
  <BaseIcon>
    <path d="M60 20 L90 35 V70 C90 85 60 100 60 100 C60 100 30 85 30 70 V35 Z" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/>
    <circle cx="60" cy="55" r="10" fill="currentColor"/>
    <path d="M60 65 V80" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
  </BaseIcon>
);

export const UrlIcon = (props: any) => (
  <BaseIcon>
    <circle cx="45" cy="50" r="25" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <circle cx="75" cy="70" r="25" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M55 40 L65 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
  </BaseIcon>
);

export const Base64Icon = (props: any) => (
  <BaseIcon>
    <rect x="25" y="20" width="50" height="60" rx="10" stroke="currentColor" strokeWidth="8"/>
    <rect x="45" y="40" width="50" height="60" rx="10" fill="url(#strong-glow)" stroke="currentColor" strokeWidth="8"/>
  </BaseIcon>
);

export const IpIcon = (props: any) => (
  <BaseIcon>
    <circle cx="60" cy="60" r="45" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M15 60 h90 M60 15 v90 M30 30 c15 20, 45 20, 60 0 M30 90 c15 -20, 45 -20, 60 0" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
  </BaseIcon>
);

export const TimeIcon = (props: any) => (
  <BaseIcon>
    <circle cx="60" cy="60" r="45" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M60 30 V60 L80 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="60" cy="60" r="6" fill="currentColor"/>
  </BaseIcon>
);

export const RegexIcon = (props: any) => (
  <BaseIcon>
    <rect x="20" y="30" width="80" height="60" rx="15" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M40 50 h5 M55 50 h5 M70 50 h5 M40 70 h35" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
  </BaseIcon>
);

export const UnitIcon = (props: any) => (
  <BaseIcon>
    <path d="M60 20 L60 90 M20 50 L100 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <rect x="30" y="30" width="20" height="20" fill="currentColor" />
    <circle cx="80" cy="70" r="10" fill="currentColor"/>
  </BaseIcon>
);

export const CronIcon = (props: any) => (
  <BaseIcon>
    <rect x="25" y="30" width="70" height="65" rx="15" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M40 20 V40 M80 20 V40" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <path d="M25 55 h70" stroke="currentColor" strokeWidth="8"/>
    <circle cx="45" cy="75" r="5" fill="currentColor"/>
    <circle cx="60" cy="75" r="5" fill="currentColor"/>
    <circle cx="75" cy="75" r="5" fill="currentColor"/>
  </BaseIcon>
);

export const ColorIcon = (props: any) => (
  <BaseIcon>
    <path d="M60 15 C35 15, 15 35, 15 60 C15 85, 35 105, 60 105 C85 105, 105 85, 105 60 C105 45, 95 35, 80 35 C70 35, 65 45, 60 45 C55 45, 50 40, 50 35 C50 25, 60 15, 60 15 Z" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/>
    <circle cx="40" cy="50" r="6" fill="currentColor"/>
    <circle cx="60" cy="75" r="6" fill="currentColor"/>
    <circle cx="80" cy="60" r="6" fill="currentColor"/>
  </BaseIcon>
);

export const QrcodeIcon = (props: any) => (
  <BaseIcon>
    <rect x="20" y="20" width="30" height="30" rx="6" stroke="currentColor" strokeWidth="6" fill="url(#soft-glow)"/>
    <rect x="27" y="27" width="16" height="16" rx="3" fill="currentColor"/>
    <rect x="70" y="20" width="30" height="30" rx="6" stroke="currentColor" strokeWidth="6" fill="url(#soft-glow)"/>
    <rect x="77" y="27" width="16" height="16" rx="3" fill="currentColor"/>
    <rect x="20" y="70" width="30" height="30" rx="6" stroke="currentColor" strokeWidth="6" fill="url(#soft-glow)"/>
    <rect x="27" y="77" width="16" height="16" rx="3" fill="currentColor"/>
    <rect x="70" y="70" width="12" height="12" rx="3" fill="currentColor"/>
    <rect x="88" y="88" width="12" height="12" rx="3" fill="currentColor"/>
  </BaseIcon>
);

export const BinaryIcon = (props: any) => (
  <BaseIcon>
    <rect x="20" y="30" width="80" height="60" rx="15" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <path d="M40 50 V70 M60 50 V70 M80 50 V70 M40 50 Q50 60 40 70 M60 50 Q70 60 60 70 M80 50 Q90 60 80 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
  </BaseIcon>
);

export const InfoIcon = (props: any) => (
  <BaseIcon>
    <circle cx="60" cy="60" r="45" fill="url(#soft-glow)" stroke="currentColor" strokeWidth="8"/>
    <rect x="56" y="50" width="8" height="30" rx="4" fill="currentColor"/>
    <circle cx="60" cy="35" r="5" fill="currentColor"/>
  </BaseIcon>
);
