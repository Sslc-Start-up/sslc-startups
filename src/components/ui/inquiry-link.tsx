"use client";

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
    e.preventDefault();
    startInquiry(type);
    history.replaceState(null, "", "#contact");
  }
  return (
    <a href="#contact" onClick={handle} className={unstyled ? className : buttonClass(variant, size, className)} {...props} />
  );
}
