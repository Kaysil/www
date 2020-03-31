import Button from '../button'
import Container from '../container'
import SectionHeader from '../section-header'

export default () => (
  <Container center dark wide role='region' aria-labelledby='features'>
    <Container center padding>
      <SectionHeader
        id='features'
        title='Welcome to the NetherGames Network'
        description='A friendly community-based Minecraft (Bedrock Edition) server network.'
      />
      <div className='row'>
        <div className='column'>
          <h3 className='f3 fw6'>Forums</h3>
          <p>
            Chat with other players, submit feedback, appeal punishments, apply for staff, get the
            latest news, and more!
          </p>
          <a href='https://forums.nethergames.org'>
            <Button>Join the forums</Button>
          </a>
        </div>
        <div className='column'>
          <h3 className='f3 fw6'>Store</h3>
          <p>
            Unlock your pet companions, beautiful particle effects, your desired kit, ability to fly
            in the lobby to explore and more plots.
          </p>
          <a href='https://store.nethergames.org'>
            <Button>Buy a rank</Button>
          </a>
        </div>
        <div className='column'>
          <h3 className='f3 fw6'>Vote</h3>
          <p>
            Feel we're a great server? Vote now – if you become the top voter of the month you could
            win a FREE rank upgrade!
          </p>
          <a href='https://vote.nethergames.org'>
            <Button>Vote every day</Button>
          </a>
        </div>
      </div>
      <style jsx>{`
        .column {
          text-align: left;
        }
        // CSS only media query for tablet
        @media screen and (max-width: 960px) {
          .row {
            flex-direction: column;
            margin: -1.5rem 0;
          }
          .column {
            width: 100%;
            padding: 1.5rem 0;
            text-align: center;
            max-width: 350px;
          }
        }
      `}</style>
    </Container>
  </Container>
)
