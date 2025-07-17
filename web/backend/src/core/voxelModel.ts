import { Voxel, voxelKey } from './voxel';

/**
 * VoxelModel: a collection of voxels with fast lookups and export-supporting access.
 */
export class VoxelModel {
  // Use a Map for fast access and duplicate prevention.
  private voxels: Map<string, Voxel>;

  constructor(initialVoxels: Voxel[] = []) {
    this.voxels = new Map();
    initialVoxels.forEach(voxel => this.addVoxel(voxel));
  }

  addVoxel(voxel: Voxel): void {
    this.voxels.set(voxelKey(voxel), voxel);
  }

  removeVoxel(voxel: Voxel): void {
    this.voxels.delete(voxelKey(voxel));
  }

  getVoxel(x: number, y: number, z: number): Voxel | undefined {
    return this.voxels.get(voxelKey({ x, y, z, color: 0 }));
  }

  getAllVoxels(): Voxel[] {
    return Array.from(this.voxels.values());
  }

  clear(): void {
    this.voxels.clear();
  }

  size(): number {
    return this.voxels.size;
  }
}

export default VoxelModel;