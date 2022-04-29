import Cookies from 'js-cookie'
import { apiURL } from '../../../context/constants'

const reportComment = async (commentId) => {
  const { accessToken } = JSON.parse(Cookies.get('userData'))
  if (!accessToken) return

  const url = `${apiURL}/report/comment`
  const data = await putReport(url, commentId, accessToken)

  return data.success
}

const putReport = async (url, commentId, token) => {
  try {
    return (
      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ commentId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).json()
  } catch (error) {
    console.log(error.message)
  }
}

export { reportComment }
