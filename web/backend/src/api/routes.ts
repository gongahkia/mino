// routes.ts
import express, { Request, Response } from 'express';
import VoxelModel from '../core/voxelModel';
import { rleCompress, rleDecompress } from '../core/compression';
import { exportObj } from '../exporters/objExporter';
import { exportStl } from '../exporters/stlExporter';

// In-memory single model; in future, replace with DB or per-session storage.
let currentModel = new VoxelModel();

const router = express.Router();

/** Accepts JSON of voxels: [{x,y,z,color}, ...] */
router.post('/model', (req: Request, res: Response) => {
    const voxels = req.body.voxels;
    if (!Array.isArray(voxels)) {
        return res.status(400).json({ error: 'Missing voxels array' });
    }
    currentModel = new VoxelModel(voxels);
    res.json({ status: 'ok', count: currentModel.size() });
});

/** Gets current model as JSON */
router.get('/model', (req: Request, res: Response) => {
    res.json({ voxels: currentModel.getAllVoxels() });
});

/** Get compressed RLE model (for client sync) */
router.get('/model/rle', (req: Request, res: Response) => {
    const rleData = rleCompress(currentModel.getAllVoxels());
    res.json({ rle: rleData });
});

/** Load model from RLE data */
router.post('/model/rle', (req: Request, res: Response) => {
    const { rle } = req.body;
    if (!Array.isArray(rle)) {
        return res.status(400).json({ error: 'Missing rle array' });
    }
    const voxels = rleDecompress(rle);
    currentModel = new VoxelModel(voxels);
    res.json({ status: 'ok', count: currentModel.size() });
});

/** Export as OBJ or STL (returns raw string as file) */
router.get('/export/:format', (req: Request, res: Response) => {
    const format = req.params.format.toLowerCase();
    if (format === 'obj') {
        const objStr = exportObj(currentModel);
        res.setHeader('Content-Disposition', 'attachment; filename=mino.obj');
        res.setHeader('Content-Type', 'text/plain');
        return res.send(objStr);
    }
    if (format === 'stl') {
        const stlStr = exportStl(currentModel);
        res.setHeader('Content-Disposition', 'attachment; filename=mino.stl');
        res.setHeader('Content-Type', 'text/plain');
        return res.send(stlStr);
    }
    return res.status(400).json({ error: 'Invalid format' });
});

export default router;