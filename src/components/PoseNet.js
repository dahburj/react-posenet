import React, { useRef, useState, useEffect } from "react"
import Loading from "./Loading"
import useCtx from "../hooks/useCtx"
import useLoadPoseNet from "../hooks/useLoadPoseNet"
import {
  drawKeypoints,
  checkUserMediaError,
  getMediaStreamConstraints
} from "../util"

export default function PoseNet({
  id = "",
  className = "",
  width = 600,
  height = 500,
  input = undefined,
  onEstimate = () => {},
  inferenceConfig = undefined,
  modelConfig = undefined,
  facingMode = "user",
  frameRate = 20
}) {
  const canvasRef = useRef(document.createElement("canvas"))
  const videoRef = useRef()
  const ctx = useCtx(canvasRef.current)
  const net = useLoadPoseNet(modelConfig)
  const [image, setImage] = useState(input)

  useEffect(() => {
    if (image) {
      image.width = width
      image.height = height
      return
    }
    if (!videoRef.current) return
    const userMediaError = checkUserMediaError()
    if (userMediaError) {
      setImage(userMediaError)
      return
    }

    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia(
        getMediaStreamConstraints({ frameRate, facingMode })
      )
      const video = videoRef.current
      video.srcObject = stream
      video.onloadedmetadata = () => {
        setImage(video)
        video.play()
      }
    }
    setupCamera()
  }, [facingMode, frameRate, height, image, width])

  useEffect(() => {
    if (!net || !image) return () => {}

    const intervalID = setInterval(async () => {
      const poses = await net.estimatePoses(image, inferenceConfig)
      ctx.drawImage(image, 0, 0, width, height)
      onEstimate(poses)
      poses.forEach(({ keypoints }) => drawKeypoints({ ctx, keypoints }))
    }, Math.round(1000 / frameRate))

    return () => clearInterval(intervalID)
  }, [ctx, frameRate, height, image, inferenceConfig, net, onEstimate, width])

  return (
    <>
      <Loading name="model" target={net} />
      <Loading name="input" target={image} />
      <video
        playsInline
        ref={videoRef}
        style={{ width: "0", height: "0" }}
        width={width}
        height={height}
      />
      <canvas
        ref={canvasRef}
        id={id}
        className={className}
        width={width}
        height={height}
      />
    </>
  )
}
