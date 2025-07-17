import unittest
from mino import utils

class TestUtilsFunctions(unittest.TestCase):
    def test_lerp(self):
        self.assertEqual(utils.lerp(0, 10, 0.5), 5)
        self.assertEqual(utils.lerp(10, 20, 0), 10)
        self.assertEqual(utils.lerp(10, 20, 1), 20)

    def test_distance3d(self):
        self.assertAlmostEqual(utils.distance3d(0, 0, 0, 1, 2, 2), 3.0)

    def test_rgb_hex_conversion(self):
        hex_color = utils.rgb_to_hex(255, 128, 0)
        self.assertEqual(hex_color, '#ff8000')
        rgb = utils.hex_to_rgb('#ff8000')
        self.assertEqual(rgb, (255, 128, 0))

if __name__ == '__main__':
    unittest.main()
