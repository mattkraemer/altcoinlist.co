import Head from 'next/head'
import useSWR from 'swr'

var numeral = require('numeral');

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/categories', fetcher)

  return (
    <>
      <header className="flex justify-between items-center h-12 px-4">
        <a href="#" className="text-white">
          <span className="font-medium">altcoin</span>deck
        </a>
        <div>
          <span>Last Update: {new Date().getTime()}</span>
        </div>
      </header>
      {
        error &&
        <div className="flex">
          <div className="m-auto my-20 text-black text-opacity-50 bg-black bg-opacity-10 rounded-xl p-12">
            <svg className="h-24 w-24 stroke-current text mx-auto mb-4" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4.142 67.742l16.257 24.22 18.696-22.388m96.722 23.27l-16.251-24.227-18.702 22.395" stroke-width="5.83333"/>
                <path d="M119.35 68.833a50.277 50.277 0 01-37.97 56.741 49.583 49.583 0 01-46.258-12.967m-14.705-20.79a51.642 51.642 0 0138.15-62.726 49.583 49.583 0 0148.562 15.4m-40.069-.764v40.716" stroke-width="5.83333"/>
                <path d="M67.083 97.568a1.458 1.458 0 11-1.458 1.459 1.458 1.458 0 011.458-1.459" stroke-width="5.83333"/>
              </g>
            </svg>
            <h1 className="text-xl xl:text-4xl font-semibold">Failed to load</h1>
          </div>
        </div>
      }
      {
        !data &&
        <div className="flex">
          <div className="m-auto my-20 text-black text-opacity-50 bg-black bg-opacity-10 rounded-xl p-12">
            <svg className="h-24 w-24 stroke-current text mx-auto mb-4 animate-spin" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
              <path d="M102.083 43.738a17.5 17.5 0 1035 0 17.5 17.5 0 10-35 0zM64.167 20.405a14.583 14.583 0 1029.166 0 14.583 14.583 0 10-29.166 0zM23.333 32.072a14.583 14.583 0 1029.167 0 14.583 14.583 0 10-29.167 0zm-17.5 35a11.667 11.667 0 1023.334 0 11.667 11.667 0 10-23.334 0zm8.75 35a11.667 11.667 0 1023.334 0 11.667 11.667 0 10-23.334 0zm32.084 23.333a8.75 8.75 0 1017.5 0 8.75 8.75 0 10-17.5 0zm34.27.852a5.833 5.833 0 1011.667 0 5.833 5.833 0 10-11.667 0z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.83333"/>
            </svg>
            <h1 className="text-xl xl:text-4xl font-semibold">Loading...</h1>
          </div>
        </div>
      }
      {
        data &&
          <section className="grid grid-cols-3 2xl:grid-cols-4 gap-2 p-2">
          {
            data.map((cat, index) => (
              <div key={index} className="group transition bg-black bg-opacity-25 rounded border border-gray-800 hover:border-teal-900 hover:shadow-lg overflow-hidden">
                <header className="py-2 px-4 bg-black bg-opacity-25 flex justify-between items-center">
                  <h1 className="font-semibold text-white">{cat.name}</h1>
                  <span className="rounded-full h-3 w-3 bg-teal-600 border-2 border-teal-400 opacity-50 group-hover:opacity-100 group-hover:animate-pulse" />
                </header>
                <div className="grid grid-cols-3 gap-2 py-2 px-4">
                  <div>
                    <label className="text-xs">Market Cap</label>
                    <span className="text-xs text-gray-200 truncate block">{numeral(cat.market_cap).format('$0,0.00')}</span>
                  </div>
                  <div>
                    <label className="text-xs">Market Cap Change</label>
                    {
                      cat.market_cap_change_24h >= 0 ?
                      <span className="text-xs text-teal-400 truncate flex gap-1 items-center">
                        <svg viewBox="0 0 140 140" className="stroke-current h-3 w-3" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M124.08 21.875l-15.86 61.28a46.667 46.667 0 01-45.18 34.97H2.918" stroke-width="5.83333"/>
                            <path d="M103.023 34.877l21.058-13.002 13.002 21.058" stroke-width="5.83333"/>
                          </g>
                        </svg>
                        {numeral(cat.market_cap_change_24h).format('$0,0.00')}
                      </span>
                      :
                      <span className="text-xs text-red-400 truncate flex gap-1 items-center">
                        <svg viewBox="0 0 140 140" className="stroke-current h-3 w-3" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M124.08 21.875l-15.86 61.28a46.667 46.667 0 01-45.18 34.97H2.918" stroke-width="5.83333"/>
                            <path d="M103.023 34.877l21.058-13.002 13.002 21.058" stroke-width="5.83333"/>
                          </g>
                        </svg>
                        {numeral(cat.market_cap_change_24h).format('$0,0.00')}
                      </span>
                    }
                  </div>
                  <div>
                    <label className="text-xs">Volume 24h</label>
                    <span className="text-xs text-gray-200 truncate block">{numeral(cat.volume_24h).format('$0,0.00')}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      }
    </>
  )
}
