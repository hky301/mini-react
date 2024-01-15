

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(item => {
        return typeof item === 'string' ? createTextNode(item) : item;
      })
    }
  }
}

function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  root = nextWorkOfUnit
}

function createDom(type) {
  return type === 'TEXT_ELEMENT' ?
    document.createTextNode('') : document.createElement(type)
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
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}


function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))
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
let root = null
let nextWorkOfUnit = null
function workLoop(idleDeadline) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)

    shouldYield = idleDeadline.timeRemaining() < 1
  }

  if (!nextWorkOfUnit && root) {
    // 链表处理完了
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function commitRoot() {
  commitFiber(root.child)
  root = null
}

function commitFiber(fiber) {
  if (!fiber) return
  fiber.parent.dom.append(fiber.dom)
  commitFiber(fiber.child)
  commitFiber(fiber.sibling)
}

const React = {
  render,
  createElement
}

export default React

