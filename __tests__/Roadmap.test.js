import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchMediaPolyfill from 'mq-polyfill'

import Roadmap from '../components/Roadmap'
import { ROADMAP_SECTION_TAGLINES } from '../lib/constants'
import { MOCK_FEEDBACKS as data } from '../lib/utils/tests-fake-data'

describe('<Roadmap />', () => {
  it('renders with proper ui and props', () => {
    const { container } = render(<Roadmap data={data} />)

    expect(container).toMatchSnapshot()

    expect(screen.getByRole('link', { name: /go back/i })).toHaveAttribute(
      'href',
      '/'
    )

    expect(screen.getByRole('link', { name: /add feedback/i })).toHaveAttribute(
      'href',
      '/feedback/new'
    )
  })

  it('renders sections with proper number of cards, headings and taglines', () => {
    render(<Roadmap data={data} />)

    const planned = document.getElementById('roapmap-section-planned')

    expect(
      within(planned).getByRole('heading', { level: 2 })
    ).toHaveTextContent(`Planned (${data.planned.length})`)

    expect(within(planned).getAllByRole('article')).toHaveLength(
      data.planned.length
    )

    expect(
      screen.getByText(ROADMAP_SECTION_TAGLINES['planned'])
    ).toBeInTheDocument()

    const progress = document.getElementById('roapmap-section-in-progress')

    expect(
      within(progress).getByRole('heading', { level: 2 })
    ).toHaveTextContent(`In Progress (${data['in-progress'].length})`)

    expect(within(progress).getAllByRole('article')).toHaveLength(
      data['in-progress'].length
    )

    expect(
      screen.getByText(ROADMAP_SECTION_TAGLINES['in-progress'])
    ).toBeInTheDocument()

    const live = document.getElementById('roapmap-section-live')

    expect(within(live).getByRole('heading', { level: 2 })).toHaveTextContent(
      `Live (${data.live.length})`
    )

    expect(within(live).getAllByRole('article')).toHaveLength(data.live.length)

    expect(
      screen.getByText(ROADMAP_SECTION_TAGLINES['live'])
    ).toBeInTheDocument()
  })
})

describe('<Roadmap /> with responsive view', () => {
  beforeAll(() => {
    matchMediaPolyfill(window)

    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'))
    }
  })

  it('renders section with "Planned" tab as active, and changes when the user clicks on the tabs', async () => {
    window.resizeTo(500, 1000)

    render(<Roadmap data={data} />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()

    let active = document.getElementsByClassName('active-status')

    expect(active).toHaveLength(1)

    expect(
      within(active[0]).getByRole('heading', { level: 2 })
    ).toHaveTextContent(/planned/i)

    const progressTabButton = screen.getByRole('button', {
      name: /in progress/i,
    })

    await userEvent.click(progressTabButton)

    active = document.getElementsByClassName('active-status')

    expect(active).toHaveLength(1)

    expect(
      within(active[0]).getByRole('heading', { level: 2 })
    ).toHaveTextContent(/in progress/i)

    const liveTabButton = screen.getByRole('button', {
      name: /live/i,
    })

    await userEvent.click(liveTabButton)

    active = document.getElementsByClassName('active-status')

    expect(active).toHaveLength(1)

    expect(
      within(active[0]).getByRole('heading', { level: 2 })
    ).toHaveTextContent(/live/i)
  })
})
