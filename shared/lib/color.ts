const OKLCH = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/

/**
 * Converts an oklch color to hex. Stripe renders in a frame with no
 * access to the page custom properties and only takes hex, and no
 * browser API resolves oklch to sRGB, so the conversion happens here.
 * Values that are not oklch pass through untouched.
 */
export function oklchToHex(value: string): string {
  const match = OKLCH.exec(value)

  if (!match) {
    return value
  }

  const l = Number(match[1])
  const c = Number(match[2])
  const h = Number(match[3]) * Math.PI / 180

  const a = c * Math.cos(h)
  const b = c * Math.sin(h)

  const lms = [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.2914855480 * b) ** 3,
  ]

  const rgb = [
    4.0767416621 * lms[0] - 3.3077115913 * lms[1] + 0.2309699292 * lms[2],
    -1.2684380046 * lms[0] + 2.6097574011 * lms[1] - 0.3413193965 * lms[2],
    -0.0041960863 * lms[0] - 0.7034186147 * lms[1] + 1.7076147010 * lms[2],
  ]

  return '#' + rgb.map((channel) => {
    const srgb = channel <= 0.0031308
      ? channel * 12.92
      : 1.055 * channel ** (1 / 2.4) - 0.055

    return Math.round(Math.min(Math.max(srgb, 0), 1) * 255).toString(16).padStart(2, '0')
  }).join('')
}
