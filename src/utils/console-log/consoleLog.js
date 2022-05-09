const consoleLog = (...content) => {
  if (process.env.NODE_ENV !== 'development') return

  console.log(...content)
}

export default consoleLog
