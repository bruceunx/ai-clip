import { SSE } from "sse.js"

import { getPrompt } from "./prompt"

export const getData = async (
  query: string,
  url: string,
  apiKey: string,
  type: string,
  lang: string,
  modelName: string
) => {
  const data = {
    model: modelName,
    messages: [
      {
        role: "system",
        content: getPrompt(type, lang)
      },
      {
        role: "user",
        content: query
      }
    ],
    stream: true
  }
  let source = new SSE(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    payload: JSON.stringify(data)
  })
  return source
}
