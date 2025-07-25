import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageCircle, CheckCircle, Send, Sparkles, Edit, Download, ArrowLeft } from 'lucide-react';
import ApiService from '@/apiService'; // Adjust path to your ApiService

const LogoComponent = ({ setCurrentView }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      id: '1', 
      type: 'ai', 
      content: 'Bonjour ! Je suis votre assistant IA pour créer le logo parfait. Pouvez-vous me décrire votre vision pour le logo de votre entreprise ? (Exemple : "Un logo moderne pour une entreprise de nourriture avec des couleurs vives")', 
      timestamp: new Date() 
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [logoExists, setLogoExists] = useState(false);
  const [existingLogoUrl, setExistingLogoUrl] = useState('');
  const chatEndRef = useRef(null);

  // Check if logo already exists for this project
  useEffect(() => {
    const checkExistingLogo = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) return;
      try {
        const response = await ApiService('/generate-logo', 'POST', { user_id: userId, form_data_id: formDataId, prompt: 'check' });
        if (response.logo_url) {
          setLogoExists(true);
          setExistingLogoUrl(response.logo_url);
          setSelectedLogo(response.logo_url);
          setChatMessages([
            {
              id: 'existing-logo',
              type: 'ai',
              content: 'Un logo a déjà été généré pour ce projet.',
              timestamp: new Date(),
              logoUrl: response.logo_url,
            }
          ]);
        }
      } catch (err) {
        // ignore if not found
      }
    };
    checkExistingLogo();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || logoExists) return;

    const userMessage = { 
      id: Date.now().toString(), 
      type: 'user', 
      content: currentMessage, 
      timestamp: new Date() 
    };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await ApiService('/generate-logo', 'POST', { 
        user_id: localStorage.getItem('bizwizuser_id'), 
        form_data_id: localStorage.getItem('bizwiz_form_data_id'),
        prompt: currentMessage 
      });
      if (response.logo_url) {
        setLogoExists(true);
        setExistingLogoUrl(response.logo_url);
        setSelectedLogo(response.logo_url);
      }
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.logo_url
          ? 'Voici une suggestion de logo basée sur votre description !'
          : (response.error || 'Erreur lors de la génération du logo.'),
        timestamp: new Date(),
        logoUrl: response.logo_url,
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: err.error || `Erreur : ${err.message || 'Impossible de générer le logo'}. Veuillez réessayer plus tard si le modèle est surchargé.`,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const selectLogo = (logoUrl) => {
    setSelectedLogo(logoUrl);
    setIsEditing(false);
  };

  const editLogo = () => {
    setIsEditing(true);
    setSelectedLogo('');
  };

  // Download logo as PNG (fetch as blob, then download)
  const downloadLogo = async () => {
    if (!existingLogoUrl) return;
    try {
      const response = await fetch(existingLogoUrl, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'logo-bizzwiz.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur lors du téléchargement du logo.");
    }
  };

  // Back button handler
  const handleBack = () => {
    setCurrentView('business');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8f00ff]/20 to-[#ff00b8]/20 backdrop-blur-sm border border-[#8f00ff]/30 rounded-full px-6 py-3 mb-6">
              <Bot className="w-5 h-5 text-[#8f00ff] animate-pulse" />
              <Sparkles className="w-4 h-4 text-[#ff00b8] animate-pulse" />
              <span className="text-[#8f00ff] font-medium">Assistant IA Logo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] bg-clip-text text-transparent mb-4">
              Créons Votre Logo Parfait
            </h1>
            <p className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
              Notre IA va vous aider à créer un logo unique qui représente parfaitement votre marque
            </p>
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 text-white rounded-xl hover:bg-gray-700/80 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-6 py-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[#e5e7eb] font-semibold">Assistant IA</h3>
                <p className="text-[#9ca3af] text-sm">En ligne • Prêt à créer</p>
              </div>
            </div>
          </div>

          <div className="h-80 md:h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-900/30 to-gray-900/50">
            {chatMessages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-message-slide`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-lg ${message.type === 'user' ? 'bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white' : 'bg-gray-800/80 text-[#e5e7eb] border border-gray-700/50 backdrop-blur-sm'} transform hover:scale-105 transition-all duration-300`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-[#8f00ff]" />
                      <span className="text-xs text-[#9ca3af] font-medium">Assistant IA</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.logoUrl && (
                    <div className="mt-4">
                      <div className="relative group">
                        <img 
                          src={message.logoUrl} 
                          alt="Logo suggestion" 
                          className="w-32 h-32 rounded-xl cursor-pointer border-2 border-gray-600/50 hover:border-[#8f00ff]/50 transition-all duration-300 transform group-hover:scale-110" 
                          onClick={() => selectLogo(message.logoUrl)} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white text-xs p-2 font-medium">Cliquez pour sélectionner</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-bounce">
                <div className="bg-gray-800/80 text-[#e5e7eb] border border-gray-700/50 px-4 py-3 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-[#8f00ff]" />
                    <span className="text-xs text-[#9ca3af] font-medium">Assistant IA</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#8f00ff] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-gray-800/50 p-6 bg-gradient-to-r from-gray-900/80 to-gray-800/80">
            {/* If logo exists, show download and back, else show input */}
            {logoExists ? (
              <div className="flex flex-col items-center gap-4">
                <img src={existingLogoUrl} alt="Logo généré" className="w-32 h-32 rounded-xl border-2 border-[#8f00ff]/50" />
                <div className="flex gap-2">
                  <button
                    onClick={downloadLogo}
                    className="px-6 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Télécharger le Logo</span>
                  </button>
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Retour</span>
                  </button>
                </div>
                <p className="text-[#9ca3af] text-sm mt-2">Un seul logo peut être généré par projet. Pour modifier, contactez le support.</p>
              </div>
            ) : (
              <>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#8f00ff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300 hover:border-gray-500/50"
                    placeholder="Décrivez votre vision du logo... (Ex : 'Un logo moderne pour une entreprise de nourriture avec des couleurs vives')"
                    disabled={logoExists}
                  />
                  <button 
                    onClick={sendMessage} 
                    className="px-6 py-3 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
                    disabled={!currentMessage.trim() || isTyping || logoExists}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {selectedLogo && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 animate-fade-in">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <img src={selectedLogo} alt="Selected logo" className="w-16 h-16 rounded-lg border-2 border-[#8f00ff]/50" />
                        <div>
                          <p className="text-[#e5e7eb] font-semibold">Logo sélectionné</p>
                          <p className="text-[#9ca3af] text-sm">Prêt pour la validation</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={editLogo}
                          className="px-4 py-2 bg-gray-700/50 text-[#e5e7eb] rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex items-center gap-1 transform hover:scale-105 active:scale-95"
                          disabled={logoExists}
                        >
                          <Edit className="w-4 h-4" />
                          <span className="font-medium">Modifier</span>
                        </button>
                        <button 
                          onClick={handleBack}
                          className="px-6 py-3 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          <CheckCircle className="w-5 h-5" /> 
                          <span className="font-medium">Valider le Logo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {isEditing && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 animate-fade-in">
                    <p className="text-[#e5e7eb] font-semibold mb-2">Modifier le logo</p>
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#8f00ff] focus:border-transparent text-[#e5e7eb] placeholder-[#9ca3af] transition-all duration-300 mb-4"
                      placeholder="Décrivez les modifications souhaitées... (Ex : 'Ajouter du rouge au logo')"
                      disabled={logoExists}
                    />
                    <button 
                      onClick={sendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95"
                      disabled={!currentMessage.trim() || isTyping || logoExists}
                    >
                      <Send className="w-5 h-5" />
                      <span className="font-medium">Générer Modification</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes message-slide {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-message-slide {
          animation: message-slide 0.5s ease-out;
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .hover\:scale-110:hover {
          transform: scale(1.1);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default LogoComponent;