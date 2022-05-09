import youtubeDurationFormat from 'youtube-duration-format'
import removeAccents from 'vn-remove-accents'

const formatDateToLocaleString = (date) => new Date(date).toLocaleString()

const formatNumber = (number) =>
  new Intl.NumberFormat(['ban', 'id']).format(+number)

const formatDuration = (duration) => youtubeDurationFormat(duration)

const removeActions = (string) => removeAccents(string)

const timeSince = (createdAt) => {
  const createdAtDate = new Date(createdAt)
  const nowDate = new Date()

  const minutes = nowDate.getMinutes() - createdAtDate.getMinutes()
  const hours = nowDate.getHours() - createdAtDate.getHours()
  const months = nowDate.getMonth() - createdAtDate.getMonth()
  const years = nowDate.getFullYear() - createdAtDate.getFullYear()

  const hasYear = years > 0
  const hasMonths = months > 0
  const hasHours = hours > 0
  const hasMinutes = minutes > 0

  if (hasYear) {
    return `${years === 1 ? 'một' : years} năm trước`
  } else if (hasMonths) {
    return `${months === 1 ? 'một' : months} tháng trước`
  } else if (hasHours) {
    return `${hours === 1 ? 'một' : hours} giờ trước`
  } else if (hasMinutes) {
    return `${minutes === 1 ? 'một' : minutes} phút trước`
  }
  return `vài giây trước`
}

export {
  formatDateToLocaleString,
  formatNumber,
  formatDuration,
  timeSince,
  removeActions,
}
