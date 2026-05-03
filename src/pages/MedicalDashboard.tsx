import React, { useState } from 'react';
import { Search, FileText, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPatientByUHID, getPrescriptionsByUHID } from '../utils/db';
import { generatePrescription } from '../utils/pdf';
import type { Patient, Prescription } from '../utils/db';
import PageTransition from '../components/PageTransition';

const MedicalDashboard: React.FC = () => {
  const [uhid, setUhid] = useState('');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    data: string;
  } | null>(null);

  const handleSearch = async () => {
    if (uhid.length !== 14) {
      setError('Please enter a valid 14-digit UHID');
      return;
    }

    setIsLoading(true);
    setError('');
    setPatient(null);
    setPrescriptions([]);

    try {
      const patientData = await getPatientByUHID(uhid);
      if (!patientData) {
        setError('Patient not found');
        return;
      }
      setPatient(patientData);

      const prescriptionData = await getPrescriptionsByUHID(uhid);
      setPrescriptions(prescriptionData);
    } catch (err) {
      setError('Error fetching patient data');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async (prescription: Prescription) => {
    if (!patient) return;

    const prescriptionData = {
      uhid: patient.uhid,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      medicines: prescription.medicines,
      allergies: prescription.allergies || '',
      symptoms: prescription.symptoms || '',
      hereditaryDiseases: prescription.hereditaryDiseases || '',
      date: new Date(prescription.createdAt).toLocaleDateString(),
      doctor: prescription.doctor || {
        name: 'Unknown Doctor',
        doctorId: 'N/A',
        department: 'N/A',
        role: 'N/A'
      }
    };

    const doc = generatePrescription(prescriptionData);
    const pdfData = doc.output('datauristring');
    
    setPreviewData({
      title: `Prescription - ${new Date(prescription.createdAt).toLocaleDateString()}`,
      data: pdfData
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-navy-950 medical-grid-bg py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Section */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Medical Store Dashboard</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
              <div className="flex-1">
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Patient UHID</label>
                <input
                  type="text"
                  value={uhid}
                  onChange={(e) => setUhid(e.target.value)}
                  className="auth-input"
                  placeholder="Enter 14-digit UHID"
                  maxLength={14}
                />
              </div>
              <motion.button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-6 py-2.5 rounded-xl hover:from-accent-500 hover:to-accent-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Search
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertCircle className="mr-2 flex-shrink-0" size={20} />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Patient Info + Prescriptions */}
          <AnimatePresence>
            {patient && (
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Patient Information</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 mb-6">
                  {[
                    { label: 'Name', value: patient.name },
                    { label: 'Age', value: `${patient.age} years` },
                    { label: 'Gender', value: patient.gender },
                    { label: 'UHID', value: patient.uhid },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      className="bg-navy-900/50 border border-med-400/10 p-4 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="block text-gray-500 text-xs uppercase tracking-widest mb-1">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                {prescriptions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No prescriptions found for this patient
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-white mb-3">Prescriptions</h4>
                    {prescriptions.map((prescription, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-navy-900/50 border border-gray-800 rounded-xl hover:border-med-400/20 transition-all duration-300 gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
                            <FileText className="text-accent-400" size={20} />
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-sm">
                              Prescription - {new Date(prescription.createdAt).toLocaleDateString()}
                            </h4>
                            <p className="text-gray-500 text-xs">
                              {prescription.medicines.length} medicine(s)
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => handlePreview(prescription)}
                          className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-4 py-2 rounded-xl hover:from-accent-500 hover:to-accent-600 transition-all text-sm font-medium"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          View Details
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

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
                    <iframe
                      src={previewData.data}
                      className="w-full h-full min-h-[60vh] rounded-lg"
                      title="Prescription Preview"
                    />
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

export default MedicalDashboard;