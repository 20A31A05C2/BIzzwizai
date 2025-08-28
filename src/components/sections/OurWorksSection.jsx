import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const OurWorksSection = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="our-work" className="w-full bg-black text-white py-0 px-4 sm:px-6 md:px-8 lg:px-12 font-montserrat mb-[420px] md:mb-48">
      <motion.div 
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]"
          variants={textVariants}
        >
          {t('ourWorks.title')}
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
          variants={textVariants}
        >
          {t('ourWorks.description')}
        </motion.p>

        {/* Mobile Layout (stacked) */}
        <div className="block md:hidden space-y-6 sm:space-y-8">
          <motion.div
            className="bg-white/5 border-4 sm:border-6 md:border-8 border-[#3ABEFF] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 aspect-video group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg sm:rounded-xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            className="bg-white/5 border-4 sm:border-6 md:border-8 border-[#FF8C42] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 aspect-video group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg sm:rounded-xl"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Project 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            className="bg-white/5 border-4 sm:border-6 md:border-8 border-[#FF4C61] p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 aspect-video group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg sm:rounded-xl"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
              title="Project 3"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-[repeat(5,_1fr)] grid-rows-[repeat(8,_1fr)] gap-4 lg:gap-6 text-left min-h-[640px] lg:min-h-[720px] xl:min-h-[800px]">
          {/* Video 1 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-6 xl:border-8 border-[#3ABEFF] p-3 lg:p-4 xl:p-5 rounded-xl lg:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 
              col-start-1 col-end-4 row-start-1 row-end-5 min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center justify-center group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg lg:rounded-xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-6 xl:border-8 border-[#FF8C42] p-3 lg:p-4 xl:p-5 rounded-xl lg:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 
              col-start-1 col-end-4 row-start-5 row-end-9 min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center justify-center group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg lg:rounded-xl"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Project 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Video 3 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-6 xl:border-8 border-[#FF4C61] p-3 lg:p-4 xl:p-5 rounded-xl lg:rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-all duration-300 
              col-start-4 col-end-6 row-start-1 row-end-9 min-h-[620px] lg:min-h-[700px] xl:min-h-[800px] flex items-center justify-center group hover:scale-[1.02]"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <iframe
              className="w-full h-full rounded-lg lg:rounded-xl"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
              title="Project 3"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurWorksSection;