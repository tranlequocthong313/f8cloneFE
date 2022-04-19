import React from 'react'
import Canvas from '../canvas/Canvas'
import styles from './CommentModal.module.scss'
import noPhotoURL from '../../../asset/images/nobody_m.256x256.jpg'
import likeEmoji from '../../../asset/images/likeemoji.png'

const CommentModal = ({ showModal }) => {
  return (
    <Canvas onClick={showModal}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p>Tất cả</p>
          <div className={styles.closeButton} onClick={showModal}>
            <i className="bi bi-x-lg"></i>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.avatar}>
              <img alt="" src={noPhotoURL} />
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <div className={styles.title}>{'title'}</div>
                  <div
                    style={{
                      backgroundImage: `url(${likeEmoji})`,
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <h5>Nguyễn Minh Tiến</h5>
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  )
}

export default CommentModal
