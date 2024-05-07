import React from 'react';

interface OverviewProps {
  /** The title to be displayed */
  topic: string;
  /** An array of detail objects, each containing a header, subheader, and page */
  details: { header: string; subheader: string; page: string }[];
}

/** The Overview component displays an overview of the title and details */
const Overview: React.FC<OverviewProps> = ({ topic, details }) => {
  return (
    <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC">
      {/* Display the title */}
      <h1 className=" font-bold text-4xl">{topic}</h1>
      {/* Display the header, subheader, and page */}
      {details.length > 0 && details[0].header && (
        <div className="flex flex-row justify-between">
          <h2 className="text-xl pl-4 font-bold">{details[0].header}</h2>
          <h3 className="text-normal pl-8 italic">{details[0].subheader}</h3>
          <p className="text-sm pl-20 ">{details[0].page}</p>
        </div>
      )}
    </div>
  );
};

export default Overview;