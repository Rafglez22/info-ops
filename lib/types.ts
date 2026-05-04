export type CallStatus =
  | 'closed'
  | 'deposit'
  | 'no_close'
  | 'no_show'
  | 'cancelled'
  | 'disqualified'
  | 'new_call'
  | 'past_call';

export type PaymentPlatform = 'fanbasis' | 'stripe' | 'zelle' | 'cash' | 'financing';
export type CallType = 'live' | 'dm_close';
export type TimePeriod = 'day' | 'week' | 'month' | 'custom';

export interface Lead {
  id: string;
  name: string;
  email: string;
  appointmentDatetime: string; // ISO
  status: CallStatus;
  setter: string;
  platform: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  funnel: string;
  callType: CallType;
  dmClose: boolean;
  callNotes: string;
  salesCallRecordingUrl: string;
  postCallFormUrl: string;
  closedDate?: string;
}

export interface Payment {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  revenue: number;       // total contract value
  collected: number;     // amount actually received
  paymentPlatform: PaymentPlatform;
  firstPaymentDate: string; // ISO date
  depositOnly: boolean;
  weekNumber: number;    // cohort week (1 = most recent)
}

export interface DashboardMetrics {
  totalRevenueGenerated: number;
  totalCashCollected: number;
  cashCollectedAfterFees: number;
  cashToBeCollected: number;
  cashPerCallTaken: number;
  averageOrderValue: number;
  monthlyGoal: number;
  totalBookedCalls: number;
  totalLiveCalls: number;
  totalCancelled: number;
  totalNew: number;
  closedCalls: number;
  deposits: number;
  noCloses: number;
  noShows: number;
  closeRate: number;
  noCloseRate: number;
  showRate: number;
  noShowRate: number;
}

export interface FilterState {
  timePeriod: TimePeriod;
  type: string;
  setter: string;
  platform: string;
  status: string;
  dmClose: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  funnel: string;
}
