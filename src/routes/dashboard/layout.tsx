// This is the layout wrapper for all dashboard routes
import { JSX } from 'solid-js';
import SideNav from '~/components/dashboard/sidenav';
import { useLocation } from '@solidjs/router';

export default function DashboardLayout(props: { children?: JSX.Element }) {
  const location = useLocation();
  console.log("Dashboard layout rendering, path:", location.pathname);

  return (
    <div class="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div class="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div class="grow p-6 md:overflow-y-auto md:p-12">{props.children}</div>
    </div>
  );
} 