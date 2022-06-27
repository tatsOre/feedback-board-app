import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddComment from '../components/AddComment'

// Check if this is needed:
// Integration tests will be apart
import { mutate } from 'swr'
import { AxiosAPIService } from '../lib/services/axios'

import {
  MOCK_DETAILED_FEEDBACK as data,
  MOCK_USER as user,
} from '../lib/utils/tests-fake-data'

jest.mock('swr', () => ({
  mutate: jest.fn(),
}))

jest.mock('../lib/services/axios', () => ({
  AxiosAPIService: {
    update: jest.fn(),
  },
}))

describe('<AddComment />', () => {
  it('renders with correct UI and sets the proper values when it changes', async () => {
    const { container } = render(<AddComment data={data} user={user} />)

    expect(container).toMatchSnapshot()

    const comment = 'This is a test for Add Comment component'

    const textarea = screen.getByRole('textbox')

    await userEvent.type(textarea, comment)

    expect(textarea.value).toEqual(comment)

    expect(screen.getByText(/characters left/i).textContent).toContain(
      String(250 - comment.length)
    )
  })

  it('renders error message when the form is submitted without content', async () => {
    render(<AddComment data={data} user={user} />)

    const submit = screen.getByRole('button')

    await userEvent.click(submit)

    expect(screen.getByText(/can't be empty!/i)).toBeInTheDocument()
  })
})
