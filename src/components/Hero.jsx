export default function Hero() {
  return (
    <section className="bg-orange-600 text-white px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
      {/* Teks */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Komunitas Difabel Daksa Temanggung
        </h1>
        <p className="text-lg md:text-xl">
          Bersama saling membantu meningkatkan potensi 🌱
        </p>
        <a
          href="#umkm"
          className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Lihat Potensi UMKM
        </a>
      </div>

      {/* Ilustrasi */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img
          src="/hero-illustration.png"
          alt="Komunitas Difabel Daksa"
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
