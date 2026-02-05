"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/redux";
import { setUser } from "@/store/slices/authSlice";
import Link from "next/link";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      setError(data.message || "Login error");
      return;
    }

    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (meData.user) {
        dispatch(setUser(meData.user));
      }
    }

    router.push("/");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className={styles.registerLink}>
            Don't have an account?{" "}
            <Link href="/register" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
