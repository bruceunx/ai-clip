import { SSE } from "sse.js"

import { Prompts } from "./prompt"

export const getData = async (query: string, setting: any) => {
  const data = {
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: Prompts[setting.selectedValue]
      },
      {
        role: "user",
        content: query
      }
    ],
    stream: true
  }
  let source = new SSE(setting.url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${setting.apiKey}`
    },
    method: "POST",
    payload: JSON.stringify(data)
  })
  return source
}
