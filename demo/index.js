let taskId = 1

function workLoop(idleDeadline) {
  taskId++
  let shouldYield = false
  while (!shouldYield) {
    console.log(`taskId: ${taskId}`);

    shouldYield = idleDeadline.timeRemaining() < 1
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
