import React, { useState } from 'react';
import { ScreenType, UserProfile, AccountType, KYCStatus, ConsultationSession, ContractDraft, ContractParty, ContractFile, FinancialTerms } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import OTPVerification from './components/OTPVerification';
import ProfileSetup from './components/ProfileSetup';
import KYCVerification from './components/KYCVerification';
import Dashboard from './components/Dashboard';
import ChatAIScreen from './components/ChatAIScreen';
import HumanConsultationRequest from './components/HumanConsultationRequest';
import WaitingRoom from './components/WaitingRoom';
import LiveConsultationRoom from './components/LiveConsultationRoom';
import ConsultationSummary from './components/ConsultationSummary';
import ContractTypeSelection from './components/ContractTypeSelection';
import ContractPartiesSetup from './components/ContractPartiesSetup';
import ContractTermsScreen from './components/ContractTermsScreen';
import ContractDocumentsScreen from './components/ContractDocumentsScreen';
import AIContractGenerationScreen from './components/AIContractGenerationScreen';
import SmartContractEditorScreen from './components/SmartContractEditorScreen';
import AIContractRiskAnalysisScreen from './components/AIContractRiskAnalysisScreen';
import ContractNegotiationScreen from './components/ContractNegotiationScreen';
import ContractCommunicationScreen from './components/ContractCommunicationScreen';
import CommunicationAnalysisDashboard from './components/CommunicationAnalysisDashboard';
import ContractFinancialTermsScreen from './components/ContractFinancialTermsScreen';
import ContractAnalysisScreen from './components/ContractAnalysisScreen';
import DisputeManagerScreen from './components/DisputeManagerScreen';
import DisputeEvaluationScreen from './components/DisputeEvaluationScreen';
import MonitoringScreen from './components/MonitoringScreen';
import EscrowManagementDashboard from './components/EscrowManagementDashboard';
import DigitalWallet from './components/DigitalWallet';
import ContractFinalReview from './components/ContractFinalReview';
import DigitalSignatureCeremony from './components/DigitalSignatureCeremony';
import ContractStatusDashboard from './components/ContractStatusDashboard';
import OpenDispute from './components/OpenDispute';
import DisputeResolutionDecision from './components/DisputeResolutionDecision';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.WELCOME);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    emailOrPhone: '',
    accountType: AccountType.INDIVIDUAL,
    kycStatus: 'unverified'
  });
  
  const [activeSession, setActiveSession] = useState<ConsultationSession | null>(null);
  const [contractDraft, setContractDraft] = useState<Partial<ContractDraft>>({
    id: 'CON-1234',
    type: 'عقد خدمات تقنية',
    parties: [],
    terms: {},
    financials: {
      totalAmount: 50000,
      currency: 'SAR',
      paymentMethod: 'installments',
      installments: [{ id: '1', amount: 25000, dueDate: '2025-01-01', condition: 'عند التوقيع' }, { id: '2', amount: 25000, dueDate: '2025-02-01', condition: 'عند التسليم' }],
      vatApplicable: true,
      escrowEnabled: true,
      escrowConditions: ['موافقة الطرفين'],
      latePenaltyEnabled: true,
      penaltyType: 'percentage',
      penaltyValue: 0.1,
      penaltyCap: 5000,
      acceptedPaymentMethods: ['Apple Pay']
    }
  });

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleAuthSuccess = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ 
      ...prev, 
      ...data, 
      legalName: data.accountType === AccountType.COMPANY ? 'شركة الحلول التقنية' : 'محمد بن عبدالله',
      kycStatus: 'verified' 
    }));
    navigateTo(ScreenType.DASHBOARD);
  };

  const handleSignUpInit = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
    navigateTo(ScreenType.OTP_VERIFICATION);
  };

  const startContractDraft = (type: string) => {
    setContractDraft({ 
      id: Math.random().toString(36).substr(2, 9), 
      type, 
      documents: [], 
      parties: [
        { id: 'user', name: userProfile.legalName || 'أنت', role: 'الطرف الأول', isUser: true, status: 'registered' }
      ] 
    });
    navigateTo(ScreenType.CONTRACT_PARTIES_SETUP);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenType.WELCOME:
        return <WelcomeScreen onNext={() => navigateTo(ScreenType.SIGN_UP)} onLogin={() => navigateTo(ScreenType.LOGIN)} onGuest={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.SIGN_UP:
        return <SignUpScreen onBack={() => navigateTo(ScreenType.WELCOME)} onSuccess={handleSignUpInit} />;
      case ScreenType.LOGIN:
        return <LoginScreen onBack={() => navigateTo(ScreenType.WELCOME)} onSuccess={handleAuthSuccess} />;
      case ScreenType.OTP_VERIFICATION:
        return <OTPVerification target={userProfile.emailOrPhone} onBack={() => navigateTo(ScreenType.SIGN_UP)} onSuccess={() => navigateTo(ScreenType.PROFILE_SETUP)} onChangeTarget={() => navigateTo(ScreenType.SIGN_UP)} />;
      case ScreenType.PROFILE_SETUP:
        return <ProfileSetup accountType={userProfile.accountType} onComplete={(data) => { setUserProfile(prev => ({ ...prev, ...data })); navigateTo(ScreenType.KYC_VERIFICATION); }} onSkip={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.KYC_VERIFICATION:
        return <KYCVerification onComplete={(status) => { setUserProfile(prev => ({ ...prev, kycStatus: status })); navigateTo(ScreenType.DASHBOARD); }} onBack={() => navigateTo(ScreenType.PROFILE_SETUP)} />;
      case ScreenType.DASHBOARD:
        return <Dashboard user={userProfile} onLogout={() => navigateTo(ScreenType.WELCOME)} onNavigate={(screen) => navigateTo(screen)} />;
      case ScreenType.CHAT_AI:
        return <ChatAIScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} user={userProfile} onFinish={(session) => { setActiveSession(session); navigateTo(ScreenType.CONSULTATION_SUMMARY); }} onNavigate={navigateTo} />;
      case ScreenType.REQUEST_HUMAN_CONSULT:
        return <HumanConsultationRequest onBack={() => navigateTo(ScreenType.DASHBOARD)} onSubmit={(session) => { setActiveSession(session); navigateTo(ScreenType.WAITING_ROOM); }} />;
      case ScreenType.WAITING_ROOM:
        return <WaitingRoom session={activeSession!} onMatched={(lawyer) => { setActiveSession(prev => ({ ...prev!, lawyerName: lawyer.name, lawyerAvatar: lawyer.avatar, status: 'live' })); navigateTo(ScreenType.LIVE_CONSULTATION); }} onCancel={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.LIVE_CONSULTATION:
        return <LiveConsultationRoom session={activeSession!} onEnd={() => navigateTo(ScreenType.CONSULTATION_SUMMARY)} />;
      case ScreenType.CONSULTATION_SUMMARY:
        return <ConsultationSummary session={activeSession!} onDone={() => { setActiveSession(null); navigateTo(ScreenType.DASHBOARD); }} onAction={(action) => { if (action === 'contract') navigateTo(ScreenType.CONTRACT_SELECT_TYPE); if (action === 'dispute') navigateTo(ScreenType.DISPUTE_MANAGER); if (action === 'lawyer') navigateTo(ScreenType.REQUEST_HUMAN_CONSULT); }} />;
      case ScreenType.CONTRACT_SELECT_TYPE:
        return <ContractTypeSelection onBack={() => navigateTo(ScreenType.DASHBOARD)} onSelect={startContractDraft} />;
      case ScreenType.CONTRACT_PARTIES_SETUP:
        return <ContractPartiesSetup draft={contractDraft as ContractDraft} user={userProfile} onBack={() => navigateTo(ScreenType.CONTRACT_SELECT_TYPE)} onNext={(parties) => { setContractDraft(prev => ({ ...prev, parties })); navigateTo(ScreenType.CONTRACT_TERMS); }} />;
      case ScreenType.CONTRACT_TERMS:
        return <ContractTermsScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_PARTIES_SETUP)} onNext={(terms) => { setContractDraft(prev => ({ ...prev, terms })); navigateTo(ScreenType.CONTRACT_DOCUMENTS); }} />;
      case ScreenType.CONTRACT_DOCUMENTS:
        return <ContractDocumentsScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_TERMS)} onNext={(documents) => { setContractDraft(prev => ({ ...prev, documents })); navigateTo(ScreenType.AI_CONTRACT_GENERATION); }} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.AI_CONTRACT_GENERATION:
        return <AIContractGenerationScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_DOCUMENTS)} onFinish={(text, refs) => { setContractDraft(prev => ({ ...prev, generatedText: text, legalReferences: refs })); navigateTo(ScreenType.SMART_CONTRACT_EDITOR); }} />;
      case ScreenType.SMART_CONTRACT_EDITOR:
        return <SmartContractEditorScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.AI_CONTRACT_GENERATION)} onNext={(text) => { setContractDraft(prev => ({ ...prev, generatedText: text })); navigateTo(ScreenType.AI_CONTRACT_RISK_ANALYSIS); }} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.AI_CONTRACT_RISK_ANALYSIS:
        return <AIContractRiskAnalysisScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.SMART_CONTRACT_EDITOR)} onNext={() => navigateTo(ScreenType.CONTRACT_NEGOTIATION)} />;
      case ScreenType.CONTRACT_NEGOTIATION:
        return <ContractNegotiationScreen draft={contractDraft as ContractDraft} user={userProfile} onBack={() => navigateTo(ScreenType.AI_CONTRACT_RISK_ANALYSIS)} onFinish={() => navigateTo(ScreenType.CONTRACT_FINANCIAL_TERMS)} />;
      case ScreenType.CONTRACT_COMMUNICATION:
        return <ContractCommunicationScreen draft={contractDraft as ContractDraft} user={userProfile} onBack={() => navigateTo(ScreenType.COMMUNICATION_ANALYSIS)} />;
      case ScreenType.COMMUNICATION_ANALYSIS:
        return <CommunicationAnalysisDashboard draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_COMMUNICATION)} onOpenEditor={() => navigateTo(ScreenType.CONTRACT_FINANCIAL_TERMS)} />;
      case ScreenType.CONTRACT_FINANCIAL_TERMS:
        return <ContractFinancialTermsScreen draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_NEGOTIATION)} onNext={(financials) => { setContractDraft(prev => ({ ...prev, financials })); navigateTo(ScreenType.CONTRACT_FINAL_REVIEW); }} />;
      case ScreenType.CONTRACT_FINAL_REVIEW:
        return <ContractFinalReview draft={contractDraft as ContractDraft} onBack={() => navigateTo(ScreenType.CONTRACT_FINANCIAL_TERMS)} onNext={() => navigateTo(ScreenType.DIGITAL_SIGNATURE)} onSaveDraft={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.DIGITAL_SIGNATURE:
        return <DigitalSignatureCeremony draft={contractDraft as ContractDraft} user={userProfile} onBack={() => navigateTo(ScreenType.CONTRACT_FINAL_REVIEW)} onFinish={() => navigateTo(ScreenType.CONTRACT_STATUS)} />;
      case ScreenType.CONTRACT_STATUS:
        return <ContractStatusDashboard onBack={() => navigateTo(ScreenType.DASHBOARD)} onOpenDispute={() => navigateTo(ScreenType.OPEN_DISPUTE)} />;
      case ScreenType.OPEN_DISPUTE:
        return <OpenDispute onBack={() => navigateTo(ScreenType.CONTRACT_STATUS)} onConsult={() => navigateTo(ScreenType.CHAT_AI)} onSubmit={() => navigateTo(ScreenType.DISPUTE_RESOLUTION_DECISION)} />;
      case ScreenType.DISPUTE_RESOLUTION_DECISION:
        return <DisputeResolutionDecision onBack={() => navigateTo(ScreenType.DISPUTE_MANAGER)} onGoToContract={() => navigateTo(ScreenType.CONTRACT_STATUS)} />;
      case ScreenType.CONTRACT_ANALYSIS:
        return <ContractAnalysisScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.DISPUTE_MANAGER:
        return <DisputeManagerScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} onNewDispute={() => navigateTo(ScreenType.OPEN_DISPUTE)} onEvaluate={() => navigateTo(ScreenType.DISPUTE_EVALUATION)} />;
      case ScreenType.DISPUTE_EVALUATION:
        return <DisputeEvaluationScreen onBack={() => navigateTo(ScreenType.DISPUTE_MANAGER)} />;
      case ScreenType.MONITORING:
        return <MonitoringScreen onBack={() => navigateTo(ScreenType.DASHBOARD)} />;
      case ScreenType.ESCROW_MANAGEMENT:
        return <EscrowManagementDashboard onBack={() => navigateTo(ScreenType.DASHBOARD)} onOpenDispute={() => navigateTo(ScreenType.DISPUTE_MANAGER)} />;
      case ScreenType.WALLET:
        return <DigitalWallet onBack={() => navigateTo(ScreenType.DASHBOARD)} />;
      default:
        return <WelcomeScreen onNext={() => {}} onLogin={() => {}} onGuest={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
