import Link from 'next/link'
import NavLink from "../NavLink"

export default function Feedback({ data }) {
  // if (!data) return

  const { id, title } = data
  return (
    <div>
      <h1>{title}</h1>
      <Link
        href={{ pathname: '/feedback/edit/[id]', query: { id } }}
        as="/edit"
        passHref
      >
        <NavLink label="Edit Feedback" variant="secondary" />
      </Link>
      
    </div>
  )
}
