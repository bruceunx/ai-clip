import * as React from "react"

import "~style.css"

import { useStorage } from "@plasmohq/storage/hook"

import { checkState } from "~utils/llm_api"

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_")
}

function IndexPopup() {
  const [openAIToken, setOpenAIToken] = React.useState<number>(0)
  const [claudeToken, setClaudeToken] = React.useState<number>(0)

  const [url, setUrl] = useStorage("url", "")
  const [apiKey, setApiKey] = useStorage("apiKey", "")
  const [deeplUrl, setDeeplUrl] = useStorage("deeplUrl", "")
  const [deeplApiKey, setDeeplApiKey] = useStorage("deeplApiKey", "")
  const [modelName, setModelName] = useStorage("modelName", "")
  const [type, setType] = useStorage("type", "translate")
  const [tranlateEngine, setTranslateEngine] = useStorage("engine", "deepl")
  const [targetLan, setTargetLan] = useStorage(
    "targetLan",
    "Simplified Chinese"
  )

  const handleSwitchEngine = (e: any) => {
    setTranslateEngine(e.target.value)
  }
  const handleRadioChange = (event: any) => {
    setType(event.target.value)
  }

  const refreshAPIStatue = async () => {
    let openUrl = process.env.PLASMO_PUBLIC_OPENAI_URL
    let token = process.env.PLASMO_PUBLIC_OPENAI_KEY
    console.log(openUrl, token)
    let data = await checkState(openUrl, token, "")
    if (!data.error) {
      setOpenAIToken(data.remain_quota)
    }

    let claudeUrl = process.env.PLASMO_PUBLIC_CLAUDE_URL
    let cookie = process.env.PLASMO_PUBLIC_CLAUDE_COOKIE
    data = await checkState(claudeUrl, "", cookie, true)
    if (!data.error) {
      setClaudeToken(data.data.quota)
    }
  }

  React.useEffect(() => {
    refreshAPIStatue()
  }, [])

  return (
    <div className="plasmo-bg-gray-100 plasmo-w-80 plasmo-flex-col plasmo-text-gray-700">
      <h1 className="plasmo-text-md plasmo-p-2 plasmo-text-center plasmo-bg-amber-500 plasmo-text-white">
        AI-Clip Settings
      </h1>
      <p className="plasmo-text-small plasmo-text-amber-700 plasmo-p-1">
        Just add url and api key to use AI-Clip, use fast models not some pricey
        models, like gpt-3.5 from OpenAI, llama-8b from groq and etc, it's much
        wasterful to just translate single word with llms. Please translate with
        sentence or paragraph.
      </p>
      <div className="plasmo-flex-col plasmo-space-y-2 plasmo-p-2 plasmo-justify-center plasmo-align-middle">
        <div className="plasmo-border plasmo-border-green-500 plasmo-rounded-xl plasmo-p-2 plasmo-space-y-2">
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
        </div>
        <div className="plasmo-border plasmo-border-green-500 plasmo-rounded-xl plasmo-p-2 plasmo-space-y-2">
          <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
            <p>Deepl_URL:</p>
            <input
              className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
              type="text"
              value={deeplUrl}
              onChange={(e) => setDeeplUrl(e.target.value.trim())}
            />
          </div>
          <div className="plasmo-flex plasmo-flex-row plasmo-justify-between">
            <p>Deepl_API_KEY:</p>
            <input
              className="plasmo-w-3/4 plasmo-border plasmo-border-gray-500 plasmo-rounded-md plasmo-px-1"
              type="text"
              value={deeplApiKey}
              onChange={(e) => setDeeplApiKey(e.target.value.trim())}
            />
          </div>
          <div className="plasmo-flex plasmo-flex-row plasmo-w-full plasmo-justify-evenly plasmo-align-middle">
            <p>Default Translate Agent:</p>
            <label>
              <input
                className="plasmo-align-middle plasmo-mr-1"
                type="radio"
                value="gpt"
                checked={tranlateEngine === "gpt"}
                onChange={handleSwitchEngine}
              />
              Gpt
            </label>
            <label>
              <input
                className="plasmo-align-middle plasmo-mr-1"
                type="radio"
                value="deepl"
                checked={tranlateEngine === "deepl"}
                onChange={handleSwitchEngine}
              />
              Deepl
            </label>
          </div>
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
        <div>
          <p>OpenAI Status: Remain Token: {formatNumber(openAIToken)}</p>
          <p>Claude Status: Remain Token: {formatNumber(claudeToken)}</p>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
