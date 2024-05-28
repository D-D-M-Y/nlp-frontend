import { getFileTitles } from "../lib/data";
  

export default async function Builder(){
  const titles = await getFileTitles();

  return (
    <div className="flex flex-col grow border-4 border-border rounded-lg pl-5 mt-5 overflow-y-auto mb-2 p-2 text-textC">
      {/* Display the topic */}
      <h1 className="font-bold text-2xl italic">{}</h1>
      {/* Map over the headers array and display each header object */}
      {titles.map((content: string, index: number) => (
        content
      ))}
    </div>
  );
};

