import { useEffect, useState } from "react";
import * as styles from "@/features/metronome/components/HalfCircleVisualizer/HalfCircleVisualizer.css";
import {
  scheduler,
  useIsPlaying,
  useTotalBeats,
} from "@/features/metronome/lib/scheduler";
import { vars } from "@/features/metronome/theme.css";

const SWEEP_DEG = 75;

type Props = {
  height?: number;
};

const armAngleFromProgressAngle = (progressAngle: number, isPlaying: boolean) => {
  if (!isPlaying) return 0;
  return ((90 - progressAngle) / 90) * SWEEP_DEG;
};

const angleFromProgress = (progress: number, forward: boolean) =>
  180 - 180 * (forward ? progress : 1 - progress);

export const HalfCircleVisualizer = ({ height = 120 }: Props) => {
  const isPlaying = useIsPlaying();
  const totalBeats = useTotalBeats();
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    let raf = requestAnimationFrame(function tick() {
      setTick((n) => n + 1);
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const forward = totalBeats % 2 === 1;
  const angle = isPlaying
    ? angleFromProgress(scheduler.getProgress(), forward)
    : 180;

  const W = height * 1.9;
  const H = height;
  const cx = W / 2;
  const cy = H - 8;
  const r = H - 18;
  const swing = armAngleFromProgressAngle(angle, isPlaying);
  const rad = ((swing - 90) * Math.PI) / 180;
  const dotX = cx + Math.cos(rad) * r;
  const dotY = cy + Math.sin(rad) * r;

  const tickAngles: number[] = [-SWEEP_DEG, 0, SWEEP_DEG];

  return (
    <div className={styles.wrap}>
      <svg width={W} height={H} style={{ overflow: "visible" }}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={vars.color.hair}
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        {tickAngles.map((s) => {
          const a = ((s - 90) * Math.PI) / 180;
          const x1 = cx + Math.cos(a) * (r - 4);
          const y1 = cy + Math.sin(a) * (r - 4);
          const x2 = cx + Math.cos(a) * (r + 4);
          const y2 = cy + Math.sin(a) * (r + 4);
          return (
            <line
              key={s}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={vars.color.hair}
              strokeWidth="1"
            />
          );
        })}
        <circle cx={cx} cy={cy} r="3" fill={vars.color.ink} opacity="0.4" />
        <line
          x1={cx}
          y1={cy}
          x2={dotX}
          y2={dotY}
          stroke={vars.color.ink}
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <circle cx={dotX} cy={dotY} r="9" fill={vars.color.accent} />
      </svg>
    </div>
  );
};
