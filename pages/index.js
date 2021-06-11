import Head from 'next/head'
import useSWR from 'swr'

// Components
import Sidebar from '../components/Sidebar';
import ItemPositive from '../components/ItemPositive';
import ItemNegative from '../components/ItemNegative';

async function getStaticProps() {
  // `getStaticProps` is invoked on the server-side,
  // so this `fetcher` function will be executed on the server-side.
  const posts = await fetcher('https://api.coingecko.com/api/v3/coins/categories')
  return { props: { posts } }
}

export default function Home(props) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/categories', fetcher, { initialData: props.posts })

  return (
    <div className="container mx-auto">
      {
        (!data && error) &&
        <div className="flex">
          <div className="m-auto my-20 text-gray-400 text-opacity-50 bg-black bg-opacity-10 rounded-xl p-12">
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
        (!data && !error) &&
        <div className="flex">
          <div className="m-auto my-20 text-gray-44 text-opacity-50 bg-black bg-opacity-10 rounded-xl p-12">
            <svg className="h-24 w-24 stroke-current text mx-auto mb-4 animate-spin" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
              <path d="M102.083 43.738a17.5 17.5 0 1035 0 17.5 17.5 0 10-35 0zM64.167 20.405a14.583 14.583 0 1029.166 0 14.583 14.583 0 10-29.166 0zM23.333 32.072a14.583 14.583 0 1029.167 0 14.583 14.583 0 10-29.167 0zm-17.5 35a11.667 11.667 0 1023.334 0 11.667 11.667 0 10-23.334 0zm8.75 35a11.667 11.667 0 1023.334 0 11.667 11.667 0 10-23.334 0zm32.084 23.333a8.75 8.75 0 1017.5 0 8.75 8.75 0 10-17.5 0zm34.27.852a5.833 5.833 0 1011.667 0 5.833 5.833 0 10-11.667 0z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.83333"/>
            </svg>
            <h1 className="text-xl xl:text-4xl font-semibold">Loading...</h1>
          </div>
        </div>
      }
      {
        (data && !error) &&
          <div className="grid grid-cols-3 2xl:grid-cols-4">
            <Sidebar data={data} />
            <div className="col-span-2 2xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 p-2">
              {
                data.map((cat, index) => 
                  cat.market_cap_change_24h >= 0 ?
                    <ItemPositive cat={cat} index={index} />
                  :
                    <ItemNegative cat={cat} index={index} />
                )
              }
            </div>
          </div>
      }
    </div>
  )
}
