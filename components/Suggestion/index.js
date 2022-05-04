import UpvoteButton from "../UpvoteButton";
import { toCapitalize } from "../../utils/text";

const Suggestion = ({ data }) => {
  const { title, description, category, upvotes, comments } = data;
  // all the component should be the link
  return (
    <div className="group bg-white rounded-md">
      <h3 className="text-small lg:text-lg text-indigo-800 group-hover:text-blue-900">
        {title}
      </h3>
      <p className="text-indigo-600">{description}</p>
      <p className="bg-indigo-100 text-blue-900 font-semibold text-small w-min rounded-10 px-3.5 py-1.5 my-4">
        {toCapitalize(category)}
      </p>
      <UpvoteButton
        upvoted={false}
        variant="inline"
        upvotes={upvotes}
      />
      <p className="font-bold float-right request-comments mt-2">
        {comments?.length}
      </p>
    </div>
  );
};

export default Suggestion;
