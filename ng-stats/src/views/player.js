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
	Text,
} from "@chakra-ui/core"
import { Component, h } from "preact"

import { API_HOST } from "../config"
import { Helmet } from "react-helmet"
import Tooltip from "@material-ui/core/Tooltip"

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

		if (failed || null === stats || {} === stats || stats.error) {
			return <Heading color="white">We couldn't find that player!</Heading>
		}

		if (!stats.winsData && !stats.factionsData && !stats.rankColors) {
			return (
				<Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
			)
		}

		return (
			<div>
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
							{0 !== stats.voted && (
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
								{Math.round((stats.kills / stats.deaths) * 100) / 100} k/d ratio
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
									<Text>Bounty: {stats.factionsData[0].bounty}</Text>
									<Text>Coins: {stats.factionsData[0].coins}</Text>
									<Text>Join date: {stats.factionsData[0].registerDate}</Text>
									<Text>Kills: {stats.factionsData[0].kills}</Text>
									<Text>Power: {stats.factionsData[0].power}</Text>
									<Text>Success Rate: {stats.factionsData[0].successRate}</Text>
								</AccordionPanel>
							</AccordionItem>
						)}
					</Accordion>
				</Box>
			</div>
		)
	}
}
