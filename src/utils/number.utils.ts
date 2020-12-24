// Adapted from https://gist.github.com/tomysmile/682b5a12214f6cae1f47
export function getOrdinal (num: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  const ending = (s[(v - 20) % 10] || s[v] || s[0])
  return `${num}${ending}`
}
