import * as React from "react"

import useClickOutside from "../hooks/useClickOutside"

function DraggablePanel({ x, y, onClose }) {
  const panelRef = useClickOutside(onClose)
  const [position, setPosition] = React.useState({ x, y })

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
        <p className="plasmo-text-center plasmo-text-white">header</p>
      </div>
      <div className="plasmo-cursor-text plasmo-p-2">
        <p>drag me</p>
      </div>
    </div>
  )
}

export default DraggablePanel
