/**
 * Tipos de domínio do VanBora.
 * Mapeiam as entidades que futuramente virão do backend (Java/Spring + MySQL).
 */

export type UserRole = 'guardian' | 'transporter';

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export type StudentFinanceStatus = 'em_dia' | 'pendente' | 'atrasado';

export type RouteStopStatus = 'going' | 'not_going' | 'school';

export type TripStepStatus = 'done' | 'in_progress' | 'waiting';

export interface Dependent {
  id: string;
  name: string;
  school: string;
}

export interface PaymentRecord {
  id: string;
  referenceMonth: string; // ex.: "Abril 2026"
  amount: number;
  status: PaymentStatus;
  dueDate?: string;
}

export interface Transporter {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  yearsExperience: number;
  schools: string[];
  neighborhoods: string[];
  monthlyFee: number; // mensalidade estimada para o bairro buscado
  availableSeats: number;
  vehiclePlate?: string;
  capacity?: number;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
}

export interface TripStep {
  id: string;
  label: string;
  time?: string;
  status: TripStepStatus;
}

export interface WeekAttendance {
  /** SEG..SEX */
  day: string;
  present: boolean | null;
}

export interface Notice {
  id: string;
  message: string;
  date: string;
  recipients: number;
}

export interface HireRequest {
  id: string;
  guardianName: string;
  studentName: string;
  school: string;
  neighborhood: string;
}

export interface Student {
  id: string;
  name: string;
  guardianName: string;
  school: string;
  neighborhood: string;
  financeStatus: StudentFinanceStatus;
}

export interface RouteStop {
  id: string;
  studentName: string;
  address: string;
  status: RouteStopStatus;
}

export interface Helper {
  id: string;
  name: string;
  role: string;
}

export interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
}

export interface PriceZone {
  id: string;
  name: string;
  neighborhoods: string[];
  monthlyFee: string;
}
