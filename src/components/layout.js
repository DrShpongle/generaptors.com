import React from 'react'
import Head from '../components/head'
// import Header from './Header'
// import Footer from './Footer'
// import Main from './Main'

const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen">
      <Head />
      {/* <Header></Header>
      <Main>{children}</Main>
      <Footer></Footer> */}
      {children}
    </div>
  )
}

export default Layout
