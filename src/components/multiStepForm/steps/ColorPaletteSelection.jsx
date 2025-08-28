import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from '@/contexts/FormContext';
import StepButton from '@/components/multiStepForm/StepButton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatMessage from '@/components/multiStepForm/ChatMessage';
import { Plus, Minus, Copy, Trash2, RefreshCw, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ColorPaletteSelection = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [colors, setColors] = useState(formData.colorPalette || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57']);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const chatEndRef = useRef(null);
  const { t } = useTranslation();

  // Enhanced preset palettes inspired by Color Hunt
  const presetPalettes = [
    ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9'],
    ['#A8E6CF', '#88D8C0', '#7FCDCD', '#6FAADB'],
    ['#B8B5FF', '#7868E6', '#EDEEF7', '#FFCEFE'],
    ['#FF6B6B', '#FFE66D', '#FF6B6B', '#4ECDC4'],
    ['#FFB4B4', '#FFDAB9', '#FFE5CC', '#FFF8DC'],
    ['#F38BA8', '#FAE3D9', '#BBDED6', '#8AC6D1'],
    ['#EECAD5', '#D3C0D3', '#B8A8CC', '#9590C4'],
    ['#8B5A3C', '#A0826D', '#C7A882', '#F2E7D5'],
    ['#00D9FF', '#8A2387', '#E94057', '#F27121'],
    ['#141E46', '#0F4C75', '#3282B8', '#BBE1FA'],
    ['#FFF67E', '#FF7F7F', '#CE5A67', '#1F1717'],
    ['#2B3467', '#BAD7E9', '#EB455F', '#FCFFE7'],
    ['#243A73', '#7C93C3', '#9BB0C1', '#51829B'],
    ['#F7D794', '#F3A683', '#F19066', '#F08A5D'],
    ['#E8F6F3', '#AAE3E2', '#F8E8EE', '#FDF2F8'],
    ['#6D2C91', '#A663CC', '#4D4C7D', '#827397']
  ];

  // Color generation algorithms (unchanged)
  const colorGenerators = {
    monochromatic: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
        hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 15)),
        baseColor,
        hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 15)),
        hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30))
      ];
    },
    complementary: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      const complementHue = (hsl.h + 180) % 360;
      return [
        baseColor,
        hslToHex(complementHue, hsl.s, hsl.l),
        hslToHex(hsl.h, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20)),
        hslToHex(complementHue, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20))
      ];
    },
    triadic: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        baseColor,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, Math.max(20, hsl.s - 30), Math.min(90, hsl.l + 25))
      ];
    },
    analogous: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
        baseColor,
        hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
      ];
    },
    random: () => {
      const baseHue = Math.floor(Math.random() * 360);
      const saturation = 60 + Math.floor(Math.random() * 40);
      const lightness = 40 + Math.floor(Math.random() * 40);
      return [
        hslToHex(baseHue, saturation, lightness),
        hslToHex((baseHue + 30) % 360, saturation - 10, lightness + 15),
        hslToHex((baseHue + 60) % 360, saturation, lightness - 10),
        hslToHex((baseHue + 90) % 360, saturation + 10, lightness + 10),
        hslToHex((baseHue + 120) % 360, saturation - 15, lightness - 5)
      ];
    }
  };

  // Color conversion utilities (unchanged)
  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // Update formData when colors change
  const arraysShallowEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    // Avoid triggering updates if value hasn't changed
    if (!arraysShallowEqual(formData.colorPalette || [], colors)) {
      updateFormData({ colorPalette: colors });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  // Scroll to bottom on mount or content change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [colors, selectedPreset]);

  // Add a new color
  const addColor = () => {
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColors([...colors, newColor]);
  };

  // Remove a color
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  // Update a specific color
  const updateColor = (index, newColor) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    setColors(updatedColors);
    setSelectedPreset(null);
  };

  // Load a preset palette
  const loadPresetPalette = (presetColors, index) => {
    setColors([...presetColors]);
    setSelectedPreset(index);
  };

  // Auto-generate colors with different algorithms
  const generateColors = () => {
    const algorithms = Object.keys(colorGenerators);
    const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    let newColors;
    if (randomAlgorithm === 'random') {
      newColors = colorGenerators.random();
    } else {
      const baseColor = colors[0];
      newColors = colorGenerators[randomAlgorithm](baseColor);
    }
    const numColors = 3 + Math.floor(Math.random() * 4);
    const shuffled = [...newColors].sort(() => 0.5 - Math.random());
    setColors(shuffled.slice(0, numColors));
    setSelectedPreset(null);
  };

  // Generate CSS
  const generateCSS = () => {
    return colors.map((color, index) => `--color-${index + 1}: ${color};`).join('\n');
  };

  // Copy CSS to clipboard (no popup)
  const handleSave = () => {
    const cssCode = generateCSS();
    navigator.clipboard.writeText(cssCode);
  };

  // Copy individual color (no popup)
  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ChatMessage message={t('colorPaletteSelection.chatMessage')} />
        
        <div className="mx-auto max-w-6xl p-6 mt-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-bizzwiz-text-main">
            {t('colorPaletteSelection.createTitle')}
          </h2>

          {/* Current Palette */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t('colorPaletteSelection.yourPalette')}</h3>
              <div className="flex gap-2">
                <Button
                  onClick={generateColors}
                  size="sm"
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                  aria-label={t('colorPaletteSelection.generateLabel')}
                >
                  <RefreshCw className="w-4 h-4" />
                  {t('colorPaletteSelection.generateButton')}
                </Button>
                <Button
                  onClick={addColor}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  aria-label={t('colorPaletteSelection.addLabel')}
                >
                  <Plus className="w-4 h-4" />
                  {t('colorPaletteSelection.addButton')}
                </Button>
              </div>
            </div>

            {/* Current colors display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap gap-3 mb-4">
                {colors.map((color, index) => (
                  <div key={index} className="group relative">
                    <div
                      className="w-20 h-20 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                      aria-label={t('colorPaletteSelection.copyColorLabel', { color })}
                    />
                    <div className="mt-2 text-center">
                      <input
                        type="text"
                        value={color.toUpperCase()}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-20 text-xs text-center border-none bg-transparent font-mono font-semibold text-gray-700"
                        aria-label={t('colorPaletteSelection.colorInputLabel', { index: index + 1 })}
                      />
                    </div>
                    {colors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center"
                        aria-label={t('colorPaletteSelection.removeLabel', { index: index + 1 })}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preset Palettes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('colorPaletteSelection.popularPalettes')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {presetPalettes.map((palette, index) => (
                <div
                  key={index}
                  onClick={() => loadPresetPalette(palette, index)}
                  className={cn(
                    "cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105",
                    selectedPreset === index ? "ring-2 ring-blue-500" : ""
                  )}
                  aria-label={t('colorPaletteSelection.presetLabel', { index: index + 1 })}
                >
                  <div className="flex h-16">
                    {palette.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="p-2 bg-white">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {palette.map((color, colorIndex) => (
                          <span key={colorIndex} className="text-xs font-mono text-gray-600">
                            {color.slice(1, 4)}
                          </span>
                        ))}
                      </div>
                      <Heart className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Inputs for Fine-tuning */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('colorPaletteSelection.fineTuneTitle')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('colorPaletteSelection.colorLabel', { index: index + 1 })}
                  </label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-full h-12 border-2 border-gray-200 rounded-lg cursor-pointer"
                    aria-label={t('colorPaletteSelection.colorPickerLabel', { index: index + 1 })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Generated CSS */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('colorPaletteSelection.cssTitle')}</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                {generateCSS()}
              </pre>
            </div>
          </div>
        </div>
        
        <div ref={chatEndRef} />
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between items-stretch sm:items-center">
        <StepButton onClick={prevStep} variant="secondary">
          {t('colorPaletteSelection.prevButton')}
        </StepButton>
        <StepButton onClick={nextStep} disabled={colors.length < 2}>
          {t('colorPaletteSelection.nextButton')}
        </StepButton>
      </div>
    </div>
  );
};

export default ColorPaletteSelection;