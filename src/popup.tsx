import * as React from "react"

import "~style.css"

import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [url, setUrl] = useStorage("url", "")
  const [apiKey, setApiKey] = useStorage("apiKey", "")
  const [modelName, setModelName] = useStorage("modelName", "")
  const [type, setType] = useStorage("type", "translate")
  const [targetLan, setTargetLan] = useStorage(
    "targetLan",
    "Simplified Chinese"
  )

  const handleRadioChange = (event: any) => {
    setType(event.target.value)
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
            onChange={(e) => setUrl(e.target.value.trim())}
          />
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
          <p>API_KEY:</p>
          <input
            className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value.trim())}
          />
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
          <p>Model_Name:</p>
          <input
            className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value.trim())}
          />
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-w-full plasmo-justify-evenly plasmo-align-middle">
          <label>
            <input
              className="plasmo-align-middle plasmo-mr-1"
              type="radio"
              value="translate"
              checked={type === "translate"}
              onChange={handleRadioChange}
            />
            translate
          </label>
          <label>
            <input
              className="plasmo-align-middle plasmo-mr-1"
              type="radio"
              value="summarize"
              checked={type === "summarize"}
              onChange={handleRadioChange}
            />
            summarize
          </label>
        </div>
        <div className="plasmo-flex plasmo-flex-row plasmo-justify-evenly">
          <label>Target Language:</label>
          <select
            className="plasmo-border pla-smo-border-gray-500 plasmo-rounded-md plasmo-px-1 plasmo-w-1/2"
            value={targetLan}
            onChange={(e) => setTargetLan(e.target.value)}>
            <option value="Simplified Chinese">Simplified Chinese</option>
            <option value="Traditional Chinese">Traditional Chinese</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
