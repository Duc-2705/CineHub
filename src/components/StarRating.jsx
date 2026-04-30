import { useState } from 'react'

export default function StarRating({ rating, max = 5, onRatingChange = null, size = "text-xs" }) {
  const [hoverRating, setHoverRating] = useState(0)

  const isInteractive = typeof onRatingChange === 'function'

  const handleMouseEnter = (index) => {
    if (isInteractive) setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (isInteractive) setHoverRating(0)
  }

  const handleClick = (index) => {
    if (isInteractive) onRatingChange(index)
  }

  const displayRating = hoverRating > 0 ? hoverRating : rating

  return (
    <div className="flex gap-0.5" onMouseLeave={handleMouseLeave}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const active = starValue <= Math.round(displayRating);
        return (
          <span
            key={i}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
            className={`material-symbols-outlined ${size} ${active ? 'text-red-600' : 'text-gray-600'} ${isInteractive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            star
          </span>
        )
      })}
    </div>
  )
}
