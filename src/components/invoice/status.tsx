import { BsClock, BsCheckCircle } from 'solid-icons/bs'
import { type Component, Show } from 'solid-js'
import { clsx } from 'clsx'

interface InvoiceStatusProps {
  status: string
}

const InvoiceStatus: Component<InvoiceStatusProps> = (props) => {
  return (
    <span
      class={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': props.status === 'pending',
          'bg-green-500 text-white': props.status === 'paid',
        },
      )}
    >
      <Show when={props.status === 'pending'}>
        Pending
        <BsClock class="ml-1 w-4 text-gray-500" />
      </Show>
      <Show when={props.status === 'paid'}>
        Paid
        <BsCheckCircle class="ml-1 w-4 text-white" />
      </Show>
    </span>
  )
}

export default InvoiceStatus