import NextApp from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'

import * as gtag from '../lib/gtag'
import Layout from '../components/layout'
// import mdxComponents from 'components/mdx'
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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no"
          />
        </Head>
        <MDXProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </>
    )
  }
}
