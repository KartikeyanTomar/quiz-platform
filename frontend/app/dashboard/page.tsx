"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calculator, Globe, Atom, Palette, Code, User, Trophy, Clock, Target, LogOut } from "lucide-react"

const topics = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    description: "Algebra, Geometry, Calculus",
    quizzes: 45,
    difficulty: "Medium",
    color: "bg-blue-500",
    progress: 75,
    subtopics: [
      { id: "algebra", name: "Algebra", quizzes: 12, progress: 85 },
      { id: "geometry", name: "Geometry", quizzes: 10, progress: 70 },
      { id: "calculus", name: "Calculus", quizzes: 8, progress: 60 },
      { id: "statistics", name: "Statistics", quizzes: 9, progress: 80 },
      { id: "trigonometry", name: "Trigonometry", quizzes: 6, progress: 75 },
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: Atom,
    description: "Physics, Chemistry, Biology",
    quizzes: 38,
    difficulty: "Hard",
    color: "bg-green-500",
    progress: 60,
    subtopics: [
      { id: "physics", name: "Physics", quizzes: 15, progress: 65 },
      { id: "chemistry", name: "Chemistry", quizzes: 12, progress: 70 },
      { id: "biology", name: "Biology", quizzes: 11, progress: 45 },
    ],
  },
  {
    id: "history",
    name: "History",
    icon: Globe,
    description: "World History, Ancient Civilizations",
    quizzes: 32,
    difficulty: "Easy",
    color: "bg-yellow-500",
    progress: 85,
    subtopics: [
      { id: "ancient-history", name: "Ancient History", quizzes: 8, progress: 90 },
      { id: "medieval-history", name: "Medieval History", quizzes: 7, progress: 85 },
      { id: "modern-history", name: "Modern History", quizzes: 9, progress: 80 },
      { id: "world-wars", name: "World Wars", quizzes: 8, progress: 85 },
    ],
  },
  {
    id: "programming",
    name: "Programming",
    icon: Code,
    description: "JavaScript, Python, Web Development",
    quizzes: 28,
    difficulty: "Hard",
    color: "bg-purple-500",
    progress: 45,
    subtopics: [
      { id: "javascript", name: "JavaScript", quizzes: 10, progress: 60 },
      { id: "python", name: "Python", quizzes: 8, progress: 40 },
      { id: "web-development", name: "Web Development", quizzes: 6, progress: 35 },
      { id: "data-structures", name: "Data Structures", quizzes: 4, progress: 25 },
    ],
  },
  {
    id: "art",
    name: "Art & Design",
    icon: Palette,
    description: "Art History, Design Principles",
    quizzes: 22,
    difficulty: "Easy",
    color: "bg-pink-500",
    progress: 90,
    subtopics: [
      { id: "art-history", name: "Art History", quizzes: 8, progress: 95 },
      { id: "design-principles", name: "Design Principles", quizzes: 6, progress: 90 },
      { id: "color-theory", name: "Color Theory", quizzes: 4, progress: 85 },
      { id: "digital-art", name: "Digital Art", quizzes: 4, progress: 90 },
    ],
  },
  {
    id: "literature",
    name: "Literature",
    icon: BookOpen,
    description: "Classic Literature, Poetry",
    quizzes: 35,
    difficulty: "Medium",
    color: "bg-indigo-500",
    progress: 55,
    subtopics: [
      { id: "classic-literature", name: "Classic Literature", quizzes: 12, progress: 60 },
      { id: "poetry", name: "Poetry", quizzes: 8, progress: 50 },
      { id: "modern-literature", name: "Modern Literature", quizzes: 9, progress: 55 },
      { id: "shakespeare", name: "Shakespeare", quizzes: 6, progress: 50 },
    ],
  },
]

export default function Dashboard() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">QuizMaster</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Quizzes Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Topic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => {
              const IconComponent = topic.icon
              return (
                <Card
                  key={topic.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${topic.color} bg-opacity-10`}>
                        <IconComponent
                          className={`h-6 w-6 text-white`}
                          style={{ color: topic.color.replace("bg-", "").replace("-500", "") }}
                        />
                      </div>
                      <Badge className={getDifficultyColor(topic.difficulty)}>{topic.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-xl">{topic.name}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{topic.quizzes} quizzes available</span>
                        <span className="font-medium">{topic.progress}% complete</span>
                      </div>
                      <Progress value={topic.progress} className="h-2" />
                      <Link href={`/subject/${topic.id}`}>
                        <Button className="w-full group-hover:bg-primary/90">Explore Topics</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest quiz attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { topic: "Mathematics", score: 92, date: "2 hours ago", questions: 15 },
                { topic: "Science", score: 78, date: "1 day ago", questions: 20 },
                { topic: "History", score: 95, date: "3 days ago", questions: 12 },
                { topic: "Programming", score: 84, date: "1 week ago", questions: 18 },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.topic} Quiz</p>
                    <p className="text-sm text-gray-600">
                      {activity.questions} questions • {activity.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{activity.score}%</p>
                    <p className="text-sm text-gray-600">Score</p>
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
