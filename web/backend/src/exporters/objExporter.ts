import VoxelModel from '../core/voxelModel';

// Each voxel is rendered as a unit cube. Use a simple cube template, XY plane up front, offset by voxel.
const CUBE_VERTS = [
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], // bottom
  [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], // top
];
const CUBE_FACES = [
  // Sides (each as [v0,v1,v2,v3]), OBJ is 1-indexed, add per-cube offsets!
  [0, 1, 2, 3], // bottom
  [4, 5, 6, 7], // top
  [0, 1, 5, 4], // front
  [1, 2, 6, 5], // right
  [2, 3, 7, 6], // back
  [3, 0, 4, 7], // left
];

export function exportObj(model: VoxelModel): string {
  const voxels = model.getAllVoxels();
  let obj = '';
  let vertCount = 0;

  for (const v of voxels) {
    // Write 8 vertices for this cube
    for (const [dx, dy, dz] of CUBE_VERTS) {
      obj += `v ${v.x + dx} ${v.y + dy} ${v.z + dz}\n`;
    }
  }

  // For each voxel, write faces (6 faces per cube)
  for (let i = 0; i < voxels.length; ++i) {
    // OBJ uses 1-based indexing
    const base = vertCount + 1;
    for (const [a, b, c, d] of CUBE_FACES) {
      obj += `f ${base + a} ${base + b} ${base + c} ${base + d}\n`;
    }
    vertCount += 8;
  }
  // Optionally, add color/material data; standard OBJ doesn't support per-face color, but you might want a custom MTL file.
  return obj;
}