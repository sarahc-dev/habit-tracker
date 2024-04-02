import StatsCompleted from "./stats/StatsCompleted"

export default function DayStats() {
  return (
    <div className="md:w-1/2">
      <h2 className="font-bold">Stats</h2>
      <div className="my-4 xl:grid xl:grid-cols-2">
        <StatsCompleted />
      </div>
    </div>
  )
}
