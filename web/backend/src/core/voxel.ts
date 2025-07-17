// Basic Voxel data structure and utility types.

export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: number; // e.g., as 0xRRGGBB or application-specific index
}

export function voxelKey(voxel: Voxel): string {
  // For hashing voxels in sets/maps
  return `${voxel.x},${voxel.y},${voxel.z}`;
}