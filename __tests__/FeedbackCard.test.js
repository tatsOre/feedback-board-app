import { render } from '@testing-library/react'

import FeedbackCard from '../components/FeedbackCard'

const MOCK_DATA = {
  id: 1,
  title: 'Add tags for solutions',
  category: 'enhancement',
  status: 'suggestion',
  description: 'Easier to search for solutions based on a specific stack.',
  upvotes: 0,
  author: 'admin',
  comments: [
    {
      id: 1,
      content:
        'Awesome idea! Trying to find framework-specific projects within the hubs can be tedious',
      user: {
        image: 'user-images/image-suzanne.jpg',
        name: 'Suzanne Chang',
        username: 'upbeat1811',
      },
    },
    {
      id: 2,
      content:
        'Please use fun, color-coded labels to easily identify them at a glance',
      user: {
        image: 'user-images/image-thomas.jpg',
        name: 'Thomas Hood',
        username: 'brawnybrave',
      },
    },
  ],
}
jest.mock('../hooks/useUser', () => ({
  __esModule: true,
  default: () => jest.fn(() => ({ user: null })),
}))

describe('', () => {
  it('', () => {
    const { container, debug } = render(<FeedbackCard data={MOCK_DATA} />)
    //debug()
  })
})
