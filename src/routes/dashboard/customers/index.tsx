import { createResource } from 'solid-js';
import { fetchFilteredCustomers } from '~/lib/data';
import CustomersTable from '~/components/customers/table';
import { useSearchParams } from '@solidjs/router';

export default function CustomersPage() {
  const [searchParams] = useSearchParams();
  
  const [customers] = createResource(() => 
    fetchFilteredCustomers(Array.isArray(searchParams.query) ? searchParams.query[0] : searchParams.query || '')
  );

  return (
    <main>
      <CustomersTable customers={customers() ?? []} />
    </main>
  );
}