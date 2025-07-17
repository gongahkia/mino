// core.test.ts
import { describe, expect, test } from '@jest/globals';
import VoxelModel from '../src/core/voxelModel';
import { rleCompress, rleDecompress } from '../src/core/compression';
import { Voxel } from '../src/core/voxel';

describe('VoxelModel', () => {
    test('add/remove/get works', () => {
        const vox = { x: 1, y: 2, z: 3, color: 0xff00ff };
        const model = new VoxelModel();
        model.addVoxel(vox);
        expect(model.size()).toBe(1);
        expect(model.getVoxel(1,2,3)).toEqual(vox);
        model.removeVoxel(vox);
        expect(model.size()).toBe(0);
    });
});

describe('RLE Compression', () => {
    test('compress + decompress roundtrip', () => {
        const voxels: Voxel[] = [
            {x:0,y:0,z:0,color:1},
            {x:1,y:0,z:0,color:1},
            {x:2,y:0,z:0,color:2},
            {x:2,y:0,z:1,color:2},
        ];
        const rle = rleCompress(voxels);
        const out = rleDecompress(rle);
        expect(out).toEqual([
            {x:0,y:0,z:0,color:1},
            {x:1,y:0,z:0,color:1},
            {x:2,y:0,z:0,color:2},
            {x:2,y:0,z:1,color:2},
        ]);
    });
});