import test from 'ava'
import system from '../src'

test('returns style objects', t => {
  const style = system({
    margin: 0,
    padding: '32px',
    color: 'tomato',
    float: 'left',
  })
  t.deepEqual(style, [
    { color: 'tomato' },
    { float: 'left' },
    { margin: 0 },
    { padding: '32px' },
  ])
})

test('returns values from theme', t => {
  const style = system({
    theme: {
      space: [0, 4, 8, 16, 32, 64].map(n => n + 'px'),
      colors: {
        blue: '#07c',
      },
    },
    color: 'blue',
    padding: 2,
  })
  t.deepEqual(style, [{ color: '#07c' }, { padding: '8px' }])
})
