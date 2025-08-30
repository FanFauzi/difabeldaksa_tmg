"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import UmkmCard from "@/components/UmkmCard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data berita dari backend
  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch("/api/berita");
        if (!res.ok) throw new Error("Gagal fetch berita");
        const data = await res.json();
        setBerita(data);
      } catch (err) {
        console.error("Error fetch berita:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBerita();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Section Berita */}
      <section className="px-6 py-12 bg-purple-700 text-white">
        <h2 className="text-3xl font-bold mb-6">Berita Kami</h2>

        {loading ? (
          <p>Sedang memuat berita...</p>
        ) : berita.length === 0 ? (
          <p>Belum ada berita terbaru.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.map((item) => (
              <Link key={item.id} href={`/berita/${item.id}`}>
                <BeritaCard
                  title={item.title}
                  createdAt={item.createdAt}
                  image={item.image}
                // desc={item.desc}
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Section UMKM */}
      <section id="umkm" className="px-6 py-12 bg-orange-500 text-white">
        <h2 className="text-3xl font-bold mb-6">Potensi UMKM Kami</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <UmkmCard
            title="Sablon Kaos"
            desc="Melayani sablon custom dengan kualitas terbaik"
            image="/umkm/umkm-sablon.png"
          />
          <UmkmCard
            title="Jahit"
            desc="Melayani permak & pembuatan busana"
            image="/umkm/umkm-jahit.png"
          />
          <UmkmCard
            title="Roasting Kopi"
            desc="Kopi terbaik dari Temanggung"
            image="/umkm/umkm-kopi.png"
          />
        </div>
      </section>
    </div>
  );
}
