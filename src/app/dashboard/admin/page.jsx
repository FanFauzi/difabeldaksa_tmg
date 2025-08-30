"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
// import DashboardNavbar from "@/components/DashboardNavbar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editArticle, setEditArticle] = useState(null); // jika edit
  const [form, setForm] = useState({ title: "", desc: "", image: "" });

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoadingUsers(false);
  };

  const fetchArticles = async () => {
    setLoadingArticles(true);
    const res = await fetch("/api/berita");
    const data = await res.json();
    setArticles(data);
    setLoadingArticles(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
  }, []);

  // Delete article
  const deleteArticle = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch("/api/berita", { method: "DELETE", body: JSON.stringify({ id }) });
    fetchArticles();
  };

  // Open modal untuk tambah atau edit
  const openModal = (article = null) => {
    if (article) {
      setEditArticle(article);
      setForm({ title: article.title, desc: article.desc, image: article.image || "" });
    } else {
      setEditArticle(null);
      setForm({ title: "", desc: "", image: "" });
    }
    setModalOpen(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    const body = { ...form, authorId: user.id };
    const url = "/api/berita";
    const method = editArticle ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editArticle ? { ...body, id: editArticle.id } : body),
    });

    if (res.ok) {
      setModalOpen(false);
      setEditArticle(null);
      setForm({ title: "", desc: "", image: "" });
      fetchArticles();
    } else {
      const data = await res.json();
      alert(data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      {/* <DashboardNavbar role="admin" /> */}
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Halaman Admin</h1>

        {/* Artikel */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Manajemen Artikel</h2>
            <button
              onClick={() => openModal()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Tambah Artikel
            </button>
          </div>

          {loadingArticles ? (
            <p>Loading articles...</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Author</th>
                  <th className="p-2 border">Created At</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id}>
                    <td className="p-2 border">{a.id}</td>
                    <td className="p-2 border">{a.title}</td>
                    <td className="p-2 border">{a.author.name}</td>
                    <td className="p-2 border">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => openModal(a)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteArticle(a.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-700 p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">{editArticle ? "Edit Artikel" : "Tambah Artikel"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Deskripsi"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("image", file);

                  const res = await fetch("/api/berita/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();
                  if (res.ok) {
                    setForm({ ...form, image: data.imageUrl });
                  } else {
                    alert(data.message || "Upload gagal");
                  }
                }}
              />

              {/* Tampilkan preview */}
              {form.image && <img src={form.image} alt="preview" className="mt-2 w-full h-48 object-cover rounded" />}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editArticle ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
