import Link from 'next/link'
import { Fragment } from 'react'

import { toCapitalize } from 'lib/utils'

export default function RoadmapStatus({ data }) {
  return (
    <article className="roadmap-status-panel bg-white rounded-10 w-full md:w-1/2 lg:w-full p-5 md:ml-2.5 lg:ml-0">
      <h2 className="text-indigo-800 text-lg inline-block mb-5">Roadmap</h2>
      <Link href="/roadmap" passHref>
        <a className="float-right text-blue-900 text-sm font-semibold underline mt-1">
          View
        </a>
      </Link>
      <dl className="flex flex-wrap items-baseline text-indigo-500">
        {Object.keys(data).map(
          (status) =>
            status !== 'suggestion' && (
              <Fragment key={`roadmap-status-${status}`}>
                <dt className={`title ${status} basis-3/4`}>
                  {toCapitalize(status)}
                </dt>
                <dd className="font-bold basis-1/4 text-right">
                  {data[status].length}
                </dd>
              </Fragment>
            )
        )}
      </dl>
    </article>
  )
}
