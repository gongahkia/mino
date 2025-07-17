import sys
from mino.api import MinoModel
import pygame
from mino.ui import ColorPicker, SimpleToolbar

def main():
    model = MinoModel()
    width, height = 800, 600
    pygame.init()
    screen = pygame.display.set_mode((width, height))
    pygame.display.set_caption("Mino App")
    clock = pygame.time.Clock()

    color_picker = ColorPicker(10, 10, 200, 30)
    toolbar_buttons = [
        ("Add", pygame.Rect(10, 50, 60, 30)),
        ("Remove", pygame.Rect(80, 50, 80, 30)),
        ("Save", pygame.Rect(10, 90, 60, 30)),
        ("Load", pygame.Rect(80, 90, 80, 30)),
        ("Export OBJ", pygame.Rect(10, 130, 80, 30)),
        ("Export STL", pygame.Rect(100, 130, 80, 30)),
        ("Clear", pygame.Rect(10, 170, 60, 30)),
        ("Render", pygame.Rect(80, 170, 80, 30))
    ]
    toolbar = SimpleToolbar(10, 50, 200, 200, toolbar_buttons)
    selected_action = None
    running = True

    grid_size = 16
    voxel_size = 20
    offset_x = 250
    offset_y = 50
    selected_voxel = [0, 0, 0]

    while running:
        screen.fill((60, 60, 60))
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            color_picker.handle_event(event)
            action = toolbar.handle_event(event)
            if action:
                selected_action = action
                if action == "Save":
                    model.save("model.json")
                elif action == "Load":
                    model.load("model.json")
                elif action == "Export OBJ":
                    model.export_obj("model.obj")
                elif action == "Export STL":
                    model.export_stl("model.stl")
                elif action == "Clear":
                    model.clear()
                elif action == "Render":
                    model.render(width, height)
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    selected_voxel[0] = max(0, selected_voxel[0] - 1)
                elif event.key == pygame.K_RIGHT:
                    selected_voxel[0] = min(grid_size - 1, selected_voxel[0] + 1)
                elif event.key == pygame.K_UP:
                    selected_voxel[1] = max(0, selected_voxel[1] - 1)
                elif event.key == pygame.K_DOWN:
                    selected_voxel[1] = min(grid_size - 1, selected_voxel[1] + 1)
                elif event.key == pygame.K_PAGEUP:
                    selected_voxel[2] = min(grid_size - 1, selected_voxel[2] + 1)
                elif event.key == pygame.K_PAGEDOWN:
                    selected_voxel[2] = max(0, selected_voxel[2] - 1)
                elif event.key == pygame.K_a:
                    r, g, b = color_picker.get_color()
                    model.add_voxel(*selected_voxel, r, g, b)
                elif event.key == pygame.K_r:
                    model.remove_voxel(*selected_voxel)

        color_picker.draw(screen)
        toolbar.draw(screen)

        for x in range(grid_size):
            for y in range(grid_size):
                rect = pygame.Rect(offset_x + x * voxel_size, offset_y + y * voxel_size, voxel_size, voxel_size)
                v = model.get_voxel(x, y, selected_voxel[2])
                if v:
                    pygame.draw.rect(screen, (v.r, v.g, v.b), rect)
                pygame.draw.rect(screen, (100, 100, 100), rect, 1)

        sel_rect = pygame.Rect(offset_x + selected_voxel[0] * voxel_size, offset_y + selected_voxel[1] * voxel_size, voxel_size, voxel_size)
        pygame.draw.rect(screen, (255, 255, 0), sel_rect, 3)

        font = pygame.font.SysFont(None, 24)
        z_text = font.render(f"Z: {selected_voxel[2]}", True, (255, 255, 255))
        screen.blit(z_text, (offset_x, offset_y + grid_size * voxel_size + 10))

        pygame.display.flip()
        clock.tick(30)
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
