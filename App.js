
import React from './core/React.js';

const App = React.createElementVNode('div', { id: 'app' }, 'hi', 'mini-react', React.createElementVNode('span', { className: 'red' }))
console.log(JSON.stringify(App, null, 2));

export default App
