export default function ProgressBarRound({
  percentComplete,
}: {
  percentComplete: number
}) {
  const convertCompleted = 440 - (440 / 100) * percentComplete
  return (
    <svg
      xmlns="http://wwww.w3.org/2000/svg"
      version="1.1"
      width="160px"
      height="160px"
      className="absolute left-0 top-0"
    >
      {/* <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4948CF" />
          <stop offset="100%" stopColor="#85FFBD" />
        </linearGradient>
      </defs> */}
      <g transform="rotate(-90 80 80)">
        <circle
          cx="80"
          cy="80"
          r="70"
          strokeLinecap="round"
          // 0 an 0 is 100%
          // 440 and 440 is 0%
          strokeDasharray="440"
          strokeDashoffset={convertCompleted}
          strokeWidth="20"
          // stroke="url(#linear)"
          fill="none"
          className="stroke-primary transition-all"
        ></circle>
      </g>
    </svg>
  )
}
