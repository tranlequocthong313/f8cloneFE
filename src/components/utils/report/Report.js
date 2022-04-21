import Cookies from 'js-cookie';
import { apiURL } from '../../../context/constants';

const reportComment = async (commentId) => {
  try {
    const token = Cookies.get('token');
    if (!token) return;

    const res = await fetch(`${apiURL}/report/comment`, {
      method: 'PUT',
      body: JSON.stringify({ commentId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data.success;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export { reportComment };
