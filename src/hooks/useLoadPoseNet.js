import to from "await-to-js"
import { useState, useEffect } from "react"
import * as posenet from "@tensorflow-models/posenet"

export default function(modelConfig) {
  const [net, setNet] = useState(null)
  useEffect(() => {
    async function loadNet() {
      const [err, poseNet] = await to(posenet.load(modelConfig))
      if (err) {
        setNet(err)
        return
      }
      setNet(poseNet)
    }
    loadNet()
  }, [modelConfig])
  return net
}
