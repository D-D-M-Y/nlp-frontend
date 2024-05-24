import React from 'react';

interface OverviewProps {
  /** The title to be displayed */
  topic: string;
  /** An array of detail objects, each containing a header, subheader, and page */
  details: { header: string; subheader: string; page: string, data: string}[];
}

/** The Overview component displays an overview of the title and details */
const Overview: React.FC<OverviewProps> = ({ topic, details }) => {
  return (
    <div className="w-full flex grow flex-col overflow-y-auto mb-2 font-inter text-textC">
      {/* Display the title */}
      <h1 className=" font-bold text-4xl">{topic}</h1>
      {/* Display the header, subheader, and page */}
        <div className="flex flex-col justify-between">
          <h2 className="text-xl pl-4 font-bold">{details[0].header}</h2>
          <p className="text-sm pl-20">{details[0].header}</p>
          <h2 className="text-xl pl-4 italic">{details[0].data}</h2>
          <p className="text-sm pl-20 text-normal">{details[0].header}</p>
          <h2 className="text-xl pl-4 italic">{details[0].page}</h2>
          <p className="text-sm pl-20 text-normal">{details[0].data}</p>
        </div>
    </div>
  );
};

export default Overview;