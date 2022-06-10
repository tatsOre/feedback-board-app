import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import Button from '../components/Buttons/Default'

describe('Default Button', () => {
  afterEach(cleanup)

  const handleClick = jest.fn()

  it('render with correct label', () => {
    render(
      <Button type="submit" onClick={handleClick}>
        Send
      </Button>
    )

    const button = screen.getByText(/Send/)

    expect(button).toBeInTheDocument()

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('render with default label and type when no props are passed', () => {
    render(<Button onClick={handleClick}></Button>)

    const button = screen.getByText(/Click/)

    expect(button).toBeInTheDocument()

    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick prop when clicked', () => {
    render(<Button onClick={handleClick}>Delete</Button>)

    const button = screen.getByText(/Delete/)

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
