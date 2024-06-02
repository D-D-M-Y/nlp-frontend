import { getFileData } from "../lib/data";
import IndividualContent from './individualContent.mdx'

/** The Overview component displays an overview of the title and details */
export default async function Overview({content}:{content:string}){
  return (
    <div className="w-full bg-pastel flex grow flex-row col-span-2 p-4 border-4 border-border border-l-0 rounded-r-xl overflow-y-auto mb-2 font-inter font-bold text-textC text-3xl" 
        >
      <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC text-3xl">
        <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC">
          {/* Display the title */}
          <h1 className=" font-bold text-4xl"></h1>
          {/* Display the header, subheader, and page */}
          <div className="flex flex-col justify-between">
            <IndividualContent content={content}/>
          </div>
        </div>
      </div>
    </div>
  );
};
