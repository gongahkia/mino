import json
import math

def save_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f)

def load_json(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def clamp(val, minval, maxval):
    return max(minval, min(val, maxval))

def lerp(a, b, t):
    return a + (b - a) * t

def rgb_to_hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

def hex_to_rgb(hexstr):
    hexstr = hexstr.lstrip('#')
    lv = len(hexstr)
    return tuple(int(hexstr[i:i+lv//3], 16) for i in range(0, lv, lv//3))

def distance3d(x1, y1, z1, x2, y2, z2):
    return math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2)
