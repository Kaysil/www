import Container from "./container"
import Link from "next/link"
import { MediaQueryConsumer } from "./media-query"
import classNames from "classnames"
import { withRouter } from "next/router"

export default withRouter(({ router, hideLogo = false }) => {
	const { route } = router

	return (
		<MediaQueryConsumer>
			{({ isMobile }) => {
				if (isMobile) {
					return (
						<Container center>
							<h1 className="visually-hidden" aria-hidden="true">
								NetherGames
							</h1>
							<nav className="expand f5">
								<style jsx>
									{`
										nav {
											position: relative;
											flex: 1;
											height: 96px;
											display: flex;
											justify-content: space-between;
											align-items: center;
											flex-wrap: wrap;
										}
										nav .links {
											display: flex;
											align-items: center;
											z-index: 1;
										}
										nav .dropdown {
											flex: 1 0 100%;
											display: flex;
											margin: 0 -5px;
											text-align: left;
											// justify-content: flex-end;
											// justify-content: space-between;
											justify-content: space-around;
										}
										nav .links a {
											display: inline-block;
											// enlarge the clickable area
											padding: 5px 8px;
											color: inherit;
											text-decoration: none;
										}
										nav .links a.active {
											color: #ff851b;
										}
										nav .links a.selected {
											color: #ff851b;
											font-weight: 600;
										}
										nav .logo {
											font-size: 0;
											text-align: center;
											overflow: hidden;
										}
										nav .logo a {
											display: inline-block;
											padding-right: 4px;
										}
									`}
								</style>
								<div className="logo">
									<Link href="/">
										<a aria-label="NetherGames">
											<img
												height={25}
												style={{ transform: "translateX(4%)" }}
												src="https://cdn.nethergames.org/img/logo/double-line-light.png"
											/>
										</a>
									</Link>
								</div>
								<div className="links mute dropdown">
									<a href="https://portal.nethergames.org" target="_blank">
										Statistics
									</a>
									<a href="https://portal.nethergames.org/vote" target="_blank">
										Vote
									</a>
									<a href="https://store.nethergames.org" target="_blank">
										Store
									</a>
									<a href="https://forums.nethergames.org" target="_blank">
										Forums
									</a>
									<a href="https://discord.nethergames.org" target="_blank">
										Discord
									</a>
								</div>
							</nav>
						</Container>
					)
				}

				return (
					<Container center>
						<h1 className="visually-hidden" aria-hidden="true">
							NetherGames
						</h1>
						<nav className="f-reset">
							<style jsx>
								{`
									nav {
										position: relative;
										flex: 1;
										height: 64px;
										display: flex;
										justify-content: space-between;
										align-items: center;
									}
									nav .links {
										display: flex;
										align-items: center;
										z-index: 1;
										pointer-events: auto;
									}
									nav .links a {
										display: inline-block;
										// enlarge the clickable area
										padding: 5px;
										margin-left: -5px;
										margin-right: 2rem;
										text-decoration: none;
										transition: color 0.2s ease;
									}
									nav .links a:hover {
										color: #ff851b;
									}
									nav .links a.selected {
										color: #ff851b;
										font-weight: 600;
									}
									nav .logo {
										position: absolute;
										width: 100%;
										font-size: 0;
										text-align: center;
										overflow: hidden;
										transition: all 0.2s ease;
										// visibility: hidden;
										pointer-events: none;
										// transform: translate3d(0, 30%, 0);
										opacity: 0;
									}
									:global(.active) nav .logo {
										pointer-events: unset;
										// transform: translate3d(0, 0, 0);
										opacity: 1;
									}
									nav .logo a {
										display: inline-block;
									}
									// CSS only media query for mobile + SSR
									@media screen and (max-width: 640px) {
										.logo {
											display: none;
										}
									}
								`}
							</style>
							<div className="links">
								<a href="https://portal.nethergames.org" target="_blank">
									Statistics
								</a>
								<a href="https://portal.nethergames.org/vote" target="_blank">
									Vote
								</a>
								<a href="https://store.nethergames.org" target="_blank">
									Store
								</a>
							</div>
							{!hideLogo && (
								<div className="logo">
									<Link href="/">
										<a aria-label="NetherGames">
											<img
												height={25}
												style={{ transform: "translateX(4%)" }}
												src="https://cdn.nethergames.org/img/logo/double-line-light.png"
											/>
										</a>
									</Link>
								</div>
							)}
							<div className="links">
								<a href="https://forums.nethergames.org" target="_blank">
									Forums
								</a>
								<a href="https://discord.nethergames.org" target="_blank">
									Discord
								</a>
							</div>
						</nav>
					</Container>
				)
			}}
		</MediaQueryConsumer>
	)
})
