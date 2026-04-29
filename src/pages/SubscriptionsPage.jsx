import { useState } from 'react'
import PricingCard from '../components/PricingCard'

const PLANS = [
  { name: 'Basic Plan', monthlyPrice: 9.99, description: 'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.', featured: false },
  { name: 'Standard Plan', monthlyPrice: 12.99, description: 'Access to a wider selection of movies and shows, including most new releases and exclusive content.', featured: true },
  { name: 'Premium Plan', monthlyPrice: 14.99, description: 'Access to a widest selection of movies and shows, including all new releases and Offline Viewing.', featured: false },
]

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="bg-background font-body-md text-on-surface antialiased pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 mb-section-gap">
        <div className="flex flex-col gap-4 max-w-4xl">
          <h1 className="font-headline-xl text-white">Choose the plan that's right for you</h1>
          <p className="font-body-lg text-gray-400">Join CineHub and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
        </div>
        
        {/* Plan Toggle */}
        <div className="mt-12 flex justify-end">
          <div className="inline-flex p-1.5 bg-[#1A1A1A] border border-white/10 rounded-lg">
            <button 
              onClick={() => setIsYearly(false)} 
              className={`px-6 py-2 rounded-md font-label-md transition-colors ${!isYearly ? 'bg-[#262626] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)} 
              className={`px-6 py-2 rounded-md font-label-md transition-colors ${isYearly ? 'bg-[#262626] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {PLANS.map((p) => <PricingCard key={p.name} plan={p} isYearly={isYearly} />)}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 mb-section-gap">
        <div className="flex flex-col gap-4 max-w-4xl mb-16">
          <h2 className="font-headline-xl text-white">Compare our plans and find the right one for you</h2>
          <p className="font-body-lg text-gray-400">Streamline your decision-making process with our comprehensive plan comparison chart. Explore the features and benefits of each tier and choose the perfect subscription for your entertainment needs.</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1A1A1A]">
              <tr>
                <th className="p-8 font-label-md text-white border-b border-white/10 w-1/4">Features</th>
                <th className="p-8 font-label-md text-white border-b border-white/10">Basic</th>
                <th className="p-8 font-label-md text-white border-b border-white/10">Standard <span className="ml-2 px-3 py-1 bg-primary-container text-[10px] rounded uppercase font-bold text-white">Popular</span></th>
                <th className="p-8 font-label-md text-white border-b border-white/10">Premium</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-gray-400">
              <tr className="border-b border-white/10">
                <td className="p-8">Price</td>
                <td className="p-8">$9.99/Month</td>
                <td className="p-8">$12.99/Month</td>
                <td className="p-8">$14.99/Month</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">Content</td>
                <td className="p-8">Access to a wide selection of movies and shows, including recently released titles.</td>
                <td className="p-8">Access to a wider selection of movies and shows, including most new releases and exclusive content.</td>
                <td className="p-8">Access to a widest selection of movies and shows, including all new releases and Offline Viewing.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">Devices</td>
                <td className="p-8">Watch on 1 device at a time</td>
                <td className="p-8">Watch on 2 devices at a time</td>
                <td className="p-8">Watch on 4 devices at a time</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">Free Trial</td>
                <td className="p-8">7 Days</td>
                <td className="p-8">7 Days</td>
                <td className="p-8">7 Days</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">Cancel Anytime</td>
                <td className="p-8">Yes</td>
                <td className="p-8">Yes</td>
                <td className="p-8">Yes</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">HDR</td>
                <td className="p-8">No</td>
                <td className="p-8">Yes</td>
                <td className="p-8">Yes</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-8">Dolby Atmos</td>
                <td className="p-8">No</td>
                <td className="p-8">No</td>
                <td className="p-8">Yes</td>
              </tr>
              <tr>
                <td className="p-8">Ad-free</td>
                <td className="p-8">No</td>
                <td className="p-8">Yes</td>
                <td className="p-8">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Banner (Different style for this page) */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20">
        <div className="relative overflow-hidden rounded-2xl h-[320px] flex items-center px-12 md:px-24">
          <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40" style={{ backgroundImage: "url('https://picsum.photos/seed/subs-cta/1400/400')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-white mb-4">Start your free trial today!</h2>
              <p className="font-body-lg text-gray-400">This is a clear and concise call to action that encourages users to sign up for a free trial of CineHub.</p>
            </div>
            <button onClick={() => window.scrollTo(0, 0)} className="bg-primary-container text-white px-10 py-5 rounded-lg font-label-md hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-xl uppercase tracking-widest whitespace-nowrap">Start Free Trial</button>
          </div>
        </div>
      </section>
    </div>
  )
}
