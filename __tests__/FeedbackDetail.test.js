import { render } from '@testing-library/react'

import FeedbackPost from '@/components/FeedbackDetail'

import useUser from '../lib/hooks/useUser'

jest.mock('../lib/hooks/useUser', () => jest.fn())

beforeEach(() => {
  useUser.mockReturnValue({})
})

test('<FeedbackPost /> ', () => {
  useUser.mockReturnValue({
    user: null
  })
  // Passes
})


// test user is auth and is their feedback
// user is auth but others feedback
// user is null

