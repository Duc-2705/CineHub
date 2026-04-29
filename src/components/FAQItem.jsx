import { useState } from 'react'

export default function FAQItem({ number, question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 pb-6">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-4">
          <span className="bg-surface-container px-4 py-2 rounded-lg text-white font-bold border border-white/5">
            {String(number).padStart(2, '0')}
          </span>
          <h4 className="font-headline-md text-white text-lg">{question}</h4>
        </div>
        <span className="material-symbols-outlined text-white">{open ? 'remove' : 'add'}</span>
      </div>
      {open && answer && (
        <div className="mt-4 pl-16 text-gray-400 font-body-md">{answer}</div>
      )}
    </div>
  )
}
