"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Trophy, Target, Clock, TrendingUp, Calendar, Award, ArrowLeft, BarChart3 } from "lucide-react"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 2024",
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    totalQuizzes: 24,
    totalPoints: 1247,
    averageScore: 89,
    timeSpent: "45h 30m",
    streak: 7,
    rank: 15,
  },
}

const quizHistory = [
  {
    id: 1,
    topic: "Mathematics",
    date: "2024-01-15",
    score: 92,
    questions: 15,
    timeSpent: "12m 30s",
    difficulty: "Medium",
  },
  {
    id: 2,
    topic: "Science",
    date: "2024-01-14",
    score: 78,
    questions: 20,
    timeSpent: "18m 45s",
    difficulty: "Hard",
  },
  {
    id: 3,
    topic: "History",
    date: "2024-01-13",
    score: 95,
    questions: 12,
    timeSpent: "8m 20s",
    difficulty: "Easy",
  },
  {
    id: 4,
    topic: "Programming",
    date: "2024-01-12",
    score: 84,
    questions: 18,
    timeSpent: "22m 15s",
    difficulty: "Hard",
  },
  {
    id: 5,
    topic: "Art & Design",
    date: "2024-01-11",
    score: 96,
    questions: 10,
    timeSpent: "7m 45s",
    difficulty: "Easy",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Quiz",
    description: "Complete your first quiz",
    icon: "🎯",
    earned: true,
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Score 100% on any quiz",
    icon: "🏆",
    earned: false,
    date: null,
  },
  {
    id: 3,
    title: "Speed Demon",
    description: "Complete a quiz in under 5 minutes",
    icon: "⚡",
    earned: true,
    date: "2024-01-11",
  },
  {
    id: 4,
    title: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    earned: true,
    date: "2024-01-15",
  },
  {
    id: 5,
    title: "Subject Expert",
    description: "Score above 90% in 5 quizzes of the same subject",
    icon: "🎓",
    earned: false,
    date: null,
  },
  {
    id: 6,
    title: "Quiz Master",
    description: "Complete 50 quizzes",
    icon: "👑",
    earned: false,
    date: null,
  },
]

const topicProgress = [
  { topic: "Mathematics", completed: 12, total: 16, percentage: 75 },
  { topic: "Science", completed: 8, total: 14, percentage: 57 },
  { topic: "History", completed: 6, total: 8, percentage: 75 },
  { topic: "Programming", completed: 4, total: 12, percentage: 33 },
  { topic: "Art & Design", completed: 3, total: 6, percentage: 50 },
  { topic: "Literature", completed: 2, total: 10, percentage: 20 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
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
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {userData.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    Rank #{userData.stats.rank}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {userData.stats.streak} day streak
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{userData.stats.totalQuizzes}</div>
              <div className="text-sm text-gray-600">Quizzes Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{userData.stats.totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{userData.stats.averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{userData.stats.timeSpent}</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Quiz History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizHistory.slice(0, 3).map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{quiz.topic}</p>
                          <p className="text-sm text-gray-600">{quiz.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Subjects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topicProgress
                      .sort((a, b) => b.percentage - a.percentage)
                      .slice(0, 3)
                      .map((topic, index) => (
                        <div key={topic.topic} className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{topic.topic}</span>
                              <span className="text-sm text-gray-600">{topic.percentage}%</span>
                            </div>
                            <Progress value={topic.percentage} className="h-2" />
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz History</CardTitle>
                <CardDescription>Complete history of all your quiz attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizHistory.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-gray-900">{quiz.topic}</h3>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{quiz.date}</span>
                          <span>{quiz.questions} questions</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {quiz.timeSpent}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Your learning milestones and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${achievement.earned ? "text-green-900" : "text-gray-600"}`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-green-600 mt-1">Earned on {achievement.date}</p>
                          )}
                        </div>
                        {achievement.earned && <Trophy className="h-5 w-5 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topicProgress.map((topic) => (
                    <div key={topic.topic} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">{topic.topic}</h3>
                        <span className="text-sm text-gray-600">
                          {topic.completed}/{topic.total} quizzes
                        </span>
                      </div>
                      <Progress value={topic.percentage} className="h-3" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{topic.percentage}% complete</span>
                        <span>{topic.total - topic.completed} remaining</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
