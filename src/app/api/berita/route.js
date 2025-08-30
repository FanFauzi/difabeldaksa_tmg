import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  // console.log("articles", articles);
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        comments: true
      }
    });
    return Response.json(articles);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, desc, image, authorId } = await req.json();
    const newArticle = await prisma.article.create({
      data: { title, desc, image, authorId }
    });
    return Response.json(newArticle);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Cari artikel dulu buat tau path gambar
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return new Response(JSON.stringify({ error: "Artikel tidak ditemukan" }), { status: 404 });
    }

    // Hapus artikel di database
    await prisma.article.delete({ where: { id } });

    (article.image);

    // Kalau ada gambar, hapus file di folder public
    if (article.image) {
      // remove leading slash biar path.join ga error
      const relativePath = article.image.startsWith("/") ? article.image.slice(1) : article.image;
      const filePath = path.join(process.cwd(), "public", relativePath);

      try {
        await fs.promises.unlink(filePath);
        console.log("Gambar terhapus:", filePath);
      } catch (err) {
        console.error("Gagal hapus gambar:", err.message);
      }
    }

    return new Response(JSON.stringify({ message: "Artikel & gambar dihapus" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// UPDATE
export async function PUT(req) {
  try {
    const { id, title, desc, image } = await req.json();
    const updated = await prisma.article.update({
      where: { id },
      data: { title, desc, image },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
