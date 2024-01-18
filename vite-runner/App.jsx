
import React from './core/React.js';

let foo = 1
function Foo() {
  console.log('Foo');

  const update = React.update()
  function handleClick() {
    foo++
    update()
  }

  return <div id='foo'>foo:{foo}
    <button onClick={handleClick}>点击</button>
  </div>
}

let bar = 1
function Bar() {
  console.log('Bar');

  const update = React.update()
  function handleClick() {
    bar++
    update()
  }


  return <div id='bar'>bar:{bar}
    <button onClick={handleClick}>点击</button></div>
}


let currentRoot = 1
function App() {
  console.log('app');
  const update = React.update()
  function handleClick() {
    currentRoot++
    update()
  }

  return <div id='app'>
    <div>hi,mini-react</div>
    <div>root: {currentRoot}</div>
    <button onClick={handleClick}>点击</button>
    <Foo />
    <Bar />
  </div>
}


export default App
