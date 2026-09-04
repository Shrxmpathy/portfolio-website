import { useSyncExternalStore } from 'react'

/**
 * Minimal hash router — no dependency, and it works unchanged on Vercel,
 * GitHub Pages, or any static host. Real path routing would need server-side
 * SPA fallback config, which hash routing avoids entirely.
 *
 * Routes:
 *   /                    home
 *   /projects            project index
 *   /projects/:slug      one project
 *   /about               about
 *   /contact             contact and résumé
 */

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getSnapshot() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function useRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '/')
}

export function navigate(path: string) {
  window.location.hash = path
}

/** True when `path` is the active route, used to mark the current nav tab. */
export function isActive(route: string, path: string) {
  if (path === '/') return route === '/'
  return route === path || route.startsWith(`${path}/`)
}

export function href(path: string) {
  return `#${path}`
}
