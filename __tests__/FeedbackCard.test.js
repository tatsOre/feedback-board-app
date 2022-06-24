import { render, screen } from '@testing-library/react'
import FeedbackCard from '../components/FeedbackCard'
import MOCK_FEEDBACK_DATA from '../__mocks__/mock-feedbacks.json'

describe('<FeedbackCard />', () => {
  const {
    data: { suggestion },
  } = MOCK_FEEDBACK_DATA

  it('renders with correct data and UI', () => {
    const { container } = render(<FeedbackCard data={suggestion[0]} />)

    expect(container).toMatchSnapshot()

    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      suggestion[0].title
    )

    expect(screen.getByRole('button', { name: 'upvote' })).toBeInTheDocument()
  })

  it('renders with correct data and UI with link to Feedback Post', () => {
    const { container } = render(<FeedbackCard data={suggestion[1]} link />)

    expect(container).toMatchSnapshot()

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/feedback/${suggestion[1].slug}/detail`
    )

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      suggestion[1].title
    )
  })
})
