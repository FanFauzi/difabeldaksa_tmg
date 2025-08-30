import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    // cek email sudah ada
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ message: "Email sudah terdaftar" }), { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
    });

    return new Response(JSON.stringify({ message: "User berhasil dibuat", user: { id: user.id, email: user.email, role: user.role } }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan" }), { status: 500 });
  }
}
