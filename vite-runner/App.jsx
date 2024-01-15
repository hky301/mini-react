import React from './core/React.js';

// const App = React.createElement('div', { id: 'app' }, 'hello ', 'mini-react')

function Counter({ num }) {
  return <div>count: {num}</div>
}

function CounterContainer() {
  return <Counter />
}


function App() {
  return <div className='red'>hello mini-react
    {/* <CounterContainer /> */}
    <Counter num={10} />
    <Counter num={20} />
  </div>
}

export default App
