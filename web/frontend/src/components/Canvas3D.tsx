import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: number; // 0xRRGGBB
}

interface Canvas3DProps {
  voxels: Voxel[];
  width?: number;
  height?: number;
  onVoxelClick?: (voxel: Voxel | null, pos?: [number, number, number]) => void;
}

const VOXEL_SIZE = 1;

function colorToThreeColor(hex: number): THREE.Color {
  return new THREE.Color(hex);
}

export const Canvas3D: React.FC<Canvas3DProps> = ({
  voxels,
  width = 512,
  height = 384,
  onVoxelClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let frameId: number;
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    camera.position.set(10, 10, 18);

    // Add a soft light
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(20, 30, 10);
    scene.add(dirLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.innerHTML = ""; // Clear prev
    mountRef.current.appendChild(renderer.domElement);

    // Optional: controls, not included to minimize deps; see three/examples/jsm/controls/OrbitControls
    // Voxel Meshes
    const voxelMeshes: THREE.Mesh[] = [];
    const geo = new THREE.BoxBufferGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);

    for (const v of voxels) {
      const mat = new THREE.MeshStandardMaterial({
        color: colorToThreeColor(v.color),
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        v.x * VOXEL_SIZE,
        v.y * VOXEL_SIZE,
        v.z * VOXEL_SIZE
      );
      voxelMeshes.push(mesh);
      scene.add(mesh);
    }

    // Simple auto-rotation
    const animate = () => {
      scene.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle Clicks (map screen to voxel coordinate via raycasting)
    if (onVoxelClick) {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      function onClick(event: MouseEvent) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(voxelMeshes);
        if (intersects.length > 0) {
          const meshIdx = voxelMeshes.indexOf(
            intersects[0].object as THREE.Mesh
          );
          onVoxelClick(voxels[meshIdx], undefined);
        } else {
          onVoxelClick(null, undefined);
        }
      }
      renderer.domElement.addEventListener("click", onClick);
      return () =>
        renderer.domElement.removeEventListener("click", onClick);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      voxelMeshes.forEach((m) => {
        scene.remove(m);
        m.geometry.dispose();
        if ((m.material as THREE.Material).dispose) (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
    // eslint-disable-next-line
  }, [voxels, width, height, onVoxelClick]);

  return <div ref={mountRef} style={{ width, height }} />;
};