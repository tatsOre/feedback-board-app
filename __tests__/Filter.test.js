import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterTags from '../components/Filter'
import { FILTER_OPTIONS as ITEMS } from '../lib/constants'
import { getRandomNumber } from '../lib/utils'

describe('<FilterTags />', () => {
  const initialState = ITEMS[0].value

  const handleChange = jest.fn()

  it('renders with the selected option passed via props', () => {
    const { container } = render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )

    expect(container).toMatchSnapshot()

    const checked = screen.getByRole('radio', { checked: true })

    expect(checked.value).toEqual(initialState)

    expect(screen.getAllByRole('radio', { checked: false })).toHaveLength(
      ITEMS.length - 1
    )
  })

  it('calls onChange prop when clicked', async () => {
    render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )
    const index = getRandomNumber(1, ITEMS.length)

    const input = screen.getByLabelText(ITEMS[index].label)

    await userEvent.click(input)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('rerenders the updated props correctly', () => {
    const { rerender } = render(
      <FilterTags
        items={ITEMS}
        checked={initialState}
        onChange={handleChange}
      />
    )
    const index = getRandomNumber(1, ITEMS.length)

    const selected = screen.getByLabelText(ITEMS[index].label, {
      selector: 'input',
    })

    rerender(
      <FilterTags
        items={ITEMS}
        checked={selected.value}
        onChange={handleChange}
      />
    )

    const checked = screen.getByRole('radio', { checked: true })

    expect(checked.value).toEqual(ITEMS[index].value)

    expect(screen.getAllByRole('radio', { checked: false })).toHaveLength(
      ITEMS.length - 1
    )
  })
})
