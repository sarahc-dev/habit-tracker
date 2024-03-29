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
          fill="none"
          className="stroke-accent transition-all"
        >
          {/* <animate
          attributeName="stroke-dashoffset"
          from="440" // Set it equal to strokeDasharray
          to="0" // To fully reveal the circle
          dur="5s" // Duration of the animation
          fill="freeze" // Maintain the final state of the animation
        /> */}
        </circle>
      </g>
    </svg>
  )
}
