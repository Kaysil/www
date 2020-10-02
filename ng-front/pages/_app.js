import Head from "next/head"

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>NetherGames</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png?v=1"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png?v=1"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png?v=1"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest?v=1" />
				<link
					rel="mask-icon"
					href="/favicon/safari-pinned-tab.svg?v=1"
					color="#da532c"
				/>
				<link rel="shortcut icon" href="/favicon/favicon.ico?v=1" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta
					name="msapplication-config"
					content="/favicon/browserconfig.xml?v=1"
				/>
				<meta name="theme-color" content="#353a4c" />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.$crisp=[];window.CRISP_WEBSITE_ID="ac15f3f7-12a4-4eac-a670-b20fa788c429";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
					}}
				/>
				<script
					data-ad-client="ca-pub-1506111300427530"
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
				/>
			</Head>

			<Component {...pageProps} />
		</>
	)
}
