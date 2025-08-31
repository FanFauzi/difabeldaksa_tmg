"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BeritaCard from "@/components/BeritaCard";
import Navbar from "@/components/Navbar";

export default function DetailBerita() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [berita, setBerita] = useState(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // Cek login
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      alert("Silakan login terlebih dahulu");
      router.push("/login");
      return;
    }
    setAuthor(loggedUser.name);

    // Fetch berita
    fetch(`/api/berita/${id}`)
      .then((res) => res.json())
      .then(setBerita);
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) return alert("Silakan login terlebih dahulu");

    const res = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: id, author: loggedUser.name, text: comment }),
    });

    if (!res.ok) {
      const data = await res.json();
      return alert(data.message || "Gagal mengirim komentar");
    }

    const newComment = await res.json();
    setBerita({
      ...berita,
      comments: [...berita.comments, newComment],
    });
    setComment("");
  };

  if (!berita) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <button
          onClick={() => router.push("/berita")}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Kembali
        </button>

        <BeritaCard {...berita} />

        <h2 className="text-2xl font-semibold my-4">Komentar</h2>
        <ul className="mb-4 space-y-2">
          {berita.comments.map((c) => (
            <li key={c.id} className="border p-2 rounded-lg">
              <span className="font-semibold">{c.author}:</span> {c.text}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            placeholder="Tulis komentar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Kirim
          </button>
        </form>
      </div>
    </>
  );
}
