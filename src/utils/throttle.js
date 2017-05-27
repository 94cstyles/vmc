export default function (fn, delay) {
  let now, lastExec, timer, context, args

  const execute = function () {
    fn.apply(context, args)
    lastExec = now
  }

  return function () {
    context = this
    args = arguments

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      const diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
