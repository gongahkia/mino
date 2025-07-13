import unittest
import os
from mino.core import VoxelModel
from mino.exporters.stl_exporter import export_stl

class TestExportSTLColorEncoding(unittest.TestCase):
    def setUp(self):
        self.filename = 'test_color.stl'
        self.model = VoxelModel()
        self.model.add_voxel(0, 0, 0, 255, 128, 64)

    def tearDown(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)

    def test_stl_file_header(self):
        export_stl(self.model, self.filename)
        with open(self.filename, 'rb') as f:
            header = f.read(80)
            self.assertIn(b'Mino STL Export', header)

if __name__ == '__main__':
    unittest.main()
