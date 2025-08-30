import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return new Response(JSON.stringify(users));
}

export async function POST(req) {
  const { name, email, password, role } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new Response(JSON.stringify({ message: "Email sudah ada" }), { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashedPassword, role } });

  return new Response(JSON.stringify(user), { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.user.delete({ where: { id } });
  return new Response(JSON.stringify({ message: "User dihapus" }), { status: 200 });
}
