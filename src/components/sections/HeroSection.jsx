
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const COLOR_VARIANTS = {
    primary: {
        border: ["border-emerald-500/60", "border-cyan-400/50", "border-slate-600/30"],
        gradient: "from-emerald-500/30",
    },
    secondary: {
        border: ["border-violet-500/60", "border-fuchsia-400/50", "border-slate-600/30"],
        gradient: "from-violet-500/30",
    },
    tertiary: {
        border: ["border-orange-500/60", "border-yellow-400/50", "border-slate-600/30"],
        gradient: "from-orange-500/30",
    },
    quaternary: {
        border: ["border-purple-500/60", "border-pink-400/50", "border-slate-600/30"],
        gradient: "from-purple-500/30",
    },
    quinary: {
        border: ["border-red-500/60", "border-rose-400/50", "border-slate-600/30"],
        gradient: "from-red-500/30",
    },
    senary: {
        border: ["border-blue-500/60", "border-sky-400/50", "border-slate-600/30"],
        gradient: "from-blue-500/30",
    },
    septenary: {
        border: ["border-gray-500/60", "border-gray-400/50", "border-slate-600/30"],
        gradient: "from-gray-500/30",
    },
    octonary: {
        border: ["border-indigo-500/60", "border-purple-400/50", "border-slate-600/30"],
        gradient: "from-indigo-500/30",
    },
};

const HeroSection = ({
    title = "hero.title",
    description = "hero.description",
    className = "",
    autoChangeInterval = 3000,
}) => {
    const { t } = useTranslation();
    const [currentVariant, setCurrentVariant] = useState("primary");
    const [activeVideo, setActiveVideo] = useState("bizzHub");
    const playerRef = useRef(null);
    const variants = Object.keys(COLOR_VARIANTS);
    const shouldReduceMotion = useReducedMotion();

    // Video URLs for BIZZ HUB and WIZ GROWTH (fixed to embed format)
    const videos = {
        bizzHub: {
            url: "https://www.youtube.com/watch?v=X2JDKlhhPtU",
            title: "BizzWiz Video",
        },
        wizGrowth: {
            url: "https://www.youtube.com/watch?v=tQ84XYcP-nA",
            title: "Wiz Growth Video",
        },
    };

    // Load YouTube IFrame Player API
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player('youtube-player', {
                events: {
                    onReady: (event) => {
                        playerRef.current = event.target;
                    },
                },
            });
        };

        return () => {
            delete window.onYouTubeIframeAPIReady;
        };
    }, []);

    // Handle color variant cycling
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVariant(prevVariant => {
                const currentIndex = variants.indexOf(prevVariant);
                const nextIndex = (currentIndex + 1) % variants.length;
                return variants[nextIndex];
            });
        }, autoChangeInterval);

        return () => clearInterval(interval);
    }, [autoChangeInterval, variants]);

    // Handle video container click to play video
    const handleVideoClick = () => {
        if (playerRef.current && playerRef.current.playVideo) {
            playerRef.current.playVideo();
        }
    };

    const variantStyles = COLOR_VARIANTS[currentVariant];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.9,
                duration: 0.4,
                type: "spring",
                stiffness: 100
            }
        }
    };

    const videoVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.5,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const videoButtonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.7,
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={`relative flex min-h-[90vh] xs:min-h-[95vh] sm:min-h-[100vh] md:min-h-[110vh] lg:min-h-[120vh] xl:min-h-[130vh] w-full items-center justify-center overflow-hidden bg-black py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
            {/* Main Circle Container */}
            <div className="relative w-[min(95vw,350px)] h-[min(95vw,350px)] xs:w-[min(90vw,400px)] xs:h-[min(90vw,400px)] sm:w-[min(85vw,500px)] sm:h-[min(85vw,500px)] md:w-[min(80vw,600px)] md:h-[min(80vw,600px)] lg:w-[min(75vw,700px)] lg:h-[min(75vw,700px)] xl:w-[min(70vw,800px)] xl:h-[min(70vw,800px)] 2xl:w-[min(65vw,900px)] 2xl:h-[min(65vw,900px)]">
                
                {/* Animated Circle Backgrounds */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`absolute inset-0 rounded-full border-2 bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
                        animate={
                            shouldReduceMotion
                                ? { opacity: 0.6 }
                                : {
                                      rotate: 360,
                                      scale: [1, 1.05 + i * 0.05, 1],
                                      opacity: [0.6, 0.9, 0.6],
                                  }
                        }
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div
                            className={`absolute inset-0 rounded-full mix-blend-screen bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/15%,transparent_60%)]`}
                        />
                    </motion.div>
                ))}

                {/* Content Container - Upper Half for Text and Button */}
                <div className="relative z-10 absolute top-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
                    {/* Hero Text */}
                    <motion.div 
                        className="text-center font-montserrat max-w-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 
                            className="text-[clamp(1.5rem,5vw,2rem)] xs:text-[clamp(1.75rem,5.5vw,2.25rem)] sm:text-[clamp(2rem,6vw,2.75rem)] md:text-[clamp(2.5rem,6.5vw,3.25rem)] lg:text-[clamp(3rem,7vw,3.75rem)] xl:text-[clamp(3.5rem,7.5vw,4.25rem)] 2xl:text-[clamp(4rem,8vw,4.75rem)] font-bold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.3)] leading-tight"
                            variants={textVariants}
                        >
                            {t(title)}
                        </motion.h1>

                        <motion.p 
                            className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-[clamp(0.875rem,2.5vw,1rem)] xs:text-[clamp(1rem,2.75vw,1.125rem)] sm:text-[clamp(1.125rem,3vw,1.25rem)] md:text-[clamp(1.25rem,3.25vw,1.375rem)] lg:text-[clamp(1.375rem,3.5vw,1.5rem)] xl:text-[clamp(1.5rem,3.75vw,1.625rem)] text-gray-300 font-montserrat max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] mx-auto leading-relaxed"
                            variants={textVariants}
                        >
                            {t(description)}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex justify-center"
                            variants={buttonVariants}
                        >
                            <Link
                                to="/register"
                                className="group flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-white font-medium shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg hover:border-white/30 text-[clamp(0.875rem,2.5vw,1rem)] sm:text-[clamp(1rem,2.75vw,1.125rem)] md:text-[clamp(1.125rem,3vw,1.25rem)]"
                            >
                                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-transform duration-300 group-hover:rotate-12" />
                                <span>{t('hero.startProject')}</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Video and Buttons Container - Lower Half */}
                <div className="relative z-10 absolute bottom-0 left-0 right-0 h-[80%] flex flex-col items-center justify-center px-0 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
                    <motion.div
                        className="w-full h-[70%] max-w-[min(100%,900px)] aspect-video rounded-[clamp(8px,1.5vw,16px)] sm:rounded-[clamp(12px,2vw,20px)] md:rounded-[clamp(16px,2.5vw,24px)] lg:rounded-[clamp(20px,3vw,28px)] border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl cursor-pointer"
                        variants={videoVariants}
                        onClick={handleVideoClick}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        
                        {/* Video Iframe */}
                        <iframe
                            id="youtube-player"
                            className="w-full h-full rounded-[clamp(8px,1.5vw,16px)] sm:rounded-[clamp(12px,2vw,20px)] md:rounded-[clamp(16px,2.5vw,24px)] lg:rounded-[clamp(20px,3vw,28px)]"
                            src={videos[activeVideo].url}
                            title={videos[activeVideo].title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>

                    {/* Video Selection Buttons */}
                    <motion.div
                        className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-5 md:mt-6"
                        variants={videoButtonVariants}
                    >
                        <button
                            onClick={() => setActiveVideo("bizzHub")}
                            className="text-white font-medium text-[clamp(0.875rem,2.5vw,1rem)] sm:text-[clamp(1rem,2.75vw,1.125rem)] md:text-[clamp(1.125rem,3vw,1.25rem)] hover:text-gray-300 hover:underline transition-all duration-300"
                        >
                            {t('hero.bizzHub')}
                        </button>
                        <button
                            onClick={() => setActiveVideo("wizGrowth")}
                            className="text-white font-medium text-[clamp(0.875rem,2.5vw,1rem)] sm:text-[clamp(1rem,2.75vw,1.125rem)] md:text-[clamp(1.125rem,3vw,1.25rem)] hover:text-gray-300 hover:underline transition-all duration-300"
                        >
                            {t('hero.wizGrowth')}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Background Glow Effects */}
            <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/20%,transparent_80%)] blur-[50px] sm:blur-[75px] md:blur-[100px] lg:blur-[125px] xl:blur-[150px]`} />
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/10%,transparent)] blur-[25px] sm:blur-[35px] md:blur-[50px] lg:blur-[60px] xl:blur-[75px]`} />
            </div>
        </section>
    );
};

export default HeroSection;
