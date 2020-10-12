import NextApp from 'next/app'
import { CacheProvider } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo'
import Layout from '../components/layout'
// import mdxComponents from 'components/mdx'
import defaultSeoConfig from '../next-seo.json'
import 'react-colorful/dist/index.css'
import '../styles/index.css'

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
