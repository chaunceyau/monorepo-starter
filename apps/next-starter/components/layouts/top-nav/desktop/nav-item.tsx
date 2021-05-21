import React from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

interface TopNavigationItem {
  to: string;
  label: string;
  router: Router | null | undefined;
}

export function TopNavigationItem(props: TopNavigationItem) {
  const router = useRouter();
  const match =
    props.router?.pathname === props.to || router?.pathname === props.to;

  return match ? (
    <React.Fragment>
      <Link key={props.to} href={props.to}>
        <a className="bg-white text-primary px-3 py-2 rounded-md text-sm font-medium">
          {props.label}
        </a>
      </Link>
    </React.Fragment>
  ) : (
    <Link href={props.to}>
      <a className="text-white hover:bg-gray-700 hover:bg-opacity-25 px-3 py-2 rounded-md text-sm font-medium">
        {props.label}
      </a>
    </Link>
  );
}
