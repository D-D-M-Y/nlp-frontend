'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Chatbot } from '@/app/components/chatbot';
import Builder from '@/app/components/builder';
import Loading from './loading';
import Overview from '@/app/components/overview';
import { useSearchParams } from 'next/navigation';
import { generateFileContent, getFileData, getFileTitles } from '@/app/lib/data';
import {ErrorBoundary} from 'react-error-boundary'

// Define the MessageState interface
interface MessageState {
  messages: string[];
}

// Define the BuilderProps interface
interface TitleGroup{
  title: string;
  titles: string[]
  fileContent: string;
}


// Define the Page component
const Page = async () => {
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
  const [titles, setTitles] = useState<TitleGroup>({title: '', titles: [], fileContent:''});
  const [showBuilder, setShowBuilder] = useState(false);
  
  const fetchTitles = async () => {
    try{
    const localTitles = await getFileTitles();
    if (Array.isArray(localTitles) && localTitles.every(x => typeof x === 'string')){
      setTitles(_ => ({title:localTitles[0], titles:localTitles, fileContent:_.fileContent}));
    }
    } catch (error){
      //do nothing
    } 
    
  }
  const generateAndUpdateTitles = async (context:string) =>{
    await generateFileContent(context);
    fetchTitles();
  }  

  const handleSendMessage = (message: string) => {
    setMessageState(messagestate => ({ messages: messagestate.messages.concat(message) }));
    setFromValue(from => from.concat(false));
    fetchMessages(message);
  };

  const handleChangeTopic = async(topic: string) => {
    const callContent = getFileData(topic)
    const content = await callContent
    setTitles(prevTitle => ({title:topic, titles:prevTitle.titles, fileContent: content}));
  }

  const handleToggleBuilder = () => {
    setShowBuilder(false);
  }

  const handleToggleChatbot = () => {
    setShowBuilder(true);
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
       setCompany(_ => data.res.company)
     }
     if (typeof data.res.goal === 'string'){
       setGoal(_ => data.res.goal)
     }
     if (typeof data.res.audience === 'string'){
       setAudience(_ => data.res.audience)
     }
     if (typeof data.res.structure === 'string'){
       setStructure(_ => data.res.structure)
     }
   }   catch (error) { 
       console.error('Error fetching messages:', error); 
       } 
     } 

    useEffect(() =>{console.log(messageState.messages);},[messageState])

    useEffect(()=>{
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
      console.log(context)
      if (!(titles.title != '')){
        console.log("Hello")
        if (context != ''){
        try {
          generateAndUpdateTitles(context);
        } catch (error){
          console.log("Can't generate files")
        }
        console.log(titles)
     }
    }
    },
      [context]);

      useEffect(() => {
        console.log(titles)
        if (Array.isArray(titles.titles) && titles.titles.every(x => typeof x === 'string') && titles.fileContent === ''){
        }
      }, [titles])


    useEffect(() => {
      fetchTitles();
      setFromValue(from => from.concat(false));
      fetchMessages(messageState.messages[0]);
      console.log(messageState.messages)
    },[]);
  
    if (titles.title == '' || titles.title==undefined){
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
            <div className="flex flex-col grow border-4 border-border rounded-lg mt-5 overflow-y-auto mb-2 p-2">
            <Chatbot messages={messageState.messages} onSendMessage={handleSendMessage} from={fromBot}/>
            </div>
          </div>
          {/* Second Column (1/2 width) */}



        </div>
        {/* Right Side Content (1/2 width)*/}
        <ErrorBoundary fallback={<Loading/>}>
          <Suspense fallback={<Loading/>}>
            {/* Display the topic */}
            {/* Map over the headers array and display each header object */}
            {/* <div className="w-full flex grow flex-col overflow-y-auto font-inter text-textC">
              <div className="w-full border-4 border-border border-r-0 rounded-l-xl flex grow flex-col p-4 overflow-y-auto mb-2 font-inter text-textC text-3xl">
            
            {(await titles.titles).map((content: string, index: number) => 
              (
              <div onClick={() => {handleChangeTopic(content)}}>
              <Builder content={content}/>
              </div>
              ))}
              
              </div>
            </div>
            <div className="w-full bg-pastel flex grow flex-row col-span-2 p-4 border-4 border-border border-l-0 rounded-r-xl overflow-y-auto mb-2 font-inter text-textC text-3xl" 
        >
            <Overview title={titles.title} content={titles.fileContent}/>
            </div> */}
            <Loading/>
          </Suspense> 
        </ErrorBoundary>

      </div>
    );
  } else {
  return (
    <div className="overflow-hidden bg-white p-5 w-full h-screen relative grid grid-cols-4 gap-4">
    {/* Left Content (1/4 width) */}
    <div className="h-[96vh] w-full flex flex-col justify-between space-x-2">
      <div className="flex items-baseline">
        <h1 className="font-bold font-inter text-2xl text-textC">Open Lexica</h1>
        <img src="/book.png" className="ml-2 relative -bottom-2 h-10" />
      </div>
      {showBuilder? (
          <>
           <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" onClick={handleToggleBuilder}>Toggle to Chatbot</button>
           <div className="flex flex-col grow border-4 border-border rounded-lg mt-5 overflow-y-auto mb-2 p-2">
            {(await titles.titles).map((content: string, index: number) => 
                (
                <div onClick={() => {handleChangeTopic(content)}}>
                
                <Builder content={content}/>
                </div>
                ))}
              </div>
            <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" >Export</button>
          </>
        ) : (
          <>
          <button className="border-4 rounded-xl mt-2 p-2 border-border bg-pastel font-inter text-textC font-bold text-xl" onClick={handleToggleChatbot}>Toggle to File Directory</button>
          <div className="flex flex-col grow border-4 border-border rounded-lg mt-5 overflow-y-auto mb-2 p-2">
          <Chatbot messages={messageState.messages} onSendMessage={handleSendMessage} from={fromBot}/>
          </div>
          </>
        )}
    </div>
    {/* Right Side Content (3/4 width) */}
    <div className="w-full h-full bg-pastel col-span-3 flex grow flex-col p-4 border-4 border-border rounded-xl overflow-y-auto mb-2 font-inter text-textC text-3xl">
    <Overview title={titles.title} content={titles.fileContent}/>
    </div>
  </div>
  )
  };
}
export default Page;