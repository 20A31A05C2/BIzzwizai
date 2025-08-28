// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Palette, CheckCircle, RefreshCw, Heart, Plus, Copy, Trash2, Edit3, MessageSquare, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { useFormContext } from '@/contexts/FormContext';
// import { useTranslation } from 'react-i18next';
// import { cn } from '@/lib/utils';
// import LevelHeader from '@/components/multiStepForm/LevelHeader';
// import TopHeaderBar from '@/components/multiStepForm/TopHeaderBar';
// import ApiService from '@/apiService';

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <h1 className="text-2xl text-center text-gradient-bizzwiz font-montserrat">
//           Something went wrong. Please try again later.
//         </h1>
//       );
//     }
//     return this.props.children;
//   }
// }

// const DesignSelection = ({ setCurrentView }) => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const { formData, updateFormData, nextStep, prevStep } = useFormContext();
//   const [colors, setColors] = useState(formData.colorPalette || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57']);
//   const [selectedPreset, setSelectedPreset] = useState(null);
//   const [isValidated, setIsValidated] = useState(false);
//   const [showValidationDialog, setShowValidationDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showAIModificationModal, setShowAIModificationModal] = useState(false);
//   const [aiModificationPrompt, setAiModificationPrompt] = useState('');
//   const [aiModificationLoading, setAiModificationLoading] = useState(false);
//   const [showManualEditModal, setShowManualEditModal] = useState(false);
//   const [editedContent, setEditedContent] = useState('');
//   const [manualEditLoading, setManualEditLoading] = useState(false);
//   const [modificationStatus, setModificationStatus] = useState({
//     ai_modification_count: 0,
//     remaining_ai_modifications: 2,
//     manual_edit_count: 0,
//     is_validated: false,
//     current_credits: 0,
//     can_use_ai: true
//   });
//   const chatEndRef = useRef(null);

//   // Enhanced preset palettes inspired by Color Hunt
//   const presetPalettes = [
//     ['#2C3639', '#3F4E4F', '#A27B5C', '#DCD7C9'],
//     ['#A8E6CF', '#88D8C0', '#7FCDCD', '#6FAADB'],
//     ['#B8B5FF', '#7868E6', '#EDEEF7', '#FFCEFE'],
//     ['#FF6B6B', '#FFE66D', '#FF6B6B', '#4ECDC4'],
//     ['#FFB4B4', '#FFDAB9', '#FFE5CC', '#FFF8DC'],
//     ['#F38BA8', '#FAE3D9', '#BBDED6', '#8AC6D1'],
//     ['#EECAD5', '#D3C0D3', '#B8A8CC', '#9590C4'],
//     ['#8B5A3C', '#A0826D', '#C7A882', '#F2E7D5'],
//     ['#00D9FF', '#8A2387', '#E94057', '#F27121'],
//     ['#141E46', '#0F4C75', '#3282B8', '#BBE1FA'],
//     ['#FFF67E', '#FF7F7F', '#CE5A67', '#1F1717'],
//     ['#2B3467', '#BAD7E9', '#EB455F', '#FCFFE7'],
//     ['#243A73', '#7C93C3', '#9BB0C1', '#51829B'],
//     ['#F7D794', '#F3A683', '#F19066', '#F08A5D'],
//     ['#E8F6F3', '#AAE3E2', '#F8E8EE', '#FDF2F8'],
//     ['#6D2C91', '#A663CC', '#4D4C7D', '#827397']
//   ];

//   // Color generation algorithms
//   const colorGenerators = {
//     monochromatic: (baseColor) => {
//       const hsl = hexToHsl(baseColor);
//       return [
//         hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
//         hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 15)),
//         baseColor,
//         hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 15)),
//         hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30))
//       ];
//     },
//     complementary: (baseColor) => {
//       const hsl = hexToHsl(baseColor);
//       const complementHue = (hsl.h + 180) % 360;
//       return [
//         baseColor,
//         hslToHex(complementHue, hsl.s, hsl.l),
//         hslToHex(hsl.h, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20)),
//         hslToHex(complementHue, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20))
//       ];
//     },
//     triadic: (baseColor) => {
//       const hsl = hexToHsl(baseColor);
//       return [
//         baseColor,
//         hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
//         hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
//         hslToHex(hsl.h, Math.max(20, hsl.s - 30), Math.min(90, hsl.l + 25))
//       ];
//     },
//     analogous: (baseColor) => {
//       const hsl = hexToHsl(baseColor);
//       return [
//         hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
//         hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
//         baseColor,
//         hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
//         hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
//       ];
//     },
//     random: () => {
//       const baseHue = Math.floor(Math.random() * 360);
//       const saturation = 60 + Math.floor(Math.random() * 40);
//       const lightness = 40 + Math.floor(Math.random() * 40);
//       return [
//         hslToHex(baseHue, saturation, lightness),
//         hslToHex((baseHue + 30) % 360, saturation - 10, lightness + 15),
//         hslToHex((baseHue + 60) % 360, saturation, lightness - 10),
//         hslToHex((baseHue + 90) % 360, saturation + 10, lightness + 10),
//         hslToHex((baseHue + 120) % 360, saturation - 15, lightness - 5)
//       ];
//     }
//   };

//   // Color conversion utilities
//   function hexToHsl(hex) {
//     const r = parseInt(hex.slice(1, 3), 16) / 255;
//     const g = parseInt(hex.slice(3, 5), 16) / 255;
//     const b = parseInt(hex.slice(5, 7), 16) / 255;
//     const max = Math.max(r, g, b);
//     const min = Math.min(r, g, b);
//     let h, s, l = (max + min) / 2;
//     if (max === min) {
//       h = s = 0;
//     } else {
//       const d = max - min;
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//       switch (max) {
//         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//         case g: h = (b - r) / d + 2; break;
//         case b: h = (r - g) / d + 4; break;
//       }
//       h /= 6;
//     }
//     return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
//   }

//   function hslToHex(h, s, l) {
//     l /= 100;
//     const a = s * Math.min(l, 1 - l) / 100;
//     const f = n => {
//       const k = (n + h / 30) % 12;
//       const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//       return Math.round(255 * color).toString(16).padStart(2, '0');
//     };
//     return `#${f(0)}${f(8)}${f(4)}`;
//   }

//   // Update formData when colors change
//   useEffect(() => {
//     // Avoid infinite loops if updateFormData identity is unstable
//     updateFormData({ colorPalette: colors });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [colors]);

//   // Fetch modification status on component mount
//   useEffect(() => {
//     fetchModificationStatus();
//   }, []);

//   const fetchModificationStatus = async () => {
//     try {
//       const userId = localStorage.getItem('bizwizuser_id');
//       const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
//       const response = await ApiService('/design-modification-status', 'GET', { 
//         user_id: userId, 
//         form_data_id: formDataId 
//       });
      
//       setModificationStatus(response);
//       setIsValidated(response.is_validated);
//       // If backend has an auto-generated or saved palette, load it
//       if (Array.isArray(response.color_palette) && response.color_palette.length > 0) {
//         setColors(response.color_palette);
//       }
//     } catch (err) {
//       // Handle error silently
//     }
//   };

//   // Add a new color
//   const addColor = () => {
//     const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
//     setColors([...colors, newColor]);
//   };

//   // Remove a color
//   const removeColor = (index) => {
//     if (colors.length > 2) {
//       setColors(colors.filter((_, i) => i !== index));
//     }
//   };

//   // Update a specific color
//   const updateColor = (index, newColor) => {
//     const updatedColors = [...colors];
//     updatedColors[index] = newColor;
//     setColors(updatedColors);
//     setSelectedPreset(null);
//   };

//   // Load a preset palette
//   const loadPresetPalette = (presetColors, index) => {
//     setColors([...presetColors]);
//     setSelectedPreset(index);
//   };

//   // Auto-generate colors with different algorithms
//   const generateColors = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const algorithms = Object.keys(colorGenerators);
//       const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
//       let newColors;
//       if (randomAlgorithm === 'random') {
//         newColors = colorGenerators.random();
//       } else {
//         const baseColor = colors[0];
//         newColors = colorGenerators[randomAlgorithm](baseColor);
//       }
//       const numColors = 3 + Math.floor(Math.random() * 4);
//       const shuffled = [...newColors].sort(() => 0.5 - Math.random());
//       setColors(shuffled.slice(0, numColors));
//       setSelectedPreset(null);
//       setLoading(false);
//     }, 1000);
//   };

//   // Copy individual color
//   const copyColor = (color) => {
//     navigator.clipboard.writeText(color);
//     alert(`Color ${color} copied to clipboard!`);
//   };

//   const handleValidation = () => {
//     setShowValidationDialog(true);
//   };

//   const confirmValidation = async () => {
//     const userId = localStorage.getItem('bizwizuser_id');
//     const formDataId = localStorage.getItem('bizwiz_form_data_id');
//     const proceed = () => {
//       setIsValidated(true);
//       setShowValidationDialog(false);
//       // brief delay so UI shows completed state
//       setTimeout(() => {
//         if (typeof setCurrentView === 'function') {
//           setCurrentView('font');
//         } else if (navigate) {
//           navigate('/font', { replace: false });
//         }
//       }, 600);
//     };

//     try {
//       await ApiService('/validate-design', 'POST', { 
//         user_id: userId, 
//         form_data_id: formDataId,
//         color_palette: colors
//       });
//       fetchModificationStatus();
//       proceed();
//     } catch (err) {
//       // Even if validation API fails, continue to fonts so the user isn't blocked
//       proceed();
//     }
//   };

//   const handleAIModification = () => {
//     setShowAIModificationModal(true);
//   };

//   const submitAIModification = async () => {
//     if (!aiModificationPrompt.trim()) return;

//     setAiModificationLoading(true);
//     try {
//       const userId = localStorage.getItem('bizwizuser_id');
//       const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
//       const response = await ApiService('/request-design-ai-modification', 'POST', {
//         user_id: userId,
//         form_data_id: formDataId,
//         modification_prompt: aiModificationPrompt,
//         current_colors: colors
//       });

//       if (response.success) {
//         setColors(response.color_palette);
//         setAiModificationPrompt('');
//         setShowAIModificationModal(false);
        
//         // Refresh modification status to get updated counts
//         await fetchModificationStatus();
        
//         // Show success message with credit information
//         if (response.credits_deducted && response.remaining_credits !== undefined) {
//           console.log(`AI modification successful! ${response.credits_deducted} credits deducted. Remaining credits: ${response.remaining_credits}`);
//         }
//       }
//     } catch (err) {
//       console.error('AI modification error:', err);
      
//       // Handle credit-related errors
//       if (err.response?.data?.requires_credits) {
//         if (err.response.data.error.includes('Insufficient credits')) {
//           alert(`Insufficient credits. You need ${err.response.data.required_credits} credits for AI modification. Current balance: ${err.response.data.current_credits} credits.`);
//         } else if (err.response.data.error.includes('Maximum AI modifications')) {
//           alert('Maximum AI modifications reached. Please purchase more credits to continue.');
//         }
//         await fetchModificationStatus();
//       } else {
//         alert(err.response?.data?.error || 'Failed to submit AI modification request.');
//       }
//     } finally {
//       setAiModificationLoading(false);
//     }
//   };

//   const handleManualEdit = () => {
//     setEditedContent([...colors]);
//     setShowManualEditModal(true);
//   };

//   const updateEditedColor = (index, newColor) => {
//     const updatedColors = [...editedContent];
//     updatedColors[index] = newColor;
//     setEditedContent(updatedColors);
//   };

//   const addEditedColor = () => {
//     const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
//     setEditedContent([...editedContent, newColor]);
//   };

//   const removeEditedColor = (index) => {
//     if (editedContent.length > 2) {
//       setEditedContent(editedContent.filter((_, i) => i !== index));
//     }
//   };

//   const saveManualEdit = async () => {
//     if (!editedContent || editedContent.length === 0) return;

//     setManualEditLoading(true);
//     try {
//       const userId = localStorage.getItem('bizwizuser_id');
//       const formDataId = localStorage.getItem('bizwiz_form_data_id');
      
//       const response = await ApiService('/manually-edit-design', 'POST', {
//         user_id: userId,
//         form_data_id: formDataId,
//         edited_colors: editedContent
//       });

//       if (response.success) {
//         setColors(editedContent);
//         setShowManualEditModal(false);
//         fetchModificationStatus();
//       }
//     } catch (err) {
//       alert('Failed to save manual edit. Please try again.');
//     } finally {
//       setManualEditLoading(false);
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8" role="main" aria-label="Design Selection">
//         <div className="w-full max-w-7xl space-y-4 mb-8">
//           <TopHeaderBar/>
//           <LevelHeader levelno='Level 3' heading='CRÉATEUR'/>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="w-full max-w-7xl bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl shadow-2xl border border-bizzwiz-border p-6 sm:p-8 md:p-10"
//         >
//           <div className="text-center mb-12">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-gradient-bizzwiz mb-4"
//             >
//               Design Your Perfect Palette
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="text-bizzwiz-text-alt text-base sm:text-lg max-w-2xl mx-auto font-montserrat"
//             >
//               Create stunning color combinations for your brand and design projects
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-2 bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6 md:p-8"
//               role="region"
//               aria-label="Color Palette Designer"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-xl border border-bizzwiz-accent-primary/30 shadow-[0_0_15px_rgba(159,67,242,0.3)]">
//                   <Palette className="w-6 h-6 text-bizzwiz-accent-primary" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">Color Palette Studio</h2>
//                   <p className="text-sm text-bizzwiz-text-alt font-montserrat">Design and customize your perfect color scheme</p>
//                 </div>
//               </div>

//               {/* Current Palette Display */}
//               <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">Your Current Palette</h3>
//                   <div className="flex gap-2">
//                     <Button
//                       onClick={generateColors}
//                       size="sm"
//                       disabled={loading}
//                       className="bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat"
//                     >
//                       {loading ? (
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
//                       ) : (
//                         <>
//                           <RefreshCw className="w-4 h-4" />
//                           Generate
//                         </>
//                       )}
//                     </Button>
//                     <Button
//                       onClick={addColor}
//                       size="sm"
//                       className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-4 mb-6">
//                   {colors.map((color, index) => (
//                     <div key={index} className="group relative">
//                       <div
//                         className="w-20 h-20 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 border border-bizzwiz-border"
//                         style={{ backgroundColor: color }}
//                         onClick={() => copyColor(color)}
//                       />
//                       <div className="mt-2 text-center">
//                         <input
//                           type="text"
//                           value={color.toUpperCase()}
//                           onChange={(e) => updateColor(index, e.target.value)}
//                           className="w-20 text-xs text-center bg-transparent font-mono font-semibold text-bizzwiz-text border border-bizzwiz-border rounded px-1"
//                         />
//                       </div>
//                       {colors.length > 2 && (
//                         <button
//                           onClick={() => removeColor(index)}
//                           className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center border border-red-400/30"
//                         >
//                           ×
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Color Input Controls */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                   {colors.map((color, index) => (
//                     <div key={index} className="space-y-2">
//                       <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat">
//                         Color {index + 1}
//                       </label>
//                       <input
//                         type="color"
//                         value={color}
//                         onChange={(e) => updateColor(index, e.target.value)}
//                         className="w-full h-12 border-2 border-bizzwiz-border rounded-xl cursor-pointer bg-transparent"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Preset Palettes */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat mb-4">Popular Color Palettes</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
//                   {presetPalettes.map((palette, index) => (
//                     <div
//                       key={index}
//                       onClick={() => loadPresetPalette(palette, index)}
//                       className={cn(
//                         "cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 border",
//                         selectedPreset === index ? "border-bizzwiz-accent-primary shadow-[0_0_15px_rgba(159,67,242,0.4)]" : "border-bizzwiz-border"
//                       )}
//                     >
//                       <div className="flex h-16">
//                         {palette.map((color, colorIndex) => (
//                           <div
//                             key={colorIndex}
//                             className="flex-1"
//                             style={{ backgroundColor: color }}
//                           />
//                         ))}
//                       </div>
//                       <div className="p-2 bg-bizzwiz-card-secondary">
//                         <div className="flex justify-between items-center">
//                           <div className="flex gap-1">
//                             {palette.map((color, colorIndex) => (
//                               <span key={colorIndex} className="text-xs font-mono text-bizzwiz-text-alt">
//                                 {color.slice(1, 4)}
//                               </span>
//                             ))}
//                           </div>
//                           <Heart className="w-4 h-4 text-bizzwiz-text-alt" />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="space-y-6"
//               role="complementary"
//               aria-label="Design Actions"
//             >
//               <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
//                     <CheckCircle className="w-5 h-5 text-green-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">Next Step</h3>
//                 </div>
//                 <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
//                   Proceed to the next step in your design process
//                 </p>
//                 <Button
//                   onClick={handleValidation}
//                   disabled={isValidated}
//                   className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
//                 >
//                   <CheckCircle className="w-4 h-4" />
//                   {isValidated ? 'Completed' : 'Next Step'}
//                 </Button>
//               </div>

//               <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
//                     <MessageSquare className="w-5 h-5 text-blue-400" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">AI Modification</h3>
//                 </div>
                
//                 <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
//                   {modificationStatus.remaining_ai_modifications === 0 
//                     ? 'Maximum AI modifications reached. Purchase more credits to continue.'
//                     : `You have ${modificationStatus.remaining_ai_modifications} AI modification${modificationStatus.remaining_ai_modifications !== 1 ? 's' : ''} remaining.`
//                   }
//                 </p>
                
//                 {modificationStatus.remaining_ai_modifications === 0 ? (
//                   <div className="space-y-3">
//                     <Button
//                       onClick={() => navigate('/purchase')}
//                       className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
//                       aria-label="Purchase credits to continue AI modifications"
//                     >
//                       <span>Purchase Credits</span>
//                     </Button>
//                   </div>
//                 ) : !modificationStatus.can_use_ai ? (
//                   <div className="space-y-3">
//                     <div className="text-sm text-red-400 text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
//                       Insufficient credits. You need 3 credits for AI modification.
//                     </div>
//                     <Button
//                       onClick={() => navigate('/purchase')}
//                       className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
//                       aria-label="Purchase credits to enable AI modifications"
//                     >
//                       <span>Purchase Credits</span>
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button
//                     onClick={handleAIModification}
//                     className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-blue-500/30"
//                     aria-label="Request AI modification of color palette"
//                   >
//                     <MessageSquare className="w-4 h-4" />
//                     AI Modify Palette
//                   </Button>
//                 )}
//               </div>

//               <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-lg border border-bizzwiz-accent-primary/30 shadow-[0_0_10px_rgba(159,67,242,0.3)]">
//                     <Edit3 className="w-5 h-5 text-bizzwiz-accent-primary" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">Manual Edit</h3>
//                 </div>
//                 <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
//                   Manually edit your color palette values directly
//                 </p>
//                 <Button
//                   onClick={handleManualEdit}
//                   className="w-full bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary font-bold py-3 rounded-xl hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-bizzwiz-accent-primary/30"
//                   aria-label="Manually edit color palette"
//                 >
//                   <Edit3 className="w-4 h-4" />
//                   Edit Palette
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
//         <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">
//               Proceed to Next Step
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
//               Are you satisfied with your current color palette selection?
//               <br /><br />
//               <strong className="text-orange-400">Note:</strong> Once confirmed, you'll proceed to the font selection step.
//               <br /><br />
//               You can always come back to modify your palette if needed.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction 
//               onClick={confirmValidation}
//               className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
//             >
//               Proceed to Fonts
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {showAIModificationModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(159,67,242,0.3)]"
//             role="dialog"
//             aria-labelledby="ai-modification-title"
//             aria-describedby="ai-modification-description"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h3 id="ai-modification-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">AI Modify Color Palette</h3>
//               <Button
//                 onClick={() => setShowAIModificationModal(false)}
//                 variant="ghost"
//                 className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
//                 aria-label="Close modal"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">
//                   Describe how you'd like to modify your color palette
//                 </label>
//                 <Textarea
//                   value={aiModificationPrompt}
//                   onChange={(e) => setAiModificationPrompt(e.target.value)}
//                   placeholder="e.g., 'Make the colors more vibrant', 'Add warmer tones', 'Create a more professional look'..."
//                   className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
//                   rows={4}
//                   aria-label="AI modification prompt input"
//                 />
//               </div>
              
//               <div className="flex gap-3">
//                 <Button
//                   onClick={() => setShowAIModificationModal(false)}
//                   className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
//                   aria-label="Cancel"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={submitAIModification}
//                   disabled={!aiModificationPrompt.trim() || aiModificationLoading}
//                   className="flex-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat disabled:opacity-50"
//                   aria-label="Submit AI modification"
//                 >
//                   {aiModificationLoading ? (
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
//                   ) : (
//                     'Submit Modification'
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {showManualEditModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl shadow-[0_0_30px_rgba(159,67,242,0.3)]"
//             role="dialog"
//             aria-labelledby="manual-edit-title"
//             aria-describedby="manual-edit-description"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <h3 id="manual-edit-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">Manual Edit Color Palette</h3>
//               <Button
//                 onClick={() => setShowManualEditModal(false)}
//                 variant="ghost"
//                 className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
//                 aria-label="Close modal"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-4">
//                   Edit your color palette
//                 </label>
                
//                 {/* Color editing interface */}
//                 <div className="space-y-6">
//                   {/* Color grid display */}
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                     {editedContent.map((color, index) => (
//                       <div key={index} className="group relative">
//                         <div className="text-center mb-2">
//                           <span className="text-sm font-medium text-white font-montserrat">
//                             Color {index + 1}
//                           </span>
//                         </div>
//                         <input
//                           type="color"
//                           value={color}
//                           onChange={(e) => updateEditedColor(index, e.target.value)}
//                           className="w-full h-24 rounded-xl shadow-lg border-2 border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 cursor-pointer"
//                           style={{ backgroundColor: color }}
//                         />
//                         <div className="text-center mt-2">
//                           <span className="text-xs font-mono text-bizzwiz-text-alt">
//                             {color.toUpperCase()}
//                           </span>
//                         </div>
//                         {editedContent.length > 2 && (
//                           <button
//                             onClick={() => removeEditedColor(index)}
//                             className="absolute -top-1 -right-1 w-6 h-6 bg-red-500/90 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm flex items-center justify-center border border-red-400/30 hover:bg-red-500"
//                           >
//                             ×
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
                  
//                   <Button
//                     onClick={addEditedColor}
//                     size="sm"
//                     className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Color
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <Button
//                   onClick={() => setShowManualEditModal(false)}
//                   className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
//                   aria-label="Cancel"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={saveManualEdit}
//                   disabled={!editedContent || editedContent.length === 0 || manualEditLoading}
//                   className="flex-1 bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] font-montserrat disabled:opacity-50"
//                   aria-label="Save manual edit"
//                 >
//                   {manualEditLoading ? (
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bizzwiz-accent-primary"></div>
//                   ) : (
//                     'Save Changes'
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(40px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out;
//         }
//         .hover\:scale-102:hover {
//           transform: scale(1.02);
//         }
//         .hover\:scale-105:hover {
//           transform: scale(1.05);
//         }
//         .active\:scale-95:active {
//           transform: scale(0.95);
//         }
//         .font-montserrat {
//           font-family: 'Montserrat', sans-serif;
//         }
//       `}</style>
//     </ErrorBoundary>
//   );
// };

// export default DesignSelection;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, CheckCircle, RefreshCw, Heart, Plus, Copy, Trash2, Edit3, MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFormContext } from '@/contexts/FormContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import LevelHeader from '@/components/multiStepForm/LevelHeader';
import TopHeaderBar from '@/components/multiStepForm/TopHeaderBar';
import ApiService from '@/apiService';
import { useToast } from '@/components/ui/use-toast';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-2xl text-center text-gradient-bizzwiz font-montserrat">
          Something went wrong. Please try again later.
        </h1>
      );
    }
    return this.props.children;
  }
}

const DesignSelection = ({ setCurrentView }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  const [colors, setColors] = useState(formData.colorPalette || ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57']);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAIModificationModal, setShowAIModificationModal] = useState(false);
  const [aiModificationPrompt, setAiModificationPrompt] = useState('');
  const [aiModificationLoading, setAiModificationLoading] = useState(false);
  const [showManualEditModal, setShowManualEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [manualEditLoading, setManualEditLoading] = useState(false);
  const [modificationStatus, setModificationStatus] = useState({
    ai_modification_count: 0,
    remaining_ai_modifications: 2,
    manual_edit_count: 0,
    is_validated: false,
    current_credits: 0,
    can_use_ai: true,
  });
  const chatEndRef = useRef(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };

  // Determine if the language is RTL (e.g., Arabic)
  const isRtl = i18n.language === 'ar';

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
    ['#6D2C91', '#A663CC', '#4D4C7D', '#827397'],
  ];

  // Color generation algorithms
  const colorGenerators = {
    monochromatic: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)),
        hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 15)),
        baseColor,
        hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 15)),
        hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
      ];
    },
    complementary: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      const complementHue = (hsl.h + 180) % 360;
      return [
        baseColor,
        hslToHex(complementHue, hsl.s, hsl.l),
        hslToHex(hsl.h, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20)),
        hslToHex(complementHue, Math.max(20, hsl.s - 20), Math.min(90, hsl.l + 20)),
      ];
    },
    triadic: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        baseColor,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
        hslToHex(hsl.h, Math.max(20, hsl.s - 30), Math.min(90, hsl.l + 25)),
      ];
    },
    analogous: (baseColor) => {
      const hsl = hexToHsl(baseColor);
      return [
        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
        baseColor,
        hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
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
        hslToHex((baseHue + 120) % 360, saturation - 15, lightness - 5),
      ];
    },
  };

  // Color conversion utilities
  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
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
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // Update formData when colors change
  useEffect(() => {
    updateFormData({ colorPalette: colors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  // Fetch modification status on component mount
  useEffect(() => {
    fetchModificationStatus();
  }, []);

  const fetchModificationStatus = async () => {
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      const response = await ApiService('/design-modification-status', 'GET', {
        user_id: userId,
        form_data_id: formDataId,
      });

      setModificationStatus(response);
      setIsValidated(response.is_validated);
      if (Array.isArray(response.color_palette) && response.color_palette.length > 0) {
        setColors(response.color_palette);
      }
    } catch (err) {
      // Handle error silently
    }
  };

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
    setLoading(true);
    setTimeout(() => {
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
      setLoading(false);
    }, 1000);
  };

  // Copy individual color
  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    try {
      if (toast) {
        toast({ title: t('design_selection.copy_color_alert', { color }) });
      }
    } catch (_) {}
  };

  const handleValidation = () => {
    setShowValidationDialog(true);
  };

  const confirmValidation = async () => {
    const userId = localStorage.getItem('bizwizuser_id');
    const formDataId = localStorage.getItem('bizwiz_form_data_id');
    const proceed = () => {
      setIsValidated(true);
      setShowValidationDialog(false);
      setTimeout(() => {
        if (typeof setCurrentView === 'function') {
          setCurrentView('font');
        } else if (navigate) {
          navigate('/font', { replace: false });
        }
      }, 600);
    };

    try {
      await ApiService('/validate-design', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        color_palette: colors,
      });
      fetchModificationStatus();
      proceed();
    } catch (err) {
      proceed();
    }
  };

  const handleAIModification = () => {
    setShowAIModificationModal(true);
  };

  const submitAIModification = async () => {
    if (!aiModificationPrompt.trim()) return;

    setAiModificationLoading(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      const response = await ApiService('/request-design-ai-modification', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        modification_prompt: aiModificationPrompt,
        current_colors: colors,
      });

      if (response.success) {
        setColors(response.color_palette);
        setAiModificationPrompt('');
        setShowAIModificationModal(false);

        await fetchModificationStatus();

        if (response.credits_deducted && response.remaining_credits !== undefined && toast) {
          toast({
            title: t('design_selection.ai_modification_success', {
              credits_deducted: response.credits_deducted,
              remaining_credits: response.remaining_credits,
            }),
          });
        }
      }
    } catch (err) {
      if (err.response?.data?.requires_credits) {
        if (err.response.data.error.includes('Insufficient credits')) {
          if (toast) {
            toast({
              title: t('design_selection.ai_modification_error_insufficient_credits', {
                required_credits: err.response.data.required_credits,
                current_credits: err.response.data.current_credits,
              }),
            });
          }
        } else if (err.response.data.error.includes('Maximum AI modifications')) {
          if (toast) {
            toast({ title: t('design_selection.ai_modification_error_max_reached') });
          }
        }
        await fetchModificationStatus();
      } else {
        if (toast) {
          toast({ title: t('design_selection.ai_modification_error_generic') });
        }
      }
    } finally {
      setAiModificationLoading(false);
    }
  };

  const handleManualEdit = () => {
    setEditedContent([...colors]);
    setShowManualEditModal(true);
  };

  const updateEditedColor = (index, newColor) => {
    const updatedColors = [...editedContent];
    updatedColors[index] = newColor;
    setEditedContent(updatedColors);
  };

  const addEditedColor = () => {
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setEditedContent([...editedContent, newColor]);
  };

  const removeEditedColor = (index) => {
    if (editedContent.length > 2) {
      setEditedContent(editedContent.filter((_, i) => i !== index));
    }
  };

  const saveManualEdit = async () => {
    if (!editedContent || editedContent.length === 0) return;

    setManualEditLoading(true);
    try {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');

      const response = await ApiService('/manually-edit-design', 'POST', {
        user_id: userId,
        form_data_id: formDataId,
        edited_colors: editedContent,
      });

      if (response.success) {
        setColors(editedContent);
        setShowManualEditModal(false);
        fetchModificationStatus();
      }
    } catch (err) {
      if (toast) {
        toast({ title: t('design_selection.manual_edit_error') });
      }
    } finally {
      setManualEditLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div
        className={`min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ${isRtl ? 'rtl' : ''}`}
        role="main"
        aria-label={t('design_selection.level_header')}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-full max-w-7xl space-y-4 mb-8">
          <TopHeaderBar />
          <LevelHeader levelno="Level 3" heading={t('design_selection.level_header')} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl shadow-2xl border border-bizzwiz-border p-6 sm:p-8 md:p-10"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-gradient-bizzwiz mb-4"
            >
              {t('design_selection.main_heading')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-bizzwiz-text-alt text-base sm:text-lg max-w-2xl mx-auto font-montserrat"
            >
              {t('design_selection.main_description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6 md:p-8"
              role="region"
              aria-label={t('design_selection.color_palette_studio')}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-xl border border-bizzwiz-accent-primary/30 shadow-[0_0_15px_rgba(159,67,242,0.3)]">
                  <Palette className="w-6 h-6 text-bizzwiz-accent-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">{t('design_selection.color_palette_studio')}</h2>
                  <p className="text-sm text-bizzwiz-text-alt font-montserrat">{t('design_selection.color_palette_description')}</p>
                </div>
              </div>

              {/* Current Palette Display */}
              <div className="bg-bizzwiz-card-secondary/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(159,67,242,0.2)]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('design_selection.current_palette')}</h3>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button
                      onClick={generateColors}
                      size="sm"
                      disabled={loading}
                      className="w-full sm:w-auto bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat"
                      aria-label={t('design_selection.generate_button')}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          {t('design_selection.generate_button')}
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={addColor}
                      size="sm"
                      className="w-full sm:w-auto bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
                      aria-label={t('design_selection.add_button')}
                    >
                      <Plus className="w-4 h-4" />
                      {t('design_selection.add_button')}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  {colors.map((color, index) => (
                    <div key={index} className="group relative overflow-visible">
                      <div
                        className="w-20 h-20 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 border border-bizzwiz-border"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColor(color)}
                      />
                      <div className="mt-2 text-center">
                        <input
                          type="text"
                          value={color.toUpperCase()}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="w-20 text-xs text-center bg-transparent font-mono font-semibold text-bizzwiz-text border border-bizzwiz-border rounded px-1"
                          aria-label={t('design_selection.color_label', { index: index + 1 })}
                        />
                      </div>
                      {colors.length > 2 && (
                        <button
                          onClick={() => removeColor(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center border border-red-400/30"
                          aria-label="Remove color"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Color Input Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {colors.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat">
                        {t('design_selection.color_label', { index: index + 1 })}
                      </label>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-full h-12 border-2 border-bizzwiz-border rounded-xl cursor-pointer bg-transparent"
                        aria-label={t('design_selection.color_label', { index: index + 1 })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Preset Palettes */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat mb-4">{t('design_selection.popular_palettes')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                  {presetPalettes.map((palette, index) => (
                    <div
                      key={index}
                      onClick={() => loadPresetPalette(palette, index)}
                      className={cn(
                        'cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 border',
                        selectedPreset === index ? 'border-bizzwiz-accent-primary shadow-[0_0_15px_rgba(159,67,242,0.4)]' : 'border-bizzwiz-border'
                      )}
                    >
                      <div className="flex h-16">
                        {palette.map((color, colorIndex) => (
                          <div key={colorIndex} className="flex-1" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="p-2 bg-bizzwiz-card-secondary">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {palette.map((color, colorIndex) => (
                              <span key={colorIndex} className="text-xs font-mono text-bizzwiz-text-alt">
                                {color.slice(1, 4)}
                              </span>
                            ))}
                          </div>
                          <Heart className="w-4 h-4 text-bizzwiz-text-alt" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
              role="complementary"
              aria-label={t('design_selection.next_step_section')}
            >
              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('design_selection.next_step_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">{t('design_selection.next_step_description')}</p>
                <Button
                  onClick={handleValidation}
                  disabled={isValidated}
                  className="w-full bg-green-600/20 backdrop-blur-sm text-green-300 font-bold py-3 rounded-xl hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 font-montserrat border border-green-500/30"
                  aria-label={isValidated ? t('design_selection.next_step_button_validated') : t('design_selection.next_step_button')}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isValidated ? t('design_selection.next_step_button_validated') : t('design_selection.next_step_button')}
                </Button>
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('design_selection.ai_modification_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">
                  {modificationStatus.remaining_ai_modifications === 0
                    ? t('design_selection.no_modifications')
                    : t(`design_selection.ai_modifications_remaining${modificationStatus.remaining_ai_modifications !== 1 ? '_plural' : ''}`, { count: modificationStatus.remaining_ai_modifications })}
                </p>
                {modificationStatus.remaining_ai_modifications === 0 ? (
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('design_selection.purchase_credits_button')}
                    >
                      {t('design_selection.purchase_credits_button')}
                    </Button>
                  </div>
                ) : !modificationStatus.can_use_ai ? (
                  <div className="space-y-3">
                    <div className="text-sm text-red-400 text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      {t('design_selection.insufficient_credits', { required_credits: 3 })}
                    </div>
                    <Button
                      onClick={() => navigate('/purchase')}
                      className="w-full bg-orange-600/20 backdrop-blur-sm text-orange-300 font-bold py-3 rounded-xl hover:bg-orange-600/30 hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-orange-500/30"
                      aria-label={t('design_selection.purchase_credits_button')}
                    >
                      {t('design_selection.purchase_credits_button')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAIModification}
                    className="w-full bg-blue-600/20 backdrop-blur-sm text-blue-300 font-bold py-3 rounded-xl hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-blue-500/30"
                    aria-label={t('design_selection.ai_modification_section')}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t('design_selection.ai_modification_section')}
                  </Button>
                )}
              </div>

              <div className="bg-bizzwiz-card-secondary backdrop-blur-2xl rounded-3xl shadow-lg border border-bizzwiz-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-bizzwiz-accent-primary/20 backdrop-blur-sm rounded-lg border border-bizzwiz-accent-primary/30 shadow-[0_0_10px_rgba(159,67,242,0.3)]">
                    <Edit3 className="w-5 h-5 text-bizzwiz-accent-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gradient-bizzwiz font-montserrat">{t('design_selection.manual_edit_section')}</h3>
                </div>
                <p className="text-sm text-bizzwiz-text-alt font-montserrat mb-4">{t('design_selection.manual_edit_description')}</p>
                <Button
                  onClick={handleManualEdit}
                  className="w-full bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary font-bold py-3 rounded-xl hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] transition-all duration-300 flex items-center justify-center gap-3 font-montserrat border border-bizzwiz-accent-primary/30"
                  aria-label={t('design_selection.edit_palette_button')}
                >
                  <Edit3 className="w-4 h-4" />
                  {t('design_selection.edit_palette_button')}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AlertDialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
          <AlertDialogContent className="bg-bizzwiz-card-background backdrop-blur-3xl border border-bizzwiz-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gradient-bizzwiz font-montserrat">{t('design_selection.validation_dialog_title')}</AlertDialogTitle>
              <AlertDialogDescription className="text-bizzwiz-text-alt font-montserrat">
                {t('design_selection.validation_dialog_description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat">
                {t('design_selection.validation_dialog_cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmValidation}
                className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
              >
                {t('design_selection.validation_dialog_confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {showAIModificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-[0_0_30px_rgba(159,67,242,0.3)]"
              role="dialog"
              aria-labelledby="ai-modification-title"
              aria-describedby="ai-modification-description"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 id="ai-modification-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">
                  {t('design_selection.ai_modification_modal_title')}
                </h3>
                <Button
                  onClick={() => setShowAIModificationModal(false)}
                  variant="ghost"
                  className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                  aria-label={t('design_selection.ai_modification_cancel')}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-2">
                    {t('design_selection.ai_modification_modal_description')}
                  </label>
                  <Textarea
                    value={aiModificationPrompt}
                    onChange={(e) => setAiModificationPrompt(e.target.value)}
                    placeholder={t('design_selection.ai_modification_placeholder')}
                    className="w-full bg-bizzwiz-card-secondary backdrop-blur-sm border border-bizzwiz-border text-bizzwiz-text placeholder-bizzwiz-text-alt/60 rounded-xl p-3 font-montserrat focus:border-bizzwiz-accent-primary/50 focus:shadow-[0_0_10px_rgba(159,67,242,0.2)]"
                    rows={4}
                    aria-label={t('design_selection.ai_modification_modal_description')}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowAIModificationModal(false)}
                    className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                    aria-label={t('design_selection.ai_modification_cancel')}
                  >
                    {t('design_selection.ai_modification_cancel')}
                  </Button>
                  <Button
                    onClick={submitAIModification}
                    disabled={!aiModificationPrompt.trim() || aiModificationLoading}
                    className="flex-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-montserrat disabled:opacity-50"
                    aria-label={t('design_selection.ai_modification_submit')}
                  >
                    {aiModificationLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                    ) : (
                      t('design_selection.ai_modification_submit')
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showManualEditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl border border-bizzwiz-border p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-[0_0_30px_rgba(159,67,242,0.3)]"
              role="dialog"
              aria-labelledby="manual-edit-title"
              aria-describedby="manual-edit-description"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 id="manual-edit-title" className="text-xl font-semibold text-gradient-bizzwiz font-montserrat">
                  {t('design_selection.manual_edit_modal_title')}
                </h3>
                <Button
                  onClick={() => setShowManualEditModal(false)}
                  variant="ghost"
                  className="p-2 hover:bg-bizzwiz-card-secondary text-bizzwiz-text"
                  aria-label={t('design_selection.manual_edit_cancel')}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-bizzwiz-text-alt font-montserrat mb-4">
                    {t('design_selection.manual_edit_modal_description')}
                  </label>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {editedContent.map((color, index) => (
                        <div key={index} className="group relative overflow-visible">
                          <div className="text-center mb-2">
                            <span className="text-sm font-medium text-white font-montserrat">
                              {t('design_selection.color_label', { index: index + 1 })}
                            </span>
                          </div>
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => updateEditedColor(index, e.target.value)}
                            className="w-full h-24 rounded-xl shadow-lg border-2 border-bizzwiz-border hover:border-bizzwiz-accent-primary/50 transition-all duration-300 cursor-pointer"
                            style={{ backgroundColor: color }}
                            aria-label={t('design_selection.color_label', { index: index + 1 })}
                          />
                          <div className="text-center mt-2">
                            <span className="text-xs font-mono text-bizzwiz-text-alt">{color.toUpperCase()}</span>
                          </div>
                          {editedContent.length > 2 && (
                            <button
                              onClick={() => removeEditedColor(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500/90 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm flex items-center justify-center border border-red-400/30 hover:bg-red-500"
                              aria-label="Remove color"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={addEditedColor}
                      size="sm"
                      className="bg-green-600/20 backdrop-blur-sm text-green-300 border border-green-500/30 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] font-montserrat"
                      aria-label={t('design_selection.add_color_button')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t('design_selection.add_color_button')}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowManualEditModal(false)}
                    className="flex-1 bg-bizzwiz-card-secondary backdrop-blur-sm text-bizzwiz-text border border-bizzwiz-border hover:bg-bizzwiz-card-secondary/80 font-montserrat"
                    aria-label={t('design_selection.manual_edit_cancel')}
                  >
                    {t('design_selection.manual_edit_cancel')}
                  </Button>
                  <Button
                    onClick={saveManualEdit}
                    disabled={!editedContent || editedContent.length === 0 || manualEditLoading}
                    className="flex-1 bg-bizzwiz-accent-primary/20 backdrop-blur-sm text-bizzwiz-accent-primary border border-bizzwiz-accent-primary/30 hover:bg-bizzwiz-accent-primary/30 hover:shadow-[0_0_15px_rgba(159,67,242,0.4)] font-montserrat disabled:opacity-50"
                    aria-label={t('design_selection.save_changes_button')}
                  >
                    {manualEditLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bizzwiz-accent-primary"></div>
                    ) : (
                      t('design_selection.save_changes_button')
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

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
          .hover\:scale-102:hover {
            transform: scale(1.02);
          }
          .hover\:scale-105:hover {
            transform: scale(1.05);
          }
          .active\:scale-95:active {
            transform: scale(0.95);
          }
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
          .rtl {
            direction: rtl;
          }
          .rtl .flex {
            flex-direction: row-reverse;
          }
          .rtl .text-left {
            text-align: right;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default DesignSelection;