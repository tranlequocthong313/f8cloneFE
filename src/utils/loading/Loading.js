import styles from './Loading.module.scss'
import f8Logo from '../../asset/images/f8_icon.png'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img alt="F8 logo" src={f8Logo} />
    </div>
  )
}

export default Loading
