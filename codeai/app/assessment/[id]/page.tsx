'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Assessment({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testStarted, setTestStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(7200)

  const questions = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    },
    {
      id: 2,
      type: 'mcq',
      question: 'Which of the following is NOT a React hook?',
      options: ['useState', 'useEffect', 'useRender', 'useContext'],
    },
    {
      id: 3,
      type: 'coding',
      question: 'Write a function that returns the sum of two numbers.',
      placeholder: 'function sum(a, b) {\n  // Your code here\n}',
    },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition font-medium">
          ← Back to Dashboard
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl font-bold mb-6">Assessment Instructions</h1>

            <div className="space-y-4 mb-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Eye-Tracking Active</p>
                  <p className="text-xs text-muted-foreground">Your eye movements are monitored to ensure engagement</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM2 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.757 4.343a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Keystroke Analysis</p>
                  <p className="text-xs text-muted-foreground">Behavioral patterns are analyzed to prevent cheating</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Full-Screen Required</p>
                  <p className="text-xs text-muted-foreground">You must remain in full-screen mode throughout the test</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Assessment Details</h2>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">120 minutes</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-semibold">{questions.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Passing Score</p>
                  <p className="font-semibold">70%</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">Cancel</Button>
              </Link>
              <button onClick={() => setTestStarted(true)} className="flex-1">
                <Button className="w-full">Start Assessment</Button>
              </button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-card border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.415 1.415L9 10.414V6z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Time Remaining: {formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-8 border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

          {question.type === 'mcq' && (
            <div className="space-y-3 mb-8">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setAnswers({ ...answers, [currentQuestion]: option })}
                  className={`w-full p-4 text-left border rounded-lg transition ${
                    answers[currentQuestion] === option
                      ? 'border-primary bg-primary/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-primary'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'coding' && (
            <div className="mb-8">
              <textarea
                value={answers[currentQuestion] || ''}
                onChange={(e) => setAnswers({ ...answers, [currentQuestion]: e.target.value })}
                placeholder={question.placeholder}
                className="w-full h-48 p-4 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input transition"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            {isLastQuestion ? (
              <Link href="/assessment/results">
                <Button>Submit Assessment</Button>
              </Link>
            ) : (
              <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
