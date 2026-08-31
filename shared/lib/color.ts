const OKLCH = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)(%?))?/

/**
 * Converts an oklch color to one Stripe can parse. Stripe renders in a
 * frame with no access to the page custom properties and does not
 * understand oklch, and no browser API resolves it to sRGB, so the
 * conversion happens here. Opaque colors come back as hex and
 * translucent ones as rgba, either of which the appearance API takes.
 *
 * The alpha argument multiplies whatever the token already carries,
 * which is how tailwind reads a slash opacity such as ring-ring/50.
 * Values that are not oklch pass through untouched.
 */
export function oklchToColor(value: string, alpha = 1): string {
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

  const channels = rgb.map((channel) => {
    const srgb = channel <= 0.0031308
      ? channel * 12.92
      : 1.055 * channel ** (1 / 2.4) - 0.055

    return Math.round(Math.min(Math.max(srgb, 0), 1) * 255)
  })

  /**
   * The alpha on a token is written either as a fraction or as a
   * percentage, and a token without one is fully opaque.
   */
  const parsed = match[4] === undefined
    ? 1
    : Number(match[4]) / (match[5] === '%' ? 100 : 1)

  const opacity = parsed * alpha

  if (opacity >= 1) {
    return '#' + channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')
  }

  return `rgba(${channels.join(', ')}, ${Number(opacity.toFixed(3))})`
}
