import { useCallback, useEffect, useRef, useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'

function counter() {
  let count = 0

  function increment() {
    return (count += 1)
  }
  function reset() {
    return (count = 1)
  }
  return { increment, reset }
}

const { increment: generateId } = counter()

const useElementIds = ({
  id = `dropdown-${generateId()}`,
  labelId,
  menuId,
  toggleButtonId,
}) => {
  const elementIdsRef = useRef({
    id,
    labelId: labelId || `${id}-label`,
    menuId: menuId || `${id}-menu`,
    toggleButtonId: toggleButtonId || `${id}-toggle-button`,
  })
  return elementIdsRef.current
}

const useElementsProps = ({ setIsOpen }) => {
  const elementIds = useElementIds({})
  const onToggleButton = () => setIsOpen((state) => !state)

  const getButtonProps = useCallback(
    () => ({
      id: elementIds.toggleButtonId,
      'aria-labelledby': `${elementIds.labelId} ${elementIds.toggleButtonId}`,
      'aria-haspopup': 'listbox',
      type: 'button',
      onClick: onToggleButton,
    }),
    [elementIds]
  )

  const getLabelProps = useCallback(
    () => ({ id: elementIds.labelId, htmlFor: elementIds.toggleButtonId }),
    [elementIds]
  )

  const getMenuProps = useCallback(
    () => ({
      id: elementIds.menuId,
      role: 'listbox',
      'aria-labelledby': elementIds.labelId,
      tabIndex: '-1',
    }),
    [elementIds]
  )

  return {
    getButtonProps,
    getLabelProps,
    getMenuProps,
  }
}

const DropdownSelect = ({ options, selected, onChange, label, disabled }) => {
  const [isOpen, setIsOpen] = useState(false)

  const initialSelectedItemIndex = options.findIndex(
    (obj) => obj.value === selected
  )

  const [selectedIndex, setSelectedIndex] = useState(initialSelectedItemIndex)

  const me = useRef()

  const { getButtonProps, getLabelProps, getMenuProps } = useElementsProps({
    setIsOpen,
  })

  useEffect(() => {
    const { reset } = counter()
    return reset()
  }, [])

  useClickOutside(me, () => setIsOpen(false))

  const onSelectClick = (event, index, value) => {
    setSelectedIndex(index)
    onChange(value)
    setIsOpen(false)
    event.stopPropagation()
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
      <label {...getLabelProps()}>{label}</label>
      <button
        aria-expanded={isOpen}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...getButtonProps()}
      >
        {options[selectedIndex]?.label}
      </button>

      <ul {...getMenuProps()}>
        {isOpen &&
          options.map(({ label, value }, index) => (
            <li
              key={`dropdown-option-${value}`}
              className={selectedIndex === index ? 'selected' : ''}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={(e) => onSelectClick(e, index, value)}
            >
              {label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DropdownSelect
