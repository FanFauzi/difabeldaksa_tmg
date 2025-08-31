"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BeritaCard from "@/components/BeritaCard";
import Navbar from "@/components/Navbar";

export default function BeritaPage() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetch("/api/berita")
      .then((res) => res.json())
      .then(setBerita);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Daftar Berita</h1>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {berita.map((b) => (
            <Link key={b.id} href={`/berita/${b.id}`}>
              <BeritaCard key={b.id} {...b} className="mb-4" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
