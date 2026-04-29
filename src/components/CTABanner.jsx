export default function CTABanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap">
      <div className="relative w-full rounded-[2rem] overflow-hidden p-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <img
          alt="Cinema banner"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrIjGdDVlrhFgWQSiMl8W37Gjd32JdirMdUZzCzAP-kIio0qjmfnP45kTFVzoe_P9aCYu19Fcb7CwHAMrZ28VQ6b6HnX936AM5o0bzmeoHullhl_6d8yFoFUhNLDnzvpmp9sd7pr53kg8pLccPRIO6uscdOW17ITMsTytNPbT0D8erUbBVJrOi7ipLxMuZfIin4u0e_uFzg4SIybgBZdq54Z55DWwqi4N6qZOwbt9kniOuSxxjK4vLxgGywA23h0gnFjZqaCAHg4E"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-headline-xl text-white mb-4">Start your free trial today!</h2>
          <p className="font-body-lg text-gray-300">This is a clear and concise call to action that encourages users to sign up for a free trial of CineHub.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button className="bg-primary-container text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-red-600/20">
            Start a Free Trial
          </button>
        </div>
      </div>
    </section>
  )
}
