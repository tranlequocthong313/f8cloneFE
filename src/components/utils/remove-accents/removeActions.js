import removeAccents from 'vn-remove-accents'

const removeActions = string => {
  return removeAccents(string)
}

export default removeActions
