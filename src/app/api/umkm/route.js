export async function GET() {
  // console.log("articles", articles);
  try {
    const articles = await prisma.umkm.findMany({
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