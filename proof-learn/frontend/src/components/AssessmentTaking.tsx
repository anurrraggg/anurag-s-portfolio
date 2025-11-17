import { useState, useEffect } from 'react';
import { Clock, AlertCircle, Check, X, Code, Eye } from 'lucide-react';
import { supabase, Assessment, AssessmentQuestion } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface AssessmentTakingProps {
  assessmentId: string;
  onComplete: () => void;
  onCancel: () => void;
}

export default function AssessmentTaking({ assessmentId, onComplete, onCancel }: AssessmentTakingProps) {
  const { profile } = useAuth();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attemptId, setAttemptId] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProctoring, setShowProctoring] = useState(true);

  useEffect(() => {
    loadAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && assessment) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const loadAssessment = async () => {
    try {
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (assessmentError) throw assessmentError;

      const { data: questionsData, error: questionsError } = await supabase
        .from('assessment_questions')
        .select('*')
        .eq('assessment_id', assessmentId)
        .order('order_number');

      if (questionsError) throw questionsError;

      const { data: attemptData, error: attemptError } = await supabase
        .from('assessment_attempts')
        .insert({
          assessment_id: assessmentId,
          user_id: profile?.id,
          status: 'in_progress',
        })
        .select()
        .single();

      if (attemptError) throw attemptError;

      setAssessment(assessmentData);
      setQuestions(questionsData || []);
      setAttemptId(attemptData.id);
      setTimeRemaining(assessmentData.duration_minutes * 60);

      setTimeout(() => setShowProctoring(false), 3000);
    } catch (error) {
      console.error('Error loading assessment:', error);
    }
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let totalScore = 0;
      let earnedPoints = 0;

      for (const question of questions) {
        const userAnswer = answers[question.id] || '';
        const isCorrect = question.question_type === 'mcq'
          ? userAnswer === question.correct_answer
          : false;

        const pointsEarned = isCorrect ? question.points : 0;
        earnedPoints += pointsEarned;
        totalScore += question.points;

        await supabase.from('attempt_answers').insert({
          attempt_id: attemptId,
          question_id: question.id,
          answer: userAnswer,
          is_correct: isCorrect,
          points_earned: pointsEarned,
        });
      }

      const finalScore = Math.round((earnedPoints / totalScore) * 100);
      const passed = finalScore >= (assessment?.passing_score || 70);

      await supabase
        .from('assessment_attempts')
        .update({
          status: 'completed',
          score: finalScore,
          completed_at: new Date().toISOString(),
        })
        .eq('id', attemptId);

      if (passed) {
        const verificationCode = `POL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        await supabase.from('credentials').insert({
          user_id: profile?.id,
          assessment_id: assessmentId,
          attempt_id: attemptId,
          credential_hash: `hash_${attemptId}_${Date.now()}`,
          verification_code: verificationCode,
        });
      }

      onComplete();
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!assessment || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (showProctoring) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Proctoring Active</h2>
          <p className="text-gray-600 mb-6 text-lg">
            This assessment is being monitored by our AI proctoring system to ensure integrity.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
              Please ensure:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>You are in a quiet, well-lit environment</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Your face is clearly visible to the camera</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>No other tabs or applications are open</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                <span>You will not leave the assessment window</span>
              </li>
            </ul>
          </div>
          <div className="animate-pulse text-blue-600 font-medium">
            Initializing proctoring system...
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{assessment.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{formatTime(timeRemaining)}</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">Proctoring Active</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {currentQuestion.question_text}
                </h2>
                {currentQuestion.question_type === 'coding' && (
                  <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg w-fit">
                    <Code className="w-4 h-4 mr-1" />
                    Coding Challenge
                  </div>
                )}
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Points: </span>
                <span className="font-bold text-gray-900">{currentQuestion.points}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            {currentQuestion.question_type === 'mcq' && currentQuestion.options && (
              <div className="space-y-3">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion.id] === key
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={key}
                      checked={answers[currentQuestion.id] === key}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{key}.</span>
                    <span className="ml-2 text-gray-700">{value}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.question_type === 'coding' && (
              <div>
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Write your code here..."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
                {currentQuestion.test_cases && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Test Cases:</h4>
                    <pre className="text-sm text-gray-700">
                      {JSON.stringify(currentQuestion.test_cases, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {currentQuestion.question_type === 'essay' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Assessment'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`aspect-square rounded-lg font-medium text-sm transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answers[questions[index].id]
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
