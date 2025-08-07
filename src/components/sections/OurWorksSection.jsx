// import { motion } from "framer-motion";

// const OurWorksSection = () => {
//   return (
//     <section id="our-work" className="w-full bg-black text-white pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 font-montserrat">
//       <div className="max-w-6xl mx-auto text-center">
//         <motion.h2
//           className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Our Work
//         </motion.h2>

//         <motion.p
//           className="text-gray-300 max-w-2xl mx-auto mb-12 sm:mb-16 text-sm sm:text-base"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           Explore how we bring ideas to life through real projects.
//         </motion.p>

//         {/* Mobile Layout (stacked) */}
//         <div className="block md:hidden space-y-6">
//           <motion.div
//             className="bg-white/5 border-4 sm:border-8 border-[#3ABEFF] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//               title="Project 1"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>

//           <motion.div
//             className="bg-white/5 border-4 sm:border-8 border-[#FF8C42] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/ysz5S6PUM-U"
//               title="Project 2"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>

//           <motion.div
//             className="bg-white/5 border-4 sm:border-8 border-[#FF4C61] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/jfKfPfyJRdk"
//               title="Project 3"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>
//         </div>

//         {/* Desktop Grid Layout */}
//         <div className="hidden md:grid grid-cols-[repeat(5,_1fr)] grid-rows-[repeat(8,_1fr)] gap-4 text-left min-h-[640px]">
//           {/* Video 1 */}
//           <motion.div
//             className="bg-white/5 border-4 lg:border-8 border-[#3ABEFF] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
//               col-start-1 col-end-4 row-start-1 row-end-5 min-h-[300px] lg:min-h-[400px] flex items-center justify-center"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//               title="Project 1"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>

//           {/* Video 2 */}
//           <motion.div
//             className="bg-white/5 border-4 lg:border-8 border-[#FF8C42] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
//               col-start-1 col-end-4 row-start-5 row-end-9 min-h-[300px] lg:min-h-[400px] flex items-center justify-center"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/ysz5S6PUM-U"
//               title="Project 2"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>

//           {/* Video 3 */}
//           <motion.div
//             className="bg-white/5 border-4 lg:border-8 border-[#FF4C61] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
//               col-start-4 col-end-6 row-start-1 row-end-9 min-h-[620px] lg:min-h-[640px] flex items-center justify-center"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src="https://www.youtube.com/embed/jfKfPfyJRdk"
//               title="Project 3"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurWorksSection;

import { motion } from "framer-motion";

const OurWorksSection = () => {
  return (
    <section id="our-work" className="w-full bg-black text-white py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 font-montserrat">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Notre travail
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12 sm:mb-16 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Découvrez comment nous donnons vie aux idées à travers des projets réels.
        </motion.p>

        {/* Mobile Layout (stacked) */}
        <div className="block md:hidden space-y-6">
          <motion.div
            className="bg-white/5 border-4 sm:border-8 border-[#3ABEFF] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            className="bg-white/5 border-4 sm:border-8 border-[#FF8C42] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Project 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            className="bg-white/5 border-4 sm:border-8 border-[#FF4C61] p-3 sm:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow aspect-video"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
              title="Project 3"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-[repeat(5,_1fr)] grid-rows-[repeat(8,_1fr)] gap-4 text-left min-h-[640px]">
          {/* Video 1 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-8 border-[#3ABEFF] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
              col-start-1 col-end-4 row-start-1 row-end-5 min-h-[300px] lg:min-h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-8 border-[#FF8C42] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
              col-start-1 col-end-4 row-start-5 row-end-9 min-h-[300px] lg:min-h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Project 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Video 3 */}
          <motion.div
            className="bg-white/5 border-4 lg:border-8 border-[#FF4C61] p-3 lg:p-4 rounded-xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow 
              col-start-4 col-end-6 row-start-1 row-end-9 min-h-[620px] lg:min-h-[640px] flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
              title="Project 3"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurWorksSection;