import React, { useState } from 'react'

interface OverviewProps {
  /** The title to be displayed */
  topic: string;
  /** An array of detail objects, each containing a header, subheader, and page */
  details: { header: string; subheader: string; page: string }[];
}

/** The Overview component displays an overview of the title and details */
const Overview: React.FC<OverviewProps> = ({ topic, details }) => {
  // Set up state to track whether the actual values have been loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Display placeholders while waiting for the actual values to be loaded
  if (!isLoaded) {
    return (
      <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC text-3xl">
        <div className="flex flex-row justify-between">
          <div className="h-10 w-1/2 mb-2 rounded-xl bg-gray-300 "></div>
        </div>  
        <div className="flex flex-col">
        <div className="h-8 w-1/3 ml-10 mb-2 mb-2 rounded-xl bg-gray-300"></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300"></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
          <div className="h-8 w-1/3 ml-10  mt-10 mb-2 mb-2 rounded-xl bg-gray-300"></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
          <div className="h-4 mb-2 rounded-xl bg-gray-300 "></div>
        </div>
      </div>
    );
  }

  // Display the actual values once they have been loaded
  return (
    <div className="w-full  flex grow flex-col overflow-y-auto mb-2 font-inter text-textC text-3xl">
      {/* Display the title */}
      <h1 className=" font-bold text-3xl italic">{topic}</h1>
      {/* Display the header, subheader, and page */}
      <div className="flex flex-row justify-between">
        <h2 className="text-xl pl-4 font-bold">{details[0].header}</h2>
        <h3 className="text-normal pl-8 italic">{details[0].subheader}</h3>
        <p className="text-sm pl-20 ">{details[0].page}</p>
      </div>
      </div>
  );
};

export default Overview;