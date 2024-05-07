interface MessageProps {
    message: string; // Specify message as a string
    isUserMessage: boolean;
  }
  
  const Message: React.FC<MessageProps> = ({ message, isUserMessage }) => (
    <p
      className={
        isUserMessage
         ? "text-gray-700 text-sm p-2 font-inter rounded-tr-xl rounded-tl-xl rounded-br-xl border bg-chatbg border-2 border-chatbg text-textC" // Backend message style
          : "text-gray-700 text-sm p-2 font-inter rounded-tr-xl rounded-tl-xl rounded-bl-xl border bg-userchat border-2 border-userchat text-textC" 
      }
    >
      {message}
    </p>
  );

  export { Message };