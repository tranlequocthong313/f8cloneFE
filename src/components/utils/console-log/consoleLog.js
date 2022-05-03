const consoleLog = (content) => {
  if (process.env !== 'development') return

  console.log(content)
}

export default consoleLog
