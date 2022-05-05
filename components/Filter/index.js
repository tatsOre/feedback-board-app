export default function Filter({ options, checkedValue, onChange, className }) {
  return (
    <fieldset className={className}>
      <legend className="invisible h-0">Categories:</legend>
      {options.map(({ label, value }, index) => {
        return (
          <>
            <input
              key={`category-input-${value}`}
              id={value}
              tabIndex={index + 1}
              type="radio"
              name="category"
              value={value}
              onChange={onChange}
              checked={value === checkedValue}
            />
            <label
              key={`category-label-${value}`}
              htmlFor={value}
              className={`${
                checkedValue === value
                  ? 'text-white bg-blue-900'
                  : 'text-blue-900 bg-indigo-100 hover:bg-indigo-300 cursor-pointer'
              } rounded-10 inline-block px-4 py-1.5 mr-2 mb-3 text-small font-semibold`}
            >
              {label}
            </label>
          </>
        )
      })}
    </fieldset>
  )
}
