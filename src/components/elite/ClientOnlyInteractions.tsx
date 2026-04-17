'use client';

import React from 'react';
import { DiagnosticModal } from "./DiagnosticModal";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { Language } from "@/lib/translations";

interface ClientOnlyInteractionsProps {
  lang: Language;
}

export const ClientOnlyInteractions: React.FC<ClientOnlyInteractionsProps> = ({ lang }) => {
  return (
    <>
      <DiagnosticModal lang={lang} />
      <WhatsAppFloat />
    </>
  );
};
