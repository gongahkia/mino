from mino.api import MinoModel

model = MinoModel()
for x in range(2):
    for y in range(2):
        for z in range(2):
            color = (255, 0, 0) if (x + y + z) % 2 == 0 else (0, 255, 0)
            model.add_voxel(x, y, z, *color)
model.export_obj('simple_cube.obj')
model.export_stl('simple_cube.stl')
model.render()
