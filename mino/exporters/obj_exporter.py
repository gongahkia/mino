def export_obj(model, filename):
    vertices = []
    faces = []
    colors = []
    voxel_size = 1.0
    offset = voxel_size / 2.0
    voxel_vertices = [
        (-offset, -offset, -offset),
        (offset, -offset, -offset),
        (offset, offset, -offset),
        (-offset, offset, -offset),
        (-offset, -offset, offset),
        (offset, -offset, offset),
        (offset, offset, offset),
        (-offset, offset, offset)
    ]
    voxel_faces = [
        (0, 1, 2, 3),
        (7, 6, 5, 4),
        (0, 4, 5, 1),
        (1, 5, 6, 2),
        (2, 6, 7, 3),
        (3, 7, 4, 0)
    ]
    for v in model.all_voxels():
        base_idx = len(vertices)
        for vx, vy, vz in voxel_vertices:
            vertices.append((v.x + vx, v.y + vy, v.z + vz))
        for f in voxel_faces:
            faces.append(tuple(base_idx + idx + 1 for idx in f))
        colors.append((v.r, v.g, v.b))
    with open(filename, 'w') as f:
        for vert in vertices:
            f.write('v {:.4f} {:.4f} {:.4f}\n'.format(*vert))
        for i, face in enumerate(faces):
            f.write('f {} {} {} {}\n'.format(*face))
