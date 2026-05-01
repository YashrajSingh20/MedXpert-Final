-- ============================================================
-- MedXpert Seed Data — Fake Patients, Prescriptions & Records
-- Run this in Supabase SQL Editor AFTER running database.sql
-- ============================================================

-- ─── PATIENTS ─────────────────────────────────────────────────

INSERT INTO patients (uhid, name, gender, age, date_of_birth, blood_group, aadhaar) VALUES
('20261234567890', 'Rahul Sharma',    'male',   28, '1998-03-15', 'B+',  '987654321012'),
('20269876543210', 'Priya Patel',     'female', 34, '1992-07-22', 'O+',  '876543210987'),
('20265555666677', 'Amit Kumar',      'male',   45, '1981-01-10', 'A+',  '765432109876'),
('20261111222233', 'Sneha Reddy',     'female', 22, '2004-11-05', 'AB-', '654321098765'),
('20264444333322', 'Vikram Singh',    'male',   55, '1971-06-30', 'O-',  '543210987654'),
('20267777888899', 'Ananya Gupta',    'female', 30, '1996-09-18', 'A-',  '432109876543'),
('20263333444455', 'Rajesh Verma',    'male',   60, '1966-02-25', 'B-',  '321098765432'),
('20268888999900', 'Meera Joshi',     'female', 27, '1999-12-08', 'AB+', '210987654321');

-- ─── PRESCRIPTIONS ────────────────────────────────────────────

-- Prescription for Rahul Sharma
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20261234567890',
 '[{"id":"1","name":"Amoxicillin","timing":["morning","evening"],"beforeFood":false,"dosage":"500mg","days":7},
   {"id":"2","name":"Paracetamol","timing":["morning","afternoon","evening"],"beforeFood":false,"dosage":"650mg","days":5}]',
 'Penicillin',
 'Fever, sore throat, body ache',
 'Diabetes',
 '{"name":"Dr. Arun Mehta","email":"arun.mehta@hospital.com","doctorId":"DOC001","department":"General Medicine","role":"doctor"}'
);

-- Prescription for Priya Patel
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20269876543210',
 '[{"id":"1","name":"Cetirizine","timing":["evening"],"beforeFood":false,"dosage":"10mg","days":10},
   {"id":"2","name":"Montelukast","timing":["evening"],"beforeFood":false,"dosage":"10mg","days":14}]',
 'None',
 'Sneezing, runny nose, watery eyes',
 'Asthma',
 '{"name":"Dr. Sunita Rao","email":"sunita.rao@hospital.com","doctorId":"DOC002","department":"ENT","role":"doctor"}'
);

-- Prescription for Amit Kumar
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20265555666677',
 '[{"id":"1","name":"Metformin","timing":["morning","evening"],"beforeFood":true,"dosage":"500mg","days":30},
   {"id":"2","name":"Lisinopril","timing":["morning"],"beforeFood":false,"dosage":"5mg","days":30}]',
 'Sulfa drugs',
 'Frequent urination, fatigue, high BP',
 'Diabetes, Hypertension',
 '{"name":"Dr. Arun Mehta","email":"arun.mehta@hospital.com","doctorId":"DOC001","department":"General Medicine","role":"doctor"}'
);

-- Prescription for Sneha Reddy
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20261111222233',
 '[{"id":"1","name":"Ibuprofen","timing":["morning","evening"],"beforeFood":false,"dosage":"400mg","days":5},
   {"id":"2","name":"Omeprazole","timing":["morning"],"beforeFood":true,"dosage":"20mg","days":7}]',
 'None',
 'Headache, stomach pain',
 'None',
 '{"name":"Dr. Sunita Rao","email":"sunita.rao@hospital.com","doctorId":"DOC002","department":"ENT","role":"doctor"}'
);

-- Second prescription for Rahul Sharma (follow-up visit)
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20261234567890',
 '[{"id":"1","name":"Aspirin","timing":["morning"],"beforeFood":false,"dosage":"75mg","days":30}]',
 'Penicillin',
 'Follow-up checkup, mild chest discomfort',
 'Diabetes',
 '{"name":"Dr. Arun Mehta","email":"arun.mehta@hospital.com","doctorId":"DOC001","department":"General Medicine","role":"doctor"}'
);

-- Prescription for Vikram Singh
INSERT INTO prescriptions (uhid, medicines, allergies, symptoms, hereditary_diseases, doctor) VALUES
('20264444333322',
 '[{"id":"1","name":"Simvastatin","timing":["evening"],"beforeFood":false,"dosage":"20mg","days":30},
   {"id":"2","name":"Gabapentin","timing":["morning","afternoon","evening"],"beforeFood":false,"dosage":"300mg","days":14},
   {"id":"3","name":"Naproxen","timing":["morning","evening"],"beforeFood":false,"dosage":"250mg","days":7}]',
 'Aspirin',
 'Joint pain, high cholesterol, nerve pain',
 'Heart disease',
 '{"name":"Dr. Arun Mehta","email":"arun.mehta@hospital.com","doctorId":"DOC001","department":"General Medicine","role":"doctor"}'
);

-- ─── RECORDS (sample text records — not actual PDFs) ──────────

INSERT INTO records (uhid, type, title, data) VALUES
('20261234567890', 'prescription', 'Prescription_2026-04-20', 'Sample prescription PDF data for Rahul Sharma'),
('20261234567890', 'prescription', 'Prescription_2026-04-28', 'Follow-up prescription PDF data for Rahul Sharma'),
('20269876543210', 'prescription', 'Prescription_2026-04-25', 'Sample prescription PDF data for Priya Patel'),
('20265555666677', 'prescription', 'Prescription_2026-04-22', 'Sample prescription PDF data for Amit Kumar'),
('20261111222233', 'prescription', 'Prescription_2026-04-27', 'Sample prescription PDF data for Sneha Reddy'),
('20264444333322', 'prescription', 'Prescription_2026-04-18', 'Sample prescription PDF data for Vikram Singh');

-- ============================================================
-- DONE! You now have:
--   8 patients
--   6 prescriptions
--   6 records
-- 
-- Test UHIDs to search:
--   Rahul Sharma   → 20261234567890
--   Priya Patel    → 20269876543210
--   Amit Kumar     → 20265555666677
--   Sneha Reddy    → 20261111222233
--   Vikram Singh   → 20264444333322
--   Ananya Gupta   → 20267777888899
--   Rajesh Verma   → 20263333444455
--   Meera Joshi    → 20268888999900
-- ============================================================
