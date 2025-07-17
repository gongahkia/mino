// apiClient.ts

export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: number;
}

const BASE = "http://localhost:4000/api";

/** GET voxel array (from backend's JSON model) */
export async function fetchModel(): Promise<Voxel[]> {
  const res = await fetch(`${BASE}/model`);
  if (!res.ok) throw new Error("Failed to fetch model");
  const data = await res.json();
  return data.voxels;
}

/** POST new model voxels */
export async function saveModel(voxels: Voxel[]): Promise<void> {
  const res = await fetch(`${BASE}/model`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ voxels }),
  });
  if (!res.ok) throw new Error("Failed to save model");
}

/** Fetch compressed RLE from server */
export async function fetchRleModel() {
  const res = await fetch(`${BASE}/model/rle`);
  if (!res.ok) throw new Error("Failed to get RLE");
  return res.json(); // { rle: [...] }
}

/** Save via RLE compression to backend */
export async function saveRleModel(rle: any) {
  const res = await fetch(`${BASE}/model/rle`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ rle }),
  });
  if (!res.ok) throw new Error("Failed to save RLE");
}

/** Export */
export async function exportModel(format: "obj" | "stl") {
  const res = await fetch(`${BASE}/export/${format}`);
  if (!res.ok) throw new Error("Export failed");
  const blob = await res.blob();
  // Download in browser
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mino.${format}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}