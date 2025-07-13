import unittest
from mino.core import Voxel, VoxelModel

class TestVoxelModel(unittest.TestCase):
    def test_add_and_get_voxel(self):
        model = VoxelModel()
        model.add_voxel(1, 2, 3, 10, 20, 30)
        v = model.get_voxel(1, 2, 3)
        self.assertIsNotNone(v)
        self.assertEqual((v.x, v.y, v.z, v.r, v.g, v.b), (1, 2, 3, 10, 20, 30))

    def test_remove_voxel(self):
        model = VoxelModel()
        model.add_voxel(1, 1, 1, 100, 100, 100)
        model.remove_voxel(1, 1, 1)
        self.assertIsNone(model.get_voxel(1, 1, 1))

    def test_update_voxel(self):
        model = VoxelModel()
        model.add_voxel(2, 2, 2, 0, 0, 0)
        model.update_voxel(2, 2, 2, 255, 255, 255)
        v = model.get_voxel(2, 2, 2)
        self.assertEqual((v.r, v.g, v.b), (255, 255, 255))

    def test_save_and_load(self):
        model = VoxelModel()
        model.add_voxel(0, 0, 0, 1, 2, 3)
        model.save('test_voxel.json')
        model2 = VoxelModel()
        model2.load('test_voxel.json')
        v = model2.get_voxel(0, 0, 0)
        self.assertIsNotNone(v)
        self.assertEqual((v.r, v.g, v.b), (1, 2, 3))

if __name__ == '__main__':
    unittest.main()
