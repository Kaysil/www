import Page from "../components/page"
import Header from "../components/header"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import Notification from "../components/notification"
import { MediaQueryConsumer } from "../components/media-query"

import Intro from "../components/home/intro"
import Features from "../components/home/features"
import Discord from "../components/home/discord"
import SocialMeta from "../components/social-meta"

export default () => (
	<Page title="NetherGames">
		<SocialMeta
			image={"https://cdn.nethergames.org/img/logo/double-line-light.png"}
			title="NetherGames"
			url="https://nethergames.org"
			description="All for one. All for fun. Play Bedwars, Creative, Duels, Factions, Murder Mystery and SkyWars among other games with your friends now."
		/>
		<MediaQueryConsumer>
			{({ isMobile }) => (
				<Header
					height={32}
					offset={-32}
					distance={32}
					shadow
					active={isMobile ? 32 : 160}
				>
					<Notification
						href="https://forums.nethergames.org/threads/discord-ban-appeals.8418/"
						title="DISCORD BAN APPEALS"
						titleMobile="DISCORD BAN APPEALS"
					>
						DISCORD BAN APPEALS - Banned from our Discord server? You can now
						appeal it! Conditions apply — Tuesday, May 12th
					</Notification>
					<Navbar hideLogo={!isMobile} />
				</Header>
			)}
		</MediaQueryConsumer>
		<Intro />
		<Features />
		<Discord />
		<Footer />
	</Page>
)
