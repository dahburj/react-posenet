#### PoseNet

```jsx
import PoseNet from "posenet-react";

const inferenceConfig = {
  decodingMethod: "single-person"
};

const modelConfig = {
  architecture: "MobileNetV1",
  multiplier: 0.5,
  quantBytes: 1
};

<PoseNet inferenceConfig={inferenceConfig} />;
// <PoseNet modelConfig={modelConfig} inferenceConfig={inferenceConfig} />;
```

#### PoseNet with image prop

<!-- ```jsx
import { useState } from "react";
import PoseNet from "posenet-react";

function getVideo() {
  const src = "https://i.imgur.com/EjsdjeQ.mp4";
  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.crossOrigin = "";
  return video;
}

const [video] = useState(getVideo());

// /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? (
//   <p>This example does not support mobile device</p>
// ) : (
//   <></>
// );
<PoseNet image={video} />;
``` -->
