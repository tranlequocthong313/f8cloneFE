const timeSinceHandler = createdAt => {
  const createdAtDate = new Date(createdAt)
  const nowDate = new Date()

  const minutes = nowDate.getMinutes() - createdAtDate.getMinutes()
  const hours = nowDate.getHours() - createdAtDate.getHours()
  const months = nowDate.getMonth() - createdAtDate.getMonth()
  const years = nowDate.getFullYear() - createdAtDate.getFullYear()

  if (years > 0) {
    return `${years === 1 ? 'một' : years} năm trước`
  } else if (months > 0) {
    return `${months === 1 ? 'một' : months} tháng trước`
  } else if (hours > 0) {
    return `${hours === 1 ? 'một' : hours} giờ trước`
  } else if (minutes > 0) {
    return `${minutes === 1 ? 'một' : minutes} phút trước`
  }
  return `vài giây trước`
}

export default timeSinceHandler
