/** @jsx h */

import {
	Avatar,
	Box,
	Flex,
	Heading,
	Link,
	List,
	ListItem,
	Spinner,
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
import { NavLink } from "react-router-dom"

export default class Faction extends Component {
	state = {
		failed: false,
		data: {},
	}

	componentDidMount() {
		const input = window.location.pathname.split("/")[2]

		fetch(`${API_HOST}/factions/${encodeURIComponent(input)}/stats`)
			.then((res) => res.json())
			.then((res) => this.setState({ data: res }))
			.catch(() => this.setState({ failed: true }))
	}

	render() {
		const stats = this.state.data
		const failed = this.state.failed

		if (failed || stats.error) {
			return <Heading color="white">We couldn't find that faction!</Heading>
		}

		if (!stats && !stats.allies) {
			return (
				<Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
			)
		}

		return (
			<>
				<Helmet>
					<title>{stats.name}</title>
					<meta property="og:site_name" content="NetherGames Network" />
					<meta
						property="og:title"
						content={`${stats.name} - Faction Statistics`}
					/>
					<meta property="og:type" content="profile" />
					<meta
						property="og:url"
						content={`https://portal.nethergames.org/faction/${stats.name}`}
					/>
					<meta
						property="og:image"
						content={`https://player.nethergames.org/avatar/${stats.leader}`}
					/>
					<meta property="og:profile:username" content={stats.name} />
					<meta
						property="og:description"
						content={`Leader: ${stats.leader} | Strength: ${stats.strength} | Balance: ${stats.balance}`}
					/>
				</Helmet>
				<Flex bg="gray.900" borderWidth="1px" flexDir="column" maxH="75vh" maxW="lg" p="4" rounded="lg">
					<Heading>{stats.name}</Heading>
					<Tabs variant="enclosed" pt="4" d="flex" flex={1} flexDir="column" minH={0}>
						<TabList>
							<Tab>General</Tab>
							<Tab>Officers</Tab>
							<Tab>Members</Tab>
						</TabList>
						<TabPanels pt={4}>
							<TabPanel>
								<Text>Allies: {stats.allies}</Text>
								<Text>Balance: {stats.balance}</Text>
								<Text>Leader: {stats.leader}</Text>
								<Text>Strength: {stats.strength}</Text>
							</TabPanel>
							<TabPanel overflow="auto">
								<List spacing={2}>
									{stats.officers &&
										stats.officers.map((stat) => (
											<ListItem>
												<Flex align="center">
													<Avatar
														size="sm"
														src={`https://player.nethergames.org/avatar/${stat}`}
													/>
													<Box ml="3">
														<Text fontWeight="bold">
															<Link
																as={NavLink}
																strict
																exact
																to={`/player/${stat}`}
															>
																{stat}
															</Link>
														</Text>
													</Box>
												</Flex>
											</ListItem>
										))}
								</List>
							</TabPanel>
							<TabPanel overflow="auto">
								<List spacing={2}>
									{stats.members &&
										stats.members.map((stat) => (
											<ListItem>
												<Flex align="center">
													<Avatar
														size="sm"
														src={`https://player.nethergames.org/avatar/${stat}`}
													/>
													<Box ml="3">
														<Text fontWeight="bold">
															<Link
																as={NavLink}
																strict
																exact
																to={`/player/${stat}`}
															>
																{stat}
															</Link>
														</Text>
													</Box>
												</Flex>
											</ListItem>
										))}
								</List>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>
			</>
		)
	}
}
