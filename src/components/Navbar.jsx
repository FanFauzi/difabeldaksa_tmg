"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  return (
    <nav className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        KDDT
      </Link>
      <div className="space-x-6">
        <Link href="/berita">Berita</Link>
        <Link href="/umkm">UMKM</Link>
        <Link href="/tentang">Tentang</Link>

        {user ? (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
              }}
              className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Logout ({user.name})
            </button>

            {user.role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            )}

          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
