
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';
import { Calendar, User, Phone, Clock, Mail } from 'lucide-react';

const ScheduleListPage = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await ApiService('/admin/appointments', 'GET');
      if (response.success) {
        setAppointments(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to load appointments',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while fetching appointments',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6 bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700/60"
    >
      <h2 className="text-2xl font-orbitron font-bold text-slate-100 mb-6">Schedule List</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-slate-400 text-center">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-100">
                <th className="p-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-red-500" />
                    <span>User Name</span>
                  </div>
                </th>
                <th className="p-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-red-500" />
                    <span>Email</span>
                  </div>
                </th>
                <th className="p-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-500" />
                    <span>Phone Number</span>
                  </div>
                </th>
                <th className="p-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-red-500" />
                    <span>Date</span>
                  </div>
                </th>
                <th className="p-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    <span>Time</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b border-slate-700/30 hover:bg-slate-900/70 transition-colors"
                >
                  <td className="p-3 text-slate-100">{appointment.user?.fullname || 'Unknown User'}</td>
                  <td className="p-3 text-slate-300">{appointment.user?.email || 'N/A'}</td>
                  <td className="p-3 text-slate-300">{appointment.phone_number || 'N/A'}</td>
                  <td className="p-3 text-slate-300">{appointment.appointment_date || 'N/A'}</td>
                  <td className="p-3 text-slate-300">{appointment.appointment_time || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ScheduleListPage;
