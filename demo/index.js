

let taskId = 1

function workLoop(deadline) {
  // console.log(deadline.timeRemaining());

  while (deadline.timeRemaining() > 1) {
    console.log(`taskId: ${taskId}`);
  }
  taskId++
  requestIdleCallback(workLoop)
}


requestIdleCallback(workLoop)
