import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200">
      {/* Kerjasama */}
      <div className="px-6 py-8 text-center">
        <h3 className="text-lg font-semibold text-orange-400 mb-4">
          Kerjasama :
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <Image
            src="/logo/logo-rfm.png"
            alt="RFM"
            width={80}
            height={80}
            className="object-contain"
            style={{ height: "auto" }}
          />
          <Image
            src="/logo/logo-unimma.png"
            alt="UNIMMA"
            width={120}
            height={80}
            className="object-contain"
            style={{ height: "auto" }}
          />
          <Image
            src="/logo/logo-kddt.png"
            alt="KDDT"
            width={80}
            height={80}
            className="object-contain"
            style={{ height: "auto" }}
          />
          <Image
            src="/logo/logo-kemdikbud.png"
            alt="Kemdikbud"
            width={100}
            height={80}
            className="object-contain"
            style={{ height: "auto" }}
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} difabeldaksatmg.com | Powered
          by difabeldaksatmg.com
        </p>
        {/* <div className="flex gap-4 mt-3 md:mt-0">
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/icon-facebook.png"
              alt="Facebook"
              width={24}
              height={24}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/icon-instagram.png"
              alt="Instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="https://linkedin.com" target="_blank">
            <Image
              src="/icon-linkedin.png"
              alt="LinkedIn"
              width={24}
              height={24}
            />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image
              src="/icon-youtube.png"
              alt="YouTube"
              width={24}
              height={24}
            />
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
