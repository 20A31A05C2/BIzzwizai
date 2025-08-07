// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Rocket } from "lucide-react";
// import { Link } from "react-router-dom";

// const COLOR_VARIANTS = {
//     primary: {
//         border: ["border-emerald-500/60", "border-cyan-400/50", "border-slate-600/30"],
//         gradient: "from-emerald-500/30",
//     },
//     secondary: {
//         border: ["border-violet-500/60", "border-fuchsia-400/50", "border-slate-600/30"],
//         gradient: "from-violet-500/30",
//     },
//     tertiary: {
//         border: ["border-orange-500/60", "border-yellow-400/50", "border-slate-600/30"],
//         gradient: "from-orange-500/30",
//     },
//     quaternary: {
//         border: ["border-purple-500/60", "border-pink-400/50", "border-slate-600/30"],
//         gradient: "from-purple-500/30",
//     },
//     quinary: {
//         border: ["border-red-500/60", "border-rose-400/50", "border-slate-600/30"],
//         gradient: "from-red-500/30",
//     },
//     senary: {
//         border: ["border-blue-500/60", "border-sky-400/50", "border-slate-600/30"],
//         gradient: "from-blue-500/30",
//     },
//     septenary: {
//         border: ["border-gray-500/60", "border-gray-400/50", "border-slate-600/30"],
//         gradient: "from-gray-500/30",
//     },
//     octonary: {
//         border: ["border-indigo-500/60", "border-purple-400/50", "border-slate-600/30"],
//         gradient: "from-indigo-500/30",
//     },
// };

// const HeroSection = ({
//     title = "Votre vision, construite par des experts.",
//     description = "Suivez les progrès pendant que nous nous occupons du reste.",
//     className = "",
//     autoChangeInterval = 3000,
// }) => {
//     const [currentVariant, setCurrentVariant] = useState("primary");
//     const variants = Object.keys(COLOR_VARIANTS);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentVariant(prevVariant => {
//                 const currentIndex = variants.indexOf(prevVariant);
//                 const nextIndex = (currentIndex + 1) % variants.length;
//                 return variants[nextIndex];
//             });
//         }, autoChangeInterval);

//         return () => clearInterval(interval);
//     }, [autoChangeInterval, variants]);

//     const variantStyles = COLOR_VARIANTS[currentVariant];

//     return (
//         <section className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 ${className}`}>
//             {/* Animated Circles - Keep desktop same, fix mobile only */}
//             <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:top-5 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 sm:h-[600px] sm:w-[600px] lg:h-[800px] lg:w-[800px]">
//                 {[0, 1, 2].map((i) => (
//                     <motion.div
//                         key={i}
//                         className={`absolute inset-0 rounded-full border-2 bg-gradient-to-br to-transparent ${variantStyles.border[i]} ${variantStyles.gradient}`}
//                         animate={{
//                             rotate: 360,
//                             scale: [1, 1.05 + i * 0.05, 1],
//                             opacity: [0.6, 0.9, 0.6],
//                         }}
//                         transition={{
//                             duration: 8,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                         }}
//                     >
//                         <div
//                             className={`absolute inset-0 rounded-full mix-blend-screen bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/15%,transparent_60%)]`}
//                         />
//                     </motion.div>
//                 ))}
//             </motion.div>

//             {/* Hero Text - Centered within circles */}
//             <motion.div
//                 className="relative z-10 text-center font-montserrat max-w-6xl mx-auto"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//                 <h1 className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] leading-tight px-2">
//                     {title}
//                 </h1>

//                 <motion.p
//                     className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-300 font-montserrat max-w-2xl mx-auto px-4"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                 >
//                     {description}
//                 </motion.p>

//                 {/* CTA Button */}
//                 <motion.div
//                     className="mt-6 sm:mt-8 flex justify-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                 >
//                     <Link
//                         to="/create-project"
//                         className="flex items-center gap-2 rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:shadow-lg text-sm sm:text-base"
//                     >
//                         <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
//                         Démarrer mon projet
//                     </Link>
//                 </motion.div>

//                 {/* Video Placeholder - Positioned below the circles */}
//                 <motion.div
//                     className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center px-4"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6, duration: 0.8 }}
//                 >
//                     <div className="relative w-full max-w-[900px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-white/20 bg-black/30 backdrop-blur-md overflow-hidden shadow-2xl">
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <motion.div
//                                 className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/30 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all"
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//                                     <path d="M8 5v14l11-7z" />
//                                 </svg>
//                             </motion.div>
//                         </div>
//                         <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
//                             <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
//                                 <p className="text-white text-xs sm:text-sm font-medium">Regardez notre travail en action</p>
//                                 <p className="text-gray-300 text-xs hidden sm:block">Découvrez comment nous donnons vie à vos visions</p>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </motion.div>

//             {/* Background Glow Effects */}
//             <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
//                 <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/20%,transparent_80%)] blur-[100px] sm:blur-[150px]`} />
//                 <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/10%,transparent)] blur-[50px] sm:blur-[100px]`} />
//             </div>
//         </section>
//     );
// };

// export default HeroSection;


import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

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

// Animation variants for letter-by-letter effect
const titleContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03, // Reduced stagger to fit within 2s
            duration: 0.1, // Short container transition to start children quickly
        },
    },
};

const titleLetter = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }, // Faster letter animation
};

const HeroSection = ({
    title = "Votre vision, construite par des experts.",
    description = "Suivez les progrès pendant que nous nous occupons du reste.",
    className = "",
    autoChangeInterval = 3000,
}) => {
    const [currentVariant, setCurrentVariant] = useState("primary");
    const variants = Object.keys(COLOR_VARIANTS);
    const shouldReduceMotion = useReducedMotion();

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

    const variantStyles = COLOR_VARIANTS[currentVariant];

    // Split title into letters for animation
    const titleLetters = title.split("");

    return (
        <section className={`relative flex min-h-screen w-full items-center justify-center overflow-visible bg-black py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 ${className}`}>
            {/* Animated Circles */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:top-5 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 sm:h-[600px] sm:w-[600px] lg:h-[800px] lg:w-[800px]">
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
            </motion.div>

            {/* Hero Text */}
            <motion.div
                className="relative z-10 text-center font-montserrat max-w-7xl mx-auto" // Increased max-width
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // Faster to fit within 2s
            >
                <motion.h1
                    className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-normal bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(255,255,255,0.3)] leading-relaxed px-4" // Adjusted tracking and leading
                    variants={shouldReduceMotion ? {} : titleContainer}
                    initial="hidden"
                    animate="show"
                >
                    {titleLetters.map((letter, index) => (
                        <motion.span key={index} variants={shouldReduceMotion ? {} : titleLetter}>
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-300 font-montserrat max-w-2xl mx-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }} // Adjusted to fit within 2s
                >
                    {description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    className="mt-6 sm:mt-8 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 100 }} // Adjusted to fit within 2s
                >
                    <Link
                        to="/create-project"
                        className="flex items-center gap-2 rounded-lg sm:rounded-xl border border-white/20 bg-white/10 px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:shadow-lg text-sm sm:text-base"
                    >
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                        <motion.span
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.3, duration: 0.3, type: "spring", stiffness: 200 }} // Adjusted to fit within 2s
                            whileHover={{ scale: 1.05 }}
                        >
                            Démarrer mon projet
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Video Placeholder */}
                <motion.div
                    className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.4 }} // Adjusted to fit within 2s
                >
                    <div className="relative w-full max-w-[900px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border border-white/20 bg-black/30 backdrop-blur-md overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/30 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>
                        </div>
                        <motion.div
                            className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7, duration: 0.3 }} // Adjusted to fit within 2s
                        >
                            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
                                <motion.p
                                    className="text-white text-xs sm:text-sm font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.8, duration: 0.2 }} // Fits within 2s
                                >
                                    Regardez notre travail en action
                                </motion.p>
                                <motion.p
                                    className="text-gray-300 text-xs hidden sm:block"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.9, duration: 0.2 }} // Fits within 2s
                                >
                                    Découvrez comment nous donnons vie à vos visions
                                </motion.p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Glow Effects */}
            <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/20%,transparent_80%)] blur-[100px] sm:blur-[150px]`} />
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/10%,transparent)] blur-[50px] sm:blur-[100px]`} />
            </div>
        </section>
    );
};

export default HeroSection;
