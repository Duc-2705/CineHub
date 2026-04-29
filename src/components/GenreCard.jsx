import { useNavigate } from 'react-router-dom'

export default function GenreCard({ genre }) {
  const navigate = useNavigate()
  return (
    <div
      className="group bg-surface-container p-6 rounded-xl border border-white/5 hover:border-red-600/30 transition-all cursor-pointer"
      onClick={() => navigate(`/movies?genre=${genre.name}`)}
    >
      <div className="grid grid-cols-2 gap-2 mb-4">
        {genre.images.map((src, i) => (
          <div key={i} className="aspect-[2/3] bg-surface-container-highest rounded-md overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={src} alt={genre.name} />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-white">{genre.name}</span>
        <span className="material-symbols-outlined text-gray-500 group-hover:text-red-600 transition-colors">arrow_forward</span>
      </div>
    </div>
  )
}
