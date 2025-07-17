import json

class Voxel:
    def __init__(self, x, y, z, r, g, b):
        self.x = int(x)
        self.y = int(y)
        self.z = int(z)
        self.r = int(r)
        self.g = int(g)
        self.b = int(b)

    def to_tuple(self):
        return (self.x, self.y, self.z, self.r, self.g, self.b)

    def to_dict(self):
        return {'x': self.x, 'y': self.y, 'z': self.z, 'r': self.r, 'g': self.g, 'b': self.b}

    @staticmethod
    def from_dict(d):
        return Voxel(d['x'], d['y'], d['z'], d['r'], d['g'], d['b'])

    def __eq__(self, other):
        return (self.x, self.y, self.z) == (other.x, other.y, other.z)

    def __hash__(self):
        return hash((self.x, self.y, self.z))

class VoxelModel:
    def __init__(self):
        self.voxels = {}

    def add_voxel(self, x, y, z, r, g, b):
        v = Voxel(x, y, z, r, g, b)
        self.voxels[(x, y, z)] = v

    def remove_voxel(self, x, y, z):
        self.voxels.pop((x, y, z), None)

    def update_voxel(self, x, y, z, r, g, b):
        if (x, y, z) in self.voxels:
            self.voxels[(x, y, z)] = Voxel(x, y, z, r, g, b)

    def get_voxel(self, x, y, z):
        return self.voxels.get((x, y, z), None)

    def all_voxels(self):
        return list(self.voxels.values())

    def clear(self):
        self.voxels.clear()

    def to_json(self):
        return json.dumps([v.to_dict() for v in self.voxels.values()])

    def from_json(self, json_str):
        self.voxels.clear()
        data = json.loads(json_str)
        for d in data:
            v = Voxel.from_dict(d)
            self.voxels[(v.x, v.y, v.z)] = v

    def save(self, filename):
        with open(filename, 'w') as f:
            f.write(self.to_json())

    def load(self, filename):
        with open(filename, 'r') as f:
            self.from_json(f.read())
