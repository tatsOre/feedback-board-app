import admin from "../firebase/nodeApp"

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  try {
    const result = await admin
      .firestore()
      .collection('feedbacks')
      .where('slug', '==', slug)
      .get()

    const docs = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return {
      props: { data: docs[0] },
      revalidate: 60,
    }
  } catch (error) {
    console.log(`Error in feedback/[${slug}] page:`, error)
    return { notFound: true }
  }
}

export default function Page(props) {
  return <div>{props?.data?.title}</div>
}
