import * as React from "react"

import "~style.css"

import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const storage = new Storage()
  const [apiKey, setApiKey] = React.useState<string>("")

  React.useEffect(() => {
    ;(async function () {
      const api = await storage.get("api_key")
      if (api !== undefined) setApiKey(api)
    })()
  }, [])

  const handleSave = async () => {
    await storage.set("api_key", apiKey)
  }

  return (
    <div className="plasmo-bg-gray-100 plasmo-w-72 plasmo-flex-col plasmo-text-gray-700">
      <h1 className="plasmo-text-md plasmo-p-2 plasmo-text-center plasmo-bg-teal-800 plasmo-text-white">
        AI-Clip Settings
      </h1>
      <div className="plasmo-flex-col plasmo-space-y-2 plasmo-p-2 plasmo-justify-center plasmo-align-middle">
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
          <p>GROQ api key:</p>
          <input
            className="plasmo-w-2/3 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <button
          className="plasmo-bg-teal-700 plasmo-text-white plasmo-p-1 plasmo-w-full hover:plasmo-bg-teal-600 active:plasmo-bg-teal-300"
          onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
