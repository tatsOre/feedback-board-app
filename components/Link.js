import Link from 'next/link'
import { COLOR_THEME } from '../constants'

export default function StyledLink({ href, label, variant = 'primary' }) {
  const styles = `${COLOR_THEME[variant].base} ${COLOR_THEME[variant].hover}
    text-white text-[13px] md:text-sm font-bold px-6 py-2.5 rounded-10 inline-block min-w-fit`

  return (
    <Link href={href} passHref>
      <a className={styles}>{label}</a>
    </Link>
  )
}

export const AddFeedback = () => (
  <StyledLink href="/feedback/new" label="+ Add Feedback" variant="primary" />
)
