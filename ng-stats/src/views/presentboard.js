/** @jsx h */

import { Avatar, Box, Flex, Heading, Link, Spinner, Text } from '@chakra-ui/core'
import { Component, h } from 'preact'

import { NavLink } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'

function createData(name, time) {
  return { name, time }
}

const styles = () => ({
  root: {
    marginTop: '3rem',
    width: '100%'
  },
  '@media (min-width: 720px)': {
    root: {
      maxWidth: '75%'
    }
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto'
  }
})

class Presentboard extends Component {
  state = {
    data: {},
    failed: false,
    page: 0,
    rowsPerPage: 10
  }

  componentDidMount() {
    fetch(`https://api.nethergames.org/?action=leaderboards&type=parkour&limit=100`)
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(() => this.setState({ failed: true }))
  }

  render() {
    const { classes } = this.props
    const failed = this.state.failed
    const page = this.state.page
    const rowsPerPage = this.state.rowsPerPage
    const stats = this.state.data

    const columns = [
      { id: 'name', label: 'Name' },
      { id: 'time', label: 'Time (seconds)', align: 'right' }
    ]

    if (failed || null === stats) {
      return <Heading color='white'>Something went wrong!</Heading>
    }

    if (!stats[0]) {
      return (
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
      )
    }

    const rows = stats.map(stat => createData(stat.player, stat.wins))

    const handleChangePage = (event, newPage) => {
      this.setState({ page: newPage })
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(({ id, align, minWidth, label }) => (
                  <TableCell key={id} align={align} style={{ minWidth }}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]
                    if (column.id === 'name') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Flex align='center'>
                            <Avatar
                              size='sm'
                              src={`https://nethergames.nyc3.digitaloceanspaces.com/avatars/${value}.png`}
                            />
                            <Box ml='3'>
                              <Text fontWeight='bold'>
                                <Link as={NavLink} strict exact to={`/player/${value}`}>
                                  {value}
                                </Link>
                              </Text>
                            </Box>
                          </Flex>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          backIconButtonProps={{ 'aria-label': 'previous page' }}
          component='div'
          count={rows.length}
          nextIconButtonProps={{ 'aria-label': 'next page' }}
          onChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(Presentboard)
