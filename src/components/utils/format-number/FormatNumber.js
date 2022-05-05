const formatNumber = (number) =>
  new Intl.NumberFormat(['ban', 'id']).format(+number)

export default formatNumber
