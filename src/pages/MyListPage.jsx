import movies from '../data/movies.json'
import { useMyList } from '../hooks/useMyList'
import MovieCard from '../components/MovieCard'

export default function MyListPage() {
  const { list } = useMyList()
  const saved = movies.filter((m) => list.includes(m.id))
  return (
    <div className="pt-28 min-h-screen max-w-[1440px] mx-auto px-10 md:px-20 pb-24">
      <h1 className="font-headline-lg text-white mb-10">My List</h1>
      {saved.length === 0 ? (
        <p className="text-gray-400">You haven't saved anything yet. Browse movies and click the bookmark icon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
          {saved.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  )
}
