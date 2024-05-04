'use client';

import React, { useState } from 'react';
import { Chatbot } from '@/app/components/chatbot';
import Builder from '@/app/components/builder';

// Define the MessageState interface
interface MessageState {
  messages: string[];
}

// Define the BuilderProps interface
interface BuilderProps {
  topic: string;
  headers: { header: string; subheader: string; page: string; overview: string }[];
}

// Define the Page component
const Page = () => {
  // Initialize the messageState state variable
  const [messageState, setMessageState] = useState<MessageState>({
    messages: ['This is a placeholder message from the backend.'],
  });

  // Define the handleSendMessage function
  const handleSendMessage = (message: string) => {
    setMessageState({ messages: [...messageState.messages, message] });
  };

  // Define the topic variable
  const topic = 'Topic 1';

  // Define the headers array
  const headers = [
    {
      header: 'header1',
      subheader: 'subheader1',
      page: 'page1',
      overview: 'Overview of page 1',
    },
    {
      header: 'header2',
      subheader: 'subheader2',
      page: 'page2',
      overview: 'Overview of page 2',
    },
    {
      header: 'header3',
      subheader: 'subheader3',
      page: 'page3',
      overview: 'Overview of page 3',
    },
  ];

  return (
    <div className="overflow-hidden bg-white p-5 w-full h-screen relative grid grid-cols-2 gap-2 w-full">
      {/* Left Content (1/2 width) */}
      <div className="h-full flex flex-row grid-row-2 w-full gap-4">
        {/* First Column (1/2 width) */}
        <div className="w-1/2 flex grow flex-col justify-between space-x-2">
          <div className="flex items-baseline">
            <h1 className="font-bold font-inter text-2xl text-textC">Open Lexica</h1>
            <img src="/book.png" className="ml-2 relative -bottom-2 h-10" />
          </div>

          <Chatbot messages={messageState.messages} onSendMessage={handleSendMessage} />
        </div>
        {/* Second Column (1/2 width) */}
        <div className="w-1/2 flex grow flex-col rounded-lg overflow-y-auto font-inter text-textC">
          <Builder topic={topic} headers={headers} />
        </div>
      </div>
      {/* Right Side Content (1/2 width)*/}
      <div className="w-full bg-pastel flex grow flex-col p-4 rounded-lg overflow-y-auto mb-2 font-inter font-bold text-textC text-3xl" 
      >
      </div>
    </div>
  );
};
export default Page;