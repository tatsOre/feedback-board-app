export default function Filter({ options, checkedValue, onChange }) {
  return (
    <fieldset className="bg-white rounded-10 w-full md:w-1/2 lg:w-full">
      <legend className="invisible h-0">Categories:</legend>
      {options.map(({ label, value }) => {
        return (
          <label
            key={value}
            className={`${
              checkedValue === value
                ? 'text-white bg-blue-900'
                : 'text-blue-900 bg-indigo-100 hover:bg-indigo-300 cursor-pointer'
            } rounded-10 inline-block py-2 px-4 text-small font-semibold`}
          >
            <input
              className="invisible w-0"
              type="radio"
              name="category"
              value={value}
              onChange={onChange}
              checked={value === checkedValue}
            />
            {label}
          </label>
        )
      })}
    </fieldset>
  )
}
