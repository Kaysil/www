import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NetherGames</title>
        <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/static/favicon/site.webmanifest' />
        <link rel='mask-icon' href='/static/favicon/safari-pinned-tab.svg' color='#FF851B' />
        <link rel='shortcut icon' href='/static/favicon/favicon.ico' />
        <meta name='msapplication-TileColor' content='#FF851B' />
        <meta name='msapplication-config' content='/static/favicon/browserconfig.xml' />
        <meta name='theme-color' content='#FF851B' />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="ac15f3f7-12a4-4eac-a670-b20fa788c429";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
          }}
        />
        <script
          data-ad-client='ca-pub-1506111300427530'
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
