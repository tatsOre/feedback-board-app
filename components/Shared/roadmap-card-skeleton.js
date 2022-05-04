import Skeleton from '../Shared/Skeleton'

export default function CardSkeleton() {
  return (
    <div className="">
      <div className="">
        <Skeleton style={{ height: '2.25rem' }} />
        <Skeleton style={{ height: '7rem', margin: '1.25rem 0' }} />
        <Skeleton style={{ height: '1.25rem' }} />
      </div>
      <div className="">
          <Skeleton style={{ height: '1.25rem' }} />
        </div>
    </div>
  )
}