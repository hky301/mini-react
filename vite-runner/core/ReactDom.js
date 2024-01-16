import React from './React.js';


function createRoot(container) {
  return {
    render(root) {
      React.render(root, container)
    }
  }
}

const ReactDOM = {
  createRoot
}

export default ReactDOM
