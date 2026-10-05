"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import type { ProjectType } from "@/content/site";
import { startInquiry } from "@/lib/prefill";
import { buttonClass } from "./button";

type InquiryLinkProps = Omit<ComponentProps<"a">, "href"> & {
  type?: ProjectType;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  unstyled?: boolean;
};

/** A real #contact link (works without JS) that also pre-selects a project type. */
export function InquiryLink({ type, variant, size, unstyled, className, onClick, ...props }: InquiryLinkProps) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    // On pages without the contact form (e.g. /privacy), let the link navigate to /#contact.
    if (!document.getElementById("contact")) return;
    e.preventDefault();
    startInquiry(type);
    history.replaceState(null, "", "#contact");
  }
  return (
    <Link href="/#contact" onClick={handle} className={unstyled ? className : buttonClass(variant, size, className)} {...props} />
  );
}
