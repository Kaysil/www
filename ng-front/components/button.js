import Link from 'next/link'
import classNames from 'classnames'
import withPure from './hoc/pure'

export default withPure(({ children, invert, href, as, className, ...props }) => {
  const a = (
    <a className={classNames(className, 'fw4 no-drag', { invert })} role='button' {...props}>
      {children}
      <style jsx>
        {`
          a {
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            padding: 0.25rem 0.5rem;
            margin: -0.25rem -0.5rem;
            border-radius: 7px;
            color: #ff851b;
            transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
          }
          a:hover {
            color: #ff851b;
            background: rgba(255, 133, 27, 0.1);
          }
          a.invert {
            margin: 0;
            padding: 0 2rem;
            height: 2.5rem;
            line-height: 2.5rem;
            border-radius: 7px;
            background: #ff851b;
            box-shadow: 0 4px 14px 0 rgba(255, 133, 27, 0.39);
            color: white;
          }
          a.invert:hover {
            background: rgba(255, 133, 27, 0.9);
            box-shadow: 0 6px 20px rgba(255, 133, 27, 0.23);
          }
          a.invert:active {
            background: #ff851b;
          }
        `}
      </style>
    </a>
  )

  if (href) {
    return (
      <Link href={href} as={as}>
        {a}
      </Link>
    )
  }
  return a
})
