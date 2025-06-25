"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Calculator,
  Globe,
  Atom,
  Palette,
  Code,
  User,
  ArrowLeft,
  Play,
  Trophy,
  Clock,
  Target,
} from "lucide-react"

const subjectData = {
  mathematics: {
    name: "Mathematics",
    icon: Calculator,
    description: "Master mathematical concepts from basic algebra to advanced calculus",
    color: "bg-blue-500",
    subtopics: [
      {
        id: "algebra",
        name: "Algebra",
        description: "Linear equations, quadratic functions, polynomials",
        quizzes: 12,
        progress: 85,
        difficulty: "Medium",
        estimatedTime: "15-20 min",
      },
      {
        id: "geometry",
        name: "Geometry",
        description: "Shapes, angles, area, volume, and geometric proofs",
        quizzes: 10,
        progress: 70,
        difficulty: "Medium",
        estimatedTime: "12-18 min",
      },
      {
        id: "calculus",
        name: "Calculus",
        description: "Derivatives, integrals, limits, and applications",
        quizzes: 8,
        progress: 60,
        difficulty: "Hard",
        estimatedTime: "20-25 min",
      },
      {
        id: "statistics",
        name: "Statistics",
        description: "Probability, data analysis, and statistical inference",
        quizzes: 9,
        progress: 80,
        difficulty: "Medium",
        estimatedTime: "15-20 min",
      },
      {
        id: "trigonometry",
        name: "Trigonometry",
        description: "Sine, cosine, tangent, and trigonometric identities",
        quizzes: 6,
        progress: 75,
        difficulty: "Medium",
        estimatedTime: "10-15 min",
      },
    ],
  },
  science: {
    name: "Science",
    icon: Atom,
    description: "Explore the natural world through physics, chemistry, and biology",
    color: "bg-green-500",
    subtopics: [
      {
        id: "physics",
        name: "Physics",
        description: "Motion, forces, energy, waves, and quantum mechanics",
        quizzes: 15,
        progress: 65,
        difficulty: "Hard",
        estimatedTime: "20-25 min",
      },
      {
        id: "chemistry",
        name: "Chemistry",
        description: "Atoms, molecules, reactions, and chemical bonding",
        quizzes: 12,
        progress: 70,
        difficulty: "Hard",
        estimatedTime: "18-22 min",
      },
      {
        id: "biology",
        name: "Biology",
        description: "Life processes, genetics, evolution, and ecology",
        quizzes: 11,
        progress: 45,
        difficulty: "Medium",
        estimatedTime: "15-20 min",
      },
    ],
  },
  history: {
    name: "History",
    icon: Globe,
    description: "Journey through time and explore human civilization",
    color: "bg-yellow-500",
    subtopics: [
      {
        id: "ancient-history",
        name: "Ancient History",
        description: "Mesopotamia, Egypt, Greece, Rome, and ancient civilizations",
        quizzes: 8,
        progress: 90,
        difficulty: "Easy",
        estimatedTime: "12-15 min",
      },
      {
        id: "medieval-history",
        name: "Medieval History",
        description: "Middle Ages, feudalism, crusades, and medieval culture",
        quizzes: 7,
        progress: 85,
        difficulty: "Easy",
        estimatedTime: "10-15 min",
      },
      {
        id: "modern-history",
        name: "Modern History",
        description: "Renaissance, industrial revolution, and modern era",
        quizzes: 9,
        progress: 80,
        difficulty: "Medium",
        estimatedTime: "15-18 min",
      },
      {
        id: "world-wars",
        name: "World Wars",
        description: "WWI, WWII, causes, consequences, and global impact",
        quizzes: 8,
        progress: 85,
        difficulty: "Medium",
        estimatedTime: "18-22 min",
      },
    ],
  },
  programming: {
    name: "Programming",
    icon: Code,
    description: "Learn to code and build amazing software applications",
    color: "bg-purple-500",
    subtopics: [
      {
        id: "javascript",
        name: "JavaScript",
        description: "Variables, functions, DOM manipulation, and ES6+",
        quizzes: 10,
        progress: 60,
        difficulty: "Medium",
        estimatedTime: "20-25 min",
      },
      {
        id: "python",
        name: "Python",
        description: "Syntax, data structures, OOP, and libraries",
        quizzes: 8,
        progress: 40,
        difficulty: "Medium",
        estimatedTime: "18-22 min",
      },
      {
        id: "web-development",
        name: "Web Development",
        description: "HTML, CSS, responsive design, and frameworks",
        quizzes: 6,
        progress: 35,
        difficulty: "Hard",
        estimatedTime: "25-30 min",
      },
      {
        id: "data-structures",
        name: "Data Structures",
        description: "Arrays, linked lists, trees, graphs, and algorithms",
        quizzes: 4,
        progress: 25,
        difficulty: "Hard",
        estimatedTime: "30-35 min",
      },
    ],
  },
  art: {
    name: "Art & Design",
    icon: Palette,
    description: "Explore creativity through art history and design principles",
    color: "bg-pink-500",
    subtopics: [
      {
        id: "art-history",
        name: "Art History",
        description: "Renaissance, Baroque, Impressionism, and modern art",
        quizzes: 8,
        progress: 95,
        difficulty: "Easy",
        estimatedTime: "12-15 min",
      },
      {
        id: "design-principles",
        name: "Design Principles",
        description: "Balance, contrast, emphasis, and visual hierarchy",
        quizzes: 6,
        progress: 90,
        difficulty: "Easy",
        estimatedTime: "10-12 min",
      },
      {
        id: "color-theory",
        name: "Color Theory",
        description: "Color wheel, harmony, psychology, and application",
        quizzes: 4,
        progress: 85,
        difficulty: "Easy",
        estimatedTime: "8-10 min",
      },
      {
        id: "digital-art",
        name: "Digital Art",
        description: "Digital tools, techniques, and contemporary art forms",
        quizzes: 4,
        progress: 90,
        difficulty: "Medium",
        estimatedTime: "15-18 min",
      },
    ],
  },
  literature: {
    name: "Literature",
    icon: BookOpen,
    description: "Dive into the world of literature and literary analysis",
    color: "bg-indigo-500",
    subtopics: [
      {
        id: "classic-literature",
        name: "Classic Literature",
        description: "Dickens, Austen, Tolstoy, and timeless classics",
        quizzes: 12,
        progress: 60,
        difficulty: "Medium",
        estimatedTime: "20-25 min",
      },
      {
        id: "poetry",
        name: "Poetry",
        description: "Forms, meters, literary devices, and famous poets",
        quizzes: 8,
        progress: 50,
        difficulty: "Medium",
        estimatedTime: "15-18 min",
      },
      {
        id: "modern-literature",
        name: "Modern Literature",
        description: "20th century authors and contemporary works",
        quizzes: 9,
        progress: 55,
        difficulty: "Medium",
        estimatedTime: "18-22 min",
      },
      {
        id: "shakespeare",
        name: "Shakespeare",
        description: "Plays, sonnets, and the Bard's literary genius",
        quizzes: 6,
        progress: 50,
        difficulty: "Hard",
        estimatedTime: "22-25 min",
      },
    ],
  },
}

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const subjectId = params.id as string

  const subject = subjectData[subjectId as keyof typeof subjectData]

  if (!subject) {
    router.push("/dashboard")
    return null
  }

  const IconComponent = subject.icon

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-blue-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <IconComponent className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">{subject.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-lg ${subject.color} bg-opacity-10`}>
              <IconComponent
                className="h-8 w-8"
                style={{ color: subject.color.replace("bg-", "").replace("-500", "") }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{subject.name}</h2>
              <p className="text-gray-600 text-lg">{subject.description}</p>
            </div>
          </div>

          {/* Subject Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{subject.subtopics.length}</p>
                    <p className="text-sm text-gray-600">Subtopics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {subject.subtopics.reduce((acc, topic) => acc + topic.quizzes, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Quizzes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {Math.round(
                        subject.subtopics.reduce((acc, topic) => acc + topic.progress, 0) / subject.subtopics.length,
                      )}
                      %
                    </p>
                    <p className="text-sm text-gray-600">Average Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subtopics Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose a Subtopic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.subtopics.map((subtopic) => (
              <Card key={subtopic.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(subtopic.difficulty)}>{subtopic.difficulty}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      {subtopic.estimatedTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{subtopic.name}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{subtopic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{subtopic.quizzes} quizzes available</span>
                      <span className={`font-medium ${getProgressColor(subtopic.progress)}`}>
                        {subtopic.progress}% complete
                      </span>
                    </div>
                    <Progress value={subtopic.progress} className="h-2" />
                    <Link href={`/quiz/${subjectId}/${subtopic.id}`}>
                      <Button className="w-full group-hover:bg-primary/90 gap-2">
                        <Play className="h-4 w-4" />
                        Start Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress Overview</CardTitle>
            <CardDescription>Track your learning journey across all subtopics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subject.subtopics.map((subtopic) => (
                <div key={subtopic.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{subtopic.name}</h4>
                      <span className="text-sm text-gray-600">{subtopic.progress}%</span>
                    </div>
                    <Progress value={subtopic.progress} className="h-2" />
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600">{subtopic.quizzes} quizzes</p>
                    <Badge className={getDifficultyColor(subtopic.difficulty)} variant="secondary">
                      {subtopic.difficulty}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
