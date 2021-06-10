var numeral = require('numeral');

export default function ItemNegative({ cat, index }) {
  return (
    <div key={index} className="group transition bg-black bg-opacity-25 rounded overflow-hidden">
      <div className="text-red-100 bg-gradient-to-tr from-red-800 to-red-600 px-4 pt-6 pb-4 border-t-2 border-red-400">
        <svg viewBox="0 0 140 140" className="stroke-current h-5 w-5 transform" xmlns="http://www.w3.org/2000/svg">
          <path d="M115.016 114.91L23.333 23.323m93.334.011v87.5a5.833 5.833 0 01-5.834 5.834h-87.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.83333"/>
        </svg>
        <span className="text-2xl font-medium">{cat.market_cap_change_24h.toFixed(2)} %</span>
      </div>
      <div className="py-2 px-4 bg-black bg-opacity-25">
        <h1 className="font-semibold text-white">{cat.name}</h1>
      </div>
      <div className="grid gap-2 py-2 px-4">
        <div>
          <label className="text-xs">Market Cap</label>
          <span className="text-xs text-gray-200 truncate block">{numeral(cat.market_cap).format('$0,0.00')}</span>
        </div>
        <div>
          <label className="text-xs">Volume 24h</label>
          <span className="text-xs text-gray-200 truncate block">{numeral(cat.volume_24h).format('$0,0.00')}</span>
        </div>
      </div>
    </div>
  )
}