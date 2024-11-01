import Pagination from '~/components/invoices/pagination';
import Search from '~/components/search';
import Table from '~/components/invoices/table';
import { CreateInvoice } from '~/components/invoices/buttons';
import '~/styles/fonts.css';
import { InvoicesTableSkeleton } from '~/components/skeletons';
import { Suspense } from 'solid-js';
import { fetchInvoicesPages } from '~/lib/data';

export const routeData = () => {
  return {
    title: 'Invoices',
  };
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div class="w-full">
      <div class="flex w-full items-center justify-between">
        <h1 class={`font-lusitana text-2xl`}>Invoices</h1>
      </div>
      <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div class="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}