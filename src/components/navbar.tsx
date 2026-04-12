"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Explore" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#ECECEE] bg-white">
      <div className="content-container flex h-[69px] items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)]">
          OrlandoCafes.com
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="rounded-full bg-[#B5450F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8E3408]"
          >
            Submit a Cafe
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="font-bold font-[family-name:var(--font-heading)]">
                  OrlandoCafes.com
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/submit"
                className="mt-2 rounded-full bg-[#B5450F] px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Submit a Cafe
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
