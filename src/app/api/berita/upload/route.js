import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400 });
    }

    // convert jadi buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // simpan di folder public/uploads
    const filePath = path.join(process.cwd(), "public", "images", "article", file.name);
    await writeFile(filePath, buffer);

    const imageUrl = `/images/article/${file.name}`;

    return Response.json({ imageUrl }, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Upload failed" }), { status: 500 });
  }
}
