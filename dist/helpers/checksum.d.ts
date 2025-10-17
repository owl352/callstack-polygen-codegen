/**
 * Computes the SHA-256 checksum of a file located at the given path and returns it as a Buffer.
 *
 * @param path The path to the file for which the checksum is to be computed.
 * @return A promise that resolves to a Buffer containing the computed checksum.
 */
export declare function computeFileChecksumBuffer(path: string): Promise<Buffer>;
/**
 * Computes the SHA-256 checksum of the provided data buffer.
 *
 * @param data - The data for which the checksum is to be computed, provided as an ArrayBuffer.
 * @return A Buffer containing the SHA-256 checksum of the input data.
 */
export declare function computeChecksumBuffer(data: ArrayBuffer): Buffer;
//# sourceMappingURL=checksum.d.ts.map