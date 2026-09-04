/** Content in portfolio.ts wrapped in [[double brackets]] is unfinished. */
export const PLACEHOLDER = /\[\[(.+?)\]\]/g

export function hasPlaceholder(value: string) {
  return /\[\[.+?\]\]/.test(value)
}
