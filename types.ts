
export interface Appointment {
  id: string;
  customerName: string;
  vehicleModel: string;
  service: string;
  date: string; // YYYY-MM-DD
  timeSlot: 'morning' | 'afternoon';
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'admin';
  text: string;
  timestamp: Date;
}

export type AvailabilityStatus = 'free' | 'busy' | 'full';

export interface DayStatus {
  date: string;
  morningStatus: AvailabilityStatus;
  afternoonStatus: AvailabilityStatus;
  count: number;
}
