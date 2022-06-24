import { render, screen } from '@testing-library/react'
import RoadmapStatus from '../components/RoadmapStatus'
import { MOCK_FEEDBACKS as data } from '../lib/utils/tests-fake-data'

describe('<RoadmapStatus />', () => {
  it('renders with correct data and matches snapshot', () => {
    const { container } = render(<RoadmapStatus data={data} />)

    expect(container).toMatchSnapshot()
  })

  it('renders link to roadmap page and correct tabular values', () => {
    render(<RoadmapStatus data={data} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/roadmap')

    const planned = screen.getByText(/planned/i)

    expect(planned).toBeInTheDocument()

    expect(planned.nextElementSibling).toHaveTextContent(data.planned.length)

    const progress = screen.getByText(/in progress/i)

    expect(progress).toBeInTheDocument()

    expect(progress.nextElementSibling).toHaveTextContent(
      data['in-progress'].length
    )

    const live = screen.getByText(/live/i)

    expect(live).toBeInTheDocument()

    expect(live.nextElementSibling).toHaveTextContent(data.live.length)
  })
})
