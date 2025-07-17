import React from "react";

interface ToolbarProps {
  onColorChange: (color: number) => void;
  onExport: (format: "obj" | "stl") => void;
  onClear: () => void;
  color: number;
}

import { ColorPicker } from "./ColorPicker";

export const Toolbar: React.FC<ToolbarProps> = ({
  onColorChange,
  onExport,
  onClear,
  color,
}) => {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <ColorPicker color={color} onChange={onColorChange} />
      <button onClick={() => onExport("obj")}>Export OBJ</button>
      <button onClick={() => onExport("stl")}>Export STL</button>
      <button onClick={onClear} style={{ color: "red" }}>
        Clear
      </button>
    </div>
  );
};