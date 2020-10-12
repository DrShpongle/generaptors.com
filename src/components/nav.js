import Link from 'next/link'

const links = [
  {
    href: '/experiments/css-triangles',
    label: 'CSS triangles',
  },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav className="w-full">
    <ul className="flex justify-between items-center px-4 py-4">
      <li>
        <Link href="/">
          <a className="text-2xl text-black">🦖 Generaptors</a>
        </Link>
      </li>
      {/* <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul> */}
    </ul>
  </nav>
)

export default Nav
