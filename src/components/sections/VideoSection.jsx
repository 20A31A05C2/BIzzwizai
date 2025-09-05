import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, BookOpen, Video, PlayCircle } from 'lucide-react';

const VideoSection = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videos = [
    {
      id: 1,
      title: t('videoSection.video1_title'),
      description: t('videoSection.video1_description'),
      driveLink: 'https://drive.google.com/file/d/YOUR_INTRO_VIDEO_ID/preview',
      duration: '5:24',
      category: t('videoSection.category_startup'),
    },
    {
      id: 2,
      title: t('videoSection.video2_title'),
      description: t('videoSection.video2_description'),
      driveLink: 'https://drive.google.com/file/d/YOUR_PROJECT_VIDEO_ID/preview',
      duration: '8:15',
      category: t('videoSection.category_tutorial'),
    },
    {
      id: 3,
      title: t('videoSection.video3_title'),
      description: t('videoSection.video3_description'),
      driveLink: 'https://drive.google.com/file/d/YOUR_OPTIMIZATION_VIDEO_ID/preview',
      duration: '6:42',
      category: t('videoSection.category_advanced'),
    },
    {
      id: 4,
      title: t('videoSection.video4_title'),
      description: t('videoSection.video4_description'),
      driveLink: 'https://drive.google.com/file/d/YOUR_DASHBOARD_VIDEO_ID/preview',
      duration: '4:33',
      category: t('videoSection.category_interface'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="video-tutorials"
      className="relative py-16 md:py-24 bg-gradient-to-b from-bizzwiz-deep-space/20 via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space/10"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-3/5 h-3/5 bg-gradient-radial from-bizzwiz-electric-cyan/25 to-transparent blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-bizzwiz-magenta-flare/25 to-transparent blur-2xl animate-[pulse_3s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-roboto-mono tracking-wider text-bizzwiz-electric-cyan bg-bizzwiz-electric-cyan/10 rounded-full border border-bizzwiz-electric-cyan/25">
              <Video size={14} className="mr-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
              {t('videoSection.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] mb-4">
              {t('videoSection.title')} <span className="text-gradient-cosmic">BizzWiz AI</span>
            </h2>
            <p className="text-base md:text-lg text-bizzwiz-comet-tail max-w-2xl mx-auto leading-relaxed">
              {t('videoSection.description')}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 relative group">
            <div
              className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-bizzwiz-glass-bg/30 backdrop-blur-lg border-2 border-bizzwiz-electric-cyan/30 shadow-[0_0_40px_hsla(var(--bizzwiz-electric-cyan-rgb),0.2),_0_0_70px_hsla(var(--bizzwiz-nebula-purple-rgb),0.15)] hover:shadow-[0_0_50px_hsla(var(--bizzwiz-electric-cyan-rgb),0.3),_0_0_80px_hsla(var(--bizzwiz-magenta-flare-rgb),0.25)] hover:border-bizzwiz-magenta-flare/50 transition-all duration-500"
              whileHover={{ scale: 1.01 }}
            >
              <iframe
                src={videos[selectedVideo].driveLink}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={videos[selectedVideo].title}
              ></iframe>
              <PlayCircle
                size={64}
                className="absolute inset-0 m-auto text-bizzwiz-star-white/50 opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bizzwiz-deep-space/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-orbitron font-semibold text-bizzwiz-star-white mb-1">
                      {videos[selectedVideo].title}
                    </h3>
                    <p className="text-sm text-bizzwiz-comet-tail">
                      {videos[selectedVideo].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-bizzwiz-magenta-flare/20 text-bizzwiz-magenta-flare text-xs rounded-full">
                      {videos[selectedVideo].duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-xl font-orbitron font-semibold text-bizzwiz-star-white mb-4 flex items-center">
              <BookOpen size={20} className="mr-2 text-bizzwiz-electric-cyan animate-[pulse_1.5s_ease-in-out_infinite]" />
              {t('videoSection.playlist_title')}
            </h3>

            <div className="space-y-3">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -2, scale: 1.02 }}
                  onClick={() => setSelectedVideo(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    selectedVideo === index
                      ? 'bg-bizzwiz-electric-cyan/10 border-2 border-[radial-gradient(circle,hsla(var(--bizzwiz-electric-cyan-rgb),0.5),hsla(var(--bizzwiz-magenta-flare-rgb),0.5))] shadow-[0_0_20px_hsla(var(--bizzwiz-electric-cyan-rgb),0.3)]'
                      : 'bg-bizzwiz-glass-bg/20 border-bizzwiz-comet-tail/20 hover:border-bizzwiz-magenta-flare/30 hover:bg-bizzwiz-magenta-flare/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedVideo === index ? 'bg-bizzwiz-electric-cyan/20' : 'bg-bizzwiz-nebula-purple/20'
                      }`}
                    >
                      <Play
                        size={16}
                        className={`${
                          selectedVideo === index ? 'text-bizzwiz-electric-cyan' : 'text-bizzwiz-nebula-purple'
                        } group-hover:animate-[pulse_1s_ease-in-out_infinite]`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedVideo === index
                              ? 'bg-bizzwiz-electric-cyan/20 text-bizzwiz-electric-cyan'
                              : 'bg-bizzwiz-comet-tail/20 text-bizzwiz-comet-tail'
                          }`}
                        >
                          {video.category}
                        </span>
                        <span className="text-xs text-bizzwiz-comet-tail">{video.duration}</span>
                      </div>
                      <h4
                        className={`text-sm font-medium mb-1 ${
                          selectedVideo === index ? 'text-bizzwiz-star-white' : 'text-bizzwiz-comet-tail'
                        }`}
                      >
                        {video.title}
                      </h4>
                      <p className="text-xs text-bizzwiz-comet-tail/70 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;