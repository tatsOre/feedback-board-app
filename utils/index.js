export const toCapitalize = (text) => {
  if (!text || typeof text !== 'string') return ''
  let label = text
  if (text.includes('-')) label = text.replace('-', ' ')
  return label
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export const getCommentsLength = (comments) => {
  if (!comments.length) return 0
  return comments.reduce((acc, comment) => {
    return acc + (comment.replies?.length || 0)
  }, comments.length || 0)
}
