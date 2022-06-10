import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import FilterTags from '../components/Filter'

import { FILTER_OPTIONS as ITEMS } from '../constants'

import { getRandomNumber } from '../utils'

describe('Filter Component', () => {
  afterEach(cleanup)

  const initialState = ITEMS[0].value

  const handleChange = jest.fn()

  it('render with the selected option passed via props', () => {
    render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )

    const checked = screen.getByRole('radio', { checked: true })

    expect(checked.value).toEqual(initialState)
  })

  it('calls onChange prop when clicked', () => {
    render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )

    const checked = screen.getByRole('radio', { checked: true })

    fireEvent.click(checked)

    expect(handleChange).toHaveBeenCalledTimes(0)

    const newIndex = getRandomNumber(1, ITEMS.length)

    const newChecked = screen.getByLabelText(ITEMS[newIndex].label)

    fireEvent.click(newChecked)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('', () => {
    const { rerender } = render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )

    let checked = screen.getByRole('radio', { checked: true })

    expect(checked.value).toEqual(initialState)

    const newIndex = getRandomNumber(1, ITEMS.length)

    const newChecked = screen.getByLabelText(ITEMS[newIndex].label, {
      selector: 'input',
    })

    rerender(
      <FilterTags
        items={ITEMS}
        checked={newChecked.value}
        onChange={handleChange}
      />
    )

    checked = screen.getByRole('radio', { checked: true })

    expect(checked.value).toEqual(ITEMS[newIndex].value)
  })
})
