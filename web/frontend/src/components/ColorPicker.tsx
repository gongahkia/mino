import React from "react";

interface ColorPickerProps {
  color: number;
  onChange: (color: number) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value.replace("#", "0x")));
  };
  // Convert 0xRRGGBB -> #RRGGBB
  const hexStr = "#" + color.toString(16).padStart(6, "0");
  return (
    <input
      type="color"
      value={hexStr}
      onChange={handleChange}
      style={{ width: "2rem", height: "2rem" }}
      title={`Current color: ${hexStr}`}
    />
  );
};