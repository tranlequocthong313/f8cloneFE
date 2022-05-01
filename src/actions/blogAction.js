const createBlog = (payload) => {
  return {
    type: 'CREATE_BLOG',
    payload,
  }
}

export { createBlog }
