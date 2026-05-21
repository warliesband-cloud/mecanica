export interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  truckModel: string;
  licensePlate: string;
  serviceType: 'preventive' | 'corrective' | 'diagnostic' | 'heavy-engine' | 'suspension-brakes';
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'pending' | 'confirmed';
}

export interface DiagnosticSymptom {
  id: string;
  title: string;
  description: string;
  category: 'engine' | 'electrical' | 'injection' | 'transmission';
  code: string; // e.g., SPN 520211 FMI 5
  possibleCauses: string[];
  diagnosticTest: string;
  solution: string;
  estimatedTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'preventive' | 'complex' | 'diagnostic' | 'suspension';
  image: string;
  truckType: string;
}
