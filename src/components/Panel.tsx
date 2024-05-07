import * as React from "react"

import { getGroqData } from "~utils/groq_api"

import useClickOutside from "../hooks/useClickOutside"

function DraggablePanel({ x, y, query, apiKey, onClose }) {
  const panelRef = useClickOutside(onClose)
  const [position, setPosition] = React.useState({ x, y })
  const [result, setResult] = React.useState<string>("")
  const resultRef = React.useRef<string>()

  const handleDragStart = (e: any) => {
    const initialX = e.clientX - panelRef.current.offsetLeft
    const initialY = e.clientY - panelRef.current.offsetTop

    const handleMouseMove = (e: any) => {
      const newX = e.clientX - initialX
      const newY = e.clientY - initialY
      setPosition({ x: newX, y: newY })
    }
    document.addEventListener("mousemove", handleMouseMove)

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleMouseMove)
    })
  }
  React.useEffect(() => {
    resultRef.current = result
  }, [result])

  React.useEffect(() => {
    ;(async function () {
      if (query === "") return
      let source = await getGroqData(query, apiKey)
      source.addEventListener("message", (e: any) => {
        console.log(e.data)
        if (e.data != "[DONE]") {
          let payload = JSON.parse(e.data)
          let text = payload.choices[0].delta.content
          if (text !== undefined) {
            resultRef.current = resultRef.current + text
            setResult(resultRef.current)
          }
        } else {
          source.close()
        }
      })
      source.stream()
    })()
  }, [])

  return (
    <div
      ref={panelRef}
      className="plasmo-fixed plasmo-flex plasmo-flex-col plasmo-w-64 plasmo-border plasmo-border-gray-400 plasmo-rounded-lg plasmo-shadow-lg plasmo-bg-white plasmo-z-50 plasmo-text-gray-800"
      style={{
        left: position.x + "px",
        top: position.y + "px"
      }}>
      <div
        onMouseDown={handleDragStart}
        className="plasmo-cursor-move plasmo-bg-amber-500 plasmo-rounded-t-lg">
        <p className="plasmo-text-center plasmo-text-white">AI Clip</p>
      </div>
      <div className="plasmo-cursor-text plasmo-p-2">
        <p>{result}</p>
      </div>
    </div>
  )
}

export default DraggablePanel
