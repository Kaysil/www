/** @jsx h */

import {
	Accordion,
	AccordionHeader,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Avatar,
	AvatarBadge,
	Badge,
	Box,
	Flex,
	Heading,
	Icon,
	Spinner,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/core"
import { Component, h } from "preact"

import { API_HOST } from "../config"
import { Helmet } from "react-helmet"
import Tooltip from "@material-ui/core/Tooltip"

function value(value) {
	return value >= 0 ? value : "-"
}

function getKdr(kills, deaths) {
	if (deaths <= 0) return kills
	return deaths > 0 ? Math.round((kills / deaths) * 100) / 100 : "-"
}

function createBedwarsTableContents(
	d,
	types = ["Solo", "Doubles", "Trios", "Squads"],
) {
	return types.map((type) => (
		<tr>
			<td>{type}</td>

			<td>{value(d[`bw${type}Kills`])}</td>
			<td>{value(d[`bw${type}Deaths`])}</td>
			<td>{getKdr(d[`bw${type}Kills`], d[`bw${type}Deaths`])}</td>

			<td>{value(d[`bw${type}FinalKills`])}</td>
			<td>{value(d[`bw${type}FinalDeaths`])}</td>
			<td>{getKdr(d[`bw${type}FinalKills`], d[`bw${type}FinalDeaths`])}</td>

			<td>{value(d[`bw${type}Wins`])}</td>
			<td>{value(d[`bw${type}Losses`])}</td>
			<td>{getKdr(d[`bw${type}Wins`], d[`bw${type}Losses`])}</td>

			<td>{value(d[`bw${type}BedsBroken`])}</td>
		</tr>
	))
}

function createSwTableContents(d, types = ["Solo", "Doubles"]) {
	return types.map((type) => (
		<tr>
			<td>{type}</td>

			<td>{value(d[`sw${type}NormalKills`])}</td>
			<td>{value(d[`sw${type}NormalDeaths`])}</td>
			<td>{getKdr(d[`sw${type}NormalKills`], d[`sw${type}NormalDeaths`])}</td>

			<td>{value(d[`sw${type}InsaneKills`])}</td>
			<td>{value(d[`sw${type}InsaneDeaths`])}</td>
			<td>{getKdr(d[`sw${type}InsaneKills`], d[`sw${type}InsaneDeaths`])}</td>

			<td>{value(d[`sw${type}Wins`])}</td>
			<td>{value(d[`sw${type}Losses`])}</td>
			<td>{getKdr(d[`sw${type}Wins`], d[`sw${type}Losses`])}</td>
		</tr>
	))
}

export default class Player extends Component {
	state = {
		failed: false,
		data: {},
	}

	componentDidMount() {
		const input = window.location.pathname.split("/")[2]

		fetch(`${API_HOST}/players/${encodeURIComponent(input)}/stats`)
			.then((res) => res.json())
			.then((res) => this.setState({ data: res }))
			.catch(() => this.setState({ failed: true }))
	}

	render() {
		const stats = this.state.data
		const failed = this.state.failed

		if (failed || !stats || stats.error) {
			return <Heading color="white">We couldn't find that player!</Heading>
		}

		if (!stats.winsData && !stats.factionsData && !stats.rankColors) {
			return (
				<Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
			)
		}

		const e = stats.extra

		return (
			<>
				<Helmet>
					<title>{stats.name}</title>
					<meta property="og:site_name" content="NetherGames Network" />
					<meta
						property="og:title"
						content={`${stats.name} - Player Statistics`}
					/>
					<meta property="og:type" content="profile" />
					<meta
						property="og:url"
						content={`https://portal.nethergames.org/player/${stats.name}`}
					/>
					<meta
						property="og:image"
						content={`https://player.nethergames.org/avatar/${stats.name}`}
					/>
					<meta property="og:profile:username" content={stats.name} />
					<meta
						property="og:description"
						content={`Kills: ${stats.kills} | Deaths: ${stats.deaths} | Wins: ${stats.wins} | Level: ${stats.level} | Credits: ${stats.statusCredits}`}
					/>
				</Helmet>
				<Box
					bg="gray.900"
					borderWidth="1px"
					overflow="auto"
					rounded="lg"
					minH="m"
					maxW="lg"
					p="4"
				>
					<Flex>
						<Avatar src={`https://player.nethergames.org/avatar/${stats.name}`}>
							{stats.voted && (
								<Tooltip title="Voted">
									<AvatarBadge
										as={Icon}
										name="check-circle"
										size="1.25em"
										color="white"
										borderColor="transparent"
									/>
								</Tooltip>
							)}
						</Avatar>
						<Box ml="3">
							<Stack align="center" isInline spacing={2}>
								<Text fontWeight="bold" fontSize="lg">
									{stats.name}
								</Text>

								{stats.tier && (
									<Badge backgroundColor={stats.tierColor}>{stats.tier}</Badge>
								)}

								{stats.ranks &&
									stats.ranks.map((v, i) => {
										return (
											<Badge backgroundColor={stats.rankColors[i]}>{v}</Badge>
										)
									})}
							</Stack>
							<Text fontSize="m">
								{getKdr(stats.kills, stats.deaths)} k/d ratio
							</Text>
						</Box>
					</Flex>
					<Flex pt="4" pb="2">
						<Text fontSize="m">
							{stats.kills} kills · {stats.deaths} deaths · {stats.wins} wins ·{" "}
							{stats.level} levels · {stats.statusCredits} credits
						</Text>
					</Flex>
					<Flex pb="4">
						<Text fontSize="lg">
							<Icon name="view" /> Last seen{" "}
							{stats.online ? "right now" : `${stats.lastSeen} ago`} on{" "}
							{stats.lastServer}
						</Text>
					</Flex>
					<Accordion allowToggle>
						{stats.bio && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Biography
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>{stats.bio}</AccordionPanel>
							</AccordionItem>
						)}
						{stats.winsData && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Wins Summary
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>
									{stats.winsData.BR > 0 && (
										<Text>Battle Royale: {stats.winsData.BR}</Text>
									)}
									{stats.winsData.BW > 0 && (
										<Text>Bedwars: {stats.winsData.BW}</Text>
									)}
									{stats.winsData.BH > 0 && (
										<Text>Block Hunt: {stats.winsData.BH}</Text>
									)}
									{stats.winsData.BB > 0 && (
										<Text>Build Battle: {stats.winsData.BB}</Text>
									)}
									{stats.winsData.CTF > 0 && (
										<Text>Capture the Flag: {stats.winsData.CTF}</Text>
									)}
									{stats.winsData.Duels > 0 && (
										<Text>Duels: {stats.winsData.Duels}</Text>
									)}
									{stats.winsData.MM > 0 && (
										<Text>Murder Mystery: {stats.winsData.MM}</Text>
									)}
									{stats.winsData.RC > 0 && (
										<Text>Races: {stats.winsData.RC}</Text>
									)}
									{stats.winsData.SC > 0 && (
										<Text>Soccer: {stats.winsData.SC}</Text>
									)}
									{stats.winsData.SW > 0 && (
										<Text>SkyWars: {stats.winsData.SW}</Text>
									)}
									{stats.winsData.SG > 0 && (
										<Text>Survival Games: {stats.winsData.SG}</Text>
									)}
									{stats.winsData.TR > 0 && (
										<Text>TNT Run: {stats.winsData.TR}</Text>
									)}
								</AccordionPanel>
							</AccordionItem>
						)}
						{stats.factionsData && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Factions Statistics
									</Box>
									<AccordionIcon />
								</AccordionHeader>
								<AccordionPanel pb={4}>
									<Text>Bounty: {stats.factionsData.bounty}</Text>
									<Text>Coins: {stats.factionsData.coins}</Text>
									<Text>Join date: {stats.factionsData.registerDate}</Text>
									<Text>Kills: {stats.factionsData.kills}</Text>
									<Text>Power: {stats.factionsData.power}</Text>
									<Text>Success Rate: {stats.factionsData.successRate}</Text>
								</AccordionPanel>
							</AccordionItem>
						)}
						{e && (
							<AccordionItem>
								<AccordionHeader>
									<Box flex="1" textAlign="left" fontWeight="bold">
										Detailed Statistics
									</Box>
									<AccordionIcon />
								</AccordionHeader>

								<AccordionPanel pb={4} overflowY="hidden">
									<Tabs variant="soft-rounded" variantColor="teal" size="sm">
										<TabList>
											<Tab>Bedwars</Tab>
											<Tab ml={2}>Duels</Tab>
											<Tab ml={2}>Murder Mystery</Tab>
											<Tab ml={2}>SkyWars</Tab>
										</TabList>

										<TabPanels mt={4}>
											<TabPanel fontSize="sm">
												<table className="table">
													<thead>
														<tr>
															<th colSpan={1}></th>
															<th colSpan={3}>Normal</th>
															<th colSpan={7}>Final</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Type</td>
															<td>Kills</td>
															<td>Deaths</td>
															<td>K/D</td>
															<td>Kills</td>
															<td>Deaths</td>
															<td>K/D</td>
															<td>Wins</td>
															<td>Losses</td>
															<td>W/L</td>
															<td>Beds Broken</td>
														</tr>

														{createBedwarsTableContents(e)}
													</tbody>
												</table>

												<Text>Coins: {value(e.bwCoins)}</Text>
												<Text>Streak: {value(e.bwStreak)}</Text>
												<Text>Best Streak: {value(e.bwBestStreak)}</Text>
											</TabPanel>

											<TabPanel fontSize="sm"></TabPanel>
											<TabPanel fontSize="sm"></TabPanel>

											<TabPanel fontSize="sm">
												<table className="table">
													<thead>
														<tr>
															<th colSpan={1}></th>
															<th colSpan={3}>Normal</th>
															<th colSpan={6}>Insane</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Type</td>
															<td>Kills</td>
															<td>Deaths</td>
															<td>K/D</td>
															<td>Kills</td>
															<td>Deaths</td>
															<td>K/D</td>
															<td>Wins</td>
															<td>Losses</td>
															<td>W/L</td>
														</tr>

														{createSwTableContents(e)}

														<tr>
															<td>Total</td>
															<td>{value(e.swKills)}</td>
															<td>{value(e.swDeaths)}</td>
															<td>{getKdr(e.swKills, e.swDeaths)}</td>
															<td colSpan={3}></td>
															<td>{value(e.swWins)}</td>
															<td>{value(e.swLosses)}</td>
															<td>{getKdr(e.swWins, e.swLosses)}</td>
														</tr>
													</tbody>
												</table>

												<Text>Coins: {value(e.swCoins)}</Text>
												<Text>Blocks Broken: {value(e.swBlocksBroken)}</Text>
												<Text>Blocks Placed: {value(e.swBlocksPlaced)}</Text>
												<Text>Arrows Shot: {value(e.swArrowsShot)}</Text>
												<Text>Eggs Thrown: {value(e.swEggsThrown)}</Text>
												<Text>
													Enderpearls Thrown: {value(e.swEpearlsThrown)}
												</Text>
											</TabPanel>
										</TabPanels>
									</Tabs>
								</AccordionPanel>
							</AccordionItem>
						)}
					</Accordion>
				</Box>
			</>
		)
	}
}
