import { supabase } from './supabase';

// ─── Interfaces (same as before — no change needed in the rest of the app) ───

export interface Patient {
  id?: number;
  uhid: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  dateOfBirth: string;
  bloodGroup: string;
  aadhaar: string;
  createdAt?: Date;
}

export interface Doctor {
  id?: number;
  name: string;
  email: string;
  doctorId: string;
  department: string;
  role: string;
}

export interface Prescription {
  id?: number;
  uhid: string;
  medicines: Medicine[];
  allergies: string;
  symptoms: string;
  hereditaryDiseases: string;
  doctor: Doctor;
  createdAt?: Date;
}

export interface Medicine {
  id: string;
  name: string;
  timing: ('morning' | 'afternoon' | 'evening')[];
  beforeFood: boolean;
  dosage: string;
  days: number;
}

export interface Record {
  id?: number;
  uhid: string;
  type: 'prescription' | 'image';
  title: string;
  data: string;
  createdAt?: Date;
}

// ─── Generate UHID ────────────────────────────────────────────────────────────

export const generateUHID = async (): Promise<string> => {
  const year = new Date().getFullYear().toString();
  let isUnique = false;
  let uhid = '';
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    attempts++;
    const random = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    uhid = year + random;

    const { count, error } = await supabase
      .from('patients')
      .select('*', { count: 'exact', head: true })
      .eq('uhid', uhid);

    if (error) {
      console.error('Error generating UHID:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (count === 0) isUnique = true;
  }

  if (!isUnique) {
    throw new Error('Failed to generate a unique UHID after multiple attempts');
  }

  return uhid;
};

// ─── Patient Functions ────────────────────────────────────────────────────────

export const registerPatient = async (
  patient: Omit<Patient, 'id' | 'createdAt' | 'uhid'>
): Promise<string> => {
  const uhid = await generateUHID();

  const { error } = await supabase.from('patients').insert({
    uhid,
    name: patient.name,
    gender: patient.gender,
    age: patient.age,
    date_of_birth: patient.dateOfBirth,
    blood_group: patient.bloodGroup,
    aadhaar: patient.aadhaar,
  });

  if (error) throw new Error(`Failed to register patient: ${error.message}`);
  return uhid;
};

export const getPatientByUHID = async (uhid: string): Promise<Patient | undefined> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('uhid', uhid)
    .single();

  if (error || !data) return undefined;

  return {
    id: data.id,
    uhid: data.uhid,
    name: data.name,
    gender: data.gender,
    age: data.age,
    dateOfBirth: data.date_of_birth,
    bloodGroup: data.blood_group,
    aadhaar: data.aadhaar,
    createdAt: new Date(data.created_at),
  };
};

export const getPatientByAadhaar = async (aadhaar: string): Promise<Patient | undefined> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('aadhaar', aadhaar)
    .single();

  if (error || !data) return undefined;

  return {
    id: data.id,
    uhid: data.uhid,
    name: data.name,
    gender: data.gender,
    age: data.age,
    dateOfBirth: data.date_of_birth,
    bloodGroup: data.blood_group,
    aadhaar: data.aadhaar,
    createdAt: new Date(data.created_at),
  };
};

// ─── Prescription Functions ───────────────────────────────────────────────────

export const savePrescription = async (
  prescription: Omit<Prescription, 'id' | 'createdAt'>
): Promise<number> => {
  const { data, error } = await supabase
    .from('prescriptions')
    .insert({
      uhid: prescription.uhid,
      medicines: prescription.medicines,
      allergies: prescription.allergies,
      symptoms: prescription.symptoms,
      hereditary_diseases: prescription.hereditaryDiseases,
      doctor: prescription.doctor,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to save prescription: ${error.message}`);
  return data.id;
};

export const getPrescriptionsByUHID = async (uhid: string): Promise<Prescription[]> => {
  const { data, error } = await supabase
    .from('prescriptions')
    .select('*')
    .eq('uhid', uhid)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    uhid: row.uhid,
    medicines: row.medicines,
    allergies: row.allergies,
    symptoms: row.symptoms,
    hereditaryDiseases: row.hereditary_diseases,
    doctor: row.doctor,
    createdAt: new Date(row.created_at),
  }));
};

export const deletePrescription = async (id: number): Promise<void> => {
  const { error } = await supabase.from('prescriptions').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete prescription: ${error.message}`);
};

// ─── Record Functions ─────────────────────────────────────────────────────────

export const saveRecord = async (
  record: Omit<Record, 'id' | 'createdAt'>
): Promise<number> => {
  const { data, error } = await supabase
    .from('records')
    .insert({
      uhid: record.uhid,
      type: record.type,
      title: record.title,
      data: record.data,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to save record: ${error.message}`);
  return data.id;
};

export const getRecordsByUHID = async (uhid: string): Promise<Record[]> => {
  const { data, error } = await supabase
    .from('records')
    .select('*')
    .eq('uhid', uhid)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    uhid: row.uhid,
    type: row.type,
    title: row.title,
    data: row.data,
    createdAt: new Date(row.created_at),
  }));
};

export const deleteRecord = async (id: number): Promise<void> => {
  const { error } = await supabase.from('records').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete record: ${error.message}`);
};