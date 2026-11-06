// Two-window sync between the audience deck (main window) and the presenter view.
// Uses BroadcastChannel, so both windows must be on the same origin
// (e.g. both on the Vercel URL, or both on localhost:5173).

const CHANNEL = 'alertzero-presenter-sync'

export function createSync() {
  const ch = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL) : null
  return {
    send: (msg) => { try { ch?.postMessage(msg) } catch { /* ignore */ } },
    onMessage: (fn) => { if (ch) ch.onmessage = (e) => fn(e.data) },
    close: () => ch?.close(),
  }
}

export function isPresenterView() {
  try {
    return new URLSearchParams(window.location.search).has('presenter')
  } catch {
    return false
  }
}

export function openPresenter() {
  const url = `${window.location.pathname}?presenter`
  window.open(url, 'alertzero-presenter', 'width=1400,height=900')
}
