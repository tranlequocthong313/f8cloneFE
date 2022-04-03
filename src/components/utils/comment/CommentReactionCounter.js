import styles from './CommentReactionCounter.module.scss'
import likeEmoji from '../../../asset/images/likeemoji.png'
import loveEmoji from '../../../asset/images/loveemoji.png'
import Haha from '../../../asset/images/hahaemoji.png'
import wowEmoji from '../../../asset/images/wowemoji.png'
import cryEmoji from '../../../asset/images/cryemoji.png'
import angryEmoji from '../../../asset/images/angryemoji.png'

const CommentReactionCounter = ({ showModalHandler, reactData }) => {
  const checkEmojiHandler = emoji => {
    switch (emoji) {
      case 'Thích':
        return { backgroundImage: `url(${likeEmoji})` }

      case 'Yêu Thích':
        return { backgroundImage: `url(${loveEmoji})` }

      case 'Haha':
        return { backgroundImage: `url(${Haha})` }

      case 'WoW':
        return { backgroundImage: `url(${wowEmoji})` }

      case 'Buồn':
        return { backgroundImage: `url(${cryEmoji})` }

      case 'Phẫn':
        return { backgroundImage: `url(${angryEmoji})` }
      default:
        return
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
              style={checkEmojiHandler(item.emoji)}
            ></div>
          ))}
        <div className={styles.count}>{reactData ? reactData.length : ''}</div>
      </div>
    </div>
  )
}

export default CommentReactionCounter
