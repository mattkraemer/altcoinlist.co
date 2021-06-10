import Head from 'next/head'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/categories', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  if (data) return (
    <>
      <header className="flex justify-between items-center h-12 px-4">
        <a href="#" className="text-white">
          <span className="font-medium">altcoin</span>deck
        </a>
        <div>
          <span>Last Update: {new Date().getTime()}</span>
        </div>
      </header>
      <section className="grid grid-cols-3 gap-2 p-2">
        {
          data.map((cat, index) => (
            <div key={index} className="transition bg-black bg-opacity-25 rounded border border-gray-800 hover:shadow-lg">
              <header className="py-2 px-4 bg-black bg-opacity-25">
                <h1 className="font-semibold text-white">{cat.name}</h1>
              </header>
              <div className="grid grid-cols-3 gap-2 py-2 px-4">
                <div>
                  <label className="text-xs">Market Cap</label>
                  <span className="text-xs text-gray-200 truncate block">{cat.market_cap}</span>
                </div>
                <div>
                  <label className="text-xs">Market Cap Change</label>
                  <span className="text-xs text-gray-200 truncate block">{cat.market_cap_change_24h}</span>
                </div>
                <div>
                  <label className="text-xs">Volume 24h</label>
                  <span className="text-xs text-gray-200 truncate block">{cat.volume_24h}</span>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </>
  )
}
