import Link from 'next/link';
import React from 'react';

export function TopNavigationItem(props) {
  const match = props.router?.pathname === props.to;
  return match ? (
    <React.Fragment>
      {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
      <Link key={props.to} href={props.to}>
        <a className="bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">
          {props.label}
        </a>
      </Link>
    </React.Fragment>
  ) : (
    <Link href={props.to}>
      <a className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
        {props.label}
      </a>
    </Link>
  );
}
