const withPlugins = require('next-compose-plugins')
const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withPlugins([
  withMdxEnhanced({
    layoutPath: 'src/layouts',
    defaultLayout: true,
    fileExtensions: ['mdx'],
    remarkPlugins: [
      // require('remark-slug'),
      // require('remark-footnotes'),
      // require('remark-code-titles'),
      //require('@fec/remark-a11y-emoji')
    ],
    // rehypePlugins: [require('mdx-prism')],
    extendFrontMatter: {
      process: (mdxContent, frontMatter) => {
        // const pagesDir = nodePath.resolve(__dirname, 'src/pages')
        // Somehow the __resourcePath does not start with a /:
        const path = '/' + frontMatter.__resourcePath
        //   .replace(pagesDir, '')
        //   .replace('.mdx', '')
        //   .replace('.tsx', '')
        //   .replace(/^\/index$/, '/')
        //   .replace(/\/index$/, '')
        return {
          ...(frontMatter.title ? { title: frontMatter.title } : {}),
          path,
          // path,
          // url: useURL(path),
          // readingTime: readingTime(mdxContent),
          // ogImage: {
          //   url:
          //     'https://res.cloudinary.com/dg3gyk0gu/image/upload/v1566948117/transcript-images/Eggo_Notext.png',
          //   width: 1280,
          //   height: 720,
          // },
        }
      },
    },
  }),
])
