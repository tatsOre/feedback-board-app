export const ArrowUp = ({ color, className = '' }) => {
  return (
    <svg
      className={className}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  )
}
