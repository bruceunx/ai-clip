import * as React from "react"

const useClickOutside = (callback: Function) => {
  const ref = React.useRef<HTMLDivElement>(null)
  let count = 0

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        const recSize = ref.current.getBoundingClientRect()
        if (
          event.clientX < recSize.left ||
          event.clientX > recSize.right ||
          event.clientY < recSize.top ||
          event.clientY > recSize.bottom
        ) {
          if (count > 0) callback()
          count++
        }
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [ref, callback])

  return ref
}

export default useClickOutside
