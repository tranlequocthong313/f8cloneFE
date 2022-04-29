// import React, { useState, useContext } from 'react'
// import styles from './LearningTrackItem.module.scss'
// import { Collapse } from 'react-bootstrap'
// import { LearningContext } from '../../context/LearningContext'

// const LearningTrackItem = ({ episodes }) => {
//   // const [open, setOpen] = useState([])

//   // const { isShowMenuTrack, handleIsShowMenuTrack, playVideo } = useContext(LearningContext)

//   // const open = (id) =>
//   //   setOpen((prev) => {
//   //     const isOpen = prev.includes(id)
//   //     return isOpen ? prev.filter((item) => item !== id) : [...prev, id]
//   //   })

//   // // Style lesson item
//   // const style = (learned, id) => {
//   //   if (!learned && active !== id) {
//   //     return `${styles.lessonItem} ${styles.locked}`
//   //   } else if (active === id) {
//   //     return `${styles.lessonItem} ${styles.active}`
//   //   }
//   //   return styles.lessonItem
//   // }

//   return <h1>Hello World!</h1>

//   // return episodes.map((episode) => (
//   //   <div key={episode.id}>
//   //     <div className={styles.wrapper} onClick={() => open(episode.id)}>
//   //       <h3 className={styles.title}>{episode.title}</h3>
//   //       <span className={styles.description}>2/2 | 22:09</span>
//   //       <span className={styles.icon}>
//   //         {/* <i className="fa-solid fa-chevron-up"></i> */}
//   //         <i className="fa-solid fa-chevron-down"></i>
//   //       </span>
//   //     </div>
//   //     <Collapse in={open.includes(episode.id)}>
//   //       <div className={styles.panelBody}>
//   //         {episode.lessons.map((lesson) => (
//   //           <div
//   //             className={style(lesson.learned, lesson.id)}
//   //             key={lesson.id}
//   //             onClick={() => playVideo(lesson.id, lesson.videoId)}
//   //           >
//   //             <div className={styles.lessonInfo}>
//   //               <h3>{lesson.title}</h3>
//   //               <p>
//   //                 <i
//   //                   className={
//   //                     active !== lesson.id
//   //                       ? 'fa-regular fa-circle-play'
//   //                       : `fa-regular fa-compact-disc ${styles.playingIcon}`
//   //                   }
//   //                 ></i>{' '}
//   //                 {lesson.time}
//   //               </p>
//   //             </div>
//   //             <div
//   //               className={
//   //                 lesson.learned
//   //                   ? styles.statusIcon
//   //                   : `${styles.statusIcon} ${styles.locked}`
//   //               }
//   //             >
//   //               {lesson.learned && <i className="fa-solid fa-circle-check"></i>}
//   //               {!lesson.learned && active !== lesson.id && (
//   //                 <i className="fa-solid fa-clock-five"></i>
//   //               )}
//   //             </div>
//   //           </div>
//   //         ))}
//   //       </div>
//   //     </Collapse>
//   //   </div>
//   // ))
// }

// export default LearningTrackItem
