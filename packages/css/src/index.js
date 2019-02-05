// import { style, compose } from 'styled-system'
import { style, compose } from './_styled-system'
import { all as properties } from 'known-css-properties'

// from https://github.com/30-seconds/30-seconds-of-code
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

// from https://github.com/30-seconds/30-seconds-of-code
// TODO: optimize for styled-system
const pluralize = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural
  if (typeof val === 'object')
    return (num, word) => _pluralize(num, word, val[word])
  return _pluralize(val, word, plural)
}

const plural = pluralize({})

// move to core
const themeKeys = {
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  zIndex: 'zIndices',
  backgroundColor: 'colors',
  borderColor: 'colors',
  fontFamily: 'fonts',
  gridGap: 'space',
  gridRowGap: 'space',
  gridColumnGap: 'space',
  borderRadius: 'radii',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  opacity: 'opacity',
}

const funcs = properties.map(property => {
  const prop = toCamelCase(property)
  const key = themeKeys[prop] || plural(2, prop)
  const func = style({ prop, key })
  return func
})

export default compose(...funcs)
