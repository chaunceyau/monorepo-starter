import React from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";

interface DesktopLinkProps {
  to: string
  label: string
  router?: Router | null | undefined;
}

export function DesktopLink(props: DesktopLinkProps) {
  const router = useRouter();
  const match =
    props.router?.pathname === props.to || router?.pathname === props.to;

  const anchorClasses = ['px-3 py-2 rounded-md text-sm font-medium text-white']

  if (match) {
    anchorClasses.push("bg-black bg-opacity-50")
  } else {
    anchorClasses.push(
      "hover:bg-black hover:bg-opacity-25 hover:text-white"
    )
  }
  
  return (
    <Link href={props.to}>
      <a className={anchorClasses.join(" ")}>
        {props.label}
      </a>
    </Link>
  )
}