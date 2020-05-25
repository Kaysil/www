/** @jsx h */

import { Image, Link } from "@chakra-ui/core"
import { NavLink, Link as RouterLink } from "react-router-dom"
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import CascadingMenu from "./menu"
import Collapse from "@material-ui/core/Collapse"
import Drawer from "@material-ui/core/Drawer"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Toolbar from "@material-ui/core/Toolbar"
import { h } from "preact"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useState } from "preact/hooks"

export const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#101A27",
		},
	},
})

const useStyles = makeStyles((theme) => ({
	list: {
		width: "100%",
		maxWidth: 360,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	nestedSecond: {
		paddingLeft: theme.spacing(4),
	},
	nestedThird: {
		paddingLeft: theme.spacing(4),
	},
	navBar: {
		display: "flex",
		justifyContent: "space-between",
	},
	logo: {
		marginRight: theme.spacing(2),
	},
	list: {
		width: 250,
	},
}))

const menuItems = [
	{
		key: "0",
		caption: "Top Voters",
		onClick: () => {
			location.href = "/voteboard"
		},
	},
	{
		key: "1",
		caption: "Top Credits",
		onClick: () => {
			location.href = "/leaderboard/credits"
		},
	},
	{
		key: "2",
		caption: "Top Levels/XP",
		onClick: () => {
			location.href = "/leaderboard/xp"
		},
	},
	{
		key: "group-1",
		caption: "Top Wins",
		onClick: () => {},
		subMenuItems: [
			{
				key: "3",
				caption: "Global Wins",
				onClick: () => {
					location.href = "/leaderboard/wins"
				},
			},
			{
				key: "4",
				caption: "Build Battle",
				onClick: () => {
					location.href = "/leaderboard/wins/BB"
				},
			},
			{
				key: "5",
				caption: "BlockHunt",
				onClick: () => {
					location.href = "/leaderboard/wins/BH"
				},
			},
			{
				key: "6",
				caption: "Battle Royale",
				onClick: () => {
					location.href = "/leaderboard/wins/BR"
				},
			},
			{
				key: "7",
				caption: "Bedwars",
				onClick: () => {
					location.href = "/leaderboard/wins/BW"
				},
			},
			{
				key: "8",
				caption: "Duels",
				onClick: () => {
					location.href = "/leaderboard/wins/Duels"
				},
			},
			{
				key: "9",
				caption: "Murder Mystery",
				onClick: () => {
					location.href = "/leaderboard/wins/MM"
				},
			},
			{
				key: "10",
				caption: "Races",
				onClick: () => {
					location.href = "/leaderboard/wins/RC"
				},
			},
			{
				key: "11",
				caption: "Soccer",
				onClick: () => {
					location.href = "/leaderboard/wins/SC"
				},
			},
			{
				key: "12",
				caption: "SkyWars",
				onClick: () => {
					location.href = "/leaderboard/wins/SW"
				},
			},
		],
	},
	{
		key: "13",
		caption: "Top Kills",
		onClick: () => {
			location.href = "/leaderboard/kills"
		},
	},
	{
		key: "14",
		caption: "Top K/DR",
		onClick: () => {
			location.href = "/leaderboard/kdr"
		},
	},
	{
		key: "15",
		caption: "Top Guilds",
		onClick: () => {
			location.href = "/guildboard"
		},
	},
	{
		key: "16",
		caption: "Best Parkour",
		onClick: () => {
			location.href = "/parkourboard"
		},
	},
]

export default function Header() {
	const classes = useStyles()

	const [openList, setOpenList] = useState(false)
	const [openSecondList, setOpenSecondList] = useState(false)

	const handleClickList = () => {
		setOpenList(!openList)
	}
	const handleClickSecondList = () => {
		setOpenSecondList(!openSecondList)
	}

	const [anchorEl, setAnchorEl] = useState(null)
	const [state, setState] = useState({ right: false })
	const matches = useMediaQuery("(min-width:600px)")

	const handleClick = ({ currentTarget }) => {
		setAnchorEl(currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const toggleDrawer = (side, open) => ({ type, key }) => {
		if (type === "keydown" && (key === "Tab" || key === "Shift")) {
			return
		}
		setState({ ...state, [side]: open })
	}

	const sideList = (side) => (
		<div
			className={classes.list}
			role="presentation"
			onKeyDown={toggleDrawer(side, false)}
		>
			<List component="nav" className={classes.navList}>
				<ListItem
					button
					component={NavLink}
					exact
					onClick={toggleDrawer(side, false)}
					strict
					to={"/"}
				>
					<ListItemText primary="Stats" />
				</ListItem>
				<ListItem button onClick={handleClickList}>
					<ListItemText primary="Leaderboard" />
					{openList ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openList} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href="/voteboard"
						>
							<ListItemText primary="Top Voters" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href="/leaderboard/credits"
						>
							<ListItemText primary="Top Credits" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href="/leaderboard/xp"
						>
							<ListItemText primary="Top Levels/XP" />
						</ListItem>

						<ListItem
							button
							onClick={handleClickSecondList}
							className={classes.nestedSecond}
						>
							<ListItemText primary="Top Wins" />
							{openSecondList ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={openSecondList} timeout="auto" unmountOnExit>
							<List
								component="div"
								disablePadding
								className={classes.nestedThird}
							>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins"
								>
									<ListItemText primary="Global Wins" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/BB"
								>
									<ListItemText primary="Build Battle" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/BH"
								>
									<ListItemText primary="BlockHunt" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/BR"
								>
									<ListItemText primary="Battle Royale" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/BW"
								>
									<ListItemText primary="Bedwars" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/Duels"
								>
									<ListItemText primary="Duels" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/MM"
								>
									<ListItemText primary="Murder Mystery" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/RC"
								>
									<ListItemText primary="Races" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/SC"
								>
									<ListItemText primary="Soccer" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									component={Link}
									onClick={toggleDrawer(side, false)}
									href="/leaderboard/wins/SW"
								>
									<ListItemText primary="SkyWars" />
								</ListItem>
							</List>
						</Collapse>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href="/leaderboard/kills"
						>
							<ListItemText primary="Top Kills" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href="/leaderboard/kdr"
						>
							<ListItemText primary="Top K/DR" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href={"/guildboard"}
						>
							<ListItemText primary="Top Guilds" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							component={Link}
							onClick={toggleDrawer(side, false)}
							href={"/parkourboard"}
						>
							<ListItemText primary="Best Parkour" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem
					button
					component={Link}
					href="https://sso.nethergames.org/?service=account"
					onClick={toggleDrawer(side, false)}
				>
					<ListItemText primary="Settings" />
				</ListItem>
				<ListItem
					button
					component={Link}
					href="/vote"
					onClick={toggleDrawer(side, false)}
				>
					<ListItemText primary="Vote" />
				</ListItem>
			</List>
		</div>
	)

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar position="fixed">
					<Toolbar className={classes.navBar}>
						<RouterLink to="/">
							<Image
								className={classes.logo}
								cursor="pointer"
								edge="start"
								height="2rem"
								style={{ textIndent: "-9999px" }}
								src="https://cdn.nethergames.org/img/logo/double-line-light.png"
							/>
						</RouterLink>
						{matches && (
							<div>
								<Button component={NavLink} strict exact to={"/"}>
									Stats
								</Button>
								<Button
									aria-label="Toggle Menu"
									aria-controls="user-menu"
									aria-haspopup="true"
									onClick={handleClick}
								>
									Leaderboard
								</Button>
								<CascadingMenu
									anchorElement={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									menuItems={menuItems}
									onClose={handleClose}
									open={Boolean(anchorEl)}
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
								/>
								<Button href="https://sso.nethergames.org/?service=account">
									Settings
								</Button>
								<Button component={NavLink} strict exact to={"/vote"}>
									Vote
								</Button>
							</div>
						)}
						{!matches && (
							<div>
								<Button onClick={toggleDrawer("right", true)}>Menu</Button>
								<Drawer
									anchor="right"
									open={state.right}
									onClose={toggleDrawer("right", false)}
								>
									{sideList("right")}
								</Drawer>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</div>
		</ThemeProvider>
	)
}
