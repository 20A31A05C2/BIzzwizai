import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Brain, Rocket, Settings, ShieldQuestion } from 'lucide-react';

const faqData = [
  {
    category: "Services IA Galactiques",
    icon: <Brain size={28} className="text-bizzwiz-electric-cyan" />,
    questions: [
      {
        q: "Quels types de services IA proposez-vous ?",
        a: "BizzWiz AI se spécialise dans la création de sites web spatiaux propulsés par l'IA, la génération de contenu nébuleux (textes, scripts, etc.) et la consultation en stratégie quantique IA pour optimiser vos opérations et innovations."
      },
      {
        q: "Comment l'IA est-elle utilisée dans la création de sites web ?",
        a: "Notre IA assiste dans la conception d'interfaces utilisateur uniques, l'optimisation des performances à la vitesse lumière, la génération de code modulaire et l'intégration de fonctionnalités intelligentes pour une expérience utilisateur sans précédent."
      },
      {
        q: "Puis-je demander du contenu spécifique pour mon secteur d'activité ?",
        a: "Absolument ! Notre IA créative peut être calibrée pour générer du contenu adapté à votre univers, que ce soit des articles de blog stellaires, des scripts vidéo galactiques ou des descriptions de produits cosmiques."
      }
    ]
  },
  {
    category: "Processus de Projet Interstellaire",
    icon: <Rocket size={28} className="text-bizzwiz-magenta-flare" />,
    questions: [
      {
        q: "Comment démarrer un projet avec BizzWiz AI ?",
        a: "C'est simple comme un saut hyper-spatial ! Cliquez sur 'Débuter Projet IA' dans la barre de navigation, remplissez notre formulaire de briefing cosmique, et notre équipe prendra contact avec vous pour définir la trajectoire."
      },
      {
        q: "Combien de temps dure un projet typique ?",
        a: "La durée varie en fonction de la complexité de la mission. Un projet de création de site web peut prendre quelques semaines galactiques, tandis qu'une consultation stratégique peut s'étendre sur plusieurs cycles lunaires. Nous vous fournirons une estimation temporelle précise après le briefing initial."
      },
      {
        q: "Puis-je suivre l'avancement de mon projet ?",
        a: "Oui, nous établissons des canaux de communication clairs et vous fournissons des mises à jour régulières sur la progression de votre projet à travers le continuum espace-temps."
      }
    ]
  },
  {
    category: "Technologie & Sécurité Cosmique",
    icon: <Settings size={28} className="text-bizzwiz-nebula-purple" />,
    questions: [
      {
        q: "Quelles technologies utilisez-vous ?",
        a: "Nous utilisons un arsenal de technologies de pointe, incluant des frameworks JavaScript modernes (React, Vite), des solutions de style avancées (TailwindCSS, Framer Motion) et des algorithmes d'IA propriétaires pour la génération et l'optimisation."
      },
      {
        q: "Comment assurez-vous la sécurité de mon projet et de mes données ?",
        a: "La sécurité est notre priorité absolue. Nous implémentons des protocoles de sécurité HoloNet impénétrables, des chiffrements de données avancés et des audits réguliers pour protéger vos actifs contre toute menace cosmique."
      }
    ]
  },
   {
    category: "Support & Questions Diverses",
    icon: <ShieldQuestion size={28} className="text-yellow-400" />,
    questions: [
      {
        q: "Proposez-vous du support après le lancement du projet ?",
        a: "Oui, nous offrons diverses options de support et de maintenance post-lancement pour assurer que votre solution IA continue de fonctionner à son plein potentiel galactique."
      },
      {
        q: "Comment puis-je vous contacter pour une question spécifique non listée ici ?",
        a: "Vous pouvez nous envoyer une transmission via notre page Contact HoloNet. Notre équipe d'experts interstellaires se fera un plaisir de vous répondre dans les plus brefs délais."
      }
    ]
  }
];

const FAQPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -30, scale: 0.97, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25, filter: "blur(3px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  
  const categoryVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-var(--navbar-height,68px))] container mx-auto px-4 py-12 md:py-20 lg:py-24"
    >
      <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
        <HelpCircle size={52} className="mx-auto mb-4 text-bizzwiz-electric-cyan drop-shadow-[0_0_15px_currentColor]" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-glow-electric-cyan">
          FAQ Inter<span className="text-gradient-cosmic">galactique</span>
        </h1>
        <p className="text-lg md:text-xl text-bizzwiz-comet-tail mt-4 max-w-2xl mx-auto">
          Vos questions les plus fréquentes sur l'univers BizzWiz AI, répondues avec la clarté d'une supernova.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {faqData.map((category, index) => (
          <motion.section 
            key={category.category} 
            variants={categoryVariants}
            className="mb-10 md:mb-12"
          >
            <div className="flex items-center mb-6 md:mb-8">
              <div className="p-2.5 mr-3 rounded-lg bg-gradient-to-br from-bizzwiz-deep-space to-bizzwiz-nebula-purple/20 border border-bizzwiz-electric-cyan/25 shadow-md">
                {category.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-bizzwiz-star-white">
                {category.category}
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {category.questions.map((item, qIndex) => (
                <motion.div variants={itemVariants} key={qIndex} className="glassmorphic-card border-bizzwiz-electric-cyan/10 hover:border-bizzwiz-magenta-flare/30 rounded-lg overflow-hidden">
                  <AccordionItem value={`item-${index}-${qIndex}`} className="border-b-0 px-2 sm:px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-[15px] px-1">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.section>
        ))}
      </div>
       <motion.div variants={itemVariants} className="text-center mt-16 md:mt-20">
        <p className="text-lg text-bizzwiz-comet-tail mb-4">Vous ne trouvez pas la réponse à votre anomalie cosmique ?</p>
        <a href="/contact" className="cyber-button inline-flex items-center group text-sm md:text-base">
          Contactez Notre HoloSupport
          <HelpCircle size={18} className="ml-2.5 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FAQPage;