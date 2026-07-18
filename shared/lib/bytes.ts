/**
 * Converts a byte count to megabytes. Returns a fractional value, so
 * callers format or round it as their display requires.
 */
export function byteToMb(bytes: number): number {
  return bytes / (1024 * 1024)
}
