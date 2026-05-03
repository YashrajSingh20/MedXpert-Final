import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, Download, Eye, X, Trash2, Loader2, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '../utils/auth';
import { getPatientByUHID, getRecordsByUHID, deleteRecord } from '../utils/db';
import type { Patient, Record } from '../utils/db';
import PageTransition from '../components/PageTransition';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    type: 'pdf' | 'image';
    data: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    const loadPatientData = async () => {
      const user = getCurrentUser();
      if (!user || user.role !== 'patient') {
        navigate('/login');
        return;
      }

      try {
        const patientData = await getPatientByUHID(user.uhid);
        if (!patientData) {
          throw new Error('Patient data not found');
        }
        setPatient(patientData);

        const patientRecords = await getRecordsByUHID(user.uhid);
        setRecords(patientRecords);
      } catch (err) {
        setError('Failed to load patient data');
      }
    };

    loadPatientData();
  }, [navigate]);

  const handleDelete = async () => {
    if (deleteConfirm === null) return;

    setIsDeleting(true);
    try {
      await deleteRecord(deleteConfirm);
      setRecords(prev => prev.filter(r => r.id !== deleteConfirm));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete record');
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePreview = (record: Record) => {
    setPreviewData({
      title: record.title,
      type: record.type === 'pdf' ? 'pdf' : 'image',
      data: record.data
    });
  };

  const handleDownload = (record: Record) => {
    const link = document.createElement('a');
    if (record.type === 'pdf') {
      const binaryData = atob(record.data.split(',')[1]);
      const array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([array], { type: 'application/pdf' });
      link.href = URL.createObjectURL(blob);
      link.download = `${record.title}.pdf`;
    } else {
      link.href = record.data;
      link.download = `${record.title}.${record.data.split(';')[0].split('/')[1]}`;
    }
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-navy-950 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="glass-card p-4 text-red-400 flex items-center border border-red-500/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="mr-2" size={20} />
              <span>{error}</span>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-navy-950 medical-grid-bg py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Patient Info */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Name', value: patient.name },
                { label: 'UHID', value: patient.uhid },
                { label: 'Age', value: `${patient.age} years` },
                { label: 'Gender', value: patient.gender },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="bg-navy-900/50 border border-med-400/10 p-4 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Medical Records */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Medical Records</h2>
            {records.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No medical records found</p>
            ) : (
              <div className="space-y-3">
                {records.map((record, i) => (
                  <motion.div
                    key={record.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-navy-900/50 border border-gray-800 rounded-xl hover:border-med-400/20 transition-all duration-300 gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
                        {record.type === 'image' ? (
                          <Image className="text-accent-400" size={20} />
                        ) : (
                          <FileText className="text-accent-400" size={20} />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{record.title}</h4>
                        <p className="text-gray-500 text-xs">
                          {new Date(record.createdAt).toLocaleDateString()} · {record.type.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[
                        { icon: Eye, onClick: () => handlePreview(record), title: 'Preview', color: 'text-med-400 hover:bg-med-400/10' },
                        { icon: Download, onClick: () => handleDownload(record), title: 'Download', color: 'text-accent-400 hover:bg-accent-500/10' },
                        { icon: Trash2, onClick: () => setDeleteConfirm(record.id!), title: 'Delete', color: 'text-red-400 hover:bg-red-500/10' },
                      ].map(({ icon: Icon, onClick, title, color }) => (
                        <motion.button
                          key={title}
                          onClick={onClick}
                          className={`${color} p-2 rounded-lg transition-all duration-200`}
                          title={title}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={18} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Preview Modal */}
          <AnimatePresence>
            {previewData && (
              <motion.div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="glass-card max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.2 }}
                >
                  <div className="flex items-center justify-between p-4 border-b border-navy-700/50">
                    <h3 className="text-lg font-semibold text-white">{previewData.title}</h3>
                    <motion.button
                      onClick={() => setPreviewData(null)}
                      className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-700/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    {previewData.type === 'pdf' ? (
                      <iframe
                        src={previewData.data}
                        className="w-full h-full min-h-[60vh] rounded-lg"
                        title="PDF Preview"
                      />
                    ) : (
                      <img
                        src={previewData.data}
                        alt={previewData.title}
                        className="max-w-full h-auto mx-auto rounded-lg"
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteConfirm !== null && (
              <motion.div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="glass-card p-6 max-w-md w-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    Are you sure you want to delete this record? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <motion.button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 bg-navy-700/50 text-white rounded-xl hover:bg-navy-700/50 transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          Delete
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default PatientDashboard;