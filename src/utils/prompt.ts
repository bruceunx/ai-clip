export const Prompts = {
  translate:
    "You are an AI translator, only translate to simplified chinese language without any interpretation or pretext",
  summarize:
    "You are an AI assistant, only summarize to simplified chinese language with minimal words or pretext"
}

export const getPrompt = (type: string, lang: string) => {
  if (type === "translate") {
    return `You are an AI translator, only translate to ${lang} language without any interpretation or pretext`
  } else {
    return `You are an AI assistant, only summarize to ${lang} language with minimal words or pretext`
  }
}
