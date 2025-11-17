import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import LearnerDashboard from './components/LearnerDashboard';
import AssessmentTaking from './components/AssessmentTaking';
import CredentialView from './components/CredentialView';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'verify' | 'admin' | 'assessment'>('dashboard');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Landing />;
  }

  if (selectedAssessmentId) {
    return (
      <AssessmentTaking
        assessmentId={selectedAssessmentId}
        onComplete={() => {
          setSelectedAssessmentId(null);
          setCurrentView('dashboard');
        }}
        onCancel={() => {
          setSelectedAssessmentId(null);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-6">
          {profile.role === 'learner' && (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                My Dashboard
              </button>
              <button
                onClick={() => setCurrentView('verify')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  currentView === 'verify'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Verify Credential
              </button>
            </>
          )}
          {profile.role === 'admin' && (
            <>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  currentView === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Admin Panel
              </button>
              <button
                onClick={() => setCurrentView('verify')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  currentView === 'verify'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Verify Credential
              </button>
            </>
          )}
          {profile.role === 'verifier' && (
            <button
              onClick={() => setCurrentView('verify')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                currentView === 'verify'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Verify Credential
            </button>
          )}
        </div>
      </div>

      {currentView === 'dashboard' && profile.role === 'learner' && <LearnerDashboard />}
      {currentView === 'verify' && <CredentialView />}
      {currentView === 'admin' && profile.role === 'admin' && <AdminPanel />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
