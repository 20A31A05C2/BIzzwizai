// import React, { useEffect, useState } from 'react';
// import { FileText, ImageIcon, Quote, Download } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useTranslation } from 'react-i18next';
// import ApiService from '@/apiService';
// import { jsPDF } from 'jspdf';

// const AiPage = () => {
//   const { t } = useTranslation();
//   const [businessPlan, setBusinessPlan] = useState('');
//   const [logoUrl, setLogoUrl] = useState('');
//   const [slogans, setSlogans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFinalizedData = async () => {
//       const userId = localStorage.getItem('bizwizuser_id');
//       const formDataId = localStorage.getItem('bizwiz_form_data_id');
//       if (!userId || !formDataId) {
//         setError(t('aiPage.error.missingIds'));
//         setLoading(false);
//         return;
//       }

//       try {
//         // 1) Check business plan validation status
//         let businessPlanFetched = false;
//         try {
//           const bpStatus = await ApiService('/business-plan-modification-status', 'GET', { 
//             user_id: userId, 
//             form_data_id: formDataId 
//           });
//           if (bpStatus?.is_validated) {
//             // Fetch business plan only if validated
//             const bpResponse = await ApiService('/generate-business-plan', 'POST', { 
//               user_id: userId, 
//               form_data_id: formDataId 
//             });
//             if (bpResponse?.business_plan) {
//               setBusinessPlan(bpResponse.business_plan);
//               businessPlanFetched = true;
//             }
//           }
//         } catch (err) {
//           console.error('Business plan fetch error:', err);
//           // Continue to allow other sections to render
//         }

//         // 2) Check logo validation status
//         try {
//           const logoStatus = await ApiService('/logo-modification-status', 'GET', { 
//             user_id: userId, 
//             form_data_id: formDataId 
//           });
//           if (logoStatus?.is_logo_validated && logoStatus?.logo_url) {
//             setLogoUrl(logoStatus.logo_url);
//           }
//         } catch (err) {
//           console.error('Logo fetch error:', err);
//           // Continue to allow other sections to render
//         }

//         // 3) Fetch slogans only if they exist
//         try {
//           const slogansResponse = await ApiService('/generate-slogans', 'POST', { 
//             user_id: userId, 
//             form_data_id: formDataId, 
//             prompt: 'check' 
//           });
//           if (slogansResponse?.slogans) {
//             setSlogans(slogansResponse.slogans);
//           }
//         } catch (err) {
//           console.error('Slogans fetch error:', err);
//           // Continue to allow other sections to render
//         }

//         // Only set loading to false if no business plan was fetched or if both status checks are complete
//         if (!businessPlanFetched || (businessPlanFetched && logoUrl)) {
//           setLoading(false);
//         }
//       } catch (err) {
//         setError(err.message || t('aiPage.error.fetchFailed'));
//         setLoading(false);
//       }
//     };

//     fetchFinalizedData();
//   }, [t]);

//   const downloadBusinessPlan = () => {
//     if (!businessPlan) return;
//     const doc = new jsPDF();
//     doc.setFont('helvetica', 'normal');
//     doc.setFontSize(12);

//     // Add a title
//     doc.setFontSize(16);
//     doc.text(t('aiPage.businessPlan.header'), 10, 10);
//     doc.setFontSize(12);

//     // Split text into lines to handle pagination
//     const lines = doc.splitTextToSize(businessPlan, 190);

//     // Define page dimensions and margins (in mm, default unit)
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const marginTop = 20; // Starting y after title
//     const marginBottom = 10;
//     const marginLeft = 10;
//     const lineHeightFactor = 1.15; // Typical line spacing factor
//     const fontSize = 12; // In points
//     const lineHeight = (fontSize * lineHeightFactor) / 2.83464567; // Convert pt to mm

//     let y = marginTop; // Starting y position after title

//     lines.forEach((line) => {
//       if (y + lineHeight > pageHeight - marginBottom) {
//         doc.addPage();
//         y = marginTop;
//       }
//       doc.text(line, marginLeft, y);
//       y += lineHeight;
//     });

//     doc.save('business-plan.pdf');
//   };

//   const downloadLogo = () => {
//     if (!logoUrl) return;
//     const link = document.createElement('a');
//     link.href = logoUrl;
//     link.download = 'logo.png';
//     link.click();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <motion.h1 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-4xl font-bold text-center mb-12 font-montserrat"
//       >
//         {t('aiPage.title')}
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Business Plan Section */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white/10 p-6 rounded-xl"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <FileText className="w-6 h-6" />
//             <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.businessPlan.header')}</h2>
//           </div>
//           {businessPlan ? (
//             <>
//               <pre className="whitespace-pre-wrap text-sm overflow-y-auto max-h-64 mb-4 font-montserrat">{businessPlan}</pre>
//               <Button 
//                 onClick={downloadBusinessPlan} 
//                 className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
//                 aria-label={t('aiPage.businessPlan.downloadButton')}
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 {t('aiPage.businessPlan.downloadButton')}
//               </Button>
//             </>
//           ) : (
//             <p className="text-gray-300 font-montserrat">{t('aiPage.businessPlan.noData')}</p>
//           )}
//         </motion.div>

//         {/* Logo Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/10 p-6 rounded-xl"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <ImageIcon className="w-6 h-6" />
//             <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.logo.header')}</h2>
//           </div>
//           {logoUrl ? (
//             <>
//               <img 
//                 src={logoUrl} 
//                 alt={t('aiPage.logo.imageAlt')} 
//                 className="w-full max-h-64 object-contain mb-4" 
//               />
//               <Button 
//                 onClick={downloadLogo} 
//                 className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
//                 aria-label={t('aiPage.logo.downloadButton')}
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 {t('aiPage.logo.downloadButton')}
//               </Button>
//             </>
//           ) : (
//             <p className="text-gray-300 font-montserrat">{t('aiPage.logo.noData')}</p>
//           )}
//         </motion.div>

//         {/* Slogans Section */}
//         <motion.div 
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white/10 p-6 rounded-xl"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <Quote className="w-6 h-6" />
//             <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.slogans.header')}</h2>
//           </div>
//           {slogans.length > 0 ? (
//             <ul className="space-y-2">
//               {slogans.map((slogan, index) => (
//                 <li key={index} className="text-sm border-b border-white/20 pb-2 font-montserrat">{slogan}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-300 font-montserrat">{t('aiPage.slogans.noData')}</p>
//           )}
//         </motion.div>
//       </div>

//       <style>{`
//         .font-montserrat { font-family: 'Montserrat', sans-serif; }
//       `}</style>
//     </div>
//   );
// };

// export default AiPage;

import React, { useEffect, useState } from 'react';
import { FileText, ImageIcon, Quote, Palette, Type, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import { jsPDF } from 'jspdf';

const fonts = [
  { id: '1', name: 'Roboto', family: 'Roboto, sans-serif', category: 'Sans Serif', popularity: 'Most Popular' },
  { id: '2', name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'Sans Serif', popularity: 'Popular' },
  { id: '3', name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'Sans Serif', popularity: 'Trending' },
  { id: '4', name: 'Lato', family: 'Lato, sans-serif', category: 'Sans Serif', popularity: 'Popular' },
  { id: '5', name: 'Playfair Display', family: 'Playfair Display, serif', category: 'Serif', popularity: 'Elegant' },
  { id: '6', name: 'Raleway', family: 'Raleway, sans-serif', category: 'Sans Serif', popularity: 'Modern' },
  { id: '7', name: 'Merriweather', family: 'Merriweather, serif', category: 'Serif', popularity: 'Readable' },
  { id: '8', name: 'Poppins', family: 'Poppins, sans-serif', category: 'Sans Serif', popularity: 'Trending' },
  { id: '9', name: 'Nunito', family: 'Nunito, sans-serif', category: 'Sans Serif', popularity: 'Friendly' },
  { id: '10', name: 'Oswald', family: 'Oswald, sans-serif', category: 'Sans Serif', popularity: 'Bold' },
  { id: '11', name: 'Orbitron', family: 'Orbitron, sans-serif', category: 'Futuristic', popularity: 'Unique' },
  { id: '12', name: 'Exo 2', family: 'Exo 2, sans-serif', category: 'Futuristic', popularity: 'Tech' },
  { id: '13', name: 'Bebas Neue', family: 'Bebas Neue, sans-serif', category: 'Display', popularity: 'Impact' },
  { id: '14', name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'Monospace', popularity: 'Code' },
  { id: '15', name: 'Inter', family: 'Inter, sans-serif', category: 'Sans Serif', popularity: 'UI Design' },
  { id: '16', name: 'Rubik', family: 'Rubik, sans-serif', category: 'Sans Serif', popularity: 'Rounded' },
  { id: '17', name: 'Cinzel', family: 'Cinzel, serif', category: 'Serif', popularity: 'Classical' },
  { id: '18', name: 'Teko', family: 'Teko, sans-serif', category: 'Condensed', popularity: 'Compact' },
];

const AiPage = () => {
  const { t } = useTranslation();
  const [businessPlan, setBusinessPlan] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [slogans, setSlogans] = useState([]);
  const [colorPalette, setColorPalette] = useState([]);
  const [selectedFont, setSelectedFont] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinalizedData = async () => {
      const userId = localStorage.getItem('bizwizuser_id');
      const formDataId = localStorage.getItem('bizwiz_form_data_id');
      if (!userId || !formDataId) {
        setError(t('aiPage.error.missingIds'));
        setLoading(false);
        return;
      }

      try {
        // 1) Business Plan: Fetch finalized business plan without generating
        try {
          const bpStatus = await ApiService('/business-plan-modification-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (bpStatus?.is_validated && bpStatus?.business_plan) {
            setBusinessPlan(bpStatus.business_plan);
          }
        } catch (err) {
          console.error('Business plan fetch error:', err);
        }

        // 2) Logo: Check status and set only if validated
        try {
          const logoStatus = await ApiService('/logo-modification-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (logoStatus?.is_logo_validated && logoStatus?.logo_url) {
            setLogoUrl(logoStatus.logo_url);
          }
        } catch (err) {
          console.error('Logo fetch error:', err);
        }

        // 3) Slogans: Check status and set only if validated
        try {
          const slogansStatus = await ApiService('/slogans-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (slogansStatus?.is_slogans_validated && slogansStatus?.slogans) {
            setSlogans(slogansStatus.slogans);
          }
        } catch (err) {
          console.error('Slogans fetch error:', err);
        }

        // 4) Design (Color Palette): Check status and set only if validated
        try {
          const designStatus = await ApiService('/design-modification-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (designStatus?.is_validated && designStatus?.color_palette) {
            setColorPalette(designStatus.color_palette);
          }
        } catch (err) {
          console.error('Design fetch error:', err);
        }

        // 5) Font: Check status and set only if validated
        try {
          const fontStatus = await ApiService('/font-selection-status', 'GET', { 
            user_id: userId, 
            form_data_id: formDataId 
          });
          if (fontStatus?.is_validated && fontStatus?.font_selection) {
            setSelectedFont(fontStatus.font_selection);
          }
        } catch (err) {
          console.error('Font fetch error:', err);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || t('aiPage.error.fetchFailed'));
        setLoading(false);
      }
    };

    fetchFinalizedData();
  }, [t]);

  useEffect(() => {
    if (selectedFont) {
      const fontObj = fonts.find(f => f.name === selectedFont);
      if (fontObj) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontObj.name.replace(' ', '+')}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }
  }, [selectedFont]);

  const downloadBusinessPlan = () => {
    if (!businessPlan) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.setFontSize(16);
    doc.text(t('aiPage.businessPlan.header'), 10, 10);
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(businessPlan, 190);
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginTop = 20;
    const marginBottom = 10;
    const marginLeft = 10;
    const lineHeightFactor = 1.15;
    const fontSize = 12;
    const lineHeight = (fontSize * lineHeightFactor) / 2.83464567;

    let y = marginTop;

    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - marginBottom) {
        doc.addPage();
        y = marginTop;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    });

    doc.save('business-plan.pdf');
  };

  const downloadLogo = () => {
    if (!logoUrl) return;
    const link = document.createElement('a');
    link.href = logoUrl;
    link.download = 'logo.png';
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 font-montserrat"
      >
        {t('aiPage.title')}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Business Plan Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.businessPlan.header')}</h2>
          </div>
          {businessPlan ? (
            <>
              <pre className="whitespace-pre-wrap text-sm overflow-y-auto max-h-64 mb-4 font-montserrat">{businessPlan}</pre>
              <Button 
                onClick={downloadBusinessPlan} 
                className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
                aria-label={t('aiPage.businessPlan.downloadButton')}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('aiPage.businessPlan.downloadButton')}
              </Button>
            </>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.businessPlan.noData')}</p>
          )}
        </motion.div>

        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.logo.header')}</h2>
          </div>
          {logoUrl ? (
            <>
              <img 
                src={logoUrl} 
                alt={t('aiPage.logo.imageAlt')} 
                className="w-full max-h-64 object-contain mb-4" 
              />
              <Button 
                onClick={downloadLogo} 
                className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-montserrat"
                aria-label={t('aiPage.logo.downloadButton')}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('aiPage.logo.downloadButton')}
              </Button>
            </>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.logo.noData')}</p>
          )}
        </motion.div>

        {/* Slogans Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Quote className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">{t('aiPage.slogans.header')}</h2>
          </div>
          {slogans.length > 0 ? (
            <ul className="space-y-2">
              {slogans.map((slogan, index) => (
                <li key={index} className="text-sm border-b border-white/20 pb-2 font-montserrat">{slogan}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 font-montserrat">{t('aiPage.slogans.noData')}</p>
          )}
        </motion.div>

        {/* Color Palette Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">Color Palette</h2>
          </div>
          {colorPalette.length > 0 ? (
            <div className="flex flex-wrap gap-4 mb-4">
              {colorPalette.map((color, index) => (
                <div 
                  key={index} 
                  className="w-20 h-20 rounded-md shadow-md" 
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  <div className="text-center text-xs mt-1 font-montserrat">{color}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 font-montserrat">No validated color palette available</p>
          )}
        </motion.div>

        {/* Font Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-6 h-6" />
            <h2 className="text-2xl font-semibold font-montserrat">Selected Font</h2>
          </div>
          {selectedFont ? (
            <div>
              <p className="text-lg mb-2 font-montserrat">{selectedFont}</p>
              <div 
                style={{ 
                  fontFamily: `${selectedFont}, sans-serif`, 
                  fontSize: '24px' 
                }}
                className="text-white"
              >
                Sample Text: The quick brown fox jumps over the lazy dog.
              </div>
            </div>
          ) : (
            <p className="text-gray-300 font-montserrat">No validated font available</p>
          )}
        </motion.div>
      </div>

      <style>{`
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default AiPage;
