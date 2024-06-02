import { getFileTitles } from "../lib/data";
  

export default async function Builder({content}:{content:string}){
    return (
        <h1 className="font-bold text-2xl italic">{content}</h1>
  );
};

