import { render, screen } from '@testing-library/react'
import RoadmapCard from '../components/RoadmapCard'
import {
  MOCK_PLANNED,
  MOCK_IN_PROGRESS,
  MOCK_LIVE,
} from '../lib/utils/tests-fake-data'

describe('<FeedbackCard />', () => {
  it('renders card with status Planned with correct data and UI', () => {
    const data = MOCK_PLANNED[0]

    const { container } = render(<RoadmapCard data={data} />)

    expect(container).toMatchSnapshot()

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/feedback/${data.slug}/detail`
    )

    expect(screen.getByRole('article')).toHaveClass('planned')
  })

  it('renders card with status In-Progress with correct data and UI', () => {
    const data = MOCK_IN_PROGRESS[0]

    const { container } = render(<RoadmapCard data={data} />)

    expect(container).toMatchSnapshot()

    expect(screen.getByRole('article')).toHaveClass('in-progress')
  })

  it('renders card with status Live with correct data and UI', () => {
    const data = MOCK_LIVE[0]

    const { container } = render(<RoadmapCard data={data} />)

    expect(container).toMatchSnapshot()

    expect(screen.getByRole('article')).toHaveClass('live')
  })
})
