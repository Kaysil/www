const webpack = require('webpack')
const rehypePrism = require('@mapbox/rehype-prism')
const nextMDX = require('@next/mdx')
const bundleAnalyzer = require('@next/bundle-analyzer')

const withMDX = nextMDX({
  extension: /[/\\](pages|blog|telemetry)[/\\](.+)\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism]
  }
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  target: 'server',
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx'],
  experimental: {
    publicDirectory: true,
    granularChunks: true
  },
  webpack: (config) => {
    config.plugins = config.plugins || []
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js[/\\]lib[/\\]languages$/,
        new RegExp(`^./(${['javascript', 'json', 'xml'].join('|')})$`)
      )
    )

    return config
  }
}

module.exports = withMDX(withBundleAnalyzer(nextConfig))
