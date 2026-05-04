import { Lead, Payment } from './types';

export const MONTHLY_GOAL = 150000;

export const SETTERS = ['Austin', 'Brandon', 'Carlos', 'Diana', 'All'];
export const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'Facebook', 'All'];
export const FUNNELS = ['Direct Book', 'VSL Funnel', 'Application Funnel', 'All'];
export const CONTENT_PIECES = [
  '47k-breakdown',
  'case-study',
  'day-in-life',
  'lambo-reveal',
  'origin-story',
  'All',
];

export const FEE_RATES: Record<string, number> = {
  fanbasis: 0.029,
  stripe: 0.029,
  financing: 0.05,
  zelle: 0,
  cash: 0,
};

export const mockLeads: Lead[] = [
  // CLOSED
  {
    id: 'l1',
    name: 'Alex Rivera',
    email: 'alex.r@email.com',
    appointmentDatetime: '2026-04-27T14:00:00Z',
    status: 'closed',
    setter: 'Austin',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Strong buyer. PIF. Loved the moissanite angle.',
    salesCallRecordingUrl: 'https://example.com/recordings/l1',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l1',
    closedDate: '2026-04-27',
  },
  {
    id: 'l2',
    name: 'Morgan Lee',
    email: 'morgan.l@email.com',
    appointmentDatetime: '2026-04-25T16:00:00Z',
    status: 'closed',
    setter: 'Austin',
    platform: 'Instagram',
    source: 'instagram',
    medium: 'organic',
    campaign: 'reselling',
    content: 'origin-story',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Payment plan. 4 payments.',
    salesCallRecordingUrl: 'https://example.com/recordings/l2',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l2',
    closedDate: '2026-04-25',
  },
  {
    id: 'l3',
    name: 'Jordan Kim',
    email: 'jordan.k@email.com',
    appointmentDatetime: '2026-04-24T13:00:00Z',
    status: 'closed',
    setter: 'Brandon',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'PIF. Easy close.',
    salesCallRecordingUrl: 'https://example.com/recordings/l3',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l3',
    closedDate: '2026-04-24',
  },
  {
    id: 'l4',
    name: 'Taylor Nguyen',
    email: 'taylor.n@email.com',
    appointmentDatetime: '2026-04-22T15:00:00Z',
    status: 'closed',
    setter: 'Austin',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'PIF. Referred by a friend.',
    salesCallRecordingUrl: 'https://example.com/recordings/l4',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l4',
    closedDate: '2026-04-22',
  },
  {
    id: 'l5',
    name: 'Casey Patel',
    email: 'casey.p@email.com',
    appointmentDatetime: '2026-04-21T14:00:00Z',
    status: 'closed',
    setter: 'Carlos',
    platform: 'TikTok',
    source: 'tiktok',
    medium: 'organic',
    campaign: 'reselling',
    content: 'lambo-reveal',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: '2 pay.',
    salesCallRecordingUrl: 'https://example.com/recordings/l5',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l5',
    closedDate: '2026-04-21',
  },
  {
    id: 'l6',
    name: 'Riley Zhang',
    email: 'riley.z@email.com',
    appointmentDatetime: '2026-04-20T11:00:00Z',
    status: 'closed',
    setter: 'Austin',
    platform: 'Instagram',
    source: 'instagram',
    medium: 'organic',
    campaign: 'reselling',
    content: 'day-in-life',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'PIF.',
    salesCallRecordingUrl: 'https://example.com/recordings/l6',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l6',
    closedDate: '2026-04-20',
  },
  {
    id: 'l7',
    name: 'Sam Okonkwo',
    email: 'sam.o@email.com',
    appointmentDatetime: '2026-04-19T15:00:00Z',
    status: 'closed',
    setter: 'Diana',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: '3 pay.',
    salesCallRecordingUrl: 'https://example.com/recordings/l7',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l7',
    closedDate: '2026-04-19',
  },
  {
    id: 'l8',
    name: 'Drew Morales',
    email: 'drew.m@email.com',
    appointmentDatetime: '2026-04-18T13:00:00Z',
    status: 'closed',
    setter: 'Brandon',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: 'case-study',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'PIF.',
    salesCallRecordingUrl: 'https://example.com/recordings/l8',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l8',
    closedDate: '2026-04-18',
  },
  {
    id: 'l9',
    name: 'Avery Thomas',
    email: 'avery.t@email.com',
    appointmentDatetime: '2026-04-16T14:00:00Z',
    status: 'closed',
    setter: 'Austin',
    platform: 'Instagram',
    source: 'instagram',
    medium: 'organic',
    campaign: 'reselling',
    content: 'origin-story',
    funnel: 'Direct Book',
    callType: 'dm_close',
    dmClose: true,
    callNotes: 'DM close. PIF.',
    salesCallRecordingUrl: '',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l9',
    closedDate: '2026-04-16',
  },
  {
    id: 'l10',
    name: 'Quinn Foster',
    email: 'quinn.f@email.com',
    appointmentDatetime: '2026-04-14T12:00:00Z',
    status: 'closed',
    setter: 'Carlos',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'PIF.',
    salesCallRecordingUrl: 'https://example.com/recordings/l10',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l10',
    closedDate: '2026-04-14',
  },
  // DEPOSITS
  {
    id: 'l11',
    name: 'Blake Chen',
    email: 'blake.c@email.com',
    appointmentDatetime: '2026-04-28T15:00:00Z',
    status: 'deposit',
    setter: 'Austin',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Left deposit. Following up next week.',
    salesCallRecordingUrl: 'https://example.com/recordings/l11',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l11',
  },
  {
    id: 'l12',
    name: 'Skylar Webb',
    email: 'skylar.w@email.com',
    appointmentDatetime: '2026-04-26T13:00:00Z',
    status: 'deposit',
    setter: 'Brandon',
    platform: 'Instagram',
    source: 'instagram',
    medium: 'organic',
    campaign: 'reselling',
    content: 'lambo-reveal',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Deposit down. Needs to talk to wife.',
    salesCallRecordingUrl: 'https://example.com/recordings/l12',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l12',
  },
  // NO CLOSE
  {
    id: 'l13',
    name: 'Jamie Park',
    email: 'jamie.p@email.com',
    appointmentDatetime: '2026-04-23T14:00:00Z',
    status: 'no_close',
    setter: 'Austin',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: 'case-study',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Not the right fit. Already has a business.',
    salesCallRecordingUrl: 'https://example.com/recordings/l13',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l13',
  },
  // NO SHOW
  {
    id: 'l14',
    name: 'Reese Alvarez',
    email: 'reese.a@email.com',
    appointmentDatetime: '2026-04-29T16:00:00Z',
    status: 'no_show',
    setter: 'Diana',
    platform: 'Instagram',
    source: 'instagram',
    medium: 'organic',
    campaign: 'reselling',
    content: 'day-in-life',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: '',
    salesCallRecordingUrl: '',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l14',
  },
  // CANCELLED
  {
    id: 'l15',
    name: 'Test Lead',
    email: 'test@email.com',
    appointmentDatetime: '2026-04-29T15:00:00Z',
    status: 'cancelled',
    setter: 'Austin',
    platform: 'YouTube',
    source: 'youtube',
    medium: 'organic',
    campaign: 'reselling',
    content: '47k-breakdown',
    funnel: 'Direct Book',
    callType: 'live',
    dmClose: false,
    callNotes: 'Cancelled 2 hours before.',
    salesCallRecordingUrl: '',
    postCallFormUrl: 'https://forms.example.com/post-call?lead=l15',
  },
];

export const mockPayments: Payment[] = [
  { id: 'p1', leadId: 'l1', leadName: 'Alex Rivera', leadEmail: 'alex.r@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'fanbasis', firstPaymentDate: '2026-04-27', depositOnly: false, weekNumber: 1 },
  { id: 'p2', leadId: 'l2', leadName: 'Morgan Lee', leadEmail: 'morgan.l@email.com', revenue: 8000, collected: 6000, paymentPlatform: 'stripe', firstPaymentDate: '2026-04-25', depositOnly: false, weekNumber: 1 },
  { id: 'p3', leadId: 'l3', leadName: 'Jordan Kim', leadEmail: 'jordan.k@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'fanbasis', firstPaymentDate: '2026-04-24', depositOnly: false, weekNumber: 1 },
  { id: 'p4', leadId: 'l4', leadName: 'Taylor Nguyen', leadEmail: 'taylor.n@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'zelle', firstPaymentDate: '2026-04-22', depositOnly: false, weekNumber: 2 },
  { id: 'p5', leadId: 'l5', leadName: 'Casey Patel', leadEmail: 'casey.p@email.com', revenue: 8000, collected: 4000, paymentPlatform: 'stripe', firstPaymentDate: '2026-04-21', depositOnly: false, weekNumber: 2 },
  { id: 'p6', leadId: 'l6', leadName: 'Riley Zhang', leadEmail: 'riley.z@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'fanbasis', firstPaymentDate: '2026-04-20', depositOnly: false, weekNumber: 2 },
  { id: 'p7', leadId: 'l7', leadName: 'Sam Okonkwo', leadEmail: 'sam.o@email.com', revenue: 8000, collected: 6000, paymentPlatform: 'financing', firstPaymentDate: '2026-04-19', depositOnly: false, weekNumber: 3 },
  { id: 'p8', leadId: 'l8', leadName: 'Drew Morales', leadEmail: 'drew.m@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'fanbasis', firstPaymentDate: '2026-04-18', depositOnly: false, weekNumber: 3 },
  { id: 'p9', leadId: 'l9', leadName: 'Avery Thomas', leadEmail: 'avery.t@email.com', revenue: 7000, collected: 7000, paymentPlatform: 'zelle', firstPaymentDate: '2026-04-16', depositOnly: false, weekNumber: 3 },
  { id: 'p10', leadId: 'l10', leadName: 'Quinn Foster', leadEmail: 'quinn.f@email.com', revenue: 8000, collected: 8000, paymentPlatform: 'fanbasis', firstPaymentDate: '2026-04-14', depositOnly: false, weekNumber: 4 },
  { id: 'p11', leadId: 'l11', leadName: 'Blake Chen', leadEmail: 'blake.c@email.com', revenue: 8000, collected: 1000, paymentPlatform: 'stripe', firstPaymentDate: '2026-04-28', depositOnly: true, weekNumber: 1 },
  { id: 'p12', leadId: 'l12', leadName: 'Skylar Webb', leadEmail: 'skylar.w@email.com', revenue: 8000, collected: 1000, paymentPlatform: 'zelle', firstPaymentDate: '2026-04-26', depositOnly: true, weekNumber: 1 },
];

export function computeAfterFees(payments: Payment[]): number {
  return payments.reduce((acc, p) => {
    const rate = FEE_RATES[p.paymentPlatform] ?? 0;
    return acc + p.collected * (1 - rate);
  }, 0);
}

export function filterLeads(leads: Lead[], filters: Partial<Record<string, string>>): Lead[] {
  return leads.filter((l) => {
    if (filters.setter && filters.setter !== 'All' && l.setter !== filters.setter) return false;
    if (filters.platform && filters.platform !== 'All' && l.platform !== filters.platform) return false;
    if (filters.source && filters.source !== 'All' && l.source !== filters.source) return false;
    if (filters.content && filters.content !== 'All' && l.content !== filters.content) return false;
    if (filters.funnel && filters.funnel !== 'All' && l.funnel !== filters.funnel) return false;
    if (filters.dmClose === 'yes' && !l.dmClose) return false;
    if (filters.dmClose === 'no' && l.dmClose) return false;
    return true;
  });
}

export function computeMetrics(leads: Lead[], payments: Payment[]) {
  const closedLeads = leads.filter((l) => l.status === 'closed' || l.status === 'deposit');
  const closedLeadIds = new Set(closedLeads.map((l) => l.id));
  const relevantPayments = payments.filter((p) => closedLeadIds.has(p.leadId));

  const totalRevenue = relevantPayments.reduce((a, p) => a + p.revenue, 0);
  const totalCollected = relevantPayments.reduce((a, p) => a + p.collected, 0);
  const afterFees = computeAfterFees(relevantPayments);
  const toBeCollected = totalRevenue - totalCollected;

  const liveCalls = leads.filter((l) => l.callType === 'live' || l.status !== 'no_show');
  const closedOnly = leads.filter((l) => l.status === 'closed');
  const deposits = leads.filter((l) => l.status === 'deposit');
  const noCloses = leads.filter((l) => l.status === 'no_close');
  const noShows = leads.filter((l) => l.status === 'no_show');
  const cancelled = leads.filter((l) => l.status === 'cancelled');
  const newCalls = leads.filter((l) => l.status === 'new_call');

  const totalBooked = leads.length;
  const totalLive = leads.filter((l) => l.status !== 'cancelled' && l.status !== 'new_call').length;
  const showCount = totalLive - noShows.length;
  const showRate = totalLive > 0 ? (showCount / totalLive) * 100 : 0;
  const noShowRate = totalLive > 0 ? (noShows.length / totalLive) * 100 : 0;
  const closeRate = showCount > 0 ? ((closedOnly.length + deposits.length) / showCount) * 100 : 0;
  const noCloseRate = showCount > 0 ? (noCloses.length / showCount) * 100 : 0;
  const cashPerCall = totalLive > 0 ? totalCollected / totalLive : 0;
  const aov = closedOnly.length + deposits.length > 0
    ? totalRevenue / (closedOnly.length + deposits.length)
    : 0;

  return {
    totalRevenueGenerated: totalRevenue,
    totalCashCollected: totalCollected,
    cashCollectedAfterFees: afterFees,
    cashToBeCollected: toBeCollected,
    cashPerCallTaken: cashPerCall,
    averageOrderValue: aov,
    monthlyGoal: MONTHLY_GOAL,
    totalBookedCalls: totalBooked,
    totalLiveCalls: totalLive,
    totalCancelled: cancelled.length,
    totalNew: newCalls.length,
    closedCalls: closedOnly.length,
    deposits: deposits.length,
    noCloses: noCloses.length,
    noShows: noShows.length,
    closeRate,
    noCloseRate,
    showRate,
    noShowRate,
  };
}
