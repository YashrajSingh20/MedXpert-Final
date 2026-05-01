# MedXpert Workflow Architecture

Here is the complete step-by-step workflow of how data moves through the MedXpert system, showing exactly how the libraries (Dexie, Fuse, Tesseract, jsPDF) interact.

## 1. Complete System Flow

This flowchart shows the end-to-end journey from a Patient entering the clinic to the Medical Store dispensing the medicine.

```mermaid
graph TD
    %% Roles
    Doctor((Doctor))
    Patient((Patient))
    Pharmacy((Medical Store))

    %% Core Data
    DB[(IndexedDB \n via Dexie.js)]

    %% Step 1: Registration
    Doctor -- "1. Registers Patient" --> Reg[Patient Registration]
    Reg -- "Generates 14-digit" --> UHID[UHID]
    UHID -- "Saves to" --> DB

    %% Step 2: Prescription Writing
    Doctor -- "2. Enters UHID" --> Search[Search Patient]
    Search -- "Fetches from" --> DB
    
    Doctor -- "3. Adds Medicines via" --> InputMethods{Input Methods}
    InputMethods -->|Type| Typing[Search Box]
    InputMethods -->|Speak| Voice[Voice Input \n Web Speech API]
    InputMethods -->|Draw| Canvas[Drawing Canvas]
    
    Canvas -- "Reads Image" --> OCR[Tesseract.js OCR]
    OCR -- "Raw Text" --> Fuzzy[Fuse.js]
    Voice -- "Spoken Text" --> Fuzzy
    Typing -- "Typed Text" --> Fuzzy
    
    Fuzzy -- "Matches to" --> DrugList[drugList.ts \n In-Memory Array]
    DrugList -- "Selected Medicine" --> PrescForm[Prescription Form]

    %% Step 3: Saving & PDF Generation
    Doctor -- "4. Clicks Save" --> SavePresc[Save Prescription]
    PrescForm --> SavePresc
    SavePresc -- "Formats Document" --> PDF[jsPDF Generator]
    PDF -- "Base64 String" --> DB
    SavePresc -- "JSON Data" --> DB

    %% Step 4: Patient Access
    Patient -- "5. Logs In" --> PatDash[Patient Dashboard]
    PatDash -- "Fetches by UHID" --> DB
    PatDash -- "Views/Downloads" --> PDFOut[PDF Prescription]

    %% Step 5: Pharmacy Access
    Pharmacy -- "6. Enters UHID" --> MedDash[Medical Dashboard]
    MedDash -- "Fetches by UHID" --> DB
    MedDash -- "Views" --> PDFOut
```

## 2. Medicine Input Flow (Deep Dive)

This chart zooms in on the most complex part of the app: how a doctor's input turns into a verified medicine name using Tesseract and Fuse.js.

```mermaid
sequenceDiagram
    participant Doctor
    participant UI as Drawing Canvas / Mic
    participant Tesseract as Tesseract.js (OCR)
    participant Speech as Web Speech API
    participant Fuse as Fuse.js
    participant DrugList as drugList.ts
    
    %% Drawing Flow
    Doctor->>UI: Draws "Amoxclin"
    UI->>Tesseract: Sends Canvas Image
    Note over Tesseract: Processing Image...
    Tesseract->>Fuse: Returns raw text "Amoxclin"
    
    %% Voice Flow (Alternative)
    Doctor->>UI: Speaks "Asprin"
    UI->>Speech: Listens to audio
    Speech->>Fuse: Returns raw text "Asprin"
    
    %% Matching Process
    Note over Fuse: Fuzzy Search matching
    Fuse->>DrugList: Searches array for closest match
    DrugList-->>Fuse: Found matches
    Fuse-->>UI: Returns "Amoxicillin" (98% confidence)
    
    UI->>Doctor: Shows "Amoxicillin" in Prescription list
```

## 3. Data Storage Flow (Deep Dive)

This chart shows how Dexie.js handles the data storage when the prescription is finally saved.

```mermaid
sequenceDiagram
    participant App as MedXpert App
    participant jsPDF as jsPDF Library
    participant Dexie as Dexie.js
    participant Browser as Browser IndexedDB
    
    App->>jsPDF: Send Prescription Data (Name, Medicines, Date)
    Note over jsPDF: Generating PDF Layout
    jsPDF-->>App: Returns PDF as Base64 String
    
    App->>Dexie: db.prescriptions.add({JSON data})
    Dexie->>Browser: Write to 'prescriptions' table
    
    App->>Dexie: db.records.add({title, base64_pdf})
    Dexie->>Browser: Write to 'records' table
    
    Note over Browser: Data permanently saved locally!
```
