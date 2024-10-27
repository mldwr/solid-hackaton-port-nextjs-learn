// src/routes/index.tsx
import { Component } from 'solid-js';
import AcmeLogo from '~/components/acme-logo';
import { VsArrowRight } from 'solid-icons/vs'
import { A } from '@solidjs/router';
import '../styles/fonts.css';

const Page: Component = () => {
  return (
    <main class="flex min-h-screen flex-col p-6">
      <div class="flex h-20 shrink-0 items-end rounded-lg bg-blue-600 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div class="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div class="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p class="font-lusitana text-xl text-gray-800 md:text-3xl md:leading-normal">
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" class="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <A
            href="/login"
            class="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <VsArrowRight class="w-6 md:w-8" />
          </A>
        </div>
        <div class="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <img
            src="/hero-desktop.png"
            width={1000}
            height={760}
            alt="Screenshots of the dashboard project showing desktop version"
            class="hidden md:block"
          />
          <img
            src="/hero-mobile.png"
            width={560}
            height={620}
            alt="Screenshot of the dashboard project showing mobile version"
            class="block md:hidden"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;