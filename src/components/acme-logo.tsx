// src/components/acme-logo.tsx
import { Component } from 'solid-js';
//https://solid-icons.vercel.app/
import { VsGlobe } from 'solid-icons/vs'
import '../styles/fonts.css';

const AcmeLogo: Component = () => {
  return (
    <div class="flex flex-row items-center leading-none text-white font-lusitana">
      <VsGlobe class="h-12 w-12 rotate-[15deg]" />
      <p class="text-[44px]">Acme</p>
    </div>
  );
};

export default AcmeLogo;