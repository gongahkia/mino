import struct

def _write_stl_triangle(f, v1, v2, v3, color=None):
    f.write(struct.pack('<3f', 0.0, 0.0, 0.0))
    for v in (v1, v2, v3):
        f.write(struct.pack('<3f', *v))
    attr = 0
    if color:
        r, g, b = color
        attr = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3)
    f.write(struct.pack('<H', attr))

def export_stl(model, filename):
    voxel_size = 1.0
    offset = voxel_size / 2.0
    cube_vertices = [
        (-offset, -offset, -offset),
        (offset, -offset, -offset),
        (offset, offset, -offset),
        (-offset, offset, -offset),
        (-offset, -offset, offset),
        (offset, -offset, offset),
        (offset, offset, offset),
        (-offset, offset, offset)
    ]
    cube_faces = [
        (0, 1, 2, 3),
        (4, 5, 6, 7),
        (0, 1, 5, 4),
        (1, 2, 6, 5),
        (2, 3, 7, 6),
        (3, 0, 4, 7)
    ]
    triangles = []
    colors = []
    for v in model.all_voxels():
        verts = [(v.x + x, v.y + y, v.z + z) for (x, y, z) in cube_vertices]
        for face in cube_faces:
            triangles.append((verts[face[0]], verts[face[1]], verts[face[2]]))
            triangles.append((verts[face[0]], verts[face[2]], verts[face[3]]))
            colors.append((v.r, v.g, v.b))
            colors.append((v.r, v.g, v.b))
    with open(filename, 'wb') as f:
        f.write(b'Mino STL Export' + b' ' * (80 - len('Mino STL Export')))
        f.write(struct.pack('<I', len(triangles)))
        for i, tri in enumerate(triangles):
            _write_stl_triangle(f, *tri, color=colors[i])
