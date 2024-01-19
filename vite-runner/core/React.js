const TEXT_ELEMENT = 'TEXT_ELEMENT'

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextVNode(child) : child
      })
    }
  }
}

function createTextVNode(nodeValue) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue,
      children: []
    }
  }
}


function createDom(type) {
  return type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type)
}

function updateProps(dom, newProps, oldProps) {

  // 1. old 有 new 没有
  Object.keys(oldProps).forEach(key => {
    if (key !== 'children') {
      if (!(key in newProps)) {
        dom.removeAttribute(key)
      }
    }
  })

  // 2. old 没有 new 有
  // 3. old 有 new you
  // 可以合成一个处理，old 没有 相当于是 undefined
  Object.keys(newProps).forEach(key => {
    if (key !== 'children') {
      if (newProps[key] !== oldProps[key]) {
        if (key.startsWith('on')) {
          const eventType = key.slice(2).toLowerCase()
          dom.removeEventListener(eventType, oldProps[key])
          dom.addEventListener(eventType, newProps[key])
        } else {
          dom[key] = newProps[key]
        }
      }
    }
  })


}

function reconcileChildren(fiber, children) {
  // console.log(fiber);
  let oldFiber = fiber.alternate?.child
  let prevChild = null
  children.forEach((child, index) => {
    let nextFiber = null
    // isSameType 才是更新
    const isSameType = oldFiber && child.type === oldFiber.type
    if (isSameType) {
      // 更新
      nextFiber = {
        type: child.type,
        props: child.props,
        child: null,
        sibling: null,
        parent: fiber,
        dom: oldFiber.dom,
        effectTag: 'update',
        alternate: oldFiber,
        isMounted: oldFiber.isMounted || false
      }
    } else {
      // 初始化
      if (child) {
        nextFiber = {
          type: child.type,
          props: child.props,
          child: null,
          sibling: null,
          parent: fiber,
          dom: null,
          effectTag: 'placement',
          isMounted: false
        }
      }

      if (oldFiber) {
        // console.log('需要删除的节点', oldFiber);
        deletions.push(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      fiber.child = nextFiber
    } else {
      prevChild.sibling = nextFiber
    }

    // 能否根据 child 判断，好像也没有问题
    if (nextFiber) {
      prevChild = nextFiber
    }
  })

  while (oldFiber) {
    // console.log(oldFiber);
    deletions.push(oldFiber)
    oldFiber = oldFiber.sibling
  }
}

// work in progress
let wipRoot = null
let nextWorkOfUnit = null
// 老的 root，下次更新时需要用到
let currentRoot = null
// 更新时要删除的节点
let deletions = []
let wipFiber = null

function updateFunctionComponent(fiber) {
  stateHooks = []
  stateHookIndex = 0
  wipFiber = fiber

  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = fiber.dom = createDom(fiber.type)
    updateProps(dom, fiber.props, {})
  }
  const children = fiber.props.children
  reconcileChildren(fiber, children)
}

function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'
  if (!isFunctionComponent) {
    updateHostComponent(fiber)
  } else {
    updateFunctionComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }

  // 找下一个要处理的节点
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling

    nextFiber = nextFiber.parent
  }
}

function workLoop(deadline) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
    if (wipRoot?.sibling?.type === nextWorkOfUnit?.type) {
      // console.log('hit');
      nextWorkOfUnit = undefined
    }
    shouldYield = deadline.timeRemaining() < 1
  }

  // 没有 nextWorkOfUnit 时,拿到root节点进行统一渲染到屏幕上
  if (!nextWorkOfUnit && wipRoot) {
    // console.log(root);
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

function removeOldFiber(fiber) {
  if (fiber.dom) {
    let parentFiber = fiber.parent
    while (!parentFiber.dom) {
      parentFiber = parentFiber.parent
    }
    parentFiber.dom.removeChild(fiber.dom)
  } else {
    removeOldFiber(fiber.child)
  }
}

function commitRoot() {

  if (deletions.length > 0) {
    // 删除老的节点
    deletions.forEach(removeOldFiber)
  }
  console.log('wipRoot', wipRoot);
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  console.log(currentRoot);
  wipRoot = null
  deletions = []
  isMounted = false
}

let isMounted = true
function commitWork(fiber) {
  if (!fiber) return
  let parentFiber = fiber.parent

  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  // 更新时 props
  if (fiber.effectTag === 'update') {
    updateProps(fiber.dom, fiber.props, fiber.alternate.props)
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      // TODO:
      if (isMounted) {
        fiber.isMounted = true
        parentFiber.dom.append(fiber.dom)
      } else {
        let anchor = null
        let nextFiber = fiber
        while (nextFiber.sibling && !nextFiber.sibling.isMounted) {
          nextFiber = nextFiber.sibling
        }
        if (nextFiber.sibling && nextFiber.sibling.isMounted) {
          anchor = nextFiber.sibling
        }
        parentFiber.dom.insertBefore(fiber.dom, anchor ? anchor.dom : null)
      }
    }
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

requestIdleCallback(workLoop)

function render(vnode, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [vnode]
    }
  }
  nextWorkOfUnit = wipRoot
}

// 更新，新的 root
function update() {
  let currentFiber = wipFiber

  return () => {
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber
    }
    nextWorkOfUnit = wipRoot
  }
}

let stateHooks
let stateHookIndex

function isObject(value) {
  return typeof value === 'object' && value !== null
}

function useState(initial) {
  // initial 类型可能是number、string、boolean、arr、object

  let currentFiber = wipFiber
  const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex]

  const stateHook = {
    state: oldHook ? oldHook.state : initial,
    queue: oldHook ? oldHook.queue : []
  }

  stateHook.queue.forEach(action => {
    stateHook.state = action(stateHook.state)
  })

  stateHook.queue = []

  stateHookIndex++
  stateHooks.push(stateHook)
  currentFiber.stateHooks = stateHooks

  function setState(action) {

    const eagerState = typeof action === 'function' ? action(stateHook.state) : action
    if (isObject(eagerState)) {
      if (JSON.stringify(eagerState) === JSON.stringify(stateHook.state)) return
    } else {
      if (eagerState === stateHook.state) return
    }

    stateHook.queue.push(typeof action === 'function' ? action : () => action)

    wipRoot = {
      ...currentFiber,
      alternate: currentFiber
    }
    nextWorkOfUnit = wipRoot
  }

  return [stateHook.state, setState]
}


const React = {
  useState,
  update,
  render,
  createElement
}

export default React
