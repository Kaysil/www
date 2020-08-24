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
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from "@material-ui/core/styles"

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
		<TableRow>
			<TableCell>{type}</TableCell>

			<TableCell>{value(d[`bw${type}Kills`])}</TableCell>
			<TableCell>{value(d[`bw${type}Deaths`])}</TableCell>
			<TableCell>{getKdr(d[`bw${type}Kills`], d[`bw${type}Deaths`])}</TableCell>

			<TableCell>{value(d[`bw${type}BedsBroken`])}</TableCell>
			<TableCell>{value(d[`bw${type}FinalKills`])}</TableCell>
			<TableCell>{value(d[`bw${type}Wins`])}</TableCell>
		</TableRow>
	))
}

function createSwTableContents(d, types = ["Solo", "Doubles"]) {
	return types.map((type) => (
		<TableRow>
			<TableCell>{type}</TableCell>

			<TableCell>{value(d[`sw${type}NormalKills`])}</TableCell>
			<TableCell>{value(d[`sw${type}NormalDeaths`])}</TableCell>
			<TableCell>
				{getKdr(d[`sw${type}NormalKills`], d[`sw${type}NormalDeaths`])}
			</TableCell>

			<TableCell>{value(d[`sw${type}InsaneKills`])}</TableCell>
			<TableCell>{value(d[`sw${type}InsaneDeaths`])}</TableCell>
			<TableCell>
				{getKdr(d[`sw${type}InsaneKills`], d[`sw${type}InsaneDeaths`])}
			</TableCell>

			<TableCell>{value(d[`sw${type}Wins`])}</TableCell>
			<TableCell>{value(d[`sw${type}Losses`])}</TableCell>
			<TableCell>{getKdr(d[`sw${type}Wins`], d[`sw${type}Losses`])}</TableCell>
		</TableRow>
	))
}

function createMmTableContents(d, types = ["Classic", "Infection"]) {
	return types.map((type) => (
		<TableRow>
			<TableCell>{type}</TableCell>

			<TableCell>{value(d[`mm${type}Kills`])}</TableCell>
			<TableCell>{value(d[`mm${type}Deaths`])}</TableCell>
			<TableCell>{getKdr(d[`mm${type}Kills`], d[`mm${type}Deaths`])}</TableCell>

			<TableCell>{value(d[`mm${type}Wins`])}</TableCell>
		</TableRow>
	))
}

const useStyles = makeStyles(() => ({
	root: {
		width: "100%",
	},
	tableWrapper: {
		maxHeight: 440,
		overflow: "auto",
	},
}))

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
		const classes = useStyles()

		const stats = this.state.data
		const failed = this.state.failed

		if (failed || stats.error) {
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
					minW={["unset", "45rem"]}
					rounded={["none", "lg"]}
					maxW="100%"
					p="4"
				>
					<Flex>
						<Avatar src={`https://player.nethergames.org/avatar/${stats.name}`}>
							{stats.voted > 0 && (
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
								<AccordionPanel pb={4} maxW="45rem">
									{stats.bio}
								</AccordionPanel>
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
									{stats.winsData.TB > 0 && (
										<Text>The Bridge: {stats.winsData.TB}</Text>
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
										Game Statistics
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
											<Tab ml={2}>The Bridge</Tab>
										</TabList>

										<TabPanels mt={4}>
											<TabPanel fontSize="sm">
												<Paper className={classes.root}>
													<div className={classes.tableWrapper}>
														<Table stickyHeader>
															<TableBody>
																<TableRow>
																	<TableCell>Type</TableCell>
																	<TableCell>Kills</TableCell>
																	<TableCell>Deaths</TableCell>
																	<TableCell>K/D</TableCell>
																	<TableCell>Beds Broken</TableCell>
																	<TableCell>Final Kills</TableCell>
																	<TableCell>Wins</TableCell>
																</TableRow>

																{createBedwarsTableContents(e)}

																<TableRow>
																	<TableCell>Total</TableCell>
																	<TableCell>{value(e.bwKills)}</TableCell>
																	<TableCell>{value(e.bwDeaths)}</TableCell>
																	<TableCell>
																		{getKdr(e.bwKills, e.bwDeaths)}
																	</TableCell>
																	<TableCell>{value(e.bwBedsBroken)}</TableCell>
																	<TableCell>{value(e.bwFinalKills)}</TableCell>
																	<TableCell>{value(e.bwWins)}</TableCell>
																</TableRow>
															</TableBody>
														</Table>
													</div>

													<Text p={4}>
														Iron Collected: {value(e.bwIronCollected)} · Gold
														Collected: {value(e.bwGoldCollected)} · Diamonds
														Collected: {value(e.bwDiamondsCollected)} · Emeralds
														Collected: {value(e.bwEmeraldsCollected)}
													</Text>
												</Paper>
											</TabPanel>

											<TabPanel fontSize="sm">
												<Text>Kills: {value(e.duelsKills)}</Text>
												<Text>Deaths: {value(e.duelsDeaths)}</Text>
												<Text>K/D: {getKdr(e.duelsKills, e.duelsDeaths)}</Text>
												<Text>Arrows Hit: {value(e.duelsArrowsShot)}</Text>
												<Text>Melee Hits: {value(e.duelsMeleeHits)}</Text>
												<Text>Streak: {value(e.duelsStreak)}</Text>
												<Text>Best Streak: {value(e.duelsBestStreak)}</Text>
												<Text>Wins: {value(e.duelsWins)}</Text>
												<Text>Losses: {value(e.duelsLosses)}</Text>
												<Text>W/L: {getKdr(e.duelsWins, e.duelsLosses)}</Text>
											</TabPanel>

											<TabPanel fontSize="sm">
												<Paper className={classes.root}>
													<div className={classes.tableWrapper}>
														<Table>
															<TableBody>
																<TableRow>
																	<TableCell>Type</TableCell>
																	<TableCell>Kills</TableCell>
																	<TableCell>Deaths</TableCell>
																	<TableCell>K/D</TableCell>
																	<TableCell>Wins</TableCell>
																</TableRow>

																{createMmTableContents(e)}

																<TableRow>
																	<TableCell>Total</TableCell>
																	<TableCell>{value(e.mmKills)}</TableCell>
																	<TableCell>{value(e.mmDeaths)}</TableCell>
																	<TableCell>
																		{getKdr(e.mmKills, e.mmDeaths)}
																	</TableCell>
																	<TableCell>{value(e.mmWins)}</TableCell>
																</TableRow>
															</TableBody>
														</Table>
													</div>

													<Text p={4}>
														Bow Kills: {value(e.mmBowKills)} · Knife Kills:{" "}
														{value(e.mmKnifeKills)} · Throw Knife Kills:{" "}
														{value(e.mmThrowKnifeKills)}
													</Text>
												</Paper>
											</TabPanel>

											<TabPanel fontSize="sm">
												<Paper className={classes.root}>
													<div className={classes.tableWrapper}>
														<Table>
															<TableHead>
																<TableRow>
																	<TableCell colSpan={1}></TableCell>
																	<TableCell colSpan={3}>Normal</TableCell>
																	<TableCell colSpan={6}>Insane</TableCell>
																</TableRow>
															</TableHead>

															<TableBody>
																<TableRow>
																	<TableCell>Type</TableCell>
																	<TableCell>Kills</TableCell>
																	<TableCell>Deaths</TableCell>
																	<TableCell>K/D</TableCell>
																	<TableCell>Kills</TableCell>
																	<TableCell>Deaths</TableCell>
																	<TableCell>K/D</TableCell>
																	<TableCell>Wins</TableCell>
																	<TableCell>Losses</TableCell>
																	<TableCell>W/L</TableCell>
																</TableRow>

																{createSwTableContents(e)}

																<TableRow>
																	<TableCell>Total</TableCell>
																	<TableCell>{value(e.swKills)}</TableCell>
																	<TableCell>{value(e.swDeaths)}</TableCell>
																	<TableCell>
																		{getKdr(e.swKills, e.swDeaths)}
																	</TableCell>
																	<TableCell colSpan={3}></TableCell>
																	<TableCell>{value(e.swWins)}</TableCell>
																	<TableCell>{value(e.swLosses)}</TableCell>
																	<TableCell>
																		{getKdr(e.swWins, e.swLosses)}
																	</TableCell>
																</TableRow>
															</TableBody>
														</Table>
													</div>

													<Text p={4}>
														Blocks Broken: {value(e.swBlocksBroken)} · Blocks
														Placed: {value(e.swBlocksPlaced)} · Arrows Hit:{" "}
														{value(e.swArrowsShot)} · Eggs Thrown:{" "}
														{value(e.swEggsThrown)} · Ender Pearls Thrown:{" "}
														{value(e.swEpearlsThrown)}
													</Text>
												</Paper>
											</TabPanel>

											<TabPanel fontSize="sm">
												<Text>Kills: {value(e.tbKills)}</Text>
												<Text>Deaths: {value(e.tbDeaths)}</Text>
												<Text>K/D: {getKdr(e.tbKills, e.tbDeaths)}</Text>
												<Text>Arrows Hit: {value(e.tbArrowsShot)}</Text>
												<Text>Melee Hits: {value(e.tbMeleeHits)}</Text>
												<Text>Goals: {value(e.tbGoals)}</Text>
												<Text>Streak: {value(e.tbStreak)}</Text>
												<Text>Best Streak: {value(e.tbBestStreak)}</Text>
												<Text>Wins: {value(e.tbWins)}</Text>
												<Text>Losses: {value(e.tbLosses)}</Text>
												<Text>W/L: {getKdr(e.tbWins, e.tbLosses)}</Text>
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
