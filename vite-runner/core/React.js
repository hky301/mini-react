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

  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [vnode]
    }
  }
  root = nextWorkOfUnit
}

function createDom(type) {
  return type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber, children) {
  let prevChild = null
  children.forEach((child, index) => {

    const nextFiber = {
      type: child.type,
      props: child.props,
      child: null,
      sibling: null,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = nextFiber
    } else {
      prevChild.sibling = nextFiber
    }
    prevChild = nextFiber
  })
}

let root = null
let nextWorkOfUnit = null

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = fiber.dom = createDom(fiber.type)

    updateProps(dom, fiber.props)
  }
  const children = fiber.props.children
  initChildren(fiber, children)
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
  if (!nextWorkOfUnit && root) {
    console.log(root);
    commitRoot()
  }


  requestIdleCallback(workLoop)
}


function commitRoot() {
  commitWork(root.child)
  root = null
}

function commitWork(fiber) {
  if (!fiber) return
  let parentFiber = fiber.parent

  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  if (fiber.dom) {
    parentFiber.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


requestIdleCallback(workLoop)




const React = {
  render,
  createElement
}

export default React
