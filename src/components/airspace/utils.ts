import { Path } from "./types";

export const createPolygon = (centerX: number, centerY: number, points: number, radius: number) => {
  const vertices = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = radius * (0.8 + Math.random() * 0.4);
    vertices.push({
      x: centerX + Math.cos(angle) * r,
      y: centerY + Math.sin(angle) * r,
    });
  }
  return vertices;
};

export const generatePaths = () => {
  const sectorPaths: Path = [];

  const regions = [
    createPolygon(-100, -100, 5, 120),
    createPolygon(100, 100, 6, 100),
    createPolygon(0, 0, 7, 150),
    createPolygon(100, -100, 5, 90),
    createPolygon(-100, 100, 6, 110),
  ];

  regions.forEach((region, i) => {
    region.forEach((point, j) => {
      const nextPoint = region[(j + 1) % region.length];
      sectorPaths.push([point, nextPoint]);

      if (Math.random() < 0.3) {
        const otherRegion = regions[(i + 1) % regions.length];
        const connectPoint = otherRegion[Math.floor(Math.random() * otherRegion.length)];
        sectorPaths.push([point, connectPoint]);
      }
    });
  });

  return sectorPaths;
};
