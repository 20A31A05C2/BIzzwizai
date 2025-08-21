import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import ApiService from '@/apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom CSS for react-datepicker
const datePickerStyles = `
  .react-datepicker {
    background-color: #0A0B1A;
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 0.5rem;
    color: #F5F5F5;
    font-family: Satoshi, sans-serif;
  }
  .react-datepicker__header {
    background-color: #0A0B1A;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
    color: #F5F5F5;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #F5F5F5;
  }
  .react-datepicker__day {
    color: #A0AEC0;
  }
  .react-datepicker__day:hover {
    background-color: rgba(0, 255, 255, 0.1);
    border-radius: 0.25rem;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #9333EA;
    color: #0A0B1A;
    border-radius: 0.25rem;
  }
  .react-datepicker__time-container,
  .react-datepicker__time-box {
    background-color: #0A0B1A;
    border: 1px solid rgba(0, 255, 255, 0.2);
    color: #F5F5F5;
  }
  .react-datepicker__time-list-item {
    color: #A0AEC0;
  }
  .react-datepicker__time-list-item:hover {
    background-color: rgba(0, 255, 255, 0.1);
  }
  .react-datepicker__time-list-item--selected {
    background-color: #9333EA;
    color: #0A0B1A;
  }
  .react-datepicker__triangle {
    display: none;
  }
`;

const ScheduleMeetPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    figma_url: '',
    phone_number: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Filter out non-numeric characters for phone_number
    if (name === 'phone_number') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Keep only digits
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = date.toTimeString().slice(0, 5); // HH:MM
      setFormData((prev) => ({
        ...prev,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        appointment_date: '',
        appointment_time: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone_number || !formData.appointment_date || !formData.appointment_time) {
      toast({
        title: t('scheduleMeet.toast.error.title'),
        description: t('scheduleMeet.toast.error.requiredFields'),
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    const userId = localStorage.getItem('bizwizuser_id');
    const formDataId = localStorage.getItem('bizwiz_form_data_id');

    const updatedFormData = {
      ...formData,
      ...(userId && { user_id: parseInt(userId) }),
      ...(formDataId && { form_data_id: parseInt(formDataId) }),
    };

    try {
      const response = await ApiService('/appointments/public', 'POST', updatedFormData);

      if (response.success) {
        toast({
          title: t('scheduleMeet.toast.success.title'),
          description: t('scheduleMeet.toast.success.description'),
        });

        setFormData({
          name: '',
          figma_url: '',
          phone_number: '',
          appointment_date: '',
          appointment_time: '',
        });
        setSelectedDateTime(null);

        // ✅ Navigate to waiting page
        setTimeout(() => {
          navigate('/waiting-validation');
        }, 1000);
      } else {
        toast({
          title: t('scheduleMeet.toast.error.title'),
          description: response.message || t('scheduleMeet.toast.error.submitError'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: t('scheduleMeet.toast.error.title'),
        description: error.message || t('scheduleMeet.toast.error.submitError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <style>{datePickerStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md bg-bizzwiz-glass-bg/60 backdrop-blur-2xl p-8 rounded-xl shadow-lg shadow-bizzwiz-magenta-flare/20 border border-bizzwiz-electric-cyan/20"
      >
        <div className="text-center mb-6">
          <img 
            alt={t('scheduleMeet.imageAlt')} 
            className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto drop-shadow-[0_0_15px_rgba(159,67,242,0.5)]"
            src="/bee.png" 
          />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            {t('scheduleMeet.title')}
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-bizzwiz-comet-tail">
          <div>
            <label className="font-medium text-bizzwiz-star-white block mb-1">{t('scheduleMeet.form.nameLabel')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={cn(
                'w-full p-3 rounded-lg bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
              )}
              placeholder={t('scheduleMeet.form.namePlaceholder')}
            />
          </div>

          <div>
            <label className="font-medium text-bizzwiz-star-white block mb-1">{t('scheduleMeet.form.figmaUrlLabel')}</label>
            <input
              type="url"
              name="figma_url"
              value={formData.figma_url}
              onChange={handleInputChange}
              className={cn(
                'w-full p-3 rounded-lg bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
              )}
              placeholder={t('scheduleMeet.form.figmaUrlPlaceholder')}
            />
          </div>

          <div>
            <label className="font-medium text-bizzwiz-star-white block mb-1">{t('scheduleMeet.form.phoneNumberLabel')}</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              pattern="[0-9]*"
              className={cn(
                'w-full p-3 rounded-lg bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
              )}
              placeholder={t('scheduleMeet.form.phoneNumberPlaceholder')}
            />
          </div>

          <div>
            <label className="font-medium text-bizzwiz-star-white block mb-1">{t('scheduleMeet.form.dateTimeLabel')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-bizzwiz-electric-cyan" />
              </div>
              <DatePicker
                selected={selectedDateTime}
                onChange={handleDateTimeChange}
                showTimeSelect
                timeIntervals={15}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText={t('scheduleMeet.form.dateTimePlaceholder')}
                className={cn(
                  'w-full p-3 pl-10 rounded-lg bg-white/10 border-bizzwiz-electric-cyan/30 text-white placeholder-bizzwiz-comet-tail focus:border-bizzwiz-electric-cyan focus:ring-2 focus:ring-bizzwiz-electric-cyan/50 outline-none transition-all'
                )}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2.5 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            size="lg"
          >
            {isSubmitting ? t('scheduleMeet.buttons.submitting') : t('scheduleMeet.buttons.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/app/dashboard')}
            className="border-bizzwiz-electric-cyan text-bizzwiz-star-white hover:bg-bizzwiz-electric-cyan/10 px-4 py-2 bg-transparent"
            aria-label={t('scheduleMeet.buttons.backAriaLabel')}
          >
            <ArrowLeft size={16} className="mr-2" />
            {t('scheduleMeet.buttons.back')}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleMeetPage;