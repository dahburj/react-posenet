/* eslint-disable react/button-has-type */
import React, { useState } from "react"
import PoseNet from "./PoseNet"

export default function() {
  const [poses, setPoses] = useState([])
  const [state, setState] = useState(true)

  const inferenceConfig = state
    ? { flipHorizontal: true }
    : { flipHorizontal: false }

  const modelConfig = state
    ? {
        architecture: "MobileNetV1"
      }
    : {
        architecture: "ResNet50"
      }

  return (
    <div>
      <button
        onClick={() => {
          setState(!state)
        }}
      >
        click
      </button>
      <PoseNet
        onEstimate={poses => {
          setPoses(poses)
        }}
        modelConfig={modelConfig}
        inferenceConfig={inferenceConfig}
      />
      <p>{poses.length}</p>
    </div>
  )
}
