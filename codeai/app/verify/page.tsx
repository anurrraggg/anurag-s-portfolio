'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function VerifyCredential() {
  const [credentialId, setCredentialId] = useState('')
  const [verified, setVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setVerifying(false)
    setVerified(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-card/50 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5L15.2 6.2L13.9 7.5L10.5 4.1L7.1 7.5L5.8 6.2L10.5 1.5Z" />
              </svg>
            </div>
            Proof-of-Learn
          </Link>
          <p className="text-sm text-muted-foreground">Verify Blockchain Credentials</p>
        </div>
      </header>

      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Verify a Credential</h1>
            <p className="text-lg text-muted-foreground">
              Instantly verify any Soulbound credential issued on our platform
            </p>
          </div>

          {!verified ? (
            <Card className="p-8 border-slate-200 dark:border-slate-800">
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-3">Credential ID or Blockchain Hash</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="text"
                      value={credentialId}
                      onChange={(e) => setCredentialId(e.target.value)}
                      placeholder="0x7f4c9d2e1a6b3f8c or paste blockchain hash"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-background text-sm text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 11-2 0V5H5v10h4a1 1 0 110 2H4a1 1 0 01-1-1V4z" />
                  </svg>
                  <p className="text-sm text-muted-foreground mb-3">Scan QR Code</p>
                  <button type="button" className="text-primary text-sm hover:text-primary/80 font-medium transition">
                    Enable camera to scan
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={verifying}>
                  {verifying ? 'Verifying...' : 'Verify Credential'}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="p-8 border-slate-200 dark:border-slate-800">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Credential Verified</h2>
              <p className="text-center text-muted-foreground mb-8">
                This credential is authentic and has been verified on the blockchain
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Credential Title</p>
                  <p className="font-semibold">Advanced React Development</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Issued To</p>
                    <p className="font-semibold">Alex Johnson</p>
                  </div>
                  <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
                    <p className="font-semibold">2024-10-15</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Issuing Institution</p>
                    <p className="font-semibold">Tech Academy</p>
                  </div>
                  <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Score Achieved</p>
                    <p className="font-semibold text-primary">95%</p>
                  </div>
                </div>

                <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Blockchain Hash</p>
                  <p className="font-mono text-sm break-all">{credentialId}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm text-green-700">Non-Transferable Soulbound Token</p>
                    <p className="text-xs text-green-600/70">This credential is permanently bound to the holder and cannot be transferred or sold.</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => { setVerified(false); setCredentialId(''); }}>
                Verify Another Credential
              </Button>
            </Card>
          )}

          {/* Info Section */}
          <Card className="p-6 mt-8 bg-card/50">
            <h3 className="font-semibold mb-4">How Verification Works</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Each credential is stored as a non-transferable Soulbound token on the blockchain</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verification is instant and immutable—no forgery is possible</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Every credential includes the assessment score and completion date</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Anti-cheating data is part of the immutable record</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
