import { Voxel } from './voxel';

/**
 * RLE: Compresses a sorted array of voxels by coordinates and color.
 * Returns an array of [startVoxel, length, color] tuples.
 */
export function rleCompress(voxels: Voxel[]): Array<{ x: number, y: number, z: number, len: number, color: number }> {
  if (voxels.length === 0) return [];

  // Sort in a predictable order for RLE
  const sorted = [...voxels].sort((a, b) =>
    (a.z - b.z) || (a.y - b.y) || (a.x - b.x) || (a.color - b.color)
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

export function rleDecompress(data: Array<{ x: number, y: number, z: number, len: number, color: number }>): Voxel[] {
  const voxels: Voxel[] = [];
  for (const { x, y, z, len, color } of data) {
    for (let dx = 0; dx < len; ++dx) {
      voxels.push({ x: x + dx, y, z, color });
    }
  }
  return voxels;
}

/**
 * Sparse Voxel Octree (SVO): Barebones reference implementation.
 */
type SVOChildNode = SVO | null;
type SVONodeChildren = [SVOChildNode, SVOChildNode, SVOChildNode, SVOChildNode, SVOChildNode, SVOChildNode, SVOChildNode, SVOChildNode];

export class SVO {
  level: number; // Depth in octree
  bounds: { min: [number, number, number], max: [number, number, number] };
  children: SVONodeChildren | null = null; // Leaf has no children
  color: number | null; // Only for leaves

  constructor(level: number, bounds: { min: [number, number, number], max: [number, number, number] }, color: number | null = null) {
    this.level = level;
    this.bounds = bounds;
    this.color = color;
  }

  static buildFromVoxels(voxels: Voxel[], maxDepth: number = 5): SVO {
    // Recursively builds the SVO. For simplicity, stop subdividing at maxDepth or if all the same color.
    const bounds = SVO.voxelArrayBounds(voxels);
    return SVO._buildRecursive(voxels, bounds, 0, maxDepth);
  }

  static _buildRecursive(voxels: Voxel[], bounds: { min: [number, number, number], max: [number, number, number] }, depth: number, maxDepth: number): SVO {
    if (voxels.length === 0) return new SVO(depth, bounds, null); // Empty
    const colorSet = new Set(voxels.map(v => v.color));
    if (colorSet.size === 1 || depth === maxDepth) {
      // Homogeneous or reached desired depth
      return new SVO(depth, bounds, voxels[0].color);
    }
    const children: SVONodeChildren = [null, null, null, null, null, null, null, null];
    const [minX, minY, minZ] = bounds.min;
    const [maxX, maxY, maxZ] = bounds.max;
    const midX = (minX + maxX) >> 1;
    const midY = (minY + maxY) >> 1;
    const midZ = (minZ + maxZ) >> 1;
    for (let i = 0; i < 8; ++i) {
      // Each octant
      const childMin: [number, number, number] = [
        (i & 1) ? midX + 1 : minX,
        (i & 2) ? midY + 1 : minY,
        (i & 4) ? midZ + 1 : minZ,
      ];
      const childMax: [number, number, number] = [
        (i & 1) ? maxX : midX,
        (i & 2) ? maxY : midY,
        (i & 4) ? maxZ : midZ,
      ];
      // Voxels falling into this octant
      const childVoxels = voxels.filter(v =>
        v.x >= childMin[0] && v.x <= childMax[0] &&
        v.y >= childMin[1] && v.y <= childMax[1] &&
        v.z >= childMin[2] && v.z <= childMax[2]
      );
      children[i] = SVO._buildRecursive(childVoxels, { min: childMin, max: childMax }, depth + 1, maxDepth);
    }
    const node = new SVO(depth, bounds, null);
    node.children = children;
    return node;
  }

  static voxelArrayBounds(voxels: Voxel[]): { min: [number, number, number], max: [number, number, number] } {
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (const v of voxels) {
      if (v.x < minX) minX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.z < minZ) minZ = v.z;
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
      if (v.z > maxZ) maxZ = v.z;
    }
    return { min: [minX, minY, minZ], max: [maxX, maxY, maxZ] };
  }

  // Add more methods for traversal, serialization, etc. as needed.
}