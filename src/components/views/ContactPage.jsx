import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, CalendarDays, Clock, User, MessageSquare, Send, Brain, Users, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ApiService from '@/apiService';

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentSubject, setAppointmentSubject] = useState('');

  const availableTimes = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const assistantTypes = [
    { id: 'general', label: 'Assistant IA Généraliste', icon: <Brain size={18} className="mr-2 text-bizzwiz-electric-cyan" /> },
    { id: 'technical', label: 'Support Technique Quantique', icon: <Users size={18} className="mr-2 text-bizzwiz-magenta-flare" /> },
    { id: 'project', label: 'Consultant Projet Galactique', icon: <Briefcase size={18} className="mr-2 text-bizzwiz-nebula-purple" /> },
  ];
  const [selectedAssistant, setSelectedAssistant] = useState(assistantTypes[0].id);


  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Erreur de Transmission",
        description: "Veuillez remplir tous les champs du formulaire de contact.",
        variant: "destructive",
        className: "futuristic-toast-destructive",
      });
      return;
    }
    try {
      await ApiService('/contact', 'POST', { name, email, message });
      toast({
        title: "🛰️ Message Transmis !",
        description: "Votre message a été envoyé à travers l'hyper-espace. Nous vous répondrons dès que possible !",
        className: "futuristic-toast",
      });
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
        className: "futuristic-toast-destructive",
      });
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime || !appointmentSubject) {
      toast({
        title: "Erreur de Planification Temporelle",
        description: "Veuillez sélectionner une date, une heure et un sujet pour votre rendez-vous.",
        variant: "destructive",
        className: "futuristic-toast-destructive",
      });
      return;
    }
    try {
      await ApiService('/contact-appointment', 'POST', {
        appointmentSubject,
        selectedAssistant,
        appointmentDate,
        appointmentTime,
      });
      toast({
        title: "🗓️ Demande de Rendez-vous Reçue !",
        description: `Votre demande pour le ${format(appointmentDate, 'PPP', { locale: fr })} à ${appointmentTime} concernant "${appointmentSubject}" avec un ${assistantTypes.find(a => a.id === selectedAssistant)?.label || 'assistant'} a été enregistrée.`,
        className: "futuristic-toast",
      });
      setAppointmentDate(null); setAppointmentTime(''); setAppointmentSubject('');
    } catch (err) {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue lors de la demande de rendez-vous.",
        variant: "destructive",
        className: "futuristic-toast-destructive",
      });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[calc(100vh-var(--navbar-height,68px))] container mx-auto px-4 py-12 md:py-20 lg:py-28"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-black text-center mb-6 text-glow-electric-cyan"
      >
        Contact Holo<span className="text-gradient-cosmic">Net</span>
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="text-lg md:text-xl text-bizzwiz-comet-tail text-center mb-16 md:mb-20 max-w-2xl mx-auto"
      >
        Connectez-vous avec notre équipe d'experts interstellaires. Que ce soit pour une simple question ou pour planifier une consultation quantique, nous sommes à votre écoute.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start">
        
        <motion.div variants={itemVariants} className="space-y-8 p-6 md:p-8 glassmorphic-card border-bizzwiz-magenta-flare/30">
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-6 flex items-center">
            <MessageSquare size={32} className="mr-3 text-bizzwiz-magenta-flare drop-shadow-[0_0_8px_currentColor]" />
            Envoyer un Message Crypté
          </h2>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                <User size={16} className="mr-2 text-bizzwiz-electric-cyan" /> Nom de Code / Alias
              </Label>
              <Input 
                type="text" 
                id="name" 
                placeholder="Ex: Capitaine Stellaire" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="futuristic-input" 
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                <Mail size={16} className="mr-2 text-bizzwiz-electric-cyan" /> Fréquence Email Sécurisée
              </Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Ex: pilote@nebula.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="futuristic-input"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                <Send size={16} className="mr-2 text-bizzwiz-electric-cyan" /> Votre Transmission
              </Label>
              <Textarea 
                id="message" 
                placeholder="Décrivez votre requête interstellaire ici..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="futuristic-textarea min-h-[120px]"
              />
            </div>
            <Button type="submit" className="cyber-button w-full group">
              Envoyer Transmission
              <Send size={18} className="ml-2.5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8 p-6 md:p-8 glassmorphic-card border-bizzwiz-electric-cyan/30">
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-bizzwiz-star-white mb-6 flex items-center">
            <CalendarDays size={32} className="mr-3 text-bizzwiz-electric-cyan drop-shadow-[0_0_8px_currentColor]" />
            Planifier un Holo-Rendez-vous
          </h2>
          <form onSubmit={handleAppointmentSubmit} className="space-y-6">
            <div>
              <Label htmlFor="appointment-subject" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                <MessageSquare size={16} className="mr-2 text-bizzwiz-magenta-flare" /> Sujet de la Synchro
              </Label>
              <Input 
                type="text" 
                id="appointment-subject" 
                placeholder="Ex: Consultation Stratégie IA" 
                value={appointmentSubject} 
                onChange={(e) => setAppointmentSubject(e.target.value)}
                className="futuristic-input"
              />
            </div>
            <div>
              <Label htmlFor="assistant-type" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                <User size={16} className="mr-2 text-bizzwiz-magenta-flare" /> Type d'Assistant IA
              </Label>
              <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                <SelectTrigger className="w-full futuristic-select">
                  <SelectValue placeholder="Sélectionnez un type d'assistant" />
                </SelectTrigger>
                <SelectContent className="futuristic-select-content">
                  {assistantTypes.map(assistant => (
                    <SelectItem key={assistant.id} value={assistant.id} className="futuristic-select-item">
                      <div className="flex items-center">
                        {assistant.icon}
                        {assistant.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-date" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                  <CalendarDays size={16} className="mr-2 text-bizzwiz-magenta-flare" /> Date Stellaire
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal futuristic-input hover:bg-bizzwiz-deep-space/30",
                        !appointmentDate && "text-bizzwiz-comet-tail/70"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4 text-bizzwiz-magenta-flare/80" />
                      {appointmentDate ? format(appointmentDate, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={appointmentDate}
                      onSelect={setAppointmentDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } 
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="appointment-time" className="text-sm font-medium text-bizzwiz-comet-tail flex items-center mb-1.5">
                  <Clock size={16} className="mr-2 text-bizzwiz-magenta-flare" /> Heure Cosmique (UTC+1)
                </Label>
                <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                  <SelectTrigger className="w-full futuristic-select">
                    <SelectValue placeholder="Choisissez une heure" />
                  </SelectTrigger>
                  <SelectContent className="futuristic-select-content">
                    {availableTimes.map(time => (
                      <SelectItem key={time} value={time} className="futuristic-select-item">{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="cyber-button w-full group">
              Confirmer Holo-Rendez-vous
              <CalendarDays size={18} className="ml-2.5 transform transition-transform duration-300 group-hover:scale-110" />
            </Button>
          </form>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-20 md:mt-28 text-center"
      >
        <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-bizzwiz-star-white mb-6">Autres Canaux de Communication</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <a href="mailto:contact@bizzwiz.ai" className="flex items-center text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors duration-200 group futuristic-link-glow">
            <Mail size={22} className="mr-2.5 text-bizzwiz-magenta-flare group-hover:animate-pulse" /> contact@bizzwiz.ai
          </a>
          <a href="tel:+330800BizzWiz" className="flex items-center text-bizzwiz-comet-tail hover:text-bizzwiz-electric-cyan transition-colors duration-200 group futuristic-link-glow">
            <Phone size={22} className="mr-2.5 text-bizzwiz-electric-cyan group-hover:animate-pulse" /> +33 0 800 BIZZ WIZ (HoloLink)
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;