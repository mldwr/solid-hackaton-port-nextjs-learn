import { createResource, For, Show } from 'solid-js';
import { generateYAxis } from '~/lib/utils';
import { HiOutlineCalendar } from 'solid-icons/hi';
import '~/styles/fonts.css';
import { fetchRevenue } from '~/lib/data';

// Use createResource to manage asynchronous data fetching
export default function RevenueChart() {
  // Define revenue as a reactive resource
  const [revenue] = createResource(fetchRevenue);

  const chartHeight = 350;

  // Generate y-axis labels and topLabel reactively when revenue updates
  const { yAxisLabels, topLabel } = generateYAxis(revenue() || []);

  return (
    <div class="w-full md:col-span-4">
      <h2 class="font-lusitana mb-4 text-xl md:text-2xl">Recent Revenue</h2>
      <div class="rounded-xl bg-gray-50 p-4">
        <Show
          when={(revenue() ?? []).length > 0}
          fallback={<p class="mt-4 text-gray-400">No data available.</p>}
        >
          <div class="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
            {/* y-axis */}
            <div
              class="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
              style={{ height: `${chartHeight}px` }}
            >
              <For each={yAxisLabels}>
                {(label) => (
                  <p data-key={label}>{label}</p>
                )}
              </For>
            </div>

            <For each={revenue()}>
              {(month) => (
                <div class="flex flex-col items-center gap-2">
                  {/* bars */}
                  <div
                    class="w-full rounded-md bg-blue-300"
                    style={{
                      height: `${(chartHeight / topLabel) * month.revenue}px`,
                    }}
                  ></div>
                  {/* x-axis */}
                  <p class="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                    {month.month}
                  </p>
                </div>
              )}
            </For>
          </div>
        </Show>
        <div class="flex items-center pb-2 pt-6">
          <HiOutlineCalendar class="h-5 w-5 text-gray-500" />
          <h3 class="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
