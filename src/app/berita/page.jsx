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
        <div className="space-y-4">
          {berita.map((b) => (
            <Link key={b.id} href={`/berita/${b.id}`}>
              <BeritaCard key={b.id} {...b} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
