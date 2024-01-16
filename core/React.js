const TEXT_ELEMENT = 'TEXT_ELEMENT'

function createElementVNode(type, props, ...children) {
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
  // 创建 dom
  const dom = vnode.type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(vnode.type)

  // 初始化 props
  Object.keys(vnode.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = vnode.props[key]
    }
  })

  // 处理 children
  vnode.props.children.forEach(child => {
    render(child, dom)
  })

  container.append(dom)
}

const React = {
  render,
  createElementVNode
}

export default React
