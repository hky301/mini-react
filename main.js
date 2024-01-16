
// 根容器
// const container = document.getElementById('root');

// const dom = document.createElement('div');
// dom.id = 'app'

// const text = document.createTextNode('');
// text.nodeValue = 'Hello, world!';

// dom.appendChild(text);

// container.appendChild(dom);

// vdom
// const TEXT_ELEMENT = 'TEXT_ELEMENT'
// const vdom = {
//   type: 'div',
//   props: {
//     id: 'app',
//   },
//   children: [
//     {
//       type: TEXT_ELEMENT,
//       props: {
//         nodeValue: 'hello world'
//       },
//       children: []
//     }
//   ]
// }

import ReactDOM from './core/ReactDom.js';
import App from './App.js';


const container = document.getElementById('root');

ReactDOM.createRoot(container).render(App)
