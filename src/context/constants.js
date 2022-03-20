const apiURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://f8clone.herokuapp.com/'

export { apiURL }
