import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';
import { useTranslation } from 'react-i18next';

const LinkedInTemplate = ({ projectData }) => {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const { t, i18n } = useTranslation();

  if (!projectData) return null;

  
  const formatDescription = (description) => {
    if (!description) return '';
    return description.length > 1300 
      ? `${description.substring(0, 1297)}...` 
      : description;
  };

  
  const generateHashtags = () => {
    const tags = ['BizzWizAI', 'business', 'CréationProjetDigital', 'StartupFrançaise', 'entrepreneurship'];
    if (projectData.solution_type) {
      tags.push(projectData.solution_type.toLowerCase().replace(/\s+/g, ''));
    }
    if (projectData.features && Array.isArray(projectData.features)) {
      projectData.features.forEach(feature => {
        if (feature) {
          tags.push(feature.toLowerCase().replace(/\s+/g, ''));
        }
      });
    }
    return tags.slice(0, 5).map(tag => `#${tag}`).join(' ');
  };

  
  
const generateLinkedInShareUrl = () => {
  const title = encodeURIComponent(`Check out my new project: ${projectData.project_name || 'New Project'}`);
  const description = encodeURIComponent(formatDescription(projectData.project_description));
  const hashtags = encodeURIComponent(generateHashtags());
  const url = encodeURIComponent(window.location.href);

  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${description}&source=BizWiz&hashtags=${hashtags}`;
};

  const generateShareContent = () => {
    const content = {
      title: `${projectData.project_name || 'New Project'} - Created with BizWiz`,
      description: formatDescription(`
🚀 Exciting Project Update!

${projectData.project_description}

🎯 Solution Type: ${projectData.solution_type}

✨ Key Features:
${projectData.features?.map(feature => `• ${feature}`).join('\n')}

${generateHashtags()}
      `),
      source: 'BizWiz'
    };
    return content;
  };


const handleCopyContent = async () => {
    const content = generateShareContent();
    try {
      await navigator.clipboard.writeText(content.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };



const handleShare = async () => {
    try {
      setIsSharing(true);
      const shareUrl = generateLinkedInShareUrl();
      
      
      const linkedInWindow = window.open(shareUrl, '_blank', 'noopener,noreferrer');
      
      
      const response = await ApiService('/user/share-credits', 'POST', {
        project_id: projectData.id
      });
      
      if (response.success) {
        setHasShared(true);
        toast({
          title: "Share Successful!",
          description: `${response.message} New balance: ${response.new_credits_balance} credits`,
          variant: "success",
        });
      } else {
        toast({
          title: "Notice",
          description: response.message,
          variant: "info",
        });
      }

      
      if (linkedInWindow) {
        const timer = setInterval(() => {
          if (linkedInWindow.closed) {
            clearInterval(timer);
            setIsSharing(false);
          }
        }, 1000);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to process share credits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
};

  
return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="linkedin-template bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-3 sm:p-4 md:p-6 w-full max-w-2xl mx-auto overflow-hidden"
  >
    <div className="mb-4 sm:mb-6 flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white font-montserrat truncate">
              {projectData.project_name || 'New Project'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-montserrat">
              Created with BizzWiz
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col xs:flex-row items-stretch gap-2 w-full">
        <Button
          onClick={handleCopyContent}
          className="flex-1 h-10 sm:h-11 inline-flex items-center justify-center px-3 sm:px-4 bg-blue-600/20 text-blue-300 rounded-xl hover:bg-blue-600/30 transition-all duration-300 font-montserrat border border-blue-500/30 text-xs sm:text-sm"
        >
          <ClipboardCopy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="whitespace-nowrap">{copied ? 'Copied!' : 'Copy Content'}</span>
        </Button>
        <Button
          onClick={handleShare}
          disabled={isSharing || hasShared}
          className={`flex-1 h-10 sm:h-11 inline-flex items-center justify-center px-3 sm:px-4 ${
            hasShared 
              ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
          } rounded-xl transition-all duration-300 font-montserrat border border-blue-500/30 text-xs sm:text-sm`}
        >
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="whitespace-nowrap">
            {isSharing 
              ? 'Sharing...' 
              : hasShared 
                ? 'Already Shared' 
                : 'Share & Get 20 Credits'}
          </span>
        </Button>
      </div>
      <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
        {hasShared 
          ? 'You have already received credits for sharing this project.' 
          : 'Get 20 extra credits when you share your project on LinkedIn.'}
      </div>
    </div>

    <div className="space-y-3 sm:space-y-4">
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
        <h4 className="text-base sm:text-lg font-semibold text-white mb-2 font-montserrat">
          Project Description
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 font-montserrat">
          {formatDescription(projectData.project_description)}
        </p>
      </div>

      {projectData.solution_type && (
        <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 font-montserrat">
            Solution Type
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-montserrat">
            {projectData.solution_type}
          </p>
        </div>
      )}

      {projectData.features && projectData.features.length > 0 && (
        <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 font-montserrat">
            Key Features
          </h4>
          <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-300 font-montserrat">
            {projectData.features.map((feature, index) => (
              <li key={index} className="mb-1 pl-1">{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-3 sm:pt-4">
        <p className="text-xs sm:text-sm text-gray-300 font-montserrat break-words">
          {generateHashtags()}
        </p>
      </div>
    </div>
  </motion.div>
);
};

export default LinkedInTemplate;