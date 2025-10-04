import React from 'react';
import { Recycle } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-12 w-12', text: 'text-3xl' }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Recycle className={`${sizes[size].icon} text-primary-600`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold text-gray-900 leading-none`}>
            Eco<span className="text-primary-600">Collect</span>
          </span>
          <span className="text-xs text-gray-500 leading-none">
            Coletas Sustentáveis
          </span>
        </div>
      )}
    </div>
  );
}