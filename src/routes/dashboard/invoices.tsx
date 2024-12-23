import { Suspense, createResource } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import Pagination from '~/components/invoices/pagination';
import Search from '~/components/search';
import Table from '~/components/invoices/table';
import { CreateInvoice } from '~/components/invoices/buttons';
import '~/styles/fonts.css';
import { InvoicesTableSkeleton } from '~/components/skeletons';
import { fetchInvoicesPages } from '~/lib/data';
import { createMemo } from 'solid-js';

export function routeData() {
  return {
    title: 'Invoices',
  };
}

export default function InvoicesPage() {
  const [searchParams] = useSearchParams();
  
  const query = createMemo(() => {
    const q = Array.isArray(searchParams.query) ? searchParams.query[0] || '' : searchParams.query || '';
    return q;
  });
    
  const currentPage = createMemo(() => Number(searchParams.page) || 1);

  const [totalPages] = createResource(query, fetchInvoicesPages);

  return (
    <div class="w-full">
      <div class="flex w-full items-center justify-between">
        <h1 class="font-lusitana text-2xl">Invoices</h1>
      </div>
      <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table query={query()} currentPage={currentPage()} />
      </Suspense>
      <div class="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages() ?? 0} />
      </div>
    </div>
  );
}
