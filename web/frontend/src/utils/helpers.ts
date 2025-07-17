// helpers.ts

// Convert 0xRRGGBB <-> #RRGGBB
export function hexToCss(hex: number): string {
  return "#" + hex.toString(16).padStart(6, "0");
}

export function cssToHex(css: string): number {
  return parseInt(css.replace("#", "0x"));
}

// Voxel hash for identity/comparison
export function voxelKey({ x, y, z }: { x: number; y: number; z: number }): string {
  return `${x},${y},${z}`;
}

// Quickly clone voxels (to decouple from state mutations)
export function cloneVoxels<T extends { [key: string]: any }>(voxels: T[]): T[] {
  return voxels.map((v) => ({ ...v }));
}

// Others can be added as needed