import { A } from '@solidjs/router';
import NavLinks from '~/components/dashboard/nav-links';
import AcmeLogo from '~/components/acme-logo';
import { BsPower } from 'solid-icons/bs';
import { signOut } from '~/lib/auth';

export default function SideNav() {
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
          onSubmit={async (e) => {
            e.preventDefault();
            await signOut();
          }}
        >
          <button class="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <BsPower class="w-6" />
            <div class="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}