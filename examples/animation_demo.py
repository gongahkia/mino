import time
from mino.api import MinoModel

model = MinoModel()
for i in range(5):
    model.add_voxel(i, 0, 0, 0, 0, 255)
def animate():
    for t in range(20):
        for i in range(5):
            model.update_voxel(i, 0, 0, 0, 0, 255)
            model.update_voxel(i, 0, 0, 255, 255, 0)
            model.update_voxel(i, 0, 0, 0, 0, 255)
        model.render(width=400, height=300)
        time.sleep(0.1)
if __name__ == '__main__':
    animate()
