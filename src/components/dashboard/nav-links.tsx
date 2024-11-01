'use client';

import { HiOutlineUserGroup, HiOutlineHome, HiOutlineDocumentDuplicate } from 'solid-icons/hi'
import { A, useLocation } from '@solidjs/router';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HiOutlineHome },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: HiOutlineDocumentDuplicate,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: HiOutlineUserGroup },
];

export default function NavLinks() {
  const location = useLocation();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <A
            href={link.href}
            class={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': location.pathname === link.href,
              },
            )}
          >
            <LinkIcon class="w-6" />
            <p class="hidden md:block">{link.name}</p>
          </A>
        );
      })}
    </>
  );
}