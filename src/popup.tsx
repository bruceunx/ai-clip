import * as React from "react"

import "~style.css"

import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const storage = new Storage()
  const [apiKey, setApiKey] = React.useState<string>("")
  const [url, setUrl] = React.useState<string>("")
  const [selectedValue, setSelectedValue] = React.useState("translate")

  React.useEffect(() => {
    ;(async function () {
      const data: any = await storage.get("data")
      if (data !== undefined) {
        setApiKey(data.apiKey)
        setUrl(data.url)
        setSelectedValue(data.selectedValue)
      }
    })()
  }, [])

  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  const handleSave = async () => {
    await storage.set("data", { apiKey, selectedValue, url })
  }

  return (
    <div className="plasmo-bg-gray-100 plasmo-w-80 plasmo-flex-col plasmo-text-gray-700">
      <h1 className="plasmo-text-md plasmo-p-2 plasmo-text-center plasmo-bg-teal-800 plasmo-text-white">
        AI-Clip Settings
      </h1>
      <p className="plasmo-text-small plasmo-text-green-700 plasmo-p-1">
        Just add url and api key to use AI-Clip, use fast models not some pricey
        models, Support OpenAI API like gpt-3.5, llama-8b from groq and etc,
        it's much wasterful to just translate single word with llms. Please
        translate with sentence or paragraph.
      </p>
      <div className="plasmo-flex-col plasmo-space-y-2 plasmo-p-2 plasmo-justify-center plasmo-align-middle">
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
          <p>API_URL:</p>
          <input
            className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
          <p>API_KEY:</p>
          <input
            className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-w-full plasmo-justify-evenly plasmo-align-middle">
          <label>
            <input
              className="plasmo-align-middle plasmo-mr-1"
              type="radio"
              value="translate"
              checked={selectedValue === "translate"}
              onChange={handleRadioChange}
            />
            translate
          </label>
          <label>
            <input
              className="plasmo-align-middle plasmo-mr-1"
              type="radio"
              value="summarize"
              checked={selectedValue === "summarize"}
              onChange={handleRadioChange}
            />
            summarize
          </label>
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
