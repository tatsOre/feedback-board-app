
import Button from "../Button";

import { toCapitalize } from "../../utils/text";

/* Think how to avoid unnecessary re-render */
const Bar = ({ suggestions, handleChange, selectedTag }) => {
  const categories = ["UPVOTES_DESC", "UPVOTES_ASC", "COMMENTS_DESC", "COMMENTS_ASC"];
  //console.log("Rendering Bar");
  return (
    <div className="flex bg-indigo">
      <h2 className="hidden md:block text-white text-lg">
        {suggestions} Suggestion{suggestions > 1 ? "s" : ""}
      </h2>
      
      <Dropdown
          label={"Sort by:"}
          items={[
            "MOST_UPVOTES",
            "LEAST_UPVOTES",
            "MOST_COMMENTS",
            "LEAST_COMMENTS",
          ]}
          selected={state.sort}
          setSelected={handleDropdownChange}
        />

      <Button type="button" variant="primary" handleClick={() => {}}>
        + Add Feedback
      </Button>
    </div>
  );
};

export default Bar;
