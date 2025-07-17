import unittest
import pygame
from mino.ui import ColorPicker

class TestUIColorPicker(unittest.TestCase):
    def setUp(self):
        pygame.init()
        self.picker = ColorPicker(0, 0, 100, 20)

    def tearDown(self):
        pygame.quit()

    def test_color_get_set(self):
        self.picker.color = (123, 45, 67)
        self.assertEqual(self.picker.get_color(), (123, 45, 67))

    def test_handle_event_out_of_bounds(self):
        event = pygame.event.Event(pygame.MOUSEBUTTONDOWN, pos=(200, 200))
        self.picker.handle_event(event)
        self.assertFalse(self.picker.active)

if __name__ == '__main__':
    unittest.main()
