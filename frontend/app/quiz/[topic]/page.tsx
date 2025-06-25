"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BookOpen, Clock, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

// Mock quiz data
const quizData = {
  mathematics: {
    title: "Mathematics Quiz",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the derivative of x²?",
        options: ["2x", "x²", "2", "x"],
        correct: 0,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The area of a circle with radius r is ____.",
        answer: "πr²",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
      },
      {
        id: 4,
        type: "fill-blank",
        question: "The quadratic formula is x = ____.",
        answer: "(-b ± √(b²-4ac))/2a",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the value of π (pi) approximately?",
        options: ["3.14159", "2.71828", "1.41421", "1.73205"],
        correct: 0,
      },
    ],
  },
  science: {
    title: "Science Quiz",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The speed of light in vacuum is approximately ____ m/s.",
        answer: "3×10⁸",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correct: 1,
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const topic = params.topic as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const quiz = quizData[topic as keyof typeof quizData]

  useEffect(() => {
    if (!quiz) {
      router.push("/dashboard")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (question.type === "multiple-choice") {
        if (Number.parseInt(userAnswer) === question.correct) {
          correct++
        }
      } else if (question.type === "fill-blank") {
        if (userAnswer?.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
          correct++
        }
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsCompleted(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  if (!quiz) {
    return <div>Loading...</div>
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-2">{score}%</p>
              <p className="text-gray-600">Your Score</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                You answered {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length}{" "}
                questions correctly
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push("/dashboard")} className="flex-1">
                Back to Dashboard
              </Button>
              <Button onClick={() => router.push("/profile")} variant="outline" className="flex-1">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">{quiz.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === "multiple-choice" ? (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="fill-answer" className="text-base">
                  Your Answer:
                </Label>
                <Input
                  id="fill-answer"
                  placeholder="Type your answer here..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="text-base p-3"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-3">
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz} className="gap-2">
                Submit Quiz
                <CheckCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Question Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {quiz.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : answers[index + 1] ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className="aspect-square p-0"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
