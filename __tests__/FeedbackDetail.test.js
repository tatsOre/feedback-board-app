import { render, screen, within } from '@testing-library/react'
import FeedbackPost from '../components/FeedbackDetail'
import useUser from '../lib/hooks/useUser'

import {
  MOCK_USER,
  MOCK_USER_FEEDBACK,
  MOCK_DETAILED_FEEDBACK,
} from '../lib/utils/tests-fake-data'

import { getCommentsLength } from 'lib/utils'

jest.mock('../lib/hooks/useUser', () => jest.fn())

beforeEach(() => {
  useUser.mockReturnValue({
    user: MOCK_USER,
  })
})

test('renders feedback with authenticated user as author', () => {
  const data = MOCK_USER_FEEDBACK

  const { container } = render(<FeedbackPost data={data} />)

  expect(container).toMatchSnapshot()

  expect(screen.getByRole('link', { name: /edit feedback/i })).toHaveAttribute(
    'href',
    `/feedback/${data.slug}/edit`
  )

  expect(
    screen.queryByPlaceholderText(/type your comment here/i)
  ).not.toBeInTheDocument()
})

test('renders feedback with authenticated user but different owner', () => {
  const data = MOCK_DETAILED_FEEDBACK

  const commentsLength = getCommentsLength(data.comments)

  const { container } = render(<FeedbackPost data={data} />)

  expect(container).toMatchSnapshot()

  expect(
    screen.queryByRole('link', { name: /edit feedback/i })
  ).not.toBeInTheDocument()

  if (commentsLength) {
    const commentsSection = document.getElementById('feedback-comments-section')

    const comments = within(commentsSection).getAllByRole('article')

    expect(comments.length).toEqual(commentsLength)
  }

  expect(
    screen.getByPlaceholderText(/type your comment here/i)
  ).toBeInTheDocument()
})

test('<FeedbackPost /> with null user', () => {
  useUser.mockReturnValue({
    user: null,
  })

  expect(screen.queryByRole('link', { name: /edit feedback/i })).toBeNull()

  expect(screen.queryByPlaceholderText(/type your comment here/i)).toBeNull()
})
