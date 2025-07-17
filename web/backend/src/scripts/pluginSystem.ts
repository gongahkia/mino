// pluginSystem.ts
import vm from 'vm';
import VoxelModel from '../core/voxelModel';
import { Voxel } from '../core/voxel';

// Optional: Restrict what global objects are available!
const SANDBOX_BASE = {
    console: { log: (...args: any[]) => console.log('[PLUGIN]', ...args) },
};

/**
 * Run a JS plugin script in a sandboxed environment.
 *
 * @param source Text source of user plugin
 * @param context Context object. { model: VoxelModel }
 * @returns Updated voxel list (optional)
 */
export function runPlugin(source: string, context: { model: VoxelModel }): Voxel[] {
    const sandbox = {
        ...SANDBOX_BASE,
        model: context.model,
        VoxelModel,
        Voxel, // for TS type info
        output: [] as Voxel[],
    };
    const script = new vm.Script(source);
    
    const vmContext = vm.createContext(sandbox);

    // Expects user script to either mutate model, or push voxels to output array
    try {
        script.runInContext(vmContext, { timeout: 1000 }); // 1s timeout
    } catch (e) {
        throw new Error('Plugin error: ' + (e as Error).message);
    }
    // Prefer output if set, else return all model voxels
    if (Array.isArray(vmContext.output) && vmContext.output.length > 0) {
        return vmContext.output;
    }
    return context.model.getAllVoxels();
}