
export enum ScreenType {
  WELCOME = 'WELCOME',
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
  OTP_VERIFICATION = 'OTP_VERIFICATION',
  PROFILE_SETUP = 'PROFILE_SETUP',
  KYC_VERIFICATION = 'KYC_VERIFICATION',
  DASHBOARD = 'DASHBOARD',
  CHAT_AI = 'CHAT_AI',
  REQUEST_HUMAN_CONSULT = 'REQUEST_HUMAN_CONSULT',
  WAITING_ROOM = 'WAITING_ROOM',
  LIVE_CONSULTATION = 'LIVE_CONSULTATION',
  CONSULTATION_SUMMARY = 'CONSULTATION_SUMMARY',
  CONTRACT_SELECT_TYPE = 'CONTRACT_SELECT_TYPE',
  CONTRACT_PARTIES_SETUP = 'CONTRACT_PARTIES_SETUP',
  CONTRACT_TERMS = 'CONTRACT_TERMS',
  CONTRACT_DOCUMENTS = 'CONTRACT_DOCUMENTS',
  AI_CONTRACT_GENERATION = 'AI_CONTRACT_GENERATION',
  SMART_CONTRACT_EDITOR = 'SMART_CONTRACT_EDITOR',
  AI_CONTRACT_RISK_ANALYSIS = 'AI_CONTRACT_RISK_ANALYSIS',
  CONTRACT_NEGOTIATION = 'CONTRACT_NEGOTIATION',
  CONTRACT_COMMUNICATION = 'CONTRACT_COMMUNICATION',
  COMMUNICATION_ANALYSIS = 'COMMUNICATION_ANALYSIS',
  CONTRACT_FINANCIAL_TERMS = 'CONTRACT_FINANCIAL_TERMS',
  CONTRACT_ANALYSIS = 'CONTRACT_ANALYSIS',
  DISPUTE_MANAGER = 'DISPUTE_MANAGER',
  DISPUTE_EVALUATION = 'DISPUTE_EVALUATION',
  MONITORING = 'MONITORING',
  ESCROW_MANAGEMENT = 'ESCROW_MANAGEMENT',
  WALLET = 'WALLET',
  CONTRACT_FINAL_REVIEW = 'CONTRACT_FINAL_REVIEW',
  DIGITAL_SIGNATURE = 'DIGITAL_SIGNATURE',
  CONTRACT_STATUS = 'CONTRACT_STATUS',
  OPEN_DISPUTE = 'OPEN_DISPUTE',
  DISPUTE_RESOLUTION_DECISION = 'DISPUTE_RESOLUTION_DECISION'
}

export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY'
}

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'lawyer' | 'system' | 'negotiator' | 'counterparty';
  content: string;
  timestamp: Date;
  type?: 'text' | 'card' | 'suggestion' | 'file' | 'audio';
  metadata?: {
    fileInfo?: { name: string; size: string; type: string };
    audioDuration?: string;
    linkedClauseId?: string;
    linkedClauseTitle?: string;
    reactions?: string[];
    readStatus?: 'sent' | 'delivered' | 'read';
  };
}

export interface UserProfile {
  id?: string;
  emailOrPhone: string;
  accountType: AccountType;
  legalName?: string;
  country?: string;
  city?: string;
  companyName?: string;
  crNumber?: string;
  foundationDate?: string;
  interests?: string[];
  kycStatus?: KYCStatus;
}

export interface ConsultationSession {
  id: string;
  type: 'text' | 'audio' | 'video' | 'review';
  specialty: string;
  status: 'completed' | 'requesting' | 'live' | 'pending';
  lawyerName?: string;
  lawyerAvatar?: string;
  summaryData?: any;
}

export interface AnalysisReport {
  id: string;
  contractName: string;
  period: string;
  stats: {
    messages: number;
    agreements: number;
    disputes: number;
    amendments: number;
  };
  detectedAgreements: {
    id: string;
    date: string;
    content: string;
    source: { role: string; text: string }[];
  }[];
  detectedDisputes: {
    id: string;
    date: string;
    title: string;
    parties: { role: string; stance: string }[];
    status: 'unresolved' | 'resolved';
  }[];
  suggestedAmendments: {
    id: string;
    clauseId: string;
    clauseTitle: string;
    from: string;
    to: string;
    reason: string;
  }[];
  actionItems: { id: string; text: string; done: boolean }[];
  timeline: { date: string; event: string }[];
}

export interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  condition: string;
}

export interface FinancialTerms {
  totalAmount: number;
  currency: string;
  paymentMethod: 'single' | 'installments' | 'conditional';
  installments: Installment[];
  vatApplicable: boolean;
  escrowEnabled: boolean;
  escrowConditions: string[];
  latePenaltyEnabled: boolean;
  penaltyType: 'percentage' | 'fixed';
  penaltyValue: number;
  penaltyCap: number;
  acceptedPaymentMethods: string[];
}

export interface EscrowAccount {
  id: string;
  contractId: string;
  contractName: string;
  amount: number;
  status: 'reserved' | 'released' | 'disputed';
  reservedAt: string;
  expectedReleaseAt: string;
  durationDays: number;
  progress: number;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'reserved' | 'failed';
  date: string;
  description: string;
  referenceId?: string;
}

export interface LegalArticle {
  law: string;
  article: string;
  text: string;
  uri?: string;
  status?: 'linked' | 'missing' | 'warning';
}

export interface ContractRisk {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  clause: string;
  impact: string;
  recommendation: string;
  type: string;
}

export interface MissingClause {
  label: string;
  status: 'present' | 'absent' | 'warning';
  importance: 'ضروري' | 'مهم' | 'مستحسن';
  description: string;
}

export interface ClauseAnalysis {
  id: string;
  title: string;
  status: 'good' | 'warning' | 'critical';
  details: string[];
  recommendation?: string;
}

export interface NegotiationProposal {
  id: string;
  clauseId: string;
  proposedBy: string;
  proposedText: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
  isOwn?: boolean;
}

export interface ContractParty {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  status: 'registered' | 'pending' | 'manual';
  isUser: boolean;
}

export interface ContractFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'word' | 'excel';
  category: 'images' | 'docs' | 'quotes' | 'chats' | 'others';
  hash: string;
  timestamp: string;
  status: 'uploading' | 'analyzing' | 'done' | 'error';
  aiAnalysis?: {
    summary: string;
    extractedInfo: string[];
  };
}

export interface ContractDraft {
  id: string;
  type: string;
  parties: ContractParty[];
  terms?: any;
  financials?: FinancialTerms;
  documents?: ContractFile[];
  generatedText?: string;
  legalReferences?: string[];
  risks?: ContractRisk[];
}

export interface DisputeCase {
  id: string;
  title: string;
  type: string;
  status: 'court' | 'arbitration';
  successProbability: number;
  lastUpdate: string;
  nextStep: string;
  evidence: {
    type: 'doc' | 'chat' | 'file';
    title: string;
    aiInsight: string;
  }[];
}
