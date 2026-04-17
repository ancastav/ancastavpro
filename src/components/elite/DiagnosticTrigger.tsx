'use client';

import React from 'react';

interface DiagnosticTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const DiagnosticTrigger: React.FC<DiagnosticTriggerProps> = ({ children, className }) => {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-diagnostic'));
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
