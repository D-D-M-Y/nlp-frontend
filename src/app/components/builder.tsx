import React, { useState } from 'react'

interface BuilderProps {
  /** The topic to be displayed */
  topic: string;
  /** An array of header objects, each containing a header, subheader, and page */
  headers: { header: string; subheader: string; page: string }[];
}

/** The Builder component displays a topic and an array of headers */
const Builder: React.FC<BuilderProps> = ({ topic, headers }) => {
  // Set up state to track whether the actual values have been loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Display placeholders while waiting for the actual values to be loaded
  if (!isLoaded) {
    return (
      <div className="w-full border-4 border-border border-r-0 rounded-l-xl flex grow flex-col p-4 overflow-y-auto mb-2 font-inter text-textC text-3xl">
        <div className="pl-2 h-10 mb-4 rounded-xl bg-gray-300 w-1/2"></div>
        {headers.map((headerObj, index) => (
          <div key={index}>
            <div className="ml-8 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-20 h-4 mb-2 rounded-xl bg-gray-300  w-1/2"></div>
            <div className="ml-32 h-4 mb-6 rounded-md bg-gray-300  w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  // Display the actual values once they have been loaded [to be edited]
  return (
    <div className="w-full border-4 border-border border-r-0 rounded-l-xl flex grow flex-col p-4 overflow-y-auto mb-2 font-inter text-textC text-3xl">
      {/* Display the topic */}
      <h1 className=" font-bold text-3xl italic">{topic}</h1>
      {/* Map over the headers array and display each header object */}
      {headers.map((headerObj, index) => (
        <div key={index} className="pl-2">
          {/* Display the header */}
          <h2 className="text-xl pl-8 font-bold">{headerObj.header}</h2>
          {/* Display the subheader */}
          <h3 className="text-normal pl-12 italic">{headerObj.subheader}</h3>
          {/* Display the page */}
          <p className="text-sm pl-20 ">{headerObj.page}</p>
        </div>
      ))}
    </div>
  );
};

export default Builder;