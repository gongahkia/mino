// math.ts
// General math helpers for voxel operations, geometry, and future use.

export function clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
}

/** Vector helper: Add two 3D vectors */
export function vec3Add(a: [number, number, number], b: [number, number, number]): [number, number, number] {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

/** Vector helper: Subtract vector b from a */
export function vec3Sub(a: [number, number, number], b: [number, number, number]): [number, number, number] {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

/** Vector helper: Cross product (3D) */
export function vec3Cross(a: [number, number, number], b: [number, number, number]): [number, number, number] {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0],
    ];
}

/** Vector helper: Normalize vector */
export function vec3Normalize(v: [number, number, number]): [number, number, number] {
    const len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    if (len === 0) return [0,0,0];
    return [v[0]/len, v[1]/len, v[2]/len];
}

/** Color helpers. Convert 0xRRGGBB to [r,g,b] (0-255) */
export function hexToRgb(hex: number): [number, number, number] {
    return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF];
}

/** Euclidean distance between two voxels */
export function voxelDistance(a: {x: number, y: number, z: number}, b: {x: number, y: number, z: number}): number {
    return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2);
}