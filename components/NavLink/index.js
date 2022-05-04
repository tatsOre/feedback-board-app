import React from 'react'

const colors = {
  primary: { base: 'bg-violet-900', hover: 'hover:bg-violet-500' },
  secondary: { base: 'bg-blue-900', hover: 'hover:bg-blue-500' },
}

const NavLink = React.forwardRef(({ label, variant, href, onClick }, ref) => {
  const styles = `${colors[variant].base} ${colors[variant].hover}
    text-white text-small md:text-sm font-bold px-6 pb-3 pt-2.5 rounded-10`
  return (
    <a ref={ref} href={href} onClick={onClick} className={styles}>
      {label}
    </a>
  )
})

export default NavLink
