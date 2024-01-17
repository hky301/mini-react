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

function render(vnode, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [vnode]
    }
  }
  nextWorkOfUnit = wipRoot
}

// 新的 root
function update() {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot
  }
  nextWorkOfUnit = wipRoot
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
        alternate: oldFiber
      }
    } else {
      // 初始化
      nextFiber = {
        type: child.type,
        props: child.props,
        child: null,
        sibling: null,
        parent: fiber,
        dom: null,
        effectTag: 'placement'
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
    prevChild = nextFiber
  })
}

// work in progress
let wipRoot = null
let nextWorkOfUnit = null
// 老的 root，下次更新时需要用到
let currentRoot = null

function updateFunctionComponent(fiber) {
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

    shouldYield = deadline.timeRemaining() < 1
  }

  // 没有 nextWorkOfUnit 时,拿到root节点进行统一渲染到屏幕上
  if (!nextWorkOfUnit && wipRoot) {
    // console.log(root);
    commitRoot()
  }


  requestIdleCallback(workLoop)
}


function commitRoot() {
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

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
      parentFiber.dom.append(fiber.dom)
    }
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


requestIdleCallback(workLoop)




const React = {
  update,
  render,
  createElement
}

export default React
