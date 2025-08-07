import { useState, useEffect } from "react";
import { Star, Trophy, Lock, CheckCircle } from "lucide-react";

const Guideline = () => {
  const [completedSteps, setCompletedSteps] = useState({
    1: [1, 2], // Demo: some steps completed
    2: [], 
    3: [], 
    4: []  
  });
  
  const [currentStep, setCurrentStep] = useState({ level: 1, step: 3 });
  const [userXP, setUserXP] = useState(150); // Demo XP
  const [streak, setStreak] = useState(5);

  const levels = {
    1: { 
      steps: 12, 
      title: "VISIONAIRE", 
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      stepLabels: [
        "Welcome", "User", "Fundamentals", "Concepts", "Practice 1", 
        "Intermediate", "Advanced", "Practice 2", "Mastery", 
        "Final Practice", "Assessment", "Completion"
      ]
    },
    2: { 
      steps: 8, 
      title: "STRATÉGIE", 
      color: "from-green-500 to-blue-600",
      bgColor: "bg-green-50",
      stepLabels: [
        "Strategy Basics", "Advanced Strategy", "Planning", "Execution",
        "Analysis", "Optimization", "Review", "Mastery"
      ]
    },
    3: { 
      steps: 6, 
      title: "MAÎTRISE", 
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      stepLabels: [
        "Foundation", "Application", "Expert Level", "Advanced Practice",
        "Final Challenge", "Mastery"
      ]
    },
    4: { 
      steps: 4, 
      title: "EXPERTISE", 
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      stepLabels: [
        "Theory", "Advanced Theory", "Expert Practice", "Final Mastery"
      ]
    }
  };

  const stepRoutes = {
    1: [
      '/level1/introduction', '/level1/basics', '/level1/fundamentals', '/level1/concepts',
      '/level1/practice1', '/level1/intermediate', '/level1/advanced-concepts', '/level1/practice2',
      '/level1/mastery', '/level1/final-practice', '/level1/assessment', '/level1/completion'
    ],
    2: [
      '/level2/strategy-basics', '/level2/strategy-advanced', '/level2/planning', '/level2/execution',
      '/level2/analysis', '/level2/optimization', '/level2/review', '/level2/mastery'
    ],
    3: [
      '/level3/foundation', '/level3/application', '/level3/expert', '/level3/advanced-practice',
      '/level3/final-challenge', '/level3/mastery'
    ],
    4: [
      '/level4/theory', '/level4/advanced-theory', '/level4/expert-practice', '/level4/final-mastery'
    ]
  };

  // Check if a level is unlocked
  const isLevelUnlocked = (levelNum) => {
    if (levelNum === 1) return true;
    const prevLevel = levelNum - 1;
    const prevLevelSteps = levels[prevLevel].steps;
    return completedSteps[prevLevel].length === prevLevelSteps;
  };

  // Check if a step is accessible
  const isStepAccessible = (step, level) => {
    if (!isLevelUnlocked(level)) return false;
    if (step === 1) return true;
    return completedSteps[level].includes(step - 1);
  };

  // Check if step is completed
  const isStepCompleted = (step, level) => {
    return completedSteps[level].includes(step);
  };

  // Handle step click and navigation
  const handleStepClick = (step, level) => {
    if (!isStepAccessible(step, level)) return;
    
    const route = stepRoutes[level][step - 1];
    console.log(`Navigating to: ${route}`);
    
    // Mark step as completed and award XP
    if (!completedSteps[level].includes(step)) {
      setCompletedSteps(prev => ({
        ...prev,
        [level]: [...prev[level], step]
      }));
      setUserXP(prev => prev + 10); // Award 10 XP per step
    }
    
    setCurrentStep({ level, step });
    
    // In real app, you would navigate here:
    // window.location.href = route; // Simple navigation
    // or use your router's navigation method
  };

  // Get the next available step
  const getNextStep = () => {
    for (let level = 1; level <= 4; level++) {
      if (!isLevelUnlocked(level)) continue;
      
      for (let step = 1; step <= levels[level].steps; step++) {
        if (!isStepCompleted(step, level) && isStepAccessible(step, level)) {
          return { level, step };
        }
      }
    }
    return null;
  };

  // Animated step button component
  const StepButton = ({ step, level, levelData, position }) => {
    const completed = isStepCompleted(step, level);
    const accessible = isStepAccessible(step, level);
    const isCurrent = currentStep.level === level && currentStep.step === step;
    const isNext = (() => {
      const next = getNextStep();
      return next && next.level === level && next.step === step;
    })();

    const getStepIcon = () => {
      if (completed) return <CheckCircle className="w-6 h-6" />;
      if (!accessible) return <Lock className="w-4 h-4" />;
      if (step % 5 === 0) return <Trophy className="w-5 h-5" />;
      return <Star className="w-4 h-4" />;
    };

    return (
      <div
        className={`relative flex flex-col items-center mb-8 transition-all duration-300 ${
          position % 2 === 0 ? 'ml-8' : 'mr-8'
        }`}
        style={{
          animation: accessible ? 'fadeInUp 0.5s ease-out' : 'none',
          animationDelay: `${step * 0.1}s`,
          animationFillMode: 'both'
        }}
      >
        {/* Connecting Line */}
        {step < levels[level].steps && (
          <div className="absolute top-16 w-0.5 h-16 bg-gray-300 z-0"></div>
        )}

        {/* Step Circle */}
        <button
          className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
            completed 
              ? 'bg-green-500 border-green-400 text-white shadow-lg' 
              : accessible 
                ? `bg-gradient-to-r ${levelData.color} border-white text-white shadow-lg hover:shadow-xl hover:-translate-y-1` 
                : 'bg-gray-300 border-gray-400 text-gray-500'
          } ${isCurrent || isNext ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
          onClick={() => handleStepClick(step, level)}
          disabled={!accessible}
          style={{
            filter: completed ? 'drop-shadow(0 4px 8px rgba(34, 197, 94, 0.3))' : 
                    accessible ? 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' : 'none'
          }}
        >
          {getStepIcon()}
          
          {/* Floating Image/Character */}
          <div
            className={`absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-300 ${
              isCurrent || isNext ? 'animate-bounce' : ''
            }`}
            style={{
              animation: isCurrent || isNext ? 'float 2s ease-in-out infinite' : 'none'
            }}
          >
            {/* Replace with your image.png */}
            <img 
              src="/api/placeholder/32/32" 
              alt="Step character" 
              className="w-6 h-6 object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback emoji */}
            <span className="text-lg hidden">🎯</span>
          </div>

          {/* Progress Indicator */}
          {isNext && (
            <div
              className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full"
              style={{
                animation: 'pulse 1.5s infinite'
              }}
            />
          )}
        </button>

        {/* Step Label */}
        <div className="mt-3 text-center max-w-20">
          <div className={`text-xs font-semibold ${
            completed ? 'text-green-600' :
            accessible ? 'text-gray-700' : 'text-gray-400'
          }`}>
            {levelData.stepLabels[step - 1] || `Step ${step}`}
          </div>
          {completed && (
            <div className="text-xs text-green-600 mt-1 animate-pulse">
              +10 XP
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderLevelPath = (levelNum, levelData) => {
    const level = parseInt(levelNum);
    const steps = Array.from({ length: levelData.steps }, (_, i) => i + 1);
    const unlocked = isLevelUnlocked(level);
    const completedCount = completedSteps[level].length;
    const progress = (completedCount / levelData.steps) * 100;

    if (!unlocked && level > 1) {
      return (
        <div
          key={`level-${levelNum}`}
          className="relative mb-16 opacity-70 transition-opacity duration-500"
        >
          {/* Locked Level Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-gray-200 rounded-full px-6 py-3 transition-all duration-300 hover:bg-gray-300">
              <Lock className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-bold text-gray-600">LEVEL {levelNum}</div>
                <div className="text-xs text-gray-500">{levelData.title}</div>
              </div>
            </div>
          </div>
          
          {/* Locked Steps Preview */}
          <div className="flex flex-col items-center space-y-8 opacity-50">
            {steps.slice(0, 3).map((step, index) => (
              <div key={step} className="w-12 h-12 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
            ))}
            <div className="text-gray-500 text-sm">Complete Level {level - 1} to unlock</div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={`level-${levelNum}`}
        className="relative mb-16 transition-all duration-500"
        style={{
          animation: 'slideInUp 0.6s ease-out',
          animationDelay: `${level * 0.2}s`,
          animationFillMode: 'both'
        }}
      >
        {/* Level Header */}
        <div className="text-center mb-8">
          <div 
            className={`inline-flex items-center space-x-3 bg-gradient-to-r ${levelData.color} rounded-full px-8 py-4 text-white shadow-lg transition-transform duration-300 hover:scale-105`}
          >
            <Trophy className="w-6 h-6" />
            <div>
              <div className="text-sm font-bold">LEVEL {levelNum}</div>
              <div className="text-lg font-bold">{levelData.title}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{completedCount}/{levelData.steps} completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${levelData.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps Path */}
        <div className="relative max-w-md mx-auto">
          {steps.map((step, index) => (
            <StepButton 
              key={step}
              step={step}
              level={level}
              levelData={levelData}
              position={index}
            />
          ))}
          
          {/* Level Complete Celebration */}
          {completedCount === levelData.steps && (
            <div
              className="text-center py-8 animate-bounce"
            >
              <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${levelData.color} text-white px-6 py-3 rounded-full font-bold shadow-lg`}>
                <Trophy className="w-5 h-5" />
                <span>Level {levelNum} Complete!</span>
              </div>
              {level < 4 && (
                <div className="text-sm text-gray-600 mt-2">
                  Level {level + 1} unlocked! 🎉
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(-2px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -8px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800">Learning Path</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Streak */}
            <div className="flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-full">
              <span className="text-orange-600 font-bold">🔥</span>
              <span className="text-orange-700 font-semibold text-sm">{streak}</span>
            </div>
            
            {/* XP */}
            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-full">
              <span className="text-yellow-600 font-bold">⚡</span>
              <span className="text-yellow-700 font-semibold text-sm">{userXP} XP</span>
            </div>
            
            {/* Flag */}
            <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="w-6 h-4" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Learning Path - Main Column */}
          <div className="lg:col-span-3">
            {Object.entries(levels).map(([levelNum, levelData]) => 
              renderLevelPath(levelNum, levelData)
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Your Progress</h3>
              <div className="space-y-3">
                {Object.entries(levels).map(([levelNum, levelData]) => {
                  const completed = completedSteps[levelNum].length;
                  const total = levelData.steps;
                  const progress = (completed / total) * 100;
                  
                  return (
                    <div key={levelNum} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level {levelNum}</span>
                        <span className="font-semibold text-gray-800">{completed}/{total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${levelData.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Get Started</h3>
              <div className="space-y-3">
                <button
                  onClick={() => console.log('Create profile clicked')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-center block"
                >
                  CREATE PROFILE
                </button>
                <button
                  onClick={() => console.log('Login clicked')}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 text-center block"
                >
                  LOG IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guideline;