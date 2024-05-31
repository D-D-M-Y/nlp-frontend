import React, { FormEvent, useState, useEffect } from 'react';
import { Message } from '@/app/components/messages';

interface ChatbotProps {
  /** An array of messages to be displayed in the chatbot */
  messages: string[];
  /** A callback function to be called when a message is sent from the chatbot */
  onSendMessage: (message: string) => void;
}

/** The Chatbot component displays a chatbot interface that allows users to send and receive messages */
const Chatbot: React.FC<{initial_message:string}> = ({initial_message}) => {   /** The current value of the input field */
  /** The current value of the input field */ 
  const [inputValue, setInputValue] = useState('')
  /** An array of messages to be displayed in the chatbot */
  const [messages, setMessages] = useState<string[]>([]); 
  /** Handles changes to the input field */
  const [fromBot, setFromValue] = useState<boolean[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value
    setInputValue(message)
  }
  const [context, setContext] = useState('');
  const [company, setCompany] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [structure, setStructure] = useState('');

  /** Handles submission of the form */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.trim() !== '') {
      setMessages(messages => messages.concat(inputValue));
      setFromValue(from => from.concat(false))
      setInputValue('');
      fetchMessages(inputValue); 
    }
  }
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
      setMessages(messages => messages.concat(data.res.chatresponse));
      setFromValue(from => from.concat(true));
    }
    else{
      data.res.chatresponse.map((lex_res: string) => {
        setMessages(messages => messages.concat(lex_res));
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
    
    useEffect(() => { 
      console.log(company); 
      console.log(goal); 
      console.log(audience);
      console.log(structure);
      if (company != '' && goal != '' && audience != '' && structure != ''){
        setContext(company+' '+goal+' '+audience+' '+structure)
      }
      console.log (context)
    }, [company, goal, audience, structure, context]); 
    
    useEffect(() => { 
      fetchMessages(initial_message); 
    }, []); 

  return (
    <div className="flex flex-col grow border-4 border-border rounded-lg mt-5 overflow-y-auto mb-2 p-2">
      {/* Display the chatbot header */}
      <h3 className="font-bold font-inter text-xl text-textC p-2">Chatbot</h3>
      {/* Display the chatbot messages */}
      <div className="flex flex-col space-y-2 pl-2 pb-2 flex-grow justify-end">
        {messages.map((message, index) => (
          <Message key={index} message={message} isUserMessage={fromBot[index]} />
        ))}
        {/* Display the input field and submit button */}
        <form onSubmit={handleSubmit}>
          <div className="flex py-1 border-t-2 grow-0 flex justify-end">
            <input
              type="text"
              id="chat-message"
              className="w-full text-textC outline-none none text-l font-inter pl-2 h-10"
              placeholder="Enter your message"
              value={inputValue}
              onChange={handleInputChange}
            />
            {/* Display the sent button if there is input in the input field */}
            <button type="submit" disabled={inputValue.trim() === ''} hidden={inputValue.trim() === ''}>
              <img src="/sent.svg" alt="Open Wiki Generator" className="mr-2 relative -bottom-1 h-8" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { Chatbot };