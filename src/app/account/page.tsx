"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/client/auth-store";
import Breadcrumb from "@/components/ui/Breadcrumb";
import styles from "./Account.module.scss";

export default function AccountPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [sessionState, setSessionState] = useState<"pending" | "ok">("pending");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const text = await res.text();
      let data: { user?: { id: string; email: string; name?: string } } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {}
      if (cancelled) return;
      if (data.user) {
        setUser(data.user);
        setSessionState("ok");
      } else {
        router.replace("/login");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setUser, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    logout();
    router.push("/");
  };

  if (sessionState === "pending") {
    return (
      <section className={`page container ${styles.accountPage}`}>
        <Breadcrumb />
        <p className={styles.guestNote}>Loading…</p>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className={`page container ${styles.accountPage}`}>
      <div className={styles.pageHead}>
        <Breadcrumb />
        <h1 className={styles.title}>Account</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Your details</h2>
          <div className={styles.rows}>
            <div className={styles.row}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user.email}</span>
            </div>
            {user.name ? (
              <div className={styles.row}>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.name}</span>
              </div>
            ) : null}
            <div className={styles.row}>
              <span className={styles.label}>User ID</span>
              <span className={styles.value}>{user.id}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Shortcuts</h2>
          <ul className={styles.shortcuts}>
            <li className={styles.shortcut}>
              <Link href="/cart" className={styles.shortcutLink}>
                Cart
                <span className={styles.shortcutChevron} aria-hidden>
                  →
                </span>
              </Link>
            </li>
            <li className={styles.shortcut}>
              <Link href="/favorites" className={styles.shortcutLink}>
                Favorites
                <span className={styles.shortcutChevron} aria-hidden>
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </section>
  );
}
