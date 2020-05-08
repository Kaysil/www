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
  Text
} from '@chakra-ui/core'
import { Component, h } from 'preact'

import { Helmet } from 'react-helmet'
import Tooltip from '@material-ui/core/Tooltip'

export default class Player extends Component {
  state = {
    failed: false,
    data: {}
  }

  componentDidMount() {
    const input = window.location.pathname.split('/')[2]

    fetch(`https://api.nethergames.org/?action=stats&player=${input}`)
      .then((res) => res.json())
      .then((res) => this.setState({ data: res }))
      .catch(() => this.setState({ failed: true }))
  }

  render() {
    const stats = this.state.data
    const failed = this.state.failed

    if (failed || null === stats) {
      return <Heading color='white'>We couldn't find that player!</Heading>
    }

    if (!stats.winsData && !stats.factionsData && !stats.rankHexes) {
      return (
        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
      )
    }

    return (
      <div>
        <Helmet>
          <title>{stats.name}</title>
          <meta property='og:site_name' content='NetherGames Network' />
          <meta property='og:title' content={`Player statistics for ${stats.name}`} />
          <meta property='og:type' content='profile' />
          <meta property='og:url' content={`https://portal.nethergames.org/player/${stats.name}`} />
          <meta
            property='og:image'
            content={`https://nethergames.nyc3.digitaloceanspaces.com/avatars/${stats.name}.png`}
          />
          <meta property='og:profile:username' content={stats.name} />
          <meta
            property='og:description'
            content={`Kills: ${stats.kills} | Deaths: ${stats.deaths} | Wins: ${stats.wins} | Level: ${stats.level} | Credits: ${stats.status_credits}`}
          />
        </Helmet>
        <Box bg='white' borderWidth='1px' overflow='auto' rounded='lg' minH='m' maxW='lg' p='4'>
          <Flex>
            <Avatar
              src={`https://nethergames.nyc3.digitaloceanspaces.com/avatars/${stats.name}.png`}
            >
              {0 !== stats.voted && (
                <Tooltip title='Voted'>
                  <AvatarBadge as={Icon} name='check-circle' size='1.25em' color='black' />
                </Tooltip>
              )}
            </Avatar>
            <Box ml='3'>
              <Box fontWeight='bold'>
                {stats.name}
                {stats.tierHexes.hasOwnProperty('Bronze') && (
                  <Badge backgroundColor='#b84e00' color='#fff' ml='1'>
                    Bronze
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Silver') && (
                  <Badge backgroundColor='#777' color='#fff' ml='1'>
                    Silver
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Gold') && (
                  <Badge backgroundColor='#f79500' color='#fff' ml='1'>
                    Gold
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Ruby') && (
                  <Badge backgroundColor='#ff0024' color='#fff' ml='1'>
                    Ruby
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Diamond') && (
                  <Badge backgroundColor='#00c5e5' color='#fff' ml='1'>
                    Diamond
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Sapphire') && (
                  <Badge backgroundColor='#3b37e8' color='#fff' ml='1'>
                    Sapphire
                  </Badge>
                )}
                {stats.tierHexes.hasOwnProperty('Platinum') && (
                  <Badge backgroundColor='#777' color='#fff' ml='1'>
                    Platinum
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Owner') && (
                  <Badge backgroundColor='#ff0024' color='#fff' ml='1'>
                    Owner
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Dev') && (
                  <Badge backgroundColor='#ff0041' color='#fff' ml='1'>
                    Dev
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Director') && (
                  <Badge backgroundColor='#00cc62' color='#fff' ml='1'>
                    Director
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Advisor') && (
                  <Badge backgroundColor='#ff0024' color='#fff' ml='1'>
                    Advisor
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Commmunity') && (
                  <Badge backgroundColor='#ff009b' color='#fff' ml='1'>
                    Community
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Admin') && (
                  <Badge backgroundColor='#ffac1a' color='#fff' ml='1'>
                    Admin
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Supervisor') && (
                  <Badge backgroundColor='#ff00ba' color='#fff' ml='1'>
                    Supervisor
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Support') && (
                  <Badge backgroundColor='#b66adf' color='#fff' ml='1'>
                    Support
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Mod') && (
                  <Badge backgroundColor='#00c5e5' color='#fff' ml='1'>
                    Mod
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Crew') && (
                  <Badge backgroundColor='#00cc62' color='#fff' ml='1'>
                    Crew
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Trainee') && (
                  <Badge backgroundColor='#ffab1c' color='#fff' ml='1'>
                    Trainee
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Builder') && (
                  <Badge backgroundColor='#0092e2' color='#fff' ml='1'>
                    Builder
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Artist') && (
                  <Badge backgroundColor='#ff00ba' color='#fff' ml='1'>
                    Artist
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Legend') && (
                  <Badge backgroundColor='#00c5e5' color='#fff' ml='1'>
                    Legend
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Emerald') && (
                  <Badge backgroundColor='#00cc62' color='#fff' ml='1'>
                    Emerald
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Ultra') && (
                  <Badge backgroundColor='#f79500' color='#fff' ml='1'>
                    Ultra
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('Partner') && (
                  <Badge backgroundColor='#ff4f00' color='#fff' ml='1'>
                    Partner
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('YouTube') && (
                  <Badge backgroundColor='#ff0024' color='#fff' ml='1'>
                    YouTube
                  </Badge>
                )}
                {stats.rankHexes.hasOwnProperty('YT') && (
                  <Badge backgroundColor='#006e96' color='#fff' ml='1'>
                    YT
                  </Badge>
                )}
              </Box>
              <Text fontSize='m'>
                {Math.round((stats.kills / stats.deaths) * 100) / 100} k/d ratio
              </Text>
            </Box>
          </Flex>
          <Flex pt='4' pb='2'>
            <Text fontSize='m'>
              {stats.kills} kills · {stats.deaths} deaths · {stats.wins} wins · {stats.level} levels
              · {stats.status_credits} credits
            </Text>
          </Flex>
          <Flex pb='4'>
            <Text fontSize='lg'>
              <Icon name='view' /> Last seen {stats.online ? 'right now' : `${stats.lastSeen} ago`}{' '}
              in {stats.lastServer}
            </Text>
          </Flex>
          <Accordion allowToggle>
            {stats.bio !== undefined && (
              <AccordionItem>
                <AccordionHeader>
                  <Box flex='1' textAlign='left' fontWeight='bold'>
                    Biography
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>{stats.bio}</AccordionPanel>
              </AccordionItem>
            )}
            {stats.winsData[0] !== undefined && (
              <AccordionItem>
                <AccordionHeader>
                  <Box flex='1' textAlign='left' fontWeight='bold'>
                    Wins Summary
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  {stats.winsData[0].BR > 0 && <Text>Battle Royale: {stats.winsData[0].BR}</Text>}
                  {stats.winsData[0].BW > 0 && <Text>Bedwars: {stats.winsData[0].BW}</Text>}
                  {stats.winsData[0].BH > 0 && <Text>Block Hunt: {stats.winsData[0].BH}</Text>}
                  {stats.winsData[0].BB > 0 && <Text>Build Battle: {stats.winsData[0].BB}</Text>}
                  {stats.winsData[0].CTF > 0 && (
                    <Text>Capture the Flag: {stats.winsData[0].CTF}</Text>
                  )}
                  {stats.winsData[0].Duels > 0 && <Text>Duels: {stats.winsData[0].Duels}</Text>}
                  {stats.winsData[0].MM > 0 && <Text>Murder Mystery: {stats.winsData[0].MM}</Text>}
                  {stats.winsData[0].RC > 0 && <Text>Races: {stats.winsData[0].RC}</Text>}
                  {stats.winsData[0].SC > 0 && <Text>Soccer: {stats.winsData[0].SC}</Text>}
                  {stats.winsData[0].SW > 0 && <Text>SkyWars: {stats.winsData[0].SW}</Text>}
                  {stats.winsData[0].SG > 0 && <Text>Survival Games: {stats.winsData[0].SG}</Text>}
                  {stats.winsData[0].TR > 0 && <Text>TNT Run: {stats.winsData[0].TR}</Text>}
                </AccordionPanel>
              </AccordionItem>
            )}
            {stats.factionsData[0] !== undefined && (
              <AccordionItem>
                <AccordionHeader>
                  <Box flex='1' textAlign='left' fontWeight='bold'>
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
