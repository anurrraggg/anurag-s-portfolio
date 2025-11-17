'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')

  const features = [
    {
      title: 'AI-Validated Assessments',
      description: 'Proctored exams with eye-tracking, keystroke analysis, and real-time behavioral verification—ensuring every assessment is authentic.',
    },
    {
      title: 'Blockchain Credentials',
      description: 'Soulbound tokens that cannot be faked or transferred. Immutable proof of your genuine skills on a secure distributed ledger.',
    },
    {
      title: 'Instant Verification',
      description: 'One-click verification for employers and institutions. No more skepticism about credential authenticity.',
    },
    {
      title: 'Multi-Format Challenges',
      description: 'From coding tasks and MCQs to practical projects. Assess real competency, not just test-taking ability.',
    },
    {
      title: 'Anti-Cheating Technology',
      description: 'Advanced detection systems identify suspicious patterns, ensuring every credential represents genuine mastery.',
    },
    {
      title: 'Complete Transparency',
      description: 'Immutable audit trails on blockchain. Every step from assessment to credential issuance is verifiable.',
    },
  ]

  const steps = [
    { num: '1', title: 'Take Assessment', desc: 'Complete your proctored exam with AI monitoring and anti-cheating verification.' },
    { num: '2', title: 'Real-Time Analysis', desc: 'Eye-tracking and behavioral analysis confirm authentic performance throughout.' },
    { num: '3', title: 'Pass & Mint', desc: 'Receive your non-transferable Soulbound Credential instantly upon passing.' },
    { num: '4', title: 'Verify & Share', desc: 'Share your credential for instant verification by employers and institutions.' },
  ]

  const personas = [
    {
      title: 'For Learners',
      items: [
        'Build authentic credentials that employers actually trust',
        'Prove your skills definitively in competitive markets',
        'Create an immutable record of your genuine abilities',
        'Stand out with real proof instead of certificates',
      ],
    },
    {
      title: 'For Employers',
      items: [
        'Verify candidate skills with complete confidence',
        'Eliminate fake credentials from your hiring process',
        'Make informed decisions backed by real data',
        'Reduce hiring risk and improve team quality',
      ],
    },
    {
      title: 'For Institutions',
      items: [
        'Issue digitally verifiable credentials to graduates',
        'Enhance institutional reputation and credibility',
        'Streamline credential verification infrastructure',
        'Build trust in your educational programs',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5L15.2 6.2L13.9 7.5L10.5 4.1L7.1 7.5L5.8 6.2L10.5 1.5Z" />
                <path d="M3 10C3 6.7 5.7 4 9 4V6C6.8 6 5 7.8 5 10C5 12.2 6.8 14 9 14V16C5.7 16 3 13.3 3 10Z" />
                <path d="M18 10C18 13.3 15.3 16 12 16V14C14.2 14 16 12.2 16 10C16 7.8 14.2 6 12 6V4C15.3 4 18 6.7 18 10Z" />
              </svg>
            </div>
            Proof-of-Learn
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50 transition">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50 transition">How It Works</a>
            <a href="#for-all" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50 transition">For Everyone</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-3">NEXT-GENERATION SKILL VERIFICATION</p>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 text-balance">
                Real Skills.
                <span className="text-blue-600"> Real Trust.</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-lg text-balance leading-relaxed">
                Replace fake certificates with AI-validated proof of ability. Blockchain-secured credentials that employers and universities can verify instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signup">
                  <Button size="lg">Start Verification</Button>
                </Link>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-2xl blur-3xl" />
                <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 aspect-square flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <p className="text-center">
                    <span className="block text-sm text-slate-500 dark:text-slate-400">Verified Credentials</span>
                    <span className="block text-2xl font-bold text-blue-600 mt-1">Blockchain-Secured</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-600 mb-3">TECHNOLOGY</p>
            <h2 className="text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              We combine cutting-edge AI proctoring, blockchain security, and real-world assessments to create authentic, verifiable proof of ability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition border-slate-200 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-600 mb-3">PROCESS</p>
            <h2 className="text-4xl font-bold">The Path to Verified Skills</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-600/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section id="for-all" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-600 mb-3">FOR EVERYONE</p>
            <h2 className="text-4xl font-bold">Built for Your Needs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((persona, idx) => (
              <Card key={idx} className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-6">{persona.title}</h3>
                <ul className="space-y-4">
                  {persona.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">Join thousands building authentic proof of their abilities.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary">Create Account</Button>
            </Link>
            <Button size="lg" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-semibold mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5L15.2 6.2L13.9 7.5L10.5 4.1L7.1 7.5L5.8 6.2L10.5 1.5Z" />
                  </svg>
                </div>
                Proof-of-Learn
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">Real skills, real trust, real credentials.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">For Learners</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">For Employers</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">For Institutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Documentation</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Blog</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Privacy</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Terms</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <p>© 2025 Proof-of-Learn. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-blue-600 transition">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
