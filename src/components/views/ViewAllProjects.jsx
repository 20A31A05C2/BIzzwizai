import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';

const ViewAllProjects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Sample projects data - you can replace this with actual data from your API
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      description: "Complete overhaul of an online marketplace with modern UI/UX design and enhanced user experience.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      duration: "3 months",
      borderColor: "#3ABEFF"
    },
    {
      id: 2,
      title: "Mobile Banking Application",
      description: "Secure and intuitive mobile banking app with biometric authentication and real-time transactions.",
      videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
      category: "Mobile Development",
      technologies: ["React Native", "Firebase", "Plaid API"],
      duration: "4 months",
      borderColor: "#FF8C42"
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      description: "Business intelligence dashboard with machine learning insights and predictive analytics.",
      videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
      category: "Data Analytics",
      technologies: ["Python", "TensorFlow", "D3.js", "PostgreSQL"],
      duration: "5 months",
      borderColor: "#FF4C61"
    },
    {
      id: 4,
      title: "Healthcare Management System",
      description: "Comprehensive healthcare platform for patient management, appointments, and medical records.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "Healthcare Tech",
      technologies: ["Vue.js", "Laravel", "MySQL", "HIPAA Compliant"],
      duration: "6 months",
      borderColor: "#9D4EDD"
    },
    {
      id: 5,
      title: "Smart Home IoT Platform",
      description: "Integrated IoT platform for home automation with voice control and energy monitoring.",
      videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
      category: "IoT Development",
      technologies: ["Angular", "Node.js", "MQTT", "AWS IoT"],
      duration: "4 months",
      borderColor: "#06FFA5"
    },
    {
      id: 6,
      title: "Educational Learning Platform",
      description: "Interactive online learning platform with video streaming, assessments, and progress tracking.",
      videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
      category: "EdTech",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "WebRTC"],
      duration: "5 months",
      borderColor: "#FFD23F"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      {/* Header Section */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 sm:py-20 md:py-24"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors duration-200"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('common.back')}
          </motion.button>

          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              variants={headerVariants}
            >
              {t('viewprojects.title')}
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              variants={headerVariants}
            >
              {t('viewprojects.subtitle')}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border-4 hover:shadow-2xl transition-all duration-500"
                style={{ borderColor: project.borderColor }}
              >
                {/* Video Section */}
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    className="w-full h-full"
                    src={project.videoUrl}
                    title={project.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: `${project.borderColor}20`,
                        color: project.borderColor 
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="text-gray-400 text-sm">{project.duration}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('viewprojects.viewDetails')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          variants={cardVariants}
        >
          <motion.h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white"
            variants={cardVariants}
          >
            {t('viewprojects.cta.title')}
          </motion.h3>
          <motion.p
            className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
            variants={cardVariants}
          >
            {t('viewprojects.cta.description')}
          </motion.p>
          <motion.button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-[#3ABEFF] to-[#FF8C42] text-white font-semibold py-4 px-8 sm:px-12 rounded-xl text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(58, 190, 255, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('viewprojects.cta.button')}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewAllProjects;
