import NextApp from 'next/app'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'

import * as gtag from '../lib/gtag'
import Layout from '../components/layout'
// import mdxComponents from 'components/mdx'
import defaultSeoConfig from '../lib/next-seo.json'
import 'react-colorful/dist/index.css'
import '../styles/index.css'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <DefaultSeo {...defaultSeoConfig} />
        <MDXProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </>
    )
  }
}
