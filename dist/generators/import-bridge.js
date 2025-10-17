import * as templates from '../templates/library/index.js';
export async function generateImportedModuleBridge(generator, module) {
    await generator.writeAllTo({
        [`${module.name}-imports.h`]: templates.buildImportBridgeHeader(module),
        [`${module.name}-imports.cpp`]: templates.buildImportBridgeSource(module),
    });
}
