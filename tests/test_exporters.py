import unittest
import os
from mino.core import VoxelModel
from mino.exporters.obj_exporter import export_obj
from mino.exporters.stl_exporter import export_stl

class TestExporters(unittest.TestCase):
    def setUp(self):
        self.model = VoxelModel()
        self.model.add_voxel(0, 0, 0, 255, 0, 0)
        self.model.add_voxel(1, 1, 1, 0, 255, 0)

    def test_export_obj(self):
        export_obj(self.model, 'test.obj')
        self.assertTrue(os.path.exists('test.obj'))
        with open('test.obj', 'r') as f:
            content = f.read()
            self.assertIn('v', content)
            self.assertIn('f', content)
        os.remove('test.obj')

    def test_export_stl(self):
        export_stl(self.model, 'test.stl')
        self.assertTrue(os.path.exists('test.stl'))
        with open('test.stl', 'rb') as f:
            header = f.read(80)
            self.assertIn(b'Mino STL Export', header)
        os.remove('test.stl')

if __name__ == '__main__':
    unittest.main()
