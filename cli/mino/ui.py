import pygame
from .utils import clamp

class ColorPicker:
    def __init__(self, x, y, width=200, height=30):
        self.rect = pygame.Rect(x, y, width, height)
        self.color = (255, 0, 0)
        self.active = False

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.rect.collidepoint(event.pos):
                self.active = True
        elif event.type == pygame.MOUSEBUTTONUP:
            self.active = False
        elif event.type == pygame.MOUSEMOTION and self.active:
            rel_x = clamp(event.pos[0] - self.rect.x, 0, self.rect.width)
            rel_y = clamp(event.pos[1] - self.rect.y, 0, self.rect.height)
            r = int(255 * rel_x / self.rect.width)
            g = int(255 * rel_y / self.rect.height)
            b = 255 - int((r + g) / 2)
            self.color = (r, g, b)

    def draw(self, surface):
        pygame.draw.rect(surface, self.color, self.rect)
        pygame.draw.rect(surface, (0, 0, 0), self.rect, 2)

    def get_color(self):
        return self.color

class SimpleToolbar:
    def __init__(self, x, y, width=120, height=30, buttons=None):
        self.rect = pygame.Rect(x, y, width, height)
        self.buttons = buttons or []
        self.selected = None

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            for i, (label, rect) in enumerate(self.buttons):
                if rect.collidepoint(event.pos):
                    self.selected = label
                    return label
        return None

    def draw(self, surface):
        for label, rect in self.buttons:
            pygame.draw.rect(surface, (200, 200, 200), rect)
            pygame.draw.rect(surface, (0, 0, 0), rect, 2)
            font = pygame.font.SysFont(None, 24)
            img = font.render(label, True, (0, 0, 0))
            surface.blit(img, (rect.x + 5, rect.y + 5))
