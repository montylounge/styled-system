
# Responsive Styles

Often when working on responsive layouts, it's useful to adjust styles across a singular dimension –
such as font-size, margin, padding, and width.
Instead of manually managing media queries and adding nested style objects throughout a code base,
styled-system offers a convenient shorthand syntax for adding responsive styles with a mobile-first approach.
While this syntax can seem odd at first, it can become a powerful way to manage responsive typography and layouts.

All style utilities add props that accept arrays as values for mobile-first responsive styles.

```jsx
<Box
  width={[
    1,    // 100% below the smallest breakpoint
    1/2,  // 50% from the next breakpoint and up
    1/4   // 25% from the next breakpoint and up
  ]}
/>

// responsive font size
<Box fontSize={[ 1, 2, 3, 4 ]} />

// responsive margin
<Box m={[ 1, 2, 3, 4 ]} />

// responsive padding
<Box p={[ 1, 2, 3, 4 ]} />
```

## Object-based values

The array-based syntax is meant to encourage a strict mobile-first mindset when building UI.
Alternatively, responsive styles can be defined with object-based values,
allowing you to skip certain breakpoints when not needed.

```jsx
<Box width={{ 3: 1/2 }} />
```

To pass values that are *not* scoped to a breakpoint, use any key that references an undefined value.

```jsx
<Box
  width={{
    _: 1,       // where `breakpoints._` is undefined
    large: 1/2
  }}
/>
```

## Aliases

Using the object based syntax, you can create aliases for your `theme.breakpoints`.

```js
// theme.js
const theme = {
  breakpoints: [
    '40em', '52em', '64em'
  ]
}

theme.breakpoints.small = theme.breakpoints[0]
theme.breakpoints.medium = theme.breakpoints[1]
theme.breakpoints.large = theme.breakpoints[2]

export default theme
```

With aliases defined in your theme, they can be referenced with the object-based syntax:

```jsx
<Box width={{ large: 1/2 }} />
```

