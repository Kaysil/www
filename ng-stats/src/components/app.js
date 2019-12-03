/** @jsx h */

import './index.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSReset, Flex, ThemeProvider } from '@chakra-ui/core'

import Faction from '../views/faction'
import Front from '../views/front'
import Guild from '../views/guild'
import Guildboard from '../views/guildboard'
import Header from './header'
import Leaderboard from '../views/leaderboard'
import NotFound from '../views/notfound'
import Player from '../views/player'
import Presentboard from '../views/presentboard'
import { h } from 'preact'

if (process.env.NODE_ENV !== 'development') {
  window.$crisp = []
  window.CRISP_WEBSITE_ID = 'ac15f3f7-12a4-4eac-a670-b20fa788c429'
  ;(() => {
    let d = document
    let s = d.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  })()
  $crisp.push(['safe', true])
}

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <div
        id="app"
        style={{
          background: 'url(https://cdn.nethergames.org/img/bg.jpg) no-repeat center center fixed',
          backgroundSize: 'cover',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Flex align="center" justify="center" h="100vh">
          <Header />
          <CSSReset />
          <Switch>
            <Route exact path="/" component={Front} />
            <Route path="/presentboard" component={Presentboard} />
            <Route path="/player" component={Player} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/guildboard" component={Guildboard} />
            <Route path="/guild" component={Guild} />
            <Route path="/faction" component={Faction} />
            <Route component={NotFound} />
          </Switch>
        </Flex>
      </div>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
