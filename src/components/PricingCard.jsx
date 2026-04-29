export default function PricingCard({ plan, isYearly }) {
  const price = isYearly
    ? (plan.monthlyPrice * 0.8).toFixed(2)
    : plan.monthlyPrice.toFixed(2)

  return (
    <div className={`p-10 bg-surface-container-low border border-white/10 rounded-2xl flex flex-col hover:border-red-600/20 transition-all ${plan.featured ? 'scale-105 z-10 shadow-2xl shadow-black' : ''}`}>
      <h3 className="font-headline-md text-white mb-2">{plan.name}</h3>
      <p className="text-gray-400 font-body-md mb-8">{plan.description}</p>
      <div className="mb-10">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-500">/{isYearly ? 'mo, billed yearly' : 'month'}</span>
      </div>
      <div className="flex flex-col gap-4 mb-12 mt-auto">
        <button className="w-full py-4 rounded-lg border border-white/10 font-bold text-white hover:bg-white/5 transition-colors">
          Start Free Trial
        </button>
        <button className="w-full py-4 rounded-lg bg-primary-container font-bold text-white hover:bg-red-700 transition-colors">
          Choose Plan
        </button>
      </div>
    </div>
  )
}
