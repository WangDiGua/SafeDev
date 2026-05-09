import React from 'react';

export const JsonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(20, 20)">
      <rect width="60" height="60" rx="16" fill="currentColor" fillOpacity="0.1"/>
      <path d="M25 20C22.2386 20 20 22.2386 20 25C20 27.7614 22.2386 30 25 30H35" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M40 20C42.7614 20 45 22.2386 45 25C45 27.7614 42.7614 30 40 30H30" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M25 40C22.2386 40 20 37.7614 20 35C20 32.2386 22.2386 30 25 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M40 40C42.7614 40 45 37.7614 45 35C45 32.2386 42.7614 30 40 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="20" cy="25" r="3" fill="currentColor"/>
      <circle cx="45" cy="25" r="3" fill="currentColor"/>
    </g>
  </svg>
);

export const CryptoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(15, 15)">
      <rect width="70" height="70" rx="20" fill="currentColor" fillOpacity="0.1"/>
      <path d="M35 25v-5a10 10 0 1 1 20 0v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <rect x="25" y="25" width="40" height="30" rx="6" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="45" cy="40" r="4" fill="currentColor"/>
    </g>
  </svg>
);

export const MarkdownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(15, 15)">
      <rect width="70" height="70" rx="12" fill="currentColor" fillOpacity="0.1"/>
      <path d="M25 50V25h10l5 10 5-10h10v25H45V35l-5 8-5-8v15H25z" fill="currentColor"/>
      <path d="M60 35v15l8-8h-5V35h-3z" fill="currentColor"/>
    </g>
  </svg>
);

// We will use standard Lucide icons for smaller things, but for the tools we will create more robust ones.
// In reality, let's just make beautiful SVGs for a couple to establish the pattern, and then map them.
