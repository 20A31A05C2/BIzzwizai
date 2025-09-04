// import React from 'react';

// const ChatMessage = ({ message = 'Default message' }) => {
//   return (
//     <div className="flex flex-row items-start space-x-4 mb-6 px-2 sm:px-4">
//       <div className="relative flex-shrink-0">
//         <img
//           src="image.png"
//           alt="Chat Bot"
//           className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 rounded-xl sm:rounded-2xl rounded-b-full object-cover"
//         />
//       </div>

//       {/* Message bubble */}
//       <div className="relative flex-1 max-w-[70%] sm:max-w-[60%] md:max-w-[50%]">
//         <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base leading-relaxed shadow-sm">
//           <p className="break-words">{message}</p>
//         </div>

//         {/* Small triangle pointer */}
//         <div className="absolute -left-1 sm:-left-2 bottom-1 w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-r-[9px] sm:border-r-[12px] border-r-white border-b-[6px] sm:border-b-[8px] border-b-transparent"></div>
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

import React, { useState, useEffect } from 'react';

const ChatMessage = ({ message = 'Default message' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (imageLoaded) {
      // Show typing indicator after image loads
      const typingTimer = setTimeout(() => {
        setShowTyping(true);
      }, 500);

      // Hide typing and start message animation
      const messageTimer = setTimeout(() => {
        setShowTyping(false);
        setShowMessage(true);
      }, 2500); // Typing shows for 2 seconds

      return () => {
        clearTimeout(typingTimer);
        clearTimeout(messageTimer);
      };
    }
  }, [imageLoaded]);

  // Typewriter effect for the message - FIXED VERSION
  useEffect(() => {
    if (showMessage && message) {
      setDisplayedText('');
      let currentIndex = 0;
      
      const typeTimer = setInterval(() => {
        if (currentIndex <= message.length) {
          setDisplayedText(message.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeTimer);
        }
      }, 30); // Typing speed

      return () => clearInterval(typeTimer);
    }
  }, [showMessage, message]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Typing indicator dots animation
  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 py-3 px-4">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
    </div>
  );

  return (
    <>
      {/* CSS styles moved to a regular style tag */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-row items-start space-x-6 mb-6 px-2 sm:px-4">
        {/* Avatar Image */}
        <div className="relative flex-shrink-0">
          <img
            src="image.png"
            alt="Chat Bot"
            className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 rounded-xl sm:rounded-2xl rounded-b-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Message bubble container */}
        <div className="relative flex-1 max-w-[70%] sm:max-w-[60%] md:max-w-[50%]">
          
          {/* Typing Indicator Bubble */}
          {showTyping && (
            <div className="animate-fade-in-up">
              <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-100">
                <TypingIndicator />
              </div>
              
              {/* Arrow for typing bubble */}
              <div 
                className="absolute -left-3 sm:-left-4 top-4 w-0 h-0"
                style={{
                  borderTop: '8px solid transparent',
                  borderRight: '14px solid white',
                  borderBottom: '8px solid transparent',
                  filter: 'drop-shadow(-1px 0px 1px rgba(0,0,0,0.05))'
                }}
              />
              <div 
                className="absolute -left-3.5 sm:-left-4.5 top-4 w-0 h-0"
                style={{
                  borderTop: '9px solid transparent',
                  borderRight: '15px solid #e5e7eb',
                  borderBottom: '9px solid transparent'
                }}
              />
            </div>
          )}

          {/* Actual Message Bubble */}
          {showMessage && (
            <div className="animate-fade-in-up">
              <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base leading-relaxed shadow-sm border border-gray-100">
                <p className="break-words">
                  {displayedText}
                  {displayedText.length < message.length && displayedText.length > 0 && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>

              {/* Arrow for message bubble */}
              <div 
                className="absolute -left-3 sm:-left-4 top-4 w-0 h-0"
                style={{
                  borderTop: '8px solid transparent',
                  borderRight: '14px solid white',
                  borderBottom: '8px solid transparent',
                  filter: 'drop-shadow(-1px 0px 1px rgba(0,0,0,0.05))'
                }}
              />
              <div 
                className="absolute -left-3.5 sm:-left-4.5 top-4 w-0 h-0"
                style={{
                  borderTop: '9px solid transparent',
                  borderRight: '15px solid #e5e7eb',
                  borderBottom: '9px solid transparent'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
