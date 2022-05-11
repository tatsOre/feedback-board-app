const ArrowUp = ({ color }) => {
  return (
    <svg
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

const ArrowLeft = ({ color, className }) => {
  return (
    <svg
      width="7"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9L2 5l4-4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  )
}

export { ArrowUp, ArrowLeft }
