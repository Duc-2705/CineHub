import { useState, useEffect } from 'react'

const KEY = 'cinehub_mylist'

export function useMyList() {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(list))
  }, [list])

  const addToList = (id) => setList((prev) => prev.includes(id) ? prev : [...prev, id])
  const removeFromList = (id) => setList((prev) => prev.filter((i) => i !== id))
  const isInList = (id) => list.includes(id)
  const toggleList = (id) => isInList(id) ? removeFromList(id) : addToList(id)

  return { list, addToList, removeFromList, isInList, toggleList }
}
