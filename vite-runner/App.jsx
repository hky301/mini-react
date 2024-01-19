
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

let isShow = true

// function App() {
//   // console.log('app');

//   const update = React.update()
//   function handleClick() {
//     currentRoot++
//     isShow = !isShow
//     update()
//   }

//   const child3 = <div>child3</div>
//   const child4 = <p>child4</p>

//   return <div id='app'>
//     {/* <div>hi,mini-react</div> */}
//     {/* <div>root: {currentRoot}</div> */}
//     {/* TODO:切换显示，child 会到dom最后面，估计fiber结构变了, 原因是 child2 重新创建了， effectTag: 'placement'，parent append 上去的 ,*/}
//     {isShow ? child3 : child4}
//     <button onClick={handleClick}>点击</button>
//     {/* <Foo /> */}
//     {/* <Bar /> */}
//   </div>
// }


function App() {
  console.log('app');
  // const [count, setCount] = React.useState(1)
  // const [num, setNum] = React.useState(2)

  const [obj, setObj] = React.useState(1)
  const [bol, setBol] = React.useState(false)

  function handleClick() {
    // setCount((c) => c + 1)
    // setCount((c) => c + 1)
    // setCount((c) => c + 1)
    // setNum((c) => c + 1)
    // setNum(2)
    // setNum(2)
    setObj(() => ({
      a: 2
    }))
    setBol(!bol)
  }

  return <div id='app'>
    {/* <div>{count}</div> */}
    {/* <div>{num}</div> */}
    <div>obj.a: {obj.a}</div>
    <div>{bol ? 'a' : 'b'}</div>
    <button onClick={handleClick}>点击</button>
  </div>

}


export default App
