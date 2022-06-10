import Link from 'next/link'
import { COLOR_THEME } from '../constants'

export default function StyledLink({ href, children, variant = 'primary' }) {
  const THEME = COLOR_THEME
  const styles = `${THEME[variant].base} ${THEME[variant].hover}
    text-white text-[13px] md:text-sm font-bold px-6 py-2.5 rounded-10 inline-block min-w-fit`

  return (
    <Link href={href || '#'} passHref>
      <a className={styles}>{children}</a>
    </Link>
  )
}

export const AddFeedback = () => (
  <StyledLink href="/feedback/new" variant="primary">
    + Add Feedback
  </StyledLink>
)
