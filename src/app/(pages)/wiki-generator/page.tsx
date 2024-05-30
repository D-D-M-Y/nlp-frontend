'use client';

import React, { Suspense, useState } from 'react';
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

  // Define the handleSendMessage function
  const handleSendMessage = (message: string) => {
    setMessageState({ messages: [...messageState.messages, message] });
  };

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
            <Chatbot initial_message={messageState.messages[0]}/>
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