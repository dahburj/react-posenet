#### PoseNet

```jsx
import { useState } from "react";
import PoseNet from "react-posenet";

const [posesString, setPosesString] = useState([]);
const [time, setTime] = useState();

<>
  <PoseNet
    frameRate={1}
    inferenceConfig={{ decodingMethod: "single-person" }}
    modelConfig={{
      architecture: "ResNet50",
      outputStride: 16,
      inputResolution: { width: 600, height: 500 },
      quantBytes: 4
    }}
    onEstimate={(poses, time, canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.font = "20px Verdana";
      ctx.fillText(time, 0, 250);
      setTime(time.toString());
      setPosesString(JSON.stringify(poses));
    }}
  />
  <p>{time}</p>
  <p>{posesString}</p>
</>;
```

<!-- #### PoseNet with image prop

````jsx
import { useState } from "react";
import PoseNet from "react-posenet";

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

<PoseNet image={video} />;
```` -->
