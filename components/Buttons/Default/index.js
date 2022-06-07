import { COLOR_THEME } from '../../../constants'

export default function Button({ type, label, variant = 'primary', onClick }) {
  const colors = `${COLOR_THEME[variant].base} ${COLOR_THEME[variant].hover} `
  const styles =
    'rounded-10 text-[13px] md:text-sm leading-3 h-10 md:h-11 px-4 md:px-6 min-w-max'
  return (
    <button
      type={type}
      className={colors + styles}
      onClick={type == 'button' ? onClick : null}
    >
      {label || 'Button Label'}
    </button>
  )
}
