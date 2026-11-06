import { useEffect, useRef, useState, useCallback } from 'react'
import { createSync } from './sync'
import { NOTES, FALLBACK_NOTE, TOTAL_MINUTES } from './notes'

const fmt = (sec) => {
  const s = Math.max(0, Math.floor(sec))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function Section({ label, color, items }) {
  if (!items?.length) return null
  return (
    <div className="mb-6">
      <div className="text-xs font-bold tracking-widest mb-2" style={{ color }}>{label}</div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-xl leading-snug text-white/90">
            <span style={{ color }}>▸</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PresenterView() {
  const [state, setState] = useState(null) // { index, scenes }
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [sceneElapsed, setSceneElapsed] = useState(0)
  const syncRef = useRef(null)
  const lastId = useRef(null)

  useEffect(() => { if (!document.title.startsWith('Presenter Notes')) document.title = `Presenter Notes · ${document.title}` }, [])

  // Connect and ask the main window for its state.
  useEffect(() => {
    const sync = createSync()
    syncRef.current = sync
    sync.onMessage((m) => { if (m?.type === 'state') setState({ index: m.index, scenes: m.scenes }) })
    sync.send({ type: 'hello' })
    const retry = setInterval(() => { if (!syncRef.current) return; syncRef.current.send({ type: 'hello' }) }, 1500)
    return () => { clearInterval(retry); sync.close(); syncRef.current = null }
  }, [])

  // Stop retrying once connected (retry is harmless, main just re-sends state).
  const connected = !!state
  const scene = state?.scenes?.[state.index]
  const next = state?.scenes?.[state.index + 1]
  const note = (scene && NOTES[scene.id]) || FALLBACK_NOTE
  const nextNote = (next && NOTES[next.id]) || null

  // Timer
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => { setElapsed(e => e + 1); setSceneElapsed(e => e + 1) }, 1000)
    return () => clearInterval(t)
  }, [running])

  // Reset per-scene timer when the scene changes
  useEffect(() => {
    if (scene && scene.id !== lastId.current) { lastId.current = scene.id; setSceneElapsed(0) }
  }, [scene])

  const send = useCallback((msg) => syncRef.current?.send(msg), [])
  const goNext = useCallback(() => send({ type: 'next' }), [send])
  const goPrev = useCallback(() => send({ type: 'prev' }), [send])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); goPrev() }
      else if (e.key === 't' || e.key === 'T') setRunning(r => !r)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const totalSec = TOTAL_MINUTES * 60
  const overTotal = elapsed > totalSec
  const sceneTarget = (note.minutes || 0) * 60
  const overScene = sceneTarget > 0 && sceneElapsed > sceneTarget

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0b1230] text-white overflow-hidden font-sans">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 rounded bg-[#F04E98] text-xs font-bold tracking-widest">PRIVATE</span>
          <span className="text-sm text-white/60">Presenter view. Do not share this window.</span>
        </div>
        <div className="flex items-center gap-5">
          <span className={`text-sm ${connected ? 'text-[#48EFCF]' : 'text-[#FEC514]'}`}>
            {connected ? '● Synced with deck' : '○ Waiting for deck window…'}
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-2xl ${overTotal ? 'text-[#F04E98]' : 'text-white'}`}>{fmt(elapsed)}</span>
            <span className="font-mono text-sm text-white/40">/ {fmt(totalSec)}</span>
          </div>
          <button onClick={() => setRunning(r => !r)} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm">
            {running ? 'Pause (T)' : 'Start (T)'}
          </button>
          <button onClick={() => { setElapsed(0); setSceneElapsed(0); setRunning(false) }} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm">
            Reset
          </button>
        </div>
      </div>

      {!connected ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
          <p className="text-3xl font-bold mb-3">Waiting for the deck window</p>
          <p className="text-lg text-white/60 max-w-xl">
            Open the audience deck in another window on the same site (same address, no <code>?presenter</code>). This view will connect on its own.
          </p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-[1fr_380px] min-h-0">
          {/* Notes */}
          <div className="p-8 overflow-y-auto">
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-sm text-white/50">Scene {state.index + 1} of {state.scenes.length}</div>
              <div className={`font-mono text-lg ${overScene ? 'text-[#F04E98]' : 'text-white/60'}`}>
                {fmt(sceneElapsed)}{sceneTarget ? ` / ${fmt(sceneTarget)}` : ''}
              </div>
            </div>
            <h1 className="text-5xl font-extrabold mb-8">{scene?.title}</h1>
            <Section label="SAY" color="#48EFCF" items={note.say} />
            <Section label="DO ON SCREEN" color="#0B64DD" items={note.doIt} />
            <Section label="WATCH OUT" color="#F04E98" items={note.watch} />
          </div>

          {/* Sidebar */}
          <div className="border-l border-white/10 bg-black/20 flex flex-col min-h-0">
            <div className="p-5 border-b border-white/10">
              <div className="text-xs font-bold tracking-widest text-[#FEC514] mb-2">UP NEXT</div>
              {next ? (
                <>
                  <div className="text-xl font-bold">{next.title}</div>
                  {nextNote?.say?.[0] && <p className="text-sm text-white/60 mt-1 line-clamp-3">{nextNote.say[0]}</p>}
                </>
              ) : (
                <div className="text-lg text-white/60">End of deck. Q&amp;A.</div>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={goPrev} className="flex-1 py-2 rounded bg-white/10 hover:bg-white/20 font-semibold">← Back</button>
                <button onClick={goNext} className="flex-1 py-2 rounded bg-[#0B64DD] hover:bg-[#0B64DD]/80 font-semibold">Next →</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {state.scenes.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => send({ type: 'goto', index: i })}
                  className={`w-full text-left px-3 py-2 rounded mb-1 flex items-center gap-3 text-sm ${
                    i === state.index ? 'bg-white/15 font-semibold' : 'hover:bg-white/10 text-white/70'
                  }`}
                >
                  <span className="font-mono text-xs text-white/40 w-5">{i + 1}</span>
                  <span className="flex-1">{s.title}</span>
                  {NOTES[s.id]?.minutes > 0 && <span className="font-mono text-xs text-white/40">{NOTES[s.id].minutes}m</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
