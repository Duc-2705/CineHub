export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-xs ${i < Math.round(rating) ? 'text-red-600' : 'text-gray-600'}`}
          style={i < Math.round(rating) ? { fontVariationSettings: "'FILL' 1" } : {}}
        >star</span>
      ))}
    </div>
  )
}
