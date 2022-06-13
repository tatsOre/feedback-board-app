import { COLOR_THEME as THEME } from '../../../constants'

function Button({ children, disabled, onClick, type, variant }) {
  const colors = `${THEME[variant].base} ${THEME[variant].hover} `
  const styles =
    'rounded-10 text-[13px] md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6 min-w-max'

  return (
    <button
      type={type}
      className={colors + styles}
      disabled={disabled}
      onClick={type !== 'submit' ? onClick : null}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  children: 'Click'
}

export default Button
