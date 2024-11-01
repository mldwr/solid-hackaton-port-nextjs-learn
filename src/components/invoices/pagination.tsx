'use client';

import { BsArrowLeft, BsArrowRight } from 'solid-icons/bs'
import clsx from 'clsx';
import { A } from '@solidjs/router';
import { generatePagination } from '~/lib/utils';
import { useLocation, useSearchParams } from '@solidjs/router';
import { For } from 'solid-js';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.page) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div class="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div class="flex -space-x-px">
        <For each={allPages}>
          {(page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index() === 0) position = 'first';
            if (index() === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          }}
        </For>
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const classes = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div class={classes}>{page}</div>
  ) : (
    <A href={href} class={classes}>
      {page}
    </A>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const classes = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <BsArrowLeft class="w-4" />
    ) : (
      <BsArrowRight class="w-4" />
    );

  return isDisabled ? (
    <div class={classes}>{icon}</div>
  ) : (
    <A class={classes} href={href}>
      {icon}
    </A>
  );
}