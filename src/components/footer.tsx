import Link from "next/link";
import { Coffee } from "lucide-react";

const AREA_LINKS = [
  { href: "/area/downtown-orlando", label: "Downtown Orlando" },
  { href: "/area/winter-park", label: "Winter Park" },
  { href: "/area/kissimmee", label: "Kissimmee" },
  { href: "/area/winter-garden", label: "Winter Garden" },
  { href: "/area/dr-phillips", label: "Dr. Phillips" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Coffee className="size-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight">
                OrlandoCafes
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your guide to the best cafes in Central Florida. Personally
              visited, honestly reviewed.
            </p>
          </div>

          {/* Areas */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Browse by Area
            </h3>
            <ul className="space-y-1.5">
              {AREA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              More
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Submit a Cafe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OrlandoCafes.com. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
