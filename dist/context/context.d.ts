import { Module } from '@callstack/wasm-parser';
import { W2CModuleCodegenContext } from './codegen-context.js';
import { W2CModuleTurboModuleContext } from './turbomodule-context.js';
/**
 * Represents the context of a WebAssembly module, providing metadata such as
 * its name, file path, and checksum.
 */
export declare class W2CModuleContext {
    /**
     * Name of the module, based on the filename.
     *
     * Unsafe to use as a symbol in source code, use `mangledName` instead.
     */
    readonly name: string;
    /**
     * Path to the file that the metadata was loaded from.
     */
    readonly sourceModulePath: string;
    /**
     * SHA-256 checksum of module contents
     */
    readonly checksum: Buffer;
    /**
     * The parsed WebAssembly module.
     */
    readonly module: Module;
    /**
     * Context for the wasm2c C code generation.
     */
    readonly codegen: W2CModuleCodegenContext;
    /**
     * Context for the TurboModule code generation.
     */
    readonly turboModule: W2CModuleTurboModuleContext;
    constructor(moduleBuffer: ArrayBuffer, sourceModulePath: string);
}
//# sourceMappingURL=context.d.ts.map