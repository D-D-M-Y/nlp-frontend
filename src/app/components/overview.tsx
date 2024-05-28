import { getFileData } from "../lib/data";

/** The Overview component displays an overview of the title and details */
export default async function Overview(){
  const content = await getFileData();
  return (
    <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC">
      {/* Display the title */}
      <h1 className=" font-bold text-4xl">{content}</h1>
      {/* Display the header, subheader, and page */}
        <div className="flex flex-col justify-between">
          content
        </div>
    </div>
  );
};
