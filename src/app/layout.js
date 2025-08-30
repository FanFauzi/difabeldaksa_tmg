import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Komunitas Difabel Daksa Temanggung",
  description: "Bersama saling membantu meningkatkan potensi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        {/* <Navbar /> */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
