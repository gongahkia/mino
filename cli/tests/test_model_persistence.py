import unittest
import os
from mino.core import VoxelModel

class TestModelPersistence(unittest.TestCase):
    def setUp(self):
        self.filename = 'test_model_persistence.json'
        self.model = VoxelModel()
        self.model.add_voxel(2, 3, 4, 100, 150, 200)

    def tearDown(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)

    def test_save_and_load_integrity(self):
        self.model.save(self.filename)
        loaded = VoxelModel()
        loaded.load(self.filename)
        v = loaded.get_voxel(2, 3, 4)
        self.assertIsNotNone(v)
        self.assertEqual((v.r, v.g, v.b), (100, 150, 200))

if __name__ == '__main__':
    unittest.main()
