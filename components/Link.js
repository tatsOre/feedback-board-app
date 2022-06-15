import Link from 'next/link'

import { COLOR_THEME as THEME } from 'lib/constants'

function StyledLink({ href, children, variant }) {
  const colors = `${THEME[variant].base} ${THEME[variant].hover} `
  const styles = `text-white text-[13px] md:text-sm font-bold px-6 py-2.5 rounded-10 inline-block min-w-fit`

  return (
    <Link href={href} passHref>
      <a className={colors + styles}>{children}</a>
    </Link>
  )
}

export const AddFeedback = () => (
  <StyledLink href="/feedback/new">+ Add Feedback</StyledLink>
)

StyledLink.defaultProps = {
  href: '#',
  variant: 'primary',
  children: 'Click',
}

export default StyledLink
