var numeral = require('numeral');

export default function ItemNegative({ cat, index }) {
  return (
    <div key={index} className="group transition bg-black bg-opacity-25 rounded border border-red-900 hover:border-red-600 hover:shadow-lg overflow-hidden">
      <header className="py-2 px-4 bg-black bg-opacity-25 flex justify-between items-center">
        <h1 className="font-semibold text-white">{cat.name}</h1>
        <span className="rounded-full h-3 w-3 bg-red-600 border-2 border-red-400 opacity-50 group-hover:opacity-100 group-hover:animate-pulse transition" />
      </header>
      <div className="grid grid-cols-3 gap-2 py-2 px-4">
        <div>
          <label className="text-xs">Market Cap</label>
          <span className="text-xs text-gray-200 truncate block">{numeral(cat.market_cap).format('$0,0.00')}</span>
        </div>
        <div>
          <label className="text-xs">Market Cap Change</label>
          <span className="text-xs text-red-400 truncate flex gap-1 items-center bg-red-900 bg-opacity-20 rounded">
            <svg viewBox="0 0 140 140" className="stroke-current h-3 w-3" xmlns="http://www.w3.org/2000/svg">
              <path d="M115.016 114.91L23.333 23.323m93.334.011v87.5a5.833 5.833 0 01-5.834 5.834h-87.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.83333"/>
            </svg>
            {numeral(cat.market_cap_change_24h).format('$0,0.00')}
          </span>
        </div>
        <div>
          <label className="text-xs">Volume 24h</label>
          <span className="text-xs text-gray-200 truncate block">{numeral(cat.volume_24h).format('$0,0.00')}</span>
        </div>
      </div>
    </div>
  )
}