// Speaker notes for the presenter window (press P in the deck to open it).
// Keyed by scene id (see the `scenes` array in App.jsx).
//
//   minutes = target time for the scene (0 = no timer target)
//   say     = talk track, in speaking order
//   doIt    = what to click or show on the audience screen
//   watch   = cautions: claims NOT to make, things to verify
//
// NOTE: this file ships inside the public site bundle. Do not put anything private here.

export const TOTAL_MINUTES = 15

export const NOTES = {
  'hero-static': {
    minutes: 1,
    say: ['Replace with your opening.'],
    doIt: [],
    watch: [],
  },
}

export const FALLBACK_NOTE = { minutes: 0, say: ['No notes for this scene.'], doIt: [], watch: [] }
