import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { W2CModuleContext } from './context/context.js';
import { generateHostModuleBridge } from './generators/host.js';
import { generateImportedModuleBridge } from './generators/import-bridge.js';
import { generateModuleExportsBridge } from './generators/module-bridge.js';
import { generateWasmJSModuleSource } from './generators/wasm-module.js';
import { OutputGenerator, } from './helpers/output-generator.js';
export { FileExternallyChangedError, FileOverwriteError, } from './helpers/output-generator.js';
const UMBRELLA_PROJECT_NAME = '@host';
const ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../assets');
export class W2CGenerator {
    constructor(project, options = {}, previousWrittenFiles) {
        this.generatedModules = [];
        this.project = project;
        this.options = options;
        this.generator = new OutputGenerator({
            outputDirectory: this.outputDirectory,
            assetsDirectory: ASSETS_DIR,
            forceGenerate: options.forceGenerate,
        }, previousWrittenFiles);
    }
    /**
     * Creates a new W2CGenerator instance for the specified project and options.
     */
    static async create(project, options = {}) {
        let previouslyWrittenFiles;
        try {
            const outputDir = options.outputDirectory ?? project.fullOutputDirectory;
            const previousMap = await fs.readFile(path.join(outputDir, 'polygen-output.json'), { encoding: 'utf-8' });
            previouslyWrittenFiles = JSON.parse(previousMap).files;
        }
        catch (e) {
            if (e && typeof e === 'object' && 'code' in e && e.code !== 'ENOENT') {
                throw e;
            }
        }
        return new W2CGenerator(project, options, previouslyWrittenFiles);
    }
    /**
     * Path to output directory where generated files will be created.
     */
    get outputDirectory() {
        return this.options.outputDirectory ?? this.project.fullOutputDirectory;
    }
    /**
     * Generates all code for specified WebAssembly module.
     */
    async generateModule(modulePath) {
        const moduleContents = await fs.readFile(modulePath, { encoding: null });
        const module = new W2CModuleContext(moduleContents.buffer, modulePath);
        const generator = this.generator.forPath(this.outputPathForModule(module.name));
        await generateModuleExportsBridge(generator, module, {
            renderMetadata: this.options.generateMetadata,
            forceGenerate: this.options.forceGenerate,
        });
        this.generatedModules.push(module);
        await this.generateWasmJSModule(modulePath);
        return module;
    }
    /**
     * Generates a JavaScript module file for a given WebAssembly (.wasm) module.
     * The generated module will be placed under the project's output directory.
     *
     * @param pathToModule - The file path to the WebAssembly (.wasm) module that needs to be processed.
     * @return A promise that resolves when the JavaScript module file is successfully created.
     */
    async generateWasmJSModule(pathToModule) {
        const cleanName = path.basename(pathToModule, '.wasm');
        const pathInModule = this.project.globalPathToLocal(pathToModule, this.project.localSourceDir);
        const dirnameInModule = path.dirname(pathInModule);
        const generatedModulePath = path.join(dirnameInModule, `${cleanName}.js`);
        const generator = this.generator.forPath('modules');
        const source = await generateWasmJSModuleSource(pathToModule);
        await generator.writeTo(generatedModulePath, source);
    }
    /**
     * Generates the host module and its corresponding bridges using the specified context and options.
     *
     * @param context The shared context containing module information and configurations.
     * @return A promise that resolves with the results of generating bridges for imported modules. Each promise result contains the status of the operation (fulfilled or rejected).
     */
    async generateHostModule(context) {
        const generator = this.generator.forPath(UMBRELLA_PROJECT_NAME);
        await generateHostModuleBridge(generator, context.modules);
    }
    /**
     * Generates the imported module by creating necessary files and configurations in the specified output directory.
     *
     * @param module The imported module data that needs to be processed and generated.
     * @return A promise that resolves when the module generation process is completed.
     */
    async generateImportedModule(module) {
        const generator = this.generator.forPath(UMBRELLA_PROJECT_NAME);
        await generateImportedModuleBridge(generator.forPath(`imports`), module);
    }
    /**
     * Finalizes the generation process by writing the generated files to the output directory.
     */
    async finalize() {
        const generatedMapPath = this.generator.outputPathTo('polygen-output.json');
        const contents = {
            files: this.generator.writtenFiles,
        };
        await fs.writeFile(generatedMapPath, JSON.stringify(contents, undefined, 2));
    }
    outputPathForModule(moduleName) {
        if (this.options.singleProject) {
            return path.join(UMBRELLA_PROJECT_NAME, moduleName);
        }
        return moduleName;
    }
}
