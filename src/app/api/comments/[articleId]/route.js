import prisma from "@/lib/prisma";

export async function GET(_, { params }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { articleId: Number(params.articleId) },
    });
    return Response.json(comments);
  } catch (error) {
    return Response.json({ error: "Gagal mengambil komentar" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { articleId, author, text } = body;

    if (!articleId || !author || !text) {
      return Response.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        articleId: Number(articleId),
        author,
        text,
      },
    });

    return Response.json(comment);
  } catch (error) {
    console.error("Error tambah komentar:", error);
    return Response.json(
      { error: "Gagal menambahkan komentar" },
      { status: 500 }
    );
  }
}
