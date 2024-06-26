type CheckinType = {
  id: number
  timestamp: Date
  habitId: number
}

export interface HabitType {
  id: number
  title: string
}

export interface OptimisticHabitType extends HabitType {
  checkins: CheckinType[]
}

export type SetOpenType = React.Dispatch<React.SetStateAction<boolean>>
