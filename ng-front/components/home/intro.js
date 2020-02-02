import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import Container from '../container'
import ArrowRightLong from '../icons/arrow-right-long'
import Button from '../button'
import Popover from '../popover'
import Campaign from './campaign'

const LOGO_TOP = 170

function easing(t) {
  return 1 + --t * t * t * t * t
}

export default class extends React.PureComponent {
  state = {
    scroll: 0
  }

  onScroll = () => {
    const scroll = window.scrollY || document.body.scrollTop
    this.setState({ scroll })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const { scroll } = this.state

    return (
      <Container
        role='main'
        wide
        center
        overflow
        dark
        imageBackground
        minHeight={564}
        mobileStyle={'min-height: 460px;'}
        style={{
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <Container>
          <div className='intro-container'>
            <style jsx>{`
              .intro-container {
                margin: 0 0 2rem 0;
                overflow: visible;
              }
              h2 {
                margin-top: 1rem;
                margin-bottom: 2rem;
              }
              .main-button {
                margin-bottom: 2rem;
              }
              .links {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .links > * {
                padding: 0 0.5rem;
              }
              .campaign {
                width: 100%;
                letter-spacing: -0.02rem;
                overflow: hidden;
                pointer-events: none;
                cursor: default;
                z-index: -1;
              }
              .f-xs-0 {
                font-size: 2.887rem; /* 2.566rem; /* 2.281rem; */
              }
              .f-xs-1 {
                font-size: 2.027rem; //.566rem;
              }
              .logo-main {
                position: float;
                display: flex;
                justify-content: center;
                color: #0076ff;
                left: 0;
                right: 0;
                width: 200px;
                margin: auto;
                z-index: 1000;
              }
              .logo-main .version {
                width: 0;
                // margin-left: -0.2rem;
                margin-top: 0.4rem;
                cursor: pointer;
              }
              .version.hide {
                opacity: 0;
              }
              a.version {
                color: #0076ff;
              }
              .version .tip {
                color: #111;
                white-space: nowrap;
              }
              .title-1 {
                font-size: 1.802032470703125em;
              }
              .title-2 {
                font-size: 2.887rem;
                margin-top: -4.2rem;
                margin-bottom: 0;
              }
              .campaign {
                margin: 1rem 0 1.6rem;
              }
              .icon {
                line-height: 0;
                vertical-align: middle;
              }
              // CSS only media query for mobile
              @media screen and (max-width: 640px) {
                .logo-main {
                  display: none;
                }
                .title-1 {
                  font-size: 1.423828125em;
                }
                .title-2 {
                  font-size: 1.802032470703125em;
                  margin-top: -2.4rem;
                }
                .campaign {
                  margin: 0 0 2rem;
                }
              }
            `}</style>
            <div
              className='logo-main f4 fw6'
              style={{
                top: Math.max(LOGO_TOP - scroll, 7),
                willChange: `transform`,
                transform: `scale(${Math.max(easing(1 - scroll / LOGO_TOP), -0.325) * 0.325 +
                  0.625}) translate3d(0, 0, 0)`,
                transformOrigin: 'top'
              }}
            >
              <Link href={scroll >= LOGO_TOP ? '/' : undefined}>
                <a aria-label='NetherGames'>
                  <img height={80} src='/static/images/logo.png' />
                </a>
              </Link>
            </div>
            <div className='campaign no-drag no-tap-highlight'>
              <h1 className={classNames('title-1', 'fw6')}>All for one. All for fun. Play</h1>
              <h2 className={classNames('title-2', 'fw7')}>
                <Campaign />
              </h2>
            </div>
            <div>
              <div className='main-button'>
                <Button
                  target='_blank'
                  href='minecraft://?addExternalServer=NetherGames|play.nethergames.org:19132'
                  invert
                  prefetch
                >
                  Launch Minecraft now{' '}
                  <span className='icon'>
                    <ArrowRightLong color='white' />
                  </span>
                </Button>
              </div>
              <div className='links'>
                <a rel='noreferrer' target='_blank'>
                  <span className='mute'>Or connect to play.nethergames.org (19132)</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    )
  }
}
