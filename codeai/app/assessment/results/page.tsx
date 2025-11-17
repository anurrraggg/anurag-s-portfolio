'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AssessmentResults() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">Congratulations!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            You've successfully completed the assessment
          </p>

          {/* Score Display */}
          <div className="bg-card/50 border border-slate-200 dark:border-slate-800 rounded-lg p-8 mb-8">
            <p className="text-muted-foreground mb-2 text-sm">Your Score</p>
            <p className="text-6xl font-bold text-primary mb-2">94%</p>
            <p className="text-sm text-muted-foreground">Outstanding Performance</p>
          </div>

          {/* Details */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Questions Correct</p>
              <p className="text-2xl font-bold">47/50</p>
            </Card>
            <Card className="p-4 bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Time Taken</p>
              <p className="text-2xl font-bold">84 min</p>
            </Card>
            <Card className="p-4 bg-card/50">
              <p className="text-xs text-muted-foreground mb-1">Percentile Rank</p>
              <p className="text-2xl font-bold">98th</p>
            </Card>
          </div>

          {/* Credential Info */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="text-left">
                <p className="font-semibold text-sm mb-1">Soulbound Credential Created</p>
                <p className="text-xs text-muted-foreground">
                  Your blockchain-verified credential has been created and is now verifiable. Share your credential ID with employers.
                </p>
                <p className="text-xs font-mono text-primary mt-2">ID: 0x7f4c9d2e1a6b3f8c</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
            <Button className="flex-1">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" clipRule="evenodd" />
              </svg>
              Share Credential
            </Button>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 bg-card/50">
          <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>View your credential in your dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Share your credential ID with employers and educational institutions</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Explore additional assessments to expand your credentials</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
