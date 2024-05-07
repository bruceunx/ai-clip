import { SSE } from "sse.js"

export const getGroqData = async (query: string, apiKey: string) => {
  const url = "https://api.groq.com/openai/v1/chat/completions"
  const data = {
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are an AI translator, only translate to simplified chinese language without any interpretation"
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
