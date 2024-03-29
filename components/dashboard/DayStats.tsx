import StatsCompleted from "./stats/StatsCompleted"

export default function DayStats() {
  return (
    <div className="w-1/2">
      <h2>Stats</h2>
      <div className="my-4 grid w-full grid-cols-2 grid-rows-2 gap-4">
        <StatsCompleted />
      </div>
    </div>
  )
}
