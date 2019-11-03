/** @jsx h */

import { Component, h } from 'preact'

import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  rootMenu: {
    overflow: 'visible'
  },
  menuItem: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'visible',
    position: 'relative',
    '& a': {
      color: theme.palette.common.black
    }
  },
  caption: {
    alignItems: 'center',
    display: 'flex'
  },
  arrowIcon: {
    paddingLeft: 24
  },
  subMenu: {
    opacity: '0',
    position: 'absolute',
    right: '100%',
    transform: 'scale(0.75, 0.5625)',
    transformOrigin: 'top right',
    transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} 0ms, transform ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} 0ms`, // match Menu transition
    top: '-8px',
    visibility: 'hidden'
  },
  subMenuOpen: {
    transform: 'scale(1, 1) translateZ(0px)',
    visibility: 'visible',
    opacity: '1'
  }
})

class CascadingMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subMenuStates: []
    }
  }

  handleItemClick = (event, menuItem) => {
    const hasSubMenu = !!(menuItem.subMenuItems && menuItem.subMenuItems.length)

    if (hasSubMenu) {
      const subMenuStates = [...this.state.subMenuStates]

      for (const subMenuState of subMenuStates) {
        if (subMenuState.key === menuItem.key) {
          subMenuState.anchorElement = event.target
          subMenuState.open = !subMenuState.open
        } else {
          subMenuState.open = false
        }
      }

      this.setState({ subMenuStates })
    } else {
      this.closeAllMenus()
    }

    menuItem.onClick()
  }

  closeAllMenus() {
    this.setState({ subMenuStates: [] })
    this.props.onClose()
  }

  renderMenuItem = menuItem => {
    const { classes } = this.props
    const { subMenuStates } = this.state
    const hasSubMenu = !!(menuItem.subMenuItems && menuItem.subMenuItems.length)
    let subMenuState = subMenuStates.find(menuState => menuState.key === menuItem.key)

    if (hasSubMenu && !subMenuState) {
      subMenuState = {
        key: menuItem.key,
        anchorElement: null,
        open: false
      }

      subMenuStates.push(subMenuState)
    }

    return (
      <MenuItem
        onClick={e => this.handleItemClick(e, menuItem)}
        className={classes.menuItem}
        key={menuItem.key}
      >
        <div className={classes.caption}>{menuItem.caption}</div>
        {hasSubMenu && (
          <>
            <ArrowRightIcon className={classes.arrowIcon} />
            <Paper className={`${classes.subMenu} ${subMenuState.open ? classes.subMenuOpen : ''}`}>
              <MenuList>
                {menuItem.subMenuItems.map(subMenuItem => this.renderMenuItem(subMenuItem))}
              </MenuList>
            </Paper>
          </>
        )}
      </MenuItem>
    )
  }

  render() {
    const { anchorElement, open, onClose, menuItems, classes, ...others } = this.props

    return (
      <Menu
        {...others}
        anchorEl={anchorElement}
        elevation={2}
        classes={{
          paper: classes.rootMenu
        }}
        open={open}
        onClose={() => this.closeAllMenus()}
      >
        {menuItems.map(menuItem => this.renderMenuItem(menuItem))}
      </Menu>
    )
  }
}

CascadingMenu.propTypes = {
  anchorElement: PropTypes.any,
  classes: PropTypes.any,
  menuItems: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default withStyles(styles)(CascadingMenu)
