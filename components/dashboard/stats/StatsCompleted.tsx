import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ProgressRound from "./ProgressRound"

export default function StatsCompleted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <ProgressRound />
      </CardContent>
    </Card>
  )
}
