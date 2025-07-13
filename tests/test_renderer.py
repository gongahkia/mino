import unittest
from mino.core import VoxelModel
from mino.renderer import VoxelRenderer

class DummyModel(VoxelModel):
    def __init__(self):
        super().__init__()
        self.add_voxel(0, 0, 0, 255, 0, 0)
        self.add_voxel(1, 0, 0, 0, 255, 0)
        self.add_voxel(0, 1, 0, 0, 0, 255)

class TestVoxelRenderer(unittest.TestCase):
    def test_renderer_init(self):
        model = DummyModel()
        renderer = VoxelRenderer(model, width=100, height=100)
        self.assertEqual(renderer.model, model)
        self.assertEqual(renderer.width, 100)
        self.assertEqual(renderer.height, 100)

    def test_camera_controls(self):
        model = DummyModel()
        renderer = VoxelRenderer(model)
        renderer.camera.move(1, 2, 3)
        self.assertEqual(renderer.camera.pos, [1, 2, -37])
        renderer.camera.rotate(0.1, 0.2)
        self.assertAlmostEqual(renderer.camera.rot[0], 0.1)
        self.assertAlmostEqual(renderer.camera.rot[1], 0.2)
        renderer.camera.set_zoom(50)
        self.assertEqual(renderer.camera.zoom, 50)

if __name__ == '__main__':
    unittest.main()
