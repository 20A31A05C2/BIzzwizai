import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatMessage from '@/components/multiStepForm/ChatMessage';
import { Check, Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fonts = [
  { id: '1', name: 'Roboto', family: 'Roboto, sans-serif' },
  { id: '2', name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { id: '3', name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { id: '4', name: 'Lato', family: 'Lato, sans-serif' },
  { id: '5', name: 'Playfair Display', family: 'Playfair Display, serif' },
  { id: '6', name: 'Raleway', family: 'Raleway, sans-serif' },
  { id: '7', name: 'Merriweather', family: 'Merriweather, serif' },
  { id: '8', name: 'Poppins', family: 'Poppins, sans-serif' },
  { id: '9', name: 'Nunito', family: 'Nunito, sans-serif' },
  { id: '10', name: 'Oswald', family: 'Oswald, sans-serif' },
  { id: '11', name: 'Orbitron', family: 'Orbitron, sans-serif' },
  { id: '12', name: 'Exo 2', family: 'Exo 2, sans-serif' },
  { id: '13', name: 'Bebas Neue', family: 'Bebas Neue, sans-serif' },
  { id: '14', name: 'Source Code Pro', family: 'Source Code Pro, monospace' },
  { id: '15', name: 'Inter', family: 'Inter, sans-serif' },
  { id: '16', name: 'Rubik', family: 'Rubik, sans-serif' },
  { id: '17', name: 'Cinzel', family: 'Cinzel, serif' },
  { id: '18', name: 'Teko', family: 'Teko, sans-serif' },
];

const FontSelection = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [selectedFont, setSelectedFont] = useState(() => formData.font ? fonts.find(f => f.name === formData.font) : null);
  const chatEndRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedFont) {
      updateFormData({ font: selectedFont.name }); // Use only the name as a string
    } else {
      updateFormData({ font: '' }); // Clear font if no selection
    }
  }, [selectedFont, updateFormData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedFont]); // Trigger on font selection change

  const handleSelect = (font) => {
    setSelectedFont(font);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('fontSelection.chatMessage')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
          {fonts.map((font) => (
            <Button
              key={font.id}
              onClick={() => handleSelect(font)}
              variant="outline"
              className={cn(
                "choice-button h-auto py-5 flex flex-col items-center justify-center text-base text-bizzwiz-text-alt hover:text-bizzwiz-text-main group relative bg-transparent",
                selectedFont?.id === font.id && "selected bg-bizzwiz-accent/10 border-bizzwiz-accent text-bizzwiz-text-main"
              )}
              aria-pressed={selectedFont?.id === font.id}
              aria-label={font.name}
            >
              <span
                style={{ fontFamily: font.family }}
                className={cn(
                  "text-lg mb-2 p-2 rounded bg-bizzwiz-card/50",
                  selectedFont?.id === font.id ? "text-bizzwiz-text-main" : "text-bizzwiz-accent opacity-70 group-hover:opacity-100 group-hover:text-white transition-opacity"
                )}
              >
                {font.name}
              </span>
              <span
                style={{ fontFamily: font.family }}
                className="text-sm p-1 rounded bg-bizzwiz-card/50"
              >
                {t('fontSelection.sampleText')}
              </span>
              {selectedFont?.id === font.id && (
                <div className="absolute top-2 right-2 bg-bizzwiz-accent rounded-full p-1">
                  <Check className="w-4 h-4 text-bizzwiz-deep-space" />
                </div>
              )}
            </Button>
          ))}
        </div>
        <div ref={chatEndRef} />
      </div>

      <div className="mt-auto pt-6 flex justify-between">
        <StepButton onClick={prevStep} variant="secondary">{t('fontSelection.prevButton')}</StepButton>
        <StepButton onClick={nextStep} disabled={!selectedFont}>{t('fontSelection.nextButton')}</StepButton>
      </div>
    </div>
  );
};

export default FontSelection;