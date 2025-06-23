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

// Enhanced quiz data with subtopics
const quizData = {
  "mathematics/algebra": {
    title: "Algebra Quiz",
    subject: "Mathematics",
    subtopic: "Algebra",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Solve for x: 2x + 5 = 13",
        options: ["x = 4", "x = 6", "x = 8", "x = 9"],
        correct: 0,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The slope-intercept form of a linear equation is ____.",
        answer: "y = mx + b",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is the value of x² when x = -3?",
        options: ["6", "9", "-9", "-6"],
        correct: 1,
      },
      {
        id: 4,
        type: "fill-blank",
        question: "If f(x) = 2x + 1, then f(3) = ____.",
        answer: "7",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which of the following is a quadratic equation?",
        options: ["y = 2x + 1", "y = x² + 3x + 2", "y = 1/x", "y = √x"],
        correct: 1,
      },
    ],
  },
  "mathematics/geometry": {
    title: "Geometry Quiz",
    subject: "Mathematics",
    subtopic: "Geometry",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the area of a circle with radius 5?",
        options: ["25π", "10π", "5π", "15π"],
        correct: 0,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The sum of angles in a triangle is ____ degrees.",
        answer: "180",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is the volume of a cube with side length 4?",
        options: ["16", "32", "48", "64"],
        correct: 3,
      },
    ],
  },
  "science/physics": {
    title: "Physics Quiz",
    subject: "Science",
    subtopic: "Physics",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the unit of force in the SI system?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 1,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The acceleration due to gravity on Earth is approximately ____ m/s².",
        answer: "9.8",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Which law states that for every action, there is an equal and opposite reaction?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
        correct: 2,
      },
    ],
  },
  "science/chemistry": {
    title: "Chemistry Quiz",
    subject: "Science",
    subtopic: "Chemistry",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the chemical symbol for sodium?",
        options: ["So", "Sd", "Na", "S"],
        correct: 2,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "Water has the chemical formula ____.",
        answer: "H2O",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "How many protons does a carbon atom have?",
        options: ["4", "6", "8", "12"],
        correct: 1,
      },
    ],
  },
  "history/ancient-history": {
    title: "Ancient History Quiz",
    subject: "History",
    subtopic: "Ancient History",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which civilization built the pyramids of Giza?",
        options: ["Mesopotamians", "Greeks", "Egyptians", "Romans"],
        correct: 2,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The ancient city of ____ was known for its hanging gardens.",
        answer: "Babylon",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Who was the first emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Trajan"],
        correct: 1,
      },
    ],
  },
  "programming/javascript": {
    title: "JavaScript Quiz",
    subject: "Programming",
    subtopic: "JavaScript",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correct: 3,
      },
      {
        id: 2,
        type: "fill-blank",
        question: "The method to add an element to the end of an array is ____.",
        answer: "push",
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What does '===' operator do in JavaScript?",
        options: ["Assignment", "Equality", "Strict equality", "Not equal"],
        correct: 2,
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()

  // Handle both old format (/quiz/topic) and new format (/quiz/subject/subtopic)
  const pathParams = params.params as string[]
  const quizPath = pathParams.join("/")

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const quiz = quizData[quizPath as keyof typeof quizData]

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

  const getBackUrl = () => {
    if (pathParams.length === 2) {
      return `/subject/${pathParams[0]}`
    }
    return "/dashboard"
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
            <p className="text-gray-600">
              {quiz.subject} - {quiz.subtopic}
            </p>
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
              <Button onClick={() => router.push(getBackUrl())} className="flex-1">
                Back to {pathParams.length === 2 ? quiz.subject : "Dashboard"}
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
              <Button variant="ghost" size="sm" onClick={() => router.push(getBackUrl())} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{quiz.title}</h1>
                  <p className="text-sm text-gray-600">
                    {quiz.subject} - {quiz.subtopic}
                  </p>
                </div>
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
