const Button = ({ type, variant, children, handleClick }) => {
  const background = {
    primary: 'bg-violet-900',
    secondary: 'bg-indigo-800',
    tertiary: 'bg-blue-900',
    danger: 'bg-red-900',
  }

  const classes = `${background[variant]} rounded-10 text-white font-bold text-small md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6 cursor-pointer`
  return (
    <button type={type} onClick={handleClick} className={classes}>
      {children}
    </button>
  )
}

export default Button
