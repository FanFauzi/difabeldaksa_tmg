import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: { author: true, comments: true },
    });
    if (!article) {
      return Response.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
    }
    return Response.json(article);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { title, desc, image } = await req.json();
    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: { title, desc, image },
    });
    return Response.json(updatedArticle);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await prisma.article.delete({
      where: { id: Number(id) },
    });
    return Response.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
