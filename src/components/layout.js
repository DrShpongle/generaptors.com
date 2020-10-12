import React from 'react'
// import Header from './Header'
// import Footer from './Footer'
// import Main from './Main'

const Layout = ({ children }) => {
  return (
    <div className="layout w-full">
      {/* <Header></Header>
      <Main>{children}</Main>
      <Footer></Footer> */}
      {children}
    </div>
  )
}

export default Layout
