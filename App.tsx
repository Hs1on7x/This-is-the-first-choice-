
import React, { useState } from 'react';
import { ScreenType, UserProfile, AccountType, ConsultationSession, ContractDraft, ContractParty, ContractFile, FinancialTerms, DisputeCase, Installment, SubscriptionPlan } from './types';

// Auth & Setup
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import ProfileSetup from './components/ProfileSetup';
import KYCVerification from './components/KYCVerification';

// Core
import Dashboard from './components/Dashboard';
import NotificationsScreen from './components/NotificationsScreen';
import SettingsScreen from './components/SettingsScreen';
import HelpSupportScreen from './components/HelpSupportScreen';

// Consultations
import ChatAIScreen from './components/ChatAIScreen';
import AISessionPayment from './components/AISessionPayment';
import AISessionConfirmation from './components/AISessionConfirmation';
import SubscriptionManagement from './components/SubscriptionManagement';
import HumanConsultationRequest from './components/HumanConsultationRequest';
import LawyerSelectionScreen from './components/LawyerSelectionScreen';
import LawyerFullProfileScreen from './components/LawyerFullProfileScreen';
import WaitingRoom from './components/WaitingRoom';
import LiveConsultationRoom from './components/LiveConsultationRoom';
import ConsultationSummary from './components/ConsultationSummary';

// Contracts Flow
import ContractTypeSelection from './components/ContractTypeSelection';
import ContractPartiesSetup from './components/ContractPartiesSetup';
import PartyLegalProfileScreen from './components/PartyLegalProfileScreen';
import ContractTermsScreen from './components/ContractTermsScreen';
import ContractDocumentsScreen from './components/ContractDocumentsScreen';
import AIContractGenerationScreen from './components/AIContractGenerationScreen';
import SmartContractEditorScreen from './components/SmartContractEditorScreen';
import AIContractRiskAnalysisScreen from './components/AIContractRiskAnalysisScreen';
import ContractNegotiationScreen from './components/ContractNegotiationScreen';
import ContractFinancialTermsScreen from './components/ContractFinancialTermsScreen';
import ContractFinalReview from './components/ContractFinalReview';
import PaymentBeforeSignature from './components/PaymentBeforeSignature';
import DigitalSignatureCeremony from './components/DigitalSignatureCeremony';
import ContractStatusDashboard from './components/ContractStatusDashboard';
import MonitoringScreen from './components/MonitoringScreen';

// Disputes Flow
import DisputeManagerScreen from './components/DisputeManagerScreen';
import OpenDispute from './components/OpenDispute';
import DisputeEvaluationScreen from './components/DisputeEvaluationScreen';
import DisputeEvidenceExchange from './components/DisputeEvidenceExchange';
import DisputeResolutionDecision from './components/DisputeResolutionDecision';

// Financial & Escrow
import DigitalWallet from './components/DigitalWallet';
import EscrowManagementDashboard from './components/EscrowManagementDashboard';
import PaymentDetailsScreen from './components/PaymentDetailsScreen';
import ContractTransactionsScreen from './components/ContractTransactionsScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.WELCOME);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    emailOrPhone: '',
    accountType: AccountType.INDIVIDUAL,
    kycStatus: 'unverified'
  });
  
  const [walletBalance, setWalletBalance] = useState(45250);
  const [activeDispute, setActiveDispute] = useState<any>(null);
  const [contractDraft, setContractDraft] = useState<Partial<ContractDraft>>({ id: 'CON-' + Math.floor(Math.random()*10000), parties: [], documents: [] });
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [selectedParty, setSelectedParty] = useState<ContractParty | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [activeSession, setActiveSession] = useState<ConsultationSession | null>(null);
  
  const [consultationContext, setConsultationContext] = useState<any>(null);

  const navigateTo = (screen: ScreenType, data?: any) => {
    if (data) {
      if (screen === ScreenType.PAYMENT_DETAILS) setSelectedInstallment(data);
      if (screen === ScreenType.LAWYER_FULL_PROFILE) setSelectedLawyer(data);
      if (screen === ScreenType.PARTY_LEGAL_PROFILE) setSelectedParty(data);
      if (screen === ScreenType.LIVE_CONSULTATION) setActiveSession(data);
      if (screen === ScreenType.DISPUTE_RESOLUTION_DECISION) setActiveDispute(data);
      if (screen === ScreenType.AI_SESSION_PAYMENT) setSelectedPlan(data);
    }
    setCurrentScreen(screen);
  };

  const handlePaymentSuccess = () => {
    if (consultationContext) {
      setConsultationContext({ ...consultationContext, isPaid: true });
      setCurrentScreen(ScreenType.LAWYER_SELECTION);
    } else {
      setCurrentScreen(ScreenType.DASHBOARD);
    }
  };

  const handleAISubscriptionSuccess = (plan: SubscriptionPlan) => {
    // In a real app, update user package state
    setWalletBalance(prev => prev - plan.price);
    localStorage.setItem('ai_sessions_count', '0'); // Reset free sessions counter as they have a plan now
    setCurrentScreen(ScreenType.CHAT_AI);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.WELCOME:
        return <WelcomeScreen onNext={() => navigateTo(ScreenType.SIGN_UP)} onLogin={() => navigateTo(ScreenType.LOGIN)} onGuest={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.SIGN_UP:
        return <SignUpScreen onBack={() => navigateTo(ScreenType.WELCOME)} onSuccess={(d) => { setUserProfile({...userProfile, ...d}); navigateTo(ScreenType.PROFILE_SETUP); }} />;
      case ScreenType.LOGIN:
        return <LoginScreen onBack={() => navigateTo(ScreenType.WELCOME)} onSuccess={(d) => { setUserProfile({...userProfile, ...d}); navigateTo(ScreenType.DASHBOARD); }} />;
      case ScreenType.PROFILE_SETUP:
        return <ProfileSetup accountType={userProfile.accountType} onComplete={(d) => { setUserProfile({...userProfile, ...d}); navigateTo(ScreenType.KYC_VERIFICATION); }} onSkip={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.KYC_VERIFICATION:
        return <KYCVerification onBack={() => navigateTo(ScreenType.DASHBOARD)} onComplete={(status) => { setUserProfile({...userProfile, kycStatus: status}); navigateTo(ScreenType.DASHBOARD); }} />;

      case ScreenType.DASHBOARD:
        return <Dashboard user={userProfile} onLogout={() => navigateTo(ScreenType.WELCOME)} onNavigate={navigateTo} />;
      
      // Consultation Flow
      case ScreenType.CHAT_AI:
        return <ChatAIScreen user={userProfile} onBack={() => navigateTo(ScreenType.DASHBOARD)} onFinish={() => navigateTo(ScreenType.DASHBOARD)} onNavigate={navigateTo} />;
      case ScreenType.AI_SESSION_PAYMENT:
        return <AISessionPayment sessionsUsed={3} onBack={() => navigateTo(ScreenType.CHAT_AI)} onSelect={(plan) => { setSelectedPlan(plan); navigateTo(ScreenType.PAYMENT_CONFIRMATION, plan); }} />;
      case ScreenType.PAYMENT_CONFIRMATION:
        return <AISessionConfirmation plan={selectedPlan!} walletBalance={walletBalance} onBack={() => navigateTo(ScreenType.AI_SESSION_PAYMENT)} onSuccess={handleAISubscriptionSuccess} onChargeWallet={() => navigateTo(ScreenType.WALLET)} />;
      case ScreenType.SUBSCRIPTION_MANAGEMENT:
        return <SubscriptionManagement onBack={() => navigateTo(ScreenType.SETTINGS)} onNavigate={navigateTo} />;
      case ScreenType.REQUEST_HUMAN_CONSULT:
        return <HumanConsultationRequest onBack={() => navigateTo(ScreenType.DASHBOARD)} onSelectDirect={(details) => { setConsultationContext(details); navigateTo(ScreenType.PAYMENT_DETAILS, { amount: details.price, condition: `استشارة بخصوص ${details.title}`, dueDate: 'الآن' }); }} />;
      case ScreenType.LAWYER_SELECTION:
        return <LawyerSelectionScreen consultationDetails={consultationContext} onBack={() => navigateTo(ScreenType.DASHBOARD)} onSelectLawyer={(l) => navigateTo(ScreenType.LAWYER_FULL_PROFILE, l)} />;
      case ScreenType.LAWYER_FULL_PROFILE:
        return <LawyerFullProfileScreen lawyer={selectedLawyer} isPaid={consultationContext?.isPaid} onBack={() => navigateTo(ScreenType.LAWYER_SELECTION)} onConfirmSelection={(l) => { setActiveSession({ id: 'SESS-1', type: consultationContext?.type || 'text', specialty: consultationContext?.specialty || 'عام', status: 'pending', lawyerName: l.name, lawyerAvatar: l.avatar }); navigateTo(ScreenType.WAITING_ROOM); }} />;
      case ScreenType.WAITING_ROOM:
        return <WaitingRoom session={activeSession!} onMatched={(l) => navigateTo(ScreenType.LIVE_CONSULTATION, { ...activeSession, ...l })} onCancel={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.LIVE_CONSULTATION:
        return <LiveConsultationRoom session={activeSession!} onEnd={() => navigateTo(ScreenType.CONSULTATION_SUMMARY)} />;
      case ScreenType.CONSULTATION_SUMMARY:
        return <ConsultationSummary session={activeSession!} onDone={() => navigateTo(ScreenType.DASHBOARD)} onAction={(a) => navigateTo(a === 'contract' ? ScreenType.CONTRACT_SELECT_TYPE : ScreenType.DASHBOARD)} />;

      // Contracts Flow
      case ScreenType.CONTRACT_SELECT_TYPE:
        return <ContractTypeSelection onBack={() => navigateTo(ScreenType.DASHBOARD)} onSelect={(type) => { setContractDraft({...contractDraft, type}); navigateTo(ScreenType.CONTRACT_PARTIES_SETUP); }} />;
      case ScreenType.CONTRACT_PARTIES_SETUP:
        return <ContractPartiesSetup draft={contractDraft as any} user={userProfile} onBack={() => navigateTo(ScreenType.CONTRACT_SELECT_TYPE)} onNext={(parties) => { setContractDraft({...contractDraft, parties}); navigateTo(ScreenType.CONTRACT_TERMS); }} onNavigate={navigateTo} />;
      case ScreenType.PARTY_LEGAL_PROFILE:
        return <PartyLegalProfileScreen party={selectedParty!} onBack={() => navigateTo(ScreenType.CONTRACT_PARTIES_SETUP)} onAddAsParty={(p) => { setContractDraft({...contractDraft, parties: [...(contractDraft.parties || []), p]}); navigateTo(ScreenType.CONTRACT_PARTIES_SETUP); }} onNavigate={navigateTo} />;
      case ScreenType.CONTRACT_TERMS:
        return <ContractTermsScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_PARTIES_SETUP)} onNext={(terms) => { setContractDraft({...contractDraft, terms}); navigateTo(ScreenType.CONTRACT_DOCUMENTS); }} />;
      case ScreenType.CONTRACT_DOCUMENTS:
        return <ContractDocumentsScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_TERMS)} onNext={(docs) => { setContractDraft({...contractDraft, documents: docs}); navigateTo(ScreenType.AI_CONTRACT_GENERATION); }} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.AI_CONTRACT_GENERATION:
        return <AIContractGenerationScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_DOCUMENTS)} onFinish={(text) => { setContractDraft({...contractDraft, generatedText: text}); navigateTo(ScreenType.SMART_CONTRACT_EDITOR); }} />;
      case ScreenType.SMART_CONTRACT_EDITOR:
        return <SmartContractEditorScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.AI_CONTRACT_GENERATION)} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} onNext={(text) => { setContractDraft({...contractDraft, generatedText: text}); navigateTo(ScreenType.AI_CONTRACT_RISK_ANALYSIS); }} />;
      case ScreenType.AI_CONTRACT_RISK_ANALYSIS:
        return <AIContractRiskAnalysisScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.SMART_CONTRACT_EDITOR)} onNext={() => navigateTo(ScreenType.CONTRACT_NEGOTIATION)} />;
      case ScreenType.CONTRACT_NEGOTIATION:
        return <ContractNegotiationScreen draft={contractDraft as any} user={userProfile} onBack={() => navigateTo(ScreenType.AI_CONTRACT_RISK_ANALYSIS)} onFinish={() => navigateTo(ScreenType.CONTRACT_FINANCIAL_TERMS)} />;
      case ScreenType.CONTRACT_FINANCIAL_TERMS:
        return <ContractFinancialTermsScreen draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_NEGOTIATION)} onNext={(fin) => { setContractDraft({...contractDraft, financials: fin}); navigateTo(ScreenType.CONTRACT_FINAL_REVIEW); }} />;
      case ScreenType.CONTRACT_FINAL_REVIEW:
        return <ContractFinalReview draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_FINANCIAL_TERMS)} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} onNext={() => navigateTo(ScreenType.PAYMENT_BEFORE_SIGNATURE)} />;
      case ScreenType.PAYMENT_BEFORE_SIGNATURE:
        return <PaymentBeforeSignature draft={contractDraft as any} onBack={() => navigateTo(ScreenType.CONTRACT_FINAL_REVIEW)} onSuccess={() => navigateTo(ScreenType.DIGITAL_SIGNATURE)} />;
      case ScreenType.DIGITAL_SIGNATURE:
        return <DigitalSignatureCeremony draft={contractDraft as any} user={userProfile} onBack={() => navigateTo(ScreenType.PAYMENT_BEFORE_SIGNATURE)} onFinish={() => navigateTo(ScreenType.CONTRACT_STATUS)} />;
      case ScreenType.CONTRACT_STATUS:
        return <ContractStatusDashboard onBack={() => navigateTo(ScreenType.DASHBOARD)} onOpenDispute={() => navigateTo(ScreenType.OPEN_DISPUTE)} onNavigate={navigateTo} />;
      case ScreenType.MONITORING:
        return <MonitoringScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} />;

      // Disputes Flow
      case ScreenType.DISPUTE_MANAGER:
        return <DisputeManagerScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} onNewDispute={() => navigateTo(ScreenType.OPEN_DISPUTE)} onEvaluate={() => navigateTo(ScreenType.DISPUTE_EVALUATION)} onNavigate={navigateTo} />;
      case ScreenType.OPEN_DISPUTE:
        return <OpenDispute onBack={() => navigateTo(ScreenType.DISPUTE_MANAGER)} onNext={(data, skip) => { setActiveDispute(data); navigateTo(skip ? ScreenType.DISPUTE_RESOLUTION_DECISION : ScreenType.DISPUTE_EVALUATION); }} />;
      case ScreenType.DISPUTE_EVALUATION:
        return <DisputeEvaluationScreen onBack={() => navigateTo(ScreenType.DISPUTE_MANAGER)} onNext={() => navigateTo(ScreenType.DISPUTE_EVIDENCE_EXCHANGE)} />;
      case ScreenType.DISPUTE_EVIDENCE_EXCHANGE:
        return <DisputeEvidenceExchange onBack={() => navigateTo(ScreenType.DISPUTE_MANAGER)} onFinish={() => navigateTo(ScreenType.DISPUTE_RESOLUTION_DECISION)} />;
      case ScreenType.DISPUTE_RESOLUTION_DECISION:
        return <DisputeResolutionDecision dispute={activeDispute} onBack={() => navigateTo(ScreenType.DASHBOARD)} onGoToContract={() => navigateTo(ScreenType.CONTRACT_STATUS)} />;

      // Financial
      case ScreenType.WALLET:
        return <DigitalWallet onBack={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.PAYMENT_DETAILS:
        return <PaymentDetailsScreen installment={selectedInstallment!} onBack={() => navigateTo(ScreenType.DASHBOARD)} onPay={handlePaymentSuccess} />;
      case ScreenType.ESCROW_DETAILS:
        return <EscrowManagementDashboard onBack={() => navigateTo(ScreenType.DASHBOARD)} onOpenDispute={() => navigateTo(ScreenType.OPEN_DISPUTE)} />;
      case ScreenType.CONTRACT_TRANSACTIONS:
        return <ContractTransactionsScreen contractName="عقد التوريد" onBack={() => navigateTo(ScreenType.DASHBOARD)} />;

      // Support
      case ScreenType.NOTIFICATIONS:
        return <NotificationsScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.SETTINGS:
        // Fix: added missing onNavigate prop to SettingsScreen
        return <SettingsScreen user={userProfile} onBack={() => navigateTo(ScreenType.DASHBOARD)} onLogout={() => navigateTo(ScreenType.WELCOME)} onNavigate={navigateTo} />;
      case ScreenType.HELP_SUPPORT:
        return <HelpSupportScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} />;

      default:
        return <Dashboard user={userProfile} onLogout={() => navigateTo(ScreenType.WELCOME)} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-['Cairo']">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
