import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

const bgColor = 'white'
const dotColor = 'gray'
const dotSize = 1
const dotSpace = 12

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const isProduction = process.env.NODE_ENV === 'production'
    return { ...initialProps, isProduction }
  }
  render() {
    const { isProduction } = this.props
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="content-language" content="en-us" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body
          style={{
            background: `linear-gradient(90deg, ${bgColor} ${
              dotSpace - dotSize
            }px, transparent 1%) center,
		linear-gradient(${bgColor} ${dotSpace - dotSize}px, transparent 1%) center,
		${dotColor}`,
            backgroundSize: `${dotSpace}px ${dotSpace}px`,
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
