export const TEAM = [
  {
    name: 'Kartik Sabale',
    role: 'Product & Engineering',
    image: '/team/kartik-sabale.webp',
    href: null,
  },
  {
    name: 'Pratiksha Relekar',
    role: 'Design',
    image: '/team/pratiksha-relekar.webp',
    href: '/pratiksha',
  },
  {
    name: 'Kajal Sabale',
    role: 'Operations',
    image: null,
    href: null,
  },
]

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
