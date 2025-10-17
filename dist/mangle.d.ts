/**
 * Encodes WebAssembly module name.
 *
 * This function encodes WebAssembly module name according to `w2c` logic.
 *
 * The process covers:
 *  - replacing single underscore characters with double ones,
 *  - replacing any unsafe characters with encoded ones.
 *
 * @see mangleName
 *
 * @param name Name of the module to mangle
 * @returns Encoded module name
 */
export declare function mangleModuleName(name: string): string;
/**
 * Encodes WebAssembly symbol name.
 *
 * This function encodes WebAssembly symbol name according to `w2c` logic.
 *
 * The process covers:
 *  - if the name starts with underscore, it is mangled (probably due to C symbol mangling)
 *
 * @see mangleModuleName
 *
 * @param name Name of the symbol to mangle
 * @returns mangled symbol name
 */
export declare function mangleName(name: string): string;
/**
 * Name mangling transforms arbitrary Wasm names into "safe" C names
 * in a deterministic way. To avoid collisions, distinct Wasm names must be
 * transformed into distinct C names.
 *
 * The rules implemented here are:
 * 1) any hex digit ('A' through 'F') that follows the sequence "0x"
 *    is escaped
 * 2) any underscore at the beginning, at the end, or following another
 *    underscore, is escaped
 * 3) if double_underscores is set, underscores are replaced with
 *    two underscores.
 * 4) otherwise, any alphanumeric character is kept as-is,
 *    and any other character is escaped
 *
 * "Escaped" means the character is represented with the sequence "0xAB",
 * where A B are hex digits ('0'-'9' or 'A'-'F') representing the character's
 * numeric value.
 *
 * Module names are mangled with double_underscores=true to prevent
 * collisions between, e.g., a module "alfa" with export
 * "bravo_charlie" vs. a module "alfa_bravo" with export "charlie".
 */
export declare function mangle(name: string, doubleUnderscores: boolean): string;
//# sourceMappingURL=mangle.d.ts.map