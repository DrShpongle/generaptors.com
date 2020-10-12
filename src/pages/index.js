import Link from 'next/link'
import Head from '../components/head'

import { IconCode } from '../lib/icons'

const IndexPage = () => (
  <div className="w-full max-w-4xl px-4 mx-auto my-8 lg:my-24">
    <Head title="generaptors" />
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl lg:text-6xl text-center p-3 bg-white leading-none font-mono">
        🦖 Generaptors
      </h1>
      <h3 className="text-lg md:text-2xl lg:text-3xl text-center p-3 bg-white font-mono mt-2 md:mt-4 lg:mt-6">
        CSS generators & media converters
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-6 mt-8 md:mt-10 lg:mt-20">
        <Link
          className="border border-gray-400 p-6 rounded bg-white flex flex-col items-center w-1/3"
          href="/css-triangles"
        >
          <a className="block w-full">
            <ThumbItem
              title="CSS triangle generator"
              image="/images/thumb-css-triangles.png"
            />
          </a>
        </Link>
        <ThumbItem title="Work in progress..." />
      </div>
    </div>
  </div>
)

export default IndexPage

const ThumbItem = ({ title, image }) => (
  <div className="p-4 bg-white rounded border border-gray-400 hover:border-gray-500 transition delay-100 flex flex-col rounded max-w-xs md:max-w-none">
    <h3 className="text-center text-xl font-mono font-medium">{title}</h3>
    <div className="mt-5 flex-grow grid place-items-center items-center rounded border border-gray-400 overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="block w-full" />
      ) : (
        <IconCode className="w-40 text-gray-400" />
      )}
    </div>
  </div>
)
