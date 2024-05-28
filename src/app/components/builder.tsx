import { getfiledata } from "../lib/data";
  

export default async function Builder(){
  const content = await getfiledata();

  return (
    <div className="flex flex-col grow border-4 border-border rounded-lg pl-5 mt-5 overflow-y-auto mb-2 p-2 text-textC">
      {/* Display the topic */}
      <h1 className="font-bold text-2xl italic">{}</h1>
      {/* Map over the headers array and display each header object */}
      {content.map((content: string, index: number) => (
        <div key={index} className="pl-2">
          {/* Display the header */}
          <h2 className="text-xl pl-2 font-bold">{content}</h2>
          {/* Display the subheader */}
          <h3 className="text-normal pl-8 italic">{content}</h3>
          {/* Display the page */}
          <p className="text-sm pl-12 ">{content}</p>
        </div>
      ))}
    </div>
  );
};

