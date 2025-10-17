import type { RefType, ValueType } from '@callstack/wasm-parser';
export declare const HEADER: string;
/**
 * Mapping from WebAssembly table kind to the native C type, used by `wasm2c`.
 */
export declare const TABLE_KIND_TO_NATIVE_C_TYPE: Record<RefType, string>;
/**
 * Mapping from WebAssembly table kind to the name of corresponding C++ class.
 *
 * The C++ Class is a Polygen wrapper to encapsulate common operations.
 */
export declare const TABLE_KIND_TO_CLASS_NAME: Record<RefType, string>;
/**
 * When a function returns multiple values, the result is wrapped into a C struct.
 *
 * Each field of the struct is prefixed with a type-specific character.
 */
export declare const STRUCT_TYPE_PREFIX: Record<ValueType, string>;
export declare function toJSINumber(expr: string): string;
export declare function fromJSINumber(expr: string, type: string): string;
//# sourceMappingURL=common.d.ts.map