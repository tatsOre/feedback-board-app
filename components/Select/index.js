import { useEffect, useRef, useState } from 'react'

const Select = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const initialIndex = options.findIndex((obj) => obj.value === selected)

  const [highlightedIndex, setHighlightedIndex] = useState(initialIndex)

  const me = useRef()

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      // contains from browser API
      if (isOpen && me.current && !me.current.contains(target)) setIsOpen(false)
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen])

  const handleToggleButton = (event) =>  {
    setIsOpen(!isOpen)
    setHighlightedIndex(0)
  }

  const handleOptionOnClick = (option) => {
    onChange(option)
    setIsOpen(!isOpen)
    setHighlightedIndex(null)
  }

  const handleKeyDown = (event) => {
    let newIndex
    switch (event.key) {
      case 'ArrowDown':
        console.log("wft")
        console.log(event.key, event.keyCode, event.target)

        newIndex =
          highlightedIndex === options.length - 1
            ? highlightedIndex
            : highlightedIndex + 1
        setHighlightedIndex(newIndex)
        !isOpen && onChange(options[newIndex].value)
        console.log(selected)
        break
      case 'ArrowUp':
        newIndex = highlightedIndex - 1 <= 0 ? 0 : highlightedIndex - 1
        setHighlightedIndex(newIndex)
        console.log(newIndex)
        //listItems[newIndex].focus()
        break
      default:
        console.log('key pressed:', event.key)
        return
    }
  }

  return (
    <div ref={me}>
      <button
        type="button"
        id="dropdown-toggle-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label dropdown-toggle-button"
        onClick={handleToggleButton}
        onKeyDown={handleKeyDown}
        className="text-white font-normal text-[13px]"
      >
        Sort by: {"Most Upvotes"}
      </button>

      <ul
        className="bg-indigo-300"
        id="dropdown-menu"
        role="listbox"
        aria-labelledby="dropdown-label"
        tabIndex="-1"
        onKeyDown={(event) => handleOptionKeyDown(event)}
      >
        {isOpen &&
          options.map(({ label, value }, index) => (
            <li
              key={`select-${value}`}
              className={`${
                value === selected ? 'font-bold' : 'font-regular'
              } ${
                index === highlightedIndex && value !== selected
                  ? 'text-violet-900'
                  : ''
              } hover:bg-red-500 focus:bg-red-500`}
              role="option"
              aria-selected={value === selected}
              id={`category-option-${value}`}
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
