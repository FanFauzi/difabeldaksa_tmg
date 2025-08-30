"use client";

import Image from "next/image";

export default function BeritaCard({ title, desc, image, createdAt }) {
  let formattedDate = "Tanggal tidak valid";

  if (createdAt) {
    const parsedDate = new Date(createdAt);
    if (!isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  return (
    <div className="rounded-lg shadow-md bg-white hover:shadow-lg transition p-4">
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="rounded-md object-cover w-full h-48"
        />
      )}
      <h3 className="mt-4 font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{formattedDate}</p>
      {desc && <p className="mt-2 text-gray-700 line-clamp-3">{desc}</p>}
    </div>
  );
}