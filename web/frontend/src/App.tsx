import React, { useState, useEffect, useCallback } from "react";
import { Canvas3D, Voxel } from "./components/Canvas3D";
import { Toolbar } from "./components/Toolbar";
import { hexToCss, voxelKey } from "./utils/helpers";
import {
  fetchModel,
  saveModel,
  exportModel,
} from "./services/apiClient";

// Editable grid extent, to prevent crazy coordinates in this starter
const GRID_BOUND = 32;

const App: React.FC = () => {
  // State: model voxels, selected color
  const [voxels, setVoxels] = useState<Voxel[]>([]);
  const [color, setColor] = useState<number>(0xff0000);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch voxel model on startup
  useEffect(() => {
    setIsLoading(true);
    fetchModel()
      .then(setVoxels)
      .finally(() => setIsLoading(false));
  }, []);

  // Add or remove voxel at a clicked position
  const handleVoxelClick = useCallback(
    (clicked: Voxel | null, pos?: [number, number, number]) => {
      // For now, toggle: if voxel present, remove; else, add at that spot
      if (!clicked || !pos) return;
      setVoxels((voxels) => {
        const key = voxelKey(clicked);
        const exists = voxels.some((v) => voxelKey(v) === key);
        if (exists) {
          return voxels.filter((v) => voxelKey(v) !== key);
        } else {
          // Clamp within grid
          if (
            Math.abs(clicked.x) > GRID_BOUND ||
            Math.abs(clicked.y) > GRID_BOUND ||
            Math.abs(clicked.z) > GRID_BOUND
          )
            return voxels;
          // Add voxel at that spot
          return [...voxels, { ...clicked, color }];
        }
      });
    },
    [color]
  );

  // Save voxel model to backend whenever it changes
  useEffect(() => {
    // Don't save on first render
    if (voxels.length === 0) return;
    saveModel(voxels).catch((err) =>
      console.warn("Failed to auto-save model:", err)
    );
  }, [voxels]);

  // Clear all voxels
  const handleClear = () => setVoxels([]);

  // Export model
  const handleExport = (format: "obj" | "stl") => exportModel(format);

  // UI
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>
        <span role='img' aria-label='voxel'>
          🟦
        </span>{" "}
        Mino Web Voxel Editor
      </h1>
      <Toolbar
        color={color}
        onColorChange={setColor}
        onExport={handleExport}
        onClear={handleClear}
      />
      <div
        style={{
          border: "1px solid #bbb",
          background: "#eee",
          display: "inline-block",
        }}
      >
        <Canvas3D voxels={voxels} onVoxelClick={handleVoxelClick} width={512} height={384} />
      </div>
      <div style={{ marginTop: 12 }}>
        <strong>Status:</strong> {isLoading ? "Loading..." : `Voxels: ${voxels.length}`}
        <div style={{ marginTop: 4 }}>
          <span>Active Color:</span>
          <span
            style={{
              display: "inline-block",
              background: hexToCss(color),
              width: 22,
              height: 22,
              verticalAlign: "middle",
              marginLeft: 6,
              border: "1px solid #888",
            }}
          />
        </div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 10 }}>
          Click a voxel to add/remove.<br />Try editing, saving, and exporting!
        </div>
      </div>
    </div>
  );
};

export default App;