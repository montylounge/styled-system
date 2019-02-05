const Benchmark = require('benchmark')
const React = require('react')
const { renderToString } = require('react-dom/server')
const styled = require('styled-components').default
const ss3 = require('./ss3')
const { space, width, fontSize, color, style } = require('../dist/index.cjs')

const Text3 = styled.div(ss3.fontSize)
const Text4 = styled.div(fontSize)

const Rect3 = styled.div(ss3.color)
const Rect4 = styled.div(color)

const Box3 = styled.div(ss3.space, ss3.width, ss3.fontSize, ss3.color)

const Box4 = styled.div(space, width, fontSize, color)

const suite = new Benchmark.Suite()

const tests = [
  {
    name: 'ss3 Text',
    func: () =>
      renderToString(
        React.createElement(Text3, {
          fontSize: 3,
        })
      ),
  },
  {
    name: 'ss4 Text',
    func: () =>
      renderToString(
        React.createElement(Text4, {
          fontSize: 3,
        })
      ),
  },
  {
    name: 'ss3 Rect',
    func: () =>
      renderToString(
        React.createElement(Rect3, {
          bg: 'tomato',
        })
      ),
  },
  {
    name: 'ss4 Rect',
    func: () =>
      renderToString(
        React.createElement(Rect4, {
          bg: 'tomato',
        })
      ),
  },
  {
    name: 'ss3 Box',
    func: () =>
      renderToString(
        React.createElement(Box3, {
          m: 2,
          p: 3,
          bg: 'tomato',
          fontSize: 4,
        })
      ),
  },
  {
    name: 'ss4 Box',
    func: () =>
      renderToString(
        React.createElement(Box4, {
          m: 2,
          p: 3,
          bg: 'tomato',
          fontSize: 4,
        })
      ),
  },
  // responsive
  {
    name: 'Responsive ss3 Box',
    func: () =>
      renderToString(
        React.createElement(Box3, {
          m: [0, 2],
          p: [2, 3],
          bg: 'tomato',
          fontSize: [2, 3, 4],
        })
      ),
  },
  {
    name: 'Responsive ss4 Box',
    func: () =>
      renderToString(
        React.createElement(Box4, {
          m: [0, 2],
          p: [2, 3],
          bg: 'tomato',
          fontSize: [2, 3, 4],
        })
      ),
  },
]

tests.forEach(({ name, func }) => {
  suite.add(name, func)
})

suite
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function() {
    const top = this.filter('fastest').map('name')
    console.log(`Fastest is ${top}`)
  })
  .run({ async: true })
