const TEXT_ELEMENT = 'TEXT_ELEMENT'

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'string' ? createTextVNode(child) : child
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

function initChildren(fiber) {
  const children = fiber.props.children
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


let nextWorkOfUnit = null
function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    const dom = fiber.dom = createDom(fiber.type)
    fiber.parent.dom.append(dom)

    updateProps(dom, fiber.props)
  }

  initChildren(fiber)

  if (fiber.child) {
    return fiber.child
  }

  if (fiber.sibling) {
    return fiber.sibling
  }

  return fiber.parent?.sibling

}


function workLoop(deadline) {

  let shouldYield = false

  while (!shouldYield && nextWorkOfUnit) {

    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)

    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)




const React = {
  render,
  createElement
}

export default React
