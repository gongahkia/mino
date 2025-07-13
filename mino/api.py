from .core import VoxelModel
from .renderer import VoxelRenderer
from .exporters.obj_exporter import export_obj
from .exporters.stl_exporter import export_stl

class MinoModel:
    def __init__(self):
        self.model = VoxelModel()

    def add_voxel(self, x, y, z, r, g, b):
        self.model.add_voxel(x, y, z, r, g, b)

    def remove_voxel(self, x, y, z):
        self.model.remove_voxel(x, y, z)

    def update_voxel(self, x, y, z, r, g, b):
        self.model.update_voxel(x, y, z, r, g, b)

    def get_voxel(self, x, y, z):
        return self.model.get_voxel(x, y, z)

    def clear(self):
        self.model.clear()

    def load(self, filename):
        self.model.load(filename)

    def save(self, filename):
        self.model.save(filename)

    def export_obj(self, filename):
        export_obj(self.model, filename)

    def export_stl(self, filename):
        export_stl(self.model, filename)

    def all_voxels(self):
        return self.model.all_voxels()

    def render(self, width=800, height=600):
        renderer = VoxelRenderer(self.model, width, height)
        renderer.render()
