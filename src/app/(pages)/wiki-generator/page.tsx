'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Chatbot } from '@/app/components/chatbot';
import Builder from '@/app/components/builder';
import Loading from './loading';
import Overview from '@/app/components/overview';
import { useSearchParams } from 'next/navigation';
// Define the MessageState interface
interface MessageState {
  messages: string[];
}

// Define the BuilderProps interface
interface BuilderProps {
  topic: string;
  headers: { header: string; subheader: string; page: string; }[];
}

// Define the Page component
const Page = () => {
  const searchParams = useSearchParams();
  const [messageState, setMessageState] = useState<MessageState>({
    messages: [(searchParams.get("topic"))||''],
  });
  const [context, setContext] = useState('');
  const [company, setCompany] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [structure, setStructure] = useState('');
  const [fromBot, setFromValue] = useState<boolean[]>([]);

  const handleSendMessage = (message: string) => {
    setMessageState(messagestate => ({ messages: messagestate.messages.concat(message) }));
    setFromValue(from => from.concat(false));
    fetchMessages(message);
  };


  /** Fetch messages from the API endpoint */ 
  const fetchMessages = async (input:string) => { 
    try { 
     const response = await fetch('http://127.0.0.1:10168/openlexica/response', { 
     method: 'POST', 
     headers: {'Content-Type': 'application/json'}, 
     
     body: JSON.stringify({ chat: input }), // Send input value in the request body 
     
     }); 
     
     if (!response.ok) { 
       throw new Error('Failed to fetch messages'); 
     } 
     const data = await response.json(); 
     if (typeof data.res.chatresponse === 'string'){
       setMessageState(message => ({messages: message.messages.concat(data.res.chatresponse)}));
       setFromValue(from => from.concat(true));
     }
     else{
       data.res.chatresponse.map((lex_res: string) => {
         setMessageState(message => ({messages: message.messages.concat(lex_res)}));
         setFromValue(from => from.concat(true));
       });
     }
     if (typeof data.res.company === 'string'){
       setCompany(company => data.res.company)
     }
     if (typeof data.res.goal === 'string'){
       setGoal(goal => data.res.goal)
     }
     if (typeof data.res.audience === 'string'){
       setAudience(audience => data.res.audience)
     }
     if (typeof data.res.structure === 'string'){
       setStructure(structure => data.res.structure)
     }
   }   catch (error) { 
       console.error('Error fetching messages:', error); 
       } 
     } 

    useEffect(() =>{console.log(messageState.messages);},[messageState])
    useEffect(() =>{
      console.log(company);
      console.log(goal);
      console.log(audience);
      console.log(structure);
      if (company != '' && goal != '' && audience != '' && structure != ''){
        setContext(company+'. '+goal+'. '+audience+'. '+structure)
        console.log(context)
      }
    },
    [company, goal, audience, structure])
    useEffect(() => {

    },
      [context])
    useEffect(() =>{
      setFromValue(from => from.concat(false));
      fetchMessages(messageState.messages[0]);
      console.log(messageState.messages)
    },[])
  {
    return (
      <div className="overflow-hidden bg-white p-5 w-full h-screen relative grid grid-cols-4 w-full space-x-4">
        {/* Left Content (1/2 width) */}
        <div className="h-[96vh] flex flex-row grid-row-2 w-full gap-4">
          {/* First Column (1/2 width) */}
          <div className="w-full flex grow flex-col justify-between">
            <div className="flex items-baseline">
              <h1 className="font-bold font-inter text-2xl text-textC">Open Lexica</h1>
              <img src="/book.png" className="ml-2 relative -bottom-2 h-10" />
            </div>
            <Chatbot messages={messageState.messages} onSendMessage={handleSendMessage} from={fromBot}/>
          </div>
          {/* Second Column (1/2 width) */}

            

        </div>
        {/* Right Side Content (1/2 width)*/}
        <Suspense fallback={<Loading/>}>
          <Builder/>
          <Overview/>
        </Suspense>

      </div>
    );
  }
  // return (
  //   <div className="overflow-hidden bg-white p-5 w-full h-screen relative grid grid-cols-4 gap-4">
  //   {/* Left Content (1/4 width) */}
  //   <div className="h-full w-full flex flex-col justify-between space-x-2">
  //     <div className="flex items-baseline">
  //       <h1 className="font-bold font-inter text-2xl text-textC">Open Lexica</h1>
  //       <img src="/book.png" className="ml-2 relative -bottom-2 h-10" />
  //     </div>
  //     {showBuilder? (
  //         <>
  //          <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" onClick={handleToggleBuilder}>Toggle to Chatbot</button>
  //           <Builder topic={'Food'} headers={[]} onBuilderDataLoaded={handleBuilderDataLoaded} />
  //           <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" >Export</button>
  //         </>
  //       ) : (
  //         <>
  //         <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" onClick={handleToggleChatbot}>Toggle to File Directory</button>
  //         <Chatbot messages={messageState.messages} onSendMessage={handleSendMessage} />
  //         </>
  //       )}
  //   </div>
  //   {/* Right Side Content (3/4 width) */}
  //   <div className="w-full h-full bg-pastel col-span-3 flex grow flex-col p-4 border-4 border-border rounded-xl overflow-y-auto mb-2 font-inter font-bold text-textC text-3xl">
  //     <Overview topic={'Food'} details={[""]} />
  //   </div>
  // </div>
  // )
};

export default Page;