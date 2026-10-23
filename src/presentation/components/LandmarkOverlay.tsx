import { HAND_CONNECTIONS } from "../../domain/landmarks";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  "camera" | "preferences" | "videoHeight" | "videoWidth"
>;

export function LandmarkOverlay({ camera, preferences, videoHeight, videoWidth }: Props) {
  if (!camera.landmarks) return null;
  return (
    <svg
      className={"landmark-overlay " + (preferences.mirror ? "is-mirrored" : "")}
      viewBox={"0 0 " + videoWidth + " " + videoHeight}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {HAND_CONNECTIONS.map(([a, b], i) => {
        const points = camera.landmarks!;
        return (
          <line
            key={i}
            x1={points[a].x * videoWidth}
            y1={points[a].y * videoHeight}
            x2={points[b].x * videoWidth}
            y2={points[b].y * videoHeight}
            stroke="#dbf0b4"
            strokeWidth="3"
          />
        );
      })}
      {camera.landmarks.map((p, i) => (
        <circle
          key={i}
          cx={p.x * videoWidth}
          cy={p.y * videoHeight}
          r="5"
          fill="#f2f8d8"
          stroke="#335343"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
