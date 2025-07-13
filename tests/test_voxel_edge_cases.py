import unittest
from mino.core import VoxelModel

class TestVoxelEdgeCases(unittest.TestCase):
    def test_negative_coordinates(self):
        model = VoxelModel()
        model.add_voxel(-1, -1, -1, 10, 20, 30)
        v = model.get_voxel(-1, -1, -1)
        self.assertIsNotNone(v)
        self.assertEqual((v.x, v.y, v.z), (-1, -1, -1))

    def test_max_color_values(self):
        model = VoxelModel()
        model.add_voxel(0, 0, 0, 255, 255, 255)
        v = model.get_voxel(0, 0, 0)
        self.assertEqual((v.r, v.g, v.b), (255, 255, 255))

    def test_min_color_values(self):
        model = VoxelModel()
        model.add_voxel(0, 0, 0, 0, 0, 0)
        v = model.get_voxel(0, 0, 0)
        self.assertEqual((v.r, v.g, v.b), (0, 0, 0))

if __name__ == '__main__':
    unittest.main()
