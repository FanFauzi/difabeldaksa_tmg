import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { articleId, author, text } = body;

    const comment = await prisma.comment.create({
      data: {
        articleId,
        author,
        text,
      },
    });

    return Response.json(comment);
  } catch (error) {
    return Response.json({ error: "Gagal menambahkan komentar" }, { status: 500 });
  }
}
