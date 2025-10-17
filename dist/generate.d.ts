import { PolygenModuleConfig } from '@callstack/polygen-config';
import { Project } from '@callstack/polygen-project';
import { W2CModuleContext } from './context/context.js';
import { W2CImportedModule, W2CSharedContext } from './context/index.js';
import { OutputGenerator } from './helpers/output-generator.js';
export { FileExternallyChangedError, FileOverwriteError, } from './helpers/output-generator.js';
/**
 * Options used to change W2CGenerator behavior.
 */
export interface W2CGeneratorOptions {
    /**
     * Path to output directory where generated files will be created.
     *
     * Directories for specific modules will be created within this
     * directory.
     */
    outputDirectory?: string;
    /**
     * If true, all modules are built into single turbo module.
     *
     * This can increase build times if one of the WASM module was changed.
     * This only works with static linking.
     *
     * TODO: Currently only this works
     *
     * @defaultValue true
     */
    singleProject?: boolean;
    /**
     * If true, generated files are re-generated and written
     * even if stale.
     *
     * @defaultValue false
     */
    forceGenerate?: boolean;
    /**
     * If true, additional debug metadata files are generated alongside
     * output source files.
     *
     * @defaultValue false
     */
    generateMetadata?: boolean;
}
/**
 * Main generator class for WebAssembly to C code generation.
 *
 * This class is responsible for generating C code from WebAssembly modules, and
 * contains all state and configuration necessary for the generation process.
 *
 * The generator is not reenterant, and should be used only once.
 */
export declare class W2CGenerator {
    /**
     * The project configuration to generate code for.
     */
    readonly project: Project;
    /**
     * Configuration options for the generation process.
     */
    readonly options: W2CGeneratorOptions;
    /**
     * Output generator instance used to write generated files to disk.
     */
    readonly generator: OutputGenerator;
    /**
     * List of generated modules.
     */
    readonly generatedModules: W2CModuleContext[];
    private readonly resolvedPackages;
    /**
     * Creates a new W2CGenerator instance for the specified project and options.
     *
     * @see create
     */
    private constructor();
    /**
     * Creates a new W2CGenerator instance for the specified project and options.
     *
     * @param project The project configuration to generate code for.
     * @param options Optional configuration for the generation process.
     */
    static create(project: Project, options?: W2CGeneratorOptions): Promise<W2CGenerator>;
    /**
     * Path to output directory where generated files will be created.
     */
    get outputDirectory(): string;
    /**
     * Generates all code for specified WebAssembly module.
     *
     * This includes generating the module exports bridge and the JavaScript
     *
     * @param module The module configuration to generate code for.
     */
    generateModule(module: PolygenModuleConfig): Promise<W2CModuleContext>;
    /**
     * Generates a JavaScript module file for a given WebAssembly (.wasm) module.
     * The generated module will be placed under the project's output directory.
     *
     * @param module - The WebAssembly (.wasm) module that needs to be processed.
     * @param resolvedPath - The resolved path to the WebAssembly module file.
     * @return A promise that resolves when the JavaScript module file is successfully created.
     */
    generateWasmJSModule(module: PolygenModuleConfig, resolvedPath: string): Promise<void>;
    /**
     * Generates the host module and its corresponding bridges using the specified context and options.
     *
     * @param context The shared context containing module information and configurations.
     * @return A promise that resolves with the results of generating bridges for imported modules. Each promise result contains the status of the operation (fulfilled or rejected).
     */
    generateHostModule(context: W2CSharedContext): Promise<void>;
    /**
     * Generates the imported module by creating necessary files and configurations in the specified output directory.
     *
     * @param module The imported module data that needs to be processed and generated.
     * @return A promise that resolves when the module generation process is completed.
     */
    generateImportedModule(module: W2CImportedModule): Promise<void>;
    /**
     * Finalizes the generation process by writing the generated files to the output directory.
     */
    finalize(): Promise<void>;
    private outputPathForModule;
}
//# sourceMappingURL=generate.d.ts.map