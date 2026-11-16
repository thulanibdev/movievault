import { test } from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { create, act } from 'react-test-renderer'
import { useWatchlist } from '../hooks/useWatchlist.js'

test('watchlist persists on mount and stays synchronised across consumers and tabs', () => {
  const data = new Map([['movievault-watchlist', JSON.stringify([{ id: 1, title: 'Saved movie' }])]])
  globalThis.window = new EventTarget()
  globalThis.localStorage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }
  const state = []
  function Probe({ index }) { state[index] = useWatchlist(); return null }
  let tree
  act(() => { tree = create(React.createElement(React.Fragment, null, React.createElement(Probe, { index: 0 }), React.createElement(Probe, { index: 1 }))) })
  assert.equal(state[0].watchlist.length, 1)
  assert.equal(JSON.parse(data.get('movievault-watchlist')).length, 1)
  act(() => { state[0].addToWatchlist({ id: 2 }); state[1].addToWatchlist({ id: 3 }) })
  assert.deepEqual(state[0].watchlist.map(m => m.id), [1, 2, 3])
  assert.deepEqual(state[0].watchlist, state[1].watchlist)
  act(() => state[0].removeFromWatchlist(2))
  assert.deepEqual(state[1].watchlist.map(m => m.id), [1, 3])
  act(() => {
    data.set('movievault-watchlist', '[{"id":4}]')
    const event = new Event('storage'); event.key = 'movievault-watchlist'; window.dispatchEvent(event)
  })
  assert.deepEqual(state[0].watchlist.map(m => m.id), [4])
  act(() => {
    data.set('movievault-watchlist', 'not json')
    const event = new Event('storage'); event.key = 'movievault-watchlist'; window.dispatchEvent(event)
  })
  assert.deepEqual(state[0].watchlist, [])
  act(() => tree.unmount())
})
