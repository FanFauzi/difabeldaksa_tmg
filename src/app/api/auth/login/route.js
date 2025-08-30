import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log(email, password);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ message: "Email atau password salah" }), { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    console.log(await bcrypt.compare(password, user.password));

    if (!isValid) {
      return new Response(JSON.stringify({ message: "Email atau password salah" }), { status: 401 });
    }
    
    return new Response(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan" }), { status: 500 });
  }
}
