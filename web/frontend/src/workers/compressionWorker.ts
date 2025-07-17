/**
 * RLE encode/decode for voxels, for large models without blocking UI
 * PostMessage API:
 *  { cmd: "compress", voxels: [...] }
 *  { cmd: "decompress", rle: [...] }
 */

export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: number;
}

self.onmessage = function (e: MessageEvent) {
  const { cmd, voxels, rle } = e.data;

  if (cmd === "compress") {
    postMessage({ rle: rleCompress(voxels) });
  } else if (cmd === "decompress") {
    postMessage({ voxels: rleDecompress(rle) });
  }
};

// The RLE logic, from backend!

function rleCompress(voxels: Voxel[]): any[] {
  if (!voxels || voxels.length === 0) return [];
  const sorted = [...voxels].sort((a, b) =>
    a.z - b.z || a.y - b.y || a.x - b.x || a.color - b.color
  );
  const result = [];
  let streak = 1;
  let curr = sorted[0];
  for (let i = 1; i < sorted.length; ++i) {
    const v = sorted[i];
    if (
      v.x === curr.x + streak &&
      v.y === curr.y &&
      v.z === curr.z &&
      v.color === curr.color
    ) {
      streak++;
    } else {
      result.push({ x: curr.x, y: curr.y, z: curr.z, len: streak, color: curr.color });
      curr = v;
      streak = 1;
    }
  }
  result.push({ x: curr.x, y: curr.y, z: curr.z, len: streak, color: curr.color });
  return result;
}

function rleDecompress(data: any[]): Voxel[] {
  const voxels: Voxel[] = [];
  for (const { x, y, z, len, color } of data) {
    for (let dx = 0; dx < len; ++dx) {
      voxels.push({ x: x + dx, y, z, color });
    }
  }
  return voxels;
}