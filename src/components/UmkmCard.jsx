export default function UmkmCard({ title, desc, image }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden text-center flex flex-col items-center">
      {image && (
        <img src={image} alt={title} className="w-50 object-cover" />
      )}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-orange-600">{title}</h3>
        <p className="text-gray-700 text-sm">{desc}</p>
      </div>
    </div>
  );
}
