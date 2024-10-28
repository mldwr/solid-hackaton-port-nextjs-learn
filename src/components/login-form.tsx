import '../styles/fonts.css';
import { VsArrowRight } from 'solid-icons/vs'
import { Button } from '~/components/button';
import { HiSolidAtSymbol } from 'solid-icons/hi'
import { VsKey } from 'solid-icons/vs'

export default function LoginForm() {
  return (
    <form class="space-y-3">
      <div class="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 class={`font-lusitana mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div class="w-full">
          <div>
            <label
              class="mb-3 mt-5 block text-xs font-medium text-gray-900"
              for="email"
            >
              Email
            </label>
            <div class="relative">
              <input
                class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <HiSolidAtSymbol class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div class="mt-4">
            <label
              class="mb-3 mt-5 block text-xs font-medium text-gray-900"
              for="password"
            >
              Password
            </label>
            <div class="relative">
              <input
                class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <VsKey class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button class="mt-4 w-full">
          Log in <VsArrowRight class="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div class="flex h-8 items-end space-x-1">
        </div>
      </div>
    </form>
  );
}