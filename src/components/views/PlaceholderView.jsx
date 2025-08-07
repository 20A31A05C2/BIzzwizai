import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const PlaceholderView = ({ title, icon: Icon }) => {
  const DefaultIcon = Construction;
  const DisplayIcon = Icon || DefaultIcon;

  return (
    <motion.div 
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center p-8 bg-[#141419]/50 rounded-xl shadow-xl border border-purple-500/20"
    >
      <DisplayIcon size={64} className="text-purple-400 mb-8 opacity-70" />
      <h1 className="text-4xl font-bold text-gray-200 mb-4">{title}</h1>
      <p className="text-xl text-gray-400 max-w-md">
        Cette section est actuellement en cours de construction. 🏗️
      </p>
      <p className="text-gray-500 mt-2">
        Revenez bientôt pour découvrir les nouveautés que nous préparons pour vous ! 🚀
      </p>
    </motion.div>
  );
};

export default PlaceholderView;