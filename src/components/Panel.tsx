import * as React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { getData, onlyTranslate } from "~utils/llm_api"

import useClickOutside from "../hooks/useClickOutside"

function DraggablePanel({ x, y, query, onClose }) {
  const [url] = useStorage<string>("url")
  const [apiKey] = useStorage<string>("apiKey")
  const [type] = useStorage<string>("type")
  const [lang] = useStorage<string>("targetLan")
  const [modelName] = useStorage<string>("modelName")

  const [translateEngine] = useStorage<string>("engine")
  const [deeplUrl] = useStorage<string>("deeplUrl")
  const [deeplApiKey] = useStorage<string>("deeplApiKey")

  const panelRef = useClickOutside(onClose)
  const [position, setPosition] = React.useState({ x, y })
  const [result, setResult] = React.useState<string>("")
  const [warning, setWarning] = React.useState<string>("")
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

  const handleSummary = async (query: string) => {
    let source = await getData(query, url, apiKey, type, lang, modelName)
    source.addEventListener("message", (e: any) => {
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
    source.addEventListener("error", (e: any) => {
      let error = JSON.parse(e.data)
      setWarning(error.error.message)
      source.close()
    })
    source.stream()
  }

  const handleTranslate = async (query: string) => {
    const data = await onlyTranslate(query, deeplUrl, deeplApiKey, lang)

    if (data.error) {
      setWarning(data.error)
      return
    }
    setResult(data.data)
  }

  React.useEffect(() => {
    setWarning("")
    if (url === undefined) return
    if (url === "" || apiKey === "" || modelName === "") {
      setWarning("Missing api information!")
      return
    }
    if (query.split(" ").length < 2) {
      setWarning("Please select more than one word!")
      return
    }

    if (query === "") return

    if (translateEngine === "deepl" && deeplUrl !== "") {
      handleTranslate(query)
    } else {
      handleSummary(query)
    }
  }, [url, apiKey, type, lang, modelName])

  return (
    <div
      ref={panelRef}
      className="plasmo-fixed plasmo-flex plasmo-flex-col plasmo-w-96 plasmo-border plasmo-border-gray-400 plasmo-rounded-lg plasmo-shadow-lg plasmo-bg-white plasmo-z-50 plasmo-text-gray-800"
      style={{
        left: position.x + "px",
        top: position.y + "px"
      }}>
      <div
        onMouseDown={handleDragStart}
        className="plasmo-cursor-move plasmo-bg-amber-500 plasmo-rounded-t-lg">
        <p className="plasmo-text-center plasmo-text-white">AI Clip - {type}</p>
      </div>
      <div className="plasmo-cursor-text plasmo-p-2">
        <p>{result}</p>
        {warning !== "" && <p className="plasmo-text-red-700">{warning}</p>}
      </div>
    </div>
  )
}

export default DraggablePanel
