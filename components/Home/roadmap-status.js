import Link from 'next/link'
import { Fragment } from 'react'
import { toCapitalize } from '../../utils/index'

const RoadmapStatus = ({ data, className }) => {
  return (
    <article className={className}>
      <h2 className="text-indigo-800 text-lg inline-block mb-5">Roadmap</h2>
      <Link href="/roadmap" passHref>
        <a className="float-right text-blue-900 text-small font-semibold underline mt-1">
          View
        </a>
      </Link>
      <dl className="flex flex-wrap items-baseline text-indigo-500">
        {Object.keys(data).map((status) => {
          return (
            <Fragment key={`roadmap-panel-${status}`}>
              <dt
                className={`title ${status} basis-3/4`}
              >
                {toCapitalize(status)}
              </dt>
              <dd className="font-bold basis-1/4 text-right">
                {data[status]}
              </dd>
            </Fragment>
          )
        })}
      </dl>
    </article>
  )
}

export default RoadmapStatus
