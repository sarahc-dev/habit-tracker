import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div
      className="bg-red-500/15 text-red-500 flex items-center gap-2 rounded-md px-3 py-2 text-sm"
      data-cy="form-error"
    >
      <ExclamationTriangleIcon />
      <p>{message}</p>
    </div>
  )
}
