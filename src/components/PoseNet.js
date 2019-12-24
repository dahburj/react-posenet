import React, { useRef, useState, useEffect } from "react"
import Loading from "./Loading"
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
  inferenceConfig = {},
  modelConfig = {},
  facingMode = "user",
  frameRate = 20
}) {
  const videoRef = useRef()
  const canvasRef = useRef()
  const net = useLoadPoseNet(modelConfig)
  const [image, setImage] = useState()

  const onEstimateRef = useRef()
  const inferenceConfigRef = useRef()
  onEstimateRef.current = onEstimate
  inferenceConfigRef.current = inferenceConfig

  useEffect(() => {
    if (input) {
      input.width = width
      input.height = height
      setImage(input)
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
        video.play()
        setImage(video)
      }
    }
    setupCamera()
  }, [facingMode, frameRate, height, input, width])

  useEffect(() => {
    if (!net || !image) return () => {}

    const ctx = canvasRef.current.getContext("2d")
    const intervalID = setInterval(async () => {
      const poses = await net.estimatePoses(image, inferenceConfigRef.current)
      ctx.drawImage(image, 0, 0, width, height)
      onEstimateRef.current(poses)
      poses.forEach(({ keypoints }) => drawKeypoints({ ctx, keypoints }))
    }, Math.round(1000 / frameRate))

    return () => clearInterval(intervalID)
  }, [frameRate, height, image, net, width])

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
