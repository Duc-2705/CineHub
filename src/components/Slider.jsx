import { useState, useEffect } from 'react';

export default function Slider({ items, renderItem, itemsPerPage = 4 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when items change (e.g. genre filter changes)
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const maxIndex = Math.max(0, items.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerPage, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === maxIndex;

  // We use responsive itemsPerPage depending on screen size, 
  // but since we don't have a reliable way to check breakpoint in JS without a listener,
  // we can use standard CSS variables or stick to the desktop view behavior.
  // Assuming desktop itemsPerPage = 4.
  const slideWidth = 100 / itemsPerPage;

  return (
    <div className="relative group">
      {items.length > itemsPerPage && (
        <>
          <button 
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-surface-container p-2 rounded-full border border-white/10 transition-colors flex items-center justify-center text-white
              ${isPrevDisabled ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            onClick={nextSlide}
            disabled={isNextDisabled}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-surface-container p-2 rounded-full border border-white/10 transition-colors flex items-center justify-center text-white
              ${isNextDisabled ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </>
      )}
      
      <div className="overflow-hidden">
        <div className="-mx-3">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
          >
            {items.map((item, index) => (
              <div 
                key={item.id || index} 
                className="px-3"
                style={{ flex: `0 0 ${slideWidth}%` }}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
