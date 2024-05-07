import { SSE } from "sse.js"

import { Prompts } from "./prompt"

export const getData = async (
  query: string,
  url: string,
  apiKey: string,
  type: string
) => {
  const data = {
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: Prompts[type]
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
