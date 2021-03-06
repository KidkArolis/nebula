const React = require('react')
const { moonwave } = require('../../react')

// each route maps to a Preact component
const routes = [
  ['/', MainView]
]

// actions is how we'll update application state
const actions = {
  update: (get, split, title) => {
    split({ title })
  }
}

// evolve is a flexible hook for implementing custom
// action strategies, such as modularising or namespacing
// this implementation calls the actions we declared above
const evolve = (get, split, action) => {
  actions[action.type](get, split, action.payload)
}

// the preact component receives
function MainView ({ state, split }) {
  return (
    <div>
      <h1>Title: {state.title}</h1>
      <input type='text' defaultValue={state.title} onInput={update} />
    </div>
  )

  function update (e) {
    split('update', e.target.value)
  }
}

moonwave()
  .state({ title: 'Default title' })
  .evolve(evolve)
  .routes(routes)
  .mount(document.getElementById('root'))
