import Image from "next/image";

export default function UmkmCard({ title, desc, image }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden text-center flex flex-col items-center">
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
      )}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-orange-600">{title}</h3>
        <p className="text-gray-700 text-sm">{desc}</p>
      </div>
    </div>
  );
}
