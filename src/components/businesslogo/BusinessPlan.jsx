import React, { useEffect, useState } from 'react';
import { FileText, ArrowRight, MessageCircle, Download } from 'lucide-react';
import ApiService from '@/apiService'; // Adjust path to your ApiService

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const BusinessComponent = ({ setCurrentView }) => {
  const [businessPlan, setBusinessPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessPlan = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) {
        setError('User ID or Form Data ID not found');
        setLoading(false);
        return;
      }

      try {
        // Fetch existing business plan
        const response = await ApiService('/generate-business-plan', 'POST', { user_id: userId, form_data_id: formDataId });
        if (response.business_plan) {
          setBusinessPlan(response.business_plan);
        } else if (response.message === 'Business plan already generated') {
          setBusinessPlan(response.business_plan || 'Business plan already exists, no new generation needed.');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch business plan');
        setLoading(false);
      }
    };

    fetchBusinessPlan();
  }, []);

  const downloadBusinessPlan = () => {
    const element = document.createElement('a');
    const file = new Blob([businessPlan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'business-plan.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00eaff] via-[#8f00ff] to-[#ff00b8] bg-clip-text text-transparent mb-4">
              Votre Business Plan
            </h1>
            <p className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
              Découvrez votre plan d'affaires personnalisé et commencez votre parcours entrepreneurial
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-6 md:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#00eaff]/20 to-[#8f00ff]/20 rounded-xl border border-[#00eaff]/30">
                  <FileText className="w-6 h-6 text-[#00eaff]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#e5e7eb]">Business Plan Complet</h2>
                  <p className="text-sm text-[#9ca3af]">Plan d'affaires détaillé et personnalisé</p>
                </div>
              </div>
              
              {loading ? (
                <div className="bg-gray-900/50 rounded-xl p-4 mb-6 h-64 md:h-80 flex items-center justify-center">
                  <p className="text-[#9ca3af]">Loading business plan...</p>
                </div>
              ) : error ? (
                <div className="bg-gray-900/50 rounded-xl p-4 mb-6 h-64 md:h-80 flex items-center justify-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="bg-gray-900/50 rounded-xl p-4 mb-6 h-64 md:h-80 overflow-y-auto border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300">
                  <pre className="text-sm text-[#9ca3af] whitespace-pre-wrap leading-relaxed">{businessPlan}</pre>
                </div>
              )}
              
              <button
                onClick={downloadBusinessPlan}
                disabled={loading || error || !businessPlan}
                className="w-full bg-gradient-to-r from-[#00eaff] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Télécharger le Business Plan</span>
              </button>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800/50 p-6 md:p-8 animate-slide-up delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#ff00b8]/20 to-[#8f00ff]/20 rounded-xl border border-[#ff00b8]/30">
                  <ArrowRight className="w-6 h-6 text-[#ff00b8]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#e5e7eb]">Prochaine Étape</h2>
                  <p className="text-sm text-[#9ca3af]">Création de votre identité visuelle</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-102">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00eaff] to-[#8f00ff] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">1</div>
                  <span className="text-[#e5e7eb] font-medium">Chat avec IA pour créer votre logo</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 opacity-60">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#8f00ff] to-[#ff00b8] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">2</div>
                  <span className="text-[#e5e7eb] font-medium">Validation de votre identité visuelle</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 opacity-60">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#ff00b8] to-[#8f00ff] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">3</div>
                  <span className="text-[#e5e7eb] font-medium">Proposition commerciale personnalisée</span>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentView('logo')}
                className="w-full bg-gradient-to-r from-[#ff00b8] to-[#8f00ff] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Commencer le Chat IA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
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
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default BusinessComponent;