import { NextSeo } from 'next-seo'

import { string } from 'prop-types'

const defaultTitle = 'generaptors'
const defaultDescription = 'CSS generators & media converters'
const defaultKeywords = 'css generator converter triangle'
const defaultOGURL = 'https://generaptors.com/'
const defaultOGImage = 'https://generaptors.com/static/og-image.png'

const Head = (props) => {
  return (
    <NextSeo
      title={props.title || defaultTitle}
      description={props.description || defaultDescription}
      titleTemplate={`generaptors ${props.title ? '| %s' : ''}`}
      openGraph={{
        title: props.defaultTitle || defaultTitle,
        description: props.description || defaultDescription,
        url: props.url || defaultOGURL,
        images: [
          {
            url: props.ogImage ? props.ogImage : defaultOGImage,
            width: 1200,
            height: 630,
            alt: props.title || defaultTitle,
          },
        ],
      }}
      canonical={props.url || defaultOGURL}
    />
  )
}

Head.propTypes = {
  title: string,
  description: string,
  keywords: string,
  url: string,
  ogImage: string,
}

export default Head
