import MOCK_FEEDBACKS_DATA from '../../__mocks__/mock-feedbacks.json'
import MOCK_USER_DATA from '../../__mocks__/mock-user-info.json'
import MOCK_USER_FEEDBACK_DATA from '../../__mocks__/mock-user-feedback.json'
import MOCK_DETAILED_FEEDBACK_DATA from '../../__mocks__/mock-detailed-feedbacks.json'


export const MOCK_USER = MOCK_USER_DATA.data

export const MOCK_USER_FEEDBACK = MOCK_USER_FEEDBACK_DATA.data

export const MOCK_FEEDBACKS = MOCK_FEEDBACKS_DATA.data

export const MOCK_PLANNED = MOCK_FEEDBACKS.planned

export const MOCK_IN_PROGRESS = MOCK_FEEDBACKS['in-progress']

export const MOCK_LIVE = MOCK_FEEDBACKS.live

export const MOCK_SUGGESTION = MOCK_FEEDBACKS.suggestion

export const MOCK_DETAILED_FEEDBACK = MOCK_DETAILED_FEEDBACK_DATA.data


// import '@testing-library/jest-dom'