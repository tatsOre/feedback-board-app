import { Fragment } from 'react'

export default function FilterTags({ items, checked, onChange }) {
  return (
    <fieldset className="bg-white rounded-10 w-full md:w-1/2 lg:w-full p-5">
      <legend className="invisible h-0">Filter by category:</legend>
      {items.map(({ label, value }, index) => {
        return (
          <Fragment key={`category-${value}`}>
            <input
              id={`filter-option-${value}`}
              tabIndex={index + 1}
              type="radio"
              name="category"
              value={value}
              onChange={onChange}
              checked={value === checked}
            />
            <label
              htmlFor={`filter-option-${value}`}
              className={`${
                checked === value
                  ? 'text-white bg-blue-900'
                  : 'text-blue-900 bg-indigo-100 hover:bg-indigo-300 cursor-pointer'
              } rounded-10 inline-block px-4 py-2 md:py-1.5 mr-2 mb-3 text-sm font-semibold`}
            >
              {label}
            </label>
          </Fragment>
        )
      })}
    </fieldset>
  )
}
