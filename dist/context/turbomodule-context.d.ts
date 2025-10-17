/**
 * W2CModuleTurboModuleContext is a utility class designed to manage the generation of
 * class and function names related to React Native TurboModule bridging.
 * It provides structured naming conventions for module factory functions and context classes
 * based on a given module name.
 */
export declare class W2CModuleTurboModuleContext {
    readonly generatedClassName: string;
    constructor(name: string);
    /**
     * Name of the function that creates a new instance of the module.
     */
    get moduleFactoryFunctionName(): string;
    /**
     * Name of the class that represents the module context.
     */
    get contextClassName(): string;
}
//# sourceMappingURL=turbomodule-context.d.ts.map