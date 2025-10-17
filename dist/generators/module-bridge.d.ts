import type { W2CModuleContext } from '../context/context.js';
import { OutputGenerator } from '../helpers/output-generator.js';
export interface ModuleGeneratorOptions {
    renderMetadata?: boolean;
    forceGenerate?: boolean;
}
export declare function generateModuleExportsBridge(generator: OutputGenerator, module: W2CModuleContext, options: ModuleGeneratorOptions): Promise<void>;
//# sourceMappingURL=module-bridge.d.ts.map