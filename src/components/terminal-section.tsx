"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function TerminalSection() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const fullText = "UC Berkeley EECS grad. Building real-time apps, cloud-native systems, and AI interfaces."

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div className="font-mono text-sm md:text-base bg-muted/50 p-4 rounded-md border shadow-sm">
      <div className="flex items-center gap-1 text-muted-foreground mb-2">
        <span className="text-primary">~</span>
        <span>$</span>
      </div>
      <div className="flex">
        <span>{text}</span>
        <span
          className={cn("ml-0.5 inline-block w-2 h-4 bg-primary", cursorVisible ? "opacity-100" : "opacity-0")}
        ></span>
      </div>
    </div>
  )
}
