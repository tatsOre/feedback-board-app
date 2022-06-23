import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../components/Buttons/Default'

describe('Default Button', () => {
  const handleClick = jest.fn()

  it('renders with correct label', () => {
    const ERROR = { message: true }

    render(
      <Button type="submit" disabled={ERROR}>
        Send
      </Button>
    )

    const button = screen.getByText(/Send/)

    expect(button).toBeInTheDocument()

    expect(button).toHaveAttribute('type', 'submit')

    expect(button).toBeDisabled()
  })

  it('renders with default label and type when no props are passed', () => {
    render(<Button onClick={handleClick}></Button>)

    const button = screen.getByText(/Click/)

    expect(button).toBeInTheDocument()

    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick prop when clicked', async () => {
    render(<Button onClick={handleClick}>Delete</Button>)

    const button = screen.getByText(/Delete/)

    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
