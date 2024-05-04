import React from 'react'

interface BuilderProps {
  /** The topic to be displayed */
  topic: string;
  /** An array of header objects, each containing a header, subheader, and page */
  headers: { header: string; subheader: string; page: string }[];
}

/** The Builder component displays a topic and an array of headers */
const Builder: React.FC<BuilderProps> = ({ topic, headers }) => {
  return (
    <div className="w-full border-4 border-border  flex grow flex-col p-4 rounded-lg overflow-y-auto mb-2 font-inter text-textC text-3xl">
      {/* Display the topic */}
      <h1 className=" font-bold text-3xl italic">{topic}</h1>
      {/* Map over the headers array and display each header object */}
      {headers.map((headerObj, index) => (
        <div key={index} className="pl-2">
          {/* Display the header */}
          <h2 className="text-2xl pl-4 font-bold">{headerObj.header}</h2>
          {/* Display the subheader */}
          <h3 className="text-xl pl-8 italic">{headerObj.subheader}</h3>
          {/* Display the page */}
          <p className="text-sm pl-12 ">{headerObj.page}</p>
        </div>
      ))}
    </div>
  )
}

export default Builder