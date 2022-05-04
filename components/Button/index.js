const colors = {
  primary: { base: 'bg-violet-900', hover: 'hover:bg-violet-500' },
  secondary: { base: 'bg-indigo-800', hover: 'hover:bg-indigo-600' },
  danger: { base: 'bg-red-900', hover: 'hover:bg-red-500' },
}

export default function Button (props) {
  const variant = props.variant ? props.variant : 'primary'
  const styles = `${colors[variant].base} ${colors[variant].hover} 
    rounded-10 text-white font-bold text-small md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6`
  return (
    <button {...props} className={styles}>
      {props.label || 'Button Label'}
    </button>
  )
}
