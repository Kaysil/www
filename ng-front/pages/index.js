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
            href='/blog/113-update-warning/'
            title='1.13 UPDATE WARNING'
            titleMobile='1.13 UPDATE WARNING'
          >
            1.13 UPDATE WARNING - Another major update is coming to Minecraft Bedrock Edition, and
            there are serious consequences — Friday, September 6th
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
