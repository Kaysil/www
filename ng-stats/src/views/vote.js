/** @jsx h */

import { Box, Button, Heading, Input, InputGroup, Link, Stack, Text } from '@chakra-ui/core'

import { h } from 'preact'
import { useState } from 'preact/hooks'

export const Vote = () => {
  const [query, setQuery] = useState('')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function checkStatus(gamertag) {
    setIsLoading(true)

    const response = await fetch(
      `https://api.nethergames.org/?action=voteCheck&player=${encodeURIComponent(gamertag)}`
    )
    const data = await response.json()
    setData(data)

    setIsLoading(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    checkStatus(query)
    setQuery('')
  }

  function handleChange(event) {
    setQuery(event.target.value)
  }

  return (
    <Box color="white">
      {!data ? (
        <Stack align='center' justify='center' spacing={4}>
          <Heading>Check your vote status</Heading>

          <Box
            bg='white'
            borderWidth='1px'
            overflow='hidden'
            rounded='lg'
            minW={['sm', 'lg']}
            p='4'
          >
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  autoComplete='off'
                  isFullWidth
                  isRequired
                  name='query'
                  onChange={handleChange}
                  placeholder='Enter your Xbox Live Gamertag ...'
                  size='lg'
                  type='text'
                  value={query}
                />
                <Button type='submit' variantColor='teal' size='sm' ml={2} isLoading={isLoading}>
                  Search
                </Button>
              </InputGroup>
            </form>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={2} justify='center' align='center'>
          <Heading size='lg'>Hello {data.player}!</Heading>
          {data.status === 0 && (
            <Stack spacing={2} justify='center' align='center'>
              <Text fontSize='lg'>You haven't voted yet today!</Text>
              <Button
                as='a'
                href='https://minecraftpocket-servers.com/server/36864/vote'
                variantColor='teal'
              >
                Vote now
              </Button>
            </Stack>
          )}
          {data.status === 1 && (
            <Text fontSize='lg'>
              You have already voted today, but you haven't claimed your in-game rewards yet. You
              can claim your rewards and Voter rank by joining NetherGames.
            </Text>
          )}
          {data.status === 2 && (
            <Text fontSize='lg'>
              You have already voted and claimed your in-game rewards today! Don't forget to vote
              again tomorrow for your chance to win a free rank upgrade!
            </Text>
          )}
        </Stack>
      )}
    </Box>
  )
}
