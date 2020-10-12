import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

export default () => (
  <div>
    <Head title="🦖 generaptors" />
    {/* <Nav /> */}
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl lg:text-6xl text-center p-3 bg-white leading-none font-mono mt-20">
        🦖 Generaptors
      </h1>
      <h3 className="text-xl md:text-2xl lg:text-2xl text-center p-3 bg-white leading-none mt-16 text-gray-700 font-medium">
        CSS generators & media converters
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-3 md:gap-4 lg:gap-6 mt-32">
        <Link href="/css-triangles">
          <a>
            <div className="border border-gray-400 p-8 rounded bg-white w-64">
              1
            </div>
          </a>
        </Link>
        <div className="border border-gray-400 p-8 rounded bg-white w-64">
          2
        </div>
        <div className="border border-gray-400 p-8 rounded bg-white w-64">
          3
        </div>
        <div className="border border-gray-400 p-8 rounded bg-white w-64">
          4
        </div>
      </div>
    </div>
  </div>
)
