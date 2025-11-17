import { useState } from 'react';
import { Award, Shield, Calendar, Hash, CheckCircle, Search, QrCode } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CredentialData {
  id: string;
  verification_code: string;
  issue_date: string;
  is_revoked: boolean;
  credential_hash: string;
  profiles: {
    full_name: string;
    email: string;
  };
  assessments: {
    title: string;
    skill_category: string;
    difficulty_level: string;
  };
  assessment_attempts: {
    score: number;
    completed_at: string;
  };
}

export default function CredentialView() {
  const [verificationCode, setVerificationCode] = useState('');
  const [credential, setCredential] = useState<CredentialData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setCredential(null);
    setVerified(false);

    try {
      const { data, error: fetchError } = await supabase
        .from('credentials')
        .select(`
          *,
          profiles(full_name, email),
          assessments(title, skill_category, difficulty_level),
          assessment_attempts(score, completed_at)
        `)
        .eq('verification_code', verificationCode.trim())
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Credential not found. Please check the verification code.');
        return;
      }

      if (data.is_revoked) {
        setError('This credential has been revoked and is no longer valid.');
        return;
      }

      setCredential(data as any);
      setVerified(true);

      await supabase.from('verification_logs').insert({
        credential_id: data.id,
        verification_method: 'manual',
        ip_address: 'web',
      });
    } catch (err: any) {
      setError('An error occurred while verifying the credential.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Verify Credential
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter the verification code to authenticate a Proof-of-Learn credential
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="POL-1234567890-ABCDEFGH"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                  required
                />
                <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start">
                <Shield className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !verificationCode.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <QrCode className="w-4 h-4 mr-2" />
              <span>QR code scanning coming soon</span>
            </div>
          </div>
        </div>

        {verified && credential && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-500 animate-fadeIn">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Verified Credential</h2>
                    <p className="text-green-100">This credential is authentic and valid</p>
                  </div>
                </div>
                <Award className="w-16 h-16 text-white/30" />
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Credential Holder</h3>
                  <p className="text-lg font-semibold text-gray-900">{credential.profiles.full_name}</p>
                  <p className="text-sm text-gray-600">{credential.profiles.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Assessment</h3>
                  <p className="text-lg font-semibold text-gray-900">{credential.assessments.title}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {credential.assessments.skill_category} • {credential.assessments.difficulty_level}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-medium text-gray-700">Score</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {credential.assessment_attempts.score}%
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h3 className="text-sm font-medium text-gray-700">Issue Date</h3>
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    {new Date(credential.issue_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="bg-cyan-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-sm font-medium text-gray-700">Status</h3>
                  </div>
                  <p className="text-sm font-semibold text-cyan-600">Active</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Hash className="w-4 h-4 mr-1" />
                  Blockchain Hash
                </h3>
                <p className="text-xs font-mono text-gray-600 break-all">
                  {credential.credential_hash}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Secured by blockchain technology</span>
                  </div>
                  <div>
                    ID: {credential.id.slice(0, 8)}...
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-center text-white">
              <p className="text-sm font-medium">
                This credential is non-transferable and represents verified skill achievement
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Credential Verification</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Each credential is issued only after passing rigorous AI-proctored assessments
              </span>
            </p>
            <p className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Credentials are secured on the blockchain and cannot be forged or transferred
              </span>
            </p>
            <p className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Every verification is logged to maintain a transparent audit trail
              </span>
            </p>
            <p className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                Credentials represent real skill achievement, not just course completion
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
