import VoxelModel from '../core/voxelModel';

// Per-cube triangles (12 triangles per cube, each with 3 verts)
const CUBES = [
  // Each face, two triangles. Each vertex is [x, y, z] offset.
  // face: [ [v0], [v1], [v2] ], [ [v2], [v3], [v0] ]
  // Bottom (z = 0)
  [[0,0,0],[1,0,0],[1,1,0]], [[1,1,0],[0,1,0],[0,0,0]],
  // Top (z = 1)
  [[0,0,1],[1,1,1],[1,0,1]], [[1,1,1],[0,0,1],[0,1,1]],
  // Front (y = 0)
  [[0,0,0],[1,0,1],[1,0,0]], [[1,0,1],[0,0,0],[0,0,1]],
  // Back (y = 1)
  [[1,1,0],[1,1,1],[0,1,1]], [[0,1,1],[0,1,0],[1,1,0]],
  // Left (x = 0)
  [[0,0,0],[0,1,1],[0,0,1]], [[0,1,1],[0,0,0],[0,1,0]],
  // Right (x = 1)
  [[1,0,0],[1,0,1],[1,1,1]], [[1,1,1],[1,1,0],[1,0,0]],
];

function normal(v1: number[], v2: number[], v3: number[]): number[] {
  // Compute (v2-v1) x (v3-v1)
  const a = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
  const b = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
  return [
    a[1]*b[2] - a[2]*b[1],
    a[2]*b[0] - a[0]*b[2],
    a[0]*b[1] - a[1]*b[0]
  ];
}

export function exportStl(model: VoxelModel): string {
  const voxels = model.getAllVoxels();
  let stl = 'solid voxels\n';

  for (const v of voxels) {
    for (const tri of CUBES) {
      // Offset tri by voxel pos
      const v0 = [v.x + tri[0][0], v.y + tri[0][1], v.z + tri[0][2]];
      const v1 = [v.x + tri[1][0], v.y + tri[1][1], v.z + tri[1][2]];
      const v2 = [v.x + tri[2][0], v.y + tri[2][1], v.z + tri[2][2]];
      const [nx, ny, nz] = normal(v0, v1, v2);
      stl += `facet normal ${nx} ${ny} ${nz}\n`;
      stl += `  outer loop\n`;
      stl += `    vertex ${v0.join(' ')}\n`;
      stl += `    vertex ${v1.join(' ')}\n`;
      stl += `    vertex ${v2.join(' ')}\n`;
      stl += `  endloop\n`;
      stl += `endfacet\n`;
    }
  }
  stl += 'endsolid voxels\n';
  return stl;
}