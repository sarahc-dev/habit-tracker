type CheckinType = {
  id: number
  timestamp: Date
  habitId: number
}

export type HabitType = {
  id: number
  title: string
  checkins?: CheckinType[]
}
