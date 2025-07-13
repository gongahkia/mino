import pygame
import math

class Camera:
    def __init__(self, pos=(0, 0, -40), rot=(0, 0), zoom=20):
        self.pos = list(pos)
        self.rot = list(rot)
        self.zoom = zoom

    def move(self, dx, dy, dz):
        self.pos[0] += dx
        self.pos[1] += dy
        self.pos[2] += dz

    def rotate(self, dtheta, dphi):
        self.rot[0] += dtheta
        self.rot[1] += dphi

    def set_zoom(self, zoom):
        self.zoom = max(1, zoom)

def project(point, camera, screen_size):
    x, y, z = point
    theta, phi = camera.rot
    cos_t, sin_t = math.cos(theta), math.sin(theta)
    cos_p, sin_p = math.cos(phi), math.sin(phi)
    xz = cos_t * x - sin_t * z
    zz = sin_t * x + cos_t * z
    yz = cos_p * y - sin_p * zz
    zz = sin_p * y + cos_p * zz
    factor = camera.zoom
    sx = int(screen_size[0] / 2 + xz * factor)
    sy = int(screen_size[1] / 2 - yz * factor)
    return sx, sy, zz

def draw_voxel(surface, pos, size, color):
    x, y = pos
    pygame.draw.rect(surface, color, (x - size // 2, y - size // 2, size, size))

class VoxelRenderer:
    def __init__(self, model, width=800, height=600):
        self.model = model
        self.width = width
        self.height = height
        self.camera = Camera()
        self.running = False

    def handle_input(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.camera.rotate(-0.05, 0)
        if keys[pygame.K_RIGHT]:
            self.camera.rotate(0.05, 0)
        if keys[pygame.K_UP]:
            self.camera.rotate(0, -0.05)
        if keys[pygame.K_DOWN]:
            self.camera.rotate(0, 0.05)
        if keys[pygame.K_w]:
            self.camera.move(0, 1, 0)
        if keys[pygame.K_s]:
            self.camera.move(0, -1, 0)
        if keys[pygame.K_a]:
            self.camera.move(-1, 0, 0)
        if keys[pygame.K_d]:
            self.camera.move(1, 0, 0)
        if keys[pygame.K_q]:
            self.camera.move(0, 0, 1)
        if keys[pygame.K_e]:
            self.camera.move(0, 0, -1)

    def render(self):
        pygame.init()
        screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption("Mino Voxel Renderer")
        clock = pygame.time.Clock()
        self.running = True
        while self.running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 4:
                        self.camera.set_zoom(self.camera.zoom + 2)
                    elif event.button == 5:
                        self.camera.set_zoom(self.camera.zoom - 2)
            self.handle_input()
            screen.fill((40, 40, 40))
            voxels = self.model.all_voxels()
            voxels = sorted(voxels, key=lambda v: v.z)
            for v in voxels:
                sx, sy, _ = project((v.x - self.camera.pos[0], v.y - self.camera.pos[1], v.z - self.camera.pos[2]), self.camera, (self.width, self.height))
                draw_voxel(screen, (sx, sy), int(self.camera.zoom), (v.r, v.g, v.b))
            pygame.display.flip()
            clock.tick(60)
        pygame.quit()
