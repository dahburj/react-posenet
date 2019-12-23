import { useState, useEffect } from "react"

export default function(canvas) {
  const [ctx, setCtx] = useState(
    document.createElement("canvas").getContext("2d")
  )
  useEffect(() => {
    const context = canvas.getContext("2d")
    setCtx(context)
  }, [canvas, setCtx])
  return ctx
}
