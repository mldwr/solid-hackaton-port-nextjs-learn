import { Suspense, ErrorBoundary } from 'solid-js';
import CardWrapper from '~/components/dashboard/cards';
import RevenueChart from '~/components/dashboard/revenue-chart';
import LatestInvoices from '~/components/dashboard/latest-invoices';
import '~/styles/fonts.css';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '~/components/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 class="font-lusitana mb-4 text-xl md:text-2xl">
        Dashboard
      </h1>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}