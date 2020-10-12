import NextApp from 'next/app'
import Router from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo'

import * as gtag from '../lib/gtag'
import Layout from '../components/layout'
// import mdxComponents from 'components/mdx'
import defaultSeoConfig from '../next-seo.json'
import 'react-colorful/dist/index.css'
import '../styles/index.css'

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

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
