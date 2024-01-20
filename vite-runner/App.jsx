
import React from './core/React.js';

// let foo = 1
// function Foo() {
//   console.log('Foo');

//   const update = React.update()
//   function handleClick() {
//     foo++
//     update()
//   }

//   return <div id='foo'>foo:{foo}
//     <button onClick={handleClick}>点击</button>
//   </div>
// }

// let bar = 1
// function Bar() {
//   console.log('Bar');

//   const update = React.update()
//   function handleClick() {
//     bar++
//     update()
//   }


//   return <div id='bar'>bar:{bar}
//     <button onClick={handleClick}>点击</button></div>
// }


// let currentRoot = 1

// function Child1() {
//   return <div id='child1'>child1
//     <p>aaaa</p>
//   </div>
// }

// function Child2() {
//   return <div id='child2'>Child2</div>
// }

// let isShow = true

// function App() {
//   // console.log('app');
//   const [isShow, setIsShow] = React.useState(true)

//   const update = React.update()
//   function handleClick() {
//     // currentRoot++
//     setIsShow(!isShow)
//     update()
//   }

//   const child3 = <div id='child3'>child3</div>
//   const child4 = <p id='child4'>child4</p>
//   const child5 = <div id='child5'>child5</div>
//   const child6 = <p id='child6'>child6</p>

//   return <div id='app'>
//     hello world
//     {isShow ? child3 : child4}
//     {isShow ? child5 : child6}

//     <button onClick={handleClick}>点击</button>
//     {/* <Foo /> */}
//     {/* <Bar /> */}
//     {isShow ? child5 : child6}
//   </div>
// }

// {/* TODO:切换显示，child 会到dom最后面，估计fiber结构变了, 原因是 child2 重新创建了， effectTag: 'placement'，parent append 上去的 ,*/ }



// TODO:事件有 bug
// function Foo() {
//   const [count, setCount] = React.useState(1)
//   function handleClick() {
//     setCount((c) => c + 1)
//   }
//   return <div id='foo'>foo: {count}
//     <button onClick={handleClick}>点击</button>
//   </div>

// }


// function Bar() {
//   const [count, setCount] = React.useState(1)

//   function handleClick() {
//     setCount((c) => c + 1)
//   }
//   return <div id='bar'>bar: {count}
//     <button onClick={handleClick}>点击</button>
//   </div>
// }


// function App() {
//   console.log('app');
//   const [count, setCount] = React.useState(1)
//   // const [num, setNum] = React.useState(2)

//   const [obj, setObj] = React.useState(1)
//   const [bol, setBol] = React.useState(false)

//   function handleClick() {
//     setCount((c) => c + 1)
//     // setCount((c) => c + 1)
//     // setCount((c) => c + 1)
//     // setNum((c) => c + 1)
//     // setNum(2)
//     // setNum(2)
//     setObj(() => ({
//       a: 2
//     }))
//     setBol(!bol)
//   }

//   return <div id='app'>
//     <div>app: {count}</div>
//     {/* <div>{num}</div> */}
//     {/* <div>obj.a: {obj.a}</div> */}
//     {/* <div>{bol ? 'a' : 'b'}</div> */}
//     <button onClick={handleClick}>点击</button>
//     <Foo />
//     <Bar />
//   </div>

// }


function Foo() {
  const [count, setCount] = React.useState(1)

  function handleClick() {
    setCount((c) => c + 1)
  }


  return <div id='foo'>
    <div>foo: {count}</div>
    <button onClick={handleClick}>点击</button>
  </div>
}


function Bar() {
  const [count, setCount] = React.useState(1)

  function handleClick() {
    setCount((c) => c + 1)
  }


  return <div id='bar'>
    <div>bar: {count}</div>
    <button onClick={handleClick}>点击</button>
  </div>
}

function App() {
  const [count, setCount] = React.useState(1)

  function handleClick() {
    setCount((c) => c + 1)
  }

  // React.useEffect(() => {
  //   console.log('init app');
  //   return () => {
  //     console.log('clean 0');
  //   }
  // }, [])

  // React.useEffect(() => {
  //   console.log('update app1');
  //   // setCount((c) => c + 1)
  //   return () => {
  //     console.log('clean 1');
  //   }
  // }, [count])

  // React.useEffect(() => {
  //   console.log('update app2');
  //   return () => {
  //     console.log('clean 2');
  //   }
  // }, [count])


  return <div id='app'>
    <div>app: {count}</div>
    <button onClick={handleClick}>点击</button>
    <Foo />
    <Bar />
  </div>
}


export default App
