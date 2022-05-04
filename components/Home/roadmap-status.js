import Link from 'next/link'
import { Fragment } from 'react'
import { toCapitalize } from '../../utils/text'

const RoadmapStatus = ({ data }) => {
  return (
    <section className="roadmap-status-panel bg-white rounded-10 w-full md:w-1/2 lg:w-full">
      <h2 className="text-indigo-800 text-lg inline-block">Roadmap</h2>
      <Link href="/roadmap" passHref>
        <a className="float-right text-blue-900 text-small font-semibold underline">
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
    </section>
  )
}

export default RoadmapStatus
