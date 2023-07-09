"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import styles from "./nav.styles.module.css";

const ROUTES: { name: string; slug: string }[] = [
  { name: "docs", slug: "/docs" },
];

export default (function Nav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div>
        {pathname !== "/" && (
          <Link
            aria-current={pathname === "/"}
            className={styles.a}
            href="/"
            title="go to homepage"
          >
            mirrodin
          </Link>
        )}
      </div>
      <div>
        {ROUTES.map(({ name, slug }) => (
          <Link
            aria-current={pathname.startsWith(slug)}
            className={styles.a}
            href={slug}
            key={slug}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
} satisfies FC);
