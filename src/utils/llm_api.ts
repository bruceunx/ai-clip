import { SSE } from "sse.js"

import { getPrompt } from "./prompt"

const langMap = {
  "Simplified Chinese": "ZH",
  "Traditional Chinese": "ZH",
  English: "EN",
  Japanese: "JA",
  French: "FR",
  Spanish: "ES"
}

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

export const onlyTranslate = async (
  query: string,
  url: string,
  token: string,
  lang: string
) => {
  let headers = {
    "Content-Type": "application/json"
  }
  let newUrl = url
  if (!url.includes("deepl")) {
    newUrl = `${url}?token=${token}`
  } else {
    headers["Authorization"] = `Bearer ${token}`
  }

  const data = { target_lang: langMap[lang], text: query }

  const res = await fetch(newUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })

  if (res.status === 200) {
    return res.json()
  } else {
    return { error: "error" }
  }
}

export const checkState = async (
  url: string,
  token: string,
  cookie: string,
  useCookie: boolean = false
) => {
  let headers = {
    "Content-Type": "application/json"
  }
  if (useCookie) {
    headers["Cookie"] = cookie
  } else {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(url, { method: "GET", headers: headers })
  if (res.status === 200) {
    return res.json()
  } else {
    return { error: "error" }
  }
}
