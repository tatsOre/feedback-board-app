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
  if (!comments || !comments.length) return 0
  return comments.reduce((acc, comment) => {
    return acc + (comment.replies?.length || 0)
  }, comments.length || 0)
}

export const getRandomNumber = (min, max) => {
  let difference = max - min

  let rand = Math.random()

  rand = Math.floor(rand * difference)

  return rand + min
}

export const reduceFeedbacksData = (data) => {
  const accSchema = {
    planned: [],
    'in-progress': [],
    live: [],
    suggestion: [],
  }

  const result = data.reduce((acc, req) => {
    let status = req.status
    let doc = {
      id: req._id.toString(),
      title: req.title,
      slug: req.slug,
      description: req.description,
      status: req.status,
      category: req.category,
      comments: getCommentsLength(req.comments),
      upvotes: req.upvotes,
    }
    acc[status] = acc[status].length ? [...acc[status], doc] : [doc]
    return acc
  }, accSchema)

  return result
}
