const fetchData = async (userId) => {
  return {
    _id: userId,
    status: 'ACTIVE',
    name: 'John Doe'
  }
}

export default fetchData
