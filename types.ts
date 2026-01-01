
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
  PARTY_LEGAL_PROFILE = 'PARTY_LEGAL_PROFILE',
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
  DISPUTE_EVIDENCE_EXCHANGE = 'DISPUTE_EVIDENCE_EXCHANGE',
  MONITORING = 'MONITORING',
  ESCROW_MANAGEMENT = 'ESCROW_MANAGEMENT',
  WALLET = 'WALLET',
  CONTRACT_FINAL_REVIEW = 'CONTRACT_FINAL_REVIEW',
  PAYMENT_BEFORE_SIGNATURE = 'PAYMENT_BEFORE_SIGNATURE',
  AI_SESSION_PAYMENT = 'AI_SESSION_PAYMENT',
  SUBSCRIPTION_MANAGEMENT = 'SUBSCRIPTION_MANAGEMENT',
  DIGITAL_SIGNATURE = 'DIGITAL_SIGNATURE',
  CONTRACT_STATUS = 'CONTRACT_STATUS',
  OPEN_DISPUTE = 'OPEN_DISPUTE',
  DISPUTE_RESOLUTION_DECISION = 'DISPUTE_RESOLUTION_DECISION',
  PAYMENT_DETAILS = 'PAYMENT_DETAILS',
  PAYMENT_CONFIRMATION = 'PAYMENT_CONFIRMATION',
  ESCROW_DETAILS = 'ESCROW_DETAILS',
  CONTRACT_TRANSACTIONS = 'CONTRACT_TRANSACTIONS',
  LAWYER_DASHBOARD = 'LAWYER_DASHBOARD',
  LAWYER_CONSULT_ROOM = 'LAWYER_CONSULT_ROOM',
  LAWYER_SCHEDULE = 'LAWYER_SCHEDULE',
  LAWYER_WALLET = 'LAWYER_WALLET',
  LAWYER_SELECTION = 'LAWYER_SELECTION',
  LAWYER_FULL_PROFILE = 'LAWYER_FULL_PROFILE',
  MEDIATOR_DASHBOARD = 'MEDIATOR_DASHBOARD',
  MEDIATOR_RESOLUTION_ROOM = 'MEDIATOR_RESOLUTION_ROOM',
  MEDIATOR_DECISION = 'MEDIATOR_DECISION',
  NOTIFICATIONS = 'NOTIFICATIONS',
  SETTINGS = 'SETTINGS',
  HELP_SUPPORT = 'HELP_SUPPORT'
}

export interface SubscriptionPlan {
  id: string;
  type: 'package' | 'subscription';
  name: string;
  price: number;
  sessions: number | 'unlimited';
  durationDays: number;
  description: string;
  isPopular?: boolean;
}

export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  LAWYER = 'LAWYER',
  MEDIATOR = 'MEDIATOR'
}

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'lawyer' | 'system' | 'negotiator' | 'counterparty' | 'mediator' | 'claimant' | 'defendant';
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
  licenseNumber?: string;
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
  userName?: string;
  userAvatar?: string;
  summaryData?: any;
  price?: number;
}

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'contract' | 'payment' | 'dispute' | 'system' | 'consult';
  unread: boolean;
}

export interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  condition: string;
  status: 'pending' | 'due_now' | 'paid' | 'overdue' | 'unlocked';
  paidAt?: string;
  escrowId?: string;
  penalty?: number;
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
  payer?: 'party1' | 'party2' | 'split' | 'auto';
}

export interface EscrowAccount {
  id: string;
  contractId: string;
  contractName: string;
  amount: number;
  status: 'held' | 'released' | 'disputed' | 'frozen_dispute' | 'reserved';
  reservedAt: string;
  expectedReleaseAt: string;
  durationDays: number;
  progress: number;
  releaseConditions?: { type: string; status: string; label: string }[];
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'earnings';
  amount: number;
  status: 'completed' | 'pending' | 'reserved' | 'failed';
  date: string;
  description: string;
  referenceId?: string;
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
  addressInfo?: {
    country: string;
    city: string;
    district: string;
    street: string;
    buildingNo: string;
    lat?: number;
    lng?: number;
    matchRate?: number;
    deedNo?: string;
    deedVerified?: boolean;
    propertyType?: string;
    area?: number;
    rooms?: number;
    floor?: number;
  };
}

export interface ContractParty {
  id: string;
  name: string;
  role: string; // The generic role (e.g. Party 1, Party 2)
  specificRole?: string; // The business role (e.g. Lessor, Tenant, Client, Provider)
  email?: string;
  phone?: string;
  status: 'registered' | 'pending' | 'manual';
  isUser: boolean;
  avatar?: string;
  rating?: number;
  completionRate?: number;
  contractCount?: number;
  share?: number; // For partnership contracts
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
  uploadedBy?: string; // Party ID
  isShared?: boolean;
  isConfirmedByOther?: boolean;
  aiAnalysis?: {
    summary: string;
    extractedInfo: string[];
    isMatch?: boolean;
    verificationDetails?: string;
  };
}

/**
 * Added missing member 'DisputeCase'
 */
export interface DisputeCase {
  id: string;
  title: string;
  type: string;
  status: string;
  claimantName: string;
  defendantName: string;
  successProbability: number;
  lastUpdate: string;
  nextStep: string;
  evidence: { type: string; title: string; aiInsight: string }[];
  subject?: string;
  description?: string;
}

/**
 * Added missing member 'ContractRisk'
 */
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

/**
 * Added missing member 'MissingClause'
 */
export interface MissingClause {
  label: string;
  status: 'present' | 'absent' | 'warning';
  importance: string;
  description: string;
}

/**
 * Added missing member 'ClauseAnalysis'
 */
export interface ClauseAnalysis {
  id: string;
  title: string;
  status: 'good' | 'warning' | 'critical';
  details: string[];
  recommendation?: string;
}

/**
 * Added missing member 'NegotiationProposal'
 */
export interface NegotiationProposal {
  id: string;
  clauseId: string;
  proposedBy: string;
  proposedText: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
  isOwn: boolean;
}

/**
 * Added missing member 'AnalysisReport'
 */
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
    status: string;
    parties: { role: string; stance: string }[];
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
