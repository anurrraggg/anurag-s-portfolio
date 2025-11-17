'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const credentials = [
    {
      id: 1,
      title: 'Advanced React Development',
      issuer: 'Tech Academy',
      date: '2024-10-15',
      score: 95,
    },
    {
      id: 2,
      title: 'Python for AI & ML',
      issuer: 'Learning Lab',
      date: '2024-09-20',
      score: 88,
    },
    {
      id: 3,
      title: 'Cloud Architecture Mastery',
      issuer: 'Cloud Institute',
      date: '2024-08-10',
      score: 92,
    },
  ]

  const upcomingAssessments = [
    {
      id: 1,
      title: 'TypeScript Advanced Patterns',
      date: '2024-12-01',
      duration: '120 mins',
    },
    {
      id: 2,
      title: 'Kubernetes Administration',
      date: '2024-12-05',
      duration: '90 mins',
    },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5L15.2 6.2L13.9 7.5L10.5 4.1L7.1 7.5L5.8 6.2L10.5 1.5Z" />
              </svg>
            </div>
            <span>Proof-of-Learn</span>
          </Link>
          <Button variant="outline" size="sm">
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-1 p-4 sm:p-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Alex</h1>
                <p className="text-slate-500 dark:text-slate-400">Your skill verification dashboard</p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Verified Credentials</p>
                  <p className="text-4xl font-bold text-blue-600">3</p>
                </Card>

                <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Average Score</p>
                  <p className="text-4xl font-bold text-blue-600">92%</p>
                </Card>

                <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Upcoming Assessments</p>
                  <p className="text-4xl font-bold text-blue-600">2</p>
                </Card>
              </div>

              {/* Credentials */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Verified Credentials</h2>
                <div className="space-y-3">
                  {credentials.map(cred => (
                    <Card key={cred.id} className="p-4 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{cred.title}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{cred.issuer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{cred.score}%</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{cred.date}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Upcoming Assessments</h2>
                <div className="space-y-3">
                  {upcomingAssessments.map(assessment => (
                    <Card key={assessment.id} className="p-4 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{assessment.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{assessment.date} • {assessment.duration}</p>
                      </div>
                      <Link href={`/assessment/${assessment.id}`}>
                        <Button size="sm">Start</Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credentials' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Your Credentials</h1>
              <div className="space-y-4">
                {credentials.map(cred => (
                  <Card key={cred.id} className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{cred.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{cred.issuer}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Issued: {cred.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{cred.score}%</div>
                        <Button size="sm" variant="outline">View Certificate</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Your Assessments</h1>
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingAssessments.map(assessment => (
                  <Card key={assessment.id} className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="text-lg font-semibold mb-4">{assessment.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Duration: {assessment.duration}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Scheduled: {assessment.date}</p>
                    <Link href={`/assessment/${assessment.id}`}>
                      <Button className="w-full">Start Assessment</Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <div className="space-y-6 max-w-2xl">
                <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Alex Johnson"
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="alex@example.com"
                        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition"
                      />
                    </div>
                    <Button>Save Changes</Button>
                  </form>
                </Card>

                <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
                  <h2 className="text-lg font-semibold mb-4">Security</h2>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
