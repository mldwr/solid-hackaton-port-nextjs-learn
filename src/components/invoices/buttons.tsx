import { BsPencil, BsPlus, BsTrash } from 'solid-icons/bs'
import { A } from '@solidjs/router';
import { deleteInvoice } from '~/lib/actions';

export function CreateInvoice() {
  return (
    <A
      href="/dashboard/invoices/create"
      class="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span class="hidden md:block">Create Invoice</span>{' '}
      <BsPlus class="h-5 md:ml-4" />
    </A>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <A
      href={`/dashboard/invoices/${id}/edit`}
      class="rounded-md border p-2 hover:bg-gray-100"
    >
      <BsPencil class="w-5" />
    </A>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form onSubmit={deleteInvoiceWithId}>
      <button type="submit" class="rounded-md border p-2 hover:bg-gray-100">
        <span class="sr-only">Delete</span>
        <BsTrash class="w-5" />
      </button>
    </form>
  );
}