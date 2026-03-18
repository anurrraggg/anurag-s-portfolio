"use client"

import { useState, useEffect } from "react"
import { GitHubCalendar } from "react-github-calendar"
import { Leetcodecalendar } from "react-leetcode-calendar"
import { Card } from "@/components/ui/card"
import { Github, Code2 } from "lucide-react"

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

export function ActivityCalendars() {
  const githubUsername = "anurrraggg"
  const leetcodeUsername = "anuragpandey945028"
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((k) => k + 1)
    }, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-16 space-y-12">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Github className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">GitHub Contributions</h3>
        </div>
        <Card className="p-6 bg-card/50 backdrop-blur-md border border-primary/10 overflow-x-auto">
          <div className="min-w-[800px] flex justify-center">
            <GitHubCalendar
              key={`github-${refreshKey}`}
              username={githubUsername}
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </div>
        </Card>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Code2 className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">LeetCode Activity</h3>
        </div>
        <Card className="p-6 bg-card/50 backdrop-blur-md border border-primary/10 overflow-x-auto">
          <div className="min-w-[800px] flex justify-center">
            <Leetcodecalendar
              key={`leetcode-${refreshKey}`}
              username={leetcodeUsername}
              size="medium"
              ui="midnight"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
