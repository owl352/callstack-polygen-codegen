import consola from 'consola';
import * as templates from '../templates/library/index.js';
import { generateCSources } from '../wasm2c.js';
export async function generateModuleExportsBridge(generator, module, options) {
    try {
        // TODO; remove generated files on dev (or always)
        await Promise.allSettled([
            generateCSource(generator, module, options),
            generateJSIBridge(generator, module),
            renderMetadata(generator, module),
        ]);
    }
    catch (e) {
        consola.error(e);
    }
}
async function generateCSource(generator, module, options) {
    const outputPath = generator.outputPathTo(module.name);
    const generatedFiles = [`${outputPath}.c`, `${outputPath}.h`];
    return generatingFromModule(generator, module, options, generatedFiles, () => generateCSources(module.sourceModulePath, outputPath));
}
async function generateJSIBridge(generator, module) {
    await generator.writeAllTo({
        'jsi-exports-bridge.h': templates.buildExportBridgeHeader(module),
        'jsi-exports-bridge.cpp': templates.buildExportBridgeSource(module),
        'static-module.h': templates.buildStaticLibraryHeader(module),
        'static-module.cpp': templates.buildStaticLibrarySource(module),
    });
}
async function renderMetadata(generator, module) {
    await generator.writeTo(`${module.name}.exports.json`, JSON.stringify(module.codegen.exports, null, 2));
    await generator.writeTo(`${module.name}.imports.json`, JSON.stringify(module.codegen.imports, null, 2));
}
async function generatingFromModule(generator, module, options, targets, cb) {
    return generator.generating([module.sourceModulePath], targets, cb);
}
// public async copyWeakRuntimeHeader() {
//   // const fullOutPath = path.join(libOutputDir, `${name}.c`);
//   // await fs.copyFile(
//   //   pathToRuntimeHeader,
//   //   path.join(libOutputDir, 'wasm-rt.h')
//   // );
// }
