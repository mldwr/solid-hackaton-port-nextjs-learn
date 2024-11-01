
  import { 
    HiOutlineBanknotes,
    HiOutlineClock,
    HiOutlineUserGroup,
    HiOutlineInbox 
  } from 'solid-icons/hi'
  import '~/styles/fonts.css';
  import { fetchCardData } from '~/lib/data';
  import { createResource } from 'solid-js';

  const iconMap = {
    collected: HiOutlineBanknotes,
    customers: HiOutlineUserGroup,
    pending: HiOutlineClock,
    invoices: HiOutlineInbox,
  };
  
  export default function CardWrapper() {
    const [cardData] = createResource(fetchCardData);

    return (
        <>
        <Card title="Collected" value={cardData()?.totalPaidInvoices ?? 0} type="collected" />
        <Card title="Pending" value={cardData()?.totalPendingInvoices ?? 0} type="pending" />
        <Card title="Total Invoices" value={cardData()?.numberOfInvoices ?? 0} type="invoices" />
        <Card
            title="Total Customers"
            value={cardData()?.numberOfCustomers ?? 0}
            type="customers"
        />
        </>
    );
    /* const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData(); */
  
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div class="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div class="flex p-4">
          {Icon ? <Icon class="h-5 w-5 text-gray-700" /> : null}
          <h3 class="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          class={`font-lusitana truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }