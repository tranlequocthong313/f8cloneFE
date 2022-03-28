import styles from './CommentReactionCounter.module.scss'
import likeEmoji from '../../../asset/likeemoji.png'
import loveEmoji from '../../../asset/loveemoji.png'
import Haha from '../../../asset/hahaemoji.png'
import wowEmoji from '../../../asset/wowemoji.png'
import cryEmoji from '../../../asset/cryemoji.png'
import angryEmoji from '../../../asset/angryemoji.png'

const CommentReactionCounter = ({ showModalHandler, reactData }) => {
  const checkEmoji = emoji => {
    if (emoji === 'Thích') {
      return { backgroundImage: `url(${likeEmoji})` }
    }

    if (emoji === 'Yêu Thích') {
      return { backgroundImage: `url(${loveEmoji})` }
    }

    if (emoji === 'Haha') {
      return { backgroundImage: `url(${Haha})` }
    }

    if (emoji === 'WoW') {
      return { backgroundImage: `url(${wowEmoji})` }
    }

    if (emoji === 'Buồn') {
      return { backgroundImage: `url(${cryEmoji})` }
    }

    if (emoji === 'Phẫn Nộ') {
      return { backgroundImage: `url(${angryEmoji})` }
    }
  }

  return (
    <div className={styles.wrapper} onClick={showModalHandler}>
      <div className={styles.container}>
        {reactData &&
          reactData.map(item => (
            <div
              key={item._id}
              className={styles.icon}
              style={checkEmoji(item.emoji)}
            ></div>
          ))}
        <div className={styles.count}>{reactData ? reactData.length : ''}</div>
      </div>
    </div>
  )
}

export default CommentReactionCounter
