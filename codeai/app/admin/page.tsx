'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const assessments = [
    {
      id: 1,
      title: 'Advanced React Development',
      totalAssessments: 245,
      passRate: '78%',
      avgScore: '82',
      status: 'active',
    },
    {
      id: 2,
      title: 'Python for AI & ML',
      totalAssessments: 189,
      passRate: '71%',
      avgScore: '79',
      status: 'active',
    },
    {
      id: 3,
      title: 'Cloud Architecture Mastery',
      totalAssessments: 92,
      passRate: '85%',
      avgScore: '88',
      status: 'active',
    },
  ]

  const recentCredentials = [
    {
      id: 1,
      learner: 'Alex Johnson',
      assessment: 'Advanced React Development',
      score: 95,
      date: '2024-10-15',
      status: 'issued',
    },
    {
      id: 2,
      learner: 'Sarah Smith',
      assessment: 'Python for AI & ML',
      score: 88,
      date: '2024-10-14',
      status: 'issued',
    },
    {
      id: 3,
      learner: 'Mike Chen',
      assessment: 'Cloud Architecture Mastery',
      score: 92,
      date: '2024-10-13',
      status: 'pending',
    },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-card/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5L15.2 6.2L13.9 7.5L10.5 4.1L7.1 7.5L5.8 6.2L10.5 1.5Z" />
              </svg>
            </div>
            <span>Admin Dashboard</span>
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
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage assessments, users, and credentials</p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Total Assessments</p>
                  <p className="text-4xl font-bold text-primary">526</p>
                </Card>

                <Card className="p-6 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Active Learners</p>
                  <p className="text-4xl font-bold text-primary">1,247</p>
                </Card>

                <Card className="p-6 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Credentials Issued</p>
                  <p className="text-4xl font-bold text-primary">412</p>
                </Card>

                <Card className="p-6 bg-card/50">
                  <p className="text-sm text-muted-foreground mb-2">Avg Pass Rate</p>
                  <p className="text-4xl font-bold text-primary">78%</p>
                </Card>
              </div>

              {/* Recent Credentials */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Recent Credentials Issued</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left p-3 font-semibold">Learner</th>
                        <th className="text-left p-3 font-semibold">Assessment</th>
                        <th className="text-left p-3 font-semibold">Score</th>
                        <th className="text-left p-3 font-semibold">Date</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCredentials.map(cred => (
                        <tr key={cred.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-card/30 transition">
                          <td className="p-3">{cred.learner}</td>
                          <td className="p-3">{cred.assessment}</td>
                          <td className="p-3 font-semibold">{cred.score}%</td>
                          <td className="p-3">{cred.date}</td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              cred.status === 'issued'
                                ? 'bg-green-500/20 text-green-700'
                                : 'bg-yellow-500/20 text-yellow-700'
                            }`}>
                              {cred.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Manage Assessments</h1>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Assessment
                </Button>
              </div>

              <div className="space-y-4">
                {assessments.map(assessment => (
                  <Card key={assessment.id} className="p-6 bg-card/50 hover:bg-card/70 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{assessment.title}</h3>
                        <p className="text-sm text-muted-foreground">Status: {assessment.status}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </Button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Assessments</p>
                        <p className="text-xl font-bold">{assessment.totalAssessments}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pass Rate</p>
                        <p className="text-xl font-bold">{assessment.passRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-xl font-bold">{assessment.avgScore}%</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">User Management</h1>
              <Card className="p-6 bg-card/50">
                <p className="text-muted-foreground">User management features coming soon</p>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Settings</h1>
              <Card className="p-6 bg-card/50">
                <p className="text-muted-foreground">Settings management coming soon</p>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
