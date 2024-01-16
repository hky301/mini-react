
import React from './core/React.js';

// const App = React.createElementVNode('div', { id: 'app' }, 'hi', 'mini-react', React.createElementVNode('span', { className: 'red' }))


// const App = <div id='app'>hi,mini-react <span className='red'></span></div>

// console.log(JSON.stringify(App, null, 2));

function Counter({ num }) {
  return <div>counter: {num}</div>
}

function App() {
  return <div id='app'>hi,mini-react <span className='red'></span>
    <Counter num={10} />
    <Counter num={20} />
  </div>
}


export default App
