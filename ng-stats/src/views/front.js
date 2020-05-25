/** @jsx h */

import {
	Box,
	Button,
	FormControl,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/core"
import { Component, h } from "preact"
import { Field, Formik } from "formik"

import { useHistory } from "react-router-dom"

const constants = [
	{
		label: "Player",
		value: "player",
	},
	{
		label: "Faction",
		value: "faction",
	},
	{
		label: "Guild",
		value: "guild",
	},
]

const isChecked = (radioValue, storedValue) => radioValue === storedValue

class Front extends Component {
	render() {
		let history = useHistory()

		return (
			<Box
				bg="gray.900"
				borderWidth="1px"
				overflow="hidden"
				rounded="lg"
				minW={["sm", "lg"]}
				p="4"
			>
				<Formik
					initialValues={{ search: "player", query: "" }}
					onSubmit={({ search, query }) => {
						history.push(`/${search}/${query}`)
					}}
				>
					{({ handleSubmit, handleChange, values }) => (
						<form onSubmit={handleSubmit}>
							<InputGroup>
								<Input
									autoComplete="off"
									isFullWidth
									isRequired
									name="query"
									onChange={handleChange}
									placeholder="Find a player, faction, or guild ..."
									size="lg"
									type="text"
									value={values.query}
								/>
								<InputRightElement
									children={<Icon name="search" color="gray.300" />}
								/>
							</InputGroup>
							<Button
								type="submit"
								variantColor="teal"
								size="sm"
								float="right"
								mt={2}
							>
								Search
							</Button>
							<FormControl mt={3}>
								{constants.map(({ value, label }, index) => (
									<label key={index} style={{ marginRight: "1rem" }}>
										<Field name="search">
											{({ field }) => (
												<input
													{...field}
													type="radio"
													name={field.name}
													checked={isChecked(value, field.value)}
													onChange={() => field.onChange(field.name)(value)}
												/>
											)}
										</Field>
										<span style={{ marginLeft: ".5rem" }}>{label}</span>
									</label>
								))}
							</FormControl>
						</form>
					)}
				</Formik>
			</Box>
		)
	}
}

export default Front
