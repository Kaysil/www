/** @jsx h */

import {
	Box,
	Button,
	Heading,
	Input,
	InputGroup,
	Stack,
	Text,
} from "@chakra-ui/core"

import { API_HOST } from "../config"
import { h } from "preact"
import { useState } from "preact/hooks"

export const Vote = () => {
	const [query, setQuery] = useState("")
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	async function checkStatus(gamertag) {
		setIsLoading(true)

		const response = await fetch(
			`${API_HOST}/players/${encodeURIComponent(gamertag)}/votes`,
		)
		const data = await response.json()
		setData(data)

		setIsLoading(false)
	}

	function handleSubmit(event) {
		event.preventDefault()
		checkStatus(query)
		setQuery("")
	}

	function handleChange(event) {
		setQuery(event.target.value)
	}

	return (
		<Box color="white">
			{!data ? (
				<Stack align="center" justify="center" spacing={4}>
					<Heading>Check your vote status</Heading>

					<Stack isInline spacing={2} align="center" justify="center">
						<Text>or</Text>
						<Button
							as="a"
							size="sm"
							href="https://minecraftpocket-servers.com/server/36864/vote"
							variantColor="teal"
						>
							Vote now
						</Button>
					</Stack>

					<Box
						bg="gray.900"
						borderWidth="1px"
						rounded="lg"
						minW={["sm", "lg"]}
						p="4"
					>
						<form onSubmit={handleSubmit}>
							<InputGroup>
								<Input
									autoComplete="off"
									isFullWidth
									color="white"
									isRequired
									name="query"
									onChange={handleChange}
									placeholder="Enter your Xbox Live Gamertag ..."
									size="lg"
									type="text"
									value={query}
								/>
								<Button
									type="submit"
									variantColor="teal"
									size="sm"
									ml={2}
									isLoading={isLoading}
								>
									Search
								</Button>
							</InputGroup>
						</form>
					</Box>
				</Stack>
			) : (
				<Stack spacing={2} justify="center" align="center">
					<Heading size="lg">Hello {data.player}!</Heading>
					{data.status === 0 && (
						<Stack spacing={2} justify="center" align="center">
							<Text fontSize="lg">You haven't voted yet today!</Text>
							<Button
								as="a"
								href="https://minecraftpocket-servers.com/server/36864/vote"
								variantColor="teal"
							>
								Vote now
							</Button>
						</Stack>
					)}
					{data.status === 1 && (
						<Text fontSize="lg">
							You have already voted today, but you haven't claimed your in-game
							rewards yet. You can claim your rewards and Voter rank by joining
							NetherGames.
						</Text>
					)}
					{data.status === 2 && (
						<Text fontSize="lg">
							You have already voted and claimed your in-game rewards today!
							Don't forget to vote again tomorrow for your chance to win a free
							rank upgrade!
						</Text>
					)}
				</Stack>
			)}
		</Box>
	)
}
