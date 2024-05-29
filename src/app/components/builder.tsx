import { getFileTitles } from "../lib/data";
  

export default async function Builder(){
  const titles = await getFileTitles();

  return (
    <div className="w-full flex grow flex-col overflow-y-auto font-inter text-textC">
        <div className="w-full border-4 border-border border-r-0 rounded-l-xl flex grow flex-col p-4 overflow-y-auto mb-2 font-inter text-textC text-3xl">
      {/* Display the topic */}
      {/* Map over the headers array and display each header object */}
      {titles.map((content: string, index: number) => (
        <h1 className="font-bold text-2xl italic">{content}</h1>
      ))}
    </div>
  </div>
  );
};

