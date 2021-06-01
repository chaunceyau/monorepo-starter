import React from "react"
import { CardHeader } from "./header"

interface CardProps {
  title?: string
  description?: string
  actions?: any[]
  styled?: boolean;
  children?: React.ReactNode
}

export function Card({ title, description, actions, styled = true, children }: CardProps) {
  const Actions =
    actions?.map((action) => (
      <button
        key={action}
        className="bg-green-500 py-2 px-4 rounded text-white font-semibold"
      >
        {action} interest
      </button>
    )) || null

  const wrapperClasses = ["w-full max-w-4xl"]

  if (styled) {
    wrapperClasses.push("border rounded-lg bg-white pt-4 pb-5 px-6 shadow-sm relative")
  }

  return (
    <div className={wrapperClasses.join(" ")}>
      <div className="flex flex-col items-start justify-between">
        <CardHeader title={title} description={description} />
        <div className="w-full mt-4">{children}</div>
        <div className="flex flex-shrink-0 pl-2">{Actions}</div>
      </div>
    </div>
  )
}
