import { getFileData } from "../lib/data";
import IndividualContent from './individualContent.mdx'

/** The Overview component displays an overview of the title and details */
export default async function Overview({title, content}:{title:string, content:string}){
  return (
      <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC text-3xl">
        <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC">
          {/* Display the title */}
          <h1 className=" font-bold text-4xl">{title}</h1>
          {/* Display the header, subheader, and page */}
          <div className="flex flex-col justify-between">
          <p className="text-sm pl-20 text-normal whitespace-pre-wrap">{content}</p>
            
          </div>
        </div>
      </div>
  );
};
