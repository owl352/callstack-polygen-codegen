import * as path from 'node:path';
import { Module } from '@callstack/wasm-parser';
import { computeChecksumBuffer } from '../helpers/checksum.js';
import { W2CModuleCodegenContext } from './codegen-context.js';
import { W2CModuleTurboModuleContext } from './turbomodule-context.js';
/**
 * Represents the context of a WebAssembly module, providing metadata such as
 * its name, file path, and checksum.
 */
export class W2CModuleContext {
    constructor(moduleBuffer, sourceModulePath) {
        this.name = path.basename(sourceModulePath, '.wasm');
        this.module = new Module(moduleBuffer);
        this.sourceModulePath = sourceModulePath;
        this.checksum = computeChecksumBuffer(moduleBuffer);
        this.codegen = new W2CModuleCodegenContext(this.name, this.module);
        this.turboModule = new W2CModuleTurboModuleContext(this.name);
    }
}
