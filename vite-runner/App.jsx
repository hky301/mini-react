
import React from './core/React.js';

function Foo() {
  return <div id='foo'>foo
    <p>aaaa</p>
  </div>
}

function Bar() {
  return <div id='bar'>bar</div>
}

let isShow = true

function App() {

  const child1 = <div>child1<p>1111</p><p>2222</p><p>3333</p></div>
  const child2 = <div>child2</div>


  function change() {
    isShow = !isShow
    React.update()
  }

  return <div id='app'>
    <div>hi,mini-react</div>
    {isShow ? child1 : child2}
    <button onClick={change}>切换</button>
  </div>
}


export default App
