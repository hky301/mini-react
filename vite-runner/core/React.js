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

function initChildren(work) {
  const children = work.props.children
  let prevChild = null
  children.forEach((child, index) => {

    const nextWork = {
      type: child.type,
      props: child.props,
      child: null,
      sibling: null,
      parent: work,
      dom: null
    }

    if (index === 0) {
      work.child = nextWork
    } else {
      prevChild.sibling = nextWork
    }
    prevChild = nextWork
  })
}


let nextWorkOfUnit = null
function performWorkOfUnit(work) {
  if (!work.dom) {
    const dom = work.dom = createDom(work.type)
    work.parent.dom.append(dom)

    updateProps(dom, work.props)
  }

  initChildren(work)

  if (work.child) {
    return work.child
  }

  if (work.sibling) {
    return work.sibling
  }

  return work.parent?.sibling

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
