'use client';

import React, { FormEvent, useState } from 'react';

interface MessageState {
  isValidMessage: boolean;
  messages: string[]; // Array to store chat messages
}

interface MessageProps {
  message: string; // Specify message as a string
  isUserMessage: boolean;
}
const Message: React.FC<MessageProps> = ({ message, isUserMessage }) => (
  <p
    className={
      isUserMessage
        ? "text-gray-700 text-base p-2 font-inter rounded-tr-xl rounded-tl-xl rounded-br-xl border border-2 border-gray-400 text-textC"
        : "text-gray-700 text-base p-2 font-inter rounded-tr-xl rounded-tl-xl rounded-bl-xl border border-2 border-gray-400 text-textC" // Backend message style
    }
  >
    {message}
  </p>
);

export default function Page() {
  const [messageState, setMessageState] = useState<MessageState>({
    isValidMessage: false, // Initial state for disabled button
    messages: ['This is a placeholder message from the backend.'], // message from backend
  });

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value.trim(); // Trim leading/trailing whitespace

    // Check if message is empty
    const isValid = message !== '';
    setMessageState({ ...messageState, isValidMessage: isValid });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!messageState.isValidMessage) {
      return;
    }

    // Update messages with user input
    const newMessages = [...messageState.messages, (event.target as HTMLFormElement).value];
    setMessageState({ messages: newMessages, isValidMessage: false });
    
  };


  return (
    <div className="overflow-hidden bg-white p-5 w-full h-screen relative bg-white grid grid-cols-2 gap-2 w-full">
        {/* Left Content (1/2 width) */}
        <div className="h-full flex flex-row grid-row-2 w-full gap-4">
            {/* First Column (1/2 width) */}
            <div className='w-1/2 flex grow flex-col justify-between space-x-2 '>
                <div className="flex items-baseline">
                    <h1 className="font-bold font-inter text-2xl text-textC">Open Lexica</h1>
                    <img src="/book.png" className="ml-2 relative -bottom-2 h-10" />
                </div>

                {/* Chatbox */}
                <div className="flex flex-col grow border-4 rounded-lg mt-5 overflow-y-auto mb-2 p-2">
                    <h3 className="font-bold font-inter text-xl text-textC p-2">Chatbox</h3>

            {/* Chat messages will go here */}
            <div className="space-y-2 pl-2 pb-2 flex grow items-end">
        {messageState.messages.map((message, index) => (
          <Message key={index} message={message} isUserMessage={index % 2 === 0} />
        ))}
      </div>

                {/* Button */}
                <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex py-1 border-t-2 grow-0">
                    <input
                    type="text"
                    id="chat-message"
                    className="w-full text-textC outline-none none text-l font-inter pl-2"
                    placeholder="Enter your message"
                    onChange={handleMessageChange}
                    />
                        <button disabled={!messageState.isValidMessage} className="items-baseline">
                        <img src="/sent.svg" alt="Open Wiki Generator" className="mr-2 relative -bottom-1 h-8" />
                        </button>
                    </div>
                </form>
                </div>
                </div>
            </div>
            {/* Second Column (1/2 width) */}
            <div className="w-1/2  flex grow flex-col p-4 rounded-lg overflow-y-auto mb-2 font-inter font-bold text-textC text-3xl">
                Insert builder topic
            </div>
        </div>

        {/* Right Side Content (1/2 width)*/}
        <div className="w-full border-4 border-sky-400 bg-sky-300 flex grow flex-col p-4 rounded-lg overflow-y-auto mb-2 font-inter font-bold text-textC text-3xl" 
        >
        Insert overview
          
        </div>
        </div>
  );
}