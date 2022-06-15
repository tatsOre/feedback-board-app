import { COLOR_THEME as THEME } from '../../../lib/constants'

function Button({ children, disabled, onClick, type, variant }) {
  const colors = disabled
    ? THEME[variant]['disabled']
    : `${THEME[variant].base} ${THEME[variant].hover}`

  const styles =
    ' rounded-10 text-[13px] md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6 min-w-max'

  return (
    <button
      type={type}
      className={colors + styles}
      disabled={disabled}
      onClick={type !== 'submit' ? onClick : undefined}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  children: 'Click',
  disabled: false,
  type: 'button',
  variant: 'primary',
}

export default Button
