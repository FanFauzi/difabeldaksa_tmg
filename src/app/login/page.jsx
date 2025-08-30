"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Semua field wajib diisi");

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "Terjadi kesalahan server" };
      }

      if (res.ok) {
        // Simpan info user sementara
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect berdasarkan role
        if (data.role === "admin") router.push("/dashboard/admin", { replace: true });
        else router.push("/", { replace: true });
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-purple-700 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="mt-4 text-sm text-white text-center">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
