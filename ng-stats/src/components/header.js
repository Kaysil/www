/** @jsx h */

import { Image, Link } from '@chakra-ui/core'
import { NavLink, Link as RouterLink } from 'react-router-dom'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import { h } from 'preact'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useState } from 'preact/hooks'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#000000'
    }
  }
})

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  list: {
    width: 250
  }
}))

export default function Header() {
  const classes = useStyles()

  const [openList, setOpenList] = useState(false)

  const handleClickList = () => {
    setOpenList(!openList)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [state, setState] = useState({ right: false })
  const matches = useMediaQuery('(min-width:600px)')

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (side, open) => ({ type, key }) => {
    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return
    }
    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div className={classes.list} role="presentation" onKeyDown={toggleDrawer(side, false)}>
      <List component="nav" className={classes.navList}>
        <ListItem
          button
          component={NavLink}
          exact
          onClick={toggleDrawer(side, false)}
          strict
          to={'/'}
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
              className={classes.nested}
              component={Link}
              onClick={toggleDrawer(side, false)}
              href="/leaderboard/wins"
            >
              <ListItemText primary="Top Wins" />
            </ListItem>
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
              href={'/guildboard'}
            >
              <ListItemText primary="Top Guilds" />
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
          href="https://minecraftpocket-servers.com/server/36864/vote"
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
                alt="NetherGames Logo"
                className={classes.logo}
                cursor="pointer"
                edge="start"
                height="2rem"
                src="https://cdn.nethergames.org/img/logo_cropped.png"
              />
            </RouterLink>
            {matches && (
              <div>
                <Button component={NavLink} strict exact to={'/'}>
                  Stats
                </Button>
                <Button aria-controls="lb-menu" aria-haspopup="true" onClick={handleClick}>
                  Leaderboard
                </Button>
                <Menu
                  id="lb-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} href="/leaderboard/credits" onClick={handleClose}>
                    Top Credits
                  </MenuItem>
                  <MenuItem component={Link} href="/leaderboard/xp" onClick={handleClose}>
                    Top Levels/XP
                  </MenuItem>
                  <MenuItem component={Link} href="/leaderboard/wins" onClick={handleClose}>
                    Top Wins
                  </MenuItem>
                  <MenuItem component={Link} href="/leaderboard/kills" onClick={handleClose}>
                    Top Kills
                  </MenuItem>
                  <MenuItem component={Link} href="/leaderboard/kdr" onClick={handleClose}>
                    Top K/DR
                  </MenuItem>
                  <MenuItem component={Link} href="/guildboard" onClick={handleClose}>
                    Top Guilds
                  </MenuItem>
                </Menu>
                <Button href="https://sso.nethergames.org/?service=account">Settings</Button>
                <Button href="https://minecraftpocket-servers.com/server/36864/vote">Vote</Button>
              </div>
            )}
            {!matches && (
              <div>
                <Button onClick={toggleDrawer('right', true)}>Menu</Button>
                <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                  {sideList('right')}
                </Drawer>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  )
}
