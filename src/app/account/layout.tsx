import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Account — Nice Gadgets",
};

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
