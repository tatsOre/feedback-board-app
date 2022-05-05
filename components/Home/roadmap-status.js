import Link from 'next/link'
import { Fragment } from 'react'
import { toCapitalize } from '../../utils/text'

const RoadmapStatus = ({ data,className }) => {
  return (
    <article className={className}>
      <h2 className="text-indigo-800 text-lg inline-block mb-5">Roadmap</h2>
      <Link href="/roadmap" passHref>
        <a className="float-right text-blue-900 text-small font-semibold underline mt-1">
          View
        </a>
      </Link>
      <dl>
        {Object.keys(data).map((status) => {
          return (
            <Fragment key={`roadmap-panel-${status}`}>
              <dt
                className={`title ${status} text-indigo-500 float-left clear-left`}
              >
                {toCapitalize(status)}
              </dt>
              <dd className="font-bold text-right text-indigo-500">
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
