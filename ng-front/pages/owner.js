import Head from "next/head"

let RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

export default function OwnerPage() {
	useEffect(() => {
		window.location.href = RICK_ROLL_URL
	}, [])

	return (
		<Head>
			<title>Helpdesk | NetherGames Network</title>
			<meta name="robots" content="noindex" />
			<meta
				property="og:description"
				content="To apply for owner, you'll need to create a forums account."
			/>
			<meta property="og:title" content="Applying for owner" />
			<meta property="og:url" content={RICK_ROLL_URL} />
			<meta property="og:site_name" content="Helpdesk | NetherGames Network" />
			<meta property="og:type" content="website" />
		</Head>
	)
}
