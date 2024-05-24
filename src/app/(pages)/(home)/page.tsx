'use client'

import React, { useState } from 'react';
import Link from 'next/link';

interface TopicState {
  isValidTopic: boolean;
  errorMessage: string;
}

export default function Page() {
  const [topicState, setTopicState] = useState<TopicState>({
    isValidTopic: false, // Initial state for disabled button
    errorMessage: '',
  });

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const topic = event.target.value.trim(); // Trim leading/trailing whitespace

    // Check if topic is empty
    const isValid = topic !== '';
    setTopicState({ isValidTopic: isValid, errorMessage: isValid ? '' : 'Please enter a topic.' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!topicState.isValidTopic) {
      // No need to set error message again, it's already set in handleTopicChange
      return; // Prevent further code execution
    }

    // Handle valid form submission logic (replace with your actual logic)
    console.log('Topic submitted:', topicState);
  };


  return (
      <div className="overflow-hidden bg-white w-full h-screen p-10 flex flex-col flex-grow justify-center items-center">
        <div className = "flex items-baseline">
          <h1 className="font-bold font-inter text-9xl pb-4 text-textC">Open Lexica</h1>
          <img src="/book.png" className="ml-4 relative -bottom-5" />
        </div>
          <p className="text-textC font-inter font-normal text-4xl w-1/2 text-center">Wiki made easy.</p>

          <div className="pt-4 space-y-2 w-1/2">
          <form onSubmit={handleSubmit}>
  <div className="flex items-center w-full rounded-3xl border border-4 px-2">
    <input
      type="text"
      id="topic"
      className="w-full rounded-l-3xl px-2 py-4 text-textC outline-none none text-xl font-inter"
      placeholder="Enter a topic"
      onChange={handleTopicChange}
    />
    <Link href="/wiki-generator" className='items-baseline'>
    <button disabled={!topicState.isValidTopic}>
        <img src="/sent.svg" alt="Open Wiki Generator" className="mr-2 relative -bottom-1" />
      </button>
    </Link>
  </div>
  {/* Display error message conditionally */}
  {!topicState.isValidTopic && (
    <span className="text-red-500 font-inter italic pl-3">{topicState.errorMessage}</span>
  )}
</form>
      </div>
    </div>
  );
}