'use client';

import { A } from '@solidjs/router'; 
import NavLinks from '~/components/dashboard/nav-links';
import AcmeLogo from '~/components/acme-logo';
import { BsPower } from 'solid-icons/bs';
import { signOut } from '~/lib/auth';
import { useNavigate } from "@solidjs/router";

export default function SideNav() {
  const navigate = useNavigate();
  return (
    <div class="flex h-full flex-col px-3 py-4 md:px-2">
      <A
        class="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div class="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </A>
      <div class="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div class="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
            navigate('/login');
          }}
          >
            <button type="submit">Test Submit</button>
        </form>

      </div>

    </div>
  );
}