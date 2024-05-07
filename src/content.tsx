import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import * as React from "react"
import Clip from "react:../assets/clip.svg"

import { Storage } from "@plasmohq/storage"

import DraggablePanel from "~components/Panel"

export const config: PlasmoCSConfig = {
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const storage = new Storage()
  const [selectedText, setSelectedText] = React.useState<string>("")
  const [range, setRange] = React.useState({ x: 0, y: 0 })
  const [showPanel, setShowPanel] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>("")
  const [setting, setSetting] = React.useState<any>(null)

  let previewText = ""
  const handleMouseUp = (event: MouseEvent) => {
    if (showPanel) return
    const selection = window.getSelection()
    const text = selection.toString()
    if (text !== "" && text !== previewText) {
      previewText = text
      setSelectedText(text)
      setQuery(text)
      setRange({ x: event.clientX, y: event.clientY - 40 })
    } else {
      setSelectedText("")
      previewText = ""
    }
  }

  const handleClose = () => {
    setShowPanel(false)
    setSelectedText("")
    setQuery("")
  }
  const initDatat = async () => {
    const data = await storage.get("data")
    setSetting(() => data)
  }

  React.useEffect(() => {
    initDatat()
  }, [selectedText])

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className="plasmo-z-50 plasmo-fixed"
        style={{
          left: range.x,
          top: range.y,
          display: selectedText !== "" ? "block" : "none"
        }}>
        <button onClick={() => setShowPanel(true)}>
          <Clip className="plasmo-w-5 plasmo-h-5" />
        </button>
      </div>
      {showPanel && (
        <DraggablePanel
          x={range.x}
          y={range.y}
          query={query}
          setting={setting}
          onClose={handleClose}
        />
      )}
    </>
  )
}
export default PlasmoOverlay
