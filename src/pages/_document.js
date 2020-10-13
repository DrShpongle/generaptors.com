import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { GA_TRACKING_ID } from '../lib/gtag'

const bgColor = 'white'
const dotColor = 'gray'
const dotSize = 1
const dotSpace = 12

// const isProduction = process.env.NODE_ENV === 'production'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head />
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
