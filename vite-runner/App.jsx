
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

function Child1() {
  return <div id='child1'>child1
    <p>aaaa</p>
  </div>
}

function Child2() {
  return <div id='child2'>Child2</div>
}

let isShow = false

function App() {
  console.log('app');
  const update = React.update()
  function handleClick() {
    currentRoot++
    isShow = !isShow
    update()
  }

  return <div id='app'>
    <div>hi,mini-react</div>
    <div>root: {currentRoot}</div>
    {/* TODO:切换显示，child 会到dom最后面，估计fiber结构变了 */}
    {isShow ? <Child1 /> : <Child2 />}
    <button onClick={handleClick}>点击</button>
    <Foo />
    <Bar />
    1
  </div>
}


export default App
