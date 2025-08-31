"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import UmkmCard from "@/components/UmkmCard";
import Navbar from "@/components/Navbar";
import { umkmList } from "@/data/umkm";

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
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <section id="umkm" className="px-6 py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Heading & Intro */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Potensi UMKM Kami</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Kami, Difabel Daksa Temanggung, memiliki berbagai potensi usaha yang siap
              melayani kebutuhan Anda dengan sepenuh hati.
            </p>
          </div>

          {/* Kontak Admin */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center space-y-2">
            <p className="text-lg font-semibold">
              Untuk keterangan lebih lanjut silakan hubungi admin kami:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
              <a
                href="https://wa.me/6288224167435"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
              >
                👤 Bapak Marsiana
              </a>
              <a
                href="https://wa.me/6281228036228"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
              >
                👤 Bapak Agus
              </a>
            </div>
          </div>


          {/* Informasi & UMKM Cards */}
          <div className="space-y-4 text-center">
            <p className="text-lg">
              Untuk informasi layanan kami, silakan klik gambar di bawah ini:
            </p>

            {/* UMKM dengan deskripsi (klikable ke detail) */}
            <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-5">
              {umkmList.map((item) => (
                <Link key={item.slug} href={`/umkm/${item.slug}`}>
                  <UmkmCard title={item.title} desc={item.desc} image={item.image} />
                </Link>
              ))}
            </div>

            {/* UMKM tanpa deskripsi */}
            <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-5 mt-10">
              <UmkmCard title="Service Motor" image="/umkm/umkm-motor.png" />
              <UmkmCard title="Jamu dan Obat Tradisional" image="/umkm/umkm-jamu.png" />
              <UmkmCard title="Madu Murni" image="/umkm/umkm-madu.png" />
              <UmkmCard title="Layanan Las" image="/umkm/umkm-las.png" />
              <UmkmCard title="Barber Shop" image="/umkm/umkm-barber.png" />
              <UmkmCard title="Sewa Sound Sistem" image="/umkm/umkm-sound.png" />
              <UmkmCard
                title="Barista Kopi dan Aneka Minuman"
                image="/umkm/umkm-barista.png"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
