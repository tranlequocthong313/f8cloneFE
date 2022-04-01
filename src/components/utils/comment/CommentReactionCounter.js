import styles from './CommentReactionCounter.module.scss'
import likeEmoji from '../../../asset/likeemoji.png'
import loveEmoji from '../../../asset/loveemoji.png'
import Haha from '../../../asset/hahaemoji.png'
import wowEmoji from '../../../asset/wowemoji.png'
import cryEmoji from '../../../asset/cryemoji.png'
import angryEmoji from '../../../asset/angryemoji.png'

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
