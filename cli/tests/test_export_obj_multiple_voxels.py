import unittest
import os
from mino.core import VoxelModel
from mino.exporters.obj_exporter import export_obj

class TestExportOBJMultipleVoxels(unittest.TestCase):
    def setUp(self):
        self.filename = 'test_multi.obj'
        self.model = VoxelModel()
        for i in range(3):
            self.model.add_voxel(i, i, i, 100, 100, 100)

    def tearDown(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)

    def test_obj_file_vertex_count(self):
        export_obj(self.model, self.filename)
        with open(self.filename, 'r') as f:
            content = f.read()
            self.assertEqual(content.count('v '), 24)  

if __name__ == '__main__':
    unittest.main()
