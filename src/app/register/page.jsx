"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!name || !email || !password) {
      return alert("Semua field wajib diisi");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Terjadi kesalahan server" };
      }

      if (res.ok) {
        alert("Registrasi berhasil! Silakan login.");
        router.push("/login", { replace: true });
      } else {
        alert(data.message || "Gagal register");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-purple-700 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-white text-center">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}
