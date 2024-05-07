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
      className="plasmo-text-sky-500 plasmo-p-10 plasmo-fixed"
      style={{
        left: position.x + "px",
        top: position.y + "px"
      }}>
      <div onMouseDown={handleDragStart} className="plasmo-cursor-move">
        <p>header</p>
      </div>
      <div
        style={{
          width: "100%",
          height: "90%",
          paddingTop: "10%",
          cursor: "text"
        }}>
        <p>drag me</p>
      </div>
    </div>
  )
}

export default DraggablePanel
