"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Register.module.scss";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: { message?: string } = {};
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError("Server returned an invalid response. Check the dev console.");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Registration error");
        return;
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Network error. Is the dev server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

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
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          <p className={styles.loginLink}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
