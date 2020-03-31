import Button from '../button'
import Container from '../container'
import SectionHeader from '../section-header'

export default () => (
  <Container center padding wide blurple white role='region' aria-labelledby='discord'>
    <SectionHeader id='discord' title='Join our Discord server' />
    <div className='discord-intro'>
      <p>
        Chat with friends, get news, and updates. <br className='display-mobile' />
        Join the official Discord server today.
      </p>
      <div className='overlay' />
      <style jsx>{`
        .discord-intro {
          position: relative;
          height: 450px;
          max-width: 1024px;
          margin: auto;
          background: url(/static/images/discord.png);
          background-size: 100% auto;
          background-position: 0 4rem;
          background-repeat: no-repeat;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(114, 137, 218, 0) 60%,
            rgba(114, 137, 218, 1) 90%
          );
          pointer-events: none;
        }
        // CSS only media query for tablet
        @media screen and (max-width: 960px) {
          .learn-intro {
            background-position: 0 3.5rem;
            background-size: 160% auto;
          }
        }
      `}</style>
    </div>
    <div>
      <a href='https://discord.nethergames.org'>
        <Button invert>Launch Discord</Button>
      </a>
    </div>
  </Container>
)
