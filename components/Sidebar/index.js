// Components
import ItemPositiveSidebar from './ItemPositiveSidebar'
import ItemNegativeSidebar from './ItemNegativeSidebar'
import { useEffect, useState } from 'react'

export default function Sidebar ({data}) {
  const [sortBy, setSortBy] = useState("TopGainers")

  return (
    <div className="bg-black bg-opacity-30">
      <div className="grid grid-cols-2 font-medium">
        <button className={`focus:outline-none focus:text-white py-3 px-4 border-b-2 border-gray-800 hover:text-gray-200 ${sortBy == "TopGainers" && 'text-white border-teal-400'}`} onClick={() => setSortBy("TopGainers")}>Top <span className="font-semibold">Gainers</span></button>
        <button className={`focus:outline-none focus:text-white py-3 px-4 border-b-2 border-gray-800 hover:text-gray-200 ${sortBy == "TopLosers" && 'text-white border-red-400'}`} onClick={() => setSortBy("TopLosers")}>Top <span className="font-semibold">Losers</span></button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {
          sortBy == "TopGainers" &&
            data.sort((a,b) => {return b.market_cap_change_24h - a.market_cap_change_24h}).slice(0, 6).map((cat, index) => (
              <ItemPositiveSidebar cat={cat} index={index} />
            ))
        }
        {
          sortBy == "TopLosers" &&
            data.sort((a,b) => {return a.market_cap_change_24h - b.market_cap_change_24h}).slice(0, 6).map((cat, index) => (
              <ItemNegativeSidebar cat={cat} index={index} />
            ))
        }
      </div>
    </div>
  )
}