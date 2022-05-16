import { useEffect, useRef, useState } from 'react'

const Select = ({ options, selected, onChange, btnDetail, disabled }) => {
  const [isOpen, setIsOpen] = useState(true)

  const initialIndex = options.findIndex((obj) => obj.value === selected)

  const [highlightedIndex, setHighlightedIndex] = useState(initialIndex)

  const me = useRef()

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (isOpen && me.current && !me.current.contains(target)) setIsOpen(false)
    }
    document.body.style.overflowY = isOpen ? 'scroll' : ''
    document.body.style.position = isOpen ? 'fixed' : ''
    
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen])

  const handleToggleButton = () => {
    setIsOpen(!isOpen)
    setHighlightedIndex(0)
  }

  const handleOptionOnClick = (option) => {
    onChange(option)
    setIsOpen(!isOpen)
    setHighlightedIndex(0)
  }

  const handleKeyDown = (event) => {
    let newIndex
    switch (event.key) {
      case 'ArrowDown':
        newIndex =
          highlightedIndex === options.length - 1
            ? highlightedIndex
            : highlightedIndex + 1
        setHighlightedIndex(newIndex)
        !isOpen && onChange(options[newIndex].value)
        break
      case 'ArrowUp':
        newIndex = highlightedIndex - 1 <= 0 ? 0 : highlightedIndex - 1
        setHighlightedIndex(newIndex)
        break
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
        onClick={handleToggleButton}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      >
        {btnDetail && <span>{btnDetail} </span>}
        {options[initialIndex]?.label}
      </button>

      <ul
        id="dropdown-menu"
        role="listbox"
        aria-labelledby="dropdown-label"
        tabIndex="-1"
        onKeyDown={(event) => handleOptionKeyDown(event)}
      >
        {isOpen &&
          options.map(({ label, value }, index) => (
            <li
              key={`dropdown-option-${value}`}
              className={`${value === selected ? 'selected' : ''} ${
                index === highlightedIndex && value !== selected
                  ? 'highlighted'
                  : ''
              }`}
              role="option"
              aria-selected={value === selected}
              onClick={() => handleOptionOnClick(value)}
            >
              {label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Select
