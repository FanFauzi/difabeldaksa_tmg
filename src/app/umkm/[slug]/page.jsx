import { notFound } from "next/navigation";
import Image from "next/image";
import { umkmList } from "@/data/umkm";
import Navbar from "@/components/Navbar";

export default function UmkmDetailPage({ params }) {
  const umkm = umkmList.find((item) => item.slug === params.slug);

  if (!umkm) return notFound();

  return (
    <>
      <Navbar />
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">{umkm.title}</h1>
        <div className="flex flex-row">
        <Image
          src={umkm.image}
          alt={umkm.title}
          width={400}
          height={400}
          className="rounded-xl shadow mb-6 mr-6"
        />
        <div>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          {umkm.detail}
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Untuk informasi lebih lanjut dan pemesanan, silakan hubungi admin kami.
        </p>
        </div>
        </div>
      </section>
    </>
  );
}
