import Link from 'next/link'

import Container from './container'
import withPure from './hoc/pure'

export default withPure(() => (
  <Container wide dark>
    <Container>
      <footer>
        <style jsx>
          {`
            footer {
              padding: 2rem 0 4rem;
              min-height: 400px;
            }
            a,
            p,
            .copyright {
              color: #8c8c8c;
            }
            h4 a {
              color: inherit;
            }
            a:hover {
              color: #ff851b;
            }
            .copyright {
              margin-top: 3rem;
            }
            .copyright div {
              margin-top: 0.5rem;
            }
            .row {
              align-items: flex-start;
            }
            h4 {
              margin-bottom: 0.75rem;
            }
            p {
              margin-top: 0;
              margin-bottom: 0.25rem;
            }
            * + h4 {
              margin-top: 1rem;
            }
            // CSS only media query for mobile
            @media screen and (max-width: 640px) {
              footer .column {
                flex: 1 1 120px;
              }
              footer .row {
                flex-direction: row;
                flex-wrap: wrap;
              }
            }
          `}
        </style>
        <div className='row f5'>
          <div className='column'>
            <h4 className='fw5'>Social</h4>
            <p>
              <Link href='https://instagram.com/NetherGamesMC'>
                <a rel='noreferrer' target='_blank'>
                  Instagram
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://facebook.com/NetherGamesMC'>
                <a rel='noreferrer' target='_blank'>
                  Facebook
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://twitter.com/NetherGamesMC'>
                <a rel='noreferrer' target='_blank'>
                  Twitter
                </a>
              </Link>
            </p>
          </div>
          <div className='column'>
            <h4 className='fw5'>Support</h4>
            <p>
              <Link href='https://ngmc.co/s'>
                <a rel='noreferrer' target='_blank'>
                  Knowledge Base
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://ngmc.co/lc'>
                <a rel='noreferrer' target='_blank'>
                  Live Support
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://ngmc.co/d'>
                <a rel='noreferrer' target='_blank'>
                  Discord Server
                </a>
              </Link>
            </p>
          </div>
          <div className='column'>
            <h4 className='fw5'>Legal</h4>
            <p>
              <Link href='https://ngmc.co/tac'>
                <a rel='noreferrer' target='_blank'>
                  Terms and Conditions
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://ngmc.co/pp'>
                <a rel='noreferrer' target='_blank'>
                  Data & Privacy Policy
                </a>
              </Link>
            </p>
            <p>
              <Link href='https://ngmc.co/rrp'>
                <a rel='noreferrer' target='_blank'>
                  Ranks & Refunds Policy
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className='copyright f6'>
          <Link href='#'>
            <a rel='noreferrer' target='_blank' aria-label='NetherGames'>
              <img
                height={30}
                style={{ transform: 'translateX(4%)' }}
                src='/static/images/logo.png'
              />
            </a>
          </Link>
          <div>
            {' '}
            Copyright © 2019 NetherGames Network. All rights reserved.
            <br />
            All trademarks are property of their respective owners.
            <br />
            <a href='https://ngmc.co/a'>Account Dashboard/Player Statistics</a> |{' '}
            <img
              src='https://status.nethergames.org/includes/badge'
              style={{
                height: '8px',
                marginBottom: '1px',
                borderRadius: '100%'
              }}
            />{' '}
            <a href='https://status.nethergames.org'>Network Status</a>
          </div>
        </div>
      </footer>
    </Container>
  </Container>
))
