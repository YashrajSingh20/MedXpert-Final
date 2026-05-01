-- ============================================================
-- MedXpert Supabase Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- 1. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS patients (
  id           SERIAL PRIMARY KEY,
  uhid         TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  gender       TEXT CHECK (gender IN ('male', 'female', 'other')),
  age          INTEGER,
  date_of_birth TEXT,
  blood_group  TEXT,
  aadhaar      TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PRESCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS prescriptions (
  id                   SERIAL PRIMARY KEY,
  uhid                 TEXT NOT NULL,
  medicines            JSONB,
  allergies            TEXT,
  symptoms             TEXT,
  hereditary_diseases  TEXT,
  doctor               JSONB,
  created_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RECORDS TABLE (for PDF files stored as base64)
CREATE TABLE IF NOT EXISTS records (
  id         SERIAL PRIMARY KEY,
  uhid       TEXT NOT NULL,
  type       TEXT CHECK (type IN ('prescription', 'image')),
  title      TEXT,
  data       TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- INDEXES (for fast UHID lookups)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_patients_uhid       ON patients(uhid);
CREATE INDEX IF NOT EXISTS idx_prescriptions_uhid  ON prescriptions(uhid);
CREATE INDEX IF NOT EXISTS idx_records_uhid        ON records(uhid);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Enable for production security
-- ============================================================
ALTER TABLE patients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE records       ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (change this for production)
CREATE POLICY "Allow all" ON patients      FOR ALL USING (true);
CREATE POLICY "Allow all" ON prescriptions FOR ALL USING (true);
CREATE POLICY "Allow all" ON records       FOR ALL USING (true);