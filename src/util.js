export function checkUserMediaError() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    )
  }
  return null
}

export function getMediaStreamConstraints({ frameRate, facingMode }) {
  return {
    audio: false,
    video: {
      facingMode,
      frameRate
    }
  }
}

export function drawKeypoints({ ctx, keypoints }) {
  keypoints.forEach(keypoint => {
    const { x, y } = keypoint.position
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
    ctx.fillStyle = "aqua"
    ctx.fill()
  })
}
