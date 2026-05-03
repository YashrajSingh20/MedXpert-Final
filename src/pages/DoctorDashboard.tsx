import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { PatientRegistration } from '../components/PatientRegistration';
import NewPrescription from '../components/NewPrescription';
import PreviousRecords from '../components/PreviousRecords';
import AddRecord from '../components/AddRecord';
import DoctorProfile from '../components/DoctorProfile';

type ActiveView = 'registration' | 'prescription' | 'previous-records' | 'add-record' | 'profile';

const DoctorDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('prescription');
  const [currentUHID, setCurrentUHID] = useState<string>('');
  const handleRegistrationComplete = (uhid: string) => { setCurrentUHID(uhid); setActiveView('prescription'); };

  const renderContent = () => {
    switch (activeView) {
      case 'registration': return <PatientRegistration onRegistrationComplete={handleRegistrationComplete} />;
      case 'prescription': return <NewPrescription initialUHID={currentUHID} onRegisterClick={() => setActiveView('registration')} />;
      case 'previous-records': return <PreviousRecords initialUHID={currentUHID} />;
      case 'add-record': return <AddRecord initialUHID={currentUHID} />;
      case 'profile': return <DoctorProfile />;
      default: return <NewPrescription initialUHID={currentUHID} onRegisterClick={() => setActiveView('registration')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-navy-950 medical-grid-bg">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;