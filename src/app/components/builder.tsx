import React from 'react'

interface BuilderProps {
  /** The topic to be displayed */
  topic: string;
  /** An array of header objects, each containing a header, subheader, and page */
  headers: { header: string; subheader: string; page: string }[];
  onBuilderDataLoaded: () => void;
}

/** The Builder component displays a topic and an array of headers */
const Builder: React.FC<BuilderProps> = ({ topic, headers, onBuilderDataLoaded }) => {
  // Set up state to track whether the actual values have been loaded
  onBuilderDataLoaded();
  

  // Display the actual values once they have been loaded [to be edited]
  return (
    <div className="flex flex-col grow border-4 border-border rounded-lg pl-5 mt-5 overflow-y-auto mb-2 p-2 text-textC">
      {/* Display the topic */}
      <h1 className="font-bold text-2xl italic">{topic}</h1>
      {/* Map over the headers array and display each header object */}
      {headers.map((headerObj, index) => (
        <div key={index} className="pl-2">
          {/* Display the header */}
          <h2 className="text-xl pl-2 font-bold">{headerObj.header}</h2>
          {/* Display the subheader */}
          <h3 className="text-normal pl-8 italic">{headerObj.subheader}</h3>
          {/* Display the page */}
          <p className="text-sm pl-12 ">{headerObj.page}</p>
        </div>
      ))}
    </div>
  );
};

export default Builder;