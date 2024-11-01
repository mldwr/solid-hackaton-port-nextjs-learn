
import { HiOutlineArrowPath } from 'solid-icons/hi'
import clsx from 'clsx';
import '~/styles/fonts.css';
import { fetchLatestInvoices } from '~/lib/data';
import { createResource, For } from 'solid-js';

export default function LatestInvoices() {
  //const latestInvoices = await fetchLatestInvoices();
  const [latestInvoices] = createResource(fetchLatestInvoices);

  return (
    <div class="flex w-full flex-col md:col-span-4">
      <h2 class="font-lusitana mb-4 text-xl md:text-2xl">
        Latest Invoices
      </h2>
      <div class="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div class="bg-white px-6">
          <For each={latestInvoices() ?? []}>
            {(invoice, i) => (
              <div
                class={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i() !== 0,
                  },
                )}
              >
                <div class="flex items-center">
                  <img
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    class="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p class="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  class="font-lusitana truncate text-sm font-medium md:text-base"
                >
                  {invoice.amount}
                </p>
              </div>
            )}
          </For>
        </div>
        <div class="flex items-center pb-2 pt-6">
          <HiOutlineArrowPath class="h-5 w-5 text-gray-500" />
          <h3 class="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}