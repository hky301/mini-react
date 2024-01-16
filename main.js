
// 根容器
// const container = document.getElementById('root');

// const dom = document.createElement('div');
// dom.id = 'app'

// const text = document.createTextNode('');
// text.nodeValue = 'Hello, world!';

// dom.appendChild(text);

// container.appendChild(dom);

// vdom
const TEXT_ELEMENT = 'TEXT_ELEMENT'
const vdom = {
  type: 'div',
  props: {
    id: 'app',
  },
  children: [
    {
      type: TEXT_ELEMENT,
      props: {
        nodeValue: 'hello world'
      },
      children: []
    }
  ]
}

function createElementVNode(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
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

const textVNode = createTextVNode('hi,mini-react')
const App = createElementVNode('div', { id: 'app' }, textVNode)

const container = document.getElementById('root');
render(App, container)
