/** @jsx h */

import "focus-visible"
import "typeface-inter"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import {
	CSSReset,
	ColorModeProvider,
	Flex,
	ThemeProvider,
	theme,
} from "@chakra-ui/core"
import { Global, css } from "@emotion/core"

import Faction from "../views/faction"
import Front from "../views/front"
import Guild from "../views/guild"
import Guildboard from "../views/guildboard"
import Header from "./header"
import Leaderboard from "../views/leaderboard"
import NotFound from "../views/notfound"
import Parkourboard from "../views/parkourboard"
import Player from "../views/player"
import { Vote } from "../views/vote"
import Voteboard from "../views/voteboard"
import { h } from "preact"
import { withStyles } from "@material-ui/core"

if (process.env.NODE_ENV !== "development") {
	window.$crisp = []
	window.CRISP_WEBSITE_ID = "ac15f3f7-12a4-4eac-a670-b20fa788c429"
	;(() => {
		let d = document
		let s = d.createElement("script")
		s.src = "https://client.crisp.chat/l.js"
		s.async = 1
		d.getElementsByTagName("head")[0].appendChild(s)
	})()
	$crisp.push(["safe", true])
}

const GlobalCss = withStyles({
	"@global": {
		".MuiButton-root": {
			color: "white",
		},
		".MuiPaper-root": {
			color: "white",
			backgroundColor: "#2D3748",
		},
		".MuiTableCell-root": {
			border: 0,
			color: "white",
			backgroundColor: "#101A27",
		},
		".MuiToolbar-root": {
			color: "white",
		},
	},
})(() => null)

const customTheme = {
	...theme,
	fonts: {
		...theme.fonts,
		body: "'Inter var', sans-serif",
		heading: "'Inter var', sans-serif",
	},
}

const GlobalStyles = css`
	.js-focus-visible :focus:not([data-focus-visible-added]) {
		outline: none;
		box-shadow: none;
	}

	img {
		text-indent: -10000px;
	}

	/* https://unpkg.com/purecss@2.0.3/build/pure.css */

	.table {
		border-collapse: collapse;
		border-spacing: 0;
		empty-cells: show;
		border: 1px solid #cbcbcb;
	}

	.table td,
	.table th {
		border-left: 1px solid #cbcbcb;
		border-width: 0 0 0 1px;
		font-size: inherit;
		margin: 0;
		overflow: visible;
		padding: 0.5em 1em;
	}

	.table thead {
		background-color: #e0e0e0;
		color: #000;
		text-align: left;
		vertical-align: bottom;
	}
`

const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={customTheme}>
			<ColorModeProvider value="dark">
				<div
					id="app"
					style={{
						background:
							"url(https://cdn.nethergames.org/img/bg.jpg) no-repeat center center fixed",
						backgroundSize: "cover",
						height: "100vh",
						overflow: "hidden",
					}}
				>
					<Flex align="center" justify="center" h="100vh">
						<Header />
						<CSSReset />
						<GlobalCss />
						<Global styles={GlobalStyles} />
						<Switch>
							<Route exact path="/" component={Front} />
							<Route path="/parkourboard" component={Parkourboard} />
							<Route path="/player" component={Player} />
							<Route path="/leaderboard" component={Leaderboard} />
							<Route path="/guildboard" component={Guildboard} />
							<Route path="/guild" component={Guild} />
							<Route path="/faction" component={Faction} />
							<Route path="/vote" component={Vote} />
							<Route path="/voteboard" component={Voteboard} />
							<Route component={NotFound} />
						</Switch>
					</Flex>
				</div>
			</ColorModeProvider>
		</ThemeProvider>
	</BrowserRouter>
)

export default App
