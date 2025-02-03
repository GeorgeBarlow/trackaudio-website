// src/components/airspace/DotTrail.tsx
"use client";
import { memo } from "react";
import { Dot } from "./types";

interface DotTrailProps {
  dot: Dot;
  x: number;
  y: number;
  themeColor: string;
}

export const DotTrail = memo(({ dot, x, y, themeColor }: DotTrailProps) => (
  <g>
    {dot.trail.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={dot.size * (1 - point.age)} fill={themeColor} opacity={0.15 * (1 - point.age) * dot.opacity} />
    ))}

    <line
      x1={x}
      y1={y}
      x2={x + (dot.endX - dot.startX) * 0.05}
      y2={y + (dot.endY - dot.startY) * 0.05}
      stroke={themeColor}
      strokeWidth="0.5"
      opacity={0.3 * dot.opacity}
    />

    <circle cx={x} cy={y} r={dot.size} fill={themeColor} opacity={0.6 * dot.opacity} />
  </g>
));

DotTrail.displayName = "DotTrail";
