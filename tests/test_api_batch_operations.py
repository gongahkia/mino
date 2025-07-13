import unittest
from mino.api import MinoModel

class TestAPIBatchOperations(unittest.TestCase):
    def test_batch_add_and_remove(self):
        model = MinoModel()
        voxels = [(x, 0, 0, 10*x, 20*x, 30*x) for x in range(5)]
        for v in voxels:
            model.add_voxel(*v)
        for x in range(5):
            self.assertIsNotNone(model.get_voxel(x, 0, 0))
        for x in range(5):
            model.remove_voxel(x, 0, 0)
            self.assertIsNone(model.get_voxel(x, 0, 0))

if __name__ == '__main__':
    unittest.main()
