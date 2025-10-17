import { W2CModuleContext } from '../context/index.js';
import { OutputGenerator } from '../helpers/output-generator.js';
/**
 * Generates the host module bridge by creating necessary files
 * and copying required assets for the host module.
 *
 * @param generator - The output generator used for file and asset operations.
 * @param modules - An array of WebAssembly-to-C host module contexts to be processed.
 * @return A promise that resolves once all files and assets have been processed.
 */
export declare function generateHostModuleBridge(generator: OutputGenerator, modules: W2CModuleContext[]): Promise<void>;
//# sourceMappingURL=host.d.ts.map