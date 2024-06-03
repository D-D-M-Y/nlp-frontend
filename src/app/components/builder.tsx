import { useEffect, useState } from "react";

  

export default async function Builder({content}:{content:string}){

    return (
        <h1 className="font-bold text-2xl italic">{content}</h1>
  );

};

