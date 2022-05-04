import { toCapitalize } from "../../utils/text";

const Filter = ({ selectedTag, handleChange }) => {
  //console.log("Rendering Filter")
  const categories = ["all", "UI", "UX", "enhancement", "bug", "feature"];
  return (
    <fieldset className="bg-white rounded-10 w-full md:w-1/2 lg:w-full">
      <legend className="invisible h-0">Categories:</legend>
      {categories.map((c) => {
        return (
          <div key={c} className="inline-block">
            <input
              className="invisible"
              type="radio"
              name="category"
              id={c}
              value={c}
              onChange={handleChange}
              checked={c === selectedTag}
            />
            <label
              htmlFor={c}
              className={`${
                selectedTag === c
                  ? "text-white bg-blue-900"
                  : "text-blue bg-indigo-100 hover:bg-indigo-300 cursor-pointer"
              } rounded-10 inline-block py-2 px-4 text-small font-semibold`}
            >
              {toCapitalize(c)}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default Filter;
