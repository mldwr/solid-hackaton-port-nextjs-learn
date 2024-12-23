import '~/styles/fonts.css';
import Search from '~/components/search';
import { FormattedCustomersTable } from '~/lib/definitions';
import { For } from 'solid-js';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div class="w-full">
      <h1 class={`font-lusitana mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div class="mt-6 flow-root">
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div class="md:hidden">
                <For each={customers}>
                  {(customer) => (
                    <div
                      class="mb-2 w-full rounded-md bg-white p-4"
                    >
                      <div class="flex items-center justify-between border-b pb-4">
                        <div>
                          <div class="mb-2 flex items-center">
                            <div class="flex items-center gap-3">
                              <img
                                src={customer.image_url}
                                class="rounded-full"
                                alt={`${customer.name}'s profile picture`}
                                width={28}
                                height={28}
                              />
                              <p>{customer.name}</p>
                            </div>
                          </div>
                          <p class="text-sm text-gray-500">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                      <div class="flex w-full items-center justify-between border-b py-5">
                        <div class="flex w-1/2 flex-col">
                          <p class="text-xs">Pending</p>
                          <p class="font-medium">{customer.total_pending}</p>
                        </div>
                        <div class="flex w-1/2 flex-col">
                          <p class="text-xs">Paid</p>
                          <p class="font-medium">{customer.total_paid}</p>
                        </div>
                      </div>
                      <div class="pt-4 text-sm">
                        <p>{customer.total_invoices} invoices</p>
                      </div>
                    </div>
                  )}
                </For>
              </div>
              <table class="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead class="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" class="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" class="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" class="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" class="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" class="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 text-gray-900">
                  <For each={customers}>
                    {(customer) => (
                      <tr class="group">
                        <td class="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                          <div class="flex items-center gap-3">
                            <img
                              src={customer.image_url}
                              class="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </td>
                        <td class="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {customer.email}
                        </td>
                        <td class="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {customer.total_invoices}
                        </td>
                        <td class="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {customer.total_pending}
                        </td>
                        <td class="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                          {customer.total_paid}
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}