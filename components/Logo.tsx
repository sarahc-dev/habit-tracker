export default function Logo() {
  return (
    <div
      className="flex items-center text-lg transition-all md:hover:scale-110"
      aria-label="Go to Home page"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
        className="shrink-0 text-primary"
      >
        <path
          fill="currentColor"
          d="M5 18h4.24a1 1 0 0 0 .71-.29l6.92-6.93L19.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71V17a1 1 0 0 0 1 1m9.76-13.59l2.83 2.83l-1.42 1.42l-2.83-2.83ZM6 13.17l5.93-5.93l2.83 2.83L8.83 16H6ZM21 20H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
        />
      </svg>
      <span className="ml-1 shrink-0 font-bold">Habit Tracker</span>
    </div>
  )
}
