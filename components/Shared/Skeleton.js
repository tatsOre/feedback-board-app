export default function Skeleton({ children, style }) {
  return (
    <span className="skeleton" style={style}>
      {children}
    </span>
  )
}
