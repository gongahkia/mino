import React from "react";
import { render, screen } from "@testing-library/react";
import { Canvas3D, Voxel } from "../src/components/Canvas3D";

describe("Canvas3D", () => {
  it("renders a canvas and displays voxels", () => {
    const voxels: Voxel[] = [
      { x: 1, y: 2, z: 3, color: 0xff0000 },
      { x: -1, y: 0, z: 0, color: 0x008080 },
    ];
    render(<Canvas3D voxels={voxels} />);
    // Should produce a canvas element
    const canvas = screen.getByRole("img", { hidden: true }) || document.querySelector("canvas");
    expect(canvas).toBeTruthy();
  });
});