import { useEffect, useRef, useState } from 'react'

const Select = ({ options, selected, onChange, labelDetail, disabled }) => {
  const [isOpen, setIsOpen] = useState(false)

  const initialSelectedItemIndex = options.findIndex(
    (obj) => obj.value === selected
  )

  const [selectedIndex, setSelectedIndex] = useState(initialSelectedItemIndex)

  const me = useRef()

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (isOpen && me.current && !me.current.contains(target)) setIsOpen(false)
    }
    document.body.style.overflowY = isOpen ? 'scroll' : ''

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen])

  const onToggleButton = () => setIsOpen(!isOpen)

  const onSelectClick = (index, value) => {
    setSelectedIndex(index)
    onChange(value)
    setIsOpen(!isOpen)
  }

  const onKeyDown = (event) => {
    let newIndex
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        newIndex =
          selectedIndex === options.length - 1
            ? selectedIndex
            : selectedIndex + 1
        setSelectedIndex(newIndex)
        break
      case 'ArrowUp':
        event.preventDefault()
        newIndex = selectedIndex - 1 <= 0 ? 0 : selectedIndex - 1
        setSelectedIndex(newIndex)
        break

      case 'Enter':
        isOpen && onChange(options[selectedIndex].value)
      default:
        return
    }
  }

  return (
    <div ref={me} id="dropdown-container" className={`${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        id="dropdown-toggle-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label dropdown-toggle-button"
        onClick={onToggleButton}
        onKeyDown={onKeyDown}
        disabled={disabled}
      >
        {labelDetail && <span>{labelDetail} </span>}
        {options[selectedIndex]?.label}
      </button>

      <ul
        id="dropdown-menu"
        role="listbox"
        aria-labelledby="dropdown-label"
        tabIndex="-1"
      >
        {isOpen &&
          options.map(({ label, value }, index) => (
            <li
              key={`dropdown-option-${value}`}
              className={selectedIndex === index ? 'selected' : ''}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => onSelectClick(index, value)}
            >
              {label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Select
