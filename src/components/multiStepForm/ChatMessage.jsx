import React from 'react';

const ChatMessage = ({ message = 'Default message' }) => {
  return (
    <div className="flex flex-row items-start space-x-4 mb-6 px-2 sm:px-4">
      <div className="relative flex-shrink-0">
        <img
          src="image.png"
          alt="Chat Bot"
          className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 rounded-xl sm:rounded-2xl rounded-b-full object-cover"
        />
      </div>

      {/* Message bubble */}
      <div className="relative flex-1 max-w-[70%] sm:max-w-[60%] md:max-w-[50%]">
        <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base leading-relaxed shadow-sm">
          <p className="break-words">{message}</p>
        </div>

        {/* Small triangle pointer */}
        <div className="absolute -left-1 sm:-left-2 bottom-1 w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-r-[9px] sm:border-r-[12px] border-r-white border-b-[6px] sm:border-b-[8px] border-b-transparent"></div>
      </div>
    </div>
  );
};

export default ChatMessage;