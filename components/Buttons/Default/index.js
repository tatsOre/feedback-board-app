import { COLOR_THEME } from '../../../constants'

export default function Button({
  children,
  disabled,
  type,
  onClick,
  variant = 'primary',
}) {
  const THEME = COLOR_THEME
  const colors = `${THEME[variant].base} ${THEME[variant].hover} `
  const styles =
    'rounded-10 text-[13px] md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6 min-w-max'
  return (
    <button
      type={type || 'button'}
      className={colors + styles}
      disabled={disabled}
      onClick={type !== 'submit' ? onClick : null}
    >
      {children || 'Click'}
    </button>
  )
}
