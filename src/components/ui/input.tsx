import React from "react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"

const DEFAULT =
  "block w-full rounded-lg transition duration-150 ease-in-out shadow-sm bg-zinc-950 text-white"
const VARIANT = {
  default:
    "border-zinc-900 focus:ring-violet-600 focus:border-violet-600 placeholder-zinc-600",
  error:
    "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500 focus:border-red-500"
}
const MODE = {
  normal: "",
  disabled: "bg-gray-50 "
}
interface InputProps extends React.InputHTMLAttributes<HTMLElement> {
  hasError?: boolean
}

type Variant = "default" | "error"
type Mode = "normal" | "disabled"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, forwardRef) => {
    let variant: Variant = "default"
    let mode: Mode = "normal"
    const { disabled, hasError, className, ...restProps } = props

    if (disabled) {
      mode = "disabled"
    }

    if (hasError) {
      variant = "error"
    }

    const cssClasses = [className, DEFAULT, VARIANT[variant], MODE[mode]].join(
      " "
    )

    return (
      <div className="relative mt-1 w-full max-w-lg sm:text-sm">
        <input
          type="text"
          className={cssClasses}
          {...restProps}
          ref={forwardRef}
          disabled={disabled}
        />
        {hasError ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
