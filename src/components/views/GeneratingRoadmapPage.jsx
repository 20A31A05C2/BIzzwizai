import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mic, Send, MessageSquare, Loader2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TypingText = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText(''); 
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i > text.length -1) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <span className="inline">{displayedText}</span>;
};


const WizAIChatBubble = ({ message, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-bizzwiz-glass-bg/50 border border-bizzwiz-magenta-flare/30 p-4 rounded-xl shadow-lg mb-4 max-w-md text-sm"
    >
      <TypingText text={message} onComplete={onComplete} />
    </motion.div>
  );
};

const GeneratingRoadmapPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const [wizMessages, setWizMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const generateProjectId = (projectName) => {
    const namePart = projectName ? projectName.toLowerCase().replace(/\s+/g, '-').substring(0, 20) : 'project';
    return `${namePart}-${Date.now().toString().slice(-6)}`;
  };

  const initialWizAdvice = [
    "Bonjour ! Je suis WIZ AI, votre copilote pour cette aventure créative.",
    "Je suis en train d'analyser les informations que vous avez fournies...",
    formData?.projectName ? `Le projet "${formData.projectName}" semble très prometteur !` : "Votre concept de projet est en cours d'examen.",
    "Pendant que je prépare votre feuille de route initiale, n'hésitez pas à me poser des questions.",
    "Conseil stratégique : Une communication claire de votre proposition de valeur sera essentielle.",
    formData?.audience ? `Cibler ${formData.audience} est un choix judicieux. Nous allons affiner cela.` : "Bien définir votre audience cible est une étape cruciale pour le succès.",
    "N'oubliez pas, l'innovation est un voyage, pas une destination. Je suis là pour vous guider.",
    "Votre projet est enregistré. Préparation de la page de validation..."
  ];

  useEffect(() => {
    if (!formData) {
      toast({
        title: "Données manquantes",
        description: "Impossible de charger les données du projet. Redirection...",
        variant: "destructive",
      });
      navigate('/create-project');
    } else if (initialWizAdvice.length > 0) {
      setWizMessages([{ type: 'ai', content: initialWizAdvice[0], id: Date.now() }]);
    }
  }, [formData, navigate]);
  
  const handleNextWizMessage = () => {
    if (currentMessageIndex < initialWizAdvice.length - 1) {
      const nextIndex = currentMessageIndex + 1;
      setCurrentMessageIndex(nextIndex);
      setWizMessages(prev => [...prev, { type: 'ai', content: initialWizAdvice[nextIndex], id: Date.now() + nextIndex }]);
    } else {
       setTimeout(() => {
        const projectId = generateProjectId(formData.projectName);
        
        const defaultRoadmap = [
          { name: "Phase 1: Conception & Planification", status: "En cours", progress: 25, description: "Définition des objectifs, analyse des besoins, création des wireframes et maquettes UX/UI.", tasks: [{name: "Réunion de lancement", status: "Terminé"}, {name: "Wireframes v1", status: "En cours"}] },
          { name: "Phase 2: Développement Frontend", status: "À faire", progress: 0, description: "Intégration des maquettes, développement des composants interactifs et de l'interface utilisateur.", tasks: [] },
          { name: "Phase 3: Développement Backend", status: "À faire", progress: 0, description: "Mise en place de la logique serveur, des API et de la base de données (si applicable).", tasks: [] },
          { name: "Phase 4: Tests & QA", status: "À faire", progress: 0, description: "Tests fonctionnels, tests de performance, et assurance qualité.", tasks: [] },
          { name: "Phase 5: Déploiement & Lancement", status: "À faire", progress: 0, description: "Mise en production de l'application et lancement officiel.", tasks: [] },
        ];

        const projectDataToStore = { 
          ...formData, 
          id: projectId, 
          status: 'pendingReview', 
          createdAt: new Date().toISOString(),
          roadmap: defaultRoadmap,
          mockupImage: "https://images.unsplash.com/photo-1559028006-448645cff358?q=80&w=800&auto=format&fit=crop" // Placeholder
        };
        
        try {
            let projects = JSON.parse(localStorage.getItem('bizzwiz-projects')) || [];
            projects.push(projectDataToStore);
            localStorage.setItem('bizzwiz-projects', JSON.stringify(projects));
        } catch (error) {
            console.error("Erreur lors de la sauvegarde dans localStorage:", error);
            toast({ title: "Erreur de sauvegarde", description: "Impossible de sauvegarder les données du projet localement.", variant: "destructive" });
            return; 
        }
        
        setWizMessages(prev => [...prev, {type: 'system', content: `Projet ${projectId} enregistré ! Redirection vers la page de validation...`, id: Date.now() + 999}]);
        toast({
            title: "🚀 Projet Enregistré !",
            description: "Votre projet est prêt pour la validation par l'équipe. Redirection...",
            duration: 3000,
        });
        setTimeout(() => navigate(`/project-pending-review/${projectId}`, { state: { formData: projectDataToStore, projectId } }), 3000); 
       }, 2000);
    }
  };

  const handleUserSubmit = () => {
    if (!userInput.trim()) return;
    setWizMessages(prev => [...prev, { type: 'user', content: userInput, id: Date.now() }]);
    setUserInput('');
    
    setTimeout(() => {
      toast({
        title: "🚧 Fonctionnalité en développement",
        description: "WIZ AI est encore en phase d'apprentissage pour les réponses interactives. Merci pour votre patience ! 🚀",
      });
      setWizMessages(prev => [...prev, { type: 'ai', content: "C'est une excellente question ! Je suis encore en phase d'apprentissage pour y répondre en détail. Votre feuille de route complète y répondra bientôt.", id: Date.now() + 1 }]);
    }, 1000);
  };

  const toggleMic = () => {
    setIsMicActive(prev => !prev);
    toast({
      title: "🎤 Commande Vocale",
      description: "🚧 La fonctionnalité de commande vocale est en cours de développement et sera disponible prochainement !",
    });
    if (!isMicActive) {
      setIsListening(true); 
      setTimeout(() => setIsListening(false), 3000); 
    } else {
      setIsListening(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [wizMessages]);


  return (
    <div className="min-h-[calc(100vh-var(--navbar-height,68px))] flex flex-col items-center justify-center p-4 relative isolate
                    bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/60 to-bizzwiz-deep-space text-bizzwiz-star-white">
      
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bg-halo-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? 'hsla(var(--bizzwiz-electric-cyan-rgb), 0.1)' : 'hsla(var(--bizzwiz-magenta-flare-rgb), 0.08)',
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              filter: `blur(${30 + i * 20}px)`
            }}
            animate={{ 
              scale: [1, 1.05 + i*0.02, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, i % 2 === 0 ? 5: -5, 0]
            }}
            transition={{ duration: 10 + i*2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="text-center mb-8 md:mb-12 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-3 text-glow-electric-cyan"
        >
          <TypingText text="Enregistrement de votre Projet..." speed={70}/>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-bizzwiz-comet-tail text-sm md:text-base"
        >
          WIZ AI consolide vos informations pour l'équipe.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, type: 'spring', stiffness: 120 }}
        className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-8 z-10"
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare opacity-60"
          animate={{ 
            scale: [1, 1.15, 1, 1.1, 1.2, 1], 
            opacity: [0.5, 0.8, 0.5, 0.7, 0.9, 0.6]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-1 rounded-full bg-bizzwiz-deep-space"
        />
        <BrainCircuit size={50} className="relative text-bizzwiz-star-white z-10 text-glow-magenta-flare" />
        
         {isListening && (
          <motion.div
            className="absolute inset-[-10px] border-2 border-bizzwiz-electric-cyan rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0, 0.8, 0]}}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      <div className="w-full max-w-lg z-10 flex flex-col items-center">
        <div className="h-48 w-full overflow-y-auto mb-4 p-2 rounded-lg no-scrollbar">
          <AnimatePresence>
          {wizMessages.map((msg) => (
             msg.type === 'system' ? (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-bizzwiz-electric-cyan font-roboto-mono text-xs my-3 p-2 bg-bizzwiz-deep-space/50 rounded"
              >
                <Loader2 size={14} className="inline animate-spin mr-2"/> {msg.content}
              </motion.div>
            ) : msg.type === 'ai' ? (
              <div key={msg.id} className="flex justify-start">
                <WizAIChatBubble message={msg.content} onComplete={handleNextWizMessage} />
              </div>
            ) : (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mb-3"
              >
                <div className="bg-bizzwiz-magenta-flare/80 text-bizzwiz-deep-space p-3 rounded-xl shadow-md max-w-md text-sm rounded-br-none">
                  {msg.content}
                </div>
              </motion.div>
            )
          ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        
        {currentMessageIndex >= 2 && currentMessageIndex < initialWizAdvice.length -1 && (
          <motion.div 
            initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}
            className="flex items-center space-x-2 w-full p-2 bg-bizzwiz-glass-bg/30 backdrop-blur-sm rounded-xl border border-bizzwiz-electric-cyan/20">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMic}
              className={`text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/20 ${isMicActive ? 'bg-bizzwiz-electric-cyan/30 text-bizzwiz-electric-cyan' : ''}`}
            >
              <Mic size={20} />
            </Button>
            <Input 
              type="text"
              placeholder="Posez une question à WIZ AI..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserSubmit()}
              className="futuristic-input !bg-transparent focus:!bg-bizzwiz-deep-space/30 !border-bizzwiz-electric-cyan/40 focus:!border-bizzwiz-magenta-flare"
            />
            <Button onClick={handleUserSubmit} size="icon" className="bg-bizzwiz-magenta-flare hover:bg-bizzwiz-magenta-flare/80">
              <Send size={18} />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GeneratingRoadmapPage;