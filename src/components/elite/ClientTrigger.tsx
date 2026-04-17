'use client';

import React from 'react';

interface ClientTriggerProps {
  children: React.ReactNode;
  className?: string;
  event: string;
}

export const ClientTrigger: React.FC<ClientTriggerProps> = ({ children, className, event }) => {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(event));
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
