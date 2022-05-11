import admin from '../../../firebase/nodeApp'
/*
  await axios.post(`/api/feedback`, {...});
*/
export default async function postFeedbackHandler(req, res) {
  try {
    const { slug } = req.body
    const db = admin.firestore()
    const feedbacks = await db.collection('feedbacks').get()
    const feedbacksData = feedbacks.docs.map((fd) => fd.data())

    if (feedbacksData.some((fd) => fd.slug === slug)) {
      res.status(400).end('The document already exist')
    } else {
      const { id } = await db.collection('feedbacks').add({
        ...req.body,
        status: 'suggestion',
        upvotes: 0,
        comments: [],
        created: new Date().toISOString(),
      })
      res.status(200).json({ id, slug })
    }
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}
