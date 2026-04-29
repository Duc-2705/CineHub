import { useState } from 'react'

const POSTERS = [
  'https://picsum.photos/seed/supp1/200/300',
  'https://picsum.photos/seed/supp2/200/300',
  'https://picsum.photos/seed/supp3/200/300',
  'https://picsum.photos/seed/supp4/200/300',
  'https://picsum.photos/seed/supp5/200/300',
  'https://picsum.photos/seed/supp6/200/300',
]

const FAQS = [
  { q: 'What is CineHub?', a: 'CineHub is a streaming service that allows you to watch movies and shows on your favorite devices. We offer a wide range of content from around the world.' },
  { q: 'How much does CineHub cost?', a: 'We have multiple subscription plans starting as low as $9.99/month. You can choose the one that fits your viewing needs and budget best.' },
  { q: 'What devices can I use to watch?', a: 'CineHub is available on web browsers, iOS and Android devices, Smart TVs, and popular streaming sticks like Roku and Fire TV.' },
  { q: 'How do I cancel my subscription?', a: 'You can cancel your subscription at any time through your account settings. There are no cancellation fees or long-term commitments.' },
]

export default function SupportPage() {
  const [toast, setToast] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast(true)
    setTimeout(() => setToast(false), 3000)
    e.target.reset()
  }

  return (
    <div className="bg-background font-body-md text-on-surface antialiased pt-32 px-10 md:px-20 max-w-[1440px] mx-auto">
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600/90 border border-green-400 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-bold">
          Message sent successfully!
        </div>
      )}

      {/* Hero & Support Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-[120px]">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <h1 className="font-headline-xl text-white">Welcome to our support page!</h1>
            <p className="text-gray-400 font-body-lg">We're here to help you with any problems you may be having with our service. Whether you're having trouble logging in, finding a movie, or anything else, our team is ready to assist you.</p>
          </div>
          {/* Posters Grid Decor */}
          <div className="grid grid-cols-3 gap-3 rounded-xl overflow-hidden border border-white/5 p-4 bg-surface-container-low">
            {POSTERS.map((src, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-surface-container-highest overflow-hidden">
                <img className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" src={src} alt="Movie poster" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Contact Form */}
        <div className="lg:col-span-7 bg-[#1A1A1A] rounded-xl p-10 border border-white/10 shadow-2xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-white">First Name</label>
                <input required className="bg-[#131313] border border-white/10 rounded-lg py-4 px-6 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="Enter First Name" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-white">Last Name</label>
                <input required className="bg-[#131313] border border-white/10 rounded-lg py-4 px-6 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="Enter Last Name" type="text" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-white">Email</label>
                <input required className="bg-[#131313] border border-white/10 rounded-lg py-4 px-6 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="Enter your Email" type="email" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-white">Phone Number</label>
                <div className="flex gap-2">
                  <select className="bg-[#131313] border border-white/10 rounded-lg py-4 px-3 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none text-gray-400">
                    <option>🇺🇸 +1</option>
                    <option>🇬🇧 +44</option>
                    <option>🇮🇳 +91</option>
                  </select>
                  <input required className="flex-1 bg-[#131313] border border-white/10 rounded-lg py-4 px-6 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="Enter Phone Number" type="tel" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-white">Message</label>
              <textarea required className="bg-[#131313] border border-white/10 rounded-lg py-4 px-6 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-gray-600 resize-none text-white" placeholder="Enter your Message" rows="4"></textarea>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <input required className="rounded bg-[#131313] border-white/10 text-red-600 focus:ring-red-600 cursor-pointer" type="checkbox" />
                <span>I agree with Terms of Use and Privacy Policy</span>
              </div>
              <button className="bg-primary-container text-white px-10 py-4 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-red-600/20" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-headline-lg text-white">Frequently Asked Questions</h2>
            <p className="text-gray-400 font-body-md">Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about CineHub.</p>
          </div>
          <button className="bg-primary-container text-white px-8 py-4 rounded-lg font-bold hover:brightness-110 transition-all">Ask a Question</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-white/10 pt-12">
          {FAQS.map((f, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl border border-white/5">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="space-y-3">
                <h3 className="font-headline-md text-white">{f.q}</h3>
                <p className="text-gray-400 font-body-md leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trial Banner */}
      <section className="mb-[120px] relative overflow-hidden rounded-2xl bg-[#0F0F0F] border border-white/10 p-12 md:p-20 group">
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <img className="w-full h-full object-cover" src="https://picsum.photos/seed/supp-cta/1400/400" alt="Theater" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-headline-xl text-white">Start your free trial today!</h2>
            <p className="text-gray-400 font-body-lg max-w-xl">Join over 10 million movie buffs who already enjoy the CineHub experience. No hidden fees, no contracts, just entertainment.</p>
          </div>
          <button className="bg-primary-container text-white px-12 py-5 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-red-600/30 whitespace-nowrap">Start a Free Trial</button>
        </div>
      </section>
    </div>
  )
}
