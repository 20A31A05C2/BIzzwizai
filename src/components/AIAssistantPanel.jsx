import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, X, CornerDownLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AIAssistantPanel = ({ onClose, projectName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: 'ai', text: `Bonjour ! Je suis votre assistant BizzWiz AI pour le projet "${projectName || 'votre projet'}". Comment puis-je vous aider aujourd'hui ?` }
    ]);
  }, [projectName]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newUserMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    setTimeout(() => {
      toast({
        title: "🚧 Assistant IA en développement",
        description: "L'IA est encore en phase d'apprentissage. Cette fonctionnalité sera bientôt pleinement opérationnelle ! 🚀",
      });
      const aiResponse = { sender: 'ai', text: `Concernant "${projectName}", je suis encore en apprentissage pour répondre à cela. Je transmettrai votre question à l'équipe !` };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const quickReplies = [
    "Quel est l'état d'avancement ?",
    "Puis-je voir la maquette ?",
    "Modifier une fonctionnalité",
  ];

  const handleQuickReply = (reply) => {
    setInput(reply);
    handleSend(); 
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-bizzwiz-deep-space/90 backdrop-blur-xl shadow-2xl z-[100] flex flex-col border-l border-bizzwiz-magenta-flare/30"
    >
      <div className="flex items-center justify-between p-4 border-b border-bizzwiz-magenta-flare/20">
        <div className="flex items-center">
          <Bot size={24} className="text-bizzwiz-magenta-flare mr-2 text-glow-magenta-flare" />
          <h2 className="text-lg font-orbitron font-semibold text-bizzwiz-star-white">Assistant BizzWiz AI</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-bizzwiz-comet-tail hover:text-bizzwiz-star-white hover:bg-bizzwiz-magenta-flare/20">
          <X size={20} />
        </Button>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div 
              key={index} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`max-w-[85%] p-3 rounded-xl shadow-md ${
                msg.sender === 'user' 
                  ? 'bg-bizzwiz-magenta-flare text-bizzwiz-deep-space rounded-br-none font-medium' 
                  : 'bg-bizzwiz-glass-bg/80 text-bizzwiz-comet-tail rounded-bl-none border border-bizzwiz-electric-cyan/20'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      
      <div className="p-3 border-t border-bizzwiz-magenta-flare/10">
        <div className="flex flex-wrap gap-2 mb-2">
            {quickReplies.map((reply, i) => (
                <Button 
                    key={i} 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-bizzwiz-glass-bg/50 border-bizzwiz-electric-cyan/30 text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/20 hover:text-bizzwiz-star-white"
                >
                   <CornerDownLeft size={12} className="mr-1.5"/> {reply}
                </Button>
            ))}
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question..."
            className="flex-grow futuristic-input !py-2.5"
          />
          <Button onClick={handleSend} className="bg-bizzwiz-magenta-flare hover:bg-bizzwiz-magenta-flare/80 text-bizzwiz-deep-space px-4 py-2.5">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantPanel;