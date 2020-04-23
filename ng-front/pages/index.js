import Page from '../components/page'
import Header from '../components/header'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Notification from '../components/notification'
import { MediaQueryConsumer } from '../components/media-query'

import Intro from '../components/home/intro'
import Features from '../components/home/features'
import Discord from '../components/home/discord'
import SocialMeta from '../components/social-meta'

export default () => (
  <Page title='NetherGames'>
    <SocialMeta
      image={'/static/images/card.png'}
      title='NetherGames'
      url='https://nethergames.org'
      description='All for one. All for fun. Play Bedwars, Creative, Duels, Factions, Murder Mystery and SkyWars among other games with your friends now.'
    />
    <MediaQueryConsumer>
      {({ isMobile }) => (
        <Header height={32} offset={-32} distance={32} shadow active={isMobile ? 32 : 160}>
          <Notification
            href='https://forums.nethergames.org/threads/20th-april-2020.7667/'
            title='NEW LOBBY'
            titleMobile='NEW LOBBY'
          >
            NEW LOBBY - A new mega-sized lobby has dropped and is waiting to be explored! — Monday, April 20th
          </Notification>
          <Navbar hideLogo={!isMobile} />
        </Header>
      )}
    </MediaQueryConsumer>
    <Intro />
    <Features />
    <Discord />
    <Footer />
  </Page>
)
