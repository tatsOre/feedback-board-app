export const ERROR_MESSAGE = (error) => {
  switch (error.name) {
    case 'FirebaseError':
      return 'Something went wrong. Please try again later.'
    default:
      return 'Error, try again.'
  }
}
