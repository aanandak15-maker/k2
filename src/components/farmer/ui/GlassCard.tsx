import React from 'react';

interface GlassCardProps {
  key?: React.Key;
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', variant = 'light', onClick }: GlassCardProps) {
  const baseClass = variant === 'dark' ? 'glass-card-dark' : 'glass-panel';
  const interactiveClass = onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : '';
  
  return (
    <div 
      className={`rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] ${baseClass} ${interactiveClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
